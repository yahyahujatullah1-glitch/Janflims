'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { VideoRow } from '@/components/video/VideoRow';
import { CategoryChips } from '@/components/category/CategoryChips';
import { useVideos } from '@/hooks/useVideos';
import { useWatchHistory } from '@/hooks/useWatchHistory';
import { useUIStore } from '@/store/uiStore';
import type { Category } from '@/types/category';
import type { Video } from '@/types/video';

interface HomeContentProps {
  initialCategories: Category[];
}

export function HomeContent({ initialCategories }: HomeContentProps) {
  const { setActiveVideo } = useUIStore();
  const { data: session } = useSession();
  const { history } = useWatchHistory();

  const { data: trending,    loading: l1 } = useVideos({ sort: 'views', limit: 12 });
  const { data: newReleases, loading: l2 } = useVideos({ sort: 'year',  limit: 12 });
  const { data: topRated,    loading: l3 } = useVideos({ sort: 'imdb',  limit: 12 });
  const { data: scifi,       loading: l4 } = useVideos({ genre: 'Sci-Fi' });
  const { data: drama,       loading: l5 } = useVideos({ genre: 'Drama' });
  const { data: action,      loading: l6 } = useVideos({ genre: 'Action' });

  const handleSelect = (v: Video) => setActiveVideo(v);

  const historyVideos = history.map((h) => h.video);

  const progressMap: Record<number, number> = Object.fromEntries(
    history.map((h) => {
      const total = h.video.duration ? h.video.duration * 60 : 5400;
      return [h.video.id, Math.min(95, Math.round((h.progressSeconds / total) * 100))];
    })
  );

  return (
    <>
      <CategoryChips categories={initialCategories} />

      <div style={{ paddingTop: 36 }}>
        {session?.user && historyVideos.length > 0 && (
          <VideoRow
            title="Continue Watching"
            icon="▶"
            videos={historyVideos}
            loading={false}
            onSelect={handleSelect}
            showProgress
            progressMap={progressMap}
          />
        )}
        <VideoRow title="Trending Now"  icon="🔥" videos={trending}    loading={l1} onSelect={handleSelect} />
        <VideoRow title="New Releases"  icon="✨" videos={newReleases} loading={l2} onSelect={handleSelect} />
        <VideoRow title="Top Rated"     icon="⭐" videos={topRated}    loading={l3} onSelect={handleSelect} />
        <VideoRow title="Sci-Fi"        icon="🚀" videos={scifi}       loading={l4} onSelect={handleSelect} />
        <VideoRow title="Drama"         icon="🎭" videos={drama}       loading={l5} onSelect={handleSelect} />
        <VideoRow title="Action"        icon="⚡" videos={action}      loading={l6} onSelect={handleSelect} />
      </div>
    </>
  );
}

export type StreamType = 'iframe' | 'html5' | 'hls' | 'none';
export type VideoType  = 'movie' | 'series';

export interface Video {
  id:           number;
  title:        string;
  slug:         string;
  description:  string;
  streamUrl:    string;
  trailerUrl?:  string | null;
  thumbnailUrl: string;
  backdropUrl?: string | null;
  type:         VideoType;
  genre:        string[];
  releaseYear:  number;
  rating:       string;
  duration?:    number | null;
  imdbScore?:   number | null;
  language:     string;
  cast?:        string | null;
  isFeatured:   boolean;
  views:        number;
  createdAt:    string;
}

export interface VideoCardProps {
  video:         Video;
  onSelect:      (video: Video) => void;
  showProgress?: boolean;
  progress?:     number;
  size?:         'sm' | 'md' | 'lg';
}

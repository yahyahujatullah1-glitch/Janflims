// Auto-generate this file via: npx supabase gen types typescript --project-id <your-project-id>
// Manual types provided here as a starting point.

export type Role = 'user' | 'admin';
export type VideoType = 'movie' | 'series';

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: number;
          name: string;
          email: string;
          password: string;
          role: Role;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'> & { created_at?: string };
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      videos: {
        Row: {
          id: number;
          title: string;
          slug: string;
          description: string;
          stream_url: string;
          trailer_url: string | null;
          thumbnail_url: string;
          backdrop_url: string | null;
          type: VideoType;
          genre: string;
          release_year: number;
          rating: string;
          duration: number | null;
          imdb_score: number | null;
          language: string;
          is_featured: boolean;
          views: number;
          cast: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['videos']['Row'], 'id' | 'created_at' | 'views'> & { views?: number; created_at?: string };
        Update: Partial<Database['public']['Tables']['videos']['Insert']>;
      };
      categories: {
        Row: { id: number; name: string; slug: string };
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['categories']['Insert']>;
      };
      video_categories: {
        Row: { video_id: number; category_id: number };
        Insert: Database['public']['Tables']['video_categories']['Row'];
        Update: Partial<Database['public']['Tables']['video_categories']['Insert']>;
      };
      watch_history: {
        Row: {
          id: number;
          user_id: number;
          video_id: number;
          watched_at: string;
          progress_seconds: number;
        };
        Insert: Omit<Database['public']['Tables']['watch_history']['Row'], 'id' | 'watched_at'> & { watched_at?: string };
        Update: Partial<Database['public']['Tables']['watch_history']['Insert']>;
      };
      ratings: {
        Row: { id: number; user_id: number; video_id: number; score: number; liked: boolean };
        Insert: Omit<Database['public']['Tables']['ratings']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['ratings']['Insert']>;
      };
    };
  };
}

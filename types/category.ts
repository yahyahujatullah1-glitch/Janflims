export interface Category {
  id:     number;
  name:   string;
  slug:   string;
  _count?: { videos: number };
}

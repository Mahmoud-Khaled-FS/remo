export interface MovieData {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export enum TrendingTime {
  DAY = 'day',
  WEEK = 'week',
}

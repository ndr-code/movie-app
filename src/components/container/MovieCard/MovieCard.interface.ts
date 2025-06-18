import type { Movie } from '../../../interfaces/movie.interface';

export interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  trendingRank?: number;
}

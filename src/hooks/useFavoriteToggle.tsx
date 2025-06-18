import { useState, useEffect } from 'react';
import {
  isMovieFavorited,
  addToFavorites,
  removeFromFavorites,
} from '../components/pages/favoritepage/helper';
import type { Movie } from '../interfaces/movie.interface';
import toast from 'react-hot-toast';

interface UseFavoriteToggleProps {
  movieId: number;
  movieData?: Partial<Movie>;
  onRemoveFromFavorites?: () => void;
}

interface UseFavoriteToggleResult {
  isFavorite: boolean;
  handleFavoriteToggle: () => void;
}

export const useFavoriteToggle = ({
  movieId,
  movieData,
  onRemoveFromFavorites,
}: UseFavoriteToggleProps): UseFavoriteToggleResult => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(isMovieFavorited(movieId));
  }, [movieId]);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(movieId);
      onRemoveFromFavorites?.();
      toast.success('Removed from favorites');
    } else if (movieData) {
      addToFavorites({
        id: movieId,
        title: movieData.title || '',
        poster_path: movieData.poster_path || null,
        overview: movieData.overview || '',
        vote_average: movieData.vote_average || 0,
        release_date: movieData.release_date || '',
        backdrop_path: movieData.backdrop_path || null,
      });
      toast.success('Added to favorites');
    }
    setIsFavorite(!isFavorite);
  };

  return {
    isFavorite,
    handleFavoriteToggle,
  };
};

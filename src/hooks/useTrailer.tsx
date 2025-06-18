import { useState } from 'react';
import { getMovieTrailer } from '../services/movies/services';

interface UseTrailerResult {
  trailerKey: string | null;
  isModalOpen: boolean;
  isLoading: boolean;
  handleWatchTrailer: (
    movieId: number,
    existingTrailerKey?: string | null
  ) => Promise<void>;
  closeModal: () => void;
}

export const useTrailer = (): UseTrailerResult => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleWatchTrailer = async (
    movieId: number,
    existingTrailerKey?: string | null
  ) => {
    if (existingTrailerKey) {
      setTrailerKey(existingTrailerKey);
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      const key = await getMovieTrailer(movieId);
      if (key) {
        setTrailerKey(key);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error playing trailer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return {
    trailerKey,
    isModalOpen,
    isLoading,
    handleWatchTrailer,
    closeModal,
  };
};

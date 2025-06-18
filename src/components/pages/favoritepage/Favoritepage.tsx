import React, { useState } from 'react';
import { useFavorite } from './useFavorite';
import LargeMovieCard from '../../container/LargeMovieCard/LargeMovieCard';
import Button from '../../ui/Button';
import { VideoModal } from '../../ui/Video/VideoModal';
import { getMovieTrailer } from '../../../services/movies/services';

const Favoritepage: React.FC = () => {
  const { favoriteMovies, loading, handleRemoveFromFavorites } = useFavorite();
  const [visibleCount, setVisibleCount] = useState(5);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [trailerLoading, setTrailerLoading] = useState(false);

  const showNotFound = favoriteMovies.length === 0 && !loading;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const handleWatchTrailer = async (movieId: number) => {
    setTrailerLoading(true);
    const key = await getMovieTrailer(movieId);
    setTrailerKey(key);
    setModalOpen(true);
    setTrailerLoading(false);
  };

  return (
    <div className='px-4 sm:px-15 lg:px-25 xl:px-35 mt-20 min-h-[80vh]'>
      {loading && <p>Loading...</p>}
      {showNotFound && (
        <div className='flex flex-col items-center justify-center'>
          <img
            src='/data-not-foundpng.png'
            alt='No Favorite Movies'
            className='w-[200px] h-[200px] mb-6 mt-40'
          />
          <div className='text-md font-semibold text-white mb-2'>
            No Favorite Movies
          </div>
          <div className='text-md font-normal text-neutral-400'>
            Add some movies to your favorites
          </div>
        </div>
      )}
      {favoriteMovies.length > 0 && (
        <div className='w-full flex flex-col items-center'>
          <div className='w-full [&>*:last-child]:border-b-0'>
            {favoriteMovies.slice(0, visibleCount).map((movie) => (
              <LargeMovieCard
                key={movie.id}
                posterPath={movie.poster_path}
                title={movie.title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
                onWatchTrailer={() => handleWatchTrailer(movie.id)}
                trailerAvailable={!trailerLoading}
                id={movie.id}
                onRemoveFromFavorites={() =>
                  handleRemoveFromFavorites(movie.id)
                }
              />
            ))}
          </div>
          {visibleCount < favoriteMovies.length && (
            <div className='w-full flex items-center justify-center mt-6'>
              <Button
                variant='secondary'
                className='shadow-2xl'
                onClick={handleLoadMore}
                disabled={loading}
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      )}
      <VideoModal
        isOpen={modalOpen && !!trailerKey}
        onClose={() => setModalOpen(false)}
        videoId={trailerKey || ''}
      />
    </div>
  );
};

export default Favoritepage;

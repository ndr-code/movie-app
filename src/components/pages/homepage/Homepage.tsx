import { useHome } from './useHome';
import Button from '../../ui/Button';
import { HeroSlider } from '../../container/HomeHeroSection/HeroSlider';
import MovieCard from '../../container/MovieCard';
import { HeroSection } from '../../container/HomeHeroSection/HeroSection';
import { useState, useEffect } from 'react';
import { Carousel } from '../../container/Carousel/Carousel';

export const Homepage: React.FC = () => {
  const {
    trendingMovies,
    newReleaseMovies,
    loading,
    error,
    hasMoreMovies,
    loadMoreMovies,
  } = useHome();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [colCount, setColCount] = useState(5);
  const [rowsToShow, setRowsToShow] = useState(2);
  useEffect(() => {
    function updateColCount() {
      const width = window.innerWidth;
      if (width < 640) setColCount(2); //
      else if (width < 768) setColCount(2); //
      else if (width < 1024) setColCount(3); //
      else if (width < 1280) setColCount(4); //
      else setColCount(5); //
    }
    updateColCount();
    window.addEventListener('resize', updateColCount);
    return () => window.removeEventListener('resize', updateColCount);
  }, []);
  const newReleaseCardsToShow = newReleaseMovies.slice(
    0,
    rowsToShow * colCount
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='mx-auto'>
      {/* Hero Section */}
      {trendingMovies.length > 0 && (
        <HeroSlider items={trendingMovies} paused={isModalOpen}>
          {(movie) => (
            <HeroSection
              movie={movie}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </HeroSlider>
      )}

      {/* Trending Now */}
      <section className='px-4 sm:px-15 lg:px-25 xl:px-35 mb-8 md:mb-12'>
        <div className='flex items-center justify-between mb-4 md:mb-6 mt-10 md:mt-40 lg:mt-0 '>
          <h2 className='display-lg font-bold pb-2'>Trending Now</h2>
        </div>
        <Carousel movies={trendingMovies.slice(0, 20)} />
      </section>

      {/* New Release */}
      <section className='px-4 sm:px-15 lg:px-25 xl:px-35'>
        <div className='relative'>
          <h2 className='display-lg font-bold mb-4 md:mb-6 pb-2'>
            New Release
          </h2>
          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4'>
            {newReleaseCardsToShow.map((movie) => (
              <MovieCard key={`new-${movie.id}`} movie={movie} size='large' />
            ))}
          </div>
          {hasMoreMovies && (
            <div
              className='w-full h-[150px] md:h-[300px] absolute bottom-0 left-0 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-center z-50 transition-all duration-300 hover:from-black/90 hover:via-black/90 active:from-black active:via-black/95 cursor-pointer'
              onClick={() => {
                setRowsToShow((prev) => prev + 2);
                loadMoreMovies();
              }}
            >
              <Button
                variant='secondary'
                className='translate-y-5 md:translate-y-10 shadow-2xl transition-transform duration-300 hover:scale-105 active:scale-95'
                onClick={(e) => {
                  e.stopPropagation();
                  setRowsToShow((prev) => prev + 2);
                  loadMoreMovies();
                }}
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Homepage;

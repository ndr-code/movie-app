import React from 'react';
import { useDetail } from './useDetail';
import { getImageUrl } from '../../../services/movies/services';
import Button from '../../ui/Button';
import { IoPlayCircle } from 'react-icons/io5';
import { VideoModal } from '../../ui/Video/VideoModal';
import CastCard from '../../container/CastCard/CastCard';
import InfoCard from '../../ui/InfoCard/InfoCard';
import { isMovieFavorited } from '../favoritepage/helper';
import { formatDate, getGenreNames, handleFavoriteToggle } from './helper';

const Detailpage: React.FC = () => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { loading, error, movie, trailerKey, cast, crew, genres } = useDetail();

  React.useEffect(() => {
    if (movie) {
      setIsFavorite(isMovieFavorited(movie.id));
    }
  }, [movie]);

  if (loading) return <div className='text-center py-20'>Loading...</div>;
  if (error)
    return <div className='text-center py-20 text-red-500'>{error}</div>;
  if (!movie) return <div className='text-center py-20'>Movie not found.</div>;

  const genreNames = getGenreNames(movie, genres);
  const ageLimit = 13;

  const handleWatchTrailer = () => {
    if (trailerKey) setIsModalOpen(true);
  };

  return (
    <div className='min-h-screen bg-base-black text-white flex flex-col'>
      {/* Background Image */}
      <div className='relative w-full h-96 md:h-[32rem] lg:h-[40rem]'>
        <img
          src={getImageUrl(movie.backdrop_path, 'w1280')}
          alt={movie.title}
          className='w-full h-full object-cover object-[center_top] md:object-[center_top] lg:object-[center_top] object-position-top-center'
          style={{ objectPosition: 'top center' }}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent' />
      </div>

      {/* Main Content */}
      <div className=' -mt-40 z-10 relative px-4 sm:px-15 lg:px-25 xl:px-35 pb-12'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr] md:grid-cols-[280px_1fr] space-x-6 md:space-x-8'>
            {/* Poster */}
            <div className='row-span-2 md:col-span-1'>
              <div className='rounded-md md:rounded-xl max-w-80 overflow-hidden h-full flex items-center'>
                <img
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  className='w-full h-full object-cover shadow-2xl rounded-md md:rounded-xl '
                />
              </div>
            </div>

            {/* Content Section */}
            <div className='md:col-span-2'>
              {/* Title */}
              <div className='mb-4'>
                <h1 className='text-2xl sm:text-4xl font-bold'>
                  {movie.title}
                </h1>
                <div className='flex items-center gap-2 text-lg font-medium mt-4'>
                  <img
                    src='/icon-calendar.svg'
                    alt='calendar'
                    className='w-6 h-6'
                  />
                  <span>{formatDate(movie.release_date)}</span>
                </div>
              </div>
            </div>

            <div className='col-span-2 md:col-span-2 md:col-start-2 mt-4'>
              {/* Buttons */}
              <div className='mb-6'>
                <div className='flex items-center justify-between sm:justify-start gap-4'>
                  <Button
                    variant='primary'
                    icon={<IoPlayCircle size={24} />}
                    onClick={handleWatchTrailer}
                    disabled={!trailerKey}
                    className='rounded-full px-10 py-3 text-lg font-bold bg-primary-300 hover:bg-primary-400 border-none w-full! md:w-57! shadow-lg'
                    style={{ minWidth: 0 }}
                  >
                    Watch Trailer
                  </Button>
                  <button
                    aria-label='Favorite'
                    className={`aspect-square w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full border-1 border-neutral-800 bg-neutral-950/60 shadow-lg transition-colors duration-200 shrink-0`}
                    onClick={() =>
                      handleFavoriteToggle(movie, isFavorite, setIsFavorite)
                    }
                  >
                    <img
                      src={
                        isFavorite ? '/icon-fav-on.svg' : '/icon-fav-off.svg'
                      }
                      alt='favorite'
                      className='w-5 h-5 sm:w-6 sm:h-6 cursor-pointer'
                    />
                  </button>
                </div>
              </div>

              {/* Cards */}
              <div className='grid grid-cols-3 gap-4 mb-8'>
                <InfoCard
                  icon='/icon-rating.svg'
                  label='Rating'
                  value={`${movie.vote_average.toFixed(1)}/10`}
                />
                <InfoCard
                  icon='/icon-genre.svg'
                  label='Genre'
                  value={genreNames[0]}
                />
                <InfoCard
                  icon='/icon-age-limit.svg'
                  label='Age Limit'
                  value={ageLimit}
                />
              </div>
            </div>
          </div>

          {/* Overview Section */}
          <div className='mt-8'>
            <h2 className='text-2xl md:text-3xl font-bold mb-4'>Overview</h2>
            <p className='text-neutral-200 text-base leading-relaxed'>
              {movie.overview}
            </p>
          </div>

          {/* Cast & Crew */}
          <div className='mt-12'>
            <h2 className='text-2xl md:text-3xl font-bold mb-6'>Cast & Crew</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {cast.map((member) => (
                <CastCard
                  key={member.id}
                  name={member.name}
                  role={member.character}
                  profilePath={member.profile_path}
                />
              ))}
              {crew.map((member) => (
                <CastCard
                  key={member.id}
                  name={member.name}
                  role={member.job}
                  profilePath={member.profile_path}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Video Modal for Trailer */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoId={trailerKey || ''}
      />
    </div>
  );
};

export default Detailpage;

import { useState, useCallback, useEffect } from 'react';

interface UseCarouselNavigationProps {
  totalItems: number;
  visibleCount: number;
  autoPlayInterval?: number;
}

interface UseCarouselNavigationResult {
  startIdx: number;
  maxStartIdx: number;
  goPrev: () => void;
  goNext: () => void;
}

export const useCarouselNavigation = ({
  totalItems,
  visibleCount,
  autoPlayInterval = 3000,
}: UseCarouselNavigationProps): UseCarouselNavigationResult => {
  const [startIdx, setStartIdx] = useState(0);
  const maxStartIdx =
    totalItems <= visibleCount ? 0 : totalItems - visibleCount;

  const goPrev = () => {
    setStartIdx((prev) => (prev === 0 ? maxStartIdx : prev - 1));
  };

  const goNext = useCallback(() => {
    setStartIdx((prev) => (prev === maxStartIdx ? 0 : prev + 1));
  }, [maxStartIdx]);

  useEffect(() => {
    if (autoPlayInterval > 0) {
      const interval = setInterval(() => {
        goNext();
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [goNext, autoPlayInterval]);

  return {
    startIdx,
    maxStartIdx,
    goPrev,
    goNext,
  };
};

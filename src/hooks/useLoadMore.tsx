import { useState } from 'react';

interface UseLoadMoreProps {
  initialCount?: number;
  increment?: number;
}

interface UseLoadMoreResult {
  visibleCount: number;
  handleLoadMore: () => void;
  resetCount: () => void;
}

export const useLoadMore = ({
  initialCount = 5,
  increment = 5,
}: UseLoadMoreProps = {}): UseLoadMoreResult => {
  const [visibleCount, setVisibleCount] = useState(initialCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + increment);
  };

  const resetCount = () => {
    setVisibleCount(initialCount);
  };

  return {
    visibleCount,
    handleLoadMore,
    resetCount,
  };
};

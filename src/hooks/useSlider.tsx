import { useState, useEffect } from 'react';

interface UseSliderProps {
  itemsLength: number;
  interval?: number;
  paused?: boolean;
}

interface UseSliderResult {
  currentIndex: number;
  transitioning: boolean;
}

export const useSlider = ({
  itemsLength,
  interval = 5000,
  paused = false,
}: UseSliderProps): UseSliderResult => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (itemsLength > 0 && !paused) {
      const timer = setInterval(() => {
        setTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % itemsLength);
          setTransitioning(false);
        }, 200);
      }, interval);

      return () => clearInterval(timer);
    }
    return () => {};
  }, [itemsLength, interval, paused]);

  return {
    currentIndex,
    transitioning,
  };
};

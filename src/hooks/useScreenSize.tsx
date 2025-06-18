import { useState, useEffect } from 'react';

interface ScreenSize {
  colCount: number;
}

export const useScreenSize = (): ScreenSize => {
  const [colCount, setColCount] = useState(5);

  useEffect(() => {
    function updateColCount() {
      const width = window.innerWidth;
      if (width < 640) setColCount(2);
      else if (width < 768) setColCount(2);
      else if (width < 1024) setColCount(3);
      else if (width < 1280) setColCount(4);
      else setColCount(5);
    }

    updateColCount();
    window.addEventListener('resize', updateColCount);
    return () => window.removeEventListener('resize', updateColCount);
  }, []);

  return { colCount };
};

import { useState, useEffect } from 'react';

interface UseScrollEffectProps {
  threshold?: number;
}

interface UseScrollEffectResult {
  isScrolled: boolean;
}

export const useScrollEffect = ({
  threshold = 10,
}: UseScrollEffectProps = {}): UseScrollEffectResult => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return {
    isScrolled,
  };
};

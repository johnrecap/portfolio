import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface UseParallaxOptions {
  offset?: number;
  direction?: 'up' | 'down';
}

export const useParallax = (options: UseParallaxOptions = {}) => {
  const { offset = 50, direction = 'up' } = options;
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? [offset, -offset] : [-offset, offset]
  );

  return { ref, y, scrollYProgress };
};

export const useParallaxValue = (
  scrollYProgress: MotionValue<number>,
  inputRange: [number, number] = [0, 1],
  outputRange: [number, number] = [0, -50]
) => {
  return useTransform(scrollYProgress, inputRange, outputRange);
};

import { useEffect, useRef, useState } from 'react';

interface UseRevealOnScrollOptions {
  threshold?: number;
  rootMargin?: string;
  immediate?: boolean;
}

export function useRevealOnScroll<T extends HTMLElement = HTMLElement>({
  threshold = 0.01,
  rootMargin = '0px 0px -32px 0px',
  immediate = false,
}: UseRevealOnScrollOptions = {}) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (immediate) {
      return true;
    }
    if (typeof window === 'undefined') {
      return true;
    }
    if (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return true;
    }
    if (typeof IntersectionObserver === 'undefined') {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (isVisible) {
      return;
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.96 && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
            break;
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible, threshold, rootMargin]);

  return { ref, isVisible };
}

import { useEffect, useRef } from 'react';
import { AppRoute } from '../config/studioConfig';
import { calculateMainScrollProgress } from '../utils/inquiry';

interface ScrollProgressBarProps {
  route: AppRoute;
  targetId?: string;
}

export function ScrollProgressBar({
  route,
  targetId = 'main-content',
}: ScrollProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      const bar = barRef.current;
      const mainEl = document.getElementById(targetId);
      if (!bar || !mainEl) {
        return;
      }

      const progress = calculateMainScrollProgress({
        scrollY: window.scrollY,
        mainOffsetTop: mainEl.offsetTop,
        mainHeight: mainEl.offsetHeight,
        viewportHeight: window.innerHeight,
      });

      bar.style.setProperty('--scroll-progress', String(progress));
      bar.setAttribute('data-progress', String(Math.round(progress * 100)));
    };

    const scheduleUpdate = () => {
      if (rafId !== 0) {
        return;
      }
      rafId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    const mainEl = document.getElementById(targetId);
    const resizeObserver =
      mainEl && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(scheduleUpdate)
        : null;
    if (mainEl && resizeObserver) {
      resizeObserver.observe(mainEl);
    }

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      resizeObserver?.disconnect();
    };
  }, [route, targetId]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] overflow-hidden bg-transparent"
    >
      <div
        ref={barRef}
        data-testid="scroll-progress-bar"
        data-progress="0"
        className="scroll-progress-bar h-full w-full bg-[#A16D57]"
      />
    </div>
  );
}

import type { ReactNode } from 'react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

interface RevealSectionProps {
  children: ReactNode;
  as?: 'section' | 'div';
  className?: string;
  ariaLabel?: string;
  immediate?: boolean;
}

export function RevealSection({
  children,
  as = 'section',
  className = '',
  ariaLabel,
  immediate = false,
}: RevealSectionProps) {
  const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>({ immediate });

  if (as === 'div') {
    return (
      <div
        ref={ref}
        className={`reveal-on-scroll ${isVisible ? 'is-revealed' : ''} ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      aria-label={ariaLabel}
      className={`reveal-on-scroll ${isVisible ? 'is-revealed' : ''} ${className}`}
    >
      {children}
    </section>
  );
}

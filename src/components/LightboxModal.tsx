import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { MediaAssetItem } from '../config/mediaManifest';

interface LightboxModalProps {
  items: MediaAssetItem[];
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (nextIndex: number) => void;
}

export function LightboxModal({
  items,
  activeIndex,
  onClose,
  onChangeIndex,
}: LightboxModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    closeButtonRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight') {
        onChangeIndex((activeIndex + 1) % items.length);
      } else if (event.key === 'ArrowLeft') {
        onChangeIndex((activeIndex - 1 + items.length) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, items.length, onClose, onChangeIndex]);

  if (activeIndex === null || !items[activeIndex]) {
    return null;
  }

  const currentItem = items[activeIndex];
  const prevIndex = (activeIndex - 1 + items.length) % items.length;
  const nextIndex = (activeIndex + 1) % items.length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer: ${currentItem.title}`}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#282520]/96 p-4 text-[#F8F5EF] sm:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Top Bar */}
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs tracking-[0.14em] text-[#D2BC9E] uppercase tabular-nums">
          <span>
            {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
          <span aria-hidden="true">·</span>
          <span>{currentItem.category}</span>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <span className="hidden sm:inline">{currentItem.aspectRatio}</span>
        </div>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className="inline-flex h-11 w-11 items-center justify-center border border-[#F8F5EF]/30 text-[#F8F5EF] transition-colors hover:bg-[#F8F5EF] hover:text-[#282520] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D2BC9E]"
        >
          <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      {/* Main Media Frame */}
      <div
        className="mx-auto my-4 flex min-h-0 w-full max-w-[1100px] flex-1 items-center justify-center"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <img
          src={currentItem.src}
          alt={currentItem.alt}
          referrerPolicy="no-referrer"
          className="max-h-[70vh] w-auto max-w-full object-contain shadow-2xl"
        />
      </div>

      {/* Caption & Prev/Next Controls */}
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start justify-between gap-4 border-t border-[#F8F5EF]/15 pt-4 sm:flex-row sm:items-center">
        <div className="max-w-xl">
          <h3 className="font-serif text-xl font-normal text-[#F8F5EF] sm:text-2xl">
            {currentItem.title}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[#EFE9DF]/80">
            {currentItem.caption}
          </p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => onChangeIndex(prevIndex)}
            aria-label="Previous photograph"
            className="inline-flex h-11 min-w-[44px] items-center justify-center gap-2 border border-[#F8F5EF]/35 px-4 text-xs font-medium tracking-[0.12em] text-[#F8F5EF] uppercase transition-colors hover:bg-[#F8F5EF] hover:text-[#282520] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D2BC9E]"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            <span>Prev</span>
          </button>
          <button
            type="button"
            onClick={() => onChangeIndex(nextIndex)}
            aria-label="Next photograph"
            className="inline-flex h-11 min-w-[44px] items-center justify-center gap-2 border border-[#F8F5EF]/35 px-4 text-xs font-medium tracking-[0.12em] text-[#F8F5EF] uppercase transition-colors hover:bg-[#F8F5EF] hover:text-[#282520] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D2BC9E]"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { ArrowUpRight, Camera } from 'lucide-react';
import type { MediaAspectRatio } from '../config/mediaManifest';

interface EditorialImageProps {
  src: string;
  alt: string;
  aspectRatio?: MediaAspectRatio | 'fill';
  priority?: boolean;
  caption?: string;
  hoverRevealLabel?: string;
  className?: string;
  imageClassName?: string;
}

const ASPECT_CLASS_MAP: Record<MediaAspectRatio | 'fill', string> = {
  '3:4': 'aspect-[3/4]',
  '4:5': 'aspect-[4/5]',
  '1:1': 'aspect-square',
  '16:9': 'aspect-video',
  fill: 'h-full w-full',
};

export function EditorialImage({
  src,
  alt,
  aspectRatio = '3:4',
  priority = false,
  caption,
  hoverRevealLabel,
  className = '',
  imageClassName = '',
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <figure
      className={`group/media relative overflow-hidden bg-[#EFE9DF] ${ASPECT_CLASS_MAP[aspectRatio]} ${className}`}
    >
      {!hasError ? (
        <>
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            fetchPriority={priority ? 'high' : 'auto'}
            onError={() => setHasError(true)}
            className={`editorial-hover-img h-full w-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/media:scale-[1.03] group-hover/tile:scale-[1.035] group-focus-visible/tile:scale-[1.035] ${imageClassName}`}
          />

          {hoverRevealLabel && (
            <>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#282520]/75 via-[#282520]/20 to-transparent opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tile:opacity-100 group-focus-visible/tile:opacity-100"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-3 border border-[#F8F5EF]/35 opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tile:opacity-100 group-focus-visible/tile:opacity-100"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-5 bottom-5 flex translate-y-2 items-center justify-between text-xs font-medium tracking-[0.16em] text-[#F8F5EF] uppercase opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tile:translate-y-0 group-hover/tile:opacity-100 group-focus-visible/tile:translate-y-0 group-focus-visible/tile:opacity-100"
              >
                <span>{hoverRevealLabel}</span>
                <ArrowUpRight className="h-4 w-4 text-[#D2BC9E]" strokeWidth={1.5} />
              </div>
            </>
          )}
        </>
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#EFE9DF] to-[#D2BC9E]/45 p-6 text-center text-[#5E5850]"
        >
          <Camera className="h-6 w-6 text-[#8B5742]" strokeWidth={1.5} aria-hidden="true" />
          <span className="font-serif text-lg text-[#282520]">{caption || 'Editorial Frame'}</span>
          <span className="max-w-xs text-xs text-[#5E5850]">
            Image asset pending replacement in media manifest.
          </span>
        </div>
      )}
    </figure>
  );
}

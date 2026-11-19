import { ArrowRight } from 'lucide-react';
import { AppRoute } from '../config/studioConfig';
import { mediaManifest } from '../config/mediaManifest';

interface CtaBannerProps {
  onNavigate: (route: AppRoute) => void;
}

export function CtaBanner({ onNavigate }: CtaBannerProps) {
  return (
    <section
      aria-label="Booking invitation"
      className="relative overflow-hidden bg-[#282520] text-[#F8F5EF]"
    >
      <img
        src={mediaManifest.ctaBackdrop.src}
        alt={mediaManifest.ctaBackdrop.alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-55"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#282520]/90 via-[#282520]/60 to-[#282520]/45"
      />

      <div className="relative mx-auto max-w-[1280px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.2em] text-[#D2BC9E] uppercase">
            Commission &amp; Inquiries
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-[1.1] font-normal text-[#F8F5EF] sm:text-5xl lg:text-6xl">
            Let&apos;s Create Something Beautiful Together.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#EFE9DF]/90">
            Share your tentative celebration date, gathering location, and what you hope to
            remember most. Prepare a clear inquiry summary in moments.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/contact');
              }}
              className="inline-flex min-h-[48px] items-center gap-3 bg-[#F8F5EF] px-7 py-3.5 text-xs font-medium tracking-[0.14em] text-[#282520] uppercase transition-colors hover:bg-[#D2BC9E]"
            >
              <span>Begin Your Inquiry</span>
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </a>
            <a
              href="/portfolio"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/portfolio');
              }}
              className="inline-flex min-h-[48px] items-center border border-[#F8F5EF]/60 px-6 py-3.5 text-xs font-medium tracking-[0.14em] text-[#F8F5EF] uppercase transition-colors hover:border-[#F8F5EF] hover:bg-[#F8F5EF]/10"
            >
              Explore Gallery
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

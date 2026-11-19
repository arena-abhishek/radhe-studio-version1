import { useState } from 'react';
import { AppRoute, studioConfig } from '../config/studioConfig';
import { mediaManifest, type MediaAssetItem } from '../config/mediaManifest';
import { filterPortfolioItems, type PortfolioFilter } from '../utils/inquiry';
import { EditorialImage } from '../components/EditorialImage';
import { CtaBanner } from '../components/CtaBanner';
import { RevealSection } from '../components/RevealSection';

interface PortfolioPageProps {
  onNavigate: (route: AppRoute) => void;
  onOpenLightbox: (item: MediaAssetItem, filteredPool: MediaAssetItem[]) => void;
}

const CATEGORIES: PortfolioFilter[] = ['All', 'Weddings', 'Pre-Wedding', 'Events', 'Heirlooms'];

export function PortfolioPage({ onNavigate, onOpenLightbox }: PortfolioPageProps) {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>('All');

  const items = studioConfig.showProposedServices
    ? filterPortfolioItems(mediaManifest.portfolio, activeFilter)
    : mediaManifest.portfolio;

  return (
    <div className="page-enter">
      {/* Header */}
      <section className="mx-auto max-w-[1280px] px-5 pt-12 pb-10 sm:px-8 lg:px-12 lg:pt-20">
        <p className="text-xs font-medium tracking-[0.2em] text-[#8B5742] uppercase">
          Portfolio · {studioConfig.conceptTitle}
        </p>
        <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h1 className="max-w-2xl font-serif text-5xl leading-[1.06] font-normal text-[#282520] sm:text-6xl">
            Editorial Framing &amp; Quiet Light.
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-[#5E5850]">
            Select any frame to inspect it in full screen. Keyboard arrows and Escape are
            supported inside the viewer.
          </p>
        </div>

        {/* Honest Conceptual Media Disclosure */}
        <div className="mt-8 border border-[#D2BC9E] bg-[#EFE9DF]/70 px-5 py-4 text-xs leading-relaxed text-[#5E5850]">
          <span className="font-medium text-[#282520]">Demonstration Gallery Notice:</span> The
          eight frames below are conceptual visual studies illustrating mixed 3:4, 4:5, 1:1, and
          16:9 editorial crops. No real couples, client names, or shoot locations are claimed;
          replace assets in{' '}
          <code className="font-mono text-[11px] text-[#282520]">src/config/mediaManifest.ts</code>{' '}
          with authorized {studioConfig.brandName} originals prior to launch.
        </div>

        {/* Responsive Category Filter Controls */}
        {studioConfig.showProposedServices && (
          <div
            role="group"
            aria-label="Filter gallery by proposed category"
            className="mt-8 flex flex-wrap items-center gap-2 border-b border-[#D2BC9E]/60 pb-6"
          >
            {CATEGORIES.map((category) => {
              const isSelected = activeFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setActiveFilter(category)}
                  className={`min-h-[40px] border px-4 py-2 text-xs font-medium tracking-[0.12em] uppercase transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5742] ${
                    isSelected
                      ? 'border-[#282520] bg-[#282520] text-[#F8F5EF]'
                      : 'border-[#D2BC9E] bg-transparent text-[#5E5850] hover:border-[#282520] hover:text-[#282520]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* Asymmetrical Multi-Aspect Editorial Grid */}
      <RevealSection className="mx-auto max-w-[1280px] px-5 pb-24 sm:px-8 lg:px-12">
        {items.length === 0 ? (
          <div className="border border-[#D2BC9E] bg-[#EFE9DF]/50 p-12 text-center">
            <p className="font-serif text-2xl text-[#282520]">
              No frames match this filter yet.
            </p>
            <button
              type="button"
              onClick={() => setActiveFilter('All')}
              className="mt-4 inline-flex min-h-[44px] items-center border border-[#282520] px-5 py-2 text-xs font-medium tracking-[0.12em] uppercase"
            >
              Show All Studies
            </button>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-12 md:items-start md:gap-x-10 md:gap-y-16">
            {items.map((item, idx) => {
              const pairPartner = idx % 2 === 0 ? items[idx + 1] : items[idx - 1];
              const spanClass =
                item.aspectRatio === '16:9'
                  ? 'md:col-span-7 md:pt-6'
                  : pairPartner?.aspectRatio === '16:9'
                    ? 'md:col-span-5'
                    : idx % 2 === 0
                      ? 'md:col-span-6'
                      : 'md:col-span-6 md:pt-10';

              return (
                <article key={item.id} className={spanClass}>
                  <button
                    type="button"
                    onClick={() => onOpenLightbox(item, items)}
                    aria-label={`Inspect ${item.title} (${item.aspectRatio}) in lightbox`}
                    className="group/tile block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B5742]"
                  >
                    <EditorialImage
                      src={item.src}
                      alt={item.alt}
                      aspectRatio={item.aspectRatio}
                      caption={item.title}
                      hoverRevealLabel="Inspect Study"
                    />
                    <div className="relative mt-4 flex items-baseline justify-between gap-4 border-b border-[#D2BC9E]/50 pb-3">
                      <div>
                        <h2 className="font-serif text-xl font-normal text-[#282520] transition-colors duration-200 group-hover/tile:text-[#8B5742] sm:text-2xl">
                          {item.title}
                        </h2>
                        <p className="mt-1 text-xs text-[#5E5850]">
                          {item.category} · Conceptual Frame
                        </p>
                      </div>
                      <span className="shrink-0 font-sans text-xs tracking-[0.14em] text-[#5E5850] uppercase tabular-nums">
                        {item.aspectRatio}
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-[#8B5742] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tile:scale-x-100 group-focus-visible/tile:scale-x-100"
                      />
                    </div>
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </RevealSection>

      <CtaBanner onNavigate={onNavigate} />
    </div>
  );
}

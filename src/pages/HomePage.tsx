import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { AppRoute, studioConfig } from '../config/studioConfig';
import { mediaManifest, type MediaAssetItem } from '../config/mediaManifest';
import { EditorialImage } from '../components/EditorialImage';
import { CtaBanner } from '../components/CtaBanner';
import { RevealSection } from '../components/RevealSection';

interface HomePageProps {
  onNavigate: (route: AppRoute) => void;
  onSelectService: (serviceTitle: string) => void;
  onOpenLightbox: (item: MediaAssetItem) => void;
}

export function HomePage({ onNavigate, onSelectService, onOpenLightbox }: HomePageProps) {
  const featuredFrames = mediaManifest.portfolio.slice(0, 4);

  const handleNav = (event: React.MouseEvent<HTMLAnchorElement>, route: AppRoute) => {
    event.preventDefault();
    onNavigate(route);
  };

  return (
    <div className="page-enter">
      {/* Hero Split Layout */}
      <section className="mx-auto max-w-[1280px] px-5 pt-8 pb-16 sm:px-8 sm:pt-12 lg:px-12 lg:pt-16 lg:pb-24">
        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col justify-between lg:col-span-6 lg:py-6">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-[#8B5742] uppercase">
                {studioConfig.conceptTitle} · {studioConfig.brandName}
              </p>

              <h1 className="mt-6 font-serif text-5xl leading-[1.03] font-normal tracking-[-0.015em] text-[#282520] sm:text-6xl lg:text-[4.25rem]">
                Some Moments Deserve Forever.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-relaxed text-[#5E5850] sm:text-lg">
                {studioConfig.tagline}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
                <a
                  href="/portfolio"
                  onClick={(e) => handleNav(e, '/portfolio')}
                  className="inline-flex min-h-[48px] items-center gap-3 bg-[#282520] px-7 py-3.5 text-xs font-medium tracking-[0.14em] text-[#F8F5EF] uppercase transition-colors hover:bg-[#8B5742] whitespace-nowrap shrink-0"
                >
                  <span>Discover the Portfolio</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </a>

                <a
                  href="/contact"
                  onClick={(e) => handleNav(e, '/contact')}
                  className="inline-flex min-h-[44px] items-center text-xs font-medium tracking-[0.13em] text-[#282520] uppercase underline decoration-[#8B5742] underline-offset-8 transition-colors hover:text-[#8B5742] whitespace-nowrap shrink-0"
                >
                  Let&apos;s Create Something Beautiful
                </a>
              </div>
            </div>

            <div className="mt-12 border-t border-[#D2BC9E]/70 pt-6">
              <p className="text-xs leading-relaxed text-[#5E5850]">
                Editorial concept preview crafted for {studioConfig.brandName} (
                <a
                  href={studioConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#282520] underline decoration-[#D2BC9E] underline-offset-4 hover:text-[#8B5742]"
                >
                  {studioConfig.instagramHandle}
                </a>
                ). Featured frames represent conceptual styling pending original studio photography.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <EditorialImage
              src={mediaManifest.hero.src}
              alt={mediaManifest.hero.alt}
              aspectRatio="3:4"
              priority
              caption={mediaManifest.hero.title}
              className="h-full w-full"
            />
          </div>
        </div>
      </section>

      {/* Subtle Scrolling Editorial Index */}
      <div
        aria-label="Editorial index"
        className="overflow-hidden border-y border-[#D2BC9E]/70 bg-[#EFE9DF] py-3.5"
      >
        <div className="editorial-marquee-track items-center gap-8 text-xs tracking-[0.2em] text-[#5E5850] uppercase">
          {[0, 1].map((loopIndex) => (
            <div key={loopIndex} className="flex shrink-0 items-center gap-8 px-4" aria-hidden={loopIndex === 1}>
              <span>01 · Stories in Light</span>
              <span aria-hidden="true">·</span>
              <span>02 · Unhurried Presence</span>
              <span aria-hidden="true">·</span>
              <span>03 · Natural Daylight Portraits</span>
              <span aria-hidden="true">·</span>
              <span>04 · Heirloom Sequencing</span>
              <span aria-hidden="true">·</span>
              <span>05 · {studioConfig.brandName} Showcase</span>
              <span aria-hidden="true">·</span>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Story Introduction */}
      <RevealSection className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <EditorialImage
              src={mediaManifest.storyIntro.src}
              alt={mediaManifest.storyIntro.alt}
              aspectRatio="4:5"
              caption={mediaManifest.storyIntro.title}
            />
          </div>

          <div className="lg:col-span-7">
            <p className="text-xs font-medium tracking-[0.2em] text-[#8B5742] uppercase">
              Brand Philosophy
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.12] font-normal text-[#282520] sm:text-5xl">
              Not just how it looked. How it felt.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#5E5850]">
              Presented as a guiding creative philosophy for {studioConfig.brandName}: the most
              treasured photographs rarely come from rigid posing. They live in quiet pauses,
              warm window light, and unguarded warmth shared between family.
            </p>

            <blockquote className="mt-10 border-y border-[#D2BC9E]/70 py-8 font-serif text-2xl leading-snug italic text-[#282520] sm:text-3xl">
              &ldquo;Light turns fleeting seconds into family heirlooms—quietly holding the warmth
              of a room long after the celebration fades.&rdquo;
            </blockquote>

            <div className="mt-8">
              <a
                href="/about"
                onClick={(e) => handleNav(e, '/about')}
                className="inline-flex min-h-[44px] items-center gap-2 text-xs font-medium tracking-[0.14em] text-[#282520] uppercase underline decoration-[#8B5742] underline-offset-8 transition-colors hover:text-[#8B5742]"
              >
                <span>Read the Studio Philosophy</span>
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Bespoke Featured Portfolio */}
      <section className="border-t border-[#D2BC9E]/60 bg-[#EFE9DF]/65 py-20 lg:py-28">
        <RevealSection as="div" className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-6 border-b border-[#D2BC9E]/70 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-[#8B5742] uppercase">
                Curated Preview · Conceptual Imagery
              </p>
              <h2 className="mt-3 font-serif text-4xl font-normal text-[#282520] sm:text-5xl">
                Selected Studies in Light
              </h2>
            </div>

            <a
              href="/portfolio"
              onClick={(e) => handleNav(e, '/portfolio')}
              className="inline-flex min-h-[44px] items-center gap-2 text-xs font-medium tracking-[0.14em] text-[#282520] uppercase underline decoration-[#8B5742] underline-offset-8 hover:text-[#8B5742] whitespace-nowrap shrink-0"
            >
              <span>Explore Full Gallery</span>
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-12 md:items-start">
            {/* Tile 1 - 3:4 Portrait */}
            <div className="md:col-span-5">
              <button
                type="button"
                onClick={() => onOpenLightbox(featuredFrames[0])}
                aria-label={`Open lightbox for ${featuredFrames[0].title}`}
                className="group/tile block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B5742]"
              >
                <EditorialImage
                  src={featuredFrames[0].src}
                  alt={featuredFrames[0].alt}
                  aspectRatio="3:4"
                  caption={featuredFrames[0].title}
                  hoverRevealLabel="Inspect Study"
                />
                <div className="relative mt-4 flex items-baseline justify-between gap-4 border-b border-[#D2BC9E]/45 pb-2.5">
                  <span className="font-serif text-xl text-[#282520] transition-colors duration-200 group-hover/tile:text-[#8B5742]">
                    {featuredFrames[0].title}
                  </span>
                  <span className="text-xs tracking-[0.14em] text-[#5E5850] uppercase tabular-nums">
                    01 · 3:4
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-[#8B5742] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tile:scale-x-100 group-focus-visible/tile:scale-x-100"
                  />
                </div>
              </button>
            </div>

            {/* Right Asymmetric Stack */}
            <div className="space-y-10 md:col-span-7 md:pt-12">
              <button
                type="button"
                onClick={() => onOpenLightbox(featuredFrames[1])}
                aria-label={`Open lightbox for ${featuredFrames[1].title}`}
                className="group/tile block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B5742]"
              >
                <EditorialImage
                  src={featuredFrames[1].src}
                  alt={featuredFrames[1].alt}
                  aspectRatio="16:9"
                  caption={featuredFrames[1].title}
                  hoverRevealLabel="Inspect Study"
                />
                <div className="relative mt-4 flex items-baseline justify-between gap-4 border-b border-[#D2BC9E]/45 pb-2.5">
                  <span className="font-serif text-xl text-[#282520] transition-colors duration-200 group-hover/tile:text-[#8B5742]">
                    {featuredFrames[1].title}
                  </span>
                  <span className="text-xs tracking-[0.14em] text-[#5E5850] uppercase tabular-nums">
                    02 · 16:9
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-[#8B5742] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tile:scale-x-100 group-focus-visible/tile:scale-x-100"
                  />
                </div>
              </button>

              <div className="grid gap-8 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => onOpenLightbox(featuredFrames[2])}
                  aria-label={`Open lightbox for ${featuredFrames[2].title}`}
                  className="group/tile block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B5742]"
                >
                  <EditorialImage
                    src={featuredFrames[2].src}
                    alt={featuredFrames[2].alt}
                    aspectRatio="4:5"
                    caption={featuredFrames[2].title}
                    hoverRevealLabel="Inspect Study"
                  />
                  <div className="relative mt-3 flex items-baseline justify-between gap-3 border-b border-[#D2BC9E]/45 pb-2">
                    <span className="font-serif text-lg text-[#282520] transition-colors duration-200 group-hover/tile:text-[#8B5742]">
                      {featuredFrames[2].title}
                    </span>
                    <span className="text-xs text-[#5E5850] tabular-nums">03</span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-[#8B5742] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tile:scale-x-100 group-focus-visible/tile:scale-x-100"
                    />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenLightbox(featuredFrames[3])}
                  aria-label={`Open lightbox for ${featuredFrames[3].title}`}
                  className="group/tile block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B5742]"
                >
                  <EditorialImage
                    src={featuredFrames[3].src}
                    alt={featuredFrames[3].alt}
                    aspectRatio="1:1"
                    caption={featuredFrames[3].title}
                    hoverRevealLabel="Inspect Study"
                  />
                  <div className="relative mt-3 flex items-baseline justify-between gap-3 border-b border-[#D2BC9E]/45 pb-2">
                    <span className="font-serif text-lg text-[#282520] transition-colors duration-200 group-hover/tile:text-[#8B5742]">
                      {featuredFrames[3].title}
                    </span>
                    <span className="text-xs text-[#5E5850] tabular-nums">04</span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-[#8B5742] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tile:scale-x-100 group-focus-visible/tile:scale-x-100"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* Services Preview */}
      {studioConfig.showProposedServices && (
        <RevealSection className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="flex flex-col justify-between gap-6 border-b border-[#D2BC9E]/70 pb-8 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-[0.2em] text-[#8B5742] uppercase">
                Proposed Offerings · Pending Studio Confirmation
              </p>
              <h2 className="mt-3 font-serif text-4xl font-normal text-[#282520] sm:text-5xl">
                Ways We Shape Your Story
              </h2>
            </div>

            <a
              href="/services"
              onClick={(e) => handleNav(e, '/services')}
              className="inline-flex min-h-[44px] items-center gap-2 text-xs font-medium tracking-[0.14em] text-[#282520] uppercase underline decoration-[#8B5742] underline-offset-8 hover:text-[#8B5742] whitespace-nowrap shrink-0"
            >
              <span>All Services &amp; FAQ</span>
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>

          <div className="divide-y divide-[#D2BC9E]/60">
            {studioConfig.proposedServices.map((service) => (
              <div
                key={service.id}
                className="grid gap-4 py-7 transition-colors hover:bg-[#EFE9DF]/45 sm:px-4 md:grid-cols-12 md:items-center md:gap-8"
              >
                <div className="flex items-baseline gap-5 md:col-span-5">
                  <span className="font-sans text-xs font-medium tracking-[0.16em] text-[#8B5742] tabular-nums">
                    {service.index}
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-[#282520] sm:text-3xl">
                    {service.title}
                  </h3>
                </div>

                <p className="text-sm leading-relaxed text-[#5E5850] md:col-span-5">
                  {service.summary}
                </p>

                <div className="md:col-span-2 md:text-right">
                  <button
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    className="inline-flex min-h-[40px] items-center gap-1.5 text-xs font-medium tracking-[0.12em] text-[#282520] uppercase underline decoration-[#D2BC9E] underline-offset-4 transition-colors hover:text-[#8B5742] hover:decoration-[#8B5742]"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>
      )}

      {/* Story / Process Section */}
      <RevealSection className="border-t border-[#D2BC9E]/60 bg-[#F8F5EF] py-20 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-xl">
            <p className="text-xs font-medium tracking-[0.2em] text-[#8B5742] uppercase">
              Creative Rhythm
            </p>
            <h2 className="mt-3 font-serif text-4xl font-normal text-[#282520] sm:text-5xl">
              An Approach Guided by Ease
            </h2>
          </div>

          <div className="mt-14 grid gap-10 border-t border-[#D2BC9E]/70 pt-10 md:grid-cols-3 md:gap-12">
            {studioConfig.processSteps.map((step) => (
              <article key={step.index} className="space-y-4">
                <p className="font-sans text-xs font-medium tracking-[0.2em] text-[#8B5742] tabular-nums">
                  {step.index}
                </p>
                <h3 className="font-serif text-2xl font-normal text-[#282520]">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[#5E5850]">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <CtaBanner onNavigate={onNavigate} />
    </div>
  );
}

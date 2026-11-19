import { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { AppRoute, studioConfig } from '../config/studioConfig';
import { mediaManifest } from '../config/mediaManifest';
import { EditorialImage } from '../components/EditorialImage';
import { CtaBanner } from '../components/CtaBanner';
import { RevealSection } from '../components/RevealSection';

interface ServicesPageProps {
  onNavigate: (route: AppRoute) => void;
  onSelectService: (serviceTitle: string) => void;
}

const SERVICE_IMAGES = [
  mediaManifest.portfolio[0],
  mediaManifest.portfolio[2],
  mediaManifest.portfolio[4],
  mediaManifest.portfolio[1],
  mediaManifest.portfolio[3],
];

export function ServicesPage({ onNavigate, onSelectService }: ServicesPageProps) {
  const [openFaqId, setOpenFaqId] = useState<string | null>(studioConfig.serviceFaqs[0].id);

  return (
    <div className="page-enter">
      {/* Intro Header */}
      <section className="mx-auto max-w-[1280px] px-5 pt-12 pb-16 sm:px-8 lg:px-12 lg:pt-20 lg:pb-20">
        <p className="text-xs font-medium tracking-[0.2em] text-[#8B5742] uppercase">
          Services &amp; Experience
        </p>
        <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.06] font-normal text-[#282520] sm:text-6xl">
          Crafted Around Calm Presence and Lasting Clarity.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#5E5850] sm:text-lg">
          Great coverage shapes how a celebration feels while it is happening—never pulling you
          away from your guests for hours, and always delivering images your family will return to.
        </p>

        {studioConfig.showProposedServices && (
          <div className="mt-8 border border-[#D2BC9E] bg-[#EFE9DF]/70 px-5 py-4 text-xs leading-relaxed text-[#5E5850]">
            <span className="font-medium text-[#282520]">Proposed Demo Offerings:</span> The five
            categories below are candidate services prepared for {studioConfig.brandName} to
            confirm, edit, or toggle via{' '}
            <code className="font-mono text-[11px] text-[#282520]">
              studioConfig.showProposedServices
            </code>
            . No pricing packages or equipment inventories are assumed.
          </div>
        )}
      </section>

      {/* Proposed Service Sections */}
      {studioConfig.showProposedServices ? (
        <section className="border-t border-[#D2BC9E]/60">
          <RevealSection as="div" className="mx-auto max-w-[1280px] divide-y divide-[#D2BC9E]/60 px-5 sm:px-8 lg:px-12">
            {studioConfig.proposedServices.map((service, index) => {
              const image = SERVICE_IMAGES[index % SERVICE_IMAGES.length];
              const isReversed = index % 2 === 1;
              return (
                <article
                  key={service.id}
                  className="grid items-center gap-10 py-14 lg:grid-cols-12 lg:gap-16 lg:py-20"
                >
                  <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : ''}`}>
                    <EditorialImage
                      src={image.src}
                      alt={image.alt}
                      aspectRatio="4:5"
                      caption={`${service.title} (Conceptual illustration)`}
                    />
                  </div>

                  <div className={`space-y-6 lg:col-span-7 ${isReversed ? 'lg:order-1' : ''}`}>
                    <div className="flex items-center gap-3 text-xs tracking-[0.18em] text-[#8B5742] uppercase">
                      <span className="tabular-nums">{service.index}</span>
                      <span aria-hidden="true">·</span>
                      <span>{service.categoryTag}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#5E5850]">Proposed Category</span>
                    </div>

                    <h2 className="font-serif text-3xl font-normal text-[#282520] sm:text-4xl">
                      {service.title}
                    </h2>

                    <p className="max-w-xl text-base leading-relaxed text-[#5E5850]">
                      {service.summary}
                    </p>

                    <div className="border-t border-[#D2BC9E]/60 pt-5">
                      <h3 className="font-sans text-xs font-medium tracking-[0.14em] text-[#282520] uppercase">
                        Why the Experience Matters
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#5E5850]">
                        {service.outcome}
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => onSelectService(service.title)}
                        className="inline-flex min-h-[44px] items-center gap-3 border border-[#282520] px-6 py-3 text-xs font-medium tracking-[0.14em] text-[#282520] uppercase transition-colors hover:bg-[#282520] hover:text-[#F8F5EF]"
                      >
                        <span>Inquire About {service.title}</span>
                        <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </RevealSection>
        </section>
      ) : (
        <section className="mx-auto max-w-[1280px] border-t border-[#D2BC9E]/60 px-5 py-16 sm:px-8 lg:px-12">
          <p className="text-base text-[#5E5850]">
            Service offerings are currently awaiting final studio confirmation. Please reach out
            via the{' '}
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/contact');
              }}
              className="text-[#282520] underline underline-offset-4"
            >
              Contact page
            </a>{' '}
            for custom coverage inquiries.
          </p>
        </section>
      )}

      {/* Truthful Service FAQs */}
      <section className="border-t border-[#D2BC9E]/60 bg-[#EFE9DF]/65 py-20 lg:py-24">
        <RevealSection as="div" className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-xs font-medium tracking-[0.2em] text-[#8B5742] uppercase">
                Questions &amp; Clarity
              </p>
              <h2 className="mt-3 font-serif text-3xl font-normal text-[#282520] sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#5E5850]">
                Clear answers about how inquiries work on this preview and what details will be
                finalized before launch.
              </p>
            </div>

            <div className="divide-y divide-[#D2BC9E]/70 border-y border-[#D2BC9E]/70 lg:col-span-8">
              {studioConfig.serviceFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${faq.id}`}
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="flex min-h-[56px] w-full items-center justify-between gap-4 py-5 text-left text-[#282520] transition-colors hover:text-[#8B5742] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5742]"
                    >
                      <span className="font-serif text-xl font-normal sm:text-2xl">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[#8B5742] transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div
                        id={`faq-panel-${faq.id}`}
                        className="pb-6 pr-8 text-sm leading-relaxed text-[#5E5850]"
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </RevealSection>
      </section>

      <CtaBanner onNavigate={onNavigate} />
    </div>
  );
}

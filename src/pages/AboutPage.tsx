import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { AppRoute, studioConfig } from '../config/studioConfig';
import { mediaManifest } from '../config/mediaManifest';
import { EditorialImage } from '../components/EditorialImage';
import { CtaBanner } from '../components/CtaBanner';

interface AboutPageProps {
  onNavigate: (route: AppRoute) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="page-enter">
      {/* Editorial Header */}
      <section className="mx-auto max-w-[1280px] px-5 pt-12 pb-16 sm:px-8 lg:px-12 lg:pt-20 lg:pb-24">
        <p className="text-xs font-medium tracking-[0.2em] text-[#8B5742] uppercase">
          About · {studioConfig.brandName}
        </p>
        <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.06] font-normal text-[#282520] sm:text-6xl">
          Presence, Patience &amp; Human Connection.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#5E5850] sm:text-lg">
          {studioConfig.conceptTitle} is an editorial design concept created for{' '}
          {studioConfig.brandName}, centered on preserving real moments gently—with warmth,
          discretion, and deep respect for the families in front of the lens.
        </p>
      </section>

      {/* Narrative + Conceptual BTS Frame */}
      <section className="border-t border-[#D2BC9E]/60 bg-[#EFE9DF]/65 py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
          <div className="lg:col-span-6">
            <EditorialImage
              src={mediaManifest.aboutBts.src}
              alt={mediaManifest.aboutBts.alt}
              aspectRatio="4:5"
              caption={mediaManifest.aboutBts.title}
            />
            <p className="mt-3 text-xs text-[#5E5850]">
              Conceptual behind-the-scenes placeholder. Replace via{' '}
              <code className="font-mono text-[11px] text-[#282520]">mediaManifest.aboutBts</code>{' '}
              with an authorized studio portrait.
            </p>
          </div>

          <div className="space-y-6 lg:col-span-6">
            <p className="text-xs font-medium tracking-[0.2em] text-[#8B5742] uppercase">
              Creative Point of View
            </p>
            <h2 className="font-serif text-3xl leading-snug font-normal text-[#282520] sm:text-4xl">
              Memories Deserve Quiet Space to Breathe.
            </h2>
            <p className="text-base leading-relaxed text-[#5E5850]">
              Trends in editing and dramatic staging fade quickly, whereas honest expressions—an
              elder&apos;s blessing, laughter shared between siblings, morning light moving across
              fabric—grow more valuable with every passing decade.
            </p>
            <p className="text-base leading-relaxed text-[#5E5850]">
              Rather than turning celebrations into hurried productions, this studio philosophy
              prioritizes calm observation, gentle direction only when welcome, and clean, true-to-life
              warm tones.
            </p>

            <div className="pt-4">
              <a
                href="/portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/portfolio');
                }}
                className="inline-flex min-h-[44px] items-center gap-2 text-xs font-medium tracking-[0.14em] text-[#282520] uppercase underline decoration-[#8B5742] underline-offset-8 hover:text-[#8B5742]"
              >
                <span>View Conceptual Gallery</span>
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Studio Identity Ledger */}
      <section className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.2em] text-[#8B5742] uppercase">
              Transparent Identity
            </p>
            <h2 className="mt-3 font-serif text-3xl font-normal text-[#282520] sm:text-4xl">
              Confirmed Details &amp; Configurable Fields
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#5E5850]">
              To keep this demonstration strictly accurate, only confirmed studio inputs are
              presented as established facts. Additional biographical notes, team introductions,
              and address details can be inserted directly in{' '}
              <code className="font-mono text-xs text-[#282520]">studioConfig.ts</code>.
            </p>
          </div>

          <div className="divide-y divide-[#D2BC9E]/70 border-y border-[#D2BC9E]/70 lg:col-span-7">
            <div className="grid gap-2 py-5 sm:grid-cols-3 sm:gap-6">
              <span className="text-xs font-medium tracking-[0.14em] text-[#5E5850] uppercase">
                Studio Name
              </span>
              <span className="text-sm font-medium text-[#282520] sm:col-span-2">
                {studioConfig.brandName} (Verified)
              </span>
            </div>

            <div className="grid gap-2 py-5 sm:grid-cols-3 sm:gap-6">
              <span className="text-xs font-medium tracking-[0.14em] text-[#5E5850] uppercase">
                Instagram
              </span>
              <div className="sm:col-span-2">
                <a
                  href={studioConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#282520] underline decoration-[#8B5742] underline-offset-4 hover:text-[#8B5742]"
                >
                  <span>{studioConfig.instagramHandle}</span>
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="grid gap-2 py-5 sm:grid-cols-3 sm:gap-6">
              <span className="text-xs font-medium tracking-[0.14em] text-[#5E5850] uppercase">
                Region
              </span>
              <div className="space-y-1 sm:col-span-2">
                <p className="text-sm text-[#282520]">{studioConfig.location.inferredLabel}</p>
                <p className="text-xs text-[#5E5850]">{studioConfig.location.disclosure}</p>
              </div>
            </div>

            <div className="grid gap-2 py-5 sm:grid-cols-3 sm:gap-6">
              <span className="text-xs font-medium tracking-[0.14em] text-[#5E5850] uppercase">
                History &amp; Team
              </span>
              <p className="text-sm text-[#5E5850] sm:col-span-2">
                Founder biography, founding year, and studio story reserved for authentic copy
                supplied by the business owner.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner onNavigate={onNavigate} />
    </div>
  );
}

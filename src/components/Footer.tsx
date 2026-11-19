import { ArrowUpRight } from 'lucide-react';
import { AppRoute, studioConfig } from '../config/studioConfig';

interface FooterProps {
  onNavigate: (route: AppRoute) => void;
}

const FOOTER_LINKS: { route: AppRoute; label: string }[] = [
  { route: '/', label: 'Home' },
  { route: '/about', label: 'About' },
  { route: '/services', label: 'Services' },
  { route: '/portfolio', label: 'Portfolio' },
  { route: '/contact', label: 'Contact' },
];

export function Footer({ onNavigate }: FooterProps) {
  const handleNav = (event: React.MouseEvent<HTMLAnchorElement>, route: AppRoute) => {
    event.preventDefault();
    onNavigate(route);
  };

  return (
    <footer className="border-t border-[#D2BC9E]/60 bg-[#EFE9DF] text-[#282520]">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <a
              href="/"
              onClick={(e) => handleNav(e, '/')}
              className="inline-block font-serif text-2xl font-medium tracking-[0.16em] text-[#282520] uppercase"
            >
              {studioConfig.wordmark.top}{' '}
              <span className="text-[#8B5742]" aria-hidden="true">
                /
              </span>{' '}
              {studioConfig.wordmark.bottom}
            </a>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#5E5850]">
              {studioConfig.conceptTitle}: an editorial showcase demonstrating calm natural-light
              visual storytelling, crafted for {studioConfig.brandName}.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-[#5E5850]">
              Inferred region: {studioConfig.location.inferredLabel} (
              {studioConfig.location.verified ? 'Verified' : 'Pending studio confirmation'}).
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-sans text-xs font-medium tracking-[0.16em] text-[#5E5850] uppercase">
              Pages
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.route}>
                  <a
                    href={link.route}
                    onClick={(e) => handleNav(e, link.route)}
                    className="group relative inline-flex min-h-[32px] items-center text-sm text-[#282520] transition-colors duration-200 hover:text-[#8B5742]"
                  >
                    <span>{link.label}</span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-1 h-px origin-left scale-x-0 bg-[#8B5742] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h2 className="font-sans text-xs font-medium tracking-[0.16em] text-[#5E5850] uppercase">
              Connect &amp; Inquiries
            </h2>
            <div className="mt-4 space-y-3 text-sm text-[#282520]">
              <a
                href={studioConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium underline decoration-[#D2BC9E] underline-offset-4 transition-colors hover:text-[#8B5742] hover:decoration-[#8B5742]"
              >
                <span>Instagram · {studioConfig.instagramHandle}</span>
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </a>
              <p className="text-xs leading-relaxed text-[#5E5850]">
                {studioConfig.contact.hoursNote}
              </p>
              <div className="pt-2">
                <a
                  href="/contact"
                  onClick={(e) => handleNav(e, '/contact')}
                  className="inline-flex min-h-[44px] items-center justify-center border border-[#282520] px-5 py-2.5 text-xs font-medium tracking-[0.12em] text-[#282520] uppercase transition-colors hover:bg-[#282520] hover:text-[#F8F5EF]"
                >
                  Open Booking Form
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[#D2BC9E]/60 pt-8 text-xs text-[#5E5850] sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {studioConfig.brandName}. Concept demonstration site —
            editable business facts &amp; imagery via studio configuration.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="min-h-[36px] text-xs font-medium tracking-[0.12em] text-[#282520] uppercase underline decoration-[#D2BC9E] underline-offset-4 hover:text-[#8B5742]"
          >
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}

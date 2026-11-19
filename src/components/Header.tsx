import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AppRoute, studioConfig } from '../config/studioConfig';

interface HeaderProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

const NAV_ITEMS: { route: AppRoute; label: string }[] = [
  { route: '/', label: 'Home' },
  { route: '/about', label: 'About' },
  { route: '/services', label: 'Services' },
  { route: '/portfolio', label: 'Portfolio' },
];

export function Header({ currentRoute, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, route: AppRoute) => {
    event.preventDefault();
    setMobileOpen(false);
    onNavigate(route);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#D2BC9E]/60 bg-[#F8F5EF]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-8 px-5 sm:px-8 lg:px-12">
          {/* Zone 1: Single-element Brand Wordmark */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="font-serif text-lg font-medium tracking-[0.16em] text-[#282520] uppercase transition-opacity duration-200 hover:opacity-80 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B5742] sm:text-xl"
          >
            {studioConfig.wordmark.top}{' '}
            <span className="text-[#8B5742]" aria-hidden="true">
              /
            </span>{' '}
            {studioConfig.wordmark.bottom}
          </a>

          {/* Zone 2: Clean single-line navigation links */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <a
                  key={item.route}
                  href={item.route}
                  onClick={(e) => handleLinkClick(e, item.route)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative py-1.5 text-sm tracking-wide transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B5742] ${
                    isActive
                      ? 'font-medium text-[#282520]'
                      : 'text-[#5E5850] hover:text-[#282520]'
                  }`}
                >
                  <span className="inline-block transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[1px] group-focus-visible:-translate-y-[1px]">
                    {item.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-px origin-left bg-[#8B5742] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action (+ mobile menu trigger on small viewports) */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, '/contact')}
              className={`hidden md:inline-flex items-center justify-center border px-5 py-2 text-xs font-medium tracking-[0.12em] uppercase transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B5742] ${
                currentRoute === '/contact'
                  ? 'border-[#282520] bg-[#282520] text-[#F8F5EF]'
                  : 'border-[#8B5742] bg-[#8B5742] text-[#F8F5EF] hover:border-[#282520] hover:bg-[#282520]'
              }`}
            >
              Enquire
            </a>

            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center text-[#282520] transition-colors hover:bg-[#EFE9DF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5742] md:hidden"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#F8F5EF] px-6 pt-5 pb-[max(2rem,env(safe-area-inset-bottom))] md:hidden"
        >
          <div>
            <div className="flex h-12 items-center justify-between border-b border-[#D2BC9E]/60 pb-4">
              <span className="font-serif text-lg font-medium tracking-[0.16em] text-[#282520] uppercase">
                {studioConfig.wordmark.top}{' '}
                <span className="text-[#8B5742]" aria-hidden="true">
                  /
                </span>{' '}
                {studioConfig.wordmark.bottom}
              </span>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center text-[#282520] hover:bg-[#EFE9DF] focus-visible:outline-2 focus-visible:outline-[#8B5742]"
              >
                <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile navigation links" className="mt-8 flex flex-col">
              {[...NAV_ITEMS, { route: '/contact' as AppRoute, label: 'Contact & Booking' }].map(
                (item, idx) => {
                  const isActive = currentRoute === item.route;
                  return (
                    <a
                      key={item.route}
                      href={item.route}
                      onClick={(e) => handleLinkClick(e, item.route)}
                      aria-current={isActive ? 'page' : undefined}
                      className="group flex min-h-[52px] items-baseline justify-between border-b border-[#D2BC9E]/40 py-3 font-serif text-3xl text-[#282520] transition-colors duration-200 hover:text-[#8B5742]"
                    >
                      <span className="transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
                        {item.label}
                      </span>
                      <span className="font-sans text-xs tracking-widest text-[#5E5850] transition-colors duration-200 group-hover:text-[#8B5742] tabular-nums">
                        0{idx + 1}
                      </span>
                    </a>
                  );
                },
              )}
            </nav>
          </div>

          <div className="space-y-4 border-t border-[#D2BC9E]/60 pt-6">
            <p className="text-xs leading-relaxed text-[#5E5850]">
              {studioConfig.conceptTitle} — Concept showcase prepared for {studioConfig.brandName}.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/contact"
                onClick={(e) => handleLinkClick(e, '/contact')}
                className="inline-flex min-h-[44px] items-center justify-center bg-[#8B5742] px-6 py-3 text-xs font-medium tracking-[0.12em] text-[#F8F5EF] uppercase"
              >
                Start an Inquiry
              </a>
              <a
                href={studioConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center text-xs font-medium tracking-[0.1em] text-[#282520] underline underline-offset-4"
              >
                Instagram ({studioConfig.instagramHandle})
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { useCallback, useEffect, useState } from 'react';
import { AppRoute, studioConfig } from './config/studioConfig';
import { mediaManifest, type MediaAssetItem } from './config/mediaManifest';
import { getRouteMeta, resolveRoute } from './utils/inquiry';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ContactPage } from './pages/ContactPage';

function updateHeadMetadata(route: AppRoute) {
  const meta = getRouteMeta(route);
  document.title = meta.title;

  const setMeta = (selector: string, content: string, createAttr?: [string, string]) => {
    let el = document.querySelector<HTMLMetaElement>(selector);
    if (!el && createAttr) {
      el = document.createElement('meta');
      el.setAttribute(createAttr[0], createAttr[1]);
      document.head.appendChild(el);
    }
    if (el) {
      el.setAttribute('content', content);
    }
  };

  setMeta('meta[name="description"]', meta.description, ['name', 'description']);
  setMeta('meta[property="og:title"]', meta.title, ['property', 'og:title']);
  setMeta('meta[property="og:description"]', meta.description, ['property', 'og:description']);
  setMeta('meta[name="twitter:title"]', meta.title, ['name', 'twitter:title']);
  setMeta('meta[name="twitter:description"]', meta.description, ['name', 'twitter:description']);

  const origin = studioConfig.seo.canonicalBaseUrl || window.location.origin;
  const canonicalUrl = `${origin}${route === '/' ? '/' : route}`;

  let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  setMeta('meta[property="og:url"]', canonicalUrl, ['property', 'og:url']);
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() =>
    resolveRoute(window.location.pathname),
  );
  const [preselectedService, setPreselectedService] = useState<string>('');
  const [lightboxPool, setLightboxPool] = useState<MediaAssetItem[]>(mediaManifest.portfolio);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    updateHeadMetadata(currentRoute);
  }, [currentRoute]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(resolveRoute(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((route: AppRoute) => {
    const target = resolveRoute(route);
    if (window.location.pathname !== target) {
      window.history.pushState({}, '', target);
    }
    setCurrentRoute(target);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleSelectService = useCallback(
    (serviceTitle: string) => {
      setPreselectedService(serviceTitle);
      navigate('/contact');
    },
    [navigate],
  );

  const handleOpenLightbox = useCallback(
    (item: MediaAssetItem, pool: MediaAssetItem[] = mediaManifest.portfolio) => {
      const idx = pool.findIndex((entry) => entry.id === item.id);
      setLightboxPool(pool);
      setLightboxIndex(idx >= 0 ? idx : 0);
    },
    [],
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F5EF] text-[#282520]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-[#282520] focus:px-4 focus:py-2 focus:text-xs focus:text-[#F8F5EF]"
      >
        Skip to main content
      </a>

      <Header currentRoute={currentRoute} onNavigate={navigate} />

      <main id="main-content" className="flex-1">
        {currentRoute === '/' && (
          <HomePage
            onNavigate={navigate}
            onSelectService={handleSelectService}
            onOpenLightbox={(item) => handleOpenLightbox(item, mediaManifest.portfolio)}
          />
        )}
        {currentRoute === '/about' && <AboutPage onNavigate={navigate} />}
        {currentRoute === '/services' && (
          <ServicesPage onNavigate={navigate} onSelectService={handleSelectService} />
        )}
        {currentRoute === '/portfolio' && (
          <PortfolioPage onNavigate={navigate} onOpenLightbox={handleOpenLightbox} />
        )}
        {currentRoute === '/contact' && <ContactPage preselectedService={preselectedService} />}
      </main>

      <Footer onNavigate={navigate} />

      <LightboxModal
        items={lightboxPool}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={(nextIdx) => setLightboxIndex(nextIdx)}
      />
    </div>
  );
}

import { AppRoute, studioConfig } from '../config/studioConfig';
import type { MediaAssetItem } from '../config/mediaManifest';

export interface RouteMeta {
  route: AppRoute;
  label: string;
  title: string;
  description: string;
}

export const ROUTE_META: Record<AppRoute, RouteMeta> = {
  '/': {
    route: '/',
    label: 'Home',
    title: 'Radhe Studio — Stories in Light | Editorial Photography',
    description:
      'An intimate ivory editorial photography showcase for Radhe Studio. Discover Stories in Light, philosophy, curated gallery frames, and booking inquiries.',
  },
  '/about': {
    route: '/about',
    label: 'About',
    title: 'About — Radhe Studio | Philosophy & Presence',
    description:
      'Learn about the Stories in Light approach at Radhe Studio—preserving memory, human connection, and transparent studio identity.',
  },
  '/services': {
    route: '/services',
    label: 'Services',
    title: 'Services — Radhe Studio | Proposed Offerings & FAQ',
    description:
      'Explore proposed photography and film offerings for Radhe Studio, expected experience outcomes, and honest client FAQs.',
  },
  '/portfolio': {
    route: '/portfolio',
    label: 'Portfolio',
    title: 'Portfolio — Radhe Studio | Stories in Light Gallery',
    description:
      'Browse a responsive editorial photography gallery with mixed aspect ratios and accessible lightbox navigation for Radhe Studio.',
  },
  '/contact': {
    route: '/contact',
    label: 'Contact',
    title: 'Contact — Radhe Studio | Booking Inquiry',
    description:
      'Share your celebration date, location, and story with Radhe Studio using the interactive booking inquiry builder or connect on Instagram.',
  },
};

export function resolveRoute(pathname: string): AppRoute {
  const cleaned = pathname.replace(/\/+$/, '') || '/';
  if (
    cleaned === '/' ||
    cleaned === '/about' ||
    cleaned === '/services' ||
    cleaned === '/portfolio' ||
    cleaned === '/contact'
  ) {
    return cleaned;
  }
  return '/';
}

export function getRouteMeta(route: AppRoute): RouteMeta {
  return ROUTE_META[route];
}

export type PortfolioFilter = 'All' | 'Weddings' | 'Pre-Wedding' | 'Events' | 'Heirlooms';

export function filterPortfolioItems(
  items: MediaAssetItem[],
  filter: PortfolioFilter,
): MediaAssetItem[] {
  if (filter === 'All') {
    return items;
  }
  return items.filter((item) => item.category === filter);
}

export interface InquiryFormData {
  name: string;
  phone: string;
  eventType: string;
  eventDate: string;
  location: string;
  message: string;
}

export type InquiryValidationErrors = Partial<Record<keyof InquiryFormData, string>>;

export function validateInquiry(data: InquiryFormData, referenceDate?: Date): InquiryValidationErrors {
  const errors: InquiryValidationErrors = {};

  if (data.name.trim().length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  const phoneDigits = data.phone.replace(/\D/g, '');
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone = 'Please enter a valid contact phone number (7–15 digits).';
  }

  if (!data.eventType.trim()) {
    errors.eventType = 'Please select an event or session type.';
  }

  if (!data.eventDate.trim()) {
    errors.eventDate = 'Please select a preferred or tentative event date.';
  } else {
    const parsed = new Date(`${data.eventDate}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) {
      errors.eventDate = 'Please enter a valid date.';
    } else {
      const today = referenceDate ? new Date(referenceDate) : new Date();
      today.setHours(0, 0, 0, 0);
      if (parsed < today) {
        errors.eventDate = 'Please choose today or an upcoming event date.';
      }
    }
  }

  if (data.location.trim().length < 2) {
    errors.location = 'Please enter the city or venue location.';
  }

  if (data.message.trim().length < 10) {
    errors.message = 'Please share a brief note about your plans (at least 10 characters).';
  }

  return errors;
}

export function buildInquirySummary(data: InquiryFormData): string {
  const lines = [
    `Hello ${studioConfig.brandName},`,
    '',
    `I would like to inquire about ${data.eventType.trim()}.`,
    `• Name: ${data.name.trim()}`,
    `• Phone: ${data.phone.trim()}`,
    `• Preferred Date: ${data.eventDate.trim()}`,
    `• Location: ${data.location.trim()}`,
    '',
    `Notes: ${data.message.trim()}`,
  ];
  return lines.join('\n');
}

export function buildWhatsAppDeepLink(
  summaryText: string,
  whatsappNumber: string | null = studioConfig.contact.whatsappNumber,
  whatsappVerified: boolean = studioConfig.contact.whatsappVerified,
): string | null {
  if (!whatsappVerified || !whatsappNumber) {
    return null;
  }
  const digits = whatsappNumber.replace(/\D/g, '');
  if (digits.length < 8) {
    return null;
  }
  return `https://wa.me/${digits}?text=${encodeURIComponent(summaryText)}`;
}

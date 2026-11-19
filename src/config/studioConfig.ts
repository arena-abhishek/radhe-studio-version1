export type AppRoute = '/' | '/about' | '/services' | '/portfolio' | '/contact';

export interface ProposedServiceItem {
  id: string;
  slug: string;
  index: string;
  title: string;
  categoryTag: string;
  summary: string;
  outcome: string;
  proposedDemo: boolean;
}

export interface ServiceFaqItem {
  id: string;
  question: string;
  answer: string;
}

export const studioConfig = {
  brandName: 'Radhe Studio',
  wordmark: {
    top: 'RADHE',
    bottom: 'STUDIO',
  },
  conceptTitle: 'Stories in Light',
  tagline: 'An intimate approach to capturing the stories that matter.',
  instagramUrl: 'https://www.instagram.com/radhestudiotharad/',
  instagramHandle: '@radhestudiotharad',
  location: {
    inferredLabel: 'Tharad, Gujarat, India',
    verified: false,
    disclosure:
      'Location inferred from the @radhestudiotharad handle and subject to studio confirmation prior to publication.',
  },
  contact: {
    /**
     * Set to an international digits-only phone number (e.g. "9198XXXXXXXX")
     * and flip whatsappVerified to true once confirmed by Radhe Studio.
     */
    whatsappNumber: null as string | null,
    whatsappVerified: false,
    email: null as string | null,
    emailVerified: false,
    hoursNote: 'Studio hours and direct phone lines will be published once confirmed by the studio.',
  },
  seo: {
    /**
     * Set your production domain (e.g. "https://radhestudiotharad.com") before deployment.
     * When empty, canonical URLs resolve dynamically from window.location.origin.
     */
    canonicalBaseUrl: '',
    defaultOgTitle: 'Radhe Studio — Stories in Light | Editorial Photography',
    defaultOgDescription:
      'Warm ivory editorial photography showcase for Radhe Studio. Explore portfolio framing, philosophy, proposed offerings, and booking inquiries.',
  },
  /**
   * Flag separating verified studio identity from proposed demonstration categories.
   * Toggle to false if only confirmed services should appear.
   */
  showProposedServices: true,
  proposedServices: [
    {
      id: 'wedding-photography',
      slug: 'wedding-photography',
      index: '01',
      title: 'Wedding Photography',
      categoryTag: 'Weddings',
      summary:
        'Unobtrusive visual storytelling centered on family warmth, rituals, and quiet in-between expressions across multi-day celebrations.',
      outcome:
        'A cohesive, timeless visual record that lets you relive how the day felt rather than merely how it was staged.',
      proposedDemo: true,
    },
    {
      id: 'pre-wedding-photography',
      slug: 'pre-wedding-photography',
      index: '02',
      title: 'Pre-Wedding Photography',
      categoryTag: 'Pre-Wedding',
      summary:
        'Unhurried portrait sessions shaped around natural golden-hour light, relaxed conversation, and honest movement.',
      outcome:
        'Comfortable, unforced portraits that build trust ahead of your celebration and stand on their own as framed keepsakes.',
      proposedDemo: true,
    },
    {
      id: 'cinematic-films',
      slug: 'cinematic-films',
      index: '03',
      title: 'Cinematic Films',
      categoryTag: 'Motion',
      summary:
        'Measured motion storytelling weaving ambient sound, spoken blessings, and gentle pacing into keepsake films.',
      outcome:
        'Living atmosphere you can return to years later—preserving voices, laughter, and quiet glances in motion.',
      proposedDemo: true,
    },
    {
      id: 'event-photography',
      slug: 'event-photography',
      index: '04',
      title: 'Event Photography',
      categoryTag: 'Events',
      summary:
        'Thoughtful documentary coverage for milestone family gatherings, cultural ceremonies, and intimate evenings.',
      outcome:
        'Balanced documentation honoring both the central moments and the guests who gathered to share them.',
      proposedDemo: true,
    },
    {
      id: 'album-design',
      slug: 'album-design',
      index: '05',
      title: 'Album Design',
      categoryTag: 'Heirlooms',
      summary:
        'Editorial sequencing and tactile heirloom layouts designed to live on coffee tables and pass between generations.',
      outcome:
        'Photographs removed from fleeting screens and given enduring physical form with breathing room and narrative flow.',
      proposedDemo: true,
    },
  ] as ProposedServiceItem[],
  processSteps: [
    {
      index: '01',
      title: 'Listening & Alignment',
      description:
        'Every commission begins with a quiet conversation about your gathering, family traditions, and what matters most to preserve.',
    },
    {
      index: '02',
      title: 'Unhurried Presence',
      description:
        'During celebrations, we observe gently and follow natural light—leaving room for authentic emotion without rigid interruptions.',
    },
    {
      index: '03',
      title: 'Considered Curation',
      description:
        'Each gallery is sequenced like an editorial chapter, prioritizing emotional resonance, clean color harmony, and lasting clarity.',
    },
  ],
  serviceFaqs: [
    {
      id: 'faq-confirmation',
      question: 'Are all listed service categories currently active?',
      answer:
        'The five categories shown on this demonstration site are proposed offerings prepared for Radhe Studio to review and confirm prior to public launch. Use the inquiry page to ask directly about specific coverage needs.',
    },
    {
      id: 'faq-location',
      question: 'Where is Radhe Studio based and can dates be discussed outside one city?',
      answer:
        'The studio name and @radhestudiotharad handle suggest Tharad, Gujarat, India, though exact studio address and travel radius will be finalized by the business owner before publication.',
    },
    {
      id: 'faq-inquiry',
      question: 'What happens when I submit the inquiry form on this demo?',
      answer:
        'Because this site is an interactive preview without an external email or WhatsApp gateway wired yet, submitting the form validates your details and prepares an editable inquiry summary you can copy or share directly via Instagram.',
    },
    {
      id: 'faq-timeline',
      question: 'How early should families reach out to check availability?',
      answer:
        'Sharing your tentative event date, location, and celebration type as soon as dates are penciled in allows the studio to confirm availability and discuss coverage calmly.',
    },
    {
      id: 'faq-albums',
      question: 'Why does the studio emphasize tactile albums alongside digital galleries?',
      answer:
        'Screens and file formats change over decades, whereas a thoughtfully sequenced linen or archival print album remains immediately accessible to family members at home.',
    },
  ] as ServiceFaqItem[],
} as const;

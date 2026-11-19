export type MediaAspectRatio = '3:4' | '4:5' | '1:1' | '16:9';

export interface MediaAssetItem {
  id: string;
  src: string;
  aspectRatio: MediaAspectRatio;
  category: 'Weddings' | 'Pre-Wedding' | 'Events' | 'Heirlooms';
  title: string;
  caption: string;
  alt: string;
  isConceptualDemo: boolean;
  replacementSlot: string;
}

/**
 * Centralized Media Manifest for Radhe Studio — Stories in Light.
 * All images below are disclosed conceptual demonstration assets generated
 * for layout evaluation. Replace `src` paths with authorized Radhe Studio
 * photography and update `isConceptualDemo` to false before publication.
 */
export const mediaManifest = {
  hero: {
    id: 'hero-portrait',
    src: '/src/assets/images/hero_editorial_portrait_1795104010685.jpg',
    aspectRatio: '3:4' as MediaAspectRatio,
    title: 'Morning Light Study',
    alt: 'Conceptual editorial portrait of a bride in an ivory silk drape beside sunlit sandstone arches in soft morning light.',
    isConceptualDemo: true,
    replacementSlot: 'hero.src (Recommended 3:4 portrait photograph)',
  },
  storyIntro: {
    id: 'story-hands',
    src: '/src/assets/images/story_light_hands_1795104011080.jpg',
    aspectRatio: '4:5' as MediaAspectRatio,
    title: 'Quiet Connection',
    alt: 'Conceptual close-up photograph of two hands gently clasped in warm golden-hour sunlight with heirloom gold jewelry.',
    isConceptualDemo: true,
    replacementSlot: 'storyIntro.src (Recommended 4:3 or 4:5 intimate detail)',
  },
  aboutBts: {
    id: 'about-bts',
    src: '/src/assets/images/about_bts_camera_1795104011602.jpg',
    aspectRatio: '4:5' as MediaAspectRatio,
    title: 'At Work With Natural Light',
    alt: 'Conceptual behind-the-scenes study of a photographer adjusting a prime lens beside warm window light.',
    isConceptualDemo: true,
    replacementSlot: 'aboutBts.src (Replace with authorized Radhe Studio BTS portrait)',
  },
  ctaBackdrop: {
    id: 'cta-horizon',
    src: '/src/assets/images/cta_golden_horizon_1795104010859.jpg',
    aspectRatio: '16:9' as MediaAspectRatio,
    title: 'Late Afternoon Courtyard',
    alt: 'Conceptual wide architectural study of golden-hour light casting soft shadows across textured lime-plaster arches.',
    isConceptualDemo: true,
    replacementSlot: 'ctaBackdrop.src (Recommended 16:9 atmospheric scene)',
  },
  portfolio: [
    {
      id: 'frame-01',
      src: '/src/assets/images/hero_editorial_portrait_1795104010685.jpg',
      aspectRatio: '3:4',
      category: 'Weddings',
      title: 'Frame 01 · Morning Courtyard Portrait',
      caption: 'Conceptual study demonstrating vertical 3:4 portrait framing in soft architectural daylight.',
      alt: 'Conceptual vertical wedding portrait beside sandstone arches in warm morning light.',
      isConceptualDemo: true,
      replacementSlot: 'portfolio[0] (3:4 vertical portrait)',
    },
    {
      id: 'frame-02',
      src: '/src/assets/images/portfolio_ceremony_wide_1795104010996.jpg',
      aspectRatio: '16:9',
      category: 'Events',
      title: 'Frame 02 · Evening Lantern Gathering',
      caption: 'Conceptual study demonstrating wide 16:9 documentary coverage of an outdoor evening celebration.',
      alt: 'Conceptual wide evening courtyard celebration illuminated by warm brass lanterns and floral petals.',
      isConceptualDemo: true,
      replacementSlot: 'portfolio[1] (16:9 wide celebration)',
    },
    {
      id: 'frame-03',
      src: '/src/assets/images/portfolio_couple_walk_1795104011367.jpg',
      aspectRatio: '4:5',
      category: 'Pre-Wedding',
      title: 'Frame 03 · Colonnade Stroll',
      caption: 'Conceptual study demonstrating unposed 4:5 couple movement along sunlit heritage stone.',
      alt: 'Conceptual candid photograph of a couple walking together under sunlit stone arches.',
      isConceptualDemo: true,
      replacementSlot: 'portfolio[2] (4:5 couple portrait)',
    },
    {
      id: 'frame-04',
      src: '/src/assets/images/portfolio_detail_still_1795104010752.jpg',
      aspectRatio: '1:1',
      category: 'Heirlooms',
      title: 'Frame 04 · Linen Archive & Brass',
      caption: 'Conceptual study demonstrating 1:1 tactile album and heirloom detail photography.',
      alt: 'Conceptual square still life of a linen-bound photo album and brass vessel on travertine stone.',
      isConceptualDemo: true,
      replacementSlot: 'portfolio[3] (1:1 album or detail still life)',
    },
    {
      id: 'frame-05',
      src: '/src/assets/images/portfolio_portrait_veil_1795104011100.jpg',
      aspectRatio: '3:4',
      category: 'Weddings',
      title: 'Frame 05 · Backlit Veil Study',
      caption: 'Conceptual study demonstrating delicate 3:4 backlit fabric and quiet bridal expression.',
      alt: 'Conceptual fine-art portrait framed through a sheer ivory veil in late-afternoon sun.',
      isConceptualDemo: true,
      replacementSlot: 'portfolio[4] (3:4 golden hour portrait)',
    },
    {
      id: 'frame-06',
      src: '/src/assets/images/story_light_hands_1795104011080.jpg',
      aspectRatio: '4:5',
      category: 'Pre-Wedding',
      title: 'Frame 06 · Golden Hour Gesture',
      caption: 'Conceptual study demonstrating 4:5 intimate close-up storytelling.',
      alt: 'Conceptual close-up of clasped hands in warm evening light with gold jewelry.',
      isConceptualDemo: true,
      replacementSlot: 'portfolio[5] (4:5 intimate detail)',
    },
    {
      id: 'frame-07',
      src: '/src/assets/images/about_bts_camera_1795104011602.jpg',
      aspectRatio: '1:1',
      category: 'Heirlooms',
      title: 'Frame 07 · Craft & Optics',
      caption: 'Conceptual study demonstrating 1:1 studio process and natural window light.',
      alt: 'Conceptual square studio photograph of hands adjusting a camera lens in window light.',
      isConceptualDemo: true,
      replacementSlot: 'portfolio[6] (1:1 studio or detail study)',
    },
    {
      id: 'frame-08',
      src: '/src/assets/images/cta_golden_horizon_1795104010859.jpg',
      aspectRatio: '16:9',
      category: 'Events',
      title: 'Frame 08 · Plaster & Shadow',
      caption: 'Conceptual study demonstrating 16:9 venue atmosphere and architectural light.',
      alt: 'Conceptual wide photograph of warm late-afternoon shadows across lime-plaster courtyard walls.',
      isConceptualDemo: true,
      replacementSlot: 'portfolio[7] (16:9 venue or atmosphere frame)',
    },
  ] as MediaAssetItem[],
};

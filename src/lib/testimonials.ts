/**
 * Customer testimonials shown on marketing pages. Every quote must be
 * approved by the person quoted before it ships (`approved: true`).
 */
export type TestimonialPersona = 'agency' | 'solo' | 'startup'

export type Testimonial = {
  id: string
  name: string
  role: string
  /** Customer site or company; linking customers is fine, never competitors. */
  site?: { label: string; href: string }
  avatarSrc?: string
  /** Short context chip, e.g. the move they made. */
  context: string
  persona: TestimonialPersona
  /** One-line pull quote for compact layouts. */
  highlight: string
  quote: string
  approved: boolean
}

export const testimonials: ReadonlyArray<Testimonial> = [
  {
    id: 'phil',
    name: 'Phil Henry',
    role: 'Founder',
    avatarSrc: '/images/landing/users/phil-henry.webp',
    context: 'Agency handoff',
    persona: 'agency',
    highlight:
      'Colleagues asked, “Can’t we do it like WordPress?” Now I say, “Yes, but better, with Astro.”',
    quote:
      'Before GitCMS, my Markdown-averse colleagues would send content for placement and then ask, “Can’t we do it like WordPress?” With GitCMS I can say, “Yes, but better, with Astro.” Now I don’t get involved until final editing and publishing.',
    approved: true,
  },
  {
    id: 'nicole',
    name: 'Nicole J. Tirado',
    role: 'Writer',
    site: { label: 'nicoletirado.com', href: 'https://nicoletirado.com' },
    avatarSrc: '/images/landing/users/nicole-jeanette.webp',
    context: 'WordPress → Astro',
    persona: 'solo',
    highlight:
      'I tried a few CMS tools after moving from WordPress to Astro. GitCMS is the one that clicked.',
    quote:
      'When I moved my blog from WordPress to Astro, I tried a few CMS tools, but none of them quite clicked. Then I found GitCMS. Installation was easy, and the visual editor makes managing Markdown content simple. I’ve been using it for months and I’m very happy, especially since I could connect R2 object storage.',
    approved: true,
  },
  {
    id: 'bhavik',
    name: 'Bhavik',
    role: 'Agency owner',
    site: { label: 'Zexa', href: 'https://zexa.app' },
    avatarSrc: '/images/landing/users/bhavik.jpg',
    context: 'Client site handoff',
    persona: 'agency',
    highlight:
      'We shipped the client’s site in Astro, and now the client runs their own blog and content.',
    quote:
      'We built a client’s site in Astro and handed it off with GitCMS. Now the client manages their own blog and content, and we only hear from them when they need real development work.',
    approved: true,
  },
  {
    id: 'sandra',
    name: 'Sandra Vu',
    role: 'Co-founder',
    site: { label: 'Data River', href: 'https://www.datariver.co' },
    avatarSrc: '/images/landing/users/sandra-vu.webp',
    context: 'Startup team',
    persona: 'startup',
    highlight: 'GitCMS helps me visualize and simplify my editing process.',
    quote: 'GitCMS helps me visualize and simplify my editing process.',
    approved: true,
  },
]

/** Testimonials cleared for publishing. */
export const publishedTestimonials = testimonials.filter(
  (testimonial) => testimonial.approved,
)

/**
 * Class strings for the site's one section pattern: headings on the grey page
 * background, visuals in white cards, sections divided by hairlines inside
 * the framed column (see MarketingLayout).
 */
export const section = 'border-t border-neutral-200 px-6 py-24 sm:py-32 lg:px-16'
export const card = 'rounded-2xl border border-neutral-200 bg-white'
export const eyebrow = 'inline-flex w-fit items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-xs font-medium text-neutral-700'
export const badge = 'rounded-full bg-[#DCF986] px-1.5 text-[10px] font-semibold text-neutral-900'
/**
 * Typeface for page and section headings: 'brand' is the GitCMS serif
 * (Source Serif 4, the logo face), 'sans' is Geist like the body. Flip it here;
 * every heading built from `heading`, `h1`, `h2` and `prose` follows. Card
 * titles and UI labels stay sans either way.
 */
const HEADING_FONT: 'brand' | 'sans' = 'brand'
/** Face, weight and tracking for a heading; combine with a size. */
export const heading = HEADING_FONT === 'brand' ? 'font-heading font-medium tracking-[-0.025em]' : 'font-semibold tracking-[-0.04em]'
export const h1 = `text-[40px] leading-[1.08] text-[#242424] sm:text-[56px] ${heading}`
export const h2 = `text-[34px] leading-[1.1] sm:text-[44px] ${heading}`
export const sub = 'text-[16px] leading-[1.6] text-[#898989]'
export const primaryButton = 'inline-flex h-10 items-center gap-2 rounded-xl bg-neutral-900 px-4 text-[14px] font-medium text-white hover:bg-neutral-800'
export const secondaryButton = 'inline-flex h-10 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 text-[14px] font-medium text-neutral-900 hover:bg-neutral-50'
/** Long-form article body: blog posts, glossary terms, prompts, changelog, comparisons. */
export const prose = `${HEADING_FONT === 'brand' ? 'prose-headings:font-medium' : 'site-prose prose-headings:font-semibold'} prose prose-neutral prose-lg max-w-none prose-h2:text-[28px] prose-a:text-neutral-900 prose-a:underline-offset-2 prose-img:rounded-xl [&_:is(h1,h2,h3,h4,h5,h6)_a]:no-underline`

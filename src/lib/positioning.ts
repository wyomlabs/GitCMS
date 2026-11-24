/**
 * Single source for how GitCMS describes itself on public surfaces: SEO
 * defaults, structured data, llms.txt, and pricing copy. Answer engines quote
 * whichever description they find, so every page should reuse these strings
 * instead of paraphrasing them. See CONTENT.md for the full message house.
 */

export const SITE_URL = 'https://gitcms.dev'
export const PRODUCT_NAME = 'GitCMS'

export const PRODUCT_CATEGORY = 'The CMS for code-first and AI-built websites'

/** The canonical one-sentence definition. Repeat it verbatim. */
export const PRODUCT_DEFINITION =
  'GitCMS is the CMS for code-first and AI-built websites. It gives your team, your clients, and AI agents one safe place to edit, review, and publish website changes, while everything stays in your site’s repository.'

export const DEFAULT_SEO_TITLE =
  'GitCMS — The CMS for Code-First and AI-Built Websites'

export const DEFAULT_SEO_DESCRIPTION =
  'Your AI built the website. GitCMS gives your team, clients, and AI agents one safe place to edit, review, and publish changes while it stays in your repo.'

/**
 * Founding site license, sold for the last time until the Black Friday sale
 * ends (`BLACK_FRIDAY` in promo.ts). Display-only:
 * checkout amounts live in the billing provider, and the product's billing
 * panel keeps its own copy. Change all three together.
 */
export const LICENSE_PRICING = {
  sitePrice: 89,
  seatPrice: 9,
} as const

export const LICENSE_PRICE_SUMMARY = `$${LICENSE_PRICING.sitePrice} one-time per site + $${LICENSE_PRICING.seatPrice} per extra seat`

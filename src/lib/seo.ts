import {
  DEFAULT_SEO_DESCRIPTION,
  DEFAULT_SEO_TITLE,
  PRODUCT_NAME,
  SITE_URL,
} from '@/lib/positioning'
import { ogPathForHtmlPath } from '@/lib/public-resources'

const SITE_NAME = PRODUCT_NAME
const DEFAULT_TITLE = DEFAULT_SEO_TITLE
const DEFAULT_DESCRIPTION = DEFAULT_SEO_DESCRIPTION
const TWITTER_HANDLE = '@gitcms_app'

export type SeoOptions = {
  title?: string
  description?: string
  ogImage?: string
  type?: 'website' | 'article'
  publishedTime?: string
  authors?: Array<string>
  noIndex?: boolean
}

export function absoluteSiteUrl(path = '/') {
  return new URL(path, SITE_URL).toString()
}

/**
 * `page` is the page's own URL (`Astro.url` against `Astro.site`). With
 * `trailingSlash: 'always'` it ends in a slash, the address Cloudflare
 * serves with a 200, so it is the canonical as is.
 */
export function getSeo(page: URL, options: SeoOptions = {}) {
  const title = options.title ?? DEFAULT_TITLE
  const description = options.description ?? DEFAULT_DESCRIPTION
  const canonical = page.toString()
  const ogImage = absoluteSiteUrl(options.ogImage ?? ogPathForHtmlPath(page.pathname))

  return {
    title,
    description,
    canonical,
    ogImage,
    type: options.type ?? 'website',
    publishedTime: options.publishedTime,
    authors: options.authors ?? [],
    noIndex: options.noIndex ?? false,
    siteName: SITE_NAME,
    twitterHandle: TWITTER_HANDLE,
  }
}

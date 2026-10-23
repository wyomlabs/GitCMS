// Pages are served at `<path>/` (`trailingSlash: 'always'`). Links written
// without the slash, in Markdown or by Fumadocs' page tree, get it here so
// they don't go through Cloudflare's redirect. Files (`/llms.txt`), external
// URLs and hash-only links are left alone.
const INTERNAL_PAGE = /^(\/(?:[^/?#.]+\/)*[^/?#.]+)([?#].*)?$/

export function withTrailingSlash(href: string) {
  const match = INTERNAL_PAGE.exec(href)
  return match ? `${match[1]}/${match[2] ?? ''}` : href
}

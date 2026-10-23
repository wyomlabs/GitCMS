// Two-segment paths that miss a page are legacy repo-viewer links
// (`/:owner/:repo` and anything under it) unless they start with one of the
// site's own sections or asset directories.
const RESERVED_ROOT_SEGMENTS = new Set([
  '_astro',
  'ai-logos',
  'brand',
  'brand-logos',
  'fonts',
  'images',
  'logos',
  'og',
  'ssg-logos',
  'tweets',
  'videos',
  'agents',
  'api',
  'app',
  'auth',
  'blog',
  'changelog',
  'compare',
  'docs',
  'features',
  'for',
  'glossary',
  'login',
  'oauth',
  'invite',
  'prompts',
  'sites',
  'tools',
  'welcome',
  '.well-known',
])

export function legacyRepoViewerTarget(url: URL, appOrigin: string): string | null {
  const segments = url.pathname.split('/').filter(Boolean)
  if (segments.length < 2 || RESERVED_ROOT_SEGMENTS.has(segments[0] ?? '')) {
    return null
  }

  return new URL(url.pathname + url.search + url.hash, appOrigin).toString()
}

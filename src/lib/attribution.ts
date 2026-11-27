const attributionKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id'] as const
const storageKey = 'gitcms.navigation.attribution'

function readAttribution(search: string) {
  const input = new URLSearchParams(search)
  const output = new URLSearchParams()
  for (const key of attributionKeys) {
    const value = input.get(key)
    if (value && value.length <= 200) output.set(key, value)
  }
  return output
}

function currentAttribution() {
  const current = readAttribution(window.location.search)
  try {
    if (current.size) {
      window.sessionStorage.setItem(storageKey, current.toString())
    } else {
      return readAttribution(window.sessionStorage.getItem(storageKey) ?? '')
    }
  } catch {
    // Storage may be disabled. Attribution must never block navigation.
  }
  return current
}

export function preserveAttributionOnAppLinks() {
  const appOrigin = new URL(import.meta.env.PUBLIC_APP_URL ?? 'https://app.gitcms.dev').origin
  const attribution = currentAttribution()
  if (!attribution.size) return

  for (const anchor of document.querySelectorAll<HTMLAnchorElement>('a[href]')) {
    const url = new URL(anchor.href, window.location.href)
    if (url.origin !== appOrigin) continue
    for (const [key, value] of attribution) {
      if (!url.searchParams.has(key)) url.searchParams.set(key, value)
    }
    anchor.href = url.toString()
  }
}

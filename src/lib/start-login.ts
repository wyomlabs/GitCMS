const APP_URL = import.meta.env.PUBLIC_APP_URL ?? 'https://app.gitcms.dev'

export function appUrl(path = '/') {
  return new URL(path, APP_URL).toString()
}

export function loginUrl(next = '/') {
  const url = new URL('/login', APP_URL)
  url.searchParams.set('next', next)
  return url.toString()
}

export function startLogin(next = '/') {
  window.location.assign(loginUrl(next))
}

import type { AnchorHTMLAttributes, ReactNode } from 'react'

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string
  app?: boolean
  params?: Record<string, string | undefined>
  search?: Record<string, string | number | boolean | undefined>
  hash?: string
  children?: ReactNode
}

function interpolatePath(to: string, params: Record<string, string | undefined> = {}) {
  let result = to
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue
    result = result
      .replace(`{$${key}}`, encodeURIComponent(value))
      .replace(`$${key}`, encodeURIComponent(value))
    if (key === '_splat') {
      result = result.replace('$', value.split('/').map(encodeURIComponent).join('/'))
    }
  }
  return result.replace(/\/\$$/, '')
}

export function createHref({
  to,
  app = false,
  params,
  search,
  hash,
}: Pick<LinkProps, 'to' | 'app' | 'params' | 'search' | 'hash'>) {
  const pathname = interpolatePath(to, params)
  const appBase = import.meta.env.PUBLIC_APP_URL ?? 'https://app.gitcms.dev'
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(search ?? {})) {
    if (value !== undefined) query.set(key, String(value))
  }
  const searchString = query.toString()
  const href = `${pathname}${searchString ? `?${searchString}` : ''}${hash ? `#${hash}` : ''}`
  const productRoute =
    app
    || pathname === '/login'
    || to.startsWith('/$owner/$repo')

  return productRoute ? new URL(href, appBase).toString() : href
}

export function Link({ to, app, params, search, hash, ...props }: LinkProps) {
  return <a href={createHref({ to, app, params, search, hash })} {...props} />
}

export function useNavigate() {
  return ({
    to,
    search,
    hash,
  }: {
    to: string
    search?: Record<string, string | number | boolean | undefined>
    hash?: string
  }) => {
    const href = createHref({ to, search, hash })
    window.location.assign(new URL(href, import.meta.env.PUBLIC_APP_URL ?? 'https://app.gitcms.dev'))
    return Promise.resolve()
  }
}

import { legacyRepoViewerTarget } from './lib/legacy-repo-redirect'

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> }
}

const APP_ORIGIN = 'https://app.gitcms.dev'

function withMachineReadableHeaders(requestUrl: URL, response: Response) {
  const isMarkdown = requestUrl.pathname.endsWith('.md')
  const isLlms = requestUrl.pathname === '/llms.txt'
    || requestUrl.pathname === '/llms-full.txt'
    || requestUrl.pathname.endsWith('/llms.txt')
  if ((!isMarkdown && !isLlms) || response.status >= 400) return response

  // Pages are served at `<path>/`, so that is their canonical address.
  const canonicalPath = requestUrl.pathname === '/index.md'
    ? '/'
    : isMarkdown
      ? `${requestUrl.pathname.slice(0, -'.md'.length)}/`
      : '/'
  const canonicalUrl = new URL(canonicalPath, 'https://gitcms.dev').toString()
  const headers = new Headers(response.headers)
  headers.set('X-Robots-Tag', 'noindex')
  if (isMarkdown) {
    headers.set('Content-Type', 'text/markdown; charset=utf-8')
    headers.set(
      'Link',
      `<${canonicalUrl}>; rel="canonical", <https://gitcms.dev/llms.txt>; rel="describedby"`,
    )
  } else if (isLlms) {
    headers.set('Content-Type', 'text/plain; charset=utf-8')
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url)
    if ((request.method === 'GET' || request.method === 'HEAD') && url.pathname.endsWith('.mdx')) {
      const target = new URL(url)
      target.pathname = `${url.pathname.slice(0, -'.mdx'.length)}.md`
      return Response.redirect(target, 308)
    }
    const assetResponse = withMachineReadableHeaders(url, await env.ASSETS.fetch(request))
    if (
      assetResponse.status !== 404
      || (request.method !== 'GET' && request.method !== 'HEAD')
    ) {
      return assetResponse
    }

    const target = legacyRepoViewerTarget(url, APP_ORIGIN)
    if (target) return Response.redirect(target, 308)

    // Assets answer misses with an empty 404 (`not_found_handling: "none"`
    // keeps this worker in the path for the redirect above), so serve
    // Astro's 404 page here with the right status.
    const notFound = await env.ASSETS.fetch(new Request(new URL('/404', url), request))
    return new Response(notFound.body, { status: 404, headers: notFound.headers })
  },
}

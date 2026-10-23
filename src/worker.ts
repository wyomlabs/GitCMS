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

  const canonicalPath = requestUrl.pathname === '/index.md'
    ? '/'
    : isMarkdown
      ? requestUrl.pathname.slice(0, -'.md'.length)
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

    return assetResponse
  },
}

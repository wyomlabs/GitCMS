import { defineMiddleware } from 'astro:middleware'
import { legacyRepoViewerTarget } from '@/lib/legacy-repo-redirect'

// `astro dev` never runs src/worker.ts, so the production 308 would otherwise
// show Astro's own 404. Production still redirects in the worker, after a
// missing asset. PUBLIC_APP_URL points local dev at the tunneled app.
const appOrigin = import.meta.env.PUBLIC_APP_URL ?? 'https://app.gitcms.dev'

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next()
  if (
    response.status !== 404
    || (context.request.method !== 'GET' && context.request.method !== 'HEAD')
  ) {
    return response
  }

  const target = legacyRepoViewerTarget(context.url, appOrigin)
  if (!target) return response
  return context.redirect(target, 308)
})

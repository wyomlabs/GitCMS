import type { APIRoute, GetStaticPaths } from 'astro'
import { getPublicResources } from '@/lib/public-resources'
import { renderOgImage } from '@/lib/og-image'

export const getStaticPaths: GetStaticPaths = async () =>
  (await getPublicResources())
    .filter((resource) => resource.htmlPath !== '/')
    .map((resource) => ({
      params: { resource: resource.htmlPath.slice(1) },
      props: { resource },
    }))

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgImage(props.resource)
  return new Response(Uint8Array.from(png).buffer, { headers: { 'Content-Type': 'image/png' } })
}

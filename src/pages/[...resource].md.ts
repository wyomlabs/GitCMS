import type { APIRoute, GetStaticPaths } from 'astro'
import { markdownDocument } from '@/lib/machine-markdown'
import { getPublicResources } from '@/lib/public-resources'

export const getStaticPaths: GetStaticPaths = async () =>
  (await getPublicResources())
    .filter((resource) => resource.htmlPath !== '/')
    .map((resource) => ({
      params: { resource: resource.htmlPath.slice(1) },
      props: { resource },
    }))

export const GET: APIRoute = ({ props }) => {
  const resource = props.resource
  const markdown = markdownDocument({
    title: resource.title,
    description: resource.description,
    canonicalPath: resource.htmlPath,
    body: resource.body,
  })
  return new Response(markdown, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } })
}

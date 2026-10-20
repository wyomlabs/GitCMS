import * as path from 'node:path'
import { type CollectionEntry, getCollection } from 'astro:content'
import { structure, type StructuredData } from 'fumadocs-core/mdx-plugins'
import { loader, type StaticSource } from 'fumadocs-core/source'

export const source = loader({
  source: await createAstroSource(),
  baseUrl: '/docs',
})

export function getStructuredData(entry: CollectionEntry<'docs'>): StructuredData {
  return structure(entry.body ?? '')
}

async function createAstroSource() {
  const result: StaticSource<{
    metaData: CollectionEntry<'docsMeta'>['data']
    pageData: CollectionEntry<'docs'>['data'] & {
      _raw: CollectionEntry<'docs'>
      structuredData: StructuredData
    }
  }> = { files: [] }

  for (const page of await getCollection('docs')) {
    const virtualPath = path.relative('content/docs', page.filePath!)
    result.files.push({
      type: 'page',
      path: virtualPath,
      data: {
        ...page.data,
        _raw: page,
        structuredData: getStructuredData(page),
      },
    })
  }

  for (const meta of await getCollection('docsMeta')) {
    const virtualPath = path.relative('content/docs', meta.filePath!)
    result.files.push({ type: 'meta', path: virtualPath, data: meta.data })
  }

  return result
}

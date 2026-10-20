import { getCollection } from 'astro:content'
import type { StructuredData } from 'fumadocs-core/mdx-plugins'
import { structure } from 'fumadocs-core/mdx-plugins'
import type { BlogCategory } from '@/lib/blog'

const WORDS_PER_MINUTE = 230

function countWords(content: string) {
  const trimmed = content.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
}

export function readingTimeFromStructuredData(data: StructuredData) {
  let wordCount = 0
  for (const heading of data.headings) wordCount += countWords(heading.content)
  for (const block of data.contents) wordCount += countWords(block.content)
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE))
}

export async function getPublishedPosts() {
  const now = new Date()
  return (await getCollection('blog'))
    .filter((post) => !post.data.draft && new Date(post.data.date) <= now)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
}

export async function getPublishedPostSummaries() {
  return Promise.all((await getPublishedPosts()).map(async (post) => ({
    ...post.data,
    slug: post.id.replace(/\.mdx?$/, ''),
    readingTime: readingTimeFromStructuredData(structure(post.body ?? '')),
  })))
}

export type PostSummary = Awaited<ReturnType<typeof getPublishedPostSummaries>>[number]

export async function getRelatedPosts(
  currentSlug: string,
  tags: Array<string> | undefined,
  category: BlogCategory,
  limit = 3,
) {
  const currentTags = new Set(tags ?? [])
  const posts = await getPublishedPostSummaries()
  return posts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => ({
      post,
      score:
        (post.category === category ? 10 : 0)
        + (post.tags ?? []).filter((tag) => currentTags.has(tag)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post)
}

export async function getAllCategories() {
  const counts = new Map<BlogCategory, number>()
  for (const post of await getPublishedPosts()) {
    counts.set(post.data.category, (counts.get(post.data.category) ?? 0) + 1)
  }
  return Array.from(counts.entries()).map(([category, count]) => ({ category, count }))
}

export async function getChangelogs() {
  return (await getCollection('changelog')).sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  )
}

export async function getComparisons() {
  return (await getCollection('comparisons')).sort((a, b) => {
    const order = (a.data.order ?? Number.MAX_SAFE_INTEGER) - (b.data.order ?? Number.MAX_SAFE_INTEGER)
    return order || a.data.competitor.localeCompare(b.data.competitor)
  })
}

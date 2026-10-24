import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { getPublishedPosts } from '@/lib/content'

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPublishedPosts()
  return rss({
    title: 'GitCMS Blog',
    description: 'Guides on code-first websites, AI agents, and handing sites off to the people who edit them.',
    site: site ?? 'https://gitcms.dev',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.date),
      link: `/blog/${post.id.replace(/\.mdx?$/, '')}/`,
      categories: post.data.tags,
    })),
  })
}

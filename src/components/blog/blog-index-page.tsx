import { useState } from 'react'
import { blogCategories, blogCategoryLabels, type BlogCategory } from '@/lib/blog'
import type { PostSummary } from '@/lib/content'
import { Link } from '@/lib/router'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

export function BlogIndexPage({
  posts,
  categories,
}: {
  posts: Array<PostSummary>
  categories: Array<{ category: BlogCategory; count: number }>
}) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'all'>('all')
  const filteredPosts = activeCategory === 'all' ? posts : posts.filter((post) => post.category === activeCategory)
  const activeCategorySlugs = new Set(categories.map((item) => item.category))

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-logo text-3xl font-normal tracking-tight sm:text-4xl">Blog</h1>
      <p className="mt-3 max-w-4xl text-base leading-relaxed text-neutral-500 sm:text-lg">
        Guides, workflows, and deep dives on content management for developers, marketers, and writers.
      </p>

      {categories.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          <CategoryTab label="All" active={activeCategory === 'all'} onClick={() => setActiveCategory('all')} />
          {blogCategories.filter((category) => activeCategorySlugs.has(category)).map((category) => (
            <CategoryTab
              key={category}
              label={blogCategoryLabels[category]}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>
      )}

      {filteredPosts.length === 0 && <p className="mt-12 text-neutral-400">No posts yet. Check back soon.</p>}
      {filteredPosts.length > 0 && (
        <div className="mt-10 divide-y divide-neutral-200 border-t border-neutral-200">
          {filteredPosts.map((post) => <BlogListItem key={post.slug} post={post} />)}
        </div>
      )}
    </div>
  )
}

function CategoryTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${active ? 'border-neutral-900 bg-neutral-100 text-neutral-900' : 'border-neutral-200 bg-white text-neutral-500 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-700'}`}
    >
      {label}
    </button>
  )
}

function BlogListItem({ post }: { post: PostSummary }) {
  return (
    <article className="py-8 sm:py-10">
      <Link
        to="/blog/$"
        params={{ _splat: post.slug }}
        className={`group grid items-start gap-6 ${post.cover ? 'md:grid-cols-[minmax(0,1fr)_220px] md:gap-8 lg:grid-cols-[minmax(0,1fr)_280px]' : ''}`}
      >
        <div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-500">
            <span className="font-medium text-neutral-700">{blogCategoryLabels[post.category]}</span>
            <span className="text-neutral-300">•</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          <h2 className="mt-3 max-w-4xl font-logo text-[1.6rem] font-medium leading-tight tracking-tight text-neutral-900 transition-colors group-hover:text-neutral-600 sm:text-[1.9rem]">
            {post.title}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-neutral-500 sm:text-lg">{post.description}</p>
        </div>
        {post.cover && (
          <div className="hidden md:block">
            <img src={post.cover} alt="" className="aspect-[1.35/1] w-full rounded-2xl border border-neutral-200 object-cover" />
          </div>
        )}
      </Link>
    </article>
  )
}

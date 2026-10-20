import { Link } from '@/lib/router'
import { ArrowRight, Clock } from 'lucide-react'
import { blogCategoryLabels, type BlogCategory } from '@/lib/blog'

type RelatedPost = {
  title: string
  description: string
  date: string
  category: BlogCategory
  slug: string
  readingTime: number
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

function RelatedPostCard({ post }: { post: RelatedPost }) {
  return (
    <Link
      to="/blog/$"
      params={{ _splat: post.slug }}
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-all hover:border-neutral-300 hover:shadow-sm"
    >
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-medium text-neutral-500">
          {blogCategoryLabels[post.category]}
        </span>
        <h3 className="mt-2 font-logo text-base font-medium leading-snug tracking-tight text-neutral-900 transition-colors group-hover:text-neutral-600 sm:text-lg">
          {post.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-neutral-500">
          {post.description}
        </p>
        <div className="mt-auto flex items-center gap-2 pt-4 text-xs text-neutral-500">
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" />
            {post.readingTime} min
          </span>
          <span className="text-neutral-200">·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
      </div>
    </Link>
  )
}

type BlogPostFooterProps = {
  relatedPosts: Array<RelatedPost>
}

export function BlogPostFooter({ relatedPosts }: BlogPostFooterProps) {
  return (
    <footer className="mt-16">
      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section>
          <div className="border-t border-neutral-100 pt-10">
            <h2 className="font-logo text-xl font-medium tracking-tight text-neutral-900">
              Related posts
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <RelatedPostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mt-12 flex flex-col items-start justify-between gap-8 rounded-2xl bg-[#0a0a0a] px-8 py-10 sm:gap-10 sm:rounded-3xl sm:px-16 sm:py-16 md:flex-row md:items-center">
        <div>
          <h2 className="font-logo text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
            Start editing.
            <br />
            <span className="text-[#DCF986]">Publish content with taste.</span>
          </h2>
          <p className="mt-2 text-sm text-neutral-300">
            Visual editor that commits to your repo. Bring your own site and
            framework.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#DCF986] px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-[#d4f47a]"
        >
          Try GitCMS
          <ArrowRight className="size-4" />
        </Link>
      </section>
    </footer>
  )
}

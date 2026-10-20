import { Link } from '@/lib/router'
import { ChevronRight, Clock } from 'lucide-react'
import { blogCategoryLabels, type BlogCategory } from '@/lib/blog'

const AUTHOR_AVATAR = '/images/founder-waishnav.jpg'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

type BlogPostHeaderProps = {
  title: string
  description: string
  date: string
  updatedDate?: string
  authors: Array<string>
  readingTime: number
  category: BlogCategory
  tags?: Array<string>
}

export function BlogPostHeader({
  title,
  description,
  date,
  updatedDate,
  authors,
  readingTime,
  category,
  tags,
}: BlogPostHeaderProps) {
  return (
    <header>
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-sm text-neutral-500"
      >
        <Link
          to="/blog"
          className="transition-colors hover:text-neutral-600"
        >
          Blog
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-neutral-500">
          {blogCategoryLabels[category]}
        </span>
      </nav>

      <h1 className="mt-6 font-logo text-3xl font-normal leading-tight tracking-tight sm:text-4xl md:text-[42px]">
        {title}
      </h1>

      <p className="mt-3 text-base leading-relaxed text-neutral-500 sm:text-lg">
        {description}
      </p>

      <div className="mt-6 flex items-center gap-3">
        <img
          src={AUTHOR_AVATAR}
          alt={authors[0]}
          className="size-10 rounded-full bg-neutral-100 object-cover"
        />
        <div className="flex flex-col text-sm">
          <span className="font-medium text-neutral-900">{authors[0]}</span>
          <div className="flex items-center gap-2 text-neutral-500">
            <time dateTime={date}>{formatDate(date)}</time>
            {updatedDate && updatedDate !== date && (
              <>
                <span className="text-neutral-200">·</span>
                <span>Updated {formatDate(updatedDate)}</span>
              </>
            )}
            <span className="text-neutral-200">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {readingTime} min read
            </span>
          </div>
        </div>
      </div>

      {tags && tags.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-500"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </header>
  )
}

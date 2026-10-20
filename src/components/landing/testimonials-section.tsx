import * as React from 'react'
import { cn } from '@/lib/utils'
import type { Testimonial } from '@/lib/testimonials'
import { publishedTestimonials } from '@/lib/testimonials'


function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function Avatar({
  testimonial,
  className,
}: {
  testimonial: Testimonial
  className?: string
}) {
  if (testimonial.avatarSrc) {
    return (
      <img
        src={testimonial.avatarSrc}
        alt={testimonial.name}
        className={cn('shrink-0 rounded-full object-cover', className)}
      />
    )
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-700',
        className,
      )}
    >
      {initials(testimonial.name)}
    </span>
  )
}

function Attribution({
  testimonial,
  tone = 'light',
  avatarClassName = 'size-10 text-sm',
}: {
  testimonial: Testimonial
  tone?: 'light' | 'dark'
  avatarClassName?: string
}) {
  const isDark = tone === 'dark'

  return (
    <figcaption className="flex items-center gap-3">
      <Avatar testimonial={testimonial} className={avatarClassName} />
      <div className="min-w-0 text-sm">
        <p
          className={cn(
            'font-semibold',
            isDark ? 'text-white' : 'text-neutral-900',
          )}
        >
          {testimonial.name}
        </p>
        <p className={isDark ? 'text-neutral-400' : 'text-neutral-500'}>
          {testimonial.role}
          {testimonial.site ? (
            <>
              {' · '}
              <a
                href={testimonial.site.href}
                target="_blank"
                rel="noopener"
                className={cn(
                  'underline-offset-2 hover:underline',
                  isDark ? 'text-neutral-300' : 'text-neutral-700',
                )}
              >
                {testimonial.site.label}
              </a>
            </>
          ) : null}
        </p>
      </div>
    </figcaption>
  )
}

function ContextChip({
  label,
  tone = 'light',
}: {
  label: string
  tone?: 'light' | 'dark'
}) {
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider',
        tone === 'dark'
          ? 'bg-[#DCF986]/15 text-[#DCF986]'
          : 'bg-violet-100 text-violet-700',
      )}
    >
      {label}
    </span>
  )
}

function SectionHeading({
  eyebrow,
  title,
  tone = 'light',
}: {
  eyebrow: string
  title: React.ReactNode
  tone?: 'light' | 'dark'
}) {
  return (
    <div className="max-w-3xl">
      <p
        className={cn(
          'text-sm font-medium uppercase tracking-widest',
          tone === 'dark' ? 'text-neutral-500' : 'text-neutral-400',
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          'mt-4 font-logo text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl',
          tone === 'dark' ? 'text-white' : 'text-neutral-900',
        )}
      >
        {title}
      </h2>
    </div>
  )
}

/** Customer testimonials as a wall of equal cards on a dark band. */
export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-[#0a0a0a] px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          tone="dark"
          eyebrow="From people running GitCMS"
          title={
            <>
              Built as code.
              <br />
              Run by everyone.
            </>
          }
        />
        <div className="mt-14 columns-1 gap-4 md:columns-2">
          {publishedTestimonials.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="mb-4 break-inside-avoid rounded-2xl border border-white/10 bg-white/[0.04] p-7"
            >
              <ContextChip label={testimonial.context} tone="dark" />
              <blockquote className="mt-5 text-lg leading-relaxed text-neutral-200">
                “{testimonial.quote}”
              </blockquote>
              <div className="mt-7">
                <Attribution testimonial={testimonial} tone="dark" />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

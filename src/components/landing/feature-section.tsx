import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { LazyAutoplayVideo } from './lazy-autoplay-video'

/**
 * Two-panel marketing feature section shared by the homepage, framework,
 * persona, and agent pages. The media panel is always dark; the copy panel is
 * white with an optional blurred color wash. See DESIGN.md → Marketing feature
 * sections.
 */
export type FeatureSectionTone = 'plain' | 'violet' | 'peach'

const toneClass: Record<
  FeatureSectionTone,
  { eyebrow: string; body: string; bullet: string }
> = {
  plain: {
    eyebrow: 'text-neutral-400',
    body: 'text-neutral-500',
    bullet: 'bg-[#EF4444]',
  },
  violet: {
    eyebrow: 'text-neutral-500',
    body: 'text-neutral-600',
    bullet: 'bg-violet-500',
  },
  peach: {
    eyebrow: 'text-neutral-900/40',
    body: 'text-neutral-700',
    bullet: 'bg-neutral-900',
  },
}

function FeatureBackdrop({ tone }: { tone: FeatureSectionTone }) {
  if (tone === 'violet') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-100/80 via-white/90 to-violet-50/70" />
        <div className="pointer-events-none absolute -left-24 top-20 size-80 rounded-full bg-violet-300/45 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-0 size-72 rounded-full bg-[#DCF986]/50 blur-3xl" />
      </div>
    )
  }

  if (tone === 'peach') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100/70" />
        <div className="pointer-events-none absolute -right-32 -top-24 size-96 rounded-full bg-[#f3b8a8]/45 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-36 -left-28 size-[26rem] rounded-full bg-violet-300/45 blur-[120px]" />
      </div>
    )
  }

  return null
}

export function FeatureSection({
  id,
  eyebrow,
  title,
  description,
  points,
  tone = 'plain',
  mediaPosition = 'left',
  media,
  children,
  className,
}: {
  id?: string
  eyebrow: string
  title: ReactNode
  description: ReactNode
  points: ReadonlyArray<ReactNode>
  tone?: FeatureSectionTone
  mediaPosition?: 'left' | 'right'
  media: ReactNode
  /** Actions or extra content rendered under the bullet list. */
  children?: ReactNode
  className?: string
}) {
  const styles = toneClass[tone]
  const mediaFirst = mediaPosition === 'left'

  return (
    <section
      id={id}
      className={cn(
        'grid min-h-screen grid-cols-1 lg:grid-cols-2',
        className,
      )}
    >
      <div
        className={cn(
          'order-2 flex min-h-[80svh] items-center justify-center bg-[#0a0a0a] p-6 sm:p-8 lg:min-h-0 lg:p-16',
          mediaFirst ? 'lg:order-1' : 'lg:order-2',
        )}
      >
        {media}
      </div>
      <div
        className={cn(
          'relative order-1 flex min-h-[80svh] flex-col items-center justify-center bg-white px-6 py-12 sm:px-8 sm:py-16 lg:min-h-0 lg:px-16',
          mediaFirst ? 'lg:order-2' : 'lg:order-1',
        )}
      >
        <FeatureBackdrop tone={tone} />
        <div className="relative z-10 w-full max-w-lg">
          <div
            className={cn(
              'text-sm font-medium uppercase tracking-widest',
              styles.eyebrow,
            )}
          >
            {eyebrow}
          </div>
          <h2 className="mt-4 font-logo text-3xl font-medium leading-tight tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p
            className={cn(
              'mt-5 max-w-md text-base leading-relaxed',
              styles.body,
            )}
          >
            {description}
          </p>
          <ul
            className={cn('mt-6 flex flex-col gap-2.5 text-sm', styles.body)}
          >
            {points.map((point, index) => (
              <li key={index} className="flex items-center gap-2.5">
                <span
                  className={cn(
                    'inline-block size-1.5 shrink-0 rounded-full',
                    styles.bullet,
                  )}
                />
                {point}
              </li>
            ))}
          </ul>
          {children}
        </div>
      </div>
    </section>
  )
}

export function FeatureVideo({ src, label }: { src: string; label: string }) {
  return (
    <div className="w-full max-w-[46rem] overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
      <LazyAutoplayVideo
        src={src}
        ariaLabel={label}
        className="aspect-[4/3] w-full object-cover"
      />
    </div>
  )
}

type WorkspaceMember = {
  name: string
  role: string
  sites: string
  initial: string
  color: string
  logoPath: string | null
}

export function WorkspaceAccessMockup({ siteName }: { siteName: string }) {
  const members: ReadonlyArray<WorkspaceMember> = [
    {
      name: 'Sarah Chen',
      role: 'Admin',
      sites: 'All sites',
      initial: 'S',
      color: 'bg-violet-500',
      logoPath: null,
    },
    {
      name: 'James Wilson',
      role: 'Editor',
      sites: `${siteName}, docs`,
      initial: 'J',
      color: 'bg-blue-500',
      logoPath: null,
    },
    {
      name: 'Maria Lopez',
      role: 'Reviewer',
      sites: siteName,
      initial: 'M',
      color: 'bg-emerald-500',
      logoPath: null,
    },
    {
      name: 'Claude',
      role: 'Editor',
      sites: `${siteName}, docs`,
      initial: 'C',
      color: 'bg-white',
      logoPath: '/ai-logos/claude-orange.svg',
    },
  ]

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-[#DCF986] text-sm font-semibold text-neutral-900">
              A
            </div>
            <div>
              <p className="text-sm font-medium text-white">Acme Agency</p>
              <p className="text-xs text-neutral-500">
                3 sites &middot; 6 members
              </p>
            </div>
          </div>
          <span className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium text-neutral-400">
            Owner
          </span>
        </div>
      </div>

      {members.map((member) => (
        <div
          key={member.name}
          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5"
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex size-8 items-center justify-center rounded-full text-xs font-medium text-white',
                member.color,
              )}
            >
              {member.logoPath ? (
                <img
                  src={member.logoPath}
                  alt=""
                  aria-hidden="true"
                  className="size-5 object-contain"
                />
              ) : (
                member.initial
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-white">{member.name}</p>
              <p className="text-xs text-neutral-500">{member.sites}</p>
            </div>
          </div>
          <span className="text-xs text-neutral-500">{member.role}</span>
        </div>
      ))}

      <div className="flex items-center gap-2 rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-5 py-3.5">
        <div className="flex size-8 items-center justify-center rounded-full border border-white/10">
          <svg
            className="size-3.5 text-neutral-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
        <p className="text-sm text-neutral-500">Invite with link...</p>
      </div>
    </div>
  )
}

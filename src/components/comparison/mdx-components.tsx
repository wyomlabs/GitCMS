import type { ReactNode } from 'react'
import { Check, Minus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LICENSE_PRICE_SUMMARY } from '@/lib/positioning'

/**
 * Comparison blocks are wider than the article card and overlap its edges,
 * centred on the viewport so they never cause horizontal scroll. Blocks need
 * an opaque background so the card's border doesn't show through.
 */
const breakout = 'relative left-1/2 w-[min(68rem,calc(100vw-2rem))] -translate-x-1/2'

/* ─── Verdict Cards ─── */

function VerdictCard({
  title,
  children,
  variant,
}: {
  title: string
  children: ReactNode
  variant: 'gitcms' | 'competitor'
}) {
  return (
    <div
      className={cn(
        'rounded-xl border p-5 sm:p-7',
        variant === 'gitcms'
          ? 'border-neutral-900 bg-neutral-950 text-white'
          : 'border-neutral-200 bg-neutral-50 text-neutral-900',
      )}
    >
      <p
        className={cn(
          'text-sm font-semibold uppercase tracking-widest',
          variant === 'gitcms' ? 'text-neutral-400' : 'text-neutral-500',
        )}
      >
        {title}
      </p>
      <div
        className={cn(
          'mt-3 text-base leading-relaxed [&>ul]:mt-2.5 [&>ul]:list-none [&>ul]:space-y-2 [&>ul]:pl-0 [&_li]:flex [&_li]:items-start [&_li]:gap-2 [&_li]:before:content-["→"]',
          variant === 'gitcms'
            ? '[&_li]:before:text-neutral-500'
            : '[&_li]:before:text-neutral-400',
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function Verdict({ children }: { children: ReactNode }) {
  return (
    <div className={cn('not-prose my-10 grid gap-4 sm:grid-cols-2', breakout)}>{children}</div>
  )
}

Verdict.GitCMS = function VerdictGitCMS({ children }: { children: ReactNode }) {
  return (
    <VerdictCard title="Choose GitCMS if" variant="gitcms">
      {children}
    </VerdictCard>
  )
}

Verdict.Competitor = function VerdictCompetitor({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <VerdictCard title={`Choose ${title} if`} variant="competitor">
      {children}
    </VerdictCard>
  )
}

/* ─── Case Study Card ─── */

export function CaseStudy({
  title,
  logo,
  source,
  sourceUrl,
  children,
  stats,
}: {
  title: string
  logo?: { src: string; alt: string }
  source: string
  sourceUrl?: string
  children: ReactNode
  stats?: Array<{ label: string; value: string }>
}) {
  return (
    <aside
      className={cn(
        'not-prose my-10 rounded-xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8 md:p-10',
        breakout,
      )}
    >
      <div className="flex items-center gap-3">
        {logo && (
          <img src={logo.src} alt={logo.alt} className="size-7 shrink-0" />
        )}
        <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
          Case study
        </p>
      </div>
      <p className="mt-3 text-xl font-semibold tracking-[-0.02em] text-neutral-900 sm:text-2xl">
        {title}
      </p>
      <div className="mt-5 text-base leading-relaxed text-neutral-600 [&>p]:mt-3.5 [&>p:first-child]:mt-0">
        {children}
      </div>
      {stats && stats.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4 border-t border-neutral-200 pt-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-xl font-semibold tracking-[-0.02em] text-neutral-900 sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-0.5 text-sm text-neutral-500">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
      {sourceUrl ? (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block text-sm text-neutral-400 underline underline-offset-2 transition-colors hover:text-neutral-600"
        >
          Source: {source}
        </a>
      ) : (
        <p className="mt-5 text-sm text-neutral-400">Source: {source}</p>
      )}
    </aside>
  )
}

/* ─── Feature Comparison Table ─── */

type CellValue =
  | 'yes'
  | 'no'
  | 'partial'
  | 'native'
  | 'via-plugin'
  | 'not-core'
  | string

function CellContent({ value }: { value: CellValue }) {
  switch (value) {
    case 'yes':
    case 'native':
      return (
        <span className="inline-flex items-center gap-1.5 text-[15px] text-neutral-900">
          <Check className="size-4 shrink-0 text-emerald-600" />
          {value === 'native' ? 'Native' : 'Yes'}
        </span>
      )
    case 'no':
      return (
        <span className="inline-flex items-center gap-1.5 text-[15px] text-neutral-400">
          <X className="size-4 shrink-0" />
          No
        </span>
      )
    case 'partial':
      return (
        <span className="inline-flex items-center gap-1.5 text-[15px] text-amber-700">
          <Minus className="size-4 shrink-0" />
          Partial
        </span>
      )
    case 'via-plugin':
      return (
        <span className="inline-flex items-center gap-1.5 text-[15px] text-neutral-500">
          <Minus className="size-4 shrink-0" />
          Via plugin
        </span>
      )
    case 'not-core':
      return (
        <span className="inline-flex items-center gap-1.5 text-[15px] text-neutral-400">
          <Minus className="size-4 shrink-0" />
          Not core
        </span>
      )
    default:
      return <span className="text-[15px] text-neutral-700">{value}</span>
  }
}

export function FeatureTable({
  competitor,
  rows,
}: {
  competitor: string
  rows: Array<{
    category: string
    gitcms: CellValue
    competitor: CellValue
    note?: string
  }>
}) {
  return (
    <div className={cn('not-prose my-10', breakout)}>
      <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
        <table className="w-full min-w-[580px] text-left">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50">
              <th className="px-5 py-3.5 text-sm font-semibold uppercase tracking-widest text-neutral-500 sm:px-6">
                Capability
              </th>
              <th className="px-5 py-3.5 text-sm font-semibold uppercase tracking-widest text-neutral-500 sm:px-6">
                GitCMS
              </th>
              <th className="px-5 py-3.5 text-sm font-semibold uppercase tracking-widest text-neutral-500 sm:px-6">
                {competitor}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.category}
                className={cn(
                  i !== rows.length - 1 && 'border-b border-neutral-100',
                )}
              >
                <td className="px-5 py-3.5 sm:px-6">
                  <span className="text-[15px] font-medium text-neutral-900">
                    {row.category}
                  </span>
                  {row.note && (
                    <p className="mt-0.5 text-sm text-neutral-400">
                      {row.note}
                    </p>
                  )}
                </td>
                <td className="px-5 py-3.5 sm:px-6">
                  <CellContent value={row.gitcms} />
                </td>
                <td className="px-5 py-3.5 sm:px-6">
                  <CellContent value={row.competitor} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ─── Tradeoffs ─── */

export function Tradeoffs({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        'not-prose my-10 rounded-xl border border-amber-200 bg-amber-50 p-6 sm:p-8 md:p-10',
        breakout,
      )}
    >
      <p className="text-xl font-semibold tracking-[-0.02em] text-neutral-900">
        Honest tradeoffs
      </p>
      <div className="mt-4 text-base leading-relaxed text-neutral-700 [&>p]:mt-3.5 [&>p:first-child]:mt-0 [&>ul]:mt-3.5 [&>ul]:list-none [&>ul]:space-y-2.5 [&>ul]:pl-0 [&_li]:flex [&_li]:items-start [&_li]:gap-2.5 [&_li]:before:mt-0.5 [&_li]:before:text-amber-600 [&_li]:before:content-['△']">
        {children}
      </div>
    </div>
  )
}

/* ─── Pricing Compare ─── */

export function PricingCompare({
  gitcms,
  competitor,
  competitorName,
}: {
  // GitCMS's own price comes from positioning so every page stays in sync.
  gitcms: { note?: string }
  competitor: { free: string; paid: string; note?: string }
  competitorName: string
}) {
  return (
    <div className={cn('not-prose my-10 grid gap-4 sm:grid-cols-2', breakout)}>
      <div className="rounded-xl border border-neutral-900 bg-neutral-950 p-5 sm:p-7">
        <p className="text-sm font-semibold uppercase tracking-widest text-neutral-400">
          GitCMS
        </p>
        <p className="mt-3 text-xl font-semibold tracking-[-0.02em] text-white">
          Preview before purchase
        </p>
        <p className="mt-1.5 text-base text-neutral-400">
          {LICENSE_PRICE_SUMMARY}
        </p>
        {gitcms.note && (
          <p className="mt-3 text-sm text-neutral-500">{gitcms.note}</p>
        )}
      </div>
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5 sm:p-7">
        <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
          {competitorName}
        </p>
        <p className="mt-3 text-xl font-semibold tracking-[-0.02em] text-neutral-900">
          {competitor.free}
        </p>
        <p className="mt-1.5 text-base text-neutral-500">{competitor.paid}</p>
        {competitor.note && (
          <p className="mt-3 text-sm text-neutral-400">{competitor.note}</p>
        )}
      </div>
    </div>
  )
}

/* ─── Component map for MDX ─── */

export const comparisonMdxComponents = {
  Verdict,
  VerdictGitCMS: Verdict.GitCMS,
  VerdictCompetitor: Verdict.Competitor,
  CaseStudy,
  FeatureTable,
  Tradeoffs,
  PricingCompare,
}

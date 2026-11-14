import type { ReactNode } from 'react'
import { Check, Minus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LICENSE_PRICE_SUMMARY } from '@/lib/positioning'

/**
 * The feature table runs to the article card's edges, cancelling its
 * `px-6 sm:px-12` padding. It drops its own side borders there, so it reads
 * as a band of the card instead of a box on top of the card's border.
 */
const cardBleed = '-mx-6 sm:-mx-12'

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
    <div className="not-prose my-10 grid gap-4 sm:grid-cols-2">{children}</div>
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
    <div className={cn('not-prose my-10', cardBleed)}>
      <div className="overflow-x-auto border-y border-neutral-200">
        <table className="w-full min-w-[580px] text-left">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50">
              <th className="py-3.5 pr-5 text-sm font-semibold uppercase tracking-widest text-neutral-500 first:pl-6 last:pr-6 sm:pr-6 sm:first:pl-12 sm:last:pr-12">
                Capability
              </th>
              <th className="py-3.5 pr-5 text-sm font-semibold uppercase tracking-widest text-neutral-500 first:pl-6 last:pr-6 sm:pr-6 sm:first:pl-12 sm:last:pr-12">
                GitCMS
              </th>
              <th className="py-3.5 pr-5 text-sm font-semibold uppercase tracking-widest text-neutral-500 first:pl-6 last:pr-6 sm:pr-6 sm:first:pl-12 sm:last:pr-12">
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
                <td className="py-3.5 pr-5 first:pl-6 last:pr-6 sm:pr-6 sm:first:pl-12 sm:last:pr-12">
                  <span className="text-[15px] font-medium text-neutral-900">
                    {row.category}
                  </span>
                  {row.note && (
                    <p className="mt-0.5 text-sm text-neutral-400">
                      {row.note}
                    </p>
                  )}
                </td>
                <td className="py-3.5 pr-5 first:pl-6 last:pr-6 sm:pr-6 sm:first:pl-12 sm:last:pr-12">
                  <CellContent value={row.gitcms} />
                </td>
                <td className="py-3.5 pr-5 first:pl-6 last:pr-6 sm:pr-6 sm:first:pl-12 sm:last:pr-12">
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
        'not-prose my-10 rounded-xl border border-amber-200 bg-amber-50/50 p-6 sm:p-8 md:p-10',
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
    <div className="not-prose my-10 grid gap-4 sm:grid-cols-2">
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

/* ─── Ranked alternatives (alternatives guides) ─── */

/**
 * One entry in an alternatives guide's ranked list. The body is ordinary
 * Markdown, with `<Strengths>` and `<Limits>` around its two lists, so the
 * `.md` copy reads the same as the page.
 */
export function AlternativePick({
  rank,
  name,
  logo,
  bestFor,
  pricing,
  pick,
  compareHref,
  children,
}: {
  rank: number
  name: string
  logo?: string
  bestFor: string
  pricing: string
  /** Badge for the recommended entry, e.g. "Our pick for code-first teams". */
  pick?: string
  compareHref?: string
  children: ReactNode
}) {
  return (
    <section
      className={cn(
        'not-prose my-8 rounded-xl border p-6 sm:p-8',
        pick ? 'border-neutral-900 ring-1 ring-neutral-900' : 'border-neutral-200',
      )}
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold tabular-nums text-neutral-400">#{rank}</span>
        {logo ? (
          <img src={logo} alt="" className="size-7 shrink-0 object-contain" />
        ) : (
          <span className="grid size-7 shrink-0 place-items-center rounded-md bg-neutral-100 text-sm font-semibold text-neutral-700">{name.charAt(0)}</span>
        )}
        <h3 className="text-xl font-semibold tracking-[-0.02em] text-neutral-900">{name}</h3>
        {pick && <span className="rounded-full bg-[#DCF986] px-2.5 py-0.5 text-xs font-semibold text-neutral-900">{pick}</span>}
      </div>
      <p className="mt-2 text-[15px] text-neutral-500">
        <span className="font-medium text-neutral-700">Best for:</span> {bestFor}
      </p>
      <div className="mt-4 text-base leading-relaxed text-neutral-700 [&_a]:font-medium [&_a]:text-neutral-900 [&_a]:underline [&_a]:underline-offset-2 [&_img]:my-5 [&_img]:w-full [&_img]:rounded-lg [&_img]:border [&_img]:border-neutral-200 [&>p]:mt-3 [&>p:first-child]:mt-0">
        {children}
      </div>
      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-neutral-100 pt-4 text-sm">
        <p className="text-neutral-500">
          <span className="font-medium text-neutral-700">Pricing:</span> {pricing}
        </p>
        {compareHref && (
          <a href={compareHref} className="font-medium text-neutral-900 underline underline-offset-2">
            GitCMS vs {name}
          </a>
        )}
      </div>
    </section>
  )
}

function PickList({ title, tone, children }: { title: string; tone: 'strength' | 'limit'; children: ReactNode }) {
  return (
    <div className="mt-4">
      <p className="text-sm font-semibold text-neutral-900">{title}</p>
      <div
        className={cn(
          'mt-2 [&>ul]:list-none [&>ul]:space-y-1.5 [&>ul]:pl-0 [&_li]:flex [&_li]:items-start [&_li]:gap-2',
          tone === 'strength'
            ? "[&_li]:before:text-emerald-600 [&_li]:before:content-['✓']"
            : "[&_li]:before:text-neutral-400 [&_li]:before:content-['–']",
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function Strengths({ children }: { children: ReactNode }) {
  return <PickList title="What it does well" tone="strength">{children}</PickList>
}

export function Limits({ children }: { children: ReactNode }) {
  return <PickList title="Where it falls short" tone="limit">{children}</PickList>
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
  AlternativePick,
  Strengths,
  Limits,
}

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface PricingVariantProps {
  /** Page the section sits on, for analytics. Defaults to the homepage. */
  landingVariant?: string
}

export function PricingHeader({
  title,
  description,
  badge,
}: {
  title: ReactNode
  description: ReactNode
  badge?: ReactNode
}) {
  return (
    <div className="text-center">
      <div className="text-sm font-medium uppercase tracking-widest text-neutral-400">
        Pricing
      </div>
      <h2 className="mx-auto mt-4 max-w-3xl font-logo text-4xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-base text-neutral-500">
        {description}
      </p>
      {badge ? (
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-700">
          <span className="size-1.5 rounded-full bg-purple-500" />
          {badge}
        </div>
      ) : null}
    </div>
  )
}

export function FoundingCtaButton({
  label,
  sites,
  seats,
  design,
  ctaVariant,
  landingVariant,
  onClick,
  className,
}: {
  label: string
  sites: number
  seats: number
  design: string
  ctaVariant: string
  landingVariant: string
  onClick: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-umami-event="pricing_cta_clicked"
      data-umami-event-pricing-surface="landing_pricing"
      data-umami-event-pricing-design={design}
      data-umami-event-cta-variant={ctaVariant}
      data-umami-event-site-quantity={String(sites)}
      data-umami-event-seat-quantity={String(seats)}
      data-umami-event-landing-variant={landingVariant}
      className={cn(
        'flex w-full items-center justify-center rounded-lg bg-[#DCF986] px-5 py-3.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-[#d4f47a]',
        className,
      )}
    >
      {label}
    </button>
  )
}

export function ComingSoonPill({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-neutral-300 px-2.5 py-0.5 text-xs font-medium text-neutral-500',
        className,
      )}
    >
      Coming soon
    </span>
  )
}

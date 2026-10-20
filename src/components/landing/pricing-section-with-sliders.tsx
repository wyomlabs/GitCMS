import { useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  FOUNDING_FEATURES,
  FOUNDING_LICENSE,
  PRICING_PERSONAS,
  UPCOMING_PLANS,
  breakEvenMonths,
  foundingCost,
  monthlyCost,
} from './pricing-plans'
import {
  ComingSoonPill,
  FoundingCtaButton,
  PricingHeader,
} from './pricing-parts'
import type { PricingVariantProps } from './pricing-parts'
import { usePricingCheckout } from './use-pricing-checkout'
import { usePricingExposure } from './use-pricing-exposure'

// Tags analytics so designs can be compared; keep unique per design.
const PRICING_DESIGN = 'two_doors_sliders'

const MAX_SITES = 10
const MAX_SEATS = 20

const monthlyPlans = UPCOMING_PLANS.filter((plan) => plan.key !== 'preview')

function plural(count: number, noun: string) {
  return `${count} ${noun}${count === 1 ? '' : 's'}`
}

function Stepper({
  label,
  ariaLabel,
  value,
  unit,
  min,
  max,
  marks,
  onChange,
}: {
  label: string
  ariaLabel: string
  value: number
  unit: string
  min: number
  max: number
  marks: Array<number>
  onChange: (value: number) => void
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-400">{label}</span>
        <span className="text-sm font-semibold tabular-nums text-[#DCF986]">
          {unit === 'person' && value !== 1
            ? `${value} people`
            : plural(value, unit)}
        </span>
      </div>
      <input
        type="range"
        aria-label={ariaLabel}
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-neutral-800 accent-[#DCF986]"
      />
      <div className="mt-2 flex justify-between text-xs text-neutral-600">
        {marks.map((mark) => (
          <span key={mark}>{mark}</span>
        ))}
      </div>
    </div>
  )
}

/**
 * NOT RENDERED. Alternate to `PricingSection`, kept to try if the fixed-price
 * version does not convert. It is the same two doors with the calculator kept:
 * role chips and site/people sliders size the founding license, and the monthly
 * plans reprice for the same setup so both ways to pay compare like for like.
 *
 * To switch, render `<PricingSectionWithSliders />` in place of
 * `<PricingSection />` in `landing-page.tsx` and `framework-page.tsx`. It takes
 * the same props and renders the same `#pricing` section.
 */
export function PricingSectionWithSliders({
  landingVariant = 'home',
}: PricingVariantProps) {
  const { startCheckout, ctaVariant } = usePricingCheckout(
    landingVariant,
    PRICING_DESIGN,
  )
  const sectionRef = usePricingExposure<HTMLElement>(
    PRICING_DESIGN,
    landingVariant,
  )
  const [sites, setSites] = useState(1)
  const [seats, setSeats] = useState(1)

  const oneTime = foundingCost(sites, seats)
  const extraSeats = seats - 1

  const options = monthlyPlans.map((plan) => {
    const isAvailable = plan.key !== 'solo' || seats === 1
    return {
      plan,
      isAvailable,
      monthly: isAvailable ? monthlyCost(plan, sites) : null,
    }
  })
  const cheapest = options.reduce<{ name: string; monthly: number } | null>(
    (best, option) => {
      if (option.monthly === null) return best
      if (best && best.monthly <= option.monthly) return best
      return { name: option.plan.name, monthly: option.monthly }
    },
    null,
  )

  return (
    <section id="pricing" ref={sectionRef} className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <PricingHeader
          title="Today: pay once. Soon: monthly."
          description="Buy a founding license today and keep your sites. Founding price soon will be gone."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_1fr]">
          {/* Now */}
          <div className="flex flex-col rounded-3xl bg-[#0a0a0a] p-8 text-white shadow-lg sm:p-12">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#DCF986] px-3 py-1 text-xs font-semibold text-neutral-900">
              <span className="size-1.5 rounded-full bg-neutral-900" />
              Available now
            </span>

            <h3 className="mt-6 font-logo text-2xl font-semibold tracking-tight">
              Founding license
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {PRICING_PERSONAS.map((persona) => {
                const isActive =
                  sites === persona.sites && seats === persona.seats
                return (
                  <button
                    key={persona.key}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setSites(persona.sites)
                      setSeats(persona.seats)
                    }}
                    className={cn(
                      'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-[#DCF986] text-neutral-900'
                        : 'bg-white/10 text-neutral-400 hover:bg-white/15 hover:text-neutral-300',
                    )}
                  >
                    {persona.label}
                  </button>
                )
              })}
            </div>

            <div className="mt-6 flex items-end gap-3">
              <span className="text-6xl font-semibold tabular-nums tracking-tight sm:text-7xl">
                ${oneTime}
              </span>
              <span className="mb-2 text-base text-neutral-400">one-time</span>
            </div>
            <p className="mt-2 text-sm text-neutral-400">
              {plural(sites, 'site')} at ${FOUNDING_LICENSE.sitePrice}
              {extraSeats > 0
                ? `, + ${plural(extraSeats, 'extra teammate')} at $${FOUNDING_LICENSE.seatPrice}`
                : ''}
              . No subscription.
            </p>

            <div className="mt-8 space-y-6">
              <Stepper
                label="Sites"
                ariaLabel="Number of site licenses"
                value={sites}
                unit="site"
                min={1}
                max={MAX_SITES}
                marks={[1, 3, 5, 7, 10]}
                onChange={setSites}
              />
              <Stepper
                label="People"
                ariaLabel="Number of people on your team"
                value={seats}
                unit="person"
                min={1}
                max={MAX_SEATS}
                marks={[1, 5, 10, 15, 20]}
                onChange={setSeats}
              />
            </div>

            <ul className="mt-8 grid gap-x-6 gap-y-3 border-t border-white/10 pt-8 sm:grid-cols-2">
              {FOUNDING_FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-neutral-300"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-[#DCF986]"
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-10">
              <FoundingCtaButton
                label={`Get a founding license — $${oneTime}`}
                sites={sites}
                seats={seats}
                design={PRICING_DESIGN}
                ctaVariant={ctaVariant}
                landingVariant={landingVariant}
                onClick={() => startCheckout(sites, seats)}
              />
            </div>
          </div>

          {/* Next */}
          <div className="flex flex-col rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 p-8 sm:p-10">
            <ComingSoonPill className="w-fit bg-white" />

            <h3 className="mt-6 font-logo text-2xl font-semibold tracking-tight text-neutral-900">
              Monthly plans
            </h3>
            <p className="mt-2 text-sm text-neutral-500">
              The same {plural(sites, 'site')} and{' '}
              {seats === 1 ? '1 person' : `${seats} people`}, if you would
              rather subscribe than own.
            </p>

            <ul className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
              {options.map(({ plan, isAvailable, monthly }) => (
                <li
                  key={plan.key}
                  className="flex items-start justify-between gap-4 py-4"
                >
                  <div>
                    <div
                      className={cn(
                        'text-sm font-semibold',
                        isAvailable ? 'text-neutral-900' : 'text-neutral-400',
                      )}
                    >
                      {plan.name}
                    </div>
                    <div className="mt-0.5 text-sm text-neutral-500">
                      {isAvailable
                        ? plan.tagline
                        : 'For one person. Pick Team for more.'}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    {monthly === null ? (
                      <span className="text-sm text-neutral-400">—</span>
                    ) : (
                      <>
                        <div className="text-sm font-semibold tabular-nums text-neutral-900">
                          ${monthly}/mo
                        </div>
                        <div className="mt-0.5 text-xs text-neutral-500">
                          {plan.priceLabel}
                        </div>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-xs text-neutral-500">
              A free Preview plan lets anyone explore one real site.
            </p>

            <div className="mt-auto pt-8">
              {cheapest ? (
                <div className="rounded-xl border border-violet-200 bg-violet-50 px-5 py-4 text-sm text-violet-900">
                  <span className="font-semibold">
                    ${oneTime} once is about{' '}
                    {plural(
                      breakEvenMonths(oneTime, cheapest.monthly),
                      'month',
                    )}{' '}
                    of {cheapest.name}.
                  </span>{' '}
                  After that, a founding license costs you nothing more.
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Check } from 'lucide-react'
import {
  FOUNDING_FEATURES,
  FOUNDING_LICENSE,
  UPCOMING_PLANS,
  breakEvenMonths,
  getUpcomingPlan,
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
const PRICING_DESIGN = 'two_doors'

const monthlyPlans = UPCOMING_PLANS.filter((plan) => plan.key !== 'preview')
const preview = getUpcomingPlan('preview')
const teamMonths = breakEvenMonths(
  FOUNDING_LICENSE.sitePrice,
  getUpcomingPlan('team').monthlyPrice,
)

/**
 * Two doors: the founding license you can buy now on the left, the monthly
 * plans coming next on the right. Fixed price, no calculator. The variant with
 * sliders is kept in `pricing-section-with-sliders.tsx`.
 */
export function PricingSection({
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

            <div className="mt-4 flex items-end gap-3">
              <span className="text-6xl font-semibold tracking-tight sm:text-7xl">
                ${FOUNDING_LICENSE.sitePrice}
              </span>
              <span className="mb-2 text-base text-neutral-400">
                per site, one-time
              </span>
            </div>
            <p className="mt-2 text-sm text-neutral-400">
              +${FOUNDING_LICENSE.seatPrice} per extra teammate, one-time. No
              subscription.
            </p>

            <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
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
                label={`Get a founding license — $${FOUNDING_LICENSE.sitePrice}`}
                sites={1}
                seats={1}
                design={PRICING_DESIGN}
                ctaVariant={ctaVariant}
                landingVariant={landingVariant}
                onClick={() => startCheckout(1, 1)}
              />
              <p className="mt-3 text-center text-xs text-neutral-500">
                Add more sites or teammates at checkout.
              </p>
            </div>
          </div>

          {/* Next */}
          <div className="flex flex-col rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 p-8 sm:p-10">
            <ComingSoonPill className="w-fit bg-white" />

            <h3 className="mt-6 font-logo text-2xl font-semibold tracking-tight text-neutral-900">
              Monthly plans
            </h3>
            <p className="mt-2 text-sm text-neutral-500">
              For people who would rather subscribe than own. Priced per
              website; Team and Agency include everyone who works on it.
            </p>

            <ul className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
              {monthlyPlans.map((plan) => (
                <li
                  key={plan.key}
                  className="flex items-start justify-between gap-4 py-4"
                >
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">
                      {plan.name}
                    </div>
                    <div className="mt-0.5 text-sm text-neutral-500">
                      {plan.tagline}
                    </div>
                  </div>
                  <div className="shrink-0 text-right text-sm font-semibold text-neutral-900">
                    {plan.priceLabel}
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-xs text-neutral-500">
              A free {preview.name} plan lets anyone explore one real site.
            </p>

            <div className="mt-auto pt-8">
              <div className="rounded-xl border border-violet-200 bg-violet-50 px-5 py-4 text-sm text-violet-900">
                <span className="font-semibold">
                  ${FOUNDING_LICENSE.sitePrice} once is about {teamMonths}{' '}
                  months of Team.
                </span>{' '}
                After that, a founding license costs you nothing more.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

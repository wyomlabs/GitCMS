/**
 * Black Friday 2026: the last time the founding license is sold before
 * GitCMS moves to monthly plans. The deal is the founding license as it is
 * sold today, not a discount, so every number reads from `LICENSE_PRICING`
 * and the Team plan it is compared with.
 */
import { FOUNDING_LICENSE, getUpcomingPlan } from '@/lib/pricing-plans'

const team = getUpcomingPlan('team')

export const BLACK_FRIDAY = {
  /** Bump with each campaign so a past dismissal doesn't hide a new one. */
  id: 'black-friday-2026',
  /** End of Cyber Monday, Pacific time. The banner and popup hide after it. */
  endsAt: '2026-12-01T00:00:00-08:00',
  /** The last day of the sale, for schema.org `priceValidUntil`. */
  lastDay: '2026-11-30',
  endsLabel: 'Cyber Monday',
  endsDateLabel: 'November 30',
  sitePrice: FOUNDING_LICENSE.sitePrice,
  seatPrice: FOUNDING_LICENSE.seatPrice,
  teamPlanName: team.name,
  teamMonthly: team.monthlyPrice,
  /** A year of the Team plan for one site. */
  teamYearly: team.monthlyPrice * 12,
} as const

/**
 * Black Friday 2026: the last time the founding license is sold before
 * GitCMS moves to monthly plans. For everyone the deal is the founding license
 * as it is sold today, not a discount; agencies also get a real one, a code
 * for 5+ sites in one order. Every price reads from `LICENSE_PRICING`.
 */
import { FOUNDING_LICENSE, getUpcomingPlan } from '@/lib/pricing-plans'

const team = getUpcomingPlan('team')

/**
 * The agency code as configured in Dodo: percent off site licenses (not
 * seats), a minimum order of `minSites` sites at full price, one redemption
 * per customer, `maxAgencies` in total, expiring with the sale. Change it in
 * Dodo and here together.
 */
const AGENCY_PERCENT_OFF = 25
const agencySitePrice = (FOUNDING_LICENSE.sitePrice * (100 - AGENCY_PERCENT_OFF)) / 100

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
  agency: {
    code: 'BF26',
    percentOff: AGENCY_PERCENT_OFF,
    minSites: 5,
    maxAgencies: 20,
    sitePrice: agencySitePrice,
    /** Order totals for the pack sizes shown on the pricing card. */
    examples: [5, 10].map((sites) => ({ sites, total: sites * agencySitePrice })),
  },
} as const

/** "$89" for whole dollars, "$66.75" otherwise. */
export function formatUsd(amount: number): string {
  return Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`
}

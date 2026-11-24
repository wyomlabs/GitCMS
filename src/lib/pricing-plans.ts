/**
 * Pricing shown in the landing pricing section. The founding license reads
 * from `LICENSE_PRICING` and is sold until the Black Friday sale ends; the
 * monthly plans are for new sites after that.
 */
import { LICENSE_PRICING } from '@/lib/positioning'

export const FOUNDING_LICENSE = LICENSE_PRICING

export const FOUNDING_FEATURES = [
  'Unlimited content edits',
  'Visual Markdown and MDX editor',
  'Content board for drafts and reviews',
  'Bring your own AI agents over MCP',
  'Review changes before they publish',
  'Structured fields for page content',
  'Media uploads and image optimization',
  'Team roles, invites, and site access',
  'Google Search Console insights',
  'All future updates included',
] as const

export type PlanKey = 'preview' | 'solo' | 'team' | 'agency'

export interface UpcomingPlan {
  key: PlanKey
  name: string
  /** Monthly price in dollars; 0 for Preview. */
  monthlyPrice: number
  /** Short price label, e.g. "$15/site/mo". */
  priceLabel: string
  tagline: string
  /** Sites covered by the base price (Agency only). */
  includedSites?: number
  /** Monthly price of each site beyond the included ones. */
  extraSitePrice?: number
}

export const UPCOMING_PLANS: ReadonlyArray<UpcomingPlan> = [
  {
    key: 'preview',
    name: 'Preview',
    monthlyPrice: 0,
    priceLabel: '$0',
    tagline: 'Explore GitCMS on one real site',
  },
  {
    key: 'solo',
    name: 'Solo',
    monthlyPrice: 15,
    priceLabel: '$15/site/mo',
    tagline: 'One person running their own sites',
  },
  {
    key: 'team',
    name: 'Team',
    monthlyPrice: 29,
    priceLabel: '$29/site/mo',
    tagline: 'Everyone on the team, with reviews and roles',
  },
  {
    key: 'agency',
    name: 'Agency',
    monthlyPrice: 79,
    priceLabel: '$79/mo',
    tagline: '5 sites included, +$10 for each one after',
    includedSites: 5,
    extraSitePrice: 10,
  },
]

export function getUpcomingPlan(key: PlanKey): UpcomingPlan {
  const plan = UPCOMING_PLANS.find((candidate) => candidate.key === key)
  if (!plan) {
    throw new Error(`Unknown pricing plan: ${key}`)
  }
  return plan
}

export function monthlyCost(plan: UpcomingPlan, sites: number): number {
  if (plan.includedSites !== undefined && plan.extraSitePrice !== undefined) {
    return (
      plan.monthlyPrice +
      Math.max(0, sites - plan.includedSites) * plan.extraSitePrice
    )
  }
  return plan.monthlyPrice * sites
}

export function foundingCost(sites: number, seats: number): number {
  return (
    sites * FOUNDING_LICENSE.sitePrice +
    Math.max(0, seats - 1) * FOUNDING_LICENSE.seatPrice
  )
}

/** Whole months of the monthly plan that a one-time purchase equals. */
export function breakEvenMonths(oneTime: number, monthly: number): number {
  return Math.max(1, Math.round(oneTime / monthly))
}

/** Role presets for the calculator in `pricing-section-with-sliders.tsx`. */
export interface PricingPersona {
  key: string
  label: string
  description: string
  sites: number
  seats: number
}

export const PRICING_PERSONAS: ReadonlyArray<PricingPersona> = [
  {
    key: 'solo',
    label: 'Solo builder',
    description: 'One site you run yourself',
    sites: 1,
    seats: 1,
  },
  {
    key: 'company',
    label: 'Company team',
    description: 'Marketing and engineering on one website',
    sites: 2,
    seats: 5,
  },
  {
    key: 'agency',
    label: 'Agency',
    description: 'Client sites you build and hand off',
    sites: 5,
    seats: 10,
  },
]

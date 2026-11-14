/**
 * What a marketing site costs to run elsewhere, for the cost comparator on
 * the landing page, use-case pages, and comparison pages. List prices billed
 * yearly; WordPress plugins and upkeep are estimates, and the comparator says
 * so. Update `COMPETITOR_COSTS_AS_OF` whenever a price here is re-checked.
 */
import { UPCOMING_PLANS, monthlyCost } from '@/lib/pricing-plans'

export const COMPETITOR_COSTS_AS_OF = 'November 2026'

export type CompetitorCostKey = 'wordpress' | 'webflow' | 'framer'

export interface CompetitorCost {
  key: CompetitorCostKey
  name: string
  logo: string
  /** Monthly cost of each site, in dollars. */
  perSite: number
  /** Monthly cost of each editor after the first, in dollars. */
  perExtraEditor: number
  note: string
}

export const COMPETITOR_COSTS: ReadonlyArray<CompetitorCost> = [
  {
    key: 'wordpress',
    name: 'WordPress',
    logo: '/logos/wordpress.svg',
    perSite: 30 + 20 + 50,
    perExtraEditor: 0,
    note: 'Managed hosting $30, premium plugins ~$20, updates and security upkeep ~$50, per site',
  },
  {
    key: 'webflow',
    name: 'Webflow',
    logo: '/logos/webflow.svg',
    perSite: 25,
    perExtraEditor: 0,
    note: 'Premium site plan $25 per site (Basic has no CMS); workspace seats extra',
  },
  {
    key: 'framer',
    name: 'Framer',
    logo: '/logos/framer.svg',
    perSite: 30,
    perExtraEditor: 10,
    note: 'Pro site plan $30 per site, plus $10 per content editor',
  },
]

export function competitorMonthly(cost: CompetitorCost, sites: number, editors: number): number {
  return sites * cost.perSite + Math.max(0, editors - 1) * cost.perExtraEditor
}

/** The cheapest GitCMS plan for this many sites and editors. Solo is single-editor. */
export function gitcmsMonthly(sites: number, editors: number): number {
  const eligible = UPCOMING_PLANS.filter((plan) => plan.key !== 'preview' && (editors === 1 || plan.key !== 'solo'))
  return Math.min(...eligible.map((plan) => monthlyCost(plan, sites)))
}

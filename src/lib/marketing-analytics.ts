const ACTIVE_PRICING_INTENT_STORAGE_KEY = 'gitcms.analytics.activePricingIntent'

export interface PricingIntentHandoff {
  id: string
  originSurface: string
  landingPath: string
  landingVariant?: string
  pricingDesign?: string
  siteQuantity?: number
  seatQuantity?: number
}

export function persistPricingIntent({
  pricingSurface,
  siteQuantity,
  seatQuantity,
  landingVariant,
  pricingDesign,
}: {
  pricingSurface: string
  siteQuantity?: number
  seatQuantity?: number
  landingVariant?: string
  /** Which landing pricing design the visitor clicked, for comparing designs. */
  pricingDesign?: string
}): PricingIntentHandoff | null {
  if (typeof window === 'undefined') return null
  const intent: PricingIntentHandoff = {
    id: crypto.randomUUID(),
    originSurface: pricingSurface,
    landingPath: window.location.pathname,
    landingVariant,
    pricingDesign,
    siteQuantity,
    seatQuantity,
  }
  window.sessionStorage.setItem(
    ACTIVE_PRICING_INTENT_STORAGE_KEY,
    JSON.stringify(intent),
  )
  return intent
}

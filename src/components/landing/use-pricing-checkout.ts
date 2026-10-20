import { formatSettingsHash } from '@/lib/settings-hash'
import { startLogin } from '@/lib/start-login'
import { persistPricingIntent } from '@/lib/marketing-analytics'

/**
 * Sends a visitor from a pricing CTA to workspace billing with the chosen
 * quantities. The public site cannot read the product session on
 * app.gitcms.dev, so every visitor goes through login, which forwards signed-in
 * users straight on. The pricing intent travels in the URL because session
 * storage does not cross origins; the app seeds it on arrival.
 */
export function usePricingCheckout(
  landingVariant: string,
  pricingDesign: string,
) {
  const startCheckout = (sites: number, seats: number) => {
    const pricingIntent = persistPricingIntent({
      pricingSurface: 'landing_pricing',
      siteQuantity: sites,
      seatQuantity: seats,
      landingVariant,
      pricingDesign,
    })

    const searchParams = new URLSearchParams({
      sites: String(sites),
      seats: String(seats),
    })
    if (pricingIntent) {
      searchParams.set('pricingIntentId', pricingIntent.id)
      searchParams.set('pricingOriginSurface', pricingIntent.originSurface)
      searchParams.set('landingPath', pricingIntent.landingPath)
      searchParams.set('landingVariant', landingVariant)
      searchParams.set('pricingDesign', pricingDesign)
    }

    const billingHash = formatSettingsHash({
      scope: 'workspace',
      tab: 'billing',
    })
    startLogin(`/?${searchParams.toString()}#${billingHash}`)
  }

  return {
    startCheckout,
    ctaVariant: 'sign_in_for_billing',
  }
}

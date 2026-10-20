import { useEffect, useRef } from 'react'
import { z } from 'zod'
import { isFunction } from '@/lib/runtime-types'

// The Umami script defines `window.umami` at runtime, outside our types, so
// parse it before calling.
const umamiTrackerSchema = z.object({
  track: z.custom<(event: string, data?: Record<string, string>) => void>(
    (value) => isFunction(value),
  ),
})

// A quarter of the section on screen counts as seen; it is taller than most
// viewports, so requiring more would miss people on small screens.
const SEEN_THRESHOLD = 0.25

/**
 * Reports once per page view that a visitor saw the pricing section, tagged
 * with the design. Click-through needs this as its denominator. The Umami
 * script is absent outside production, in which case nothing is sent.
 */
export function usePricingExposure<T extends HTMLElement>(
  pricingDesign: string,
  landingVariant: string,
) {
  const sectionRef = useRef<T>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return

        observer.disconnect()
        if (!('umami' in window)) return
        const tracker = umamiTrackerSchema.safeParse(window.umami)
        if (!tracker.success) return

        tracker.data.track('pricing_section_viewed', {
          'pricing-surface': 'landing_pricing',
          'pricing-design': pricingDesign,
          'landing-variant': landingVariant,
        })
      },
      { threshold: SEEN_THRESHOLD },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [pricingDesign, landingVariant])

  return sectionRef
}

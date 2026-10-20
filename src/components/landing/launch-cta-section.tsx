import { loginUrl } from '@/lib/start-login'

type LaunchCtaSectionProps = {
  heading?: string
  highlightedHeading?: string
  body?: string
  ctaLabel?: string
  ctaTarget?: string
  landingPath?: string
  landingVariant: string
}

export function LaunchCtaSection({
  heading = 'Start editing.',
  highlightedHeading = 'Publish content with taste.',
  body = 'The founding license is live. Preview your site now, then buy a license when you are ready to publish.',
  ctaLabel = 'Launch GitCMS',
  ctaTarget = '/',
  landingPath,
  landingVariant,
}: LaunchCtaSectionProps) {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-2xl bg-[#0a0a0a] px-8 py-10 sm:gap-10 sm:rounded-3xl sm:px-16 sm:py-16 md:flex-row md:items-center">
        <div>
          <h2 className="font-logo text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
            {heading}
            <br />
            <span className="text-[#DCF986]">{highlightedHeading}</span>
          </h2>
          <p className="mt-2 text-sm text-neutral-300">
            {body}
          </p>
        </div>
        <a
          href={loginUrl(ctaTarget)}
          data-umami-event="landing_cta_clicked"
          data-umami-event-cta-variant="launch_gitcms"
          data-umami-event-cta-target={ctaTarget}
          data-umami-event-landing-path={landingPath}
          data-umami-event-landing-variant={landingVariant}
          className="inline-flex items-center rounded-lg bg-[#DCF986] px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-[#d4f47a]"
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  )
}

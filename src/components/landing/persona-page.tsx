import { ArrowRight } from 'lucide-react'
import { Link } from '@/lib/router'
import { useSession } from '@/lib/auth-client'
import { startLogin } from '@/lib/start-login'
import { DEMO_VIDEO_URL, DemoVideoEmbed } from './demo-video'
import { EditorialFlowMockup } from './editorial-flow-mockup'
import { MockEditor } from './mock-editor'
import { GitHubMark, McpEditorMockup, McpSectionEyebrow } from './mcp-shared'
import type { PersonaContent } from './persona-content'
import { PersonaPickerSection } from './persona-picker-section'
import { CodeFirstTeamsStrip } from './code-first-teams'

function PersonaVisual({
  visual,
}: {
  visual: PersonaContent['heroVisual']
}) {
  if (visual === 'workflow') {
    return <EditorialFlowMockup />
  }

  if (visual === 'mcp') {
    return <McpEditorMockup />
  }

  return <MockEditor />
}

function PersonaFaqSection({
  faq,
}: {
  faq: PersonaContent['faq']
}) {
  return (
    <section className="border-t border-neutral-100 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <div className="text-sm font-medium uppercase tracking-widest text-violet-700">
              FAQ
            </div>
            <h2 className="mt-4 font-logo text-3xl font-medium leading-tight tracking-tight text-neutral-900 sm:text-4xl">
              Questions before you bring this into your workflow
            </h2>
          </div>

          <div className="border-t border-neutral-200">
            {faq.map((item) => (
              <div
                key={item.question}
                className="border-b border-neutral-200 py-6"
              >
                <h3 className="text-lg font-medium leading-snug text-neutral-900">
                  {item.question}
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-500">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function PersonaPage({ persona }: { persona: PersonaContent }) {
  const { data: session } = useSession()
  const isSoloBuilders = persona.slug === 'solo-builders'
  const isStartups = persona.slug === 'startups'
  const isAgencies = persona.slug === 'agencies'
  const isFreelancers = persona.slug === 'freelancers'
  const usesHeroSummaryPanel =
    isSoloBuilders || isStartups || isAgencies || isFreelancers

  const heroSummaryTitle = isSoloBuilders
    ? 'Why Solo Builders Use It'
    : isStartups
      ? 'Why Companies Use It'
      : isAgencies
        ? 'Why Agencies Use It'
        : 'Why Freelancers Use It'

  const demoTitle = isSoloBuilders
    ? 'Watch how it works for solo builders'
    : isStartups
      ? 'Watch how it works for startups and companies'
      : isAgencies
        ? 'Watch how it works for agencies'
        : 'Watch how it works for freelancers'

  const painEyebrow = isSoloBuilders
    ? 'Why Publishing Slips'
    : isAgencies
      ? 'Where Post-Launch Margin Goes'
      : isFreelancers
        ? 'Where Your Time Goes'
        : 'What Slows Teams Down'

  return (
    <>
      <section className="relative overflow-hidden border-b border-neutral-200">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-violet-100/80 to-transparent" />
        <div className="pointer-events-none absolute -left-24 top-24 size-72 rounded-full bg-[#DCF986]/60 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-10 size-72 rounded-full bg-violet-200/50 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
          <div>
            <McpSectionEyebrow>{persona.heroLabel}</McpSectionEyebrow>
            <h1 className="mt-6 font-logo text-4xl font-normal leading-tight tracking-tight sm:text-5xl md:text-[56px]">
              {persona.heroTitle}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-500 sm:text-lg">
              {persona.heroBody}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {session?.user ? (
                <Link
                  to="/" app
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                >
                  Open GitCMS
                  <ArrowRight className="size-4" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    startLogin()
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                >
                  <GitHubMark className="size-4.5" />
                  Try on your repo
                </button>
              )}

              <a
                href={DEMO_VIDEO_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
              >
                Watch Demo
              </a>
            </div>

            {!usesHeroSummaryPanel ? (
              <ul className="mt-8 space-y-3 border-t border-neutral-200 pt-6">
                {persona.heroSupport.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-neutral-500 sm:text-base"
                  >
                    <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-neutral-900" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-neutral-500">
              {persona.heroNote}
            </p>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            {usesHeroSummaryPanel ? (
              <div className="w-full max-w-xl rounded-[2rem] border border-neutral-200 bg-white/80 p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.15)] backdrop-blur">
                <div className="text-sm font-medium uppercase tracking-widest text-neutral-400">
                  {heroSummaryTitle}
                </div>
                <ul className="mt-6 space-y-5 border-t border-neutral-200 pt-6">
                  {persona.heroSupport.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-neutral-500 sm:text-base"
                    >
                      <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-neutral-900" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <PersonaVisual visual={persona.heroVisual} />
            )}
          </div>
        </div>
      </section>

      {usesHeroSummaryPanel ? (
        <section className="border-b border-neutral-100 bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <DemoVideoEmbed
              className="mx-auto max-w-5xl"
              title={demoTitle}
            />
          </div>
        </section>
      ) : null}

      <section className="border-b border-neutral-100 bg-white py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <div>
            <div className="text-sm font-medium uppercase tracking-widest text-neutral-400">
              {painEyebrow}
            </div>
            <h2 className="mt-4 font-logo text-3xl font-medium leading-tight tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
              {persona.painTitle}
            </h2>
          </div>

          <div className="border-t border-neutral-200">
            {persona.pains.map((pain, index) => (
              <div
                key={pain.title}
                className="grid gap-4 border-b border-neutral-200 py-6 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-6"
              >
                <div className="text-xs font-medium uppercase tracking-[0.24em] text-neutral-400">
                  0{index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-medium tracking-tight text-neutral-900">
                    {pain.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-500">
                    {pain.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid min-h-screen grid-cols-1 lg:h-screen lg:grid-cols-2">
        <div className="order-2 flex min-h-[80svh] items-center justify-center bg-[#0a0a0a] p-6 sm:p-8 lg:order-1 lg:min-h-0 lg:p-16">
          <PersonaVisual visual={persona.valueVisual} />
        </div>
        <div className="order-1 flex min-h-[80svh] flex-col items-center justify-center bg-white px-6 py-12 sm:px-8 sm:py-16 lg:order-2 lg:min-h-0 lg:px-16">
          <div className="max-w-xl">
            <div className="text-sm font-medium uppercase tracking-widest text-neutral-400">
              How it helps
            </div>
            <h2 className="mt-4 font-logo text-3xl font-medium leading-tight tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
              {persona.valueTitle}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-neutral-500">
              {persona.valueBody}
            </p>

            <ul className="mt-8 space-y-3">
              {persona.valuePoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm leading-relaxed text-neutral-500 sm:text-base"
                >
                  <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[#EF4444]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              {persona.relatedLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900"
                >
                  {link.label}
                  <ArrowRight className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid min-h-screen grid-cols-1 lg:h-screen lg:grid-cols-2">
        <div className="order-2 flex min-h-[80svh] items-center justify-center bg-[#0a0a0a] p-6 sm:p-8 lg:order-2 lg:min-h-0 lg:p-16">
          <EditorialFlowMockup />
        </div>
        <div className="order-1 flex min-h-[80svh] flex-col items-center justify-center bg-[#DCF986] px-6 py-12 sm:px-8 sm:py-16 lg:order-1 lg:min-h-0 lg:px-16">
          <div className="max-w-xl">
            <div className="text-sm font-medium uppercase tracking-widest text-neutral-900/45">
              In Practice
            </div>
            <h2 className="mt-4 font-logo text-3xl font-medium leading-tight tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
              {persona.scenarioTitle}
            </h2>
            {persona.scenarioBody ? (
              <p className="mt-5 max-w-lg text-base leading-relaxed text-neutral-800">
                {persona.scenarioBody}
              </p>
            ) : null}

            <div className="mt-8 space-y-5">
              {persona.scenarioSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="grid gap-3 border-t border-neutral-900/12 pt-5 sm:grid-cols-[56px_minmax(0,1fr)]"
                >
                  <div className="text-xs font-medium uppercase tracking-[0.24em] text-neutral-900/45">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-medium tracking-tight text-neutral-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-neutral-800">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {persona.scenarioFooter ? (
              <p className="mt-8 max-w-lg text-sm leading-relaxed text-neutral-900/60 sm:text-base">
                {persona.scenarioFooter}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <CodeFirstTeamsStrip />

      <PersonaFaqSection faq={persona.faq} />

      <PersonaPickerSection
        title="Looking for a different fit?"
        description="Explore the other pages and see how GitCMS fits different teams, client setups, and publishing workflows."
        showEyebrow={false}
      />

      <section className="px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-2xl bg-[#0a0a0a] px-8 py-10 sm:gap-10 sm:rounded-3xl sm:px-16 sm:py-16 md:flex-row md:items-center">
          <div>
            <h2 className="font-logo text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
              {persona.ctaTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
              {persona.ctaBody}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {session?.user ? (
              <Link
                to="/" app
                className="inline-flex items-center justify-center rounded-lg bg-[#DCF986] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-[#d4f47a]"
              >
                Open GitCMS
              </Link>
            ) : (
              <button
                type="button"
                onClick={() =>
                  startLogin()
                }
                className="inline-flex items-center justify-center rounded-lg bg-[#DCF986] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-[#d4f47a]"
              >
                Try on your repo
              </button>
            )}

            <a
              href="/#pricing"
              className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
            >
              See Pricing
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

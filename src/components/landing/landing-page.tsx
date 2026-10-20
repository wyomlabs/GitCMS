import { ArrowDown } from 'lucide-react'
import { loginUrl } from '@/lib/start-login'
import { GitCMSLogo } from '@/components/gitcms-logo'
import { DiscordSupportButton } from './discord-support-button'
import { FloatingNav } from './floating-nav'
import { LandingFooter } from './landing-footer'
import { MockEditor } from './mock-editor'
import {
  FeatureSection,
  FeatureVideo,
  WorkspaceAccessMockup,
} from './feature-section'
import { PricingSection } from './pricing-section'
import { ShowcaseSection } from './showcase-section'
import { FAQSection } from './faq-section'
import { PersonaPickerSection } from './persona-picker-section'
import { StillDecidingSection } from './still-deciding-section'
import { FounderStorySection } from './founder-story-section'
import { TestimonialsSection } from './testimonials-section'
import { CodeFirstTeamsStrip } from './code-first-teams'
import { FrameworkCompatibilitySection } from './framework-compatibility-section'
import { HeroControlPlaneVisual } from './hero-control-plane-visual'
import { AgentWorkflowVisual } from './agent-workflow-visual'
import { AgentDemoDialog } from './agent-demo-dialog'
import { TrustedDevelopersBar } from './trusted-developers-bar'
import {
  FEATURE_LEARN_MORE,
  FeatureLearnMoreLink,
  FeatureTryNowLink,
} from './feature-learn-more-link'

const GitHubMark = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 98 96"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
    />
  </svg>
)

function HeroScrollCue({
  href,
  className,
}: {
  href: '#hero-visual' | '#features'
  className: string
}) {
  return (
    <a
      href={href}
      onClick={(event) => {
        event.preventDefault()
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }}
      className={`group z-30 items-center gap-2.5 rounded-full border border-neutral-300 bg-white/90 px-5 py-3 text-sm font-semibold text-neutral-700 shadow-lg shadow-neutral-900/10 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-neutral-400 hover:bg-white hover:text-neutral-900 ${className}`}
    >
      Keep scrolling
      <ArrowDown
        className="size-4 transition-transform group-hover:translate-y-0.5"
        aria-hidden="true"
      />
    </a>
  )
}

export function LandingPage() {
  return (
    <main className="bg-white text-neutral-900">
      <FloatingNav />
      <DiscordSupportButton />

      <div>
        {/* Hero — the post-build handoff from coding agents to the whole team. */}
        <section className="relative grid min-h-screen grid-cols-1 lg:h-screen lg:grid-cols-2">
          <div className="relative flex min-h-screen flex-col items-center bg-white lg:h-screen">
            <a
              href="/"
              className="flex items-center justify-center gap-3 px-6 pt-8 sm:px-8 sm:pt-12 lg:px-16 lg:pt-12"
            >
              <GitCMSLogo className="size-8 sm:size-10" />
              <span className="font-logo text-3xl font-medium tracking-tight sm:text-4xl">
                GitCMS
              </span>
            </a>

            <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-8 lg:px-16">
              <div className="w-full max-w-[590px] text-center">
                <p className="text-sm font-medium uppercase tracking-widest text-neutral-400">
                  The control plane for code-first websites
                </p>
                <h1 className="mt-4 font-logo text-4xl font-normal leading-tight tracking-tight sm:text-5xl">
                  Your AI built the website.
                  <br />
                  Now give your team a way to run it.
                </h1>

                <p className="mx-auto mt-7 max-w-lg text-base leading-relaxed text-neutral-500 sm:text-lg">
                  Connect the repo behind the site you built with Claude Code,
                  Codex, or Cursor. Your team, clients, and AI agents get one
                  safe place to edit, review, and publish—while the website
                  stays in your repository.
                </p>

                <div className="mt-9 flex w-full flex-col gap-5">
                  <a
                    href={loginUrl()}
                    data-umami-event="landing_cta_clicked"
                    data-umami-event-cta-variant="add_gitcms"
                    data-umami-event-cta-target="/"
                    data-umami-event-landing-path="/"
                    data-umami-event-landing-variant="home"
                    className="flex w-full items-center justify-center gap-2.5 rounded-xl border-2 border-neutral-900 bg-neutral-900 py-3 text-sm font-semibold text-white transition-colors hover:border-[#b5d74e] hover:bg-[#DCF986] hover:text-neutral-900 sm:text-base"
                  >
                    <GitHubMark className="size-5" />
                    Add GitCMS
                  </a>

                  <TrustedDevelopersBar />
                </div>
              </div>
            </div>

            <HeroScrollCue
              href="#hero-visual"
              className="absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 lg:hidden"
            />
          </div>

          <div
            id="hero-visual"
            className="flex min-h-[80svh] scroll-mt-4 items-center justify-center border-t border-neutral-100 bg-neutral-50 px-5 py-16 sm:px-8 lg:min-h-0 lg:border-l lg:border-t-0 lg:px-10 lg:py-8"
          >
            <HeroControlPlaneVisual />
          </div>

          <HeroScrollCue
            href="#features"
            className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 lg:inline-flex"
          />
        </section>

        {/* Features — one per pillar: people, agents, review, access. */}
        <div id="features">
          <FeatureSection
            id="editor"
            eyebrow="01 / People"
            title={
              <>
                Let anyone update
                <br />
                the website.
              </>
            }
            description="Marketing, writers, and clients get a familiar editing experience—without Git, an IDE, or access to your codebase."
            points={[
              'Edit pages as easily as a document',
              'Add images, links, and reusable page sections',
              'Keep every update connected to the website',
            ]}
            media={
              <div className="w-full max-w-xl">
                <MockEditor />
              </div>
            }
          >
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <FeatureLearnMoreLink
                theme="on-white"
                className="mt-0"
                {...FEATURE_LEARN_MORE.editor}
              />
              <FeatureTryNowLink theme="on-white" />
            </div>
          </FeatureSection>

          <FeatureSection
            id="mcp"
            eyebrow="02 / Agents"
            tone="violet"
            mediaPosition="right"
            title={
              <>
                Bring your own agent.
                <br />
                Keep the final say.
              </>
            }
            description="Let the AI tools you already use research, draft, and propose website changes. GitCMS keeps the work in one reviewable flow."
            points={[
              'ChatGPT, Claude, and personal agents like OpenClaw and Hermes',
              'With review before publish, agent changes wait as drafts for people',
              'People decide what gets published',
            ]}
            media={<AgentWorkflowVisual />}
          >
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <FeatureLearnMoreLink
                theme="on-white"
                className="mt-0"
                {...FEATURE_LEARN_MORE.mcp}
              />
              <AgentDemoDialog theme="light" />
            </div>
          </FeatureSection>

          <FeatureSection
            eyebrow="03 / Review"
            tone="peach"
            title={
              <>
                Review important changes
                <br />
                before they go live.
              </>
            }
            description="See what changed, leave feedback, and publish when it is ready—whether the work came from a person or an AI agent."
            points={[
              'Clear stages from idea to published',
              'Keep feedback and changes together',
              'See who changed what, and when',
            ]}
            media={
              <FeatureVideo
                src="/videos/landing/editorial-workflow-4x3.mp4"
                label="Editorial workflow demo"
              />
            }
          >
            <FeatureLearnMoreLink
              theme="on-white"
              {...FEATURE_LEARN_MORE.editorialWorkflow}
            />
          </FeatureSection>

          <FeatureSection
            eyebrow="04 / Access"
            mediaPosition="right"
            title={
              <>
                Give people access—
                <br />
                not the keys.
              </>
            }
            description="Invite teammates and clients to the sites they work on without sharing developer accounts or exposing every project."
            points={[
              'Simple roles for writing, reviewing, and publishing',
              'Site-by-site access for clients and teams',
              'Separate workspaces when projects need separation',
            ]}
            media={<WorkspaceAccessMockup siteName="Client blog" />}
          >
            <FeatureLearnMoreLink
              theme="on-white"
              {...FEATURE_LEARN_MORE.teams}
            />
          </FeatureSection>
        </div>

        <div>
          {/* Manifesto Teaser */}
          <section className="py-24 sm:py-40 lg:py-56">
            <div className="mx-auto max-w-5xl px-6 text-center">
              <h2 className="font-logo text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
                Drag-and-drop was a workaround.{' '}
                <span className="text-neutral-400">
                  Agents made code the fastest way to build. What your website
                  still needs is an admin, and it belongs on top of your repo.
                </span>
              </h2>
              <a
                href="/manifesto"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
              >
                Read the manifesto
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </section>

          <CodeFirstTeamsStrip />

          <TestimonialsSection />

          {/* Founder story */}
          <FounderStorySection />

          {/* Showcase — site type mockups */}
          <ShowcaseSection />

          <PersonaPickerSection />

          <FrameworkCompatibilitySection />

          {/* Pricing */}
          <PricingSection />

          {/* FAQ */}
          <FAQSection />

          <StillDecidingSection landingVariant="home" />

          <LandingFooter />
        </div>
      </div>
    </main>
  )
}

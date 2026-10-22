import { Link } from '@/lib/router'
import { directoryAgentList } from '@/lib/agent-data'
import { frameworkList, getFrameworkFaqs } from '@/lib/framework-data'
import type { FrameworkInfo } from '@/lib/framework-data'
import { startLogin } from '@/lib/start-login'
import { AgenticOnboardingSection } from './agentic-onboarding-section'
import { DEMO_VIDEO_URL, DemoVideoEmbed } from './demo-video'
import {
  FEATURE_LEARN_MORE,
  FeatureLearnMoreLink,
  FeatureTryNowLink,
} from './feature-learn-more-link'
import { MockEditor } from './mock-editor'
import { CodeFirstTeamsStrip } from '@/components/resources/code-first-teams'
import {
  FeatureSection,
  FeatureVideo,
  WorkspaceAccessMockup,
} from './feature-section'
import { PricingSection } from './pricing-section'
import { ShowcaseSection } from './showcase-section'
import { StillDecidingSection } from './still-deciding-section'
import { TrustedDevelopersBar } from './trusted-developers-bar'

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

export function FrameworkPage({ framework }: { framework: FrameworkInfo }) {
  const faqs = getFrameworkFaqs(framework)
  const otherFrameworks = frameworkList.filter(
    (candidate) => candidate.slug !== framework.slug,
  )

  return (
    <div className="bg-white text-neutral-900">
        <section className="flex min-h-screen flex-col items-center justify-center px-6 py-24 sm:py-28">
          <div className="flex w-full max-w-5xl flex-col items-center text-center">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
              GitCMS + {framework.name}
            </p>

            <h1 className="mt-7 font-logo text-4xl font-normal leading-tight tracking-tight sm:text-5xl md:text-[56px]">
              The{' '}
              <span style={{ color: framework.accentColor }}>
                {framework.name}
              </span>{' '}
              CMS for your team,
              <br />
              clients, and agents.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-relaxed text-neutral-500 sm:text-lg">
              Built your {framework.name} site with code or an AI coding agent?
              GitCMS gives everyone who runs it one safe place to edit, review,
              and publish—while your content files, Git history, and deployment
              pipeline stay yours.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => startLogin()}
                data-umami-event="landing_cta_clicked"
                data-umami-event-cta-variant="try_on_repo"
                data-umami-event-cta-target="/"
                data-umami-event-landing-variant={framework.slug}
                className="flex items-center justify-center gap-2.5 rounded-xl border-2 border-neutral-900 bg-neutral-900 px-8 py-3 text-sm font-semibold text-white transition-colors hover:border-[#b5d74e] hover:bg-[#DCF986] hover:text-neutral-900 sm:text-base"
              >
                <GitHubMark className="size-5" />
                Add GitCMS
              </button>
              <a
                href={DEMO_VIDEO_URL}
                target="_blank"
                rel="noreferrer"
                data-umami-event="landing_cta_clicked"
                data-umami-event-cta-variant="watch_demo"
                data-umami-event-cta-target={DEMO_VIDEO_URL}
                data-umami-event-landing-variant={framework.slug}
                className="flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-8 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50 sm:text-base"
              >
                Watch demo
              </a>
            </div>

            <div className="mt-8">
              <TrustedDevelopersBar />
            </div>

            <div className="mt-12 w-full max-w-6xl py-4">
              <DemoVideoEmbed
                title={`Watch GitCMS manage a ${framework.name} site`}
              />
            </div>

            <p className="mt-4 text-sm text-neutral-400">
              Your framework, repository, content files, and hosting stay
              exactly where they are.
            </p>
          </div>
        </section>

        <section className="border-t border-neutral-100 px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-medium uppercase tracking-widest text-neutral-400">
              Day One is done
            </p>
            <h2 className="mt-4 max-w-3xl font-logo text-3xl font-medium leading-tight tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
              Your {framework.name} site is built. Who runs it now?
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-500 sm:text-lg">
              A coding agent can ship a {framework.name} site in an afternoon.
              After launch the work changes: copy updates, new posts, client
              requests, and agent edits someone needs to check. That&apos;s Day
              Two, and it&apos;s what GitCMS is for.
            </p>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                { label: 'Day One · Build', body: framework.dayOne },
                { label: 'The handoff', body: framework.handoff },
                {
                  label: 'Day Two · Run',
                  body: `Clients, marketers, and AI agents edit through GitCMS. Changes are reviewed, published as commits, and ${framework.name} rebuilds from your repo as usual.`,
                },
              ].map((step) => (
                <div
                  key={step.label}
                  className="rounded-2xl border border-neutral-200 bg-neutral-50/60 p-6"
                >
                  <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                    {step.label}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-neutral-700">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 rounded-xl border border-violet-200 bg-violet-50/70 px-5 py-4 text-sm leading-relaxed text-violet-900">
              <span className="font-semibold">{framework.name} handoff tip:</span>{' '}
              {framework.handoffTip}
            </p>
          </div>
        </section>

        <FeatureSection
          eyebrow="01 / People"
          title="A visual workspace for everyone running the site."
          description={
            <>
              Writers, marketers, and clients work visually while GitCMS keeps
              every change grounded in the content model and files in your{' '}
              {framework.name} repository.
            </>
          }
          points={[
            'Familiar rich-text and block editing',
            'Structured fields from your content model',
            'Images and media stay with the repository',
            framework.editorHighlight,
          ]}
          media={<MockEditor frameworkName={framework.name} />}
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
          id="agents"
          eyebrow="02 / Agents"
          tone="violet"
          mediaPosition="right"
          title="Bring your own agent. Keep the final say."
          description={
            <>
              Let the AI tools you already use research, draft, and propose
              changes. GitCMS turns that work into a visible content task for
              your {framework.name} site before anything is published.
            </>
          }
          points={[
            'Use ChatGPT, Claude, or a personal agent like OpenClaw or Hermes',
            'Proposed changes stay attached to a content task',
            'People refine and approve the work',
            'GitCMS publishes only when the team is ready',
          ]}
          media={
            <FeatureVideo
              src="/videos/landing/mcp-claude-workflow-4x3.mp4"
              label={`${framework.name} agent workflow demo`}
            />
          }
        >
          <FeatureLearnMoreLink theme="on-white" {...FEATURE_LEARN_MORE.mcp}>
            Explore agents
          </FeatureLearnMoreLink>
          <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {directoryAgentList.map((agent) => (
              <Link
                key={agent.slug}
                to="/agents/$agent"
                params={{ agent: agent.slug }}
                className="group flex min-w-0 flex-col items-center gap-2 text-center"
              >
                <span className="flex size-11 items-center justify-center rounded-xl border border-neutral-200 bg-white shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
                  <img
                    src={agent.logoPath}
                    alt=""
                    aria-hidden="true"
                    className="size-7 rounded object-contain"
                  />
                </span>
                <span className="w-full truncate text-[10px] font-medium text-neutral-500 transition-colors group-hover:text-neutral-900">
                  {agent.name}
                </span>
              </Link>
            ))}
          </div>
        </FeatureSection>

        <FeatureSection
          eyebrow="03 / Review"
          tone="peach"
          title="Review important changes before they go live."
          description="See what changed, keep feedback with the work, and publish only when it is ready—whether the update came from a person or an AI agent."
          points={[
            'Ideas, Draft, Review, and Published stay visible',
            'Briefs, feedback, contributors, and changes stay together',
            'Reviewers decide what is ready to ship',
            'Git records the final published history',
          ]}
          media={
            <FeatureVideo
              src="/videos/landing/editorial-workflow-4x3.mp4"
              label={`${framework.name} review workflow demo`}
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
          title="Give people access—not the keys."
          description="Invite teammates, clients, and content agents to the sites they work on without sharing developer accounts or exposing every project."
          points={[
            'Simple roles for writing, reviewing, and publishing',
            'Site-by-site access for clients and teams',
            'Separate workspaces when projects need separation',
            'Agents participate without receiving developer credentials',
          ]}
          media={<WorkspaceAccessMockup siteName={`${framework.name} site`} />}
        >
          <FeatureLearnMoreLink theme="on-white" {...FEATURE_LEARN_MORE.teams} />
        </FeatureSection>

        <section className="border-t border-neutral-100 py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-center font-logo text-2xl font-medium tracking-tight text-neutral-900 sm:text-3xl">
              Works with every static site generator
            </h2>
            <p className="mt-3 text-center text-sm text-neutral-500">
              GitCMS connects to your repository, not a prescribed framework.
              Keep yours.
            </p>
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {otherFrameworks.map((candidate) => (
                <Link
                  key={candidate.slug}
                  to="/git-based-cms-for-{$framework}"
                  params={{ framework: candidate.slug }}
                  className="group flex flex-col items-center gap-3 rounded-xl border border-neutral-100 bg-neutral-50/50 px-4 py-5 transition-all hover:border-neutral-200 hover:bg-white hover:shadow-sm"
                >
                  <img
                    src={candidate.logo}
                    alt=""
                    aria-hidden="true"
                    className="size-8 object-contain transition-transform group-hover:scale-110"
                  />
                  <span className="text-xs font-medium text-neutral-600">
                    {candidate.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-100 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="font-logo text-2xl font-medium tracking-tight text-neutral-900 sm:text-3xl">
              {framework.name} CMS questions
            </h2>
            <dl className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
              {faqs.map((faq) => (
                <div key={faq.question} className="py-6">
                  <dt className="text-lg font-medium leading-snug text-neutral-900">
                    {faq.question}
                  </dt>
                  <dd className="mt-3 text-base leading-relaxed text-neutral-500">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <CodeFirstTeamsStrip />
        <ShowcaseSection />
        <AgenticOnboardingSection frameworkName={framework.name} />
        <PricingSection landingVariant={framework.slug} />
        <StillDecidingSection
          frameworkName={framework.name}
          landingVariant={framework.slug}
        />
    </div>
  )
}

import * as React from 'react'
import { Link } from '@/lib/router'
import {
  ArrowDown,
  ArrowRight,
  Check,
  CircleCheck,
  Copy,
  Eye,
  FileText,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { AI_PROVIDERS } from '@/lib/ai-providers'
import type { AgentFamily, AgentInfo } from '@/lib/agent-data'
import {
  AGENT_FAMILY_DESCRIPTIONS,
  AGENT_FAMILY_LABELS,
  directoryAgentList,
} from '@/lib/agent-data'
import { startLogin } from '@/lib/start-login'
import { cn } from '@/lib/utils'
import { DemoVideoEmbed } from './demo-video'
import { FeatureSection } from './feature-section'
import { MCP_CONNECTOR_URL } from './mcp-shared'

const CONNECTION_NOTE: Record<AgentFamily, string> = {
  assistant: 'Guided setup, tested by GitCMS.',
  coding: 'Connects to GitCMS over MCP with OAuth sign-in.',
  personal: 'Connects with a scoped, revocable GitCMS token.',
}

const workflowSteps = [
  {
    title: 'The agent proposes',
    description:
      'Research, drafts, and edits arrive as one visible content task.',
    icon: Send,
  },
  {
    title: 'People review',
    description:
      'Your team can refine the work, leave feedback, and approve it.',
    icon: Eye,
  },
  {
    title: 'GitCMS publishes',
    description: 'Only approved changes reach the website and its Git history.',
    icon: CircleCheck,
  },
] as const

function AgentHeroVisual({ agent }: { agent: AgentInfo }) {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="flex animate-in fade-in slide-in-from-bottom-3 items-center justify-center gap-3 duration-700">
        <div className="flex size-16 items-center justify-center rounded-2xl border border-white bg-white shadow-lg shadow-neutral-900/10 sm:size-20">
          <img
            src={agent.logoPath}
            alt=""
            aria-hidden="true"
            className="size-9 rounded-md object-contain sm:size-11"
          />
        </div>
        <ArrowRight className="size-5 text-neutral-400" aria-hidden="true" />
        <div className="rounded-full border border-neutral-300 bg-white/80 px-4 py-2 text-xs font-semibold text-neutral-700 shadow-sm backdrop-blur-md sm:text-sm">
          GitCMS connector
        </div>
      </div>

      <div className="mx-auto h-12 w-px bg-gradient-to-b from-neutral-300 to-[#DCF986]" />

      <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-[#0a0a0a] text-white shadow-2xl shadow-neutral-900/20">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-20 size-52 rounded-full blur-3xl"
          style={{ backgroundColor: agent.accentColor, opacity: 0.24 }}
        />
        <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
          <div>
            <p className="text-sm font-semibold">Homepage update</p>
            <p className="mt-0.5 text-xs text-white/40">
              One shared content task
            </p>
          </div>
          <span className="rounded-full border border-violet-300/20 bg-violet-300/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-violet-200">
            In review
          </span>
        </div>

        <div className="relative grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-5 px-5 py-5 sm:px-6">
          <span className="flex size-8 items-center justify-center rounded-full bg-violet-400/10 text-violet-300">
            <FileText className="size-4" />
          </span>
          <div>
            <p className="text-sm font-medium">
              {agent.name} proposed a change
            </p>
            <p className="mt-1 text-xs leading-relaxed text-white/40">
              The draft and its context are ready to inspect.
            </p>
          </div>
          <span className="flex size-8 items-center justify-center rounded-full bg-[#DCF986]/10 text-[#DCF986]">
            <ShieldCheck className="size-4" />
          </span>
          <div>
            <p className="text-sm font-medium">Your team keeps the final say</p>
            <p className="mt-1 text-xs leading-relaxed text-white/40">
              Feedback, approval, and publishing remain human decisions.
            </p>
          </div>
        </div>

        <div className="relative flex items-center justify-between border-t border-white/10 bg-white/[0.03] px-5 py-4 sm:px-6">
          <span className="text-xs font-medium text-white/45">
            Draft → Review
          </span>
          <span className="rounded-lg bg-[#DCF986] px-3 py-2 text-xs font-semibold text-neutral-950">
            Publish when approved
          </span>
        </div>
      </div>

      <p className="mt-5 text-center text-xs leading-relaxed text-neutral-500">
        {CONNECTION_NOTE[agent.family]}
      </p>
    </div>
  )
}

function useCopyToClipboard() {
  const [isCopied, setIsCopied] = React.useState(false)
  const resetTimeoutRef = React.useRef<number | null>(null)

  const copy = React.useCallback((text: string) => {
    if (!navigator.clipboard) return

    void navigator.clipboard.writeText(text).then(() => {
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current)
      }

      setIsCopied(true)
      resetTimeoutRef.current = window.setTimeout(() => {
        setIsCopied(false)
        resetTimeoutRef.current = null
      }, 1800)
    })
  }, [])

  React.useEffect(() => {
    return () => {
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [])

  return { isCopied, copy }
}

function ConnectorCopyButton({ agent }: { agent: AgentInfo }) {
  const { isCopied, copy } = useCopyToClipboard()

  return (
    <button
      type="button"
      onClick={() => copy(MCP_CONNECTOR_URL)}
      data-umami-event="landing_agent_connector_copied"
      data-umami-event-agent={agent.slug}
      className="group flex w-full items-center gap-3 rounded-xl border border-neutral-700 bg-white/[0.04] px-4 py-3 text-left transition-colors hover:border-[#DCF986]/60 hover:bg-[#DCF986]/10"
    >
      <code className="min-w-0 flex-1 truncate text-xs text-neutral-300 sm:text-sm">
        {MCP_CONNECTOR_URL}
      </code>
      <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[#DCF986]">
        {isCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
        {isCopied ? 'Copied' : 'Copy URL'}
      </span>
    </button>
  )
}

function CodeSnippet({ code }: { code: string }) {
  const { isCopied, copy } = useCopyToClipboard()

  return (
    <div className="relative mt-4 max-w-xl overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
      <pre className="overflow-x-auto px-4 py-3 pr-20 text-xs leading-relaxed text-neutral-200 sm:text-sm">
        <code>{code}</code>
      </pre>
      <button
        type="button"
        onClick={() => copy(code)}
        className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-[11px] font-semibold text-neutral-200 transition-colors hover:bg-white/20"
      >
        {isCopied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        {isCopied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}

function CopyTextButton({
  text,
  label,
  className,
}: {
  text: string
  label: string
  className?: string
}) {
  const { isCopied, copy } = useCopyToClipboard()

  return (
    <button
      type="button"
      onClick={() => copy(text)}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-950',
        className,
      )}
    >
      {isCopied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {isCopied ? 'Copied' : label}
    </button>
  )
}

const DIRECTORY_FAMILIES: ReadonlyArray<AgentFamily> = [
  'assistant',
  'personal',
]

const CONNECTION_METHODS: ReadonlyArray<{
  family: AgentFamily
  method: string
  auth: string
  bestFor: string
}> = [
  {
    family: 'assistant',
    method: 'App / custom connector',
    auth: 'Sign in to GitCMS (OAuth)',
    bestFor: 'Drafting in conversation, with the GitCMS editor inside the chat',
  },
  {
    family: 'coding',
    method: 'Remote MCP server',
    auth: 'Sign in to GitCMS (OAuth)',
    bestFor: 'Content changes next to the code you just shipped',
  },
  {
    family: 'personal',
    method: 'Remote MCP server',
    auth: 'Personal access token (bearer)',
    bestFor: 'Background and scheduled work on your site’s content',
  },
]

function ConnectionMethods({ agent }: { agent: AgentInfo }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className="border-b border-white/10 px-5 py-4">
        <p className="text-sm font-semibold">Ways to connect an agent to GitCMS</p>
        <p className="mt-0.5 text-xs text-neutral-500">
          All use the same connector URL and the same review workflow.
        </p>
      </div>
      <ul className="divide-y divide-white/10">
        {CONNECTION_METHODS.map((method) => {
          const isCurrent = method.family === agent.family
          return (
            <li
              key={method.family}
              className={cn(
                'px-5 py-4',
                isCurrent ? 'bg-violet-500/10' : undefined,
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white">
                  {AGENT_FAMILY_LABELS[method.family]}s
                </p>
                {isCurrent ? (
                  <span className="rounded-full bg-violet-400/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-200">
                    {agent.name}
                  </span>
                ) : null}
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">
                {method.method} · {method.auth}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                Best for: {method.bestFor}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function AgentDetailPage({ agent }: { agent: AgentInfo }) {
  const guidedProvider = agent.guidedProviderId
    ? AI_PROVIDERS.find((provider) => provider.id === agent.guidedProviderId)
    : undefined

  return (
    <div className="overflow-hidden bg-white text-neutral-900">
        <section className="relative grid min-h-[calc(100svh-73px)] border-b border-neutral-200 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative flex items-center px-6 py-16 sm:px-10 lg:px-16 lg:py-20 xl:px-24">
            <div className="mx-auto w-full max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Link
                to="/agents"
                className="inline-flex items-center font-mono text-xs font-medium uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:text-neutral-900"
              >
                GitCMS + {agent.name}
              </Link>

              <h1 className="mt-7 font-logo text-4xl font-normal leading-[1.02] tracking-tight text-neutral-950 sm:text-5xl md:text-[56px]">
                {agent.heroTitle}
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-600 sm:text-lg">
                {agent.description}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#setup"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-neutral-800"
                >
                  Connect {agent.name}
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="#workflow"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-700 transition-all hover:-translate-y-0.5 hover:border-neutral-400 hover:text-neutral-950"
                >
                  See the workflow
                  <ArrowDown className="size-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="relative flex min-h-[680px] items-center overflow-hidden bg-gradient-to-br from-violet-50 via-white to-[#f2f9dc] px-5 py-16 sm:px-10 lg:min-h-0 lg:border-l lg:border-neutral-200 lg:px-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-28 -top-24 size-96 animate-pulse rounded-full blur-3xl [animation-duration:8s]"
              style={{ backgroundColor: agent.accentColor, opacity: 0.18 }}
            />
            <div className="pointer-events-none absolute -bottom-28 -left-16 size-80 animate-pulse rounded-full bg-[#DCF986]/40 blur-3xl [animation-delay:1.2s] [animation-duration:9s]" />
            <div className="relative z-10 w-full">
              <AgentHeroVisual agent={agent} />
            </div>
          </div>
        </section>

        <section
          id="about"
          className="border-b border-neutral-200 px-6 py-20 sm:px-10 sm:py-28 lg:px-16 xl:px-24"
        >
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
                {AGENT_FAMILY_LABELS[agent.family]}
              </p>
              <h2 className="mt-4 font-logo text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                What is {agent.name}?
              </h2>
              <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
                {agent.whatIs}
              </p>
            </div>
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
                Why connect it
              </p>
              <h2 className="mt-4 font-logo text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                Why use {agent.name} with GitCMS?
              </h2>
              <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
                {agent.whyGitcms}
              </p>
            </div>
          </div>
        </section>

        <section
          id="setup"
          className="scroll-mt-6 bg-[#0a0a0a] px-6 py-20 text-white sm:px-10 sm:py-28 lg:px-16 xl:px-24"
        >
          <div className="mx-auto w-full max-w-7xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-violet-300/70">
              Setup
            </p>
            <h2 className="mt-4 max-w-3xl font-logo text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl">
              How to connect {agent.name} to GitCMS
            </h2>

            <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
              <ol>
                {agent.setupSteps.map((step, index) => {
                  const isLast = index === agent.setupSteps.length - 1

                  return (
                    <li
                      key={step.title}
                      className="relative flex gap-6 pb-10 last:pb-0"
                    >
                      {!isLast ? (
                        <span className="absolute bottom-0 left-5 top-12 w-px bg-white/10" />
                      ) : null}
                      <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/20 font-logo text-sm font-medium text-violet-200">
                        {index + 1}
                      </span>
                      <div className="min-w-0 pt-2">
                        <h3 className="text-base font-semibold leading-snug text-white sm:text-lg">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-neutral-400 sm:text-base">
                          {step.body}
                        </p>
                        {step.code ? <CodeSnippet code={step.code} /> : null}
                        {step.showConnector ? (
                          <div className="mt-4 max-w-md">
                            <ConnectorCopyButton agent={agent} />
                          </div>
                        ) : null}
                      </div>
                    </li>
                  )
                })}
              </ol>

              <div className="lg:sticky lg:top-24 lg:self-start">
                {guidedProvider?.videoSrc ? (
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/40">
                    <video
                      key={guidedProvider.id}
                      src={guidedProvider.videoSrc}
                      autoPlay
                      controls
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="aspect-video w-full bg-black/30"
                    >
                      {guidedProvider.name} setup walkthrough
                    </video>
                  </div>
                ) : (
                  <ConnectionMethods agent={agent} />
                )}
                <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-neutral-500">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#DCF986]" />
                  {agent.compatibilityNote
                    ?? 'MCP requires a licensed GitCMS site. Preview mode does not unlock the connector.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200 px-6 py-20 sm:px-10 sm:py-28 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div className="max-w-3xl">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
                  Example prompts
                </p>
                <h2 className="mt-4 font-logo text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl">
                  What you can ask {agent.name} to do
                </h2>
              </div>
              <Link
                to="/prompts"
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 transition-colors hover:text-neutral-950"
              >
                Browse the prompt library
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {agent.prompts.map((prompt) => (
                <div
                  key={prompt.title}
                  className="flex flex-col rounded-2xl border border-neutral-200 bg-neutral-50/60 p-6"
                >
                  <h3 className="font-logo text-xl font-medium tracking-tight">
                    {prompt.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">
                    &ldquo;{prompt.prompt}&rdquo;
                  </p>
                  <CopyTextButton
                    text={prompt.prompt}
                    label="Copy prompt"
                    className="mt-5 self-start"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <FeatureSection
          id="workflow"
          eyebrow="One governed workflow"
          tone="violet"
          mediaPosition="right"
          title={`${agent.name} proposes. Your team publishes.`}
          description={`Whatever ${agent.name} drafts lands in a content task on your real site. People review it, comment, and decide what goes live, with Git recording every change.`}
          points={workflowSteps.map((step) => `${step.title}: ${step.description}`)}
          media={
            <div className="w-full max-w-xl">
              <DemoVideoEmbed
                title={`Watch the GitCMS agent workflow for ${agent.name}`}
                className="border-white/10 bg-neutral-950 shadow-2xl shadow-black/50"
              />
              <p className="mt-4 text-xs leading-relaxed text-neutral-500">
                {agent.slug === 'claude'
                  ? 'Draft in conversation, then continue with the same work inside GitCMS.'
                  : 'Example shown with Claude. Every agent uses the same GitCMS task and review path.'}
              </p>
            </div>
          }
        />

        <section className="border-b border-neutral-200 px-6 py-20 sm:px-10 sm:py-28 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
              FAQ
            </p>
            <h2 className="mt-4 font-logo text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              {agent.name} and GitCMS questions
            </h2>
            <dl className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
              {agent.faqs.map((faq) => (
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

        <section className="bg-neutral-50 px-6 py-16 sm:px-10 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
                  More agents
                </p>
                <h2 className="mt-3 font-logo text-2xl font-medium sm:text-3xl">
                  One workflow, whichever agent you choose.
                </h2>
              </div>
              <Link
                to="/agents"
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 transition-colors hover:text-neutral-950"
              >
                Compare all agents
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {DIRECTORY_FAMILIES.map((family) => (
                <div key={family}>
                  <h3 className="text-sm font-semibold text-neutral-900">
                    {AGENT_FAMILY_LABELS[family]}s
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-500">
                    {AGENT_FAMILY_DESCRIPTIONS[family]}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {directoryAgentList
                      .filter(
                        (candidate) =>
                          candidate.family === family
                          && candidate.slug !== agent.slug,
                      )
                      .map((candidate) => (
                        <Link
                          key={candidate.slug}
                          to="/agents/$agent"
                          params={{ agent: candidate.slug }}
                          className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-950"
                        >
                          <img
                            src={candidate.logoPath}
                            alt=""
                            aria-hidden="true"
                            className="size-4 rounded object-contain"
                          />
                          {candidate.name}
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-20 sm:px-10 sm:py-28 lg:px-16 xl:px-24">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#0a0a0a] px-7 py-12 text-white sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between lg:px-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full blur-3xl"
              style={{ backgroundColor: agent.accentColor, opacity: 0.24 }}
            />
            <div className="relative max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
                <Sparkles className="size-4 text-[#DCF986]" />
                Keep the agent. Add the control plane.
              </div>
              <h2 className="mt-4 font-logo text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
                Give{' '}
                <span className="inline-flex items-center gap-[0.2em] whitespace-nowrap align-[-0.08em]">
                  <span className="inline-flex size-[0.9em] items-center justify-center rounded-[0.22em] bg-white shadow-sm ring-1 ring-white/15">
                    <img
                      src={agent.logoPath}
                      alt=""
                      aria-hidden="true"
                      className="size-[0.62em] rounded-[0.08em] object-contain"
                    />
                  </span>
                  <span>{agent.name}</span>
                </span>{' '}
                a safe way into your website.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => startLogin()}
              data-umami-event="landing_cta_clicked"
              data-umami-event-cta-variant="agent_detail_get_started"
              data-umami-event-landing-variant={agent.slug}
              className="relative mt-8 inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#DCF986] px-6 py-3 text-sm font-semibold text-neutral-950 transition-all hover:-translate-y-0.5 hover:bg-[#d1f36f] lg:ml-10 lg:mt-0"
            >
              Add GitCMS
              <ArrowRight className="size-4" />
            </button>
          </div>
        </section>
    </div>
  )
}

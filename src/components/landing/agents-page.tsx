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
} from 'lucide-react'
import type { AiProvider } from '@/lib/ai-providers'
import { AI_PROVIDERS } from '@/lib/ai-providers'
import type { AgentFamily } from '@/lib/agent-data'
import {
  AGENT_FAMILY_DESCRIPTIONS,
  AGENT_FAMILY_LABELS,
  directoryAgentList,
} from '@/lib/agent-data'
import { DemoVideoEmbed } from './demo-video'
import { StillDecidingSection } from './still-deciding-section'
import { MCP_CONNECTOR_URL, McpEditorMockup } from './mcp-shared'

const AGENT_FAMILY_ORDER: ReadonlyArray<AgentFamily> = [
  'assistant',
  'personal',
]

const WORKFLOW_STEPS = [
  {
    number: '01',
    title: 'An agent proposes',
    description:
      'Research, drafts, and page changes arrive as one visible content task.',
    icon: Send,
  },
  {
    number: '02',
    title: 'People review',
    description:
      'Your team edits the work, leaves feedback, and decides when it is ready.',
    icon: Eye,
  },
  {
    number: '03',
    title: 'GitCMS publishes',
    description:
      'Approved changes move to the website while your repository stays the source of truth.',
    icon: CircleCheck,
  },
] as const

function AgentControlPlaneVisual() {
  return (
    <div className="agents-hero-reveal relative mx-auto w-full max-w-2xl">
      <p className="text-center font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-500 sm:text-xs">
        Your agents, one governed path
      </p>

      <div className="mt-7 grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-6 sm:gap-4">
        {directoryAgentList.map((agent) => (
          <Link
            key={agent.name}
            to="/agents/$agent"
            params={{ agent: agent.slug }}
            className="group min-w-0"
          >
            <div className="flex flex-col items-center text-center">
              <div className="flex size-12 items-center justify-center rounded-2xl border border-white/90 bg-white shadow-sm shadow-violet-950/10 transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:size-16">
                <img
                  src={agent.logoPath}
                  alt=""
                  aria-hidden="true"
                  className="size-6 object-contain sm:size-8"
                />
              </div>
              <span className="mt-2 truncate text-[10px] font-semibold text-neutral-800 sm:text-xs">
                {agent.name}
              </span>
              <span
                className={`mt-1 hidden text-[9px] font-medium uppercase tracking-wide sm:block ${
                  agent.family === 'assistant'
                    ? 'text-violet-700'
                    : 'text-neutral-500'
                }`}
              >
                {AGENT_FAMILY_LABELS[agent.family]}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="agents-connector-reveal mx-auto mt-5 h-10 w-px bg-gradient-to-b from-violet-400/20 to-violet-500 sm:h-14" />

      <div className="agents-task-reveal relative mx-auto max-w-lg overflow-hidden rounded-2xl border border-neutral-800 bg-[#0a0a0a] text-white shadow-2xl shadow-violet-950/20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#DCF986] to-transparent" />
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
          <div>
            <p className="text-sm font-semibold">Homepage launch copy</p>
            <p className="mt-0.5 text-xs text-white/40">
              One shared content task
            </p>
          </div>
          <span className="rounded-full border border-violet-300/20 bg-violet-300/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-violet-200">
            In review
          </span>
        </div>

        <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-5 px-5 py-5 sm:px-6">
          <span className="flex size-8 items-center justify-center rounded-full bg-violet-400/10 text-violet-300">
            <FileText className="size-4" />
          </span>
          <div>
            <p className="text-sm font-medium">Agent proposed a new draft</p>
            <p className="mt-1 text-xs leading-relaxed text-white/40">
              The copy and page changes are ready to inspect.
            </p>
          </div>
          <span className="flex size-8 items-center justify-center rounded-full bg-[#DCF986]/10 text-[#DCF986]">
            <ShieldCheck className="size-4" />
          </span>
          <div>
            <p className="text-sm font-medium">Waiting for your team</p>
            <p className="mt-1 text-xs leading-relaxed text-white/40">
              Feedback, approval, and publishing stay in human hands.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.03] px-5 py-4 sm:px-6">
          <span className="text-xs font-medium text-white/45">
            Draft → Review
          </span>
          <span className="rounded-lg bg-[#DCF986] px-3 py-2 text-xs font-semibold text-neutral-950">
            Publish when approved
          </span>
        </div>
      </div>
    </div>
  )
}

export function AgentsPage() {
  const [selectedProviderId, setSelectedProviderId] =
    React.useState<AiProvider['id']>('chatgpt')
  const [isConnectorCopied, setIsConnectorCopied] = React.useState(false)
  const copyResetTimeoutRef = React.useRef<number | null>(null)

  const selectedProvider =
    AI_PROVIDERS.find((provider) => provider.id === selectedProviderId) ??
    AI_PROVIDERS[0] ??
    null

  const clearCopyResetTimeout = React.useCallback(() => {
    if (copyResetTimeoutRef.current === null) {
      return
    }

    window.clearTimeout(copyResetTimeoutRef.current)
    copyResetTimeoutRef.current = null
  }, [])

  const handleCopyConnectorUrl = React.useCallback(() => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return
    }

    void navigator.clipboard.writeText(MCP_CONNECTOR_URL).then(() => {
      clearCopyResetTimeout()
      setIsConnectorCopied(true)

      copyResetTimeoutRef.current = window.setTimeout(() => {
        setIsConnectorCopied(false)
        copyResetTimeoutRef.current = null
      }, 1800)
    })
  }, [clearCopyResetTimeout])

  React.useEffect(() => {
    setIsConnectorCopied(false)
  }, [selectedProviderId])

  React.useEffect(() => {
    return () => {
      clearCopyResetTimeout()
    }
  }, [clearCopyResetTimeout])

  if (!selectedProvider) {
    return null
  }

  return (
    <>
      <section className="relative grid min-h-[calc(100svh-73px)] overflow-hidden border-b border-neutral-200 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative flex items-center bg-white px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
          <div className="agents-hero-reveal mx-auto w-full max-w-xl">
            <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
              Agent control plane
            </p>
            <h1 className="mt-5 font-logo text-4xl font-normal leading-[1.06] tracking-tight text-neutral-950 sm:text-5xl md:text-[58px]">
              Give every agent a safe way to work on your website.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-600 sm:text-lg">
              Connect the AI tools you already use to research, draft, and
              propose changes. GitCMS gives every change the same review and
              publishing rules.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#setup"
                data-umami-event="landing_cta_clicked"
                data-umami-event-cta-variant="connect_agent"
                data-umami-event-cta-target="#setup"
                data-umami-event-landing-variant="agents"
                className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-neutral-800"
              >
                Connect an agent
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#workflow"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-700 transition-all hover:-translate-y-0.5 hover:border-neutral-400 hover:text-neutral-950"
              >
                See the workflow
                <ArrowDown className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[720px] items-center overflow-hidden bg-gradient-to-br from-violet-100/80 via-white to-[#f3fadf] px-5 py-16 sm:px-10 lg:min-h-0 lg:border-l lg:border-neutral-200 lg:px-12">
          <div className="pointer-events-none absolute -right-24 -top-20 size-80 rounded-full bg-violet-300/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-16 size-80 rounded-full bg-[#DCF986]/35 blur-3xl" />
          <div className="relative z-10 w-full">
            <AgentControlPlaneVisual />
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200 px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
            Agents by type
          </p>
          <h2 className="mt-4 max-w-3xl font-logo text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl">
            The assistant your team chats with, and the agent that works while
            you sleep.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {AGENT_FAMILY_ORDER.map((family) => (
              <div
                key={family}
                className="flex flex-col rounded-2xl border border-neutral-200 bg-neutral-50/60 p-6"
              >
                <h3 className="font-logo text-2xl font-medium tracking-tight">
                  {AGENT_FAMILY_LABELS[family]}s
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">
                  {AGENT_FAMILY_DESCRIPTIONS[family]}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {directoryAgentList
                    .filter((agent) => agent.family === family)
                    .map((agent) => (
                      <Link
                        key={agent.slug}
                        to="/agents/$agent"
                        params={{ agent: agent.slug }}
                        className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-950"
                      >
                        <img
                          src={agent.logoPath}
                          alt=""
                          aria-hidden="true"
                          className="size-4 rounded object-contain"
                        />
                        {agent.name}
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="workflow"
        className="scroll-mt-6 bg-[#0a0a0a] px-6 py-20 text-white sm:px-10 sm:py-28 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-violet-300/70">
                One shared workflow
              </p>
              <h2 className="mt-4 max-w-lg font-logo text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Agents propose.
                <br />
                People approve.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
              The agent can change, but the path to your website does not. Every
              draft remains visible, reviewable, and attached to the content
              task until your team decides to publish it.
            </p>
          </div>

          <div className="mt-14 grid border-y border-white/10 md:grid-cols-3 md:divide-x md:divide-white/10">
            {WORKFLOW_STEPS.map((step) => {
              const Icon = step.icon

              return (
                <div
                  key={step.number}
                  className="group flex gap-5 border-b border-white/10 py-8 last:border-b-0 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-violet-300 transition-colors group-hover:border-[#DCF986]/30 group-hover:text-[#DCF986]">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] font-medium tracking-[0.2em] text-white/30">
                      {step.number}
                    </p>
                    <h3 className="mt-2 font-logo text-2xl font-medium">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-20">
            <div>
              <p className="font-logo text-2xl font-medium leading-snug sm:text-3xl">
                Watch one task move from conversation to a reviewable draft.
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-500">
                The agent works inside GitCMS instead of handing you an isolated
                block of copy to move around later.
              </p>
            </div>
            <DemoVideoEmbed
              title="Watch the GitCMS agent workflow demo"
              className="border-white/10 bg-neutral-950 shadow-black/50"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-white px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="flex items-center justify-center">
            <McpEditorMockup />
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-neutral-400">
              Built-in guardrails
            </p>
            <h2 className="mt-4 max-w-xl font-logo text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Let agents do the work. Keep your team in control.
            </h2>

            <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
              <div className="py-6">
                <h3 className="text-sm font-semibold text-neutral-950">
                  The task carries the context
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600">
                  Notes, drafts, feedback, and status stay together, so every
                  agent and person works from the same editorial brief.
                </p>
              </div>
              <div className="py-6">
                <h3 className="text-sm font-semibold text-neutral-950">
                  Your site defines the rules
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600">
                  <Link
                    to="/docs/$"
                    params={{ _splat: 'getting-started/configuration' }}
                    className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900"
                  >
                    <code>.gitcms</code>
                  </Link>{' '}
                  defines collections and fields, while{' '}
                  <Link
                    to="/docs/$"
                    params={{ _splat: 'ai-mcp/content-instructions' }}
                    className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900"
                  >
                    <code>CONTENT.md</code>
                  </Link>{' '}
                  gives agents the writing guidance for this website.
                </p>
              </div>
              <div className="py-6">
                <h3 className="text-sm font-semibold text-neutral-950">
                  Publishing remains a human decision
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600">
                  Agents prepare the work. Your reviewers decide what is ready,
                  and Git remains the content source of truth underneath it all.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="setup"
        className="scroll-mt-6 bg-gradient-to-br from-violet-50 via-white to-[#f7faed] px-6 py-20 sm:px-10 sm:py-28 lg:px-16"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-violet-700/70">
              Connect your agent
            </p>
            <h2 className="mt-4 font-logo text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">
              Start with a tested setup.
            </h2>
          </div>

          <div className="mt-10 inline-flex rounded-full border border-neutral-200 bg-white/80 p-1 shadow-sm">
            {AI_PROVIDERS.map((provider) => (
              <button
                key={provider.id}
                type="button"
                onClick={() => setSelectedProviderId(provider.id)}
                aria-pressed={selectedProviderId === provider.id}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedProviderId === provider.id
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <img
                  src={provider.logoPath}
                  alt=""
                  aria-hidden="true"
                  className="size-4 rounded-[4px] border border-black/10 bg-white p-0.5 object-contain"
                />
                {provider.name}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-20">
            <div>
              {selectedProvider.steps.map((step, index) => {
                const showUrl = step.toLowerCase().includes('paste')
                const isLast = index === selectedProvider.steps.length - 1

                return (
                  <div
                    key={step}
                    className="relative flex gap-5 pb-9 last:pb-0"
                  >
                    {!isLast ? (
                      <div className="absolute bottom-0 left-5 top-11 w-px bg-violet-200" />
                    ) : null}

                    <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-violet-200 bg-white shadow-sm">
                      <span className="font-mono text-xs font-semibold text-violet-700">
                        {index + 1}
                      </span>
                    </div>

                    <div className="min-w-0 pt-2">
                      <p className="text-base font-medium leading-snug text-neutral-900">
                        {step}
                      </p>
                      {showUrl ? (
                        <div className="mt-3 flex items-stretch gap-2">
                          <code className="flex h-10 min-w-0 flex-1 items-center truncate rounded-lg border border-neutral-200 bg-white px-3 text-xs font-medium text-neutral-700 shadow-sm sm:text-sm">
                            {MCP_CONNECTOR_URL}
                          </code>
                          <button
                            type="button"
                            onClick={handleCopyConnectorUrl}
                            className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-700 shadow-sm transition-colors hover:border-neutral-300 hover:bg-neutral-50"
                            aria-label={
                              isConnectorCopied ? 'Copied URL' : 'Copy URL'
                            }
                            title={isConnectorCopied ? 'Copied' : 'Copy URL'}
                          >
                            {isConnectorCopied ? (
                              <Check className="size-4 text-green-600" />
                            ) : (
                              <Copy className="size-4" />
                            )}
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="lg:sticky lg:top-8 lg:self-start">
              <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-950 shadow-2xl shadow-violet-950/10">
                <video
                  key={selectedProvider.id}
                  src={selectedProvider.videoSrc}
                  autoPlay
                  controls
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="aspect-video w-full bg-neutral-950"
                >
                  {selectedProvider.name} setup walkthrough
                </video>
              </div>
              <div className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-neutral-500">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-violet-600" />
                <p>
                  MCP requires a licensed GitCMS site. Preview mode does not
                  unlock the connector.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StillDecidingSection landingVariant="agents" />
    </>
  )
}

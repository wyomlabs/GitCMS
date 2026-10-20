import * as React from 'react'
import { Check, Copy } from 'lucide-react'
import { getAgenticOnboardingPrompt } from './agentic-onboarding-prompt'

const agentLogos = [
  {
    label: 'Claude Code',
    logoPath: '/ai-logos/claude-orange.svg',
  },
  {
    label: 'Codex',
    logoPath: '/ai-logos/openai-bw.svg',
  },
  {
    label: 'Gemini CLI',
    logoPath: '/ai-logos/gemini.svg',
  },
  {
    label: 'Cursor',
    logoPath: '/ai-logos/cursor.svg',
  },
  {
    label: 'Windsurf',
    logoPath: '/ai-logos/windsurf.svg',
  },
  {
    label: 'Bolt',
    logoPath: '/ai-logos/bolt.svg',
  },
  {
    label: 'Lovable',
    logoPath: '/ai-logos/lovable.svg',
  },
  {
    label: 'v0',
    logoPath: '/ai-logos/v0.svg',
  },
  {
    label: 'Replit',
    logoPath: '/ai-logos/replit.svg',
  },
  {
    label: 'OpenCode',
    logoPath: '/ai-logos/opencode.svg',
  },
]

const marqueeAgentLogos = [
  ...agentLogos.map((agent) => ({ ...agent, marqueeCopy: 'primary' })),
  ...agentLogos.map((agent) => ({ ...agent, marqueeCopy: 'duplicate' })),
]

export function AgenticOnboardingSection({
  frameworkName,
}: {
  frameworkName?: string
}) {
  const [isCopied, setIsCopied] = React.useState(false)
  const copyResetTimeoutRef = React.useRef<number | null>(null)
  const prompt = React.useMemo(
    () => getAgenticOnboardingPrompt(frameworkName),
    [frameworkName],
  )
  const promptPreviewSite = frameworkName
    ? `${frameworkName} site`
    : 'markdown site'

  const clearCopyResetTimeout = React.useCallback(() => {
    if (copyResetTimeoutRef.current === null) return
    window.clearTimeout(copyResetTimeoutRef.current)
    copyResetTimeoutRef.current = null
  }, [])

  const handleCopyPrompt = React.useCallback(() => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return

    void navigator.clipboard.writeText(prompt).then(() => {
      clearCopyResetTimeout()
      setIsCopied(true)
      copyResetTimeoutRef.current = window.setTimeout(() => {
        setIsCopied(false)
        copyResetTimeoutRef.current = null
      }, 1800)
    })
  }, [clearCopyResetTimeout, prompt])

  React.useEffect(() => {
    return () => clearCopyResetTimeout()
  }, [clearCopyResetTimeout])

  return (
    <section className="px-6 pb-24 sm:pb-32 lg:pb-40">
      <div className="mx-auto max-w-3xl pt-10 text-center sm:pt-12">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
          Agentic onboarding
        </p>
        <h2 className="mt-4 font-logo text-3xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
          One command. Zero config.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-neutral-500">
          Paste a prompt into your coding agent. It runs the CLI, detects your
          content structure, and writes the config. You just approve.
        </p>

        <div className="mt-10 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-950 text-left shadow-lg">
          {/* Terminal chrome */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
            </div>
            <button
              type="button"
              onClick={handleCopyPrompt}
              aria-label="Copy agent prompt"
              data-umami-event="landing_agentic_onboarding_clicked"
              data-umami-event-action="copy_prompt_panel"
              className="inline-flex items-center gap-1.5 rounded-md bg-[#DCF986] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-900 transition-colors hover:bg-[#d1f36f]"
            >
              {isCopied ? <Check className="size-3" /> : <Copy className="size-3" />}
              {isCopied ? 'copied' : 'copy prompt'}
            </button>
          </div>

          <div className="p-5 sm:p-6">
            <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed sm:text-sm">
              <code>
                <span className="text-neutral-500">$</span>{' '}
                <span className="text-[#DCF986]">npx</span>{' '}
                <span className="text-white">create-gitcms@latest --yes --dry-run</span>
                {'\n\n'}
                <span className="text-neutral-500">
                  {`  Detecting framework...      Astro
  Scanning content dirs...     content/blog, content/docs
  Inferring frontmatter...     yaml
  Resolving site URL...        ${promptPreviewSite}`}
                </span>
                {'\n\n'}
                <span className="text-neutral-400">{'  '}Config ready to write:</span>
                {'\n'}
                <span className="text-[#DCF986]">{'  '}✓</span>{' '}
                <span className="text-neutral-300">.gitcms/sites.jsonc</span>
                {'\n'}
                <span className="text-[#DCF986]">{'  '}✓</span>{' '}
                <span className="text-neutral-300">.gitcms/sites/main/config.jsonc</span>
                {'\n'}
                <span className="text-[#DCF986]">{'  '}✓</span>{' '}
                <span className="text-neutral-300">CONTENT.md</span>
              </code>
            </pre>
          </div>
        </div>

        {/* Agent logo marquee */}
        <div className="mt-10 flex flex-col items-center gap-6">
          <span className="text-sm text-neutral-400">Works with</span>
          <div className="w-full overflow-hidden">
            <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
              {marqueeAgentLogos.map((agent) => (
                <div
                  key={`${agent.label}-${agent.marqueeCopy}`}
                  className="flex items-center gap-2.5"
                >
                  <img
                    src={agent.logoPath}
                    alt=""
                    aria-hidden="true"
                    className="size-6 object-contain"
                  />
                  <span className="text-base font-medium text-neutral-600">
                    {agent.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

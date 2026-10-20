import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type AskProvider = {
  id: 'chatgpt' | 'gemini' | 'claude' | 'perplexity'
  label: string
  logoPath: string
  logoClassName?: string
}

const askProviders: AskProvider[] = [
  {
    id: 'chatgpt',
    label: 'Ask ChatGPT',
    logoPath: '/ai-logos/openai-bw.svg',
    logoClassName: 'invert',
  },
  {
    id: 'claude',
    label: 'Ask Claude',
    logoPath: '/ai-logos/claude-orange.svg',
  },
  {
    id: 'gemini',
    label: 'Ask Gemini',
    logoPath: '/ai-logos/gemini.svg',
  },
  {
    id: 'perplexity',
    label: 'Ask Perplexity',
    logoPath: '/ai-logos/perplexity.svg',
  },
]

const getAskPrompt = (frameworkName?: string) => {
  if (frameworkName) {
    return `I have a ${frameworkName} site in a Git repository, built with code or an AI coding agent. I'm considering GitCMS (gitcms.dev) so my team, clients, and AI agents can edit, review, and publish changes without touching the code. How does it compare to TinaCMS, CloudCannon, Decap CMS, and a headless CMS like Sanity?`
  }

  return 'My website was built with code or an AI coding agent like Claude Code and lives in a Git repository. How does GitCMS (gitcms.dev) compare to WordPress, Webflow, CloudCannon, and TinaCMS for letting my team, clients, and AI agents edit, review, and publish changes safely?'
}

const getProviderHref = (providerId: AskProvider['id'], prompt: string) => {
  const query = encodeURIComponent(prompt)

  if (providerId === 'chatgpt') {
    return `https://chatgpt.com/?q=${query}`
  }

  if (providerId === 'gemini') {
    return `https://www.google.com/search?q=${query}`
  }

  if (providerId === 'claude') {
    return `https://claude.ai/new?q=${query}`
  }

  return `https://perplexity.ai/?q=${query}`
}

type StillDecidingSectionProps = {
  frameworkName?: string
  landingVariant: string
}

export function StillDecidingSection({
  frameworkName,
  landingVariant,
}: StillDecidingSectionProps) {
  const prompt = getAskPrompt(frameworkName)

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-2xl bg-[#0a0a0a] text-white sm:rounded-3xl lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-center px-8 py-10 sm:px-14 sm:py-16 lg:min-h-72 lg:px-16">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
            Need a second opinion?
          </p>
          <h2 className="mt-4 font-logo text-3xl font-semibold leading-tight tracking-tight text-[#DCF986] sm:text-4xl md:text-5xl">
            Still deciding?
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-neutral-400 sm:text-lg">
            Ask your favorite AI about GitCMS, or talk to the founder.
          </p>
        </div>

        <div className="flex items-center border-t border-white/10 px-4 py-4 sm:px-6 sm:py-6 lg:border-t-0">
          <div className="grid w-full gap-3 sm:grid-cols-2">
            {askProviders.map((provider) => (
              <a
                key={provider.id}
                href={getProviderHref(provider.id, prompt)}
                target="_blank"
                rel="noreferrer"
                data-umami-event="landing_ai_decision_clicked"
                data-umami-event-provider={provider.id}
                data-umami-event-landing-variant={landingVariant}
                className="group flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-[#DCF986]/60 hover:bg-[#DCF986]/10 sm:px-5 sm:py-4"
              >
                <span className="flex items-center gap-3">
                  <img
                    src={provider.logoPath}
                    alt=""
                    aria-hidden="true"
                    className={cn('size-5 object-contain', provider.logoClassName)}
                  />
                  <span className="font-mono text-sm font-medium uppercase tracking-wide text-neutral-200">
                    {provider.label}
                  </span>
                </span>
                <ArrowUpRight className="size-4 text-neutral-500 transition-colors group-hover:text-[#DCF986]" />
              </a>
            ))}

            <a
              href="mailto:waishnav@gitcms.dev?subject=Question%20about%20GitCMS"
              data-umami-event="landing_ai_decision_clicked"
              data-umami-event-provider="human"
              data-umami-event-landing-variant={landingVariant}
              className="group col-span-full flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-[#DCF986]/60 hover:bg-[#DCF986]/10 sm:px-5 sm:py-4"
            >
              <span className="flex items-center gap-3">
                <span className="flex size-5 items-center justify-center rounded-full border border-[#DCF986]/70 text-[10px] font-semibold text-[#DCF986]">
                  H
                </span>
                <span className="font-mono text-sm font-medium uppercase tracking-wide text-neutral-200">
                  Talk with a founder
                </span>
              </span>
              <ArrowUpRight className="size-4 text-neutral-500 transition-colors group-hover:text-[#DCF986]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

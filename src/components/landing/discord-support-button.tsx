import { DiscordIcon } from '@/components/icons/discord-icon'
import { DISCORD_INVITE_URL } from '@/lib/support-links'

/**
 * Support entry point pinned to the bottom right of public pages. Discord is
 * the support channel, so visitors can reach a person from anywhere. Below
 * `sm` it shrinks to the icon so it never covers the hero's scroll cue.
 */
export function DiscordSupportButton() {
  return (
    <a
      href={DISCORD_INVITE_URL}
      aria-label="Discord Support"
      target="_blank"
      rel="noopener noreferrer"
      data-umami-event="discord_support_clicked"
      className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2.5 rounded-full border border-neutral-200 bg-white p-3.5 text-sm sm:px-5 sm:py-3 font-semibold text-neutral-900 shadow-lg shadow-neutral-900/10 transition-all hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-xl sm:bottom-6 sm:right-6 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <DiscordIcon className="size-5" />
      <span className="hidden sm:inline">Discord Support</span>
    </a>
  )
}

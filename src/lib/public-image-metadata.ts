export type PublicImageMetadata = { width: number; height: number }

export const publicImageMetadata = {
  '/images/blog/content-is-just-code/ai-workflow.webp': { width: 1672, height: 941 },
  '/images/blog/content-is-just-code/day-zero-pipeline.webp': { width: 1672, height: 941 },
  '/images/blog/content-is-just-code/two-models.webp': { width: 1672, height: 941 },
  '/images/blog/git-based-cms-vs-headless-cms/ai-agent-compatibility.webp': { width: 1672, height: 941 },
  '/images/blog/git-based-cms-vs-headless-cms/architecture-comparison.webp': { width: 1672, height: 941 },
  '/images/blog/git-based-cms-vs-headless-cms/workflow-comparison.webp': { width: 2752, height: 1536 },
  '/images/docs/screenshots/branch-switcher.webp': { width: 1208, height: 402 },
  '/images/docs/screenshots/cli-onboarding-monorepo.webp': { width: 823, height: 857 },
  '/images/docs/screenshots/cli-onboarding-single.webp': { width: 872, height: 774 },
  '/images/docs/screenshots/collection-settings.webp': { width: 1058, height: 927 },
  '/images/docs/screenshots/connect-repository.webp': { width: 1807, height: 1015 },
  '/images/docs/screenshots/content-board.webp': { width: 1801, height: 1009 },
  '/images/docs/screenshots/editor-inside-chatgpt.webp': { width: 1783, height: 1006 },
  '/images/docs/screenshots/editor-inside-claude.webp': { width: 1798, height: 1005 },
  '/images/docs/screenshots/fields-in-editor.webp': { width: 1070, height: 434 },
  '/images/docs/screenshots/i18n-settings.webp': { width: 1165, height: 365 },
  '/images/docs/screenshots/locale-switcher.webp': { width: 1208, height: 436 },
  '/images/docs/screenshots/site-settings-full.webp': { width: 1804, height: 2448 },
  '/images/docs/screenshots/site-settings.webp': { width: 1804, height: 1012 },
  '/images/founder-waishnav.jpg': { width: 400, height: 400 },
  '/images/landing/users/bhavik.jpg': { width: 392, height: 392 },
  '/images/landing/users/bishakh.jpg': { width: 400, height: 400 },
  '/images/landing/users/chinmay.jpg': { width: 369, height: 369 },
  '/images/landing/users/nicole-jeanette.webp': { width: 491, height: 491 },
  '/images/video-posters/docs/draft-recovery-trimmed.webp': { width: 1280, height: 720 },
  '/images/video-posters/docs/editor-writing-speedrun-v2-trimmed.webp': { width: 1280, height: 720 },
  '/images/video-posters/docs/editor-writing-speedrun-v4-10x.webp': { width: 1280, height: 720 },
  '/images/video-posters/docs/editorial-workflow-board-trimmed.webp': { width: 1280, height: 720 },
  '/images/video-posters/docs/internal-link-suggestions-trimmed.webp': { width: 1280, height: 720 },
  '/images/video-posters/docs/live-url-matching-trimmed.webp': { width: 1280, height: 720 },
  '/images/video-posters/docs/quick-start-speedrun-trimmed.webp': { width: 1280, height: 720 },
  '/images/video-posters/docs/site-settings-walkthrough-trimmed.webp': { width: 1280, height: 720 },
  '/images/video-posters/guides/chatgpt-setup.webp': { width: 1280, height: 720 },
  '/images/video-posters/guides/claude-setup.webp': { width: 1280, height: 720 },
} as const satisfies Record<string, PublicImageMetadata>

type PublicImagePath = keyof typeof publicImageMetadata

export function getPublicImageMetadata(src: string) {
  if (!Object.hasOwn(publicImageMetadata, src)) return undefined
  // SAFETY: Object.hasOwn above proves src is a key in publicImageMetadata.
  return publicImageMetadata[src as PublicImagePath]
}

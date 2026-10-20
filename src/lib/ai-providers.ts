export interface AiProvider {
  id: 'chatgpt' | 'claude'
  name: string
  logoPath: string
  description: string
  steps: Array<string>
  videoSrc?: string
}

export const AI_PROVIDERS: Array<AiProvider> = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    logoPath: '/ai-logos/openai-bw.svg',
    description: 'Follow these steps to connect GitCMS in ChatGPT.',
    videoSrc: '/videos/guides/chatgpt-setup.mp4',
    steps: [
      'Open ChatGPT Settings and turn on Developer Mode.',
      'Go to Settings > Apps and click Create.',
      'Paste following GitCMS connector URL.',
      'Click Connect, sign in with GitHub, and allow access.',
      'Start a chat and choose GitCMS from your tools.',
    ],
  },
  {
    id: 'claude',
    name: 'Claude',
    logoPath: '/ai-logos/claude-color.png',
    description: 'Follow these steps to connect GitCMS in Claude.',
    videoSrc: '/videos/guides/claude-setup.mp4',
    steps: [
      'Open Claude Settings > Connectors and click Add custom connector.',
      'Paste following GitCMS connector URL.',
      'Click Add, then Connect, and sign in with GitHub.',
      'Start a chat and pick GitCMS under Connectors.',
    ],
  },
]

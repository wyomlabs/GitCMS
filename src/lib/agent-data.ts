/**
 * Agents with a page under /agents. Each family connects differently:
 * - assistant: chat assistants with a guided OAuth connector (ChatGPT, Claude)
 * - coding: coding agents that build the site and connect over OAuth MCP
 * - personal: general-purpose agents that connect with a personal access token
 */
export type AgentFamily = 'assistant' | 'coding' | 'personal'

export type AgentSupport = 'guided' | 'self-managed'

export type AgentSetupStep = {
  title: string
  body: string
  code?: string
  /** Show the copyable connector URL under this step. */
  showConnector?: boolean
}

export type AgentPrompt = {
  title: string
  prompt: string
}

export type AgentFaq = {
  question: string
  answer: string
}

export type AgentInfo = {
  slug: string
  name: string
  logoPath: string
  accentColor: string
  family: AgentFamily
  support: AgentSupport
  heroTitle: string
  description: string
  whatIs: string
  whyGitcms: string
  setupSteps: ReadonlyArray<AgentSetupStep>
  prompts: ReadonlyArray<AgentPrompt>
  faqs: ReadonlyArray<AgentFaq>
  guidedProviderId?: 'chatgpt' | 'claude'
  compatibilityNote?: string
}

export const AGENT_FAMILY_LABELS: Record<AgentFamily, string> = {
  assistant: 'AI assistant',
  coding: 'Coding agent',
  personal: 'Personal agent',
}

export const AGENT_FAMILY_DESCRIPTIONS: Record<AgentFamily, string> = {
  assistant:
    'Chat assistants your team already uses. Draft and edit website content in conversation, with the GitCMS editor inside the chat.',
  coding:
    'The agents that build code-first sites. Set up GitCMS on the repository, then draft content changes through the same review flow.',
  personal:
    'General-purpose agents that run tasks across your tools. Give them scoped access to website content instead of your repository.',
}

const TOKEN_STEPS = (name: string): ReadonlyArray<AgentSetupStep> => [
  {
    title: 'Create a GitCMS token',
    body: 'In GitCMS, open Account Settings → MCP Tokens. Create a token with Read and write access so the agent can draft and submit content for review. Copy it right away; it is shown once.',
  },
  {
    title: `Add GitCMS as a remote MCP server in ${name}`,
    body: `In ${name}’s MCP or tools settings, add a remote (HTTP) server with the GitCMS connector URL, and send the token as a bearer token. The field may be called Authorization header, API token, or Static token.`,
    code: 'Authorization: Bearer <your-gitcms-token>',
    showConnector: true,
  },
  {
    title: 'Check the connection',
    body: `Ask ${name} to list your GitCMS sites. If it can, the connection works. On a site that uses review before publish, try a small change in a content task and submit it for review; on a direct-publish site, saves go straight to the live branch, so start with a read-only request.`,
  },
]

const SHARED_FAQS: ReadonlyArray<AgentFaq> = [
  {
    question: 'Can the agent publish to my live site?',
    answer:
      'Not on sites that use review before publish. Agents can create content tasks, draft, edit, and submit for review; publishing is a human action in GitCMS. Sites that use direct publish commit saves straight to the default branch, for agents too.',
  },
  {
    question: 'Does the agent get access to my repository?',
    answer:
      'No. The agent works through GitCMS’s content tools with the scopes you grant. It never receives your Git credentials.',
  },
  {
    question: 'Do I need a paid GitCMS plan?',
    answer:
      'Agent access through MCP requires a licensed site. In preview mode you can explore the site in the web app, but MCP stays locked.',
  },
]

const PERSONAL_FAQS = (name: string): ReadonlyArray<AgentFaq> => [
  {
    question: `Why use a token instead of signing in?`,
    answer: `Personal agents often run in the background or on a server, where a browser sign-in isn't practical. A personal access token gives ${name} scoped access you can revoke at any time from Account Settings → MCP Tokens.`,
  },
  {
    question: `${name} says "Not authenticated". What should I check?`,
    answer:
      'Make sure the token is sent as "Authorization: Bearer <token>", that it was copied completely (it starts with gitcms_pat_), and that it hasn’t expired or been revoked.',
  },
  {
    question: 'Should I give the agent write access?',
    answer:
      'Use Read if the agent only needs to look at content, for example to audit or summarize it. Use Read and write when it should draft, edit, or submit changes for review.',
  },
]

export const agentList: ReadonlyArray<AgentInfo> = [
  {
    slug: 'chatgpt',
    name: 'ChatGPT',
    logoPath: '/ai-logos/openai-bw.svg',
    accentColor: '#7C3AED',
    family: 'assistant',
    support: 'guided',
    guidedProviderId: 'chatgpt',
    heroTitle: 'Let ChatGPT update your website. You decide what goes live.',
    description:
      'Connect GitCMS to ChatGPT and draft website changes in conversation, with the GitCMS editor inside the chat and a review step before anything is published.',
    whatIs:
      'ChatGPT is OpenAI’s AI assistant. With developer mode turned on, it can connect to apps built on the Model Context Protocol (MCP), so it can use tools from products like GitCMS inside a conversation.',
    whyGitcms:
      'Most website writing already starts in ChatGPT, and then gets copy-pasted into a CMS. With GitCMS connected, ChatGPT works on your real site: it knows your collections and fields, follows your CONTENT.md voice, and opens the GitCMS editor inside the chat. The result is a draft in a content task your team can review, not a block of text to move around.',
    setupSteps: [
      {
        title: 'Turn on developer mode',
        body: 'Open ChatGPT (web or desktop), go to Settings, and turn on Developer Mode.',
      },
      {
        title: 'Create the GitCMS app',
        body: 'Go to Settings → Apps, click Create, and paste the GitCMS connector URL.',
        showConnector: true,
      },
      {
        title: 'Sign in to GitCMS',
        body: 'Click Connect, sign in to GitCMS with Google or GitHub, and allow access.',
      },
      {
        title: 'Use it in a chat',
        body: 'Start a new chat, choose GitCMS from your tools, and ask it to list your sites.',
      },
    ],
    prompts: [
      {
        title: 'Brainstorm, then draft',
        prompt:
          'Brainstorm three blog posts for our customers about [topic]. Don’t write anything yet. Then create a content task for the strongest idea and draft it in the blog collection.',
      },
      {
        title: 'Edit a live page',
        prompt:
          'Read https://[your-site]/pricing and tighten the intro. Keep the headings and the plan names unchanged. Submit the change for review.',
      },
      {
        title: 'Update a detail everywhere',
        prompt:
          'Find every entry on [site] that mentions [old value], update it to [new value], and put all changes in one content task for review.',
      },
    ],
    faqs: [
      {
        question: 'Which ChatGPT plans can connect GitCMS?',
        answer:
          'Plans that support developer mode and custom apps, such as Plus, Team, and Enterprise. Check OpenAI’s current plan details if the Apps settings don’t appear.',
      },
      {
        question: 'Does GitCMS open inside ChatGPT?',
        answer:
          'Yes. When ChatGPT writes content through GitCMS, the GitCMS visual editor opens in the conversation, so you can review and refine the draft without switching tabs.',
      },
      ...SHARED_FAQS,
    ],
  },
  {
    slug: 'claude',
    name: 'Claude',
    logoPath: '/ai-logos/claude-orange.svg',
    accentColor: '#D97757',
    family: 'assistant',
    support: 'guided',
    guidedProviderId: 'claude',
    heroTitle: 'Turn Claude into a website content teammate.',
    description:
      'Connect GitCMS to Claude so it can draft and edit website content on your real site, inside the same workflow your team reviews and publishes.',
    whatIs:
      'Claude is Anthropic’s AI assistant, available on the web, desktop, and mobile. Custom connectors let Claude use remote MCP servers, so it can work with tools from products like GitCMS during a conversation.',
    whyGitcms:
      'Claude is a strong writer, but a chat window doesn’t know your website. With GitCMS connected, Claude works from your collections, fields, and CONTENT.md writing instructions, opens the GitCMS editor in the conversation, and leaves its work as a reviewable draft instead of copy you paste somewhere else.',
    setupSteps: [
      {
        title: 'Add a custom connector',
        body: 'Open Claude (web or desktop), go to Settings → Connectors, and click Add custom connector.',
      },
      {
        title: 'Paste the GitCMS URL',
        body: 'Paste the GitCMS connector URL and click Add.',
        showConnector: true,
      },
      {
        title: 'Sign in to GitCMS',
        body: 'Click Connect and sign in to GitCMS with Google or GitHub.',
      },
      {
        title: 'Use it in a chat',
        body: 'Start a new chat, pick GitCMS under Connectors, and ask Claude to list your sites.',
      },
    ],
    prompts: [
      {
        title: 'Plan before writing',
        prompt:
          'Help me brainstorm three docs articles for [audience]. Don’t create content yet. Then create a content task for the best one, with the audience, problem, and call to action in the notes.',
      },
      {
        title: 'Draft for review',
        prompt:
          'Draft the first version for that content task in the docs collection, following our CONTENT.md voice. Leave it ready for review.',
      },
      {
        title: 'Rework an existing post',
        prompt:
          'Read https://[your-site]/blog/[post] and make the introduction answer the title’s question in the first 50 words. Submit the change for review.',
      },
    ],
    faqs: [
      {
        question: 'Which Claude plans support custom connectors?',
        answer:
          'Paid plans such as Pro, Team, and Enterprise. If you don’t see Connectors in Settings, check Anthropic’s current plan details.',
      },
      {
        question: 'Is this the same as Claude Code?',
        answer:
          'No. Claude is the chat assistant; Claude Code is Anthropic’s coding agent for your terminal and editor. Both can connect to GitCMS. See the Claude Code page for its setup.',
      },
      ...SHARED_FAQS,
    ],
  },
  {
    slug: 'claude-code',
    name: 'Claude Code',
    logoPath: '/ai-logos/claude-orange.svg',
    accentColor: '#D97757',
    family: 'coding',
    support: 'self-managed',
    heroTitle: 'Built it with Claude Code? Hand it off with GitCMS.',
    description:
      'Use Claude Code to make your site client-editable and set up GitCMS, then connect it over MCP so content changes go through review like everyone else’s.',
    whatIs:
      'Claude Code is Anthropic’s agentic coding tool. It runs in your terminal and editor, reads and edits your codebase, runs commands, and can connect to MCP servers to use external tools.',
    whyGitcms:
      'Claude Code is one of the fastest ways to build a website. But the site it builds has no admin: clients and marketers can’t edit it, and Claude Code’s own content edits land straight in the repo. GitCMS fills that gap. Claude Code sets GitCMS up on the repository, your team edits visually, and when Claude Code works on content through the GitCMS MCP server, its changes become drafts people review.',
    setupSteps: [
      {
        title: 'Make the site client-editable',
        body: 'If copy is hardcoded in components, ask Claude Code to move it into content collections first. Use the “Make a site client-editable” prompt from the prompt library.',
      },
      {
        title: 'Set up GitCMS on the repository',
        body: 'Add the site in GitCMS, choose Set up with your coding agent, and paste the prompt into Claude Code. It runs the setup CLI, writes the .gitcms configuration, and pushes it.',
        code: 'npx create-gitcms@latest --yes',
      },
      {
        title: 'Connect Claude Code to GitCMS',
        body: 'Add the GitCMS MCP server. Use --scope user to make it available in every project.',
        code: 'claude mcp add --transport http --scope user gitcms https://mcp.gitcms.dev',
      },
      {
        title: 'Sign in',
        body: 'Start Claude Code, run /mcp, choose gitcms, and authenticate. Sign in to GitCMS in the browser window that opens.',
        code: '/mcp',
      },
    ],
    prompts: [
      {
        title: 'Changelog from your commits',
        prompt:
          'Read the commits since the last release tag. Using GitCMS, draft a changelog entry for [site] that explains the changes for customers, and submit it for review.',
      },
      {
        title: 'Docs that match the code',
        prompt:
          'I just renamed [API or setting]. Using GitCMS, find every docs entry on [site] that mentions the old name, update them in one content task, and submit it for review.',
      },
      {
        title: 'Hand off a client site',
        prompt:
          'Move every client-editable string on this site into content collections without changing the rendered output. Then run the GitCMS setup and tell me which collections the client will see.',
      },
    ],
    faqs: [
      {
        question: 'Why use GitCMS when Claude Code can edit the files directly?',
        answer:
          'Claude Code can, but then nobody outside engineering reviews content changes, and clients still can’t edit the site. Through GitCMS, content changes become content tasks that marketers or clients review, with the same rules as their own edits. Code changes still go through your normal pull requests.',
      },
      {
        question: 'Can I use it across many client sites?',
        answer:
          'Yes. One GitCMS connection gives Claude Code access to every site you can access in GitCMS, so agencies can work on content across client sites without cloning each repository.',
      },
      ...SHARED_FAQS,
    ],
  },
  {
    slug: 'codex',
    name: 'Codex',
    logoPath: '/ai-logos/openai-bw.svg',
    accentColor: '#10A37F',
    family: 'coding',
    support: 'self-managed',
    heroTitle: 'Ship the site with Codex. Let your team run it with GitCMS.',
    description:
      'Use Codex to prepare your repository and set up GitCMS, then connect Codex over MCP so its content changes arrive as reviewable drafts.',
    whatIs:
      'Codex is OpenAI’s coding agent. It works in your terminal, editor, and the cloud, reads and changes code across a repository, and can use MCP servers for external tools.',
    whyGitcms:
      'Codex makes building and changing a site fast. GitCMS makes it runnable by everyone else. Codex sets up GitCMS on the repo, clients and marketers edit through the GitCMS editor, and when Codex drafts content through GitCMS, it goes through review instead of straight to production.',
    setupSteps: [
      {
        title: 'Make the site client-editable',
        body: 'Ask Codex to move hardcoded copy into content collections without changing the rendered site. See the “Make a site client-editable” prompt.',
      },
      {
        title: 'Set up GitCMS on the repository',
        body: 'Add the site in GitCMS, choose Set up with your coding agent, and paste the prompt into Codex. It runs the setup CLI and pushes the .gitcms configuration.',
        code: 'npx create-gitcms@latest --yes',
      },
      {
        title: 'Connect Codex to GitCMS',
        body: 'Add the GitCMS MCP server, then sign in to GitCMS in the browser.',
        code: 'codex mcp add gitcms --url https://mcp.gitcms.dev\ncodex mcp login gitcms',
      },
      {
        title: 'Check the connection',
        body: 'Start Codex and ask it to list your GitCMS sites.',
      },
    ],
    prompts: [
      {
        title: 'Release post from a pull request',
        prompt:
          'Read the pull request I just merged. Using GitCMS, draft a short blog post for [site] announcing the feature for customers, and submit it for review.',
      },
      {
        title: 'Keep docs in sync',
        prompt:
          'Compare our docs on [site] with the current CLI flags in this repo. Using GitCMS, fix outdated docs entries in one content task and submit it for review.',
      },
      {
        title: 'Prepare a client handoff',
        prompt:
          'Move all client-editable copy into content collections, keep the design identical, then run the GitCMS setup and summarize what the client will be able to edit.',
      },
    ],
    faqs: [
      {
        question: 'Can I configure GitCMS in Codex’s config file instead?',
        answer:
          'Yes. Add an mcp_servers.gitcms entry with url = "https://mcp.gitcms.dev" to your Codex config.toml, then run codex mcp login gitcms to sign in.',
      },
      {
        question: 'Is this the same as connecting ChatGPT?',
        answer:
          'No. ChatGPT connects as an app in the chat, with the GitCMS editor inside the conversation. Codex connects as an MCP server in your coding environment and works through tool calls.',
      },
      ...SHARED_FAQS,
    ],
  },
  {
    slug: 'cursor',
    name: 'Cursor',
    logoPath: '/ai-logos/cursor.svg',
    accentColor: '#111111',
    family: 'coding',
    support: 'self-managed',
    heroTitle: 'Build in Cursor. Give everyone else GitCMS.',
    description:
      'Use Cursor’s agent to make your site client-editable and set up GitCMS, then connect Cursor over MCP so content changes go through review.',
    whatIs:
      'Cursor is an AI code editor. Its agent can plan and make changes across a codebase, run commands, and use MCP servers to work with external tools.',
    whyGitcms:
      'Cursor is where a lot of marketing sites now get built and tweaked. GitCMS is where the people who don’t open Cursor run them. Cursor sets up GitCMS on the repo, your team and clients edit visually, and Cursor’s own content drafts go through the same review flow.',
    setupSteps: [
      {
        title: 'Make the site client-editable',
        body: 'Ask Cursor’s agent to move hardcoded copy into content collections without changing the design. See the “Make a site client-editable” prompt.',
      },
      {
        title: 'Set up GitCMS on the repository',
        body: 'Add the site in GitCMS, choose Set up with your coding agent, and paste the prompt into Cursor’s agent. It runs the setup CLI and pushes the .gitcms configuration.',
        code: 'npx create-gitcms@latest --yes',
      },
      {
        title: 'Add the GitCMS MCP server',
        body: 'In Cursor Settings, open the MCP section and add a new server, or add it to ~/.cursor/mcp.json:',
        code: '{\n  "mcpServers": {\n    "gitcms": { "url": "https://mcp.gitcms.dev" }\n  }\n}',
      },
      {
        title: 'Sign in',
        body: 'Cursor shows that the GitCMS server needs authentication. Click to sign in to GitCMS in your browser, then ask the agent to list your sites.',
      },
    ],
    prompts: [
      {
        title: 'Landing page copy, reviewed',
        prompt:
          'Using GitCMS, rewrite the hero and FAQ copy on the [page] entry of [site] for [audience]. Keep the structure and submit it for review so marketing can approve it.',
      },
      {
        title: 'Content for a new feature',
        prompt:
          'I just built [feature]. Using GitCMS, draft a docs page and a short changelog entry for [site] in one content task and submit it for review.',
      },
      {
        title: 'Make it editable',
        prompt:
          'Move every client-editable string into content collections without changing the rendered pages, then run the GitCMS setup.',
      },
    ],
    faqs: [
      {
        question: 'Should I put the MCP config in the project or my user settings?',
        answer:
          'Use ~/.cursor/mcp.json to make GitCMS available in every project. Use .cursor/mcp.json in a repository to share the setup with your team; each person still signs in with their own GitCMS account.',
      },
      ...SHARED_FAQS,
    ],
  },
  {
    slug: 'openclaw',
    name: 'OpenClaw',
    logoPath: '/ai-logos/openclaw.svg',
    accentColor: '#EF4444',
    family: 'personal',
    support: 'self-managed',
    heroTitle: 'Let OpenClaw keep your website fresh, with review.',
    description:
      'Connect OpenClaw to GitCMS with a scoped token so it can draft website updates in the background while people approve what goes live.',
    whatIs:
      'OpenClaw is an open-source personal AI agent you run yourself. It works across your chat apps and tools, can run tasks on a schedule, and can use MCP servers.',
    whyGitcms:
      'Personal agents are good at the recurring work nobody gets to: weekly updates, refreshing old posts, turning notes into drafts. Giving one write access to your repository is risky. With GitCMS, OpenClaw gets scoped access to content only, drafts inside content tasks, and submits them for review.',
    setupSteps: TOKEN_STEPS('OpenClaw'),
    prompts: [
      {
        title: 'Weekly update',
        prompt:
          'Every Monday, turn my notes from last week into a short update post for [site] using GitCMS. Put it in a content task and submit it for review.',
      },
      {
        title: 'Freshness check',
        prompt:
          'Once a month, use GitCMS to find posts on [site] older than a year with outdated prices or product names, propose fixes in one content task, and submit it for review.',
      },
      {
        title: 'From message to draft',
        prompt:
          'When I send you a customer story, draft a case study in the case studies collection on [site] with GitCMS and submit it for review.',
      },
    ],
    faqs: [...PERSONAL_FAQS('OpenClaw'), ...SHARED_FAQS],
  },
  {
    slug: 'hermes',
    name: 'Hermes',
    logoPath: '/ai-logos/hermes.svg',
    accentColor: '#171717',
    family: 'personal',
    support: 'self-managed',
    heroTitle: 'Give Hermes a governed path to your website.',
    description:
      'Connect Hermes to GitCMS with a scoped token so its website work arrives as reviewable drafts, not loose copy.',
    whatIs:
      'Hermes is an open-source, self-hosted AI agent that runs tasks with tools and can connect to MCP servers.',
    whyGitcms:
      'Hermes can research, draft, and keep going while you’re away. GitCMS gives that work a safe destination: content tasks on your real site, with your collections, fields, and writing instructions, and a person approving each change before it publishes.',
    setupSteps: TOKEN_STEPS('Hermes'),
    prompts: [
      {
        title: 'Research to draft',
        prompt:
          'Research [topic] and draft a blog post for [site] with GitCMS, following the site’s CONTENT.md. Submit it for review with your sources listed in the task notes.',
      },
      {
        title: 'Audit metadata',
        prompt:
          'Using GitCMS, check every entry in the [collection] collection on [site] for missing or weak descriptions, fix them in one content task, and submit it for review.',
      },
      {
        title: 'Translate on request',
        prompt:
          'When I ask, translate the entry I name on [site] into [language] with GitCMS and submit it for review.',
      },
    ],
    faqs: [...PERSONAL_FAQS('Hermes'), ...SHARED_FAQS],
  },
  {
    slug: 'grok-bot',
    name: 'Grok Bot',
    logoPath: '/ai-logos/grok-bot.svg',
    accentColor: '#374151',
    family: 'personal',
    support: 'self-managed',
    heroTitle: 'Bring Grok Bot into your publishing workflow.',
    description:
      'Connect an MCP-capable Grok Bot setup to GitCMS with a scoped token and keep its website suggestions inside a reviewed workflow.',
    whatIs:
      'Grok Bot setups run agents on xAI’s Grok models. When your setup supports remote MCP servers with a bearer token, it can use GitCMS’s content tools.',
    whyGitcms:
      'Grok-based agents are quick at research and timely topics. GitCMS turns those suggestions into content tasks on your site, with context and status attached, and keeps publishing a human decision.',
    setupSteps: TOKEN_STEPS('Grok Bot'),
    prompts: [
      {
        title: 'Timely post',
        prompt:
          'Draft a short post for [site] about [news or trend] and why it matters to our customers. Use GitCMS, put it in a content task, and submit it for review.',
      },
      {
        title: 'Summarize what changed',
        prompt:
          'Using GitCMS, list the content tasks on [site] that are waiting for review and summarize each one in a sentence.',
      },
      {
        title: 'Refresh a page',
        prompt:
          'Read the [page] entry on [site] with GitCMS, update anything that is out of date, and submit the change for review.',
      },
    ],
    faqs: [...PERSONAL_FAQS('Grok Bot'), ...SHARED_FAQS],
  },
  {
    slug: 'muse',
    name: 'Muse',
    logoPath: '/ai-logos/muse.svg',
    accentColor: '#0866FF',
    family: 'personal',
    support: 'self-managed',
    heroTitle: 'Give Muse a governed path to your website.',
    description:
      'Connect a Muse environment that supports MCP to GitCMS so proposed website changes enter a visible review workflow.',
    whatIs:
      'Muse is a personal AI agent. Some Muse environments expose MCP configuration for remote tools; others document custom connectors through APIs and CLIs.',
    compatibilityNote:
      'Consumer Muse currently documents custom connectors through APIs and CLIs, not an arbitrary MCP URL. This GitCMS path applies only to Muse environments that expose MCP configuration.',
    whyGitcms:
      'If your Muse environment supports MCP, GitCMS gives its website work a destination: content tasks on your real site, reviewed by a person before anything is published.',
    setupSteps: TOKEN_STEPS('Muse'),
    prompts: [
      {
        title: 'Draft from notes',
        prompt:
          'Turn these notes into a blog post draft for [site] using GitCMS and submit it for review: [notes]',
      },
      {
        title: 'Check what’s pending',
        prompt:
          'Using GitCMS, tell me which content tasks on [site] are in review and what each one changes.',
      },
      {
        title: 'Small copy fix',
        prompt:
          'On [site], change [old text] to [new text] in the [page] entry using GitCMS and submit it for review.',
      },
    ],
    faqs: [...PERSONAL_FAQS('Muse'), ...SHARED_FAQS],
  },
]

export const agentsBySlug: Readonly<Record<string, AgentInfo>> =
  Object.fromEntries(agentList.map((agent) => [agent.slug, agent]))

export function getAgent(slug: string) {
  return agentsBySlug[slug]
}

/**
 * Agents shown in directories (agent grids, footer, related agents). Coding
 * agents are the Day One build story: their pages stay reachable from setup
 * docs and handoff content, but they aren't listed alongside the Day Two
 * agents that run the website.
 */
export const directoryAgentList = agentList.filter(
  (agent) => agent.family !== 'coding',
)

export function getAgentsByFamily(family: AgentFamily) {
  return agentList.filter((agent) => agent.family === family)
}

export function getAgentLandingTitle(agent: AgentInfo) {
  return `${agent.name} + GitCMS — Connect ${agent.name} to Your Website CMS`
}

export function getAgentLandingDescription(agent: AgentInfo) {
  return `${agent.description} Setup steps, example prompts, and FAQs.`
}

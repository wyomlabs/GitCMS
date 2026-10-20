export type PersonaSlug =
  | 'agencies'
  | 'startups'
  | 'freelancers'
  | 'solo-builders'

export type PersonaPath =
  | '/for-agencies'
  | '/for-startups'
  | '/for-freelancers'
  | '/for-solo-builders'

type PersonaFaq = {
  question: string
  answer: string
}

type PersonaPoint = {
  title: string
  body: string
}

type PersonaLink = {
  label: string
  href: string
}

export type PersonaContent = {
  slug: PersonaSlug
  path: PersonaPath
  name: string
  shortDescription: string
  heroLabel: string
  heroTitle: string
  heroBody: string
  heroSupport: Array<string>
  heroNote: string
  heroVisual: 'editor' | 'workflow' | 'mcp'
  painTitle: string
  pains: Array<PersonaPoint>
  valueTitle: string
  valueBody: string
  valuePoints: Array<string>
  valueVisual: 'editor' | 'workflow' | 'mcp'
  scenarioTitle: string
  scenarioBody: string
  scenarioSteps: Array<PersonaPoint>
  scenarioFooter: string
  relatedLinks: Array<PersonaLink>
  faq: Array<PersonaFaq>
  ctaTitle: string
  ctaBody: string
  seoTitle: string
  seoDescription: string
}

export const personaList = [
  {
    slug: 'startups',
    path: '/for-startups',
    name: 'Startups & Companies',
    shortDescription:
      'Stop turning every website change into an engineering ticket.',
    heroLabel: 'For Startups & Companies',
    heroTitle: 'Your website is code. Your marketing team still needs to change it.',
    heroBody:
      'Your site was built with Claude Code, Codex, Cursor, or your own developers, and it lives in a repository. GitCMS gives marketing, product, and founders one safe place to edit, review, and publish website changes, without filing an engineering ticket or touching Git.',
    heroSupport: [
      'Marketers and writers edit visually; nobody learns branches or pull requests',
      'AI agents draft changes through the same review flow as people',
      'Every published change is a real commit in the repo your engineers already trust',
    ],
    heroNote:
      'Best for teams that chose a code-first website for speed and control, and now need the rest of the company to run it.',
    heroVisual: 'workflow',
    painTitle: 'Why a code-first website slows the rest of the company down',
    pains: [
      {
        title: 'Engineers become the publishing layer',
        body:
          'A pricing tweak, a new case study, or a typo fix waits in the engineering queue because the content lives in the codebase.',
      },
      {
        title: 'AI made changes cheap, not safe',
        body:
          'Anyone can ask an agent to rewrite twenty pages. Without a review step, nobody knows what changed or who approved it.',
      },
      {
        title: 'Moving back to a website builder is a step backwards',
        body:
          'Webflow or WordPress would give marketing an admin panel, but you would give up the performance, ownership, and agent-friendly stack you chose on purpose.',
      },
    ],
    valueTitle: 'Keep the website as code. Give everyone else a CMS.',
    valueBody:
      'GitCMS sits between the repository and everyone who needs to change the site. Git stays the source of truth; the people around it get an editorial workflow they already understand.',
    valuePoints: [
      'Edit pages, posts, docs, and changelogs your site loads from Markdown or MDX',
      'Move work through Ideas, Draft, Review, and Published with clear ownership',
      'Give writers, reviewers, and publishers separate roles',
      'Let ChatGPT, Claude, and other MCP agents propose changes people approve',
      'Keep every change in Git history, with no content database to sync or migrate',
    ],
    valueVisual: 'editor',
    scenarioTitle: 'From request to published without an engineering ticket',
    scenarioBody:
      'Marketing needs a new customer story on the site before a launch. Here is how it moves.',
    scenarioSteps: [
      {
        title: 'Capture the request as a content task',
        body:
          'The idea, brief, and owner live on the content board instead of in a Slack thread.',
      },
      {
        title: 'Draft visually or with an agent',
        body:
          'A writer drafts in the editor, or asks Claude or ChatGPT to draft it through GitCMS.',
      },
      {
        title: 'Review before it goes live',
        body:
          'A reviewer sees exactly what changed, leaves feedback, and approves it.',
      },
      {
        title: 'Publish to the repo',
        body:
          'The approved change is committed to your default branch and your existing hosting deploys it.',
      },
    ],
    scenarioFooter:
      'Engineers stay focused on the product. The website keeps moving.',
    relatedLinks: [
      { label: 'Editorial Workflow', href: '/docs/features/editorial-workflow' },
      { label: 'Roles & Site Access', href: '/docs/features/access-control' },
      { label: 'AI agents', href: '/agents' },
    ],
    faq: [
      {
        question: 'Can marketing change the website without engineering?',
        answer:
          'Yes, for any content your site loads from Markdown or MDX: pages, posts, docs, changelogs, and similar collections. Content hardcoded inside components still needs a developer or coding agent to move it into a collection first.',
      },
      {
        question: 'Will engineers still trust what ships?',
        answer:
          'Yes. Every save is a real Git commit in your repository, and the review-before-publish workflow keeps unapproved work off your live site.',
      },
      {
        question: 'Do we have to migrate the site or change hosting?',
        answer:
          'No. GitCMS connects to the repository you already have. Your framework, build, and hosting stay the same.',
      },
      {
        question: 'How do AI agents fit in?',
        answer:
          'Agents like ChatGPT and Claude connect through MCP and draft changes inside the same workflow as people. In review-before-publish mode, their work waits for human approval.',
      },
    ],
    ctaTitle: 'Give your team a way to run the website.',
    ctaBody:
      'Connect the repository behind your site and let marketing, product, and AI agents work through one reviewable flow.',
    seoTitle: 'GitCMS for Startups — Let Marketing Edit Your Code-First Website Without Engineering',
    seoDescription:
      'Your website lives in a repo. GitCMS lets marketing, founders, and AI agents edit, review, and publish changes without engineering tickets or learning Git.',
  },
  {
    slug: 'agencies',
    path: '/for-agencies',
    name: 'Agencies',
    shortDescription:
      'Build client sites with the stack you want. Hand them off with a CMS clients can actually use.',
    heroLabel: 'For Agencies',
    heroTitle: 'Ship client sites with Claude Code. Hand them off without WordPress.',
    heroBody:
      'Coding agents made custom client sites fast and cheap to build. The hard part is what happens after launch: the client wants to change a sentence, swap an image, or publish a post. GitCMS gives every client a safe visual editor for the site in their repo, and keeps your agency in control of what ships.',
    heroSupport: [
      'Clients edit visually and never see Git, branches, or your codebase',
      'Site-scoped access so each client only sees their own site',
      'Review before publish when you want to approve client or agent changes',
    ],
    heroNote:
      'Best for agencies building client sites with Astro, Next.js, or similar frameworks, increasingly with Claude Code, Codex, or Cursor.',
    heroVisual: 'workflow',
    painTitle: 'Why post-launch client work eats agency margin',
    pains: [
      {
        title: 'You become the client’s content operator',
        body:
          'The site is fast and SEO-friendly, but every copy change, image swap, or blog post still comes back to your team as a small, unbillable task.',
      },
      {
        title: 'The old answer was WordPress',
        body:
          'WordPress gave clients an admin panel, along with plugins, themes, security updates, and a stack you no longer want to build on.',
      },
      {
        title: 'More sites, less visibility',
        body:
          'As the portfolio grows, it gets harder to know who can edit what, which changes are waiting, and what went live on which client site.',
      },
    ],
    valueTitle: 'Make the CMS part of every handoff.',
    valueBody:
      'Build with the stack and agents you prefer. When the site is done, connect it to GitCMS, invite the client, and set their access. The client gets routine autonomy; your team keeps the engineering work.',
    valuePoints: [
      'Connect the client repository; no rebuild, migration, or content database',
      'Invite client editors and reviewers per site, without sharing developer accounts',
      'Turn on review before publish when client or agent changes need approval',
      'Let your coding agent set up GitCMS on a new repo with a copy-paste prompt',
      'Keep separate workspaces when client projects need separation',
    ],
    valueVisual: 'editor',
    scenarioTitle: 'What a client handoff looks like',
    scenarioBody:
      'The site is finished and deployed. Here is the handoff, start to finish.',
    scenarioSteps: [
      {
        title: 'Connect the client repo',
        body:
          'Add the repository to your workspace. GitCMS detects the site, collections, and content.',
      },
      {
        title: 'Invite the client',
        body:
          'Give them editor or reviewer access to their site only.',
      },
      {
        title: 'Client handles routine changes',
        body:
          'Copy, images, and posts are edited visually and committed to their repo.',
      },
      {
        title: 'Your team keeps the big changes',
        body:
          'New pages, design, and features stay with your developers and coding agents.',
      },
    ],
    scenarioFooter:
      'No more “message us to change a sentence.”',
    relatedLinks: [
      { label: 'Roles & Site Access', href: '/docs/features/access-control' },
      { label: 'Editorial Workflow', href: '/docs/features/editorial-workflow' },
      { label: 'Quick Start', href: '/docs/getting-started/quick-start' },
    ],
    faq: [
      {
        question: 'Do clients need a GitHub account?',
        answer:
          'No. Invited clients can sign in with Google and work entirely in the GitCMS interface. Only the people who connect repositories need GitHub.',
      },
      {
        question: 'Can clients break the site?',
        answer:
          'Clients edit content fields and Markdown, not components or layout. With review before publish turned on, their changes wait for your approval before going live.',
      },
      {
        question: 'Does this work for sites built with Claude Code, Codex, or Cursor?',
        answer:
          'Yes, as long as the site lives in a Git repository and loads its editable content from Markdown or MDX. Your coding agent can move hardcoded copy into collections and set up GitCMS for you.',
      },
      {
        question: 'Can we manage many client sites?',
        answer:
          'Yes. One workspace can hold many sites, access is scoped per site, and you can use separate workspaces when clients need full separation.',
      },
    ],
    ctaTitle: 'Hand off your next client site with a CMS.',
    ctaBody:
      'Connect a client repository, invite the client, and stop being the bottleneck for routine changes.',
    seoTitle: 'GitCMS for Agencies — Hand Off Claude Code and Astro Sites With a Client CMS',
    seoDescription:
      'Build client sites with Claude Code, Astro, or Next.js, then hand them off with GitCMS: a safe visual CMS for clients while your agency controls what ships.',
  },
  {
    slug: 'freelancers',
    path: '/for-freelancers',
    name: 'Freelancers',
    shortDescription:
      'Hand off client sites without becoming their permanent content operator.',
    heroLabel: 'For Freelancers',
    heroTitle: 'Finish the site. Hand it off. Stop fielding copy changes.',
    heroBody:
      'You built a fast, custom client site, maybe with Claude Code or Cursor. Now every small edit comes back to you. GitCMS gives your client a simple visual CMS for the site in their repo, so routine changes stop eating your time.',
    heroSupport: [
      'A client-friendly editor on the site you already built',
      'Set up on an existing repo, without a migration',
      'Approve client changes before they go live when you need to',
    ],
    heroNote:
      'Best for freelance developers and designers who build custom sites and want a clean handoff.',
    heroVisual: 'editor',
    painTitle: 'Why small client edits cost more than they look',
    pains: [
      {
        title: 'Every edit is a context switch',
        body:
          'A one-line copy change still means opening the repo, editing a file, pushing, and confirming with the client.',
      },
      {
        title: 'Feedback arrives everywhere',
        body:
          'Email, chat, and screenshots turn simple changes into coordination work that eats your margin.',
      },
      {
        title: 'A heavy CMS is hard to justify',
        body:
          'Rebuilding the site on WordPress or a headless CMS just so the client can edit it undoes the reason you built it custom.',
      },
    ],
    valueTitle: 'A professional handoff without a heavy stack.',
    valueBody:
      'Connect the repo, invite the client, and let them handle routine content. You keep the code and the bigger, billable changes.',
    valuePoints: [
      'Clients edit pages, posts, and media visually',
      'Content stays in the client’s repository as plain files',
      'Review client changes before they publish when the site needs it',
      'Let your coding agent configure GitCMS with a copy-paste prompt',
      'Use the same handoff on every project',
    ],
    valueVisual: 'editor',
    scenarioTitle: 'A handoff that sticks',
    scenarioBody:
      'From the last deploy to a client who updates their own site.',
    scenarioSteps: [
      {
        title: 'Connect the client repo',
        body:
          'GitCMS reads the existing site and its content collections.',
      },
      {
        title: 'Invite the client',
        body:
          'They get access to their site only, in an editor that feels like a document.',
      },
      {
        title: 'Client makes routine changes',
        body:
          'Copy, images, and posts are committed to the repo and deploy as usual.',
      },
      {
        title: 'You take the real work',
        body:
          'New features and redesigns come back to you as projects, not one-line tickets.',
      },
    ],
    scenarioFooter:
      'Your time goes to building, not copy-pasting text into files.',
    relatedLinks: [
      { label: 'Quick Start', href: '/docs/getting-started/quick-start' },
      { label: 'Editorial Workflow', href: '/docs/features/editorial-workflow' },
      { label: 'Roles & Site Access', href: '/docs/features/access-control' },
    ],
    faq: [
      {
        question: 'Is it worth it for one client site?',
        answer:
          'Usually, yes. If you spend more than a few minutes a month on client copy changes, a clean handoff pays for itself quickly.',
      },
      {
        question: 'Can clients use it without learning Markdown or Git?',
        answer:
          'Yes. They edit in a visual editor. Markdown and Git stay underneath.',
      },
      {
        question: 'What if the client leaves or switches developers?',
        answer:
          'The content stays in their repository as plain files. Nothing is locked in a GitCMS database.',
      },
      {
        question: 'Does it work with sites built by AI coding agents?',
        answer:
          'Yes, if the site lives in Git and loads editable content from Markdown or MDX. Your coding agent can set that structure up.',
      },
    ],
    ctaTitle: 'Make your next handoff the last copy-change request.',
    ctaBody:
      'Connect the client repository and give them a CMS for the site you built.',
    seoTitle: 'GitCMS for Freelancers — Hand Off Custom Client Websites With a Simple CMS',
    seoDescription:
      'Built a custom client site with code or AI coding agents? GitCMS gives clients a simple visual CMS so routine edits stop coming back to you.',
  },
  {
    slug: 'solo-builders',
    path: '/for-solo-builders',
    name: 'Solo Builders',
    shortDescription:
      'You built the site with an agent or by hand. Keep the blog, docs, and changelog moving without it turning into a chore.',
    heroLabel: 'For Solo Builders',
    heroTitle: 'You built the site. Now keep it publishing.',
    heroBody:
      'Your site lives in a repository, and your blog, docs, and changelog are how people find and trust your product. GitCMS gives you one place to write, review, and publish them, with or without an AI agent, while everything stays as plain files in your repo.',
    heroSupport: [
      'Write and edit posts, docs, and changelog entries visually instead of in an IDE',
      'Let ChatGPT, Claude, or your own agent draft, then review the diff before it ships',
      'Every published change is a real commit; there is no content database to run or migrate',
    ],
    heroNote:
      'Best for solo founders, developers, and one-person teams who run their own code-first website.',
    heroVisual: 'editor',
    painTitle: 'When you are the whole team, publishing is the first thing to slip.',
    pains: [
      {
        title: 'Building the product always wins',
        body:
          'You know content drives discovery and trust, but when launch work piles up, the post, the docs update, and the changelog entry are what get skipped.',
      },
      {
        title: 'Every edit means opening the codebase',
        body:
          'A typo fix or a new post means opening the repo, finding the file, and pushing, or asking an agent and hoping it only touched what you asked for.',
      },
      {
        title: 'A heavy CMS is more setup than payoff',
        body:
          'Another hosted CMS, another database, and another subscription usually add setup work, not more published content.',
      },
    ],
    valueTitle: 'One workflow for the content around your product.',
    valueBody:
      'GitCMS sits on top of the repository you already own. You write visually, agents help draft, and you approve what goes live. If you later hire a marketer or hand the site to a client, they join the same workflow.',
    valuePoints: [
      'Run blog, docs, and changelog from one workflow instead of three tools',
      'Keep Markdown, MDX, frontmatter, media, and repo structure exactly as they are',
      'Draft with the agent you already use, then review the change before it publishes',
      'Add an editor or reviewer later without a migration or a new stack',
      'Keep your content in your repository if you ever stop using GitCMS',
    ],
    valueVisual: 'editor',
    scenarioTitle: 'From release to published in one sitting',
    scenarioBody:
      'A feature ships, or a customer asks a question worth answering publicly. Here is how it becomes content while the context is still fresh.',
    scenarioSteps: [
      {
        title: 'Capture the angle',
        body:
          'Save the release notes, the customer question, or the keyword in one place.',
      },
      {
        title: 'Draft visually or with an agent',
        body:
          'Write in the editor, or ask Claude or ChatGPT to draft the post through GitCMS.',
      },
      {
        title: 'Review what changed',
        body:
          'See exactly what the draft changes, edit it in your voice, and approve it.',
      },
      {
        title: 'Publish to your repo',
        body:
          'The change is committed to your default branch and your existing hosting deploys it.',
      },
    ],
    scenarioFooter:
      'The win is not a nicer editor. It is publishing often enough for the site to keep earning its keep.',
    relatedLinks: [
      { label: 'Editorial Workflow', href: '/docs/features/editorial-workflow' },
      { label: 'Collections & Fields', href: '/docs/features/collections' },
      { label: 'AI agents', href: '/agents' },
    ],
    faq: [
      {
        question: 'Is GitCMS too much for a one-person project?',
        answer:
          'No. It connects to the repository you already have and adds no database or infrastructure. If you only publish occasionally, you can use it just for the visual editor and ignore the rest.',
      },
      {
        question: 'Can I use GitCMS for blog, docs, and changelog together?',
        answer:
          'Yes. As long as each one is a collection of Markdown or MDX files in your repo, they can all run from the same workspace.',
      },
      {
        question: 'Is this an AI writer for SEO?',
        answer:
          'No. GitCMS is the place where people and agents edit, review, and publish website changes. Agents can draft inside it, but you decide the positioning, the quality, and what goes live.',
      },
      {
        question: 'Why not keep using Markdown files and my editor?',
        answer:
          'You can, and many builders do. GitCMS helps when publishing keeps slipping, when you want an agent to draft without editing the repo directly, or when someone else needs to contribute without touching Git.',
      },
    ],
    ctaTitle: 'Keep your website publishing while you keep building.',
    ctaBody:
      'Connect the repository behind your site and run your blog, docs, and changelog from one reviewable workflow.',
    seoTitle: 'GitCMS for Solo Builders — Run Your Blog, Docs, and Changelog From Your Repo',
    seoDescription:
      'Built your site with code or an AI coding agent? GitCMS gives solo builders one place to write, review, and publish blog posts, docs, and changelogs without a CMS database.',
  },
] satisfies Array<PersonaContent>

// Audiences in the order pickers and navigation promote them.
const FEATURED_PERSONA_SLUGS: ReadonlyArray<PersonaSlug> = [
  'agencies',
  'startups',
  'freelancers',
  'solo-builders',
]

export const featuredPersonaList = FEATURED_PERSONA_SLUGS.flatMap((slug) =>
  personaList.filter((persona) => persona.slug === slug),
)

export function getPersona(slug: string) {
  return personaList.find((persona) => persona.slug === slug)
}

// Slugs of audiences that were renamed; `/for/<slug>` keeps resolving.
const RETIRED_PERSONA_SLUGS: ReadonlyMap<string, PersonaSlug> = new Map([
  ['indie-hackers', 'solo-builders'],
])

export function getPersonaPath(slug: string) {
  const currentSlug = RETIRED_PERSONA_SLUGS.get(slug) ?? slug
  return getPersona(currentSlug)?.path
}

export function getRequiredPersona(slug: PersonaSlug) {
  const persona = getPersona(slug)

  if (!persona) {
    throw new Error(`Missing persona content for ${slug}`)
  }

  return persona
}

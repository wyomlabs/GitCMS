/**
 * Feature pages (/features/*): one page per product capability, built from
 * the template in components/feature/FeaturePage.astro. Each page teaches the
 * feature (about 1,000 words): the problem it removes, how it works, what
 * it's worth to each audience, and what it writes to the repository. Limits
 * and caveats belong in the docs, not here. No pricing, testimonials or
 * founder note either; those live on the home and use-case pages. Mark
 * anything unshipped with `soon`.
 */
import type { LucideIcon } from 'lucide-react'
import { MousePointerClick, SquareKanban, SquarePen } from 'lucide-react'
import type { DemoName } from '@/components/mock/DemoWindow.astro'
import type { UseCaseSlug } from '@/lib/use-cases'

export type FeatureSlug = 'visual-editor' | 'editorial-workflow' | 'change-requests'

type Point = { title: string; body: string }

export type Feature = {
  slug: FeatureSlug
  path: `/features/${FeatureSlug}/`
  name: string
  /** One line for menus. */
  blurb: string
  icon: LucideIcon
  /** Shipped, but still labeled Beta in the product. */
  alpha?: true
  seoTitle: string
  seoDescription: string
  title: string
  /** Two sentences that define the feature; search and AI answers quote this. */
  description: string
  demo: DemoName
  problemTitle: string
  problem: ReadonlyArray<string>
  stepsTitle: string
  /** `inRepo` says what the step leaves in the repository, when it leaves anything. */
  steps: ReadonlyArray<Point & { inRepo?: string }>
  /** A second demo after the steps, for features with two sides worth showing. */
  showcase?: { demo: DemoName; title: string; description: string }
  /** What the feature is worth to each audience; links to its use-case page. */
  audiences: ReadonlyArray<{ useCase: UseCaseSlug; body: string }>
  /** Product actions next to what they write to the repository. */
  underTheHood: { title: string; intro: string; rows: ReadonlyArray<{ action: string; repo: string }> }
  detailsTitle: string
  details: ReadonlyArray<Point & { soon?: boolean }>
  faqs: ReadonlyArray<{ question: string; answer: string }>
  related: ReadonlyArray<{ label: string; href: string }>
  ctaTitle: string
  ctaDescription: string
}

export const features: ReadonlyArray<Feature> = [
  {
    slug: 'visual-editor',
    path: '/features/visual-editor/',
    name: 'Visual editor',
    blurb: 'Markdown, MDX and data files, without the syntax',
    icon: SquarePen,
    seoTitle: 'Visual Editor for Markdown, MDX, JSON and YAML Files — GitCMS',
    seoDescription: 'Edit Markdown and MDX like a document, frontmatter as a form, and JSON, YAML or TOML data files as forms. Every save is a plain file in your repository.',
    title: 'A visual editor for the files your site is made of',
    description: 'GitCMS edits Markdown and MDX as a document, frontmatter as a form, and JSON, YAML or TOML data files, like menus and footers, as forms. Every save writes the same plain files back to your repository, so your framework, your build and your coding agent keep working exactly as before.',
    demo: 'editor',
    problemTitle: 'Your site is files. Your editors don’t want to see them.',
    problem: [
      'A code-first site keeps its content next to its code: posts and pages in Markdown or MDX, the menu in `navigation.json`, the footer in a YAML file, theme settings in `config.toml`. That’s the right call for the site. It’s a bad interface for the person who has to change the pricing line on a Friday afternoon.',
      'So the edit goes back to the developer, or it gets made in GitHub’s web editor and a missing quote breaks the build. Hosted CMSs fix the interface by moving content into their database, and then you’re maintaining sync, webhooks and an export plan for the day you leave.',
      'An editor for a code-first site should be a better view of the files you already have, not a new home for them.',
    ],
    stepsTitle: 'From file to form, without a migration',
    steps: [
      { title: 'Point GitCMS at your content', body: 'Your coding agent runs create-gitcms. It finds your collections, frontmatter format and media folder, and infers field types from the entries you already have.', inRepo: '.gitcms/sites/<site>/' },
      { title: 'Edit like a document', body: 'Type / for headings, tables, callouts, code and images, and drag blocks to reorder them. Frontmatter sits above the body as fields: dates get a picker, tags become chips, images open the media library.' },
      { title: 'Save back to the same file', body: 'GitCMS writes Markdown or MDX in the format your site already uses, and only the changed values in data files. With review before publish, the save becomes a draft; with direct publish, it goes to your default branch.', inRepo: 'src/content/blog/launch-week.mdx' },
    ],
    audiences: [
      { useCase: 'agencies', body: 'Clients edit their own pages, menus and footers in forms they can’t break. Field rules and select options keep them inside the design you built, so a handoff doesn’t end with a broken layout and a support ticket.' },
      { useCase: 'freelancers', body: 'Hand over a site the client can actually update. You keep the Astro or Next.js codebase you like working in; they get an editor that looks like a document, not a repository.' },
      { useCase: 'startups', body: 'Marketing changes homepage copy, the changelog and the docs without filing a ticket. Engineers review a small, readable diff instead of being the ones who type it.' },
      { useCase: 'solo-builders', body: 'Write the post in a proper editor instead of a code tab next to your product work. Slash commands, images and internal links are there when you need them, and the post is still a file your agent can edit tomorrow.' },
    ],
    underTheHood: {
      title: 'What a save looks like in your repository',
      intro: 'The editor is a view over plain files. This is what each action writes.',
      rows: [
        { action: 'Edit a post', repo: 'The same `.md` or `.mdx` file, with frontmatter in the format you already use: YAML, TOML or JSON.' },
        { action: 'Use a framework component', repo: 'Your framework’s own syntax, kept as written: MDX components, Hugo shortcodes, Jekyll includes and more (beta).' },
        { action: 'Change the footer', repo: 'Only the edited values in the data file. Comments, key order, quoting and indentation stay as they were.' },
        { action: 'Upload an image', repo: 'A file in your media folder or object storage, referenced by path in the entry.' },
        { action: 'Publish', repo: 'A commit on your default branch, or a draft merged after review, depending on the site’s publishing mode.' },
      ],
    },
    detailsTitle: 'An editor that knows it’s editing files',
    details: [
      { title: 'Slash commands and drag-and-drop', body: 'Headings, lists, to-dos, tables, callouts, code blocks, equations and a table of contents, inserted with / and moved by dragging.' },
      { title: 'Frontmatter as a form', body: 'Text, rich text, numbers, dates, selects, multiselects, URLs, slugs and images, each with its own control and its own validation.' },
      { title: 'Forms for data files', body: 'Menus, footers, team lists and theme settings get tabs, cards and editable tables. Point a form at one part of a file so build settings stay out of reach.' },
      { title: 'Framework components, in beta', body: 'MDX components and SSG syntax like Hugo shortcodes, Jekyll includes and Nuxt MDC are kept intact instead of flattened into text.' },
      { title: 'Internal link suggestions', body: 'With a sitemap configured, link search suggests your published pages, so nobody pastes URLs by hand.' },
      { title: 'Draft recovery', body: 'If a tab closes or the connection drops, GitCMS offers your unsaved draft the next time you open the entry, and warns you if the file changed since.' },
    ],
    faqs: [
      { question: 'Can GitCMS edit MDX files with components?', answer: 'Yes. MDX files open in the same visual editor, and JSX components used by Astro, Next.js, Docusaurus and others are kept instead of flattened to text. Editing component syntax is in beta.' },
      { question: 'How do editors change menus or footers kept in JSON or YAML?', answer: 'Add the file as site data. GitCMS auto-detects its fields and shows it in the sidebar as a form, like Navigation or Footer. Saving changes only the values that were edited.' },
      { question: 'Do I have to write a schema first?', answer: 'No. GitCMS infers field types from your existing entries and data files. Refine labels, types, options and validation later in Settings; the result is saved to the .gitcms folder in your repository.' },
      { question: 'Will my frontmatter format change?', answer: 'No. GitCMS keeps the format your site uses, whether that’s YAML, TOML or JSON, so you don’t have to migrate your content model to get a better editor.' },
      { question: 'Can AI agents use the same fields?', answer: 'Yes. Agents connected through GitCMS MCP read and change entries and site data against the same fields and rules, and follow the same publishing mode as everyone else.' },
      { question: 'What happens to my content if I stop using GitCMS?', answer: 'Nothing needs exporting. Your content was always plain files in your repository. Remove the .gitcms folder if you want no trace of the setup.' },
    ],
    related: [
      { label: 'Markdown editor docs', href: '/docs/features/markdown-editor/' },
      { label: 'Site data', href: '/docs/features/site-data/' },
      { label: 'Collections and fields', href: '/docs/features/collections/' },
      { label: 'Media library', href: '/docs/features/media-management/' },
    ],
    ctaTitle: 'Give your content files an editor',
    ctaDescription: 'Connect your repository and edit your first post. Nothing to migrate, nothing to export later.',
  },
  {
    slug: 'editorial-workflow',
    path: '/features/editorial-workflow/',
    name: 'Editorial workflow',
    blurb: 'Ideas to published on one content board',
    icon: SquareKanban,
    seoTitle: 'Editorial Workflow and Content Approval for Code-First Sites — GitCMS',
    seoDescription: 'Move content from idea to draft, review and published on one board. Inline review, approvals and publish permissions, with every draft kept in Git.',
    title: 'Ideas to published, with review in between',
    description: 'GitCMS gives every site a content board with four stages: Ideas, Draft, Review and Published. Drafts stay off the live site until someone approves and publishes them, and the people writing never touch a branch or a pull request.',
    demo: 'board',
    problemTitle: 'Review shouldn’t be a Slack thread and a hope',
    problem: [
      'On most code-first sites, review happens wherever it can. A draft gets pasted into a doc, comments land in Slack, and the final copy is typed into a Markdown file by whoever has repository access. Nobody can say what’s waiting, what’s approved, or why something went live.',
      'Developers already have the right model: branches keep work apart, pull requests collect review, merging ships. Writers and clients shouldn’t have to learn it to benefit from it. And now agents draft too, which means more changes and more need for one place where everything waits for a yes.',
    ],
    stepsTitle: 'Four stages, one board',
    steps: [
      { title: 'Capture ideas, start drafts', body: 'Add a title or a brief to Ideas. When someone starts writing, the card moves to Draft and every save stays with that task, away from the live site.', inRepo: 'gitcms-draft-<task number>' },
      { title: 'Review beside the text', body: 'Move the task to Review. Reviewers see what changed marked inline, comment on any sentence, and approve or request changes.' },
      { title: 'Publish when it’s approved', body: 'Someone with publish access publishes and the task moves to Published. Turn on Require approval and publishing waits until the latest version is approved.' },
    ],
    showcase: {
      demo: 'review',
      title: 'Reviewers see the change, not the whole file',
      description: 'The published version with the draft’s edits marked in place, changed fields highlighted, and comment threads in the margin. Writers keep their normal editor, with the comments shown on it.',
    },
    audiences: [
      { useCase: 'agencies', body: 'Separate who writes, who approves and who publishes on each client site. A client can be a reviewer who signs off on every change without ever being able to push one live.' },
      { useCase: 'freelancers', body: 'Let the client draft their own updates while you keep the final say. You approve from the board instead of receiving copy by email and pasting it in.' },
      { useCase: 'startups', body: 'Marketing, product and legal see the same board. Approvals from GitHub sign-ins count toward your branch rules, so the website follows the same review culture as the code.' },
      { useCase: 'solo-builders', body: 'Use Ideas as your content backlog and Review as the pause between an AI draft and the live site. When you don’t need the pause, switch the site to direct publish.' },
    ],
    underTheHood: {
      title: 'What the board is in Git',
      intro: 'Every stage maps to something your developers already know. Nobody else has to.',
      rows: [
        { action: 'Content task', repo: 'A GitHub issue labeled `gitcms:board`, plus `gitcms:site:<site key>` for its site.' },
        { action: 'Draft', repo: 'A branch named `gitcms-draft-<task number>`, one per task, whoever writes on it.' },
        { action: 'Review', repo: 'A pull request. Comments are stored on it, so developers can follow the discussion in GitHub.' },
        { action: 'Approve', repo: 'A real GitHub approval when the reviewer signed in with GitHub, so your branch rules count it.' },
        { action: 'Publish', repo: 'The draft merged into your default branch.' },
      ],
    },
    detailsTitle: 'Review that holds up when the team grows',
    details: [
      { title: 'Comments on any text', body: 'Select a word or several lines and comment. Threads show as open, resolved, text changed or outdated, so you know what’s left.' },
      { title: 'Approvals tied to a version', body: 'If the draft changes after approval, the task shows Approval out of date until someone approves again.' },
      { title: 'Require approval', body: 'Block publishing until the latest version is approved. Owners and admins can still publish anyway, and the activity says they did.' },
      { title: 'One board across collections', body: 'Posts, docs, changelog entries and site data changes move through the same four columns.' },
      { title: 'Publishing is a permission', body: 'Editors draft, reviewers approve, and only people with publish access ship. One person can hold several of these.' },
      { title: 'Agents follow the same path', body: 'Agents connected through MCP create tasks, draft against them and submit them for review, on the same board as everyone else.' },
    ],
    faqs: [
      { question: 'What is an editorial workflow?', answer: 'A review-before-publish process: content moves from idea to draft to review, and goes live only after someone approves and publishes it. In GitCMS, each piece of work is a content task on the site’s board.' },
      { question: 'Do writers need to know Git?', answer: 'No. They see tasks, drafts and a Publish button. GitCMS creates and merges the branches, issues and pull requests underneath.' },
      { question: 'Can a client approve without being able to publish?', answer: 'Yes. Give them the reviewer role on their site. They can comment and approve; publishing stays with the people who have publish access.' },
      { question: 'Do GitCMS approvals count for GitHub branch protection?', answer: 'When the reviewer signed in with GitHub, their approval is a real GitHub approval and counts for your branch rules. Approvals made directly on the pull request by a reviewer’s own GitHub account count in GitCMS too.' },
      { question: 'Can I preview a draft before publishing?', answer: 'Yes, if your host builds preview deployments, as Vercel and Netlify do. GitCMS finds the preview for the draft and adds a Preview site button to the task.' },
      { question: 'Can I switch between review and direct publish later?', answer: 'Yes, per site in Settings. Switching doesn’t rewrite any files.' },
    ],
    related: [
      { label: 'Editorial workflow docs', href: '/docs/features/editorial-workflow/' },
      { label: 'Roles and site access', href: '/docs/features/access-control/' },
      { label: 'Task-first AI workflows', href: '/docs/ai-mcp/task-first-workflows/' },
      { label: 'Change requests', href: '/features/change-requests/' },
    ],
    ctaTitle: 'Put a review step between drafts and your live site',
    ctaDescription: 'Turn on review before publish for any site and see every task on one board.',
  },
  {
    slug: 'change-requests',
    path: '/features/change-requests/',
    name: 'Change requests',
    blurb: 'Feedback pinned to the live site and its previews',
    icon: MousePointerClick,
    alpha: true,
    seoTitle: 'Website Feedback Pinned to the Page, Checked on Previews — GitCMS',
    seoDescription: 'Clients click the element they want changed. Your coding agent gets the feedback as one prompt, and GitCMS checks every pin on the preview deployment.',
    title: 'Feedback on the page, checked on the preview',
    description: 'Change requests let clients and teammates click the heading, image or section they want changed on the live site and say what should change. Each request reaches your developer or coding agent as a GitHub issue, and when the fix deploys, GitCMS opens the preview and checks every pin against it.',
    demo: 'change-requests',
    problemTitle: '“Can you make the thing on the pricing page bigger?”',
    problem: [
      'Website feedback still arrives as screenshots in email, a list in a doc, or a voice note. Half of it doesn’t say which page, and the other half describes an element someone has to go and find. Then the client asks whether it’s fixed, and the only way to show them is to ship it.',
      'Content edits belong in the editor. But plenty of feedback is about the site itself: a layout, a button, a section that should move. That’s code work, and more and more often a coding agent does it. Agents work best from exact instructions, not a forwarded email.',
    ],
    stepsTitle: 'From a click to a checked fix',
    steps: [
      { title: 'Point at the page', body: 'Open Change requests, choose Select element and click what needs work. Numbered pins mark each item, and one request can cover as many pages as you need.' },
      { title: 'Hand it to your agent', body: 'Submitting opens a GitHub issue with every item numbered. Copy prompt gives Claude Code, Codex or Cursor the page, element, current text and requested change for each one.', inRepo: 'GitHub issue: F1, F2, F3…' },
      { title: 'Check it on the preview', body: 'When the pull request’s preview deploys, the request opens on it. Each pin shows whether its element changed, still matches or is gone, so reviewers resolve feedback before anything ships.' },
    ],
    audiences: [
      { useCase: 'agencies', body: 'Client feedback rounds stop living in spreadsheets. Clients pin what they want, your team or agent works through the list, and the client checks the result on the preview before you ship.' },
      { useCase: 'freelancers', body: 'Get revisions you can act on: the exact element, the page and the words the client wants. Paste one prompt into your agent and reply item by item.' },
      { useCase: 'startups', body: 'Marketing and design point at the production site instead of filing vague tickets. Engineers or agents get page paths and selectors, and stakeholders verify on the preview.' },
      { useCase: 'solo-builders', body: 'Leave yourself notes on your own site as you browse it, then hand the whole list to your coding agent in one go.' },
    ],
    underTheHood: {
      title: 'What a change request is in Git',
      intro: 'The request lives where your developers already work, and their replies thread back into GitCMS.',
      rows: [
        { action: 'Submit a request', repo: 'A GitHub issue listing every item as F1, F2 and so on, with its page and element.' },
        { action: 'Copy prompt', repo: 'Instructions to work on a named branch and open a pull request that says “Closes #<issue>”.' },
        { action: 'Developer reply', repo: 'A GitHub comment that mentions F2 shows up on that item in GitCMS.' },
        { action: 'Preview', repo: 'The deployment your host built for that pull request, opened in a read-only view.' },
        { action: 'Ship', repo: 'Your normal merge and deploy. GitCMS doesn’t merge code changes for you.' },
      ],
    },
    detailsTitle: 'Feedback a developer, or an agent, can act on',
    details: [
      { title: 'Select element', body: 'Feedback attaches to the exact heading, image or button, with its page and text, not to a pixel position on a screenshot.' },
      { title: 'Many pages, one request', body: 'Collect a whole round of feedback across the site and submit it together.' },
      { title: 'Threaded replies', body: 'Reviewers reply and resolve in GitCMS. Developers answer on GitHub by mentioning F1, F2 and so on.' },
      { title: 'A prompt for your coding agent', body: 'Every open item, its page and element, and how to deliver the work so it shows up back in GitCMS. In a monorepo, the prompt keeps the agent inside the right site’s folder.' },
      { title: 'Live site or preview', body: 'Switch between the live site and the preview at any time. Works with hosts that build a preview per pull request, like Vercel and Netlify.' },
      { title: 'Previews for content too', body: 'Content tasks get a Preview site button, so editors see a draft on the real website before it goes live.' },
    ],
    faqs: [
      { question: 'How is this different from a visual feedback tool?', answer: 'Feedback tools collect comments. Change requests also turn them into a GitHub issue your coding agent can work from, thread developer replies back to each item, and check the result on the preview deployment, next to the content workflow your team already uses.' },
      { question: 'Do clients need a GitHub account?', answer: 'No. They sign in to GitCMS, for example with Google, and point at the site. GitCMS opens the GitHub issue for them.' },
      { question: 'Which hosts work with previews?', answer: 'Hosts that report a deployment or commit status to GitHub for each pull request, such as Vercel and Netlify. Owners can pick the deployment source or turn previews off in Site Settings → Preview deployments.' },
      { question: 'Which coding agents work with Copy prompt?', answer: 'Any agent that can work in your repository and open a pull request, including Claude Code, Codex and Cursor. The prompt is plain text.' },
      { question: 'What do the labels on a preview mean?', answer: 'Changed on preview means the element differs from when the feedback was left, so check it before resolving. Still matches means it hasn’t changed. Target not found means the element is no longer on that page.' },
      { question: 'Is it on every plan?', answer: 'It’s in alpha. Everyone who can edit a site can explore it; submitting and discussing requests needs a licensed site. See pricing for what a license includes.' },
    ],
    related: [
      { label: 'Previews and change requests docs', href: '/docs/features/editorial-workflow/' },
      { label: 'Set up coding agents', href: '/docs/ai-mcp/coding-agents-setup/' },
      { label: 'Editorial workflow', href: '/features/editorial-workflow/' },
      { label: 'GitCMS for agencies', href: '/for-agencies/' },
    ],
    ctaTitle: 'Let clients point at what they want changed',
    ctaDescription: 'Connect your site and send your first change request to your coding agent.',
  },
]

export function getFeature(slug: FeatureSlug): Feature {
  const feature = features.find((item) => item.slug === slug)
  if (!feature) throw new Error(`Unknown feature: ${slug}`)
  return feature
}

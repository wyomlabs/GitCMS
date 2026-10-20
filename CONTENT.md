## Who we are

GitCMS is the CMS for code-first and AI-built websites. It gives your team, your clients, and AI agents one safe place to edit, review, and publish website changes, while everything stays in your site's repository.

That sentence is the canonical definition (`src/lib/positioning.ts`). Reuse it verbatim when a page needs to say what GitCMS is. Answer engines quote whichever description they find, so paraphrases dilute it.

We believe:
- AI made websites easy to build. It didn't make them easy to run. Building is Day One; GitCMS owns Day Two.
- Git is the source of truth. Content stays as plain files in the user's repository. No shadow database, no sync layer.
- The CMS should abstract Git, not replace it. Clients and marketers work visually. Developers and coding agents keep the repo-backed workflow.
- Humans and agents change the same website, so they should follow the same rules: draft, review, publish.
- Bring your own agent. GitCMS works with the agents people already use instead of selling AI credits.

This worldview should bleed through conviction posts naturally. It should never be a pitch.

## Message house

Every page can pick its own angle, but these stay fixed:

- **Definition:** the sentence above.
- **Category:** the control plane for code-first websites. Use it as an eyebrow or label, not as a headline; nobody searches for it.
- **Story:** world changed (agents made building cheap) → new problem (running the site after launch) → GitCMS.
- **Three pillars.** File every feature under one:
  - **People edit** — clients and marketers change the site without Git or an IDE.
  - **Agents propose** — ChatGPT, Claude, and other MCP agents draft through structured access.
  - **Nothing ships unreviewed** — review before publish, history, and Git as the final record.
- **Proof points:** no migration, no content database, works with the user's framework and hosting, content stays theirs if they leave.
- **Pricing:** read it from `src/lib/positioning.ts`. Never hardcode prices in content.
- **Links:** name competitors, but never link to them; don't send them free backlinks or traffic. Link out only to neutral sources that back a claim (data, research, specs).
- **Publishing modes:** sites can use review before publish or direct publish. Don't promise that changes always wait for review; say "with review before publish" when the claim depends on it.

Avoid as headlines: "Notion-like", "markdown CMS", "content agents", "lifetime deal", "Git-based CMS". Our audience searches by problem and by the tool they built with, not by CMS architecture.

## Audience

Primary:
- **Agencies and freelancers** building client sites with Astro, Next.js, or similar frameworks, increasingly with Claude Code, Codex, or Cursor. Their pain is the handoff: clients need to edit after launch, and the agency doesn't want to be the bottleneck or go back to WordPress.
- **Solo builders** — solo founders and one-person teams who built their own site, often with a coding agent. Their pain is that publishing slips: the blog, docs, and changelog are what get skipped when the product needs them, and every edit means opening the codebase. Say "solo builders", not "indie hackers".
- **Startups and companies** whose website is code. Their pain is that every website change becomes an engineering ticket, and AI agents now make changes nobody reviews.

Secondary:
- **Client editors** — local business owners, marketers, writers. They want a boring, safe visual CMS and should never need Git or an agent.
- Developers choosing a CMS for a static or framework site (the traditional Git-based CMS audience). They find us through comparisons and framework pages.
- Anyone evaluating how AI coding agents are changing who builds and runs websites.

These people are skeptical of bloated tools, surprise pricing, and vendor lock-in. They've been burned by tools that promise simplicity and deliver complexity. Respect that skepticism.

## Voice

A builder talking to builders. Not a brand. Not a content team. A person who builds the product they write about.
- Write the way you'd explain something to a smart friend who ships software.
- Strong opinions, but show the reasoning. Take a stance, then back it up with specifics.
- Technical enough to be credible. Clear enough that a non-engineer content person can follow.
- First person ("I") for opinion and conviction pieces. Second person ("you") for guides and tutorials.
- Lowercase-casual is fine for founder pieces. Clean and structured for everything else.

What this sounds like:
- "Here's what I found" over "We're excited to announce"
- "This breaks because..." over "There are some challenges with..."
- "$56K on CDN bills" over "significant costs"
- "Git won collaboration for code. I think it's about to win it for content." over "Git-based approaches offer numerous advantages for content management workflows."

## What makes our content different

We have skin in the game. We're building the product we write about. That context makes the content real. Use it.

We name tradeoffs. Every technology decision has downsides. Naming them first makes the upsides more believable. The "Honest Downsides" section should never be an afterthought.

We cite specifics. Real numbers, real repos, real examples. Not "many companies are switching to..." but "Cursor spent $56K on CMS CDN bills and migrated in three days."

We challenge conventional wisdom. If the common advice is wrong or outdated, say so and explain why. "WordPress is dead" is only interesting if we can show exactly why and for whom.

We don't publish when we have nothing new to say. If the post could appear on any CMS blog with the product name swapped out, it's not ready. Find the angle or don't publish.

## Content modes

### Mode 1: Conviction and opinion posts

These are brand-builders. Wide audience, shareable, designed to make people think and discover GitCMS through the conviction — not a product pitch.

Categories:
- **Thesis posts** — why markdown is the future of content management, content as code, less abstraction for AI adoption
- **Contrarian takes** — WordPress is dead, drag-and-drop builders are dead, no-code is dead because AI writes code
- **Market commentary** — how CMS is changing because of AI, what the shift to AI agents means for content tools
- **Honest comparisons** — side-by-side analysis where we acknowledge competitor strengths. Trust is the conversion mechanism, not spin.
- **Build logs** — what we shipped, why, what we learned. Transparency as content.

Rules for conviction posts:
- Open with a hook: a story, a surprising fact, a contrarian claim. Never a definition. Never "In today's..."
- Make the first 3 sentences earn the reader's attention.
- Back every strong claim with evidence, an example, or lived experience.
- Acknowledge the counterargument. Then explain why you still believe what you believe.
- End with a strong final line, not a recap. The last sentence should land.
- GitCMS can appear naturally when relevant. It should never be the point of the post. Let the product speak through the quality of the thinking.

Quality bar: Would I share this with a peer who doesn't use GitCMS? If not, it's not ready.

### Mode 2: SEO and utility posts

These are conversion-drivers. Someone searches a specific query, finds the guide, gets value, discovers GitCMS.

Categories:
- **Handoff and Day Two guides** — "how to hand off a Claude Code website to a client", "let clients edit an Astro site", "review AI agent changes before they go live"
- **Framework-specific guides** — "best CMS for Astro", "how to add a blog to Next.js", "Hugo content management"
- **How-to guides** — markdown, MDX, frontmatter, editorial workflows, i18n for content sites
- **Comparison posts** — "GitCMS vs CloudCannon", "Decap CMS alternatives", "best git-based CMS"
- **Content strategy** — SEO from day 0 for indie builders, content compounding, shipping content alongside code

Rules for SEO posts:
- Every post targets a specific primary keyword and 2-3 secondary keywords.
- Primary keyword appears in: title, first 100 words, at least one H2.
- Meta description: 150-160 characters, includes keyword, states value clearly.
- Internal link to at least 2 other pages (docs, features, related posts) where it genuinely helps.
- External link to 1-2 authoritative sources when citing data.
- Prefer depth over breadth. One well-covered topic beats a shallow overview.
- Use question-based H2s where they match "People Also Ask" queries.

Quality bar: Does this answer the search query better than the current top 3 results?

### Mode 3: Guides and tutorials

When someone searches "how to set up X" — they want clear steps that work on the first try. The measure of a good guide is "did it work?", not "was it interesting?"

Rules for guides:
- Start with prerequisites: what the reader needs installed, configured, or set up before starting.
- Steps must be linear. Never assume the reader skipped ahead.
- Code blocks are copy-paste ready. Not pseudocode.
- After non-trivial steps, include expected output so the reader knows they're on track.
- Include troubleshooting for common errors when you know them.
- Every clarification that feels "obvious" probably saves someone 30 minutes. Include it.
- Still write well. No one wants to read a wall of bullet points. But clarity and completeness override style.

## Structure

- Lead with the insight or the problem. Not a definition. Not background.
- Short paragraphs. 2-4 sentences. White space is a feature.
- Use H2 and H3 headings liberally. Someone skimming just the headings should get the core argument.
- Bullet points for lists of 3+ items.
- Code blocks for CLI commands, config examples, and markdown snippets.
- Include concrete examples, real numbers, or code when they strengthen the point.
- End with a clear next step or a strong closing line. Not a fluffy summary.

## Formatting

- Prefer long-form (1500-3000 words) for conviction and pillar posts.
- Guides and how-tos: as long as they need to be.
- Comparison posts: include a summary table when comparing 3+ options.
- Use frontmatter fields consistently: title, description, date, authors, tags.

## Avoid

Words: seamless, leverage, unlock, supercharge, empower, game-changer, cutting-edge, robust, revolutionize, elevate, harness

Patterns:
- "In today's fast-paced digital landscape..."
- "Whether you're a beginner or an expert..."
- "In conclusion, \[tool] is a great choice for..."
- Dictionary definitions as opening lines
- Listicles that repackage the first page of Google results
- Repeating the same point in different words to inflate word count
- Generic AI-generated padding that adds words without insight
- Claims without evidence, examples, or experience
- Content written to hit a word count rather than make a point
- Praising GitCMS in every post

## Examples of phrasing we like

- "Every save is a real Git commit. No sync layer. No shadow database."
- "I wanted something I could get running in 1 evening, not spend a whole weekend wiring together."
- "AI agents work with files and code. They don't work with database GUIs."
- "The content is in your repo. The commits are in your history. The editor is visual."
- "SEO compounds. A blog post you write today starts ranking in weeks."
- "Naming the downsides first makes the upsides more believable."

## Examples of phrasing we avoid

- "GitCMS is the ultimate solution for modern content management needs."
- "Seamlessly integrate your content workflow with our cutting-edge platform."
- "Unlock the full potential of your content strategy."
- "In today's rapidly evolving digital landscape, content management has become more important than ever."

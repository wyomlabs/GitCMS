/**
 * The founder's note, one version per audience. Same story every time:
 * building a website in code got cheap, so WordPress, no-code and
 * drag-and-drop builders lost their reason to exist, except for the admin
 * they gave clients. Lowercase and first person on purpose (CONTENT.md:
 * founder pieces). Wyom Labs is the studio behind GitCMS: it builds its own
 * products and ships client sites, which it hands over with GitCMS. Wrap a phrase in **double asterisks** to bold it. No
 * prices here; pricing copy reads from positioning.ts.
 */
export type FounderNoteKey = 'home' | 'agencies' | 'freelancers' | 'startups' | 'solo-builders'

export const FOUNDER_NOTES: Record<FounderNoteKey, ReadonlyArray<string>> = {
  home: [
    'at **wyom labs**, my studio, we do two things: we build our own products, like gitcms and devspace, and we ship websites and AI automation for small businesses. for years, the expensive part of a website was **the build**. that’s why everyone reached for wordpress, webflow and drag-and-drop builders. you traded speed, ownership and performance for one thing: an editor your client could actually use.',
    'then the build stopped being the hard part. with **claude code, codex and cursor**, a custom site that used to take a week ships in a day. it’s faster than any builder we’ve used, it hosts for free, and it keeps getting better because an agent can keep working on it.',
    'honestly? i think **wordpress is turning into legacy tech**, and drag-and-drop builders are a workaround whose reason to exist is gone. nobody needs to drag boxes around when describing the page gets you real code. but those tools did one thing we forgot about: **they gave the client an admin**.',
    'that’s **day two**. the week after launch, the email arrives: “can you change our opening hours?” marketing wants to publish a case study. an agent rewrote twenty pages and someone needs to check them. the fastest site you ever shipped quietly turns you into its content operator.',
    'gitcms started as my own tool for publishing blogs, docs and changelogs from a repo. it turned out to be the missing piece for this new way of building: **the admin for websites that stay code**. clients and marketers edit visually. agents draft through the same review flow. git stays the source of truth.',
    'we run it on our own products, and every marketing site wyom labs ships is handed over with gitcms. that’s the bar: if it isn’t good enough to give our own clients, it doesn’t ship. and if something breaks, you’re emailing the people who wrote the code.',
  ],
  agencies: [
    'we’re a studio too: at wyom labs we ship marketing sites for small businesses. for a decade the agency playbook was wordpress: a theme, a dozen plugins, and a client who could log in and change things. we sold it because **building custom was expensive**, not because it was good.',
    'that math is gone. **claude code** builds a custom astro site in a day, it’s faster than any theme, and it hosts for free. selling a client wordpress maintenance today feels like selling them a fax line. **wordpress is legacy tech now**, and drag-and-drop builders are solving a problem agents already solved.',
    'the one thing we couldn’t give up was **the admin**. without it, every client site we shipped came back as a stream of tiny requests: a new photo, a price, a blog post. great sites, terrible margins.',
    'so we built gitcms for our own client work, and every site wyom labs hands over now comes with it: one workspace for every site we run, a simple editor for each client, and review before anything ships. the client gets their admin back. we keep the code, the speed, and our evenings.',
    'if you still put clients on wordpress because of the editor, that’s the part we fixed. and if something breaks, you’re emailing the people who wrote the code.',
  ],
  freelancers: [
    'before wyom labs, i did freelance sites the way everyone did: wordpress for clients who needed to edit, custom code for the ones who didn’t. the code sites were better in every way, and i could only sell them to half my clients.',
    'agents changed that. with **claude code or cursor**, a custom site is an evening’s work, cheaper to build than setting up a decent wordpress theme, and free to host. **no-code tools and page builders** made sense when code was slow. it isn’t anymore.',
    'what still made clients nervous was one question: **“how do i change it after you leave?”** a git repo isn’t an answer, and “just email me” turns you into their content operator for life.',
    'gitcms is my answer to that question. the client gets a simple editor with fields that match their site. you keep the code. every change is a commit, so nothing is ever lost, and you only hear from them when it’s real work.',
  ],
  startups: [
    'at wyom labs we build our own products, and every one of them has a marketing site in the same repo as the app. it’s the right call: one stack, one deploy, and **an agent can ship a new landing page before lunch**.',
    'the old advice was to move marketing onto webflow or a wordpress install so engineers stop getting tickets. that made sense when code was slow. now it just means **a second website**, a second stack and a design that drifts. drag-and-drop is a detour, not a shortcut.',
    'the real problem was never the code. it’s that every copy change still needed an engineer, and now agents can rewrite twenty pages before anyone has read them. **cheap changes, no review**.',
    'gitcms is how we run our own sites: marketing edits visually, agents draft through the same flow, and every change, from a person or an agent, can be reviewed before it ships. the website stays code. it just stops being an engineering queue.',
  ],
  'solo-builders': [
    'gitcms started as a tool for me, long before wyom labs. i was a solo builder with a product site in a repo, and the blog, docs and changelog were always the thing i skipped. i’d ship a feature and never write about it.',
    'the irony is that writing has never mattered more. **people find products through search and AI answers now**, and what they land on is your posts and docs, not your homepage. meanwhile the site itself is basically free: an agent builds it in an afternoon, so there’s no reason to rent a wordpress install or a no-code builder for it.',
    'what i needed wasn’t another CMS with a database. i needed **a way to keep publishing**: see what’s working, let my agent draft, check the post before it ships, and have it land as a commit in the repo i already own.',
    'that’s what gitcms is for solo builders. i built it because i needed it, and this website is still edited with it every week.',
  ],
}

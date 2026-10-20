/**
 * The prompt the "Set up with your coding agent" dialog hands to a coding
 * agent. Marketing pages render the same constant so the two never drift.
 */
export const SETUP_CLI_COMMAND = 'npx create-gitcms@latest'

export const AGENT_SETUP_PROMPT = [
  'Set up GitCMS for this repository so my team can edit its content.',
  `In the repository root, run \`${SETUP_CLI_COMMAND} --yes\`.`,
  'It finds every website in the repository, reads each site\'s address from its framework config,',
  'and adds new sites to any existing .gitcms setup without changing sites that are already set up.',
  'If it asks for an address it couldn\'t find, use the site\'s real production URL.',
  'Check that each site\'s content folders and media folder look right, then commit and push the .gitcms folder.',
].join(' ')

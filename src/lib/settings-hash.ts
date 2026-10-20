export function formatSettingsHash(target: {
  scope: 'workspace'
  tab: string
}) {
  return `settings/${target.scope}/${target.tab}`
}

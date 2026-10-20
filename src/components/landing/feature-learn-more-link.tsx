import { Link } from '@/lib/router'
import { cn } from '@/lib/utils'

export type FeatureLearnMoreTheme = 'on-white'

const themeClass: Record<FeatureLearnMoreTheme, string> = {
  'on-white':
    'rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-400 hover:bg-neutral-50',
}

const baseClass =
  'mt-8 inline-flex items-center gap-2'

type FeatureLearnMoreDocProps = {
  theme: FeatureLearnMoreTheme
  docSplat: string
  className?: string
  children?: string
}

type FeatureLearnMoreRouteProps = {
  theme: FeatureLearnMoreTheme
  to: '/agents'
  className?: string
  children?: string
}

export function FeatureLearnMoreLink(
  props: FeatureLearnMoreDocProps | FeatureLearnMoreRouteProps,
) {
  const { theme, className: extraClassName, children = 'Learn more' } = props
  const className = cn(baseClass, themeClass[theme], extraClassName)

  if ('docSplat' in props) {
    return (
      <Link
        to="/docs/$"
        params={{ _splat: props.docSplat }}
        className={className}
      >
        {children}
        <span aria-hidden="true">&rarr;</span>
      </Link>
    )
  }

  return (
    <Link to={props.to} className={className}>
      {children}
      <span aria-hidden="true">&rarr;</span>
    </Link>
  )
}

export function FeatureTryNowLink({
  theme,
}: {
  theme: FeatureLearnMoreTheme
}) {
  return (
    <Link
      to="/$owner/$repo/$"
      params={{
        owner: 'Waishnav',
        repo: 'opencode',
        _splat: 'docs/agents.mdx',
      }}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 ${themeClass[theme]}`}
    >
      Try now
      <span aria-hidden="true">&rarr;</span>
    </Link>
  )
}

/** Targets for landing / framework feature sections (`docSplat` = path under /docs/). */
export const FEATURE_LEARN_MORE = {
  editor: { docSplat: 'features/markdown-editor' },
  mcp: { to: '/agents' as const },
  editorialWorkflow: { docSplat: 'features/editorial-workflow' },
  teams: { docSplat: 'features/access-control' },
} as const

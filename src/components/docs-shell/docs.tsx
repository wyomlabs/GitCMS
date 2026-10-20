import type { ReactNode } from 'react'
import type { Root } from 'fumadocs-core/page-tree'
import type { AstroProviderProps } from 'fumadocs-core/framework/astro'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { DocsPage, type DocsPageProps } from 'fumadocs-ui/layouts/docs/page'
import { RootProvider } from 'fumadocs-ui/provider/astro'
import { navigate } from 'astro:transitions/client'
import { GitCMSLogo } from '@/components/gitcms-logo'
import { DiscordIcon } from '@/components/icons/discord-icon'
import { DISCORD_INVITE_URL, SITE_REPOSITORY_URL } from '@/lib/support-links'
import SearchDialog from './search'

export function DocsShell({
  tree,
  children,
  pathname,
  params,
  page,
}: {
  tree: Root
  children: ReactNode
  pathname: string
  params: AstroProviderProps['params']
  page?: DocsPageProps
}) {
  return (
    <RootProvider
      pathname={pathname}
      params={params}
      navigate={navigate}
      theme={{
        attribute: 'class',
        defaultTheme: 'system',
        enableSystem: true,
        disableTransitionOnChange: true,
      }}
      search={{ SearchDialog }}
    >
      <DocsLayout
        tree={tree}
        nav={{
          title: (
            <>
              <GitCMSLogo className="size-7" />
              <span className="font-logo text-3xl font-medium tracking-tight">GitCMS</span>
            </>
          ),
          url: '/docs',
        }}
        links={[
          { text: 'Home', url: '/' },
          { text: 'Blog', url: '/blog' },
          { text: 'Changelog', url: '/changelog' },
          {
            type: 'icon',
            text: 'Discord',
            label: 'Discord',
            url: DISCORD_INVITE_URL,
            icon: <DiscordIcon />,
            external: true,
          },
        ]}
        githubUrl={SITE_REPOSITORY_URL}
      >
        <DocsPage {...page}>{children}</DocsPage>
      </DocsLayout>
    </RootProvider>
  )
}

import type { ReactNode } from 'react'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, extname, resolve } from 'node:path'
import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import type { OgScene, PublicResource } from '@/lib/public-resources'

const WIDTH = 1200
const HEIGHT = 630
const CACHE_DIR = resolve('.cache/og/astro-endpoints')
const FONT_CACHE_DIR = resolve('.cache/og/fonts')

const FONT_SOURCES = [
  {
    cacheKey: 'geist-400',
    cssUrl: 'https://fonts.googleapis.com/css2?family=Geist:wght@400&display=swap',
    name: 'Geist',
    weight: 400 as const,
  },
  {
    cacheKey: 'geist-500',
    cssUrl: 'https://fonts.googleapis.com/css2?family=Geist:wght@500&display=swap',
    name: 'Geist',
    weight: 500 as const,
  },
  {
    cacheKey: 'source-serif-4-400',
    cssUrl: 'https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400&display=swap',
    name: 'Source Serif 4',
    weight: 400 as const,
  },
  {
    cacheKey: 'source-serif-4-500',
    cssUrl: 'https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@500&display=swap',
    name: 'Source Serif 4',
    weight: 500 as const,
  },
]

let fontsPromise: Promise<Awaited<ReturnType<typeof loadFonts>>> | undefined

function truncate(text: string, max: number) {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${lastSpace > 0 ? cut.slice(0, lastSpace) : cut}…`
}

function kindLabel(resource: PublicResource) {
  const labels: Record<PublicResource['kind'], string> = {
    product: 'GitCMS',
    blog: 'Blog',
    changelog: 'Changelog',
    comparison: 'Comparison',
    alternative: 'Alternatives',
    docs: 'Documentation',
    glossary: 'Glossary',
    prompt: 'Prompt library',
    tool: 'Free tool',
    agent: 'AI agents',
    feature: 'Feature',
    persona: 'Who it’s for',
    framework: 'Framework guide',
    builder: 'AI site builders',
    page: 'GitCMS',
    index: 'GitCMS',
  }
  const indexLabels: Record<string, string> = {
    'index:agents': 'AI agents',
    'index:compare': 'Comparisons',
    'index:alternatives': 'Alternatives',
    'index:for': 'Who it’s for',
    'index:tools': 'Free tools',
  }
  return indexLabels[resource.id] ?? labels[resource.kind]
}

/** Long SEO titles keep their lead phrase, so the scene layout stays at three lines or fewer. */
function shortTitle(title: string) {
  if (title.length <= 44) return title
  const lead = title.split(/\s+—\s+|:\s+/)[0] ?? title
  return lead.length >= 12 ? lead : title
}

async function loadFonts() {
  mkdirSync(FONT_CACHE_DIR, { recursive: true })

  return Promise.all(FONT_SOURCES.map(async (source) => {
    const cachePath = resolve(FONT_CACHE_DIR, `${source.cacheKey}.bin`)
    let bytes: Uint8Array

    if (existsSync(cachePath)) {
      bytes = Uint8Array.from(readFileSync(cachePath))
    } else {
      const css = await (await fetch(source.cssUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      })).text()
      const fontUrl = css.match(/src:\s*url\(([^)]+\.(?:woff2|ttf))\)/)?.[1]
      if (!fontUrl) throw new Error(`No OG font URL found for ${source.name}`)
      bytes = new Uint8Array(await (await fetch(fontUrl)).arrayBuffer())
      writeFileSync(cachePath, bytes)
    }

    const data = new ArrayBuffer(bytes.byteLength)
    new Uint8Array(data).set(bytes)

    return {
      name: source.name,
      data,
      weight: source.weight,
      style: 'normal' as const,
    }
  }))
}

// Marketing pages: text on white, a small product scene on a black panel.
// Content pages (blog, docs, glossary, changelog, prompts): text only, so long
// titles get the full width. Lime appears only in the logo mark.
const INK = '#0a0a0a'
const TEXT = '#242424'
const MUTED = '#737373'
const FAINT = '#a3a3a3'

function asset(path: string) {
  const extension = extname(path).slice(1)
  const mime = extension === 'svg' ? 'image/svg+xml' : extension === 'jpg' ? 'image/jpeg' : `image/${extension}`
  return `data:${mime};base64,${readFileSync(resolve('public', path.replace(/^\//, ''))).toString('base64')}`
}

function sceneFor(resource: PublicResource): OgScene {
  if (resource.og) return resource.og
  const textIndexes = new Set(['index:blog', 'index:changelog', 'index:glossary', 'index:prompts'])
  if (['blog', 'changelog', 'docs', 'glossary', 'prompt'].includes(resource.kind) || textIndexes.has(resource.id)) return { type: 'text' }
  return { type: 'published' }
}

function LogoSvg({ size = 40 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="#DCF986" stroke="#B5D74E" />
      <path d="M17 4H20L7 20H4L17 4Z" fill="black" />
    </svg>
  )
}

function Brand() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <LogoSvg size={38} />
      <span style={{ fontFamily: 'Source Serif 4', fontSize: 30, fontWeight: 500, letterSpacing: '-0.02em', color: INK }}>GitCMS</span>
    </div>
  )
}

function LogoTile({ src, size = 46 }: { src: string | null; size?: number }) {
  return (
    <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: size * 0.24, border: '1px solid #e5e5e5', backgroundColor: src ? 'white' : '#fafafa' }}>
      {src ? <img src={asset(src)} width={size * 0.56} height={size * 0.56} /> : <LogoSvg size={size * 0.62} />}
    </div>
  )
}

function Card({ children, width = 420, padding = '22px 24px' }: { children: ReactNode; width?: number; padding?: string | number }) {
  return (
    <div style={{ width, display: 'flex', flexDirection: 'column', padding, borderRadius: 18, backgroundColor: 'white', boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)' }}>
      {children}
    </div>
  )
}

function Lines() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {[95, 80, 60].map((width) => <div key={width} style={{ height: 10, width: `${width}%`, borderRadius: 6, backgroundColor: '#f0f0f0' }} />)}
    </div>
  )
}

function ReviewCard({ label, action, actionColor, children }: { label: string; action: string; actionColor: string; children: ReactNode }) {
  return (
    <Card padding={0}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #f0f0f0' }}>
        <span style={{ fontFamily: 'Geist', fontSize: 17, color: MUTED }}>{label}</span>
        <span style={{ padding: '8px 14px', borderRadius: 10, backgroundColor: actionColor, color: 'white', fontFamily: 'Geist', fontSize: 16, fontWeight: 500 }}>{action}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 22 }}>{children}</div>
    </Card>
  )
}

function SceneTitle({ children }: { children: string }) {
  return <div style={{ display: 'flex', fontFamily: 'Source Serif 4', fontSize: 30, fontWeight: 500, letterSpacing: '-0.02em', color: INK }}>{children}</div>
}

function Scene({ scene }: { scene: Exclude<OgScene, { type: 'text' }> }) {
  switch (scene.type) {
    case 'published':
      return (
        <ReviewCard label="Pages / Home" action="✓ Published" actionColor="#059669">
          <SceneTitle>Websites your team can edit</SceneTitle>
          <Lines />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
            <span style={{ padding: '6px 12px', borderRadius: 999, backgroundColor: '#ecfdf5', color: '#047857', fontFamily: 'Geist', fontSize: 16, fontWeight: 500 }}>SEO 94</span>
            <span style={{ fontFamily: 'Geist', fontSize: 16, color: MUTED }}>Title · Description · Links</span>
          </div>
        </ReviewCard>
      )
    case 'agent':
      return (
        <ReviewCard label="Review · Pricing page" action="Approve" actionColor="#059669">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={asset(scene.logo)} width={26} height={26} />
            <span style={{ fontFamily: 'Geist', fontSize: 18, color: '#525252' }}>Agent suggested 3 changes</span>
          </div>
          <SceneTitle>Simple pricing for teams</SceneTitle>
          <Lines />
        </ReviewCard>
      )
    case 'files': {
      const files = scene.files === 'data'
        ? ['src/content/home.json', 'src/content/pricing.json', 'src/content/faq.json']
        : ['src/content/blog/launch.md', 'src/content/blog/pricing.md', 'src/content/docs/setup.md']
      return (
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 14, borderBottom: '1px solid #f0f0f0' }}>
            <LogoTile src={scene.logo} />
            <span style={{ fontFamily: 'Geist', fontSize: 22, color: FAINT }}>+</span>
            <LogoTile src={null} />
          </div>
          {files.map((file, index) => (
            <div key={file} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f5f5f5', fontFamily: 'Geist', fontSize: 18, color: TEXT }}>
              <span>{file}</span>
              {index === 0 ? <span style={{ color: '#059669', fontWeight: 500 }}>Edited</span> : null}
            </div>
          ))}
        </Card>
      )
    }
    case 'versus':
      // Rows describe GitCMS only; claims about the competitor belong on the page.
      return (
        <Card width={400} padding="22px 26px">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12 }}>
            <LogoSvg size={34} />
            <span style={{ fontFamily: 'Geist', fontSize: 18, color: FAINT }}>vs</span>
            <span style={{ fontFamily: 'Geist', fontSize: 18, fontWeight: 500, color: TEXT }}>{scene.competitor}</span>
          </div>
          {['Content stays in your repo', 'Visual editor for clients', 'Agents draft, people approve', 'Publish through your host'].map((label) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f0f0f0', fontFamily: 'Geist', fontSize: 19, color: TEXT }}>
              <span>{label}</span>
              <span style={{ color: '#059669', fontWeight: 500 }}>✓</span>
            </div>
          ))}
        </Card>
      )
  }
}

function pathLabel(htmlPath: string, max: number) {
  const full = htmlPath === '/' ? 'gitcms.dev' : `gitcms.dev${htmlPath}`
  return full.length > max ? `gitcms.dev/${htmlPath.split('/')[1]}` : full
}

function KindLabel({ resource }: { resource: PublicResource }) {
  return <div style={{ display: 'flex', fontFamily: 'Geist', fontSize: 18, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8a8a8a' }}>{kindLabel(resource)}</div>
}

function OgTemplate({ resource }: { resource: PublicResource }) {
  const scene = sceneFor(resource)
  const title = truncate(resource.title.replace(/\s+—\s+GitCMS$/, '').replace(/^GitCMS\s+—\s+/, ''), 90)

  if (scene.type === 'text') {
    const description = resource.description ? truncate(resource.description, 170) : ''
    return (
      <div style={{ width: WIDTH, height: HEIGHT, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '60px 72px', backgroundColor: 'white' }}>
        <Brand />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <KindLabel resource={resource} />
          <div style={{ display: 'flex', fontFamily: 'Source Serif 4', fontSize: title.length > 48 ? 64 : 76, fontWeight: 500, lineHeight: 1.08, letterSpacing: '-0.03em', color: TEXT }}>{title}</div>
          {description ? <div style={{ display: 'flex', fontFamily: 'Geist', fontSize: 25, lineHeight: 1.45, color: MUTED, maxWidth: 960 }}>{description}</div> : null}
        </div>
        <span style={{ fontFamily: 'Geist', fontSize: 19, color: FAINT }}>{pathLabel(resource.htmlPath, 64)}</span>
      </div>
    )
  }

  return (
    <div style={{ width: WIDTH, height: HEIGHT, display: 'flex', backgroundColor: 'white' }}>
      <div style={{ width: 660, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '60px 56px 56px 72px' }}>
        <Brand />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <KindLabel resource={resource} />
          <div style={{ display: 'flex', fontFamily: 'Source Serif 4', fontSize: shortTitle(title).length > 40 ? 54 : 64, fontWeight: 500, lineHeight: 1.08, letterSpacing: '-0.03em', color: TEXT }}>{shortTitle(title)}</div>
        </div>
        <span style={{ fontFamily: 'Geist', fontSize: 19, color: FAINT }}>{pathLabel(resource.htmlPath, 40)}</span>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: INK, backgroundImage: 'radial-gradient(circle at 80% 0%, #262626, #0a0a0a 60%)' }}>
        <Scene scene={scene} />
      </div>
    </div>
  )
}

function getCachePath(resource: PublicResource, fontBytes: Awaited<ReturnType<typeof loadFonts>>) {
  const hash = createHash('sha256')
  hash.update(readFileSync(resolve('src/lib/og-image.tsx')))
  hash.update(JSON.stringify({ id: resource.id, title: resource.title, description: resource.description, kind: resource.kind, htmlPath: resource.htmlPath, og: resource.og }))
  for (const font of fontBytes) hash.update(new Uint8Array(font.data))
  return resolve(CACHE_DIR, `${hash.digest('hex')}.png`)
}

export async function renderOgImage(resource: PublicResource) {
  fontsPromise ??= Promise.resolve(loadFonts())
  const fonts = await fontsPromise
  const cachePath = getCachePath(resource, fonts)
  if (existsSync(cachePath)) return readFileSync(cachePath)

  const svg = await satori(<OgTemplate resource={resource} />, { width: WIDTH, height: HEIGHT, fonts })
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng()
  mkdirSync(dirname(cachePath), { recursive: true })
  writeFileSync(cachePath, png)
  return png
}

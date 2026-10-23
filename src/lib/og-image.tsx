import type { ReactNode } from 'react'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import type { PublicResource } from '@/lib/public-resources'

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
  return labels[resource.kind]
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

function LogoSvg({ size = 44 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="#DCF986" stroke="#B5D74E" />
      <path d="M17 4H20L7 20H4L17 4Z" fill="black" />
    </svg>
  )
}

function EditorField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ width: 82, fontFamily: 'Geist', fontSize: 12, fontWeight: 500, color: '#737373' }}>
        {label}
      </span>
      {children}
    </div>
  )
}

function TagChip({ label, backgroundColor, color }: { label: string; backgroundColor: string; color: string }) {
  return (
    <span style={{ padding: '4px 8px', borderRadius: 999, backgroundColor, fontFamily: 'Geist', fontSize: 11, fontWeight: 500, color }}>
      {label}
    </span>
  )
}

function EditorMock() {
  return (
    <div style={{ width: 440, height: 530, display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', border: '1px solid #e5e5e5', borderRight: 'none', borderRadius: '20px 0 0 20px', overflow: 'hidden', boxShadow: '0 28px 72px rgba(10, 10, 10, 0.12)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '15px 18px', borderBottom: '1px solid #e5e5e5', backgroundColor: '#fafafa' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: '#FF5F57' }} />
          <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: '#FEBC2E' }} />
          <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: '#28C840' }} />
        </div>
        <span style={{ fontFamily: 'Geist', fontSize: 13, fontWeight: 500, color: '#737373' }}>getting-started.md</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 18px 22px', flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 14, borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', fontFamily: 'Source Serif 4', fontSize: 25, fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#0a0a0a' }}>Getting Started with Astro</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <EditorField label="Date"><div style={{ display: 'flex', flex: 1, padding: '6px 9px', borderRadius: 10, backgroundColor: '#f5f5f5', fontFamily: 'Geist', fontSize: 12, color: '#171717' }}>2026-02-21</div></EditorField>
            <EditorField label="Description"><div style={{ display: 'flex', flex: 1, padding: '6px 9px', borderRadius: 10, backgroundColor: '#f5f5f5', fontFamily: 'Geist', fontSize: 12, color: '#171717' }}>A quick guide to using Astro with GitCMS.</div></EditorField>
            <EditorField label="Tags"><div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px', borderRadius: 10, backgroundColor: '#f5f5f5' }}><TagChip label="astro" backgroundColor="#dbeafe" color="#1d4ed8" /><TagChip label="tutorial" backgroundColor="#dcfce7" color="#15803d" /></div></EditorField>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', fontFamily: 'Source Serif 4', fontSize: 22, fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.02em', color: '#0a0a0a' }}>Why Astro + GitCMS?</div>
          <p style={{ margin: 0, fontFamily: 'Geist', fontSize: 13, lineHeight: 1.5, color: '#404040' }}>Astro content collections pair well with GitCMS. Your markdown stays in the repo and the editor stays familiar.</p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}><div style={{ display: 'flex', padding: '2px 0 0', fontFamily: 'Geist', fontSize: 16, lineHeight: 1.3, color: '#737373' }}>/</div></div>
        </div>
      </div>
    </div>
  )
}

function MenuRow({ label, shortcut = '', active = false }: { label: string; shortcut?: string; active?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 9px', borderRadius: 8, backgroundColor: active ? '#f5f5f5' : 'transparent', fontFamily: 'Geist', fontSize: 12, fontWeight: active ? 500 : 400, color: active ? '#171717' : '#525252' }}>
      <span style={{ display: 'flex' }}>{label}</span><span style={{ display: 'flex', color: '#a3a3a3' }}>{shortcut}</span>
    </div>
  )
}

function SlashMenuOverlay() {
  return (
    <div style={{ width: 248, display: 'flex', flexDirection: 'column', gap: 2, padding: '10px 8px 8px', borderRadius: 12, border: '1px solid #e5e5e5', backgroundColor: '#ffffff', boxShadow: '0 18px 34px rgba(10, 10, 10, 0.12)' }}>
      <div style={{ display: 'flex', padding: '0 8px 6px', fontFamily: 'Geist', fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a3a3a3' }}>Basic blocks</div>
      <MenuRow label="Text" active /><MenuRow label="Heading 1" shortcut="# " /><MenuRow label="Heading 2" shortcut="## " /><MenuRow label="Heading 3" shortcut="### " /><MenuRow label="Bulleted list" shortcut="- " /><MenuRow label="Numbered list" shortcut="1. " /><MenuRow label="To-do list" shortcut="[] " /><MenuRow label="Code Block" shortcut="```" />
    </div>
  )
}

function OgTemplate({ resource }: { resource: PublicResource }) {
  const pathLabel = resource.htmlPath === '/' ? 'gitcms.dev' : `gitcms.dev${resource.htmlPath}`
  const title = truncate(resource.title.replace(/\s+—\s+GitCMS$/, ''), 70)
  const description = resource.description ? truncate(resource.description, 136) : ''

  return (
    <div style={{ width: 1200, height: 630, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', padding: '72px 0 60px 80px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, backgroundColor: '#DCF986' }} />
      <div style={{ position: 'absolute', top: 6, bottom: 0, left: 712, width: 1, backgroundColor: '#f5f5f5' }} />
      <div style={{ position: 'absolute', top: 6, bottom: 0, left: 944, width: 1, backgroundColor: '#fafafa' }} />
      <div style={{ display: 'flex', alignItems: 'center' }}><div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><LogoSvg size={44} /><span style={{ fontFamily: 'Source Serif 4', fontSize: 36, fontWeight: 500, letterSpacing: '-0.02em', color: '#0a0a0a' }}>GitCMS</span></div></div>
      <div style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'space-between', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 18, maxWidth: 560 }}>
          <div style={{ display: 'flex', fontFamily: 'Geist', fontSize: 13, fontWeight: 500, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{kindLabel(resource)}</div>
          <h1 style={{ fontFamily: 'Source Serif 4', fontSize: title.length > 42 ? 42 : 50, fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.025em', color: '#0a0a0a', margin: 0 }}>{title}</h1>
          {description ? <p style={{ fontFamily: 'Geist', fontSize: 21, fontWeight: 400, lineHeight: 1.55, color: '#737373', margin: 0, maxWidth: 500 }}>{description}</p> : null}
        </div>
        <div style={{ width: 404, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', position: 'relative', overflow: 'visible', opacity: 0.84 }}><EditorMock /><div style={{ display: 'flex', position: 'absolute', left: 24, top: 356 }}><SlashMenuOverlay /></div></div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ fontFamily: 'Geist', fontSize: 18, fontWeight: 500, color: '#a3a3a3', letterSpacing: '0.02em' }}>{pathLabel}</span></div>
    </div>
  )
}

function getCachePath(resource: PublicResource, fontBytes: Awaited<ReturnType<typeof loadFonts>>) {
  const hash = createHash('sha256')
  hash.update(readFileSync(resolve('src/lib/og-image.tsx')))
  hash.update(JSON.stringify({ title: resource.title, description: resource.description, kind: resource.kind, htmlPath: resource.htmlPath }))
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

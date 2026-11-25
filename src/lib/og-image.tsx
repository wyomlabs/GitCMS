import type { ReactNode } from 'react'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, extname, resolve } from 'node:path'
import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import type { OgOrbitOut, OgScene, PublicResource } from '@/lib/public-resources'

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
    cacheKey: 'geist-600',
    cssUrl: 'https://fonts.googleapis.com/css2?family=Geist:wght@600&display=swap',
    name: 'Geist',
    weight: 600 as const,
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

const CANVAS = '#f5f5f2'
const INK = '#141414'
const TEXT = '#242424'
const MUTED = '#5c5c58'
const FAINT = '#8a8a84'
const BORDER = '#e2e2dc'
const LIME = '#DCF986'
const LIME_STROKE = '#B5D74E'

const assetCache = new Map<string, string>()

function truncate(text: string, max: number) {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${lastSpace > 0 ? cut.slice(0, lastSpace) : cut}…`
}

/** Prefer a complete first sentence for OG sublines so cards never trail off mid-thought. */
function cleanSubtitle(text: string, max: number) {
  if (text.length <= max) return text
  const firstSentence = text.match(/^[^.!?]+[.!?]/)?.[0]?.trim()
  if (firstSentence && firstSentence.length >= 28 && firstSentence.length <= max) return firstSentence
  return truncate(text, max)
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

/** Long SEO titles keep their lead phrase, so marketing cards stay crisp at three lines or fewer. */
function shortTitle(title: string) {
  if (title.length <= 48) return title
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

function asset(path: string) {
  const cached = assetCache.get(path)
  if (cached) return cached
  const extension = extname(path).slice(1)
  const mime = extension === 'svg' ? 'image/svg+xml' : extension === 'jpg' ? 'image/jpeg' : `image/${extension}`
  const dataUri = `data:${mime};base64,${readFileSync(resolve('public', path.replace(/^\//, ''))).toString('base64')}`
  assetCache.set(path, dataUri)
  return dataUri
}

function sceneFor(resource: PublicResource): OgScene {
  if (resource.og) return resource.og
  const textIndexes = new Set(['index:blog', 'index:changelog', 'index:glossary', 'index:prompts'])
  if (['blog', 'changelog', 'docs', 'glossary', 'prompt'].includes(resource.kind) || textIndexes.has(resource.id)) return { type: 'text' }
  return { type: 'orbit', out: [{ label: 'WordPress', logo: '/logos/wordpress.svg' }, { label: 'Webflow', logo: '/logos/webflow.svg' }, { label: 'Framer', logo: '/logos/framer.svg' }] }
}

function LogoSvg({ size = 40 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill={LIME} stroke={LIME_STROKE} />
      <path d="M17 4H20L7 20H4L17 4Z" fill="#000000" />
    </svg>
  )
}

function Brand({ size = 38 }: { size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <LogoSvg size={size} />
      <span style={{ fontFamily: 'Source Serif 4', fontSize: 30, fontWeight: 500, letterSpacing: '-0.02em', color: INK }}>GitCMS</span>
    </div>
  )
}

function GridBackground() {
  const verticalLines = Array.from({ length: 19 }, (_, index) => (index + 1) * 64)
  const horizontalLines = Array.from({ length: 9 }, (_, index) => (index + 1) * 64)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={WIDTH}
      height={HEIGHT}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      {verticalLines.map((x) => (
        <line key={`v-${x}`} x1={x} y1={0} x2={x} y2={HEIGHT} stroke="#000000" strokeOpacity="0.035" strokeWidth="1" />
      ))}
      {horizontalLines.map((y) => (
        <line key={`h-${y}`} x1={0} y1={y} x2={WIDTH} y2={y} stroke="#000000" strokeOpacity="0.035" strokeWidth="1" />
      ))}
    </svg>
  )
}

function LimeAura({ cx = 930, cy = 315, r = 270 }: { cx?: number; cy?: number; r?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={WIDTH}
      height={HEIGHT}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      <defs>
        <radialGradient id="lime-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={LIME} stopOpacity="0.46" />
          <stop offset="100%" stopColor={LIME} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="url(#lime-aura)" />
    </svg>
  )
}

function EyebrowPill({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, backgroundColor: '#ffffff', border: `1px solid ${BORDER}`, alignSelf: 'flex-start' }}>
      <div style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: '#84cc16' }} />
      <span style={{ fontFamily: 'Geist', fontSize: 14, fontWeight: 600, color: '#404040' }}>{label}</span>
    </div>
  )
}

function Tile({ src, size = 38, radius = 10, padding, bg = '#ffffff', border = '#e5e5df' }: { src: string | null; size?: number; radius?: number; padding?: number; bg?: string; border?: string }) {
  const iconSize = padding ? size - padding * 2 : Math.round(size * 0.54)
  return (
    <div style={{ width: size, height: size, borderRadius: radius, backgroundColor: bg, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {src ? <img src={asset(src)} width={iconSize} height={iconSize} style={{ objectFit: 'contain' }} /> : <LogoSvg size={Math.round(size * 0.62)} />}
    </div>
  )
}

function Pill({ label, tone }: { label: string; tone: 'green' | 'sky' | 'violet' | 'amber' | 'neutral' }) {
  const palette = {
    green: { bg: '#ecfdf5', color: '#047857', border: '#a7f3d0' },
    sky: { bg: '#f0f9ff', color: '#0369a1', border: '#bae6fd' },
    violet: { bg: '#f5f3ff', color: '#6d28d9', border: '#ddd6fe' },
    amber: { bg: '#fffbeb', color: '#b45309', border: '#fde68a' },
    neutral: { bg: '#f4f4f0', color: '#525252', border: '#e2e2dc' },
  }[tone]
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '5px 12px', borderRadius: 999, backgroundColor: palette.bg, color: palette.color, border: `1px solid ${palette.border}`, fontFamily: 'Geist', fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
      {label}
    </div>
  )
}

function FloatingCard({ children, width = 500 }: { children: ReactNode; width?: number }) {
  return (
    <div style={{ width, display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', border: `1px solid ${BORDER}`, borderRadius: 20, boxShadow: '0 22px 52px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)', overflow: 'hidden' }}>
      {children}
    </div>
  )
}

function XBadge({ size = 24 }: { size?: number }) {
  return (
    <div style={{ position: 'absolute', top: -8, right: -8, width: size, height: size, borderRadius: 999, backgroundColor: '#fff5f5', border: '1.5px solid #fecaca', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Geist', fontSize: Math.round(size * 0.6), fontWeight: 600 }}>
      ×
    </div>
  )
}

function OuterOrbitNode({ item, left, top, size, rotate }: { item: OgOrbitOut; left: number; top: number; size: number; rotate: number }) {
  const iconSize = Math.round(size * 0.52)
  const shortLabel = item.label.length > 9 ? item.label.split(' ')[0] ?? item.label : item.label
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.25),
        backgroundColor: '#fcfcfa',
        border: '1px solid #e7e7e1',
        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `rotate(${rotate}deg)`,
      }}
    >
      {item.logo ? (
        <img src={asset(item.logo)} width={iconSize} height={iconSize} style={{ opacity: 0.55, objectFit: 'contain' }} />
      ) : (
        <span style={{ fontFamily: 'Geist', fontSize: shortLabel.length > 6 ? 13 : 15, fontWeight: 600, color: '#6b6b66', letterSpacing: '-0.02em' }}>{shortLabel}</span>
      )}
      <XBadge size={size >= 72 ? 26 : 23} />
    </div>
  )
}

function OrbitScene({ out }: { out: ReadonlyArray<OgOrbitOut> }) {
  // Panel is 590x630; center shifted right to (415, 315) so the far outer
  // dashed ring (r=355) creates a wide visual gulf from the tight lime core (r=112).
  const isSingle = out.length === 1
  const singleOut = out[0]
  const innerNodes = [
    { src: '/ai-logos/claude-orange.svg', left: 381, top: 169, icon: 36 },
    { src: '/ssg-logos/astro.svg', left: 269, top: 281, icon: 36 },
    { src: '/logos/google-search-console.svg', left: 381, top: 393, icon: 35 },
    { src: isSingle ? '/ssg-logos/nextjs.svg' : '/ai-logos/openai-bw.svg', left: 493, top: 281, icon: 35 },
  ]

  return (
    <div style={{ flex: 1, position: 'relative', display: 'flex', height: HEIGHT }}>
      {/* Far outer dashed orbit ring (710px diameter, r=355) */}
      <svg xmlns="http://www.w3.org/2000/svg" width={710} height={710} viewBox="0 0 710 710" style={{ position: 'absolute', left: 60, top: -40 }}>
        <circle cx="355" cy="355" r="350" fill="none" stroke="#d4d4cc" strokeWidth="2.5" strokeDasharray="8 8" />
      </svg>

      {/* Tight inner lime halo (224px diameter, r=112) */}
      <div style={{ position: 'absolute', left: 303, top: 203, width: 224, height: 224, borderRadius: 999, backgroundColor: 'rgba(220, 249, 134, 0.44)', border: '2px solid rgba(181, 215, 78, 0.58)' }} />

      {/* Center GitCMS core */}
      <div style={{ position: 'absolute', left: 363, top: 263, width: 104, height: 104, borderRadius: 26, backgroundColor: '#ffffff', border: `2.5px solid ${LIME_STROKE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 38px rgba(154, 196, 42, 0.24), 0 4px 10px rgba(0, 0, 0, 0.06)' }}>
        <LogoSvg size={72} />
      </div>

      {/* Inner stack icons hugging the lime core */}
      {innerNodes.map((node) => (
        <div key={node.src} style={{ position: 'absolute', left: node.left, top: node.top, width: 68, height: 68, borderRadius: 17, backgroundColor: '#ffffff', border: '1px solid #e4e8d8', boxShadow: '0 10px 26px rgba(0, 0, 0, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={asset(node.src)} width={node.icon} height={node.icon} style={{ objectFit: 'contain' }} />
        </div>
      ))}

      {/* Far outer legacy stack nodes with red X */}
      {isSingle && singleOut ? (
        <OuterOrbitNode item={singleOut} left={20} top={275} size={80} rotate={-7} />
      ) : (
        <>
          {out[0] ? <OuterOrbitNode item={out[0]} left={110} top={76} size={58} rotate={-8} /> : null}
          {out[1] ? <OuterOrbitNode item={out[1]} left={32} top={286} size={58} rotate={7} /> : null}
          {out[2] ? <OuterOrbitNode item={out[2]} left={110} top={494} size={58} rotate={-6} /> : null}
        </>
      )}
    </div>
  )
}

function Scene({ scene }: { scene: Exclude<OgScene, { type: 'text' | 'orbit' }> }) {
  switch (scene.type) {
    case 'fleet':
      return (
        <FloatingCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px', backgroundColor: '#fafaf8', borderBottom: '1px solid #ededeb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <LogoSvg size={22} />
              <span style={{ fontFamily: 'Geist', fontSize: 17, fontWeight: 600, color: INK }}>Brightside Agency</span>
            </div>
            <span style={{ fontFamily: 'Geist', fontSize: 14, color: FAINT }}>12 client sites</span>
          </div>
          {[
            { logo: '/ssg-logos/astro.svg', domain: 'acme-roofing.com', pill: 'Client editing', tone: 'green' as const },
            { logo: '/logos/google-search-console.svg', domain: 'northstar.dental', pill: 'SEO · +38% clicks', tone: 'sky' as const },
            { logo: '/ai-logos/claude-orange.svg', domain: 'paperco.studio', pill: '2 agent drafts', tone: 'violet' as const },
            { logo: '/logos/cloudflare.svg', domain: 'harborcafe.co', pill: 'Live · $0 host', tone: 'neutral' as const },
          ].map((row, index) => (
            <div key={row.domain} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '17px 22px', borderBottom: index < 3 ? '1px solid #f2f2ef' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <Tile src={row.logo} size={36} />
                <span style={{ fontFamily: 'Geist', fontSize: 17, fontWeight: 600, color: INK }}>{row.domain}</span>
              </div>
              <Pill label={row.pill} tone={row.tone} />
            </div>
          ))}
        </FloatingCard>
      )

    case 'handoff':
      return (
        <FloatingCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px', backgroundColor: '#fafaf8', borderBottom: '1px solid #ededeb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Tile src="/ssg-logos/astro.svg" size={32} radius={8} />
              <span style={{ fontFamily: 'Geist', fontSize: 17, fontWeight: 600, color: INK }}>acme-roofing.com</span>
            </div>
            <Pill label="Client access" tone="green" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '16px 18px', borderRadius: 14, backgroundColor: '#f7f7f4', border: '1px solid #e9e9e3' }}>
              <span style={{ fontFamily: 'Geist', fontSize: 13, fontWeight: 600, color: FAINT }}>VISUAL EDITOR · NO GITHUB NEEDED</span>
              <span style={{ fontFamily: 'Source Serif 4', fontSize: 28, fontWeight: 500, color: INK }}>Same-day roof repair</span>
              <span style={{ fontFamily: 'Geist', fontSize: 15, color: MUTED }}>Edited by jess@acmeroofing.com · 2m ago</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderRadius: 12, backgroundColor: '#ffffff', border: `1px solid ${BORDER}` }}>
              <span style={{ fontFamily: 'Geist', fontSize: 15, fontWeight: 500, color: TEXT }}>Saved as Git commit #412</span>
              <span style={{ fontFamily: 'Geist', fontSize: 14, fontWeight: 600, color: '#059669' }}>✓ Deployed</span>
            </div>
          </div>
        </FloatingCard>
      )

    case 'seo':
      return (
        <FloatingCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px', backgroundColor: '#fafaf8', borderBottom: '1px solid #ededeb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src={asset('/logos/google-search-console.svg')} width={22} height={22} />
              <span style={{ fontFamily: 'Geist', fontSize: 17, fontWeight: 600, color: INK }}>SEO opportunities</span>
            </div>
            <Pill label="+38% clicks" tone="green" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 22 }}>
            {[
              { query: 'metal roof cost texas', badge: 'Near page 1', meta: 'Pos 11.4 · 5.9k imp', tone: 'sky' as const },
              { query: '24 hour roofer austin', badge: 'Low CTR', meta: 'Pos 6.2 · 3.1k imp', tone: 'amber' as const },
            ].map((row) => (
              <div key={row.query} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 12, backgroundColor: '#f8f8f5', border: '1px solid #ecece6' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontFamily: 'Geist', fontSize: 16, fontWeight: 600, color: INK }}>{row.query}</span>
                  <span style={{ fontFamily: 'Geist', fontSize: 13, color: FAINT }}>{row.meta}</span>
                </div>
                <Pill label={row.badge} tone={row.tone} />
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', borderRadius: 12, backgroundColor: '#141414', color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src={asset('/ai-logos/claude-orange.svg')} width={18} height={18} />
                <span style={{ fontFamily: 'Geist', fontSize: 15, fontWeight: 500 }}>Claude drafted page refresh</span>
              </div>
              <span style={{ fontFamily: 'Geist', fontSize: 13, fontWeight: 600, color: LIME }}>Review →</span>
            </div>
          </div>
        </FloatingCard>
      )

    case 'startup-review':
      return (
        <FloatingCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px', backgroundColor: '#fafaf8', borderBottom: '1px solid #ededeb' }}>
            <span style={{ fontFamily: 'Geist', fontSize: 16, fontWeight: 600, color: INK }}>Review · Pricing page</span>
            <div style={{ display: 'flex', padding: '7px 14px', borderRadius: 10, backgroundColor: '#059669', color: '#ffffff', fontFamily: 'Geist', fontSize: 14, fontWeight: 600 }}>Approve &amp; ship</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 15px', borderRadius: 12, backgroundColor: '#f8f8f5', border: '1px solid #ecece6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src={asset('/ai-logos/claude-orange.svg')} width={20} height={20} />
                <span style={{ fontFamily: 'Geist', fontSize: 15, color: TEXT }}>Marketing + Claude edited 3 blocks</span>
              </div>
              <Pill label="Preview ready" tone="sky" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '14px 16px', borderRadius: 12, border: `1px solid ${BORDER}` }}>
              <span style={{ fontFamily: 'Geist', fontSize: 14, color: '#991b1b', textDecoration: 'line-through' }}>Team plan · $49 / seat</span>
              <span style={{ fontFamily: 'Geist', fontSize: 16, fontWeight: 600, color: '#047857' }}>Team plan · Unlimited editors</span>
            </div>
            <span style={{ fontFamily: 'Geist', fontSize: 14, color: FAINT }}>Zero engineering tickets · Merges to main on approve</span>
          </div>
        </FloatingCard>
      )

    case 'editor':
      return (
        <FloatingCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 22px', backgroundColor: '#fafaf8', borderBottom: '1px solid #ededeb' }}>
            <span style={{ fontFamily: 'Geist', fontSize: 15, fontWeight: 500, color: MUTED }}>src/content/blog/launch.mdx</span>
            <Pill label="Visual mode" tone="green" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 22 }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, padding: '10px 14px', borderRadius: 10, backgroundColor: '#f8f8f5', border: '1px solid #ecece6' }}>
                <span style={{ fontFamily: 'Geist', fontSize: 12, color: FAINT }}>FRONTMATTER · DATE</span>
                <span style={{ fontFamily: 'Geist', fontSize: 15, fontWeight: 600, color: INK }}>Nov 25, 2026</span>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, padding: '10px 14px', borderRadius: 10, backgroundColor: '#f8f8f5', border: '1px solid #ecece6' }}>
                <span style={{ fontFamily: 'Geist', fontSize: 12, color: FAINT }}>DATA FILE</span>
                <span style={{ fontFamily: 'Geist', fontSize: 15, fontWeight: 600, color: INK }}>navigation.json</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '16px 18px', borderRadius: 14, border: `1px solid ${BORDER}` }}>
              <span style={{ fontFamily: 'Source Serif 4', fontSize: 27, fontWeight: 500, color: INK }}>Launch week recap</span>
              <span style={{ fontFamily: 'Geist', fontSize: 15, color: MUTED }}>Type / for headings, callouts, images, and MDX components.</span>
            </div>
          </div>
        </FloatingCard>
      )

    case 'board':
      return (
        <FloatingCard width={510}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 22px', backgroundColor: '#fafaf8', borderBottom: '1px solid #ededeb' }}>
            <span style={{ fontFamily: 'Geist', fontSize: 16, fontWeight: 600, color: INK }}>Content board</span>
            <span style={{ fontFamily: 'Geist', fontSize: 14, color: FAINT }}>Review before publish</span>
          </div>
          <div style={{ display: 'flex', gap: 12, padding: 20 }}>
            {[
              { name: 'Draft', dot: '#0ea5e9', card: 'Q4 pricing guide', meta: 'Claude · MCP' },
              { name: 'Review', dot: '#8b5cf6', card: 'Hero copy update', meta: '2 comments' },
              { name: 'Published', dot: '#10b981', card: 'Astro migration', meta: 'Committed' },
            ].map((col) => (
              <div key={col.name} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, padding: 12, borderRadius: 14, backgroundColor: '#f8f8f5', border: '1px solid #ecece6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: col.dot }} />
                  <span style={{ fontFamily: 'Geist', fontSize: 14, fontWeight: 600, color: INK }}>{col.name}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 12, borderRadius: 10, backgroundColor: '#ffffff', border: `1px solid ${BORDER}` }}>
                  <span style={{ fontFamily: 'Geist', fontSize: 14, fontWeight: 600, color: INK, lineHeight: 1.3 }}>{col.card}</span>
                  <span style={{ fontFamily: 'Geist', fontSize: 12, color: FAINT }}>{col.meta}</span>
                </div>
              </div>
            ))}
          </div>
        </FloatingCard>
      )

    case 'change-requests':
      return (
        <FloatingCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 22px', backgroundColor: '#fafaf8', borderBottom: '1px solid #ededeb' }}>
            <span style={{ fontFamily: 'Geist', fontSize: 15, fontWeight: 500, color: '#525252' }}>Preview · acme-roofing.com</span>
            <Pill label="✓ Changed on preview" tone="green" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', borderRadius: 14, backgroundColor: '#f7f7f4', border: `1.5px solid ${INK}` }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontFamily: 'Geist', fontSize: 13, color: FAINT }}>Hero headline</span>
                <span style={{ fontFamily: 'Source Serif 4', fontSize: 26, fontWeight: 500, color: INK }}>Same-day roof repair</span>
              </div>
              <div style={{ width: 34, height: 34, borderRadius: 999, backgroundColor: LIME, border: `1.5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Geist', fontSize: 14, fontWeight: 600, color: INK }}>F1</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 12, backgroundColor: '#ffffff', border: `1px solid ${BORDER}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 999, backgroundColor: INK, color: LIME, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Geist', fontSize: 12, fontWeight: 600 }}>F2</div>
                <span style={{ fontFamily: 'Geist', fontSize: 15, color: '#404040' }}>“Make phone button sticky”</span>
              </div>
              <span style={{ fontFamily: 'Geist', fontSize: 13, fontWeight: 600, color: '#059669' }}>Resolved</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 18px', borderRadius: 12, backgroundColor: INK, color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <img src={asset('/ai-logos/claude-orange.svg')} width={18} height={18} />
                <span style={{ fontFamily: 'Geist', fontSize: 15, fontWeight: 500 }}>Copy prompt for coding agent</span>
              </div>
              <span style={{ fontFamily: 'Geist', fontSize: 16, color: LIME }}>→</span>
            </div>
          </div>
        </FloatingCard>
      )

    case 'agent':
      return (
        <FloatingCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px', backgroundColor: '#fafaf8', borderBottom: '1px solid #ededeb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Tile src={scene.logo} size={34} radius={9} />
              <span style={{ fontFamily: 'Geist', fontSize: 16, fontWeight: 600, color: INK }}>{scene.name} · MCP</span>
            </div>
            <div style={{ display: 'flex', padding: '7px 14px', borderRadius: 10, backgroundColor: '#059669', color: '#ffffff', fontFamily: 'Geist', fontSize: 14, fontWeight: 600 }}>Approve</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'Geist', fontSize: 15, color: MUTED }}>Drafted 3 updates in Review</span>
              <Pill label="No direct push" tone="violet" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '16px 18px', borderRadius: 14, backgroundColor: '#f8f8f5', border: '1px solid #ecece6' }}>
              <span style={{ fontFamily: 'Source Serif 4', fontSize: 27, fontWeight: 500, color: INK }}>Simple pricing for agencies</span>
              <span style={{ fontFamily: 'Geist', fontSize: 15, color: FAINT }}>src/content/pages/pricing.mdx · Preview ready</span>
            </div>
          </div>
        </FloatingCard>
      )

    case 'files': {
      const rows = scene.files === 'data'
        ? [
            { path: 'content/pages/home.md', pill: 'Client edited', tone: 'green' as const },
            { path: 'data/site.json', pill: 'Menu & footer', tone: 'sky' as const },
            { path: 'content/blog/launch.md', pill: 'Claude draft', tone: 'violet' as const },
          ]
        : [
            { path: 'src/content/blog/launch.mdx', pill: 'Client edited', tone: 'green' as const },
            { path: 'src/content/pages/pricing.mdx', pill: 'Claude draft', tone: 'violet' as const },
            { path: 'src/data/navigation.json', pill: 'Site data', tone: 'neutral' as const },
          ]
      return (
        <FloatingCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px', backgroundColor: '#fafaf8', borderBottom: '1px solid #ededeb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Tile src={scene.logo} size={42} radius={11} />
              <span style={{ fontFamily: 'Geist', fontSize: 20, color: FAINT }}>+</span>
              <Tile src={null} size={42} radius={11} bg="#f7fee7" border={LIME_STROKE} />
              <span style={{ fontFamily: 'Geist', fontSize: 17, fontWeight: 600, color: INK, marginLeft: 4 }}>{scene.name} + GitCMS</span>
            </div>
          </div>
          {rows.map((row, index) => (
            <div key={row.path} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '17px 22px', borderBottom: index < rows.length - 1 ? '1px solid #f2f2ef' : 'none' }}>
              <span style={{ fontFamily: 'Geist', fontSize: 16, fontWeight: 500, color: TEXT }}>{row.path}</span>
              <Pill label={row.pill} tone={row.tone} />
            </div>
          ))}
        </FloatingCard>
      )
    }

    case 'versus': {
      const initial = scene.competitor.slice(0, 1).toUpperCase()
      return (
        <FloatingCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 26px', backgroundColor: '#fafaf8', borderBottom: '1px solid #ededeb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <LogoSvg size={32} />
              <span style={{ fontFamily: 'Source Serif 4', fontSize: 22, fontWeight: 500, color: INK }}>GitCMS</span>
            </div>
            <div style={{ display: 'flex', padding: '4px 11px', borderRadius: 999, backgroundColor: '#efefea', fontFamily: 'Geist', fontSize: 14, fontWeight: 600, color: FAINT }}>vs</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {scene.logo ? (
                <Tile src={scene.logo} size={36} radius={9} />
              ) : (
                <div style={{ width: 34, height: 34, borderRadius: 9, backgroundColor: '#ffffff', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Geist', fontSize: 16, fontWeight: 600, color: MUTED }}>{initial}</div>
              )}
              <span style={{ fontFamily: 'Geist', fontSize: 18, fontWeight: 600, color: '#404040' }}>{scene.competitor}</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '6px 26px 14px 26px' }}>
            {['Plain files in your Git repo', 'Visual editor for clients', 'Agents draft, people approve', 'Publish through your host'].map((label, index) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: index < 3 ? '1px solid #f0f0ec' : 'none', fontFamily: 'Geist', fontSize: 18, color: TEXT }}>
                <span>{label}</span>
                <span style={{ color: '#059669', fontWeight: 600 }}>✓</span>
              </div>
            ))}
          </div>
        </FloatingCard>
      )
    }

    case 'tool':
      return (
        <FloatingCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 22px', backgroundColor: '#fafaf8', borderBottom: '1px solid #ededeb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: '#e2e2dc' }} />
              <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: '#e2e2dc' }} />
              <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: '#e2e2dc' }} />
              <span style={{ fontFamily: 'Geist', fontSize: 15, fontWeight: 600, color: INK, marginLeft: 8 }}>{scene.filename}</span>
            </div>
            <Pill label={scene.badge} tone="green" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 18, borderRadius: 14, backgroundColor: '#f8f8f5', border: '1px solid #ecece6' }}>
              <span style={{ fontFamily: 'Source Serif 4', fontSize: 26, fontWeight: 500, color: INK }}>Edit visually in your browser</span>
              <span style={{ fontFamily: 'Geist', fontSize: 15, color: MUTED }}>Copy, download, or export a clean patch. Nothing uploaded to a server.</span>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Pill label="No account" tone="neutral" />
              <Pill label="Instant export" tone="neutral" />
              <Pill label="Git-friendly" tone="sky" />
            </div>
          </div>
        </FloatingCard>
      )

    case 'extension':
      return (
        <FloatingCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px', backgroundColor: '#fafaf8', borderBottom: '1px solid #ededeb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Tile src="/logos/chrome.svg" size={34} radius={9} />
              <Tile src="/logos/firefox.svg" size={34} radius={9} />
            </div>
            <Pill label="Free extension" tone="green" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderRadius: 12, backgroundColor: '#f8f8f5', border: `1.5px solid ${INK}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <LogoSvg size={22} />
                <span style={{ fontFamily: 'Geist', fontSize: 16, fontWeight: 600, color: INK }}>gitcms acme/marketing-site</span>
              </div>
              <span style={{ fontFamily: 'Geist', fontSize: 15, color: FAINT }}>↵</span>
            </div>
            <span style={{ fontFamily: 'Geist', fontSize: 15, color: MUTED }}>Right-click any GitHub repo, folder, or Markdown file to open it straight in GitCMS.</span>
          </div>
        </FloatingCard>
      )

    case 'audiences':
      return (
        <FloatingCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px', backgroundColor: '#fafaf8', borderBottom: '1px solid #ededeb' }}>
            <span style={{ fontFamily: 'Geist', fontSize: 16, fontWeight: 600, color: INK }}>Choose your workflow</span>
            <Pill label="4 setups" tone="neutral" />
          </div>
          {[
            { name: 'Agencies', note: 'Manage every client site in one workspace', tone: 'green' as const },
            { name: 'Freelancers', note: 'Hand off Astro sites without support tickets', tone: 'sky' as const },
            { name: 'Solo builders', note: 'Search Console SEO + blog & changelog', tone: 'amber' as const },
            { name: 'Startups', note: 'Marketing & agents ship with review', tone: 'violet' as const },
          ].map((row, index) => (
            <div key={row.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 22px', borderBottom: index < 3 ? '1px solid #f2f2ef' : 'none' }}>
              <span style={{ fontFamily: 'Geist', fontSize: 16, fontWeight: 600, color: INK }}>{row.name}</span>
              <span style={{ fontFamily: 'Geist', fontSize: 14, color: MUTED }}>{row.note}</span>
            </div>
          ))}
        </FloatingCard>
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
  const rawTitle = resource.title.replace(/\s+—\s+GitCMS$/, '').replace(/^GitCMS\s+—\s+/, '')

  if (scene.type === 'text') {
    const title = truncate(rawTitle, 90)
    const description = resource.description ? truncate(resource.description, 170) : ''
    return (
      <div style={{ width: WIDTH, height: HEIGHT, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '60px 72px', backgroundColor: '#ffffff' }}>
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

  const eyebrow = resource.ogCopy?.eyebrow ?? kindLabel(resource)
  const titleLines = resource.ogCopy?.titleLines
  const headline = truncate(resource.ogCopy?.title ?? shortTitle(rawTitle), 68)
  const subtitle = cleanSubtitle(resource.ogCopy?.subtitle ?? resource.description, 118)
  const headlineSize = titleLines ? 52 : headline.length > 44 ? 48 : headline.length > 28 ? 54 : 60

  return (
    <div style={{ width: WIDTH, height: HEIGHT, display: 'flex', position: 'relative', backgroundColor: CANVAS, overflow: 'hidden' }}>
      <GridBackground />
      {scene.type !== 'orbit' ? <LimeAura /> : null}

      <div style={{ width: scene.type === 'orbit' ? 625 : 600, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: scene.type === 'orbit' ? '50px 12px 46px 64px' : '50px 24px 46px 64px', position: 'relative' }}>
        <Brand size={40} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <EyebrowPill label={eyebrow} />
          {titleLines ? (
            <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Source Serif 4', fontSize: headlineSize, fontWeight: 500, lineHeight: 1.06, letterSpacing: '-0.03em', color: INK }}>
              <span>{titleLines[0]}</span>
              <span>{titleLines[1]}</span>
            </div>
          ) : (
            <div style={{ display: 'flex', fontFamily: 'Source Serif 4', fontSize: headlineSize, fontWeight: 500, lineHeight: 1.06, letterSpacing: '-0.03em', color: INK }}>
              {headline}
            </div>
          )}
          {subtitle ? (
            <div style={{ display: 'flex', fontFamily: 'Geist', fontSize: 20, lineHeight: 1.42, color: MUTED, maxWidth: 500 }}>
              {subtitle}
            </div>
          ) : null}
        </div>

        <span style={{ fontFamily: 'Geist', fontSize: 17, color: FAINT }}>{pathLabel(resource.htmlPath, 44)}</span>
      </div>

      {scene.type === 'orbit' ? (
        <OrbitScene out={scene.out} />
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingRight: 44, position: 'relative' }}>
          <Scene scene={scene} />
        </div>
      )}
    </div>
  )
}

function getCachePath(resource: PublicResource, fontBytes: Awaited<ReturnType<typeof loadFonts>>) {
  const hash = createHash('sha256')
  hash.update(readFileSync(resolve('src/lib/og-image.tsx')))
  hash.update(readFileSync(resolve('public/logos/google-search-console.svg')))
  hash.update(JSON.stringify({ id: resource.id, title: resource.title, description: resource.description, kind: resource.kind, htmlPath: resource.htmlPath, og: resource.og, ogCopy: resource.ogCopy }))
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

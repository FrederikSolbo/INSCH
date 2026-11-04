import { useEffect, useRef } from 'react'

/*
 * A hand-drawn ink line that is drawn as the page scrolls.
 *
 * It grows out of the bottom of the flower's stalk on the first screen, falls past the first section title
 * and turns back under it to the edge of the page frame. From there it runs down the margin beside the
 * section, turns under the next title, crosses to the other margin, and so on. A title is underlined while
 * it rises to the top of the screen, and the stroke down the margin reaches the end of the section as the
 * section's end reaches the bottom of the screen, so it doubles as a progress bar for the section.
 *
 * The flower is an animated drawing (marked `data-line-flower`, see Hero) in the line's ink, cut off where its
 * stalk runs straight down. The line waits until the flower is marked `data-drawn`, then carries on from that
 * cut, as thick as the drawing's stroke, so the two read as one.
 * Titles are found by their `data-line-title` attribute (see Section). The line runs down the frame --margin
 * in from its edges, and sections inset their content by --gutter so text never touches it.
 *
 * The canvas covers the visible part of the page plus a buffer and scrolls with the page, so the line stays
 * locked to the text, and it is moved and redrawn on every scroll frame.
 */

/* ===================== settings ===================== */
const UNDERLINE_GAP = 36 // px between a title and its underline
const BOTTOM_PAD = 30 // px above the screen bottom where the tip sits when a section ends
const SHORT_SECTION = 0.3 // in a section shorter than the screen, share of its scroll spent going down the margin
const STEP = 4 // sampling distance along the line (px)

const WOBBLE = 4 // how much the line wanders (0 = straight), halved on phones
const WEIGHT_VARY = 0.12 // how much the thickness changes (0 = constant)
const SWELL = 1.5 // how much thicker the underline grows beneath a title's text (0.6 = 60% thicker)
const TIP_TAPER = 20 // px over which the moving tip thins out

const BUFFER = 0.5 // screens of canvas kept above and below the visible area
const MAX_PIXELS = 10_000_000 // canvas size budget; very large screens draw at a lower resolution
/* ==================================================== */

/*
 * The flower drawing (assets/flower.png) ends at its bottom edge, where the stalk was cut as it ran straight
 * down: where across the box the stalk's centre is there, and the drawing's stroke width as a share of the
 * box's height, which is the line's thickness.
 */
const STALK = { x: 0.3515, width: 0.02246 }

type Point = { x: number; y: number }

type Stop = {
  /** y of the title's underline */
  y: number
  /** x where the text of the title's last line starts and ends */
  textLeft: number
  textRight: number
  /** x of the margin the line runs down beside this section */
  side: number
  /** scroll position at which the section has scrolled into place below the header */
  arrive: number
}

/** The line is drawn up to `len` when the page is scrolled to `s`. */
type Anchor = { s: number; len: number }

type Ink = ReturnType<typeof pen> & { cum: Float64Array; anchors: Anchor[] }

// Seeded random, so the drawing looks the same after every resize
function random(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Smooth 1D noise (a sum of random sines), used for the wobble and the pen pressure
function noise(rand: () => number, layers: [amplitude: number, wavelength: number][]) {
  const waves = layers.map(([a, l]) => ({ a, l: l * (0.8 + rand() * 0.4), p: rand() * Math.PI * 2 }))
  return (s: number) => waves.reduce((sum, w) => sum + w.a * Math.sin(s / w.l + w.p), 0)
}

/**
 * Clean centre line, sampled every STEP px: straight down from the end of the stalk, then on through the
 * titles with slightly uneven rounded corners.
 */
function trace(foot: Point, stops: Stop[], endY: number, radius: number) {
  const rand = random(3)
  const n = stops.length
  const pts: Point[] = [foot]
  const line = (a: Point, b: Point) => {
    const k = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / STEP))
    for (let j = 1; j <= k; j++) pts.push({ x: a.x + ((b.x - a.x) * j) / k, y: a.y + ((b.y - a.y) * j) / k })
  }
  const curve = (a: Point, c: Point, b: Point) => {
    const k = Math.max(4, Math.ceil((Math.hypot(c.x - a.x, c.y - a.y) + Math.hypot(b.x - c.x, b.y - c.y)) / STEP))
    for (let j = 1; j <= k; j++) {
      const t = j / k
      const u = 1 - t
      pts.push({ x: u * u * a.x + 2 * u * t * c.x + t * t * b.x, y: u * u * a.y + 2 * u * t * c.y + t * t * b.y })
    }
  }

  // Corners: the turn into the first underline, then per title the end of its underline and
  // the foot of its margin stroke
  const lead = [{ x: foot.x, y: stops[0].y }]
  const corners: Point[] = [...lead]
  stops.forEach((stop, i) => {
    const x = stop.side + (rand() - 0.5) * 8
    corners.push({ x, y: stop.y + (rand() - 0.5) * 6 })
    corners.push({ x: x + (rand() - 0.5) * 10, y: i < n - 1 ? stops[i + 1].y : endY })
  })

  const enter: number[] = [] // per corner: index where its curve begins
  const leave: number[] = [] // per corner: index where it ends
  let from = pts[pts.length - 1]
  corners.forEach((corner, j) => {
    const next = corners[j + 1]
    if (!next) {
      line(from, corner)
      enter[j] = leave[j] = pts.length - 1
      return
    }
    const dIn = Math.hypot(corner.x - from.x, corner.y - from.y) || 1
    const dOut = Math.hypot(next.x - corner.x, next.y - corner.y) || 1
    const r = radius * (0.7 + rand() * 0.7)
    const rIn = Math.min(r * (0.8 + rand() * 0.4), dIn / 2)
    const rOut = Math.min(r * (0.8 + rand() * 0.4), dOut / 2)
    const a = { x: corner.x - ((corner.x - from.x) / dIn) * rIn, y: corner.y - ((corner.y - from.y) / dIn) * rIn }
    const b = { x: corner.x + ((next.x - corner.x) / dOut) * rOut, y: corner.y + ((next.y - corner.y) / dOut) * rOut }
    line(from, a)
    enter[j] = pts.length - 1
    curve(a, corner, b)
    leave[j] = pts.length - 1
    from = b
  })

  // Per title: where its margin stroke begins (its underline is done) and ends
  const starts = stops.map((_, i) => leave[lead.length + 2 * i])
  const ends = stops.map((_, i) => enter[lead.length + 2 * i + 1])
  return { pts, starts, ends }
}

/** Lets the centre line wander sideways by up to about `amount` × 6px, easing in from the stalk. */
function wobble(pts: Point[], amount: number) {
  const rand = random(7)
  // Waves of unrelated lengths, so the pattern never repeats...
  const waves = noise(rand, [
    [3, 200],
    [2, 95],
    [0.6, 48],
  ])
  // ...and a slow swell over them, so some stretches run calm and others wander more
  const swell = noise(rand, [
    [1, 700],
    [0.6, 330],
  ])
  const offset = (s: number) => amount * waves(s) * (0.65 + 0.35 * (swell(s) / 1.6))
  let s = 0
  return pts.map((p, i) => {
    if (i > 0) s += Math.hypot(p.x - pts[i - 1].x, p.y - pts[i - 1].y)
    const a = pts[Math.max(0, i - 1)]
    const b = pts[Math.min(pts.length - 1, i + 1)]
    const len = Math.hypot(b.x - a.x, b.y - a.y) || 1
    const o = offset(s) * Math.min(1, s / 200)
    return { x: p.x - ((b.y - a.y) / len) * o, y: p.y + ((b.x - a.x) / len) * o, s }
  })
}

const smoothstep = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t))

/**
 * Centre and thickness at every point: `weight` with a little uneven pen pressure, a swell beneath each title's
 * text (thin where the words start, fuller along them, thin again where they end), and a lift at the very end.
 */
function pen(pts: (Point & { s: number })[], stops: Stop[], weight: number) {
  const pressure = noise(random(11), [
    [1, 260],
    [0.55, 70],
    [0.25, 19],
  ])
  const n = pts.length
  const total = pts[n - 1].s
  const cx = new Float32Array(n)
  const cy = new Float32Array(n)
  const w = new Float32Array(n)
  pts.forEach((p, i) => {
    cx[i] = p.x
    cy[i] = p.y
    let swell = 0
    for (const stop of stops) {
      // Near the underline's height (allowing for the wobble), so the margin strokes are left alone
      if (Math.abs(p.y - stop.y) > 50) continue
      const ramp = Math.min(120, (stop.textRight - stop.textLeft) / 3)
      swell = Math.max(swell, smoothstep((p.x - stop.textLeft) / ramp) * smoothstep((stop.textRight - p.x) / ramp))
    }
    const settle = smoothstep(p.s / 60) // the pressure eases in, so the line starts exactly as thick as the stalk
    w[i] =
      weight *
      (1 + (settle * WEIGHT_VARY * pressure(p.s)) / 1.8) *
      (1 + SWELL * swell) *
      Math.min(1, 0.3 + (total - p.s) / 80)
  })
  return { cx, cy, w }
}

/** Where the last line of a title's text starts and ends; its underline runs beneath that line. */
function lastLine(title: HTMLElement) {
  const range = document.createRange()
  range.selectNodeContents(title)
  const rects = [...range.getClientRects()].filter((r) => r.width > 0)
  if (rects.length === 0) return title.getBoundingClientRect()
  const bottom = Math.max(...rects.map((r) => r.bottom))
  const line = rects.filter((r) => r.bottom > bottom - 4)
  return { left: Math.min(...line.map((r) => r.left)), right: Math.max(...line.map((r) => r.right)) }
}

/** Squeezes increasing scroll positions into [0, max], leaving the ones that already fit comfortably alone. */
function fit(anchors: Anchor[], max: number, soft: number) {
  const first = anchors[0].s
  const last = anchors[anchors.length - 1].s
  const head = Math.min(soft, max / 2)
  const tail = Math.max(max - soft, max / 2)
  return anchors.map(({ s, len }) => {
    if (first < 0 && s < head) s = head - ((head - s) * head) / (head - first)
    else if (last > max && s > tail) s = tail + ((s - tail) * (max - tail)) / (last - tail)
    return { s, len }
  })
}

function lengthAt(anchors: Anchor[], s: number) {
  const last = anchors[anchors.length - 1]
  if (s >= last.s) return last.len
  for (let k = 1; k < anchors.length; k++) {
    const a = anchors[k - 1]
    const b = anchors[k]
    if (s <= b.s) return s <= a.s ? a.len : a.len + ((s - a.s) / (b.s - a.s)) * (b.len - a.len)
  }
  return last.len
}

/** Fractional index of the point `len` along the line. */
function indexAt(cum: Float64Array, len: number) {
  let lo = 0
  let hi = cum.length - 1
  if (len <= 0) return 0
  if (len >= cum[hi]) return hi
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1
    if (cum[mid] <= len) lo = mid
    else hi = mid
  }
  return lo + (len - cum[lo]) / Math.max(1e-6, cum[hi] - cum[lo])
}

// Thinning near the moving tip, ending in a soft round point
function taper(dist: number) {
  if (dist >= TIP_TAPER) return 1
  return 0.45 + 0.55 * Math.sqrt(Math.max(0, dist) / TIP_TAPER)
}

export function ScrollLine() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const probeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const probe = probeRef.current
    const ctx = canvas?.getContext('2d')
    if (!wrap || !canvas || !probe || !ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const bloom = document.querySelector<HTMLElement>('[data-line-flower]')
    const drawn = () => !bloom || bloom.hasAttribute('data-drawn')
    let ink: Ink | null = null
    let color = '#111'
    let pageTop = 0 // the wrapper's offset from the top of the page
    let wrapH = 0
    let cssH = 0
    let dpr = 1

    const draw = () => {
      const top = Math.max(0, Math.min(Math.round(window.scrollY - pageTop - BUFFER * window.innerHeight), wrapH - cssH))
      canvas.style.transform = `translateY(${top}px)`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (!ink || !drawn()) return

      const { cx, cy, w, cum } = ink
      const total = cum[cum.length - 1]
      const tipLen = reducedMotion.matches ? total : lengthAt(ink.anchors, window.scrollY)
      const tip = indexAt(cum, tipLen)
      if (tip <= 0) return
      const ti = Math.floor(tip)
      const tf = tip - ti

      // The part of the drawn line inside the canvas
      const lo = top - 20
      const hi = top + cssH + 20
      let first = -1
      let last = -1
      for (let i = 0; i <= ti; i++) {
        if (cy[i] >= lo && cy[i] <= hi) {
          if (first < 0) first = i
          last = i
        }
      }
      if (first < 0) return
      first = Math.max(0, first - 1)
      const end = Math.min(last + 1, ti)
      // The drawing tip thins out, easing in as it leaves the stalk so the join doesn't jump
      const thin = end === ti && tipLen < total - 0.5 ? Math.min(1, tipLen / TIP_TAPER) : 0
      const width = (i: number) => Math.round(w[i] * (1 - thin * (1 - taper(tipLen - cum[i]))) * 10) / 10

      // One stroke per run of points of the same width, so the pen pressure and the taper show
      ctx.setTransform(dpr, 0, 0, dpr, 0, -top * dpr)
      ctx.strokeStyle = color
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      let current = width(first)
      ctx.beginPath()
      ctx.moveTo(cx[first], cy[first])
      for (let i = first + 1; i <= end; i++) {
        const next = width(i)
        if (next !== current) {
          ctx.lineWidth = current
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(cx[i - 1], cy[i - 1])
          current = next
        }
        ctx.lineTo(cx[i], cy[i])
      }
      if (end === ti && tf > 0) {
        const j = Math.min(ti + 1, cx.length - 1)
        ctx.lineTo(cx[ti] + (cx[j] - cx[ti]) * tf, cy[ti] + (cy[j] - cy[ti]) * tf)
      }
      ctx.lineWidth = current
      ctx.stroke()
    }

    const build = () => {
      // 100vh is the viewport with the mobile toolbars hidden, so it stays put while they slide in and out
      const vh = probe.offsetHeight || window.innerHeight
      const origin = wrap.getBoundingClientRect()
      const root = getComputedStyle(document.documentElement)
      const margin = parseFloat(root.getPropertyValue('--margin')) || 40
      color = root.getPropertyValue('--ink').trim() || color
      pageTop = origin.top + window.scrollY
      wrapH = wrap.clientHeight

      // Canvas: the screen plus a buffer above and below, within the pixel budget
      const cssW = wrap.clientWidth
      cssH = Math.min(Math.ceil(Math.max(vh, window.innerHeight) * (1 + 2 * BUFFER)), wrapH)
      dpr = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(MAX_PIXELS / Math.max(1, cssW * cssH)))
      const width = Math.round(cssW * dpr)
      const height = Math.round(cssH * dpr)
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
      canvas.style.width = `${cssW}px`
      canvas.style.height = `${cssH}px`

      ink = null
      const titles = [...document.querySelectorAll<HTMLElement>('[data-line-title]')]
      if (bloom && titles.length > 0) {
        const sections = titles.map((title) => title.closest('section') ?? title)
        const stops: Stop[] = titles.map((title, i) => {
          const t = title.getBoundingClientRect()
          const s = sections[i].getBoundingClientRect()
          const text = lastLine(title)
          return {
            y: t.bottom - origin.top + UNDERLINE_GAP,
            textLeft: text.left - origin.left,
            textRight: text.right - origin.left,
            side: i % 2 === 0 ? s.left - origin.left + margin : s.right - origin.left - margin,
            arrive: s.top - origin.top + pageTop - (parseFloat(getComputedStyle(sections[i]).scrollMarginTop) || 0),
          }
        })
        const f = bloom.getBoundingClientRect()
        const foot = { x: f.left + STALK.x * f.width - origin.left, y: f.bottom - origin.top }
        const endY = sections[sections.length - 1].getBoundingClientRect().bottom - origin.top - 40
        const { pts, starts, ends } = trace(foot, stops, endY, cssW < 700 ? 40 : 110)
        const cum = new Float64Array(pts.length)
        for (let i = 1; i < pts.length; i++) cum[i] = cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y)

        // Before the page moves, half a pixel of line rounds off the cut end of the stalk. The line grows from
        // there as soon as the page moves; each title is underlined once its section is in place below the
        // header; each margin stroke ends as the end of its section reaches the screen bottom.
        const bottom = vh - BOTTOM_PAD
        const anchors: Anchor[] = [{ s: 0, len: 0.5 }]
        stops.forEach((stop, i) => {
          const foot = i < stops.length - 1 ? stops[i + 1].y : endY
          anchors.push({ s: stop.arrive, len: cum[starts[i]] })
          // A section shorter than the screen ends on screen before its title is in place, so its margin
          // stroke takes a share of the section's own scroll instead.
          anchors.push({
            s: Math.max(foot + pageTop - bottom, stop.arrive + SHORT_SECTION * (foot - stop.y)),
            len: cum[ends[i]],
          })
        })
        for (let i = 1; i < anchors.length; i++) anchors[i].s = Math.max(anchors[i].s, anchors[i - 1].s + 1)
        // The page may end before the last titles can reach the top, so the line must finish within it
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - vh)
        const lean = pen(wobble(pts, cssW < 700 ? WOBBLE / 2 : WOBBLE), stops, STALK.width * f.height)
        ink = { ...lean, cum, anchors: fit(anchors, maxScroll, vh / 2) }
      }
      draw()
    }

    let frame = 0
    const redraw = () => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0
          draw()
        })
      }
    }
    let timer = 0
    const rebuild = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(build, 80)
    }
    const onResize = () => {
      redraw()
      rebuild()
    }

    // The wrapper is as tall as the page, so this fires whenever the layout changes height
    const observer = new ResizeObserver(rebuild)
    observer.observe(wrap)
    // The line appears once the flower has finished drawing
    const flowerWatch = new MutationObserver(redraw)
    if (bloom) flowerWatch.observe(bloom, { attributes: true, attributeFilter: ['data-drawn'] })
    window.addEventListener('scroll', redraw, { passive: true })
    window.addEventListener('resize', onResize)
    let live = true
    document.fonts?.ready.then(() => {
      if (live) build()
    })
    build()

    return () => {
      live = false
      observer.disconnect()
      flowerWatch.disconnect()
      window.removeEventListener('scroll', redraw)
      window.removeEventListener('resize', onResize)
      window.clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="scroll-line" ref={wrapRef} aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="scroll-line__probe" ref={probeRef} />
    </div>
  )
}

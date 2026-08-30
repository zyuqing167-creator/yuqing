import { useEffect, useRef } from 'react'
import './DotGrid.css'

export default function DotGrid({
  dotSize = 1.5,
  gap = 28,
  baseColor = '#30264f',
  activeColor = '#9b7cff',
  proximity = 135,
  className = '',
}) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(max-width: 900px)').matches) return undefined
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let width = 0
    let height = 0
    let raf = 0
    let dots = []
    let visible = false
    let pageVisible = !document.hidden
    const pointer = { x: -9999, y: -9999, lastX: 0, lastY: 0, vx: 0, vy: 0 }
    const toRgb = hex => {
      const value = hex.replace('#', '')
      return [0, 2, 4].map(offset => parseInt(value.slice(offset, offset + 2), 16))
    }
    const base = toRgb(baseColor)
    const active = toRgb(activeColor)

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      width = Math.max(1, Math.floor(rect.width))
      height = Math.max(1, Math.floor(rect.height))
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const cell = dotSize + gap
      const cols = Math.ceil(width / cell) + 1
      const rows = Math.ceil(height / cell) + 1
      dots = Array.from({ length: cols * rows }, (_, index) => ({
        x: (index % cols) * cell,
        y: Math.floor(index / cols) * cell,
        ox: 0,
        oy: 0,
        vx: 0,
        vy: 0,
      }))
    }

    const move = event => {
      const rect = wrap.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      pointer.vx = x - pointer.lastX
      pointer.vy = y - pointer.lastY
      pointer.lastX = x
      pointer.lastY = y
      pointer.x = x
      pointer.y = y
    }
    const leave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }
    const shock = event => {
      const rect = wrap.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      dots.forEach(dot => {
        const dx = dot.x - x
        const dy = dot.y - y
        const distance = Math.hypot(dx, dy)
        if (distance > 0 && distance < 190) {
          const force = (1 - distance / 190) * 5
          dot.vx += (dx / distance) * force
          dot.vy += (dy / distance) * force
        }
      })
    }

    const draw = () => {
      if (!visible || !pageVisible) {
        raf = 0
        return
      }
      ctx.clearRect(0, 0, width, height)
      dots.forEach(dot => {
        const dx = dot.x - pointer.x
        const dy = dot.y - pointer.y
        const distance = Math.hypot(dx, dy)
        if (distance < proximity && distance > 0) {
          const strength = (1 - distance / proximity) * Math.min(7, Math.hypot(pointer.vx, pointer.vy) * 0.32 + 1)
          dot.vx += (dx / distance) * strength * 0.12
          dot.vy += (dy / distance) * strength * 0.12
        }
        dot.vx += -dot.ox * 0.035
        dot.vy += -dot.oy * 0.035
        dot.vx *= 0.88
        dot.vy *= 0.88
        dot.ox += dot.vx
        dot.oy += dot.vy
        const influence = Math.max(0, 1 - distance / proximity)
        const rgb = base.map((channel, index) => Math.round(channel + (active[index] - channel) * influence))
        ctx.beginPath()
        ctx.fillStyle = `rgba(${rgb.join(',')},${0.32 + influence * 0.68})`
        ctx.arc(dot.x + dot.ox, dot.y + dot.oy, dotSize + influence * 1.2, 0, Math.PI * 2)
        ctx.fill()
      })
      pointer.vx *= 0.82
      pointer.vy *= 0.82
      raf = requestAnimationFrame(draw)
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(wrap)
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && pageVisible && !raf) raf = requestAnimationFrame(draw)
      if (!visible && raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }, { threshold: 0 })
    visibilityObserver.observe(wrap)
    const onVisibility = () => {
      pageVisible = !document.hidden
      if (pageVisible && visible && !raf) raf = requestAnimationFrame(draw)
      if (!pageVisible && raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    wrap.addEventListener('pointermove', move, { passive: true })
    wrap.addEventListener('pointerleave', leave)
    wrap.addEventListener('click', shock)
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      visibilityObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      wrap.removeEventListener('pointermove', move)
      wrap.removeEventListener('pointerleave', leave)
      wrap.removeEventListener('click', shock)
    }
  }, [activeColor, baseColor, dotSize, gap, proximity])

  return <div ref={wrapRef} className={`dot-grid ${className}`}><canvas ref={canvasRef} /></div>
}

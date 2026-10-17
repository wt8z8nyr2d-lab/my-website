import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

const EDGE_MARGIN = 10

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function particleCount(width: number, height: number) {
  return Math.min(120, Math.max(24, Math.round((width * height) / 14000)))
}

function createParticles(width: number, height: number, count: number): Particle[] {
  const random = mulberry32(20261017)
  return Array.from({ length: count }, () => {
    const angle = random() * Math.PI * 2
    const speed = 6 + random() * 10
    return {
      x: random() * width,
      y: random() * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: 0.8 + random() * 1.6,
    }
  })
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    const context = canvas?.getContext('2d')
    if (!canvas || !host || !context) return

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let particleColor = ''
    let lineColor = ''
    let frameId = 0
    let lastTime = 0
    let isRunning = false
    let isOnScreen = true
    let isDocumentVisible = document.visibilityState === 'visible'

    const readColors = () => {
      try {
        const styles = getComputedStyle(document.documentElement)
        particleColor = styles.getPropertyValue('--hero-particle').trim()
        lineColor = styles.getPropertyValue('--hero-line').trim()
      } catch {
        // 保留上一次的颜色
      }
    }

    const drawFrame = () => {
      try {
        context.clearRect(0, 0, width, height)
        if (!particleColor || !lineColor) readColors()

        const linkDistance = Math.min(140, Math.max(70, Math.min(width, height) * 0.12))

        context.strokeStyle = lineColor
        context.lineWidth = 1
        for (let i = 0; i < particles.length; i += 1) {
          for (let j = i + 1; j < particles.length; j += 1) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            if (Math.hypot(dx, dy) > linkDistance) continue

            context.beginPath()
            context.moveTo(particles[i].x, particles[i].y)
            context.lineTo(particles[j].x, particles[j].y)
            context.stroke()
          }
        }

        context.fillStyle = particleColor
        for (const particle of particles) {
          context.beginPath()
          context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
          context.fill()
        }
      } catch {
        // 绘制失败时保留 CSS 渐变背景
      }
    }

    const resizeCanvas = () => {
      try {
        const rect = host.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) return

        const previousWidth = width
        const previousHeight = height
        const ratio = Math.min(window.devicePixelRatio || 1, 2)

        width = rect.width
        height = rect.height
        canvas.width = Math.round(width * ratio)
        canvas.height = Math.round(height * ratio)
        context.setTransform(ratio, 0, 0, ratio, 0, 0)

        if (particles.length === 0) {
          particles = createParticles(width, height, particleCount(width, height))
        } else if (previousWidth > 0 && previousHeight > 0) {
          const scaleX = width / previousWidth
          const scaleY = height / previousHeight
          for (const particle of particles) {
            particle.x *= scaleX
            particle.y *= scaleY
          }
        }

        drawFrame()
      } catch {
        // 尺寸读取失败时保持现有画布
      }
    }

    const step = (time: number) => {
      if (!isRunning) return

      const delta = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time

      for (const particle of particles) {
        particle.x += particle.vx * delta
        particle.y += particle.vy * delta

        if (particle.x < -EDGE_MARGIN) particle.x = width + EDGE_MARGIN
        else if (particle.x > width + EDGE_MARGIN) particle.x = -EDGE_MARGIN

        if (particle.y < -EDGE_MARGIN) particle.y = height + EDGE_MARGIN
        else if (particle.y > height + EDGE_MARGIN) particle.y = -EDGE_MARGIN
      }

      drawFrame()
      frameId = requestAnimationFrame(step)
    }

    const start = () => {
      if (isRunning || !isOnScreen || !isDocumentVisible) return
      if (reduceMotionQuery.matches) return

      isRunning = true
      lastTime = performance.now()
      frameId = requestAnimationFrame(step)
    }

    const stop = () => {
      isRunning = false
      cancelAnimationFrame(frameId)
    }

    const syncRunState = () => {
      if (isOnScreen && isDocumentVisible && !reduceMotionQuery.matches) {
        start()
        return
      }

      const wasRunning = isRunning
      stop()
      if (wasRunning) drawFrame()
    }

    resizeCanvas()
    readColors()
    drawFrame()

    const resizeObserver = new ResizeObserver(resizeCanvas)
    resizeObserver.observe(host)

    const themeObserver = new MutationObserver(() => {
      readColors()
      if (!isRunning) drawFrame()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    const intersectionObserver = new IntersectionObserver((entries) => {
      isOnScreen = entries[0]?.isIntersecting ?? true
      syncRunState()
    })
    intersectionObserver.observe(host)

    const onVisibilityChange = () => {
      isDocumentVisible = document.visibilityState === 'visible'
      syncRunState()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    const onReduceMotionChange = () => syncRunState()
    reduceMotionQuery.addEventListener('change', onReduceMotionChange)

    syncRunState()

    return () => {
      stop()
      resizeObserver.disconnect()
      themeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      reduceMotionQuery.removeEventListener('change', onReduceMotionChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}

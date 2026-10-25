'use client'

import { useEffect, useState } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { usePathname } from 'next/navigation'
import 'lenis/dist/lenis.css'

function ScrollToTopOnNavigate() {
  const pathname = usePathname()
  const lenis = useLenis()

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true })
  }, [pathname, lenis])

  return null
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setEnabled(!media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  if (!enabled) return <>{children}</>

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        autoRaf: true,
        autoToggle: true,
      }}
    >
      <ScrollToTopOnNavigate />
      {children}
    </ReactLenis>
  )
}

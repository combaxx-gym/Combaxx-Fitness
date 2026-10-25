'use client'

import { usePathname } from 'next/navigation'

/** Hides marketing chrome on /zubair without importing server components into a client module. */
export default function HideOnZubair({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || ''
  const path = pathname.toLowerCase()
  if (path === '/zubair' || path.startsWith('/zubair/')) return null
  return <>{children}</>
}

'use client'

import { usePathname } from 'next/navigation'

/** Hides marketing chrome on /Zubair without importing server components into a client module. */
export default function HideOnZubair({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || ''
  if (pathname === '/Zubair' || pathname.startsWith('/Zubair/')) return null
  return <>{children}</>
}

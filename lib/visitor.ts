import { countryFromTimezone, DEFAULT_COUNTRY_CODE, findCountry } from '@/lib/countries'

export interface VisitorProfile {
  countryCode: string
  phone: string
  submittedAt: string
}

const VISITOR_KEY = 'combaxxVisitor'
const DETECTED_KEY = 'combaxxDetectedCountry'

export function getVisitor(): VisitorProfile | null {
  if (typeof window === 'undefined') return null
  try {
    const v = JSON.parse(localStorage.getItem(VISITOR_KEY) || 'null')
    return v && typeof v.countryCode === 'string' ? v : null
  } catch {
    return null
  }
}

export function saveVisitor(profile: VisitorProfile) {
  localStorage.setItem(VISITOR_KEY, JSON.stringify(profile))
}

async function fetchWithTimeout(url: string, ms: number) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), ms)
  try {
    return await fetch(url, { signal: ctrl.signal, cache: 'no-store' })
  } finally {
    clearTimeout(t)
  }
}

let pending: Promise<string> | null = null

export function detectCountryCode(): Promise<string> {
  const cached = typeof window !== 'undefined' ? sessionStorage.getItem(DETECTED_KEY) : null
  if (cached && findCountry(cached)) return Promise.resolve(cached)
  if (pending) return pending

  pending = (async () => {
    let code: string | undefined

    try {
      const res = await fetchWithTimeout('/api/geo', 2500)
      const data = await res.json()
      if (findCountry(data?.countryCode)) code = data.countryCode
    } catch { /* ignore */ }

    if (!code) {
      try {
        const res = await fetchWithTimeout('https://ipapi.co/country/', 3000)
        const text = (await res.text()).trim()
        if (res.ok && findCountry(text)) code = text
      } catch { /* ignore */ }
    }

    code = (code || countryFromTimezone() || DEFAULT_COUNTRY_CODE).toUpperCase()
    try { sessionStorage.setItem(DETECTED_KEY, code) } catch { /* ignore */ }
    return code
  })()

  return pending
}

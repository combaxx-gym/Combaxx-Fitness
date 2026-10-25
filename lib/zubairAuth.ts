import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

export const ZUBAIR_COOKIE = 'zubair_session'
const SESSION_DAYS = 7

function getSecret() {
  const secret = process.env.DASHBOARD_SESSION_SECRET?.trim()
  if (!secret || secret.length < 16) {
    throw new Error('DASHBOARD_SESSION_SECRET is missing or too short')
  }
  return secret
}

function getCredentials() {
  const email = process.env.DASHBOARD_EMAIL?.trim().toLowerCase()
  const password = process.env.DASHBOARD_PASSWORD
  if (!email || !password) {
    throw new Error('DASHBOARD_EMAIL / DASHBOARD_PASSWORD not configured')
  }
  return { email, password }
}

function sign(payload: string) {
  return createHmac('sha256', getSecret()).update(payload).digest('base64url')
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

export function verifyDashboardCredentials(email: string, password: string): boolean {
  try {
    const creds = getCredentials()
    const emailOk = safeEqual(email.trim().toLowerCase(), creds.email)
    const passOk = safeEqual(password, creds.password)
    return emailOk && passOk
  } catch {
    return false
  }
}

export function createSessionToken(email: string): string {
  const exp = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000
  const payload = Buffer.from(JSON.stringify({ email: email.toLowerCase(), exp }), 'utf8').toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function readSessionToken(token: string | undefined | null): { email: string } | null {
  if (!token || !token.includes('.')) return null
  try {
    const [payload, signature] = token.split('.')
    if (!payload || !signature || !safeEqual(sign(payload), signature)) return null
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { email?: string; exp?: number }
    if (!data?.email || typeof data.exp !== 'number' || data.exp < Date.now()) return null
    const creds = getCredentials()
    if (!safeEqual(data.email.toLowerCase(), creds.email)) return null
    return { email: data.email }
  } catch {
    return null
  }
}

export async function getZubairSession() {
  const jar = await cookies()
  return readSessionToken(jar.get(ZUBAIR_COOKIE)?.value)
}

export function sessionCookieOptions(token: string) {
  return {
    name: ZUBAIR_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  }
}

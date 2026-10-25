import { NextRequest, NextResponse } from 'next/server'
import {
  createSessionToken,
  sessionCookieOptions,
  verifyDashboardCredentials,
} from '@/lib/zubairAuth'

const attempts = new Map<string, { count: number; resetAt: number }>()

function rateLimited(ip: string) {
  const now = Date.now()
  const row = attempts.get(ip)
  if (!row || row.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 })
    return false
  }
  row.count += 1
  return row.count > 20
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'

    if (rateLimited(ip)) {
      return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 })
    }

    const body = await request.json()
    const email = String(body.email || '')
    const password = String(body.password || '')

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
    }

    if (!verifyDashboardCredentials(email, password)) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    const token = createSessionToken(email.trim().toLowerCase())
    const res = NextResponse.json({ ok: true })
    const cookie = sessionCookieOptions(token)
    res.cookies.set(cookie.name, cookie.value, cookie)
    return res
  } catch (err) {
    console.error('[zubair/login]', err)
    return NextResponse.json({ error: 'Login failed. Check server configuration.' }, { status: 500 })
  }
}

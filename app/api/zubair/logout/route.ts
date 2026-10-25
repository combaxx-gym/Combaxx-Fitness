import { NextResponse } from 'next/server'
import { ZUBAIR_COOKIE } from '@/lib/zubairAuth'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ZUBAIR_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return res
}

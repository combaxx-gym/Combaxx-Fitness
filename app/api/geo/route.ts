import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const code =
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    request.headers.get('x-country-code') ||
    null

  const valid = code && /^[A-Z]{2}$/i.test(code) && code.toUpperCase() !== 'XX'
  return NextResponse.json({ countryCode: valid ? code.toUpperCase() : null })
}

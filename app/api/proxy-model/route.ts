import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const src = searchParams.get('src')

  if (!src) {
    return NextResponse.json({ error: 'Missing src parameter' }, { status: 400 })
  }

  try {
    const srcUrl = new URL(src)
    const allowedHosts = ['cdn.sanity.io', 'cdn.sanitycdn.com']
    if (!allowedHosts.includes(srcUrl.hostname)) {
      return NextResponse.json({ error: 'Invalid source host' }, { status: 400 })
    }

    const clientRes = await fetch(src, {
      cache: 'force-cache',
      next: { revalidate: 31536000 },
    })

    if (!clientRes.ok) {
      return NextResponse.json(
        { error: `Upstream error ${clientRes.status}` },
        { status: clientRes.status as any }
      )
    }

    const contentType =
      clientRes.headers.get('content-type') || 'application/octet-stream'
    const body = new Uint8Array(await clientRes.arrayBuffer())

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(body.byteLength),
        'Cache-Control':
          'public, max-age=31536000, s-maxage=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Proxy failed', detail: err?.message || String(err) },
      { status: 502 }
    )
  }
}

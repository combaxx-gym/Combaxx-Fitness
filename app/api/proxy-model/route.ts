import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const src = searchParams.get('src')

  if (!src) {
    return NextResponse.json({ error: 'Missing src parameter' }, { status: 400 })
  }

  let clientRes: Response | null = null
  let body: Uint8Array | null = null
  let contentType: string | null = null

  try {
    const srcUrl = new URL(src)
    const allowedHosts = ['cdn.sanity.io', 'cdn.sanitycdn.com']
    if (!allowedHosts.includes(srcUrl.hostname)) {
      return NextResponse.json({ error: 'Invalid source host' }, { status: 400 })
    }

    clientRes = await fetch(src, {
      cache: 'force-cache',
      next: { revalidate: 31536000 },
      // Edge timeouts are strict but we give it a generous window
      signal: AbortSignal.timeout(55000),
    })

    if (!clientRes.ok) {
      const status = clientRes.status
      let detail = `Upstream returned ${status}`
      try {
        const txt = await clientRes.text()
        if (txt) detail = `${detail}: ${txt.slice(0, 200)}`
      } catch {
        /* ignore */
      }
      return NextResponse.json(
        { error: `Sanity CDN ${status === 404 ? 'Not Found' : 'Error'}`, detail },
        { status: status as any }
      )
    }

    contentType =
      clientRes.headers.get('content-type') ||
      (src.endsWith('.gltf') ? 'model/gltf+json' : 'model/gltf-binary')

    const ab = await clientRes.arrayBuffer()
    body = new Uint8Array(ab)

    if (body.byteLength === 0) {
      return NextResponse.json(
        { error: '3D file is empty (0 bytes). Please re-upload to Sanity.' },
        { status: 502 }
      )
    }

    return new NextResponse(body as any, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(body.byteLength),
        'Cache-Control':
          'public, max-age=31536000, s-maxage=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        // Allow model-viewer to do range requests for large files (helps parsing)
        'Accept-Ranges': 'bytes',
      },
    })
  } catch (err: any) {
    const isAbort =
      err?.name === 'TimeoutError' ||
      err?.code === 'ETIMEDOUT' ||
      String(err?.message || '').toLowerCase().includes('timeout')
    const msg = isAbort
      ? 'Sanity took too long to send the 3D file (>55s). The file may be too large — please compress it to <50MB and re-upload.'
      : String(err?.message || err || 'Unknown proxy error')
    return NextResponse.json(
      {
        error: 'Proxy failed: ' + (isAbort ? 'timeout' : 'upstream'),
        detail: msg,
      },
      { status: 502 }
    )
  }
}

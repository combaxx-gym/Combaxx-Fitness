import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/writeClient'
import { getZubairSession } from '@/lib/zubairAuth'

export async function PATCH(request: NextRequest) {
  try {
    const session = await getZubairSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!process.env.SANITY_WRITE_TOKEN) {
      return NextResponse.json({ error: 'Server write token missing.' }, { status: 500 })
    }

    const body = await request.json()
    const productId = String(body.productId || '').trim()
    if (!productId || productId.length > 128) {
      return NextResponse.json({ error: 'Product ID is required.' }, { status: 400 })
    }

    let price: number | null = null
    if (body.price === '' || body.price === null || body.price === undefined) {
      price = null
    } else {
      const n = Number(body.price)
      if (!Number.isFinite(n) || n < 0) {
        return NextResponse.json({ error: 'Enter a valid price (0 or higher).' }, { status: 400 })
      }
      price = Math.round(n * 100) / 100
    }

    if (price === null) {
      await writeClient.patch(productId).unset(['price']).commit()
    } else {
      await writeClient.patch(productId).set({ price }).commit()
    }

    return NextResponse.json({ ok: true, price })
  } catch (err) {
    console.error('[zubair/price]', err)
    return NextResponse.json({ error: 'Failed to update price.' }, { status: 500 })
  }
}

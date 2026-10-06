import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { writeClient } from '@/sanity/lib/writeClient'
import { findCountry } from '@/lib/countries'

interface IncomingItem {
  _id?: string
  name?: string
  sku?: string
  slug?: string
  categorySlug?: string
  qty?: number
}

const str = (v: unknown, max = 500) => String(v ?? '').trim().slice(0, max)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const items: IncomingItem[] = Array.isArray(body.items) ? body.items.slice(0, 100) : []

    if (items.length === 0) {
      return NextResponse.json({ error: 'Your quote cart is empty.' }, { status: 400 })
    }
    if (!str(body.name)) {
      return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 })
    }
    if (!/^\S+@\S+\.\S+$/.test(str(body.email))) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }
    if (str(body.phone).replace(/\D/g, '').length < 6) {
      return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 })
    }

    const country = findCountry(body.countryCode)
    if (!country) {
      return NextResponse.json({ error: 'Please select your country.' }, { status: 400 })
    }

    if (!process.env.SANITY_WRITE_TOKEN) {
      console.error('SANITY_WRITE_TOKEN is not configured.')
      return NextResponse.json({ error: 'Server configuration error. Please try again later.' }, { status: 500 })
    }

    const origin = request.nextUrl.origin
    const quoteItems = items
      .filter(i => typeof i._id === 'string' && i._id)
      .map(i => {
        const qty = Math.min(999, Math.max(1, Math.round(Number(i.qty) || 1)))
        return {
          _key: randomUUID(),
          _type: 'quoteItem',
          product: { _type: 'reference', _ref: i._id as string, _weak: true },
          name: str(i.name, 200),
          sku: str(i.sku, 100),
          qty,
          url: i.slug ? `${origin}/${str(i.categorySlug, 100) || 'shop'}/${str(i.slug, 200)}` : '',
        }
      })

    await writeClient.create({
      _type: 'quoteRequest',
      fullName: str(body.name, 200),
      email: str(body.email, 200),
      phone: `${country.dial} ${str(body.phone, 40)}`,
      country: country.name,
      region: country.region,
      streetAddress: str(body.street, 300),
      extraAddress: str(body.extraAddress, 300),
      zip: str(body.zip, 40),
      city: str(body.city, 120),
      sendTo: str(body.sendTo, 120),
      businessCategory: str(body.businessCategory, 120),
      message: str(body.message, 4000),
      wantsUpdates: Boolean(body.wantsUpdates),
      items: quoteItems,
      totalQty: quoteItems.reduce((sum, i) => sum + i.qty, 0),
      status: 'new',
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Quote cart submission error:', err)
    return NextResponse.json({ error: 'Failed to send your request. Please try again.' }, { status: 500 })
  }
}

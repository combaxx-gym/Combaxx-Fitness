import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { writeClient } from '@/sanity/lib/writeClient'
import { PAKISTAN_CITIES } from '@/lib/pakistanCities'
import { notifyFormSubmission } from '@/lib/notifyEmail'

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

    const city = str(body.city, 120)
    if (!city || !(PAKISTAN_CITIES as readonly string[]).includes(city)) {
      return NextResponse.json({ error: 'Please select your city.' }, { status: 400 })
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

    const fullName = str(body.name, 200)
    const email = str(body.email, 200)
    const phone = `+92 ${str(body.phone, 40)}`
    const message = str(body.message, 4000)
    const totalQty = quoteItems.reduce((sum, i) => sum + i.qty, 0)

    await writeClient.create({
      _type: 'quoteRequest',
      fullName,
      email,
      phone,
      country: 'Pakistan',
      region: 'Asia',
      streetAddress: '',
      extraAddress: '',
      zip: '',
      city,
      sendTo: '',
      businessCategory: '',
      message,
      wantsUpdates: Boolean(body.wantsUpdates),
      items: quoteItems,
      totalQty,
      status: 'new',
      submittedAt: new Date().toISOString(),
    })

    const itemsSummary = quoteItems
      .map(i => `${i.qty}× ${i.name}${i.sku ? ` (${i.sku})` : ''}`)
      .join('\n')

    await notifyFormSubmission({
      formType: 'Quote Cart Request',
      subject: `New quote request — ${fullName} (${totalQty} units)`,
      replyTo: email,
      fields: {
        Name: fullName,
        Email: email,
        Phone: phone,
        City: city,
        Country: 'Pakistan',
        'Total units': totalQty,
        Products: itemsSummary,
        Message: message,
        'Wants updates': Boolean(body.wantsUpdates) ? 'Yes' : 'No',
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Quote cart submission error:', err)
    return NextResponse.json({ error: 'Failed to send your request. Please try again.' }, { status: 500 })
  }
}

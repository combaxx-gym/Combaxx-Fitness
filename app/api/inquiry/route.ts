import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/writeClient'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, country, message, productName, productSku, productSlug, productId } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    if (!process.env.SANITY_WRITE_TOKEN) {
      console.error('SANITY_WRITE_TOKEN is not configured.')
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    const doc = {
      _type: 'inquiry' as const,
      name,
      email,
      phone: phone || '',
      company: company || '',
      country: country || '',
      message,
      productName: productName || '',
      productSku: productSku || '',
      productSlug: productSlug || '',
      submittedAt: new Date().toISOString(),
      status: 'new',
      ...(productId && { product: { _type: 'reference' as const, _ref: productId as string } }),
    }

    await writeClient.create(doc)

    return NextResponse.json({ success: true, message: 'Inquiry submitted successfully.' })
  } catch (err) {
    console.error('Inquiry submission error:', err)
    return NextResponse.json({ error: 'Failed to submit inquiry. Please try again.' }, { status: 500 })
  }
}

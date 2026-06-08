import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/writeClient'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, country, message, productName, productSku, productSlug, productId } = body

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Please enter your Full Name.' }, { status: 400 })
    }
    if (!email?.trim()) {
      return NextResponse.json({ error: 'Please enter your Email Address.' }, { status: 400 })
    }
    if (!message?.trim()) {
      return NextResponse.json({ error: 'Please enter a Message describing your inquiry.' }, { status: 400 })
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
      fullName: name,
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
  } catch (err: any) {
    console.error('Inquiry submission error:', err)
    
    // Detailed error for debugging
    const errorMessage = err?.message || 'Failed to submit inquiry. Please try again.'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/writeClient'
import { notifyFormSubmission } from '@/lib/notifyEmail'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, city, message, productName, productSku, productSlug, productId } = body

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Please enter your Full Name.' }, { status: 400 })
    }
    if (!email?.trim()) {
      return NextResponse.json({ error: 'Please enter your Email Address.' }, { status: 400 })
    }
    if (!phone?.trim()) {
      return NextResponse.json({ error: 'Please enter your Phone Number.' }, { status: 400 })
    }
    if (!city?.trim()) {
      return NextResponse.json({ error: 'Please select your City.' }, { status: 400 })
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
      country: 'Pakistan',
      city: city || '',
      message: message || '',
      productName: productName || '',
      productSku: productSku || '',
      productSlug: productSlug || '',
      submittedAt: new Date().toISOString(),
      status: 'new',
      ...(productId && { product: { _type: 'reference' as const, _ref: productId as string } }),
    }

    await writeClient.create(doc)

    await notifyFormSubmission({
      formType: 'Product Inquiry',
      subject: `New inquiry${productName ? `: ${productName}` : ''} — ${name}`,
      replyTo: email,
      fields: {
        Name: name,
        Email: email,
        Phone: phone,
        City: city,
        Country: 'Pakistan',
        Company: company || '',
        Product: productName || '',
        SKU: productSku || '',
        Message: message || '',
      },
    })

    return NextResponse.json({ success: true, message: 'Inquiry submitted successfully.' })
  } catch (err: any) {
    console.error('Inquiry submission error:', err)
    
    // Detailed error for debugging
    const errorMessage = err?.message || 'Failed to submit inquiry. Please try again.'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

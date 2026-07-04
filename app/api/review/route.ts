import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/writeClient'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, rating, reviewText, productId, productName } = body

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Please enter your Name.' }, { status: 400 })
    }
    if (!email?.trim()) {
      return NextResponse.json({ error: 'Please enter your Email.' }, { status: 400 })
    }
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Please select a Rating between 1-5.' }, { status: 400 })
    }
    if (!reviewText?.trim()) {
      return NextResponse.json({ error: 'Please write your Review.' }, { status: 400 })
    }
    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required.' }, { status: 400 })
    }

    if (!process.env.SANITY_WRITE_TOKEN) {
      console.error('SANITY_WRITE_TOKEN is not configured.')
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    const doc = {
      _type: 'review' as const,
      name,
      email,
      rating,
      reviewText,
      productName: productName || '',
      approved: false,
      submittedAt: new Date().toISOString(),
      ...(productId && { product: { _type: 'reference' as const, _ref: productId as string } }),
    }

    await writeClient.create(doc)

    return NextResponse.json({ success: true, message: 'Review submitted successfully! It will be visible after approval.' })
  } catch (err: any) {
    console.error('Review submission error:', err)
    
    const errorMessage = err?.message || 'Failed to submit review. Please try again.'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

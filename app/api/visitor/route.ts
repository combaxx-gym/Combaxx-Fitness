import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/writeClient'
import { findCountry } from '@/lib/countries'

export async function POST(request: NextRequest) {
  try {
    const { countryCode, phone, detectedCountry, landingPage } = await request.json()

    const country = findCountry(countryCode)
    if (!country) {
      return NextResponse.json({ error: 'Please select your country.' }, { status: 400 })
    }

    const digits = String(phone || '').replace(/\D/g, '')
    if (digits.length < 6 || digits.length > 15) {
      return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 })
    }

    if (!process.env.SANITY_WRITE_TOKEN) {
      console.error('SANITY_WRITE_TOKEN is not configured.')
      return NextResponse.json({ error: 'Server configuration error. Please try again later.' }, { status: 500 })
    }

    await writeClient.create({
      _type: 'visitorLead',
      phone: `${country.dial} ${digits}`,
      country: country.name,
      countryCode: country.code,
      region: country.region,
      detectedCountry: findCountry(detectedCountry)?.name || '',
      landingPage: String(landingPage || '').slice(0, 300),
      status: 'new',
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Visitor lead error:', err)
    return NextResponse.json({ error: 'Failed to save. Please try again.' }, { status: 500 })
  }
}

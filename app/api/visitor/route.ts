import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/writeClient'
import { findCountry } from '@/lib/countries'
import { notifyFormSubmission } from '@/lib/notifyEmail'

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

    const phoneDisplay = `${country.dial} ${digits}`
    const page = String(landingPage || '').slice(0, 300)

    await writeClient.create({
      _type: 'visitorLead',
      phone: phoneDisplay,
      country: country.name,
      countryCode: country.code,
      region: country.region,
      detectedCountry: findCountry(detectedCountry)?.name || '',
      landingPage: page,
      status: 'new',
      submittedAt: new Date().toISOString(),
    })

    await notifyFormSubmission({
      formType: 'Visitor Lead',
      subject: `New visitor lead — ${country.name} (${phoneDisplay})`,
      fields: {
        Phone: phoneDisplay,
        Country: country.name,
        Region: country.region,
        'Detected country': findCountry(detectedCountry)?.name || '',
        Page: page,
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Visitor lead error:', err)
    return NextResponse.json({ error: 'Failed to save. Please try again.' }, { status: 500 })
  }
}

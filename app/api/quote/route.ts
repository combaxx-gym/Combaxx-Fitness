import { NextResponse } from 'next/server'
import { notifyFormSubmission } from '@/lib/notifyEmail'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const name = String(data.name || '').trim()
    const email = String(data.email || '').trim()
    const phone = String(data.phone || '').trim()
    const company = String(data.company || '').trim()
    const subject = String(data.subject || '').trim()
    const message = String(data.message || '').trim()
    const product = String(data.product || 'Contact').trim()

    if (!name || !email) {
      return NextResponse.json({ ok: false, error: 'Name and email are required.' }, { status: 400 })
    }

    await notifyFormSubmission({
      formType: 'Contact Form',
      subject: `New contact message — ${name}${subject ? ` (${subject})` : ''}`,
      replyTo: email,
      fields: {
        Name: name,
        Email: email,
        Phone: phone,
        Company: company,
        Subject: subject,
        Product: product,
        Message: message,
      },
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}

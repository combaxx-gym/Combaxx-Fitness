import nodemailer from 'nodemailer'

const DEFAULT_TO = [
  'info@combaxxfitness.com',
  'combaxxfitness@gmail.com',
]

function getNotifyTo(): string[] {
  const raw = process.env.NOTIFY_EMAILS?.trim()
  if (!raw) return DEFAULT_TO
  return raw.split(',').map(s => s.trim()).filter(Boolean)
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function rowsHtml(fields: Record<string, string | number | boolean | null | undefined>) {
  return Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    .map(([key, value]) => {
      const label = escapeHtml(key)
      const text = escapeHtml(String(value))
      return `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;font-size:13px;width:160px;vertical-align:top;">${label}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#111;font-size:14px;white-space:pre-wrap;">${text}</td>
        </tr>`
    })
    .join('')
}

function buildHtml(payload: FormNotifyPayload) {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#111;">
      <div style="background:#161616;color:#fff;padding:16px 20px;">
        <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#FF3333;">Combaxx Fitness</div>
        <h1 style="margin:6px 0 0;font-size:20px;font-weight:700;">${escapeHtml(payload.formType)}</h1>
      </div>
      <p style="padding:16px 20px 8px;margin:0;color:#444;font-size:14px;">
        A new form submission was received on the website.
      </p>
      <table style="width:100%;border-collapse:collapse;margin:0 0 20px;">
        ${rowsHtml(payload.fields)}
      </table>
      <p style="padding:0 20px 20px;margin:0;color:#999;font-size:12px;">
        Sent automatically from Combaxx Fitness website
      </p>
    </div>
  `
}

function buildText(payload: FormNotifyPayload) {
  const lines = Object.entries(payload.fields)
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    .map(([k, v]) => `${k}: ${String(v)}`)
  return [`${payload.formType}`, '', ...lines].join('\n')
}

export type FormNotifyPayload = {
  formType: string
  subject: string
  fields: Record<string, string | number | boolean | null | undefined>
  replyTo?: string
}

async function sendViaResend(payload: FormNotifyPayload, to: string[], html: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) return false

  const from =
    process.env.EMAIL_FROM?.trim() ||
    'Combaxx Fitness <onboarding@resend.dev>'

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject: payload.subject,
      html,
      ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    console.error('[notifyEmail] Resend failed:', res.status, body)
    return false
  }

  console.log('[notifyEmail] Sent via Resend →', to.join(', '))
  return true
}

async function sendViaSmtp(payload: FormNotifyPayload, to: string[], html: string, text: string): Promise<boolean> {
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS?.trim()
  if (!user || !pass) return false

  const host = process.env.SMTP_HOST?.trim() || 'smtp.gmail.com'
  const port = Number(process.env.SMTP_PORT || 587)
  const from =
    process.env.EMAIL_FROM?.trim() ||
    `Combaxx Fitness <${user}>`

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  await transporter.sendMail({
    from,
    to: to.join(', '),
    subject: payload.subject,
    text,
    html,
    ...(payload.replyTo ? { replyTo: payload.replyTo } : {}),
  })

  console.log('[notifyEmail] Sent via SMTP →', to.join(', '))
  return true
}

/**
 * Sends a notification email to Combaxx inboxes.
 * Tries Resend first, then Gmail/SMTP. Never throws.
 */
export async function notifyFormSubmission(payload: FormNotifyPayload): Promise<{ sent: boolean }> {
  const to = getNotifyTo()
  if (to.length === 0) {
    console.warn('[notifyEmail] No notify recipients configured.')
    return { sent: false }
  }

  const html = buildHtml(payload)
  const text = buildText(payload)

  try {
    if (await sendViaResend(payload, to, html)) return { sent: true }
  } catch (err) {
    console.error('[notifyEmail] Resend error:', err)
  }

  try {
    if (await sendViaSmtp(payload, to, html, text)) return { sent: true }
  } catch (err) {
    console.error('[notifyEmail] SMTP error:', err)
  }

  console.error(
    '[notifyEmail] Email NOT sent. Add either RESEND_API_KEY or SMTP_USER + SMTP_PASS (Gmail App Password) to .env, then restart the server.'
  )
  return { sent: false }
}

'use client'

import { useState, FormEvent, useMemo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImageSource } from '@sanity/image-url'
import styles from '@/styles/components/InquiryForm.module.css'

interface Props {
  productName: string
  productSku?: string
  productSlug: string
  productId: string
  productImage?: SanityImageSource | null
  gallery?: SanityImageSource[] | null
}

const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria',
  'Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia',
  'Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia',
  'Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo','Costa Rica',
  'Croatia','Cuba','Cyprus','Czech Republic','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt',
  'El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia','Fiji','Finland','France','Gabon',
  'Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti',
  'Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Jamaica','Japan',
  'Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia',
  'Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta',
  'Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro',
  'Morocco','Mozambique','Myanmar','Namibia','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger',
  'Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan','Palau','Palestine','Panama','Papua New Guinea',
  'Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Rwanda','Saint Kitts and Nevis',
  'Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia',
  'Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia',
  'South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria',
  'Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia',
  'Turkey','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States',
  'Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe',
]

function SendIcon() {
  return (
    <svg className={styles.submitIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg className={styles.successIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className={styles.perkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function InquiryForm({
  productName,
  productSku,
  productSlug,
  productId,
  productImage,
  gallery,
}: Props) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', country: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)

  const images = useMemo(() => {
    const list: SanityImageSource[] = []
    if (productImage) list.push(productImage)
    if (gallery?.length) {
      for (const img of gallery) {
        if (list.length >= 4) break
        list.push(img)
      }
    }
    return list
  }, [productImage, gallery])

  const activeImage = images[activeIdx] || images[0]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          productName,
          productSku: productSku || '',
          productSlug,
          productId,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <section className={styles.section} id="inquiry-form" aria-labelledby="inquiry-heading">
      <div className={styles.header}>
        <span className={styles.badge}>Get a Quote</span>
        <h2 className={styles.title} id="inquiry-heading">Request Information</h2>
        <p className={styles.subtitle}>
          Fill out the form and our B2B team will respond within 24 hours with pricing and availability.
        </p>
      </div>

      <motion.div
        className={styles.layout}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* ── Left: product visuals ── */}
        <aside className={styles.visual} aria-label={`${productName} preview`}>
          <div className={styles.visualMain}>
            {activeImage ? (
                  <Image
                    src={urlFor(activeImage).width(900).height(900).url()}
                    alt={productName}
                    fill
                    className={styles.visualImage}
                    sizes="(max-width: 1023px) 100vw, 42vw"
                    unoptimized
                  />
            ) : (
              <div className={styles.visualPlaceholder} />
            )}
            <div className={styles.visualOverlay} />
            <div className={styles.visualMeta}>
              <span className={styles.visualLabel}>Inquiring about</span>
              <p className={styles.visualName}>{productName}</p>
              {productSku && <p className={styles.visualSku}>SKU: {productSku}</p>}
            </div>
          </div>

          {images.length > 1 && (
            <div className={styles.thumbs} role="list">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  role="listitem"
                  className={`${styles.thumb} ${i === activeIdx ? styles.thumbActive : ''}`}
                  onClick={() => setActiveIdx(i)}
                  aria-label={`View image ${i + 1}`}
                  aria-pressed={i === activeIdx}
                >
                  <Image
                    src={urlFor(img).width(200).height(200).url()}
                    alt=""
                    fill
                    className={styles.thumbImage}
                    sizes="80px"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          )}

          <ul className={styles.perks}>
            <li><CheckIcon /> Response within 24 hours</li>
            <li><CheckIcon /> Bulk &amp; B2B pricing</li>
            <li><CheckIcon /> Installation support available</li>
          </ul>
        </aside>

        {/* ── Right: form ── */}
        <div className={styles.card}>
          {status === 'success' ? (
            <div className={styles.successCard}>
              <CheckCircleIcon />
              <h3 className={styles.successTitle}>Inquiry Received!</h3>
              <p className={styles.successText}>
                Thank you for your interest in <strong>{productName}</strong>. Our team will review your inquiry and get back to you within 24 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label htmlFor="inq-name" className={styles.label}>Full Name <span className={styles.required}>*</span></label>
                  <input
                    id="inq-name" name="name" type="text" required
                    placeholder="John Smith"
                    value={form.name} onChange={handleChange}
                    className={styles.input}
                    disabled={status === 'loading'}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="inq-email" className={styles.label}>Email Address <span className={styles.required}>*</span></label>
                  <input
                    id="inq-email" name="email" type="email" required
                    placeholder="john@company.com"
                    value={form.email} onChange={handleChange}
                    className={styles.input}
                    disabled={status === 'loading'}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="inq-phone" className={styles.label}>Phone Number</label>
                  <input
                    id="inq-phone" name="phone" type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone} onChange={handleChange}
                    className={styles.input}
                    disabled={status === 'loading'}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="inq-company" className={styles.label}>Company / Organization</label>
                  <input
                    id="inq-company" name="company" type="text"
                    placeholder="Fitness Center Inc."
                    value={form.company} onChange={handleChange}
                    className={styles.input}
                    disabled={status === 'loading'}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="inq-country" className={styles.label}>Country</label>
                  <select
                    id="inq-country" name="country"
                    value={form.country} onChange={handleChange}
                    className={styles.select}
                    disabled={status === 'loading'}
                  >
                    <option value="">Select your country</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className={`${styles.field} ${styles.fullWidth}`}>
                  <label htmlFor="inq-message" className={styles.label}>Message <span className={styles.required}>*</span></label>
                  <textarea
                    id="inq-message" name="message" required
                    placeholder="Please describe your requirements, quantity needed, project timeline, or any specific questions..."
                    value={form.message} onChange={handleChange}
                    className={styles.textarea}
                    disabled={status === 'loading'}
                  />
                </div>

                {status === 'error' && (
                  <div className={`${styles.errorMsg} ${styles.fullWidth}`} role="alert">
                    {errorMsg}
                  </div>
                )}
              </div>

              <div className={styles.footer}>
                <p className={styles.privacy}>
                  By submitting this form you agree to our privacy policy. We never share your information with third parties.
                </p>
                <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
                  {status === 'loading' ? 'Sending...' : (
                    <><SendIcon /> Send Inquiry</>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  )
}

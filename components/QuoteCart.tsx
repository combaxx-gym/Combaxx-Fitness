'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight, Check, ChevronDown, ClipboardList, Minus, Plus, Share2, Trash2, X,
} from 'lucide-react'
import {
  QUOTE_CART_OPEN, QUOTE_CART_UPDATED, clearQuoteCart, getProductPath, getQuoteCart,
  removeFromQuoteCart, setQuoteCartQty, type QuoteCartItem,
} from '@/lib/quoteCart'
import { COUNTRIES, REGIONS, findCountry } from '@/lib/countries'
import { detectCountryCode, getVisitor } from '@/lib/visitor'
import styles from '@/styles/components/QuoteCart.module.css'

const BUSINESS_CATEGORIES = [
  'Commercial Gym / Fitness Club',
  'Hotel & Resort',
  'Corporate Wellness',
  'School / University',
  'Physiotherapy & Rehab',
  'Military / Police / Government',
  'Residential / Home Gym',
  'Dealer / Distributor',
  'Other',
]

const EXPERTS = [
  'Sales Expert',
  'Gym Setup Consultant',
  'Technical Support',
]

type FormState = {
  countryCode: string
  name: string
  phone: string
  street: string
  extraAddress: string
  zip: string
  city: string
  email: string
  sendTo: string
  businessCategory: string
  message: string
  wantsUpdates: boolean
}

const EMPTY_FORM: FormState = {
  countryCode: '',
  name: '',
  phone: '',
  street: '',
  extraAddress: '',
  zip: '',
  city: '',
  email: '',
  sendTo: EXPERTS[0],
  businessCategory: '',
  message: '',
  wantsUpdates: true,
}

function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [locked])
}

export default function QuoteCart() {
  const pathname = usePathname()
  const [items, setItems] = useState<QuoteCartItem[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')

  useEffect(() => {
    const sync = () => setItems(getQuoteCart())
    const open = () => { sync(); setDrawerOpen(true) }
    sync()
    window.addEventListener(QUOTE_CART_UPDATED, sync)
    window.addEventListener(QUOTE_CART_OPEN, open)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(QUOTE_CART_UPDATED, sync)
      window.removeEventListener(QUOTE_CART_OPEN, open)
      window.removeEventListener('storage', sync)
    }
  }, [])

  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  useBodyLock(drawerOpen || formOpen)

  useEffect(() => {
    if (!drawerOpen && !formOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (formOpen) setFormOpen(false)
      else setDrawerOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [drawerOpen, formOpen])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2200)
    return () => clearTimeout(t)
  }, [toast])

  const totalQty = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])
  const country = findCountry(form.countryCode)

  const openForm = useCallback(() => {
    const visitor = getVisitor()
    setForm(prev => ({
      ...prev,
      countryCode: prev.countryCode || visitor?.countryCode || '',
      phone: prev.phone || visitor?.phone || '',
    }))
    if (!visitor?.countryCode) {
      detectCountryCode().then(code =>
        setForm(prev => (prev.countryCode ? prev : { ...prev, countryCode: code }))
      )
    }
    setError('')
    setStatus('idle')
    setFormOpen(true)
  }, [])

  const handleShare = useCallback(async () => {
    const origin = window.location.origin
    const lines = items.map(i => `• ${i.qty} × ${i.name}${i.sku ? ` (${i.sku})` : ''} — ${origin}${getProductPath(i)}`)
    const text = `My Combaxx Fitness quote list:\n${lines.join('\n')}`
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Combaxx Fitness Quote List', text })
        return
      }
      await navigator.clipboard.writeText(text)
      setToast('Quote list copied to clipboard')
    } catch (err) {
      if ((err as DOMException)?.name !== 'AbortError') setToast('Could not share the list')
    }
  }, [items])

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (items.length === 0) return setError('Your quote cart is empty.')
    if (!country) return setError('Please select your country.')

    setStatus('loading')
    try {
      const res = await fetch('/api/quote-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          phone: form.phone.replace(/[^\d\s-]/g, '').trim(),
          items: items.map(({ _id, name, sku, slug, categorySlug, qty }) => ({ _id, name, sku, slug, categorySlug, qty })),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'Failed to send your request.')
      clearQuoteCart()
      setStatus('success')
      setForm(prev => ({ ...EMPTY_FORM, countryCode: prev.countryCode, phone: prev.phone }))
    } catch (err) {
      setStatus('idle')
      setError(err instanceof Error ? err.message : 'Failed to send your request.')
    }
  }

  const closeForm = () => {
    setFormOpen(false)
    if (status === 'success') {
      setDrawerOpen(false)
      setStatus('idle')
    }
  }

  return (
    <>
      {/* ── Drawer ── */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            key="qc-backdrop"
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
          />
        )}
        {drawerOpen && (
          <motion.aside
            key="qc-drawer"
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="Quote cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className={styles.drawerHead}>
              <div>
                <span className={styles.eyebrow}>Combaxx Fitness</span>
                <h2 className={styles.drawerTitle}>
                  Quote Cart
                  {items.length > 0 && <span className={styles.countPill}>{totalQty}</span>}
                </h2>
              </div>
              <button type="button" className={styles.iconClose} onClick={() => setDrawerOpen(false)} aria-label="Close quote cart">
                <X size={18} />
              </button>
            </header>

            {items.length === 0 ? (
              <div className={styles.empty}>
                <span className={styles.emptyIcon}><ClipboardList size={28} /></span>
                <h3 className={styles.emptyTitle}>Your quote cart is empty</h3>
                <p className={styles.emptyText}>
                  Add equipment to your list and request one combined quote for your facility.
                </p>
                <Link href="/shop" className={styles.btnPrimary} onClick={() => setDrawerOpen(false)}>
                  Browse Products <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <>
                <p className={styles.drawerIntro}>
                  Save your selections and request a combined quote. Adjust quantities as needed.
                </p>

                <ul className={styles.list}>
                  <AnimatePresence initial={false}>
                    {items.map(item => (
                      <motion.li
                        key={item._id}
                        layout
                        className={styles.item}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.22 }}
                      >
                        <Link href={getProductPath(item)} className={styles.thumb} onClick={() => setDrawerOpen(false)}>
                          {item.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={item.image} alt={item.name} loading="lazy" />
                          ) : (
                            <ClipboardList size={22} />
                          )}
                        </Link>

                        <div className={styles.itemBody}>
                          <Link href={getProductPath(item)} className={styles.itemName} onClick={() => setDrawerOpen(false)}>
                            {item.name}
                          </Link>
                          {item.sku && <span className={styles.itemSku}>SKU: {item.sku}</span>}

                          <div className={styles.itemControls}>
                            <div className={styles.stepper} role="group" aria-label={`Quantity for ${item.name}`}>
                              <button
                                type="button"
                                onClick={() => setQuoteCartQty(item._id, item.qty - 1)}
                                disabled={item.qty <= 1}
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} />
                              </button>
                              <span aria-live="polite">{item.qty}</span>
                              <button
                                type="button"
                                onClick={() => setQuoteCartQty(item._id, item.qty + 1)}
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            <button
                              type="button"
                              className={styles.remove}
                              onClick={() => removeFromQuoteCart(item._id)}
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <footer className={styles.drawerFoot}>
                  <div className={styles.summary}>
                    <span>{items.length} product{items.length === 1 ? '' : 's'}</span>
                    <span>{totalQty} unit{totalQty === 1 ? '' : 's'}</span>
                  </div>
                  <button type="button" className={styles.btnPrimary} onClick={openForm}>
                    Request a Quote <ArrowRight size={16} />
                  </button>
                  <div className={styles.footRow}>
                    <button type="button" className={styles.btnGhost} onClick={() => setDrawerOpen(false)}>
                      Continue Browsing
                    </button>
                    <button type="button" className={styles.btnGhost} onClick={handleShare}>
                      <Share2 size={15} /> Share
                    </button>
                  </div>
                </footer>
              </>
            )}

            <AnimatePresence>
              {toast && (
                <motion.div
                  className={styles.toast}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <Check size={14} /> {toast}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Request a Quote modal ── */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeForm}
          >
            <motion.div
              className={styles.modal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="rq-title"
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={e => e.stopPropagation()}
            >
              <button type="button" className={styles.modalClose} onClick={closeForm} aria-label="Close">
                <X size={18} />
              </button>

              {status === 'success' ? (
                <div className={styles.successBox}>
                  <span className={styles.successIcon}><Check size={28} /></span>
                  <h2 className={styles.modalTitle}>Request sent!</h2>
                  <p className={styles.modalSub}>
                    Thank you. A Combaxx expert will review your list and get back to you within 24 hours.
                  </p>
                  <button type="button" className={styles.btnPrimary} onClick={closeForm}>
                    Continue Browsing
                  </button>
                </div>
              ) : (
                <>
                  <div className={styles.modalHead}>
                    <span className={styles.eyebrow}>Quote Request</span>
                    <h2 id="rq-title" className={styles.modalTitle}>Request a Quote</h2>
                    <p className={styles.modalSub}>
                      Fill in your details and our team will send you a tailored quote for{' '}
                      <strong>{items.length} product{items.length === 1 ? '' : 's'}</strong>.
                    </p>
                  </div>

                  <details className={styles.itemsPreview}>
                    <summary>
                      <span>Products in your request ({totalQty} unit{totalQty === 1 ? '' : 's'})</span>
                      <ChevronDown size={16} />
                    </summary>
                    <ul>
                      {items.map(i => (
                        <li key={i._id}>
                          <span className={styles.previewQty}>{i.qty}×</span>
                          <span className={styles.previewName}>{i.name}</span>
                          {i.sku && <span className={styles.previewSku}>{i.sku}</span>}
                        </li>
                      ))}
                    </ul>
                  </details>

                  <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={`${styles.field} ${styles.full}`}>
                      <span className={styles.label}>Country *</span>
                      <span className={styles.selectWrap}>
                        <select
                          className={styles.input}
                          value={form.countryCode}
                          onChange={e => update('countryCode', e.target.value)}
                          required
                        >
                          <option value="" disabled>Select country</option>
                          {REGIONS.map(r => (
                            <optgroup key={r} label={r}>
                              {COUNTRIES.filter(c => c.region === r).map(c => (
                                <option key={c.code} value={c.code}>{c.name}</option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                        <ChevronDown size={16} className={styles.chevron} />
                      </span>
                    </label>

                    <label className={styles.field}>
                      <span className={styles.label}>Name *</span>
                      <input className={styles.input} value={form.name} onChange={e => update('name', e.target.value)} autoComplete="name" placeholder="Full name" required />
                    </label>

                    <label className={styles.field}>
                      <span className={styles.label}>Phone *</span>
                      <span className={styles.phoneWrap}>
                        <span className={styles.dial}>{country?.dial || '+'}</span>
                        <input
                          className={styles.phoneInput}
                          type="tel"
                          inputMode="tel"
                          value={form.phone}
                          onChange={e => update('phone', e.target.value.replace(/[^\d\s-]/g, ''))}
                          autoComplete="tel-national"
                          placeholder="Phone number"
                          required
                        />
                      </span>
                    </label>

                    <label className={styles.field}>
                      <span className={styles.label}>Street Address</span>
                      <input className={styles.input} value={form.street} onChange={e => update('street', e.target.value)} autoComplete="address-line1" placeholder="Street and number" />
                    </label>

                    <label className={styles.field}>
                      <span className={styles.label}>Extra Address</span>
                      <input className={styles.input} value={form.extraAddress} onChange={e => update('extraAddress', e.target.value)} autoComplete="address-line2" placeholder="Apartment, suite, building" />
                    </label>

                    <label className={styles.field}>
                      <span className={styles.label}>Zip Code</span>
                      <input className={styles.input} value={form.zip} onChange={e => update('zip', e.target.value)} autoComplete="postal-code" placeholder="Zip / Postal code" />
                    </label>

                    <label className={styles.field}>
                      <span className={styles.label}>City *</span>
                      <input className={styles.input} value={form.city} onChange={e => update('city', e.target.value)} autoComplete="address-level2" placeholder="City" required />
                    </label>

                    <label className={`${styles.field} ${styles.full}`}>
                      <span className={styles.label}>Email *</span>
                      <input className={styles.input} type="email" value={form.email} onChange={e => update('email', e.target.value)} autoComplete="email" placeholder="you@company.com" required />
                    </label>

                    <label className={styles.field}>
                      <span className={styles.label}>Send to Expert</span>
                      <span className={styles.selectWrap}>
                        <select className={styles.input} value={form.sendTo} onChange={e => update('sendTo', e.target.value)}>
                          {EXPERTS.map(x => <option key={x} value={x}>{x}</option>)}
                        </select>
                        <ChevronDown size={16} className={styles.chevron} />
                      </span>
                    </label>

                    <label className={styles.field}>
                      <span className={styles.label}>Business Category *</span>
                      <span className={styles.selectWrap}>
                        <select className={styles.input} value={form.businessCategory} onChange={e => update('businessCategory', e.target.value)} required>
                          <option value="" disabled>Select category</option>
                          {BUSINESS_CATEGORIES.map(x => <option key={x} value={x}>{x}</option>)}
                        </select>
                        <ChevronDown size={16} className={styles.chevron} />
                      </span>
                    </label>

                    <label className={`${styles.field} ${styles.full}`}>
                      <span className={styles.label}>Message</span>
                      <textarea
                        className={`${styles.input} ${styles.textarea}`}
                        value={form.message}
                        onChange={e => update('message', e.target.value)}
                        rows={4}
                        placeholder="Tell us about your facility, timeline or any custom requirements"
                      />
                    </label>

                    <label className={`${styles.checkbox} ${styles.full}`}>
                      <input type="checkbox" checked={form.wantsUpdates} onChange={e => update('wantsUpdates', e.target.checked)} />
                      <span className={styles.checkmark}><Check size={12} /></span>
                      <span>Yes, I would like to receive updates about Combaxx products, offers and news.</span>
                    </label>

                    {error && <p className={`${styles.error} ${styles.full}`} role="alert">{error}</p>}

                    <button type="submit" className={`${styles.btnPrimary} ${styles.full}`} disabled={status === 'loading' || items.length === 0}>
                      {status === 'loading' ? 'Sending…' : <>Submit Request <ArrowRight size={16} /></>}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

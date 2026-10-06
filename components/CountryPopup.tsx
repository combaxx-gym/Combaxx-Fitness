'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown, Globe2, X } from 'lucide-react'
import { REGIONS, countriesInRegion, findCountry, type Region } from '@/lib/countries'
import { detectCountryCode, getVisitor, saveVisitor } from '@/lib/visitor'
import styles from '@/styles/components/CountryPopup.module.css'

const DISMISS_KEY = 'combaxxVisitorDismissed'
const HIDDEN_PREFIXES = ['/studio', '/sign-in', '/sign-up']

export default function CountryPopup() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [detected, setDetected] = useState<string>('')
  const [region, setRegion] = useState<Region>('Asia')
  const [countryCode, setCountryCode] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [error, setError] = useState('')

  const touched = useRef(false)
  const hiddenRoute = HIDDEN_PREFIXES.some(p => pathname?.startsWith(p))

  useEffect(() => {
    if (hiddenRoute || getVisitor() || sessionStorage.getItem(DISMISS_KEY)) return
    let cancelled = false

    detectCountryCode().then(code => {
      if (cancelled) return
      const c = findCountry(code)
      if (!c) return
      setDetected(c.code)
      if (touched.current) return
      setCountryCode(c.code)
      setRegion(c.region)
    })

    const t = setTimeout(() => !cancelled && setOpen(true), 1200)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [hiddenRoute])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && dismiss()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const regionCountries = useMemo(() => countriesInRegion(region), [region])
  const country = findCountry(countryCode)

  const handleRegion = (r: Region) => {
    touched.current = true
    setRegion(r)
    if (country?.region !== r) setCountryCode(countriesInRegion(r)[0]?.code || '')
  }

  const handleCountry = (code: string) => {
    touched.current = true
    setCountryCode(code)
    const c = findCountry(code)
    if (c) setRegion(c.region)
  }

  function dismiss() {
    try { sessionStorage.setItem(DISMISS_KEY, '1') } catch { /* ignore */ }
    setOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const digits = phone.replace(/\D/g, '')
    if (!country) return setError('Please select your country.')
    if (digits.length < 6 || digits.length > 15) return setError('Please enter a valid phone number.')

    setStatus('loading')
    try {
      const res = await fetch('/api/visitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          countryCode: country.code,
          phone: digits,
          detectedCountry: detected,
          landingPage: window.location.pathname,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'Failed to save. Please try again.')

      saveVisitor({ countryCode: country.code, phone: digits, submittedAt: new Date().toISOString() })
      setStatus('success')
      setTimeout(() => setOpen(false), 1400)
    } catch (err) {
      setStatus('idle')
      setError(err instanceof Error ? err.message : 'Failed to save. Please try again.')
    }
  }

  if (hiddenRoute) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={dismiss}
        >
          <motion.div
            className={styles.card}
            role="dialog"
            aria-modal="true"
            aria-labelledby="country-popup-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
          >
            <button type="button" className={styles.close} onClick={dismiss} aria-label="Close">
              <X size={18} />
            </button>

            {status === 'success' ? (
              <div className={styles.success}>
                <span className={styles.successIcon}><Check size={26} /></span>
                <h2 className={styles.title}>Thank you!</h2>
                <p className={styles.subtitle}>
                  You&apos;re now browsing products and prices for <strong>{country?.name}</strong>.
                </p>
              </div>
            ) : (
              <>
                <div className={styles.head}>
                  <span className={styles.badge}><Globe2 size={20} /></span>
                  <h2 id="country-popup-title" className={styles.title}>
                    Select Country and enter your number
                  </h2>
                  <p className={styles.subtitle}>
                    Our products and prices may vary from country to country.
                  </p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <div className={styles.row}>
                    <label className={styles.field}>
                      <span className={styles.label}>Region</span>
                      <span className={styles.selectWrap}>
                        <select
                          className={styles.select}
                          value={region}
                          onChange={e => handleRegion(e.target.value as Region)}
                        >
                          {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                        <ChevronDown size={16} className={styles.chevron} />
                      </span>
                    </label>

                    <label className={styles.field}>
                      <span className={styles.label}>Country</span>
                      <span className={styles.selectWrap}>
                        <select
                          className={styles.select}
                          value={countryCode}
                          onChange={e => handleCountry(e.target.value)}
                        >
                          {!countryCode && <option value="">Detecting…</option>}
                          {regionCountries.map(c => (
                            <option key={c.code} value={c.code}>{c.name}</option>
                          ))}
                        </select>
                        <ChevronDown size={16} className={styles.chevron} />
                      </span>
                    </label>
                  </div>

                  <label className={styles.field}>
                    <span className={styles.label}>Phone Number</span>
                    <span className={styles.phoneWrap}>
                      <span className={styles.dial}>{country?.dial || '+'}</span>
                      <input
                        className={styles.phoneInput}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel-national"
                        placeholder="Enter your number"
                        value={phone}
                        onChange={e => setPhone(e.target.value.replace(/[^\d\s-]/g, ''))}
                        required
                      />
                    </span>
                  </label>

                  {error && <p className={styles.error} role="alert">{error}</p>}

                  <button type="submit" className={styles.submit} disabled={status === 'loading'}>
                    {status === 'loading' ? 'Saving…' : 'Submit'}
                  </button>

                  <p className={styles.note}>We respect your privacy. Your number is only used by the Combaxx team.</p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

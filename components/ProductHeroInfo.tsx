'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from '@/styles/components/ProductHeroInfo.module.css'

interface Props {
  productId: string
  productName: string
  productSku?: string
  productSlug: string
  categoryName?: string
  description?: string
  features?: string[]
  specsPdfUrl?: string
}

function CartIcon() {
  return (
    <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

export default function ProductHeroInfo({
  productId, productName, productSku, productSlug, categoryName, description, features = [], specsPdfUrl,
}: Props) {
  const [added, setAdded] = useState(false)

  useEffect(() => {
    try {
      const cart: { _id: string }[] = JSON.parse(localStorage.getItem('quoteCart') || '[]')
      setAdded(cart.some(i => i._id === productId))
    } catch { /* ignore */ }
  }, [productId])

  const handleAddToCart = useCallback(() => {
    try {
      const cart: unknown[] = JSON.parse(localStorage.getItem('quoteCart') || '[]')
      const exists = (cart as { _id: string }[]).some(i => i._id === productId)
      if (!exists) {
        cart.push({ _id: productId, name: productName, slug: productSlug, sku: productSku })
        localStorage.setItem('quoteCart', JSON.stringify(cart))
        window.dispatchEvent(new Event('quoteCartUpdated'))
      }
      setAdded(true)
    } catch { /* ignore */ }
  }, [productId, productName, productSlug, productSku])

  const handleScrollToForm = useCallback(() => {
    document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <motion.div
      className={styles.panel}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
    >
      {categoryName && <div className={styles.categoryLabel}>{categoryName}</div>}

      <h1 className={styles.productName}>{productName}</h1>

      {productSku && (
        <div className={styles.skuRow}>
          <span className={styles.skuLabel}>SKU</span>
          <span className={styles.skuValue}>{productSku}</span>
        </div>
      )}

      <div className={styles.divider} aria-hidden="true" />

      {description && <p className={styles.description}>{description}</p>}

      <div className={styles.actions}>
        <button
          onClick={handleAddToCart}
          className={`${styles.btnCart} ${added ? styles.btnCartAdded : ''}`}
          aria-label={added ? 'Added to quote cart' : 'Add to quote cart'}
        >
          {added ? <CheckIcon /> : <CartIcon />}
          {added ? 'Added to Quote Cart' : 'Add to Quote Cart'}
        </button>

        <button onClick={handleScrollToForm} className={styles.btnQuote}>
          <MailIcon />
          Request Quote
        </button>

        {specsPdfUrl && (
          <a href={specsPdfUrl} target="_blank" rel="noopener noreferrer" className={styles.btnPdf} download>
            <FileIcon />
            Download PDF Brochure
          </a>
        )}
      </div>
    </motion.div>
  )
}

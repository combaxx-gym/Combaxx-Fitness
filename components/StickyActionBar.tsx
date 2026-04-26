'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '@/styles/components/StickyActionBar.module.css'

interface Props {
  productId: string
  productName: string
  productSku?: string
  productSlug: string
}

function CartIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

export default function StickyActionBar({ productId, productName, productSku, productSlug }: Props) {
  const [visible, setVisible] = useState(false)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 580)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  const handleRequestQuote = useCallback(() => {
    const form = document.getElementById('inquiry-form')
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.bar}
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -64, opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          role="toolbar"
          aria-label="Product quick actions"
        >
          <div className={styles.productInfo}>
            <div className={styles.productName}>{productName}</div>
            {productSku && <div className={styles.productSku}>SKU: {productSku}</div>}
          </div>

          <div className={styles.actions}>
            <button
              onClick={handleAddToCart}
              className={`${styles.btnCart} ${added ? styles.btnCartAdded : ''}`}
              aria-label={added ? 'Added to quote cart' : 'Add to quote cart'}
            >
              {added ? <CheckIcon /> : <CartIcon />}
              <span className={styles.cartLabel}>{added ? 'In Cart' : 'Add to Cart'}</span>
            </button>

            <button onClick={handleRequestQuote} className={styles.btnQuote}>
              <MailIcon />
              <span className={styles.quoteLabel}>Request Quote</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

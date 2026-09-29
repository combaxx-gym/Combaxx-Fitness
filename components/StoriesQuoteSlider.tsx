'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '@/styles/pages/stories.module.css'

interface Quote {
  text: string
  author: string
  role: string
  location: string
  image?: string
}

const AUTOPLAY_MS = 6000

export default function StoriesQuoteSlider({ quotes }: { quotes: Quote[] }) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const prev = useCallback(() => setCurrent(c => (c - 1 + quotes.length) % quotes.length), [quotes.length])
  const next = useCallback(() => setCurrent(c => (c + 1) % quotes.length), [quotes.length])

  useEffect(() => {
    if (paused || quotes.length < 2) return
    const id = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, next, quotes.length, current])

  const quote = quotes[current]

  return (
    <div
      className={styles.quoteSliderWrap}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.quoteSliderInner}>
        <div className={styles.quoteSliderContent}>
          <div className={styles.quoteSliderMark} aria-hidden>&ldquo;</div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={styles.quoteSliderBody}
            >
              <p className={styles.quoteSliderText}>{quote.text}</p>
              <div className={styles.quoteSliderAuthorBlock}>
                <div className={styles.quoteSliderAvatar} aria-hidden>
                  {quote.author[0]}
                </div>
                <div className={styles.quoteSliderAuthorInfo}>
                  <div className={styles.quoteSliderAuthor}>{quote.author}</div>
                  <div className={styles.quoteSliderRole}>{quote.role}</div>
                  <div className={styles.quoteSliderLocation}>{quote.location}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.quoteSliderMedia}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={styles.quoteSliderMediaInner}
            >
              {quote.image ? (
                <img src={quote.image} alt={quote.author} className={styles.quoteSliderImg} />
              ) : (
                <div className={styles.quoteSliderImgPlaceholder} aria-hidden>
                  <span>{quote.author[0]}</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className={styles.quoteSliderControls}>
        <button type="button" onClick={prev} className={styles.quoteSliderArrow} aria-label="Previous testimonial">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className={styles.quoteSliderDots} role="tablist" aria-label="Testimonials">
          {quotes.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`${styles.quoteSliderDot} ${i === current ? styles.quoteSliderDotActive : ''}`}
              aria-label={`Testimonial ${i + 1}`}
              aria-selected={i === current}
              role="tab"
            />
          ))}
        </div>
        <button type="button" onClick={next} className={styles.quoteSliderArrow} aria-label="Next testimonial">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '@/styles/pages/wellness.module.css'

interface Quote {
  text: string
  author: string
  role: string
}

export default function WellnessQuoteSlider({ quotes }: { quotes: Quote[] }) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(c => (c - 1 + quotes.length) % quotes.length)
  const next = () => setCurrent(c => (c + 1) % quotes.length)

  return (
    <div className={styles.quotesWrap}>
      <div className={styles.quotesInner}>
        <button onClick={prev} className={styles.quoteArrow} aria-label="Previous quote">
          ←
        </button>

        <div className={styles.quoteContent}>
          <div className={styles.quoteMark}>&ldquo;</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <p className={styles.quoteText}>{quotes[current].text}</p>
              <div className={styles.quoteAuthorWrap}>
                <div className={styles.quoteAvatar}>{quotes[current].author[0]}</div>
                <div>
                  <div className={styles.quoteAuthor}>{quotes[current].author}</div>
                  <div className={styles.quoteRole}>{quotes[current].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button onClick={next} className={styles.quoteArrow} aria-label="Next quote">
          →
        </button>
      </div>

      <div className={styles.quoteIndicators}>
        {quotes.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`${styles.quoteIndicator} ${i === current ? styles.quoteIndicatorActive : ''}`}
            aria-label={`Quote ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

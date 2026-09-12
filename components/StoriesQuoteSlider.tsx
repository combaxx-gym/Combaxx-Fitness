'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '@/styles/pages/stories.module.css'

interface Quote {
  text: string
  author: string
  role: string
  location: string
}

export default function StoriesQuoteSlider({ quotes }: { quotes: Quote[] }) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(c => (c - 1 + quotes.length) % quotes.length)
  const next = () => setCurrent(c => (c + 1) % quotes.length)

  return (
    <div className={styles.quoteSliderWrap}>
      <div className={styles.quoteSliderInner}>
        <button onClick={prev} className={styles.quoteSliderArrow} aria-label="Previous testimonial">‹</button>
        <button onClick={next} className={styles.quoteSliderArrow} aria-label="Next testimonial">›</button>

        <div className={styles.quoteSliderContent}>
          <div className={styles.quoteSliderMark} aria-hidden>&ldquo;</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={styles.quoteSliderBody}
            >
              <p className={styles.quoteSliderText}>{quotes[current].text}</p>
              <div className={styles.quoteSliderAuthorBlock}>
                <div className={styles.quoteSliderAvatar} aria-hidden>
                  {quotes[current].author[0]}
                </div>
                <div className={styles.quoteSliderAuthorInfo}>
                  <div className={styles.quoteSliderAuthor}>{quotes[current].author}</div>
                  <div className={styles.quoteSliderRole}>{quotes[current].role}</div>
                  <div className={styles.quoteSliderLocation}>{quotes[current].location}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className={styles.quoteSliderDots} role="tablist" aria-label="Testimonials">
        {quotes.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`${styles.quoteSliderDot} ${i === current ? styles.quoteSliderDotActive : ''}`}
            aria-label={`Testimonial ${i + 1}`}
            aria-selected={i === current}
            role="tab"
          />
        ))}
      </div>
    </div>
  )
}

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
      <div className={styles.container}>
        <div className={styles.quoteSliderInner}>
          <button onClick={prev} className={styles.quoteSliderArrow} aria-label="Previous">←</button>

          <div className={styles.quoteSliderContent}>
            <div className={styles.quoteSliderMark}>&ldquo;</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className={styles.quoteSliderBody}
              >
                <p className={styles.quoteSliderText}>{quotes[current].text}</p>
                <div className={styles.quoteSliderAuthorBlock}>
                  <div className={styles.quoteSliderAvatar}>{quotes[current].author[0]}</div>
                  <div>
                    <div className={styles.quoteSliderAuthor}>{quotes[current].author}</div>
                    <div className={styles.quoteSliderRole}>{quotes[current].role}</div>
                    <div className={styles.quoteSliderLocation}>{quotes[current].location}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button onClick={next} className={styles.quoteSliderArrow} aria-label="Next">→</button>
        </div>

        <div className={styles.quoteSliderDots}>
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`${styles.quoteSliderDot} ${i === current ? styles.quoteSliderDotActive : ''}`}
              aria-label={`Quote ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

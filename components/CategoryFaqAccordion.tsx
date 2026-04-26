'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '@/styles/pages/category.module.css'

interface Faq { question: string; answer: string }

export default function CategoryFaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0)

  if (!faqs.length) return null

  return (
    <div className={styles.faqGrid}>
      {faqs.map((faq, i) => {
        const isOpen = open === i
        return (
          <div key={i} className={styles.faqItem}>
            <button
              className={`${styles.faqTrigger} ${isOpen ? styles.faqTriggerOpen : ''}`}
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className={styles.faqQuestion}>{faq.question}</span>
              <motion.span
                className={styles.faqIcon}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                ▾
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className={styles.faqAnswer}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                >
                  <p className={styles.faqAnswerInner}>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

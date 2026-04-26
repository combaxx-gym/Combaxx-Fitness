'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '@/styles/components/ProductFaqs.module.css'

interface Faq {
  question: string
  answer: string
}

interface Props {
  faqs: Faq[]
}

function ChevronDown() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function ProductFaqs({ faqs }: Props) {
  const [open, setOpen] = useState<number | null>(0)

  if (!faqs.length) return null

  return (
    <section className={styles.section} aria-labelledby="faqs-heading">
      <div className={styles.header}>
        <span className={styles.badge}>Got Questions?</span>
        <h2 className={styles.title} id="faqs-heading">Frequently Asked Questions</h2>
      </div>

      <div className={styles.list} role="list">
        {faqs.map((faq, i) => {
          const isOpen = open === i
          return (
            <div key={i} className={styles.item} role="listitem">
              <button
                className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ''}`}
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
              >
                <span className={styles.question}>{faq.question}</span>
                <span className={styles.iconWrapper}>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    style={{ display: 'flex' }}
                  >
                    <ChevronDown />
                  </motion.span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    className={styles.answerWrapper}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    role="region"
                    aria-labelledby={`faq-trigger-${i}`}
                  >
                    <p className={styles.answer}>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}

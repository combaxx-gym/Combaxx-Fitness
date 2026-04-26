'use client'

import { motion } from 'framer-motion'
import styles from '@/styles/components/InstallationWarranty.module.css'

interface Props {
  installation?: string
  warranty?: string
}

const DEFAULT_INSTALLATION = [
  'Requires minimum 3m × 3m floor space',
  'Professional installation recommended',
  'Rubber flooring protection advised',
  'Assembly time: approximately 2–4 hours',
  'Technical specifications provided on request',
]

const DEFAULT_WARRANTY = [
  '5-year warranty on frame and welds',
  '2-year warranty on cables and pulleys',
  '1-year warranty on upholstery and pads',
  'Lifetime warranty on structural components',
  'On-site service available in most regions',
]

function WrenchIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function InstallationWarranty({ installation, warranty }: Props) {
  return (
    <section className={styles.section} aria-label="Installation and warranty information">
      <div className={styles.grid}>
        {/* Installation */}
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.cardHead}>
            <div className={styles.iconWrapper}><WrenchIcon /></div>
            <h3 className={styles.cardTitle}>Installation</h3>
          </div>

          {installation ? (
            <p className={styles.content}>{installation}</p>
          ) : (
            <ul className={styles.defaultList}>
              {DEFAULT_INSTALLATION.map((item, i) => (
                <li key={i} className={styles.defaultItem}>
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* Warranty */}
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className={styles.cardHead}>
            <div className={styles.iconWrapper}><ShieldIcon /></div>
            <h3 className={styles.cardTitle}>Warranty</h3>
          </div>

          {warranty ? (
            <p className={styles.content}>{warranty}</p>
          ) : (
            <ul className={styles.defaultList}>
              {DEFAULT_WARRANTY.map((item, i) => (
                <li key={i} className={styles.defaultItem}>
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </section>
  )
}

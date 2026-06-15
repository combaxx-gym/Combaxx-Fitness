'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from '@/styles/components/CTA.module.css'

interface CtaProps {
  title?: string
  description?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
}

export default function CTA({
  title = "Ready to Equip Your Facility?",
  description = "Contact our B2B team for bulk pricing, custom configurations, and professional installation services tailored to your gym or fitness center.",
  primaryButtonText = "Request a Quote",
  primaryButtonLink = "/contact",
  secondaryButtonText = "Contact Us",
  secondaryButtonLink = "/contact"
}: CtaProps) {
  return (
    <section className={styles.ctaSection} aria-label="Call to action">
      <div className={styles.container}>
        <div className={styles.ctaCard}>
          <div className={styles.ctaGlow} />
          <div className={styles.ctaGlow2} />
          <div className={styles.ctaGridTopRight} />
          <div className={styles.ctaGridBottomLeft} />
          
          <div className={styles.ctaContent}>
            <motion.div 
              className={styles.ctaText}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className={styles.ctaBadge}>Let's Build Together</span>
              <h2 className={styles.ctaTitle}>{title}</h2>
              <p className={styles.ctaDesc}>{description}</p>
            </motion.div>

            <motion.div 
              className={styles.ctaBtns}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href={primaryButtonLink} className={styles.ctaBtn}>
                {primaryButtonText}
              </Link>
              {secondaryButtonText && secondaryButtonLink && (
                <Link href={secondaryButtonLink} className={`${styles.ctaBtn} ${styles.ctaBtnOutline}`}>
                  {secondaryButtonText}
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

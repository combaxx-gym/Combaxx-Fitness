'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
import { SanityImageSource } from '@sanity/image-url'
import styles from '@/styles/components/ProductAddons.module.css'

interface Addon {
  name: string
  description?: string
  image?: SanityImageSource
}

interface Props {
  addons: Addon[]
}

function BoxIcon() {
  return (
    <svg className={styles.placeholderIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  )
}

export default function ProductAddons({ addons }: Props) {
  if (!addons.length) return null

  return (
    <section className={styles.section} aria-labelledby="addons-heading">
      <div className={styles.header}>
        <span className={styles.badge}>Enhance Your Setup</span>
        <h2 className={styles.title} id="addons-heading">Add-ons &amp; Accessories</h2>
      </div>

      <div className={styles.grid}>
        {addons.map((addon, i) => (
          <motion.div
            key={i}
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <div className={styles.imageWrapper}>
              {addon.image ? (
                <Image
                  src={urlFor(addon.image).width(400).height(400).url()}
                  alt={addon.name}
                  fill
                  className={styles.image}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  unoptimized
                />
              ) : (
                <div className={styles.imagePlaceholder}>
                  <BoxIcon />
                </div>
              )}
            </div>
            <div className={styles.body}>
              <h3 className={styles.name}>{addon.name}</h3>
              {addon.description && <p className={styles.description}>{addon.description}</p>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

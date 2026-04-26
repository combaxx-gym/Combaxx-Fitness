'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from '@/styles/components/ProductSpecifications.module.css'

interface SpecItem {
  key: string
  value: string
}

interface SpecCategory {
  category: string
  items: SpecItem[]
}

interface Props {
  specifications?: SpecCategory[]
  flatSpecs?: SpecItem[]
}

export default function ProductSpecifications({ specifications, flatSpecs }: Props) {
  const hasCategories = Array.isArray(specifications) && specifications.length > 0
  const hasFlat = Array.isArray(flatSpecs) && flatSpecs.length > 0

  const [activeTab, setActiveTab] = useState(0)

  if (!hasCategories && !hasFlat) return null

  return (
    <section className={styles.section} aria-labelledby="specs-heading">
      <div className={styles.header}>
        <span className={styles.badge}>Technical Details</span>
        <h2 className={styles.title} id="specs-heading">Specifications</h2>
      </div>

      {hasCategories ? (
        <>
          {specifications!.length > 1 && (
            <div className={styles.tabs} role="tablist" aria-label="Specification categories">
              {specifications!.map((cat, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={activeTab === i}
                  aria-controls={`spec-panel-${i}`}
                  className={`${styles.tab} ${activeTab === i ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab(i)}
                >
                  {cat.category}
                </button>
              ))}
            </div>
          )}

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={styles.table}
            role="tabpanel"
            id={`spec-panel-${activeTab}`}
          >
            {specifications![activeTab]?.items.map((item, i) => (
              <div key={i} className={styles.row}>
                <dt className={styles.specKey}>{item.key}</dt>
                <dd className={styles.specValue}>{item.value}</dd>
              </div>
            ))}
          </motion.div>
        </>
      ) : (
        <dl className={styles.flatTable}>
          {flatSpecs!.map((item, i) => (
            <div key={i} className={styles.row}>
              <dt className={styles.specKey}>{item.key}</dt>
              <dd className={styles.specValue}>{item.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  )
}

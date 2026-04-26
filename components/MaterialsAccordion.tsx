'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '@/styles/pages/materials.module.css'

interface Material {
  id: string
  num: string
  name: string
  category: string
  color: string
  hex: string
  properties: string[]
  desc: string
  weight: string
  certLabel: string
}

export default function MaterialsAccordion({ materials }: { materials: Material[] }) {
  const [open, setOpen] = useState<string>('steel')

  return (
    <div className={styles.accordion}>
      {materials.map((m) => {
        const isOpen = open === m.id
        return (
          <div key={m.id} className={`${styles.accordionItem} ${isOpen ? styles.accordionItemOpen : ''}`}>
            <button
              className={styles.accordionTrigger}
              onClick={() => setOpen(isOpen ? '' : m.id)}
              aria-expanded={isOpen}
            >
              <div className={styles.accordionTriggerLeft}>
                <span className={styles.accordionNum}>{m.num}</span>
                <div className={styles.accordionSwatch} style={{ background: m.hex }} />
                <div className={styles.accordionTriggerText}>
                  <span className={styles.accordionName}>{m.name}</span>
                  <span className={styles.accordionCategory}>{m.category}</span>
                </div>
              </div>
              <motion.span
                className={styles.accordionChevron}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                ▾
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className={styles.accordionPanel}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className={styles.accordionPanelInner}>
                    <div className={styles.accordionLeft}>
                      <div className={styles.materialColorBlock} style={{ background: `linear-gradient(135deg, ${m.hex}22, ${m.hex}44)`, borderColor: `${m.hex}33` }}>
                        <div className={styles.materialColorDot} style={{ background: m.hex }} />
                        <span className={styles.materialColorHex}>{m.hex}</span>
                      </div>
                      <div className={styles.materialProps}>
                        {m.properties.map((prop) => (
                          <div key={prop} className={styles.materialProp}>
                            <span className={styles.materialPropDot} />
                            {prop}
                          </div>
                        ))}
                      </div>
                      <div className={styles.materialBadge}>{m.certLabel}</div>
                    </div>
                    <div className={styles.accordionRight}>
                      <p className={styles.materialDesc}>{m.desc}</p>
                      <div className={styles.materialMeta}>
                        <span className={styles.materialMetaItem}>{m.weight}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

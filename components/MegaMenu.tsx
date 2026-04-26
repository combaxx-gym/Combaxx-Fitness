'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImageSource } from '@sanity/image-url'
import styles from '@/styles/components/MegaMenu.module.css'

interface Category {
  _id: string
  name: string
  slug: { current: string }
  image?: SanityImageSource
}

interface Props {
  isOpen: boolean
  onClose: () => void
}

function GridIcon() {
  return (
    <svg className={styles.catFallbackIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

const SKELETONS = [1, 2, 3, 4, 5, 6, 7]

export default function MegaMenu({ isOpen, onClose }: Props) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!isOpen) return
    let cancelled = false
    setLoading(true)
    client
      .fetch<Category[]>(
        `*[_type == "category" && slug.current != "top-selling-products"]
         | order(name asc){ _id, name, slug, image }`
      )
      .then(data => { if (!cancelled) { setCategories(data || []); setLoading(false) } })
      .catch(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [isOpen])

  // Escape key closes menu
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            role="navigation"
            aria-label="Product categories"
          >
            <div className={styles.inner}>
              {/* Top bar */}
              <div className={styles.topBar}>
                <Link href="/shop" className={styles.browseAll} onClick={onClose}>
                  Browse Best Sellers
                  <span className={styles.browseArrow}>→</span>
                </Link>
                <button onClick={onClose} className={styles.closeBtn} aria-label="Close menu">
                  <XIcon />
                </button>
              </div>

              {/* Category Cards */}
              <div className={styles.categoriesGrid}>
                {loading
                  ? SKELETONS.map(i => <div key={i} className={styles.catSkeleton} />)
                  : categories.map(cat => (
                    <Link
                      key={cat._id}
                      href={`/${cat.slug.current}`}
                      className={styles.catCard}
                      onClick={onClose}
                    >
                      <div className={styles.catImgWrap}>
                        {cat.image ? (
                          <Image
                            src={urlFor(cat.image).width(300).height(225).url()}
                            alt={cat.name}
                            fill
                            className={styles.catImg}
                            sizes="(max-width: 1024px) 150px, 200px"
                            unoptimized
                          />
                        ) : (
                          <div className={styles.catImgFallback}>
                            <GridIcon />
                          </div>
                        )}
                        <div className={styles.catImgOverlay} />
                      </div>
                      <div className={styles.catInfo}>
                        <span className={styles.catName}>{cat.name}</span>
                        <span className={styles.catBrowse}>
                          Browse <span className={styles.catArrow}>→</span>
                        </span>
                      </div>
                    </Link>
                  ))
                }
              </div>

              {/* Bottom bar */}
              <div className={styles.bottomBar}>
                <div className={styles.bottomLinks}>
                  <Link href="/shop" className={styles.bottomLink} onClick={onClose}>All Products</Link>
                  <Link href="/wellness" className={styles.bottomLink} onClick={onClose}>Wellness</Link>
                  <Link href="/stories" className={styles.bottomLink} onClick={onClose}>Stories</Link>
                  <Link href="/contact" className={styles.bottomLink} onClick={onClose}>Contact</Link>
                </div>
                <div className={styles.bottomCta}>
                  <Link href="/contact" className={`${styles.ctaBtn} ${styles.ctaBtnOutline}`} onClick={onClose}>
                    Contact Us
                  </Link>
                  <Link href="/contact" className={`${styles.ctaBtn} ${styles.ctaBtnRed}`} onClick={onClose}>
                    Request Quote
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

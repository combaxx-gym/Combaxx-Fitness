'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { client } from '@/sanity/lib/client'
import styles from '@/styles/components/MegaMenu.module.css'

interface Category {
  _id: string
  name: string
  slug: { current: string }
}

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function MegaMenu({ isOpen, onClose }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true) }, []);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setLoading(true);
    client
      .fetch<Category[]>(
        `*[_type == "category" && slug.current != "top-selling-products"] | order(name asc){ _id, name, slug }`
      )
      .then(data => { if (!cancelled) { setCategories(data || []); setLoading(false) } })
      .catch(() => { if (!cancelled) setLoading(false) });
    return () => { cancelled = true };
  }, [isOpen]);

  if (!mounted) return null;

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
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            role="navigation"
            aria-label="Product categories"
          >
            <div className={styles.inner}>
              {/* Top Section */}
              <div className={styles.content}>
                <div className={styles.mainLinks}>
                  <h3 className={styles.sectionTitle}>Categories</h3>
                  <div className={styles.categoriesList}>
                    {loading
                      ? [1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className={styles.linkSkeleton} />
                      ))
                      : categories.map(cat => (
                        <Link
                          key={cat._id}
                          href={`/${cat.slug.current}`}
                          className={styles.categoryLink}
                          onClick={onClose}
                        >
                          {cat.name}
                        </Link>
                      ))
                    }
                  </div>
                </div>
                
                <div className={styles.quickActions}>
                  <h3 className={styles.sectionTitle}>Quick Links</h3>
                  <div className={styles.quickLinksList}>
                    <Link href="/shop" className={styles.quickLink} onClick={onClose}>
                      All Products
                    </Link>
                    <Link href="/wellness" className={styles.quickLink} onClick={onClose}>
                      Wellness
                    </Link>
                    <Link href="/stories" className={styles.quickLink} onClick={onClose}>
                      Stories
                    </Link>
                    <Link href="/materials-information" className={styles.quickLink} onClick={onClose}>
                      Materials Info
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className={styles.bottomCtaSection}>
                <Link href="/contact" className={styles.ctaBtn} onClick={onClose}>
                  Request Quote
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

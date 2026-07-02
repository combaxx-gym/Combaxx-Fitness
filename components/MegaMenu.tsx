'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImageSource } from '@sanity/image-url'
import styles from '@/styles/components/MegaMenu.module.css'

// Static Categories (fallback/primary)
const STATIC_CATEGORIES = [
  {
    _id: 'cat-1',
    name: 'Ironcore series',
    slug: { current: 'ironcore-series' },
    tagline: 'Built for Elite Strength. Engineered to Endure.',
    image: 'https://images.unsplash.com/photo-1517836947426-c26a192591a1?w=200&h=200&fit=crop',
  },
  {
    _id: 'cat-2',
    name: 'Anchor Series',
    slug: { current: 'anchor-series' },
    tagline: 'Organize Strength. Maximize Performance.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop',
  },
  {
    _id: 'cat-3',
    name: 'Strata Series',
    slug: { current: 'strata-series' },
    tagline: 'Train Strong. Lift Without Limits.',
    image: 'https://images.unsplash.com/photo-1517836947426-c26a192591a1?w=200&h=200&fit=crop',
  },
  {
    _id: 'cat-4',
    name: 'Precision Series',
    slug: { current: 'precision-series' },
    tagline: 'Precision in Every Rep.',
    image: 'https://images.unsplash.com/photo-1517836947426-c26a192591a1?w=200&h=200&fit=crop',
  },
  {
    _id: 'cat-5',
    name: 'Titan Series',
    slug: { current: 'titan-series' },
    tagline: 'Precision Grip. Maximum Performance.',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop',
  },
]

interface Category {
  _id: string
  name: string
  slug: { current: string }
  image?: SanityImageSource | string
  tagline?: string
  description?: string
}

interface Props {
  isOpen: boolean
  onClose: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export default function MegaMenu({ isOpen, onClose, onMouseEnter, onMouseLeave }: Props) {
  const [categories, setCategories] = useState<Category[]>(STATIC_CATEGORIES)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!isOpen) return;
    // Optional: Try to fetch from Sanity as backup, but use static as primary
    let cancelled = false;
    client
      .fetch<Category[]>(
        `*[_type == "category" && slug.current != "top-selling-products" && slug.current != "crosstrainers"] | order(name asc){ _id, name, slug, image, tagline, description }`
      )
      .then(data => {
        if (!cancelled && data && data.length > 0) {
          // If you want to mix or replace, you can adjust here. For now, keep static.
          // setCategories(data);
        }
      })
      .catch(() => {});
    return () => { cancelled = true };
  }, [isOpen])

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
            className={styles.panel}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            role="navigation"
            aria-label="Product categories"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
          <div className={styles.container}>
            <div className={styles.heroImage}>
              <Image
                src="/images/mega-menu-image.png"
                alt="Gym Equipment"
                fill
                style={{ objectFit: 'contain' }}
                unoptimized
              />
            </div>
            <div className={styles.inner}>
              {/* Left Section - Hero */}
              <div className={styles.heroSection}>
                <span className={styles.heroBadge}>COMBAXX EQUIPMENT</span>
                <h2 className={styles.heroTitle}>Built for<br />Serious Training</h2>
                <p className={styles.heroDesc}>
                  Engineered for performance, built to last. Equipment that pushes limits and delivers results.
                </p>
                <Link href="/shop" className={styles.heroBtn} onClick={onClose}>
                  VIEW ALL PRODUCTS
                  <span className={styles.heroBtnArrow}>→</span>
                </Link>
              </div>

              {/* Middle Section - Categories */}
              <div className={styles.categoriesSection}>
                <h3 className={styles.sectionTitle}>EQUIPMENT CATEGORIES</h3>
                <div className={styles.categoriesList}>
                  {categories.slice(0, 5).map(cat => (
                    <Link
                      key={cat._id}
                      href={`/${cat.slug.current}`}
                      className={styles.categoryCard}
                      onClick={onClose}
                    >
                      {cat.image ? (
                        <div className={styles.categoryImageWrap}>
                          <Image
                            src={typeof cat.image === 'string' ? cat.image : urlFor(cat.image).url()}
                            alt={cat.name}
                            fill
                            className={styles.categoryImage}
                            sizes="(max-width: 768px) 60px, 80px"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className={styles.categoryImageWrap} />
                      )}
                      <div className={styles.categoryInfo}>
                        <h4 className={styles.categoryName}>{cat.name}</h4>
                        {cat.tagline && (
                          <p className={styles.categoryTagline}>{cat.tagline}</p>
                        )}
                      </div>
                      <span className={styles.categoryArrow}>›</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right Section - Quick Links */}
              <div className={styles.quickLinksSection}>
                <h3 className={styles.sectionTitle}>EXPLORE COMBAXX</h3>
                <div className={styles.quickLinksList}>
                  <Link href="/" className={styles.quickLink} onClick={onClose}>
                    <div className={styles.quickLinkIcon}>
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12L12 3L21 12V21H14V16H10V21H3V12Z" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </div>
                    <div className={styles.quickLinkInfo}>
                      <span className={styles.quickLinkTitle}>Home</span>
                      <span className={styles.quickLinkDesc}>Back to main page</span>
                    </div>
                    <span className={styles.quickLinkArrow}>›</span>
                  </Link>
                  <Link href="/shop" className={styles.quickLink} onClick={onClose}>
                    <div className={styles.quickLinkIcon}>
                      <Image
                        src="/images/all-products.svg"
                        alt="Icon"
                        width={24}
                        height={24}
                        unoptimized
                        style={{ filter: 'brightness(0) saturate(100%) invert(26%) sepia(89%) saturate(7483%) hue-rotate(357deg) brightness(98%) contrast(118%)' }}
                      />
                    </div>
                    <div className={styles.quickLinkInfo}>
                      <span className={styles.quickLinkTitle}>All Products</span>
                      <span className={styles.quickLinkDesc}>Browse our complete range of premium equipment.</span>
                    </div>
                    <span className={styles.quickLinkArrow}>›</span>
                  </Link>
                  <Link href="/stories" className={styles.quickLink} onClick={onClose}>
                    <div className={styles.quickLinkIcon}>
                      <Image
                        src="/images/Story.svg"
                        alt="Stories"
                        width={24}
                        height={24}
                        unoptimized
                        style={{ filter: 'brightness(0) saturate(100%) invert(26%) sepia(89%) saturate(7483%) hue-rotate(357deg) brightness(98%) contrast(118%)' }}
                      />
                    </div>
                    <div className={styles.quickLinkInfo}>
                      <span className={styles.quickLinkTitle}>Stories</span>
                      <span className={styles.quickLinkDesc}>Real stories from real people. Real results.</span>
                    </div>
                    <span className={styles.quickLinkArrow}>›</span>
                  </Link>
                  <Link href="/materials-information" className={styles.quickLink} onClick={onClose}>
                    <div className={styles.quickLinkIcon}>
                      <Image
                        src="/images/materials-information.svg"
                        alt="Icon"
                        width={24}
                        height={24}
                        unoptimized
                        style={{ filter: 'brightness(0) saturate(100%) invert(26%) sepia(89%) saturate(7483%) hue-rotate(357deg) brightness(98%) contrast(118%)' }}
                      />
                    </div>
                    <div className={styles.quickLinkInfo}>
                      <span className={styles.quickLinkTitle}>Materials Info</span>
                      <span className={styles.quickLinkDesc}>Learn about the materials we use.</span>
                    </div>
                    <span className={styles.quickLinkArrow}>›</span>
                  </Link>
                  <Link href="/contact" className={styles.quickLink} onClick={onClose}>
                    <div className={styles.quickLinkIcon}>
                      <Image
                        src="/images/contact.svg"
                        alt="Icon"
                        width={24}
                        height={24}
                        unoptimized
                        style={{ filter: 'brightness(0) saturate(100%) invert(26%) sepia(89%) saturate(7483%) hue-rotate(357deg) brightness(98%) contrast(118%)' }}
                      />
                    </div>
                    <div className={styles.quickLinkInfo}>
                      <span className={styles.quickLinkTitle}>Contact</span>
                      <span className={styles.quickLinkDesc}>Get in touch with our team.</span>
                    </div>
                    <span className={styles.quickLinkArrow}>›</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className={styles.bottomCta}>
              <div className={styles.bottomCtaLeft}>
                <div className={styles.bottomCtaIcon}>
                  <Image
                    src="/images/image-removebg-preview.svg"
                    alt="Icon"
                    width={24}
                    height={24}
                    unoptimized
                    style={{ filter: 'brightness(0) saturate(100%) invert(26%) sepia(89%) saturate(7483%) hue-rotate(357deg) brightness(98%) contrast(118%)' }}
                  />
                </div>
                <div className={styles.bottomCtaText}>
                  <p className={styles.bottomCtaTitle}>Need help choosing equipment?</p>
                  <p className={styles.bottomCtaDesc}>Our experts are here to help you find the right solution for your goals.</p>
                </div>
              </div>
              <Link href="/contact" className={styles.bottomCtaBtn} onClick={onClose}>
                TALK TO SALES
                <span className={styles.bottomCtaBtnArrow}>→</span>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

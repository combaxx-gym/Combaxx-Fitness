'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImageSource } from '@sanity/image-url'
import styles from '@/styles/components/MegaMenu.module.css'

const STATIC_CATEGORIES = [
  {
    _id: 'cat-1',
    name: 'Rigs and Racks',
    slug: { current: 'rigs-and-racks' },
    tagline: 'Heavy-Duty Strength Solutions',
    image: '/images/STRATA Series.webp',
  },
  {
    _id: 'cat-2',
    name: 'Storage Systems',
    slug: { current: 'storage-systems' },
    tagline: 'Organize Your Gym Efficiently',
    image: '/images/ANCHOR Series.webp',
  },
  {
    _id: 'cat-3',
    name: 'Functional Training',
    slug: { current: 'functional-training' },
    tagline: 'Train For Real-World Performance',
    image: '/images/Functional-Training.webp',
  },
  {
    _id: 'cat-4',
    name: 'Barbells',
    slug: { current: 'barbells' },
    tagline: 'Premium Strength Training Bars',
    image: '/images/Barbells.webp',
  },
  {
    _id: 'cat-5',
    name: 'Benches',
    slug: { current: 'benches' },
    tagline: 'Commercial-Grade Workout Benches',
    image: '/images/Ironcore series.webp',
  },
]

const STATIC_SERIES = [
  {
    _id: 'series-1',
    name: 'Ironcore Series',
    slug: { current: 'ironcore-series' },
    tagline: 'Built for Elite Strength. Engineered to Endure.',
    image: '/images/Ironcore series.webp',
  },
  {
    _id: 'series-2',
    name: 'Anchor Series',
    slug: { current: 'anchor-series' },
    tagline: 'Organize Strength. Maximize Performance.',
    image: '/images/ANCHOR Series.webp',
  },
  {
    _id: 'series-3',
    name: 'Strata Series',
    slug: { current: 'strata-series' },
    tagline: 'Train Strong. Lift Without Limits.',
    image: '/images/STRATA Series.webp',
  },
  {
    _id: 'series-4',
    name: 'Precision Series',
    slug: { current: 'precision-series' },
    tagline: 'Precision in Every Rep.',
    image: '/images/PRECISION Series.webp',
  },
  {
    _id: 'series-5',
    name: 'Titan Series',
    slug: { current: 'titan-series' },
    tagline: 'Precision Grip. Maximum Performance.',
    image: '/images/Titan Series.webp',
  },
]

const MOBILE_LINKS = [
  { href: '/shop', label: 'Shop All' },
  { href: '/materials-information', label: 'Materials Information' },
  { href: '/stories', label: 'Stories' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About' },
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
  const [categories] = useState<Category[]>(STATIC_CATEGORIES)
  const [series] = useState<Category[]>(STATIC_SERIES)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!isOpen) return
    let cancelled = false
    client
      .fetch<Category[]>(
        `*[_type == "category" && slug.current != "top-selling-products" && slug.current != "crosstrainers"] | order(name asc){ _id, name, slug, image, tagline, description }`
      )
      .then(() => {
        if (cancelled) return
        // Static categories stay primary for consistent branding
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [isOpen])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            className={styles.backdrop}
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            role="navigation"
            aria-label="Main menu"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div className={styles.container}>
              {/* Mobile quick links + Login */}
              <div className={styles.mobileBar}>
                <nav className={styles.mobileNav} aria-label="Site links">
                  {MOBILE_LINKS.map(link => (
                    <Link key={link.href} href={link.href} className={styles.mobileNavLink} onClick={onClose}>
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className={styles.authBlock}>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button type="button" className={styles.loginBtn} onClick={onClose}>
                        Login
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <div className={styles.accountRow}>
                      <span className={styles.accountLabel}>Account</span>
                      <UserButton
                        appearance={{
                          elements: {
                            avatarBox: 'w-8 h-8 ring-2 ring-white/20 hover:ring-[#FF3333] transition-all',
                          },
                        }}
                      />
                    </div>
                  </SignedIn>
                </div>
              </div>

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

                <div className={styles.categoriesSection}>
                  <h3 className={styles.sectionTitle}>EXPLORE SERIES</h3>
                  <div className={styles.categoriesList}>
                    {series.slice(0, 5).map(serie => (
                      <Link
                        key={serie._id}
                        href={`/${serie.slug.current}`}
                        className={styles.categoryCard}
                        onClick={onClose}
                      >
                        {serie.image ? (
                          <div className={styles.categoryImageWrap}>
                            <Image
                              src={typeof serie.image === 'string' ? serie.image : urlFor(serie.image).url()}
                              alt={serie.name}
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
                          <h4 className={styles.categoryName}>{serie.name}</h4>
                          {serie.tagline && (
                            <p className={styles.categoryTagline}>{serie.tagline}</p>
                          )}
                        </div>
                        <span className={styles.categoryArrow}>›</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop auth + bottom CTA */}
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
                <div className={styles.bottomCtaActions}>
                  <div className={styles.desktopAuth}>
                    <SignedOut>
                      <SignInButton mode="modal">
                        <button type="button" className={styles.loginBtn} onClick={onClose}>
                          Login
                        </button>
                      </SignInButton>
                    </SignedOut>
                    <SignedIn>
                      <div className={styles.accountRow}>
                        <span className={styles.accountLabel}>Account</span>
                        <UserButton
                          appearance={{
                            elements: {
                              avatarBox: 'w-8 h-8 ring-2 ring-white/20 hover:ring-[#FF3333] transition-all',
                            },
                          }}
                        />
                      </div>
                    </SignedIn>
                  </div>
                  <Link href="/contact" className={styles.bottomCtaBtn} onClick={onClose}>
                    TALK TO SALES
                    <span className={styles.bottomCtaBtnArrow}>→</span>
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

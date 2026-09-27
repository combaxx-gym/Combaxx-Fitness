'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { SanityImageSource } from '@sanity/image-url'
import styles from '@/styles/components/RelatedProductsSlider.module.css'

interface RelatedProduct {
  _id: string
  name: string
  slug: { current: string }
  image?: SanityImageSource
  category?: { slug?: { current?: string } }
  categories?: Array<{ slug?: { current?: string } }>
}

interface Props {
  products: RelatedProduct[]
  categorySlug?: string
}

function ChevronLeft() {
  return (
    <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function ImagePlaceholder() {
  return (
    <div className={styles.imageFallback}>
      <svg className={styles.fallbackIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    </div>
  )
}

function getPerView(width: number) {
  if (width <= 767) return 1
  if (width <= 900) return 2
  if (width <= 1200) return 3
  return 4
}

export default function RelatedProductsSlider({ products, categorySlug }: Props) {
  const [offset, setOffset] = useState(0)
  const [perView, setPerView] = useState(1)
  const [stepPx, setStepPx] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const measure = useCallback(() => {
    const next = getPerView(window.innerWidth)
    setPerView(next)
    setOffset(o => Math.min(o, Math.max(0, products.length - next)))

    const track = trackRef.current
    const firstCard = track?.querySelector(`.${styles.card}`) as HTMLElement | null
    if (!track || !firstCard) return

    const gap = next === 1 ? 0 : 24 // 1.5rem
    setStepPx(firstCard.getBoundingClientRect().width + gap)
  }, [products.length])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  useEffect(() => {
    // Re-measure after layout / images settle
    const id = window.requestAnimationFrame(measure)
    return () => window.cancelAnimationFrame(id)
  }, [measure, products.length])

  const maxOffset = Math.max(0, products.length - perView)
  const goPrev = useCallback(() => setOffset(p => Math.max(0, p - 1)), [])
  const goNext = useCallback(() => setOffset(p => Math.min(maxOffset, p + 1)), [maxOffset])

  // Autoplay every 2s — loop back to start
  useEffect(() => {
    if (maxOffset <= 0) return
    const id = window.setInterval(() => {
      setOffset(p => (p >= maxOffset ? 0 : p + 1))
    }, 2000)
    return () => window.clearInterval(id)
  }, [maxOffset])

  if (!products.length) return null

  const getProductUrl = (p: RelatedProduct) => {
    const cat = p.category?.slug?.current || p.categories?.[0]?.slug?.current || categorySlug || 'products'
    return `/${cat}/${p.slug.current}`
  }

  return (
    <section className={styles.section} aria-labelledby="related-heading">
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <span className={styles.badge}>You Might Also Like</span>
          <h2 className={styles.title} id="related-heading">Related Products</h2>
        </div>

        {products.length > perView && (
          <div className={styles.navBtns}>
            <button onClick={goPrev} disabled={offset === 0} className={styles.navBtn} aria-label="Previous products">
              <ChevronLeft />
            </button>
            <button onClick={goNext} disabled={offset >= maxOffset} className={styles.navBtn} aria-label="Next products">
              <ChevronRight />
            </button>
          </div>
        )}
      </div>

      <div className={styles.track} ref={trackRef}>
        <div
          className={styles.slides}
          style={{
            transform: stepPx ? `translateX(-${offset * stepPx}px)` : undefined,
          }}
        >
          {products.map(product => (
            <Link key={product._id} href={getProductUrl(product)} className={styles.card}>
              <div className={styles.imageWrapper}>
                {product.image ? (
                  <Image
                    src={urlFor(product.image).url()}
                    alt={product.name}
                    fill
                    className={styles.image}
                    sizes="(max-width: 767px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    unoptimized
                  />
                ) : (
                  <ImagePlaceholder />
                )}
              </div>
              <div className={styles.body}>
                <h3 className={styles.productName}>{product.name}</h3>
                <span className={styles.viewLink}>
                  View Product <ArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

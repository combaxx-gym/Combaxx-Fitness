'use client'

import { useState, useRef, useCallback } from 'react'
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

const CARDS_PER_VIEW = 4

export default function RelatedProductsSlider({ products, categorySlug }: Props) {
  const [offset, setOffset] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const maxOffset = Math.max(0, products.length - CARDS_PER_VIEW)

  const goPrev = useCallback(() => setOffset(p => Math.max(0, p - 1)), [])
  const goNext = useCallback(() => setOffset(p => Math.min(maxOffset, p + 1)), [maxOffset])

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

        {products.length > CARDS_PER_VIEW && (
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
          style={{ transform: `translateX(calc(-${offset} * (100% / ${Math.min(products.length, CARDS_PER_VIEW)} + 1.25rem / ${Math.min(products.length, CARDS_PER_VIEW)})))` }}
        >
          {products.map(product => (
            <Link key={product._id} href={getProductUrl(product)} className={styles.card}>
              <div className={styles.imageWrapper}>
                {product.image ? (
                  <Image
                    src={urlFor(product.image).width(400).height(400).url()}
                    alt={product.name}
                    fill
                    className={styles.image}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
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

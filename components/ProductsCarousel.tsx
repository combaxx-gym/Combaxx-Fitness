"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { SanityImageSource } from "@sanity/image-url"
import styles from "@/styles/components/ProductsCarousel.module.css"

const toSlug = (s?: string) =>
  (s || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")

const catKey = (p: ProductsCarouselProduct): string => {
  const names = [
    ...(p.categories?.map(c => (c?.name || "").toLowerCase().trim()) || []),
    (p.category?.name || "").toLowerCase().trim(),
  ].filter(Boolean) as string[]
  const slugs = [
    ...(p.categories?.map(c => (c?.slug?.current || "").toLowerCase().trim()) || []),
    (p.category?.slug?.current || "").toLowerCase().trim(),
  ].filter(Boolean) as string[]
  const all = names.concat(slugs)
  if (all.some(s => s.includes("treadmill"))) return "treadmills"
  if (all.some(s => s.includes("bike") || s.includes("cycle"))) return "bikes"
  if (all.some(s =>
    s.includes("titan") || s.includes("strength") || s.includes("bench") ||
    s.includes("weight") || s.includes("multi gym") || s.includes("gym") || s.includes("press")
  )) return "strength"
  return ""
}

const displayCatLabel = (p: ProductsCarouselProduct): string => {
  const k = catKey(p)
  if (k === "strength") return "TITAN SERIES"
  if (k === "treadmills") return "TREADMILLS"
  if (k === "bikes") return "BIKES"
  return "PRODUCT"
}

export type ProductsCarouselProduct = {
  _id: string
  name?: string
  title?: string
  slug: { current: string }
  image: SanityImageSource
  price?: number
  description: string
  category?: { name?: string; slug?: { current?: string } }
  categories?: Array<{ name?: string; slug?: { current?: string } }>
}

interface ProductsCarouselProps {
  products: ProductsCarouselProduct[]
}

export default function ProductsCarousel({ products }: ProductsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [cardWidth, setCardWidth] = useState(0)
  const [centerOffset, setCenterOffset] = useState(0)
  const cardRef = useRef<HTMLAnchorElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)

  const orderIndex = (k: string) => (k === "treadmills" ? 0 : k === "bikes" ? 1 : k === "strength" ? 2 : 3)
  const items = (products || [])
    .filter(p => !!catKey(p))
    .sort((a, b) => orderIndex(catKey(a)) - orderIndex(catKey(b)))

  const handleNext = () => setCurrentIndex(prev => prev + 1)
  const handlePrev = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false)
      setCurrentIndex(items.length)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true)
          setCurrentIndex(items.length - 1)
        })
      })
    } else {
      setCurrentIndex(prev => prev - 1)
    }
  }
  const handleDotClick = (index: number) => setCurrentIndex(index)

  useEffect(() => {
    const updateWidth = () => {
      if (cardRef.current) {
        let gap = 24
        if (trackRef.current) {
          const style = getComputedStyle(trackRef.current)
          const gapStr = (style as CSSStyleDeclaration).columnGap || (style as CSSStyleDeclaration).gap || "24px"
          const parsed = parseFloat(gapStr)
          if (!Number.isNaN(parsed)) gap = parsed
        }
        const cardW = cardRef.current.offsetWidth
        setCardWidth(cardW + gap)
        if (maskRef.current) {
          let offset = 0
          if (typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches) {
            const maskW = maskRef.current.clientWidth
            offset = Math.max(0, (maskW - cardW) / 2)
          }
          setCenterOffset(offset)
        }
      }
    }
    updateWidth()
    window.addEventListener("resize", updateWidth)
    const timer = setTimeout(updateWidth, 500)
    return () => { window.removeEventListener("resize", updateWidth); clearTimeout(timer) }
  }, [items])

  useEffect(() => {
    if (items.length === 0) return
    const interval = setInterval(() => { handleNext() }, 3000)
    return () => clearInterval(interval)
  }, [items.length])

  useEffect(() => {
    if (currentIndex === items.length) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(0)
        requestAnimationFrame(() => { requestAnimationFrame(() => { setIsTransitioning(true) }) })
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, items.length])

  const displayProducts = [...items, ...items]
  const activeDotIndex = items.length ? currentIndex % items.length : 0
  const groups = (() => {
    const res: Array<{ key: string; start: number; end: number }> = []
    if (!items.length) return res
    let currentKey = catKey(items[0])
    let start = 0
    for (let i = 1; i < items.length; i++) {
      const k = catKey(items[i])
      if (k !== currentKey) { res.push({ key: currentKey, start, end: i }); currentKey = k; start = i }
    }
    res.push({ key: currentKey, start, end: items.length })
    return res
  })()
  let activeCategory = ""
  if (groups.length) {
    const baseIndex = activeDotIndex
    const gi = groups.findIndex(g => baseIndex >= g.start && baseIndex < g.end)
    if (gi !== -1) {
      const g = groups[gi]
      const threshold = g.end - 1
      const nextG = groups[(gi + 1) % groups.length]
      activeCategory = baseIndex >= threshold ? nextG.key : g.key
    }
  }
  const categoryKeys = groups.length
    ? groups.map(g => g.key)
    : ["treadmills", "bikes", "strength"].filter(k => items.some(p => catKey(p) === k))
  const catLabel = (k: string) => (k === "strength" ? "TITAN SERIES" : k.toUpperCase())
  const handleCategoryClick = (k: string) => {
    const g = groups.find(gr => gr.key === k)
    const idx = g ? g.start : items.findIndex(p => catKey(p) === k)
    if (idx >= 0) setCurrentIndex(idx)
  }

  const getCatSlug = (p: ProductsCarouselProduct): string => {
    const slug = p.category?.slug?.current || p.categories?.find(c => !!c?.slug?.current)?.slug?.current || ""
    return slug || toSlug(p.category?.name || p.categories?.[0]?.name || "products")
  }
  const getProdSlug = (p: ProductsCarouselProduct) => p.slug?.current ?? toSlug(p.name || p.title)

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.carouselOuter}>
          {/* Category tabs */}
          <div className={styles.catTabs}>
            {categoryKeys.map(k => (
              <button
                key={k}
                onClick={() => handleCategoryClick(k)}
                className={`${styles.catTab} ${activeCategory === k ? styles.catTabActive : ""}`}
                aria-pressed={activeCategory === k}
              >
                {catLabel(k)}
              </button>
            ))}
          </div>

          {/* Arrows */}
          <button onClick={handlePrev} aria-label="Previous" className={`${styles.arrowBtn} ${styles.arrowLeft}`}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={handleNext} aria-label="Next" className={`${styles.arrowBtn} ${styles.arrowRight}`}>
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Mask + track */}
          <div ref={maskRef} className={styles.mask}>
            <div
              ref={trackRef}
              className={styles.track}
              style={{
                transform: `translateX(${-(currentIndex * cardWidth) + centerOffset}px)`,
                transition: isTransitioning ? "transform 500ms ease-out" : "none",
              }}
            >
              {displayProducts.map((product, index) => {
                const isActive = catKey(product) === activeCategory
                return (
                  <Link
                    href={`/${getCatSlug(product)}/${getProdSlug(product)}`}
                    key={`${product._id}-${index}`}
                    ref={index === 0 ? cardRef : null}
                    className={styles.card}
                  >
                    <div className={styles.cardImageWrap}>
                      <Image
                        src={urlFor(product.image as SanityImageSource).width(1200).height(1500).url()}
                        alt={product.name || product.title || "Product image"}
                        fill
                        className={styles.cardImage}
                        unoptimized
                      />
                    </div>
                    {!isActive && <div className={styles.cardDimOverlay} />}
                    <div className={styles.cardGradient}>
                      <div className={styles.cardGradientInner} />
                    </div>
                    <div className={styles.cardContent}>
                      <div>
                        <p className={styles.cardLabel}>{displayCatLabel(product)}</p>
                        <h3 className={styles.cardTitle}>{product.name || product.title}</h3>
                      </div>
                      <div className={styles.cardArrow}>
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Dots */}
          <div className={styles.dots}>
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`${styles.dot} ${index === activeDotIndex ? styles.dotActive : ""}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

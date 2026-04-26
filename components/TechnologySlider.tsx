"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { urlFor } from "@/sanity/lib/image"
import type { SanityImageSource } from "@sanity/image-url"
import type { ProductsCarouselProduct } from "./ProductsCarousel"
import styles from "@/styles/components/TechnologySlider.module.css"

type TechSliderProps = {
  products?: ProductsCarouselProduct[]
}

const categoriesOrder = ["Treadmills", "Bikes", "Strength"] as const

const displayLabel = (cat: string) => (cat === "Strength" ? "Titan Series" : cat)

const toSlug = (s?: string) =>
  (s || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")

const normalizeCat = (name: string) => {
  const n = (name || "").trim().toLowerCase()
  if (n === "titan series" || n === "titan-series") return "Strength"
  if (n === "strength") return "Strength"
  return name
}

const mapToCanonical = (raw?: string) => {
  const s = (raw || "").trim().toLowerCase()
  if (!s) return ""
  if (s.includes("titan")) return "Strength"
  if (s === "titan series" || s === "titan-series") return "Strength"
  if (s === "power strength") return "Strength"
  if (s === "strength equipment") return "Strength"
  if (s === "weight benches" || s === "bench" || s.includes("bench")) return "Strength"
  if (s === "multi gyms" || s.includes("gym")) return "Strength"
  if (s === "treadmills" || s.includes("treadmill")) return "Treadmills"
  if (s === "bikes" || s.includes("bike") || s.includes("cycle")) return "Bikes"
  if (s === "strength") return "Strength"
  return ""
}

export default function TechnologySlider({ products = [] }: TechSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [cardWidth, setCardWidth] = useState(0)
  const [centerOffset, setCenterOffset] = useState(0)
  const cardRef = useRef<HTMLAnchorElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)

  const getPrimaryCategory = (p: ProductsCarouselProduct): string => {
    const names = [
      ...(p.categories?.map(c => c?.name || "") || []),
      p.category?.name || "",
    ].filter(Boolean) as string[]
    const slugs = [
      ...(p.categories?.map(c => c?.slug?.current || "") || []),
      p.category?.slug?.current || "",
    ].filter(Boolean) as string[]
    const candidates = [...names, ...slugs]
    for (const v of candidates) {
      const canon = mapToCanonical(v) || normalizeCat(v)
      if (canon && (categoriesOrder as readonly string[]).includes(canon)) return canon
    }
    const fallback = normalizeCat(names[0] || slugs[0] || "")
    return (fallback && (categoriesOrder as readonly string[]).includes(fallback)) ? fallback : categoriesOrder[0]
  }

  const getPrimaryCategorySlug = (p: ProductsCarouselProduct): string => {
    const slug = p.category?.slug?.current || p.categories?.find(c => !!c?.slug?.current)?.slug?.current || ""
    return slug || toSlug(getPrimaryCategory(p))
  }

  const all = (products || []).filter(p => {
    const names = [
      ...(p.categories?.map(c => (c?.name || "").trim()) || []),
      (p.category?.name || "").trim(),
    ].filter(Boolean) as string[]
    const slugs = [
      ...(p.categories?.map(c => (c?.slug?.current || "").trim()) || []),
      (p.category?.slug?.current || "").trim(),
    ].filter(Boolean) as string[]
    const match = names.concat(slugs)
      .map(s => s.toLowerCase().replace(/\s+/g, " ").trim())
      .map(s => (s === "titan series" || s === "titan-series") ? "strength" : s)
    const synonyms = ["strength", "power strength", "strength equipment", "weight benches", "bench", "multi gyms", "titan"]
    const canonical = ["treadmills", "bikes", "strength"]
    return match.some(m => canonical.includes(m) || synonyms.includes(m) || m.includes("titan"))
  })
  const items = all

  const handleNext = () => setCurrentIndex(prev => prev + 1)
  const handlePrev = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false)
      setCurrentIndex(items.length)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { setIsTransitioning(true); setCurrentIndex(items.length - 1) })
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

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.textBlock}>
            <p className={styles.eyebrow}>Elegantly designed. Fueled by technology.</p>
            <h2 className={styles.heading}>
              Precision engineered equipment, tuned for human performance.
            </h2>
            <p className={styles.desc}>
              Glide through a curated line-up of treadmills, bikes and strength systems built to
              feel smooth, solid and responsive at speed.
            </p>
          </div>
          <div className={styles.ctaWrap}>
            <Link href="/shop" className={styles.ctaLink}>
              Shop online
            </Link>
          </div>
        </div>

        <div className={styles.carouselOuter}>
          <button onClick={handlePrev} aria-label="Previous" className={`${styles.arrowBtn} ${styles.arrowLeft}`}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={handleNext} aria-label="Next" className={`${styles.arrowBtn} ${styles.arrowRight}`}>
            <ChevronRight className="w-5 h-5" />
          </button>

          <div ref={maskRef} className={styles.mask}>
            <div
              ref={trackRef}
              className={styles.track}
              style={{
                transform: `translateX(${-(currentIndex * cardWidth) + centerOffset}px)`,
                transition: isTransitioning ? "transform 500ms ease-out" : "none",
              }}
            >
              {displayProducts.map((product, index) => (
                <Link
                  href={`/${getPrimaryCategorySlug(product)}/${product.slug?.current ?? toSlug(product.name || product.title)}`}
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
                  <div className={styles.cardGradient} />
                  <div className={styles.cardContent}>
                    <div>
                      <p className={styles.cardLabel}>{displayLabel(getPrimaryCategory(product))}</p>
                      <h3 className={styles.cardTitle}>{product.name || product.title}</h3>
                    </div>
                    <div className={styles.cardArrow}>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

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

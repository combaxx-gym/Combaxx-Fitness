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

const TARGET_LABEL = "FUNCTIONAL TRAINING"

const toSlug = (s?: string) =>
  (s || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")

const isFunctionalTraining = (raw?: string) => {
  const s = (raw || "").trim().toLowerCase().replace(/\s+/g, " ")
  if (!s) return false
  const slug = toSlug(raw)
  return (
    s === "functional training" ||
    s === "functional" ||
    slug === "functional-training" ||
    slug === "functional" ||
    s.includes("functional")
  )
}

export default function TechnologySlider({ products = [] }: TechSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [cardWidth, setCardWidth] = useState(0)
  const [centerOffset, setCenterOffset] = useState(0)
  const [mobileCardPx, setMobileCardPx] = useState<number | null>(null)
  const cardRef = useRef<HTMLAnchorElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)

  const categorySlug = "functional-training"

  const all = (products || []).filter(p => {
    /* Prefer server-matched tag from home page Sanity fetch */
    if (p.__matchedCat === "functional-training") return true

    const names = [
      ...(p.categories?.map(c => (c?.name || "").trim()) || []),
      (p.category?.name || "").trim(),
      (p.subCategory?.name || "").trim(),
    ].filter(Boolean) as string[]
    const slugs = [
      ...(p.categories?.map(c => (c?.slug?.current || "").trim()) || []),
      (p.category?.slug?.current || "").trim(),
      (p.subCategory?.slug?.current || "").trim(),
    ].filter(Boolean) as string[]
    return names.concat(slugs).some(v => isFunctionalTraining(v))
  })

  /* Strict Functional Training only — never fall back to Titan Series / other categories */
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
      if (!maskRef.current) return
      let gap = 24
      if (trackRef.current) {
        const style = getComputedStyle(trackRef.current)
        const gapStr = (style as CSSStyleDeclaration).columnGap || (style as CSSStyleDeclaration).gap || "24px"
        const parsed = parseFloat(gapStr)
        if (!Number.isNaN(parsed)) gap = parsed
      }

      const isMobile = window.matchMedia("(max-width: 767px)").matches
      if (isMobile) {
        const maskStyle = getComputedStyle(maskRef.current)
        const pl = parseFloat(maskStyle.paddingLeft) || 0
        const pr = parseFloat(maskStyle.paddingRight) || 0
        const available = Math.max(200, maskRef.current.clientWidth - pl - pr)
        setMobileCardPx(available)
        setCardWidth(available + gap)
        setCenterOffset(0)
        return
      }

      setMobileCardPx(null)
      if (cardRef.current) {
        setCardWidth(cardRef.current.offsetWidth + gap)
      }
      setCenterOffset(0)
    }
    updateWidth()
    window.addEventListener("resize", updateWidth)
    const timer = setTimeout(updateWidth, 300)
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

  if (items.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.wideContainer}>
          <div className={styles.header}>
            <div className={styles.textBlock}>
              <p className={styles.eyebrow}>Elegantly designed. Fueled by technology.</p>
              <h2 className={styles.heading}>
                Precision engineered equipment, tuned for human performance.
              </h2>
              <p className={styles.desc}>
                Explore a curated range of strength systems, racks, benches and functional training equipment engineered for exceptional performance, durability and versatility.
              </p>
            </div>
            <div className={styles.ctaWrap}>
              <Link href="/shop" className={styles.ctaLink}>
                Shop online
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.carouselOuter}>
            <div className={styles.mask}>
              <div
                className={styles.track}
                style={{
                  transform: `translateX(0px)`,
                  transition: "none",
                  justifyContent: "center",
                  minHeight: "300px",
                  display: "flex",
                  alignItems: "center",
                  padding: "2rem",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    color: "#9ca3af",
                    maxWidth: "600px",
                    padding: "2rem",
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "16px",
                    border: "2px dashed rgba(255,255,255,0.1)",
                  }}
                >
                  <h3 style={{ color: "#fff", marginBottom: "0.75rem", fontSize: "1.5rem" }}>
                    Products coming soon
                  </h3>
                  <p style={{ lineHeight: 1.7 }}>
                    Add products to <strong>/studio</strong> &rarr; <strong>All Products</strong> with category{" "}
                    <strong>Functional Training</strong> to populate this slider.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.section}>
      <div className={styles.wideContainer}>
        <div className={styles.header}>
          <div className={styles.textBlock}>
            <p className={styles.eyebrow}>Elegantly designed. Fueled by technology.</p>
            <h2 className={styles.heading}>
              Precision engineered equipment, tuned for human performance.
            </h2>
            <p className={styles.desc}>
              Explore a curated range of strength systems, racks, benches and functional training equipment engineered for exceptional performance, durability and versatility.
            </p>
          </div>
          <div className={styles.ctaWrap}>
            <Link href="/shop" className={styles.ctaLink}>
              Shop online
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.container}>
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
                  href={`/${categorySlug}/${product.slug?.current ?? toSlug(product.name || product.title)}`}
                  key={`${product._id}-${index}`}
                  ref={index === 0 ? cardRef : null}
                  className={styles.card}
                  style={mobileCardPx ? { width: mobileCardPx, height: "auto", aspectRatio: "3 / 4" } : undefined}
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
                      <p className={styles.cardLabel}>{TARGET_LABEL}</p>
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

          <div className={styles.controls}>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous"
              className={styles.mobileNavBtn}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className={styles.dots}>
              {items.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDotClick(index)}
                  className={`${styles.dot} ${index === activeDotIndex ? styles.dotActive : ""}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next"
              className={styles.mobileNavBtn}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

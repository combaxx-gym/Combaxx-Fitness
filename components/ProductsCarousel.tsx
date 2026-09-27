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

/* ── CATEGORY MATCHING (canonical keys + flexible synonyms) ── */
type CatKey = "rigs-racks" | "storage-systems" | "functional-training" | "barbells" | "benches"

const CATEGORIES: Array<{ key: CatKey; label: string }> = [
  { key: "rigs-racks",          label: "RIGS & RACKS" },
  { key: "storage-systems",     label: "STORAGE SYSTEMS" },
  { key: "functional-training", label: "FUNCTIONAL TRAINING" },
  { key: "barbells",            label: "BARBELLS" },
  { key: "benches",             label: "BENCHES" },
]

const catKeyOf = (p: ProductsCarouselProduct): CatKey | "" => {
  /* 0) SERVER TAG — 100% reliable, comes from Sanity references like category page */
  if (p.__matchedCat && CATEGORIES.some(c => c.key === p.__matchedCat)) return p.__matchedCat

  /* ── 1) Collect ALL category NAMES (from categories[], main category, subCategory) ── */
  const names: string[] = [
    ...(p.categories?.map(c => (c?.name || "").toLowerCase().trim()) || []),
    (p.category?.name || "").toLowerCase().trim(),
    (p.subCategory?.name || "").toLowerCase().trim(),
    ...(p.subCategories?.map(s => (s?.name || "").toLowerCase().trim()) || []),
  ].filter(Boolean) as string[]

  /* ── 2) Collect ALL category SLUGS (categories[], main category, subCategory) ── */
  const slugs: string[] = [
    ...(p.categories?.map(c => (c?.slug?.current || "").toLowerCase().trim()) || []),
    (p.category?.slug?.current || "").toLowerCase().trim(),
    (p.subCategory?.slug?.current || "").toLowerCase().trim(),
    ...(p.subCategories?.map(s => (s?.slug?.current || "").toLowerCase().trim()) || []),
  ].filter(Boolean) as string[]

  const slugifiedNames = names.map(n => toSlug(n))
  const all = names.concat(slugs).concat(slugifiedNames)

  /* ── 3) Exact SLUG match (highest priority) — matches page route slug ── */
  if (slugs.some(s => s === "rigs-and-racks" || s === "rigs" || s === "racks" || s === "rigs-racks")) return "rigs-racks"
  if (slugs.some(s => s === "storage-systems" || s === "storage" || s === "storage-system")) return "storage-systems"
  if (slugs.some(s => s === "functional-training" || s === "functional")) return "functional-training"
  if (slugs.some(s => s === "barbells" || s === "barbell")) return "barbells"
  if (slugs.some(s => s === "benches" || s === "bench")) return "benches"

  /* ── 4) Substring / fuzzy match on names + slugified names ── */
  if (all.some(s => s.includes("rig") || s.includes("rack"))) return "rigs-racks"
  if (all.some(s => s.includes("storage"))) return "storage-systems"
  if (all.some(s => s.includes("functional"))) return "functional-training"
  if (all.some(s => /\bbarbell(s)?\b/.test(s) || s.includes("barbell"))) return "barbells"
  if (all.some(s => s.includes("bench"))) return "benches"

  return ""
}

const displayCatLabel = (p: ProductsCarouselProduct): string => {
  const k = catKeyOf(p)
  const c = CATEGORIES.find(c => c.key === k)
  return c ? c.label : "PRODUCT"
}

export type ProductsCarouselProduct = {
  _id: string
  name?: string
  title?: string
  slug: { current: string }
  image: SanityImageSource
  gallery?: Array<SanityImageSource> | null
  price?: number
  description: string
  category?: { name?: string; slug?: { current?: string } }
  categories?: Array<{ name?: string; slug?: { current?: string } }>
  subCategory?: { name?: string; slug?: { current?: string } }
  subCategories?: Array<{ name?: string; slug?: { current?: string } }>
  __matchedCat?: CatKey
}

interface ProductsCarouselProps {
  products: ProductsCarouselProduct[]
  /** Optional section title heading row; if omitted section renders without headings */
  heading?: { eyebrow?: string; title?: string; description?: string; moreLink?: string; moreText?: string }
}

export default function ProductsCarousel({ products, heading }: ProductsCarouselProps) {
  const [activeCat, setActiveCat] = useState<CatKey>(CATEGORIES[0].key)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [cardWidth, setCardWidth] = useState(0)
  const [centerOffset, setCenterOffset] = useState(0)
  const [mobileCardPx, setMobileCardPx] = useState<number | null>(null)
  const cardRef = useRef<HTMLAnchorElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState(0)

  /* ── Per-category products (FILTERED, not dimmed) ── */
  const allByCat = CATEGORIES.reduce(
    (acc, c) => {
      acc[c.key] = (products || []).filter(p => catKeyOf(p) === c.key)
      return acc
    },
    {} as Record<CatKey, ProductsCarouselProduct[]>,
  )

  const items: ProductsCarouselProduct[] = allByCat[activeCat] || []

  /* Always show ALL 5 canonical tabs (even if count === 0), user explicitly requested 5 only */
  const activeTabs: Array<{ key: CatKey; label: string; count: number }> = CATEGORIES.map(c => ({
    key: c.key,
    label: c.label,
    count: allByCat[c.key]?.length || 0,
  }))

  /* Initialize activeCat to FIRST TAB ALWAYS (Rigs & Racks), not first non-empty. */
  useEffect(() => {
    const target = CATEGORIES[0].key
    if (target !== activeCat) setActiveCat(target)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])

  /* ── Reset to first slide when category changes ── */
  useEffect(() => {
    setIsTransitioning(false)
    setCurrentIndex(0)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { setIsTransitioning(true) })
    })
  }, [activeCat])

  const handlePrev = () => {
    if (items.length === 0) return
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
  const handleNext = () => {
    if (items.length === 0) return
    setCurrentIndex(prev => prev + 1)
  }
  const handleDotClick = (index: number) => setCurrentIndex(index)

  /* Swipe handlers */
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX)
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart || !e.changedTouches[0].clientX) return
    const distance = touchStart - e.changedTouches[0].clientX
    if (distance > 50) handleNext()
    else if (distance < -50) handlePrev()
  }

  /* Measure card width — mobile = exact one-card viewport */
  useEffect(() => {
    let alive = true
    const updateWidth = () => {
      if (!alive || !maskRef.current) return
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
    const t1 = setTimeout(updateWidth, 200)
    const t2 = setTimeout(updateWidth, 600)
    return () => {
      alive = false
      window.removeEventListener("resize", updateWidth)
      clearTimeout(t1); clearTimeout(t2)
    }
  }, [items, activeCat])

  /* Auto-advance (paused briefly when user changes cat to avoid jump) */
  useEffect(() => {
    if (items.length <= 1) return
    const interval = setInterval(() => { handleNext() }, 4000)
    return () => clearInterval(interval)
  }, [items.length, activeCat])

  /* Seamless loop: after the duplicated tail slide, snap back silently */
  useEffect(() => {
    if (items.length === 0) return
    if (currentIndex === items.length) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(0)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => { setIsTransitioning(true) })
        })
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, items.length])

  /* Seamless loop: before-first slide on prev() handled above */
  useEffect(() => {
    if (items.length === 0) return
    if (currentIndex === -1) {
      setIsTransitioning(false)
      setCurrentIndex(items.length - 1)
      requestAnimationFrame(() => { requestAnimationFrame(() => { setIsTransitioning(true) }) })
    }
  }, [currentIndex, items.length])

  /* URL helpers */
  const getCatSlug = (p: ProductsCarouselProduct): string => {
    const slug = p.category?.slug?.current || p.categories?.find(c => !!c?.slug?.current)?.slug?.current || ""
    return slug || toSlug(p.category?.name || p.categories?.[0]?.name || "products")
  }
  const getProdSlug = (p: ProductsCarouselProduct) => p.slug?.current ?? toSlug(p.name || p.title)

  /* Infinite sliding: duplicate the filtered list once so we can slide past end seamlessly */
  const displayProducts = items.concat(items)
  const activeDotIndex = items.length ? currentIndex % items.length : 0

  /* Empty state — intelligent messages */
  if ((products || []).length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.emptyState}>
            <div className={styles.emptyTitle}>Products coming soon</div>
            <div className={styles.emptyText}>
              Add products to Sanity Studio to populate this slider. Go to <strong>/studio</strong> &rarr; <strong>All Products</strong> &rarr; <strong>Create new document</strong>
              <br /><br />
              <em>Tip: Assign categories like <strong>Functional Training</strong>, <strong>Benches</strong>, <strong>Rigs &amp; Racks</strong>, <strong>Strength</strong>, or <strong>Cardio</strong> to organize them.</em>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Heading row (optional) */}
        {heading && (heading.title || heading.eyebrow || heading.description) && (
          <div className={styles.headRow}>
            <div className={styles.headText}>
              {heading.eyebrow && <span className={styles.headEyebrow}>{heading.eyebrow}</span>}
              {heading.title && <h2 className={styles.headTitle}>{heading.title}</h2>}
              {heading.description && <p className={styles.headDesc}>{heading.description}</p>}
            </div>
            {heading.moreLink && heading.moreText && (
              <Link href={heading.moreLink} className={styles.headMore}>
                {heading.moreText} <ChevronRight className={styles.headMoreIcon} />
              </Link>
            )}
          </div>
        )}

        {/* ── CATEGORY TABS (always 5, all canonical) ── */}
        <div className={styles.catTabs} role="tablist" aria-label="Product categories">
          {activeTabs.map(t => {
            const isActive = activeCat === t.key
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={isActive}
                aria-controls={`products-carousel-panel-${t.key}`}
                id={`products-carousel-tab-${t.key}`}
                onClick={() => setActiveCat(t.key as CatKey)}
                className={`${styles.catTab} ${isActive ? styles.catTabActive : ""} ${t.count === 0 ? styles.catTabEmpty : ""}`}
              >
                <span className={styles.catTabText}>{t.label}</span>
              </button>
            )
          })}
        </div>

        {/* Carousel + arrows (full-bleed wrapper) */}
        <div
          id={`products-carousel-panel-${activeCat}`}
          role="tabpanel"
          aria-labelledby={`products-carousel-tab-${activeCat}`}
          className={styles.carouselOuter}
        >
          <button onClick={handlePrev} aria-label="Previous products" className={`${styles.arrowBtn} ${styles.arrowLeft}`}>
            <ChevronLeft className={styles.arrowIcon} />
          </button>
          <button onClick={handleNext} aria-label="Next products" className={`${styles.arrowBtn} ${styles.arrowRight}`}>
            <ChevronRight className={styles.arrowIcon} />
          </button>

          <div ref={maskRef} className={styles.mask} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            {items.length === 0 ? (
              <div className={styles.emptyCategory}>
                <div className={styles.emptyCategoryTitle}>No products yet in this category</div>
                <div className={styles.emptyCategoryText}>
                  Mark products as <strong>&ldquo;{CATEGORIES.find(c => c.key === activeCat)?.label}&rdquo;</strong> in Sanity Studio to show them here.
                </div>
              </div>
            ) : (
              <div
                ref={trackRef}
                className={styles.track}
                style={{
                  transform: `translateX(${-(currentIndex * cardWidth) + centerOffset}px)`,
                  transition: isTransitioning ? "transform 550ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
                }}
              >
                {displayProducts.map((product, index) => {
                  return (
                    <Link
                      href={`/${getCatSlug(product)}/${getProdSlug(product)}`}
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
                      <div className={styles.cardGradient}>
                        <div className={styles.cardGradientInner} />
                      </div>
                      <div className={styles.cardContent}>
                        <div>
                          <p className={styles.cardLabel}>{displayCatLabel(product)}</p>
                          <h3 className={styles.cardTitle}>{product.name || product.title}</h3>
                        </div>
                        <div className={styles.cardArrow}>
                          <ChevronRight className={styles.cardArrowIcon} />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {/* Dots + mobile nav */}
          {items.length > 1 && (
            <div className={styles.controls}>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous products"
                className={styles.mobileNavBtn}
              >
                <ChevronLeft className={styles.arrowIcon} />
              </button>
              <div className={styles.dots}>
                {items.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleDotClick(index)}
                    className={`${styles.dot} ${index === activeDotIndex ? styles.dotActive : ""}`}
                    aria-label={`Go to product ${index + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next products"
                className={styles.mobileNavBtn}
              >
                <ChevronRight className={styles.arrowIcon} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}


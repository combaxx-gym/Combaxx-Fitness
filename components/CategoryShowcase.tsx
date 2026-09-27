"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import type { SanityImageSource } from "@sanity/image-url"
import styles from "@/styles/components/CategoryShowcase.module.css"

const STATIC_CATEGORIES = [
  { _id: "1", name: "Treadmills", slug: { current: "treadmills" }, image: "https://images.unsplash.com/photo-1517963628607-235ccdd58bd3?q=80&w=1600&auto=format&fit=crop" },
  { _id: "2", name: "Bikes", slug: { current: "bikes" }, image: "https://images.unsplash.com/photo-1533560904424-0d24b42299a0?q=80&w=1600&auto=format&fit=crop" },
  { _id: "3", name: "Weight Benches", slug: { current: "weight-benches" }, image: "https://images.unsplash.com/photo-1517964603305-1349863e3cde?q=80&w=1600&auto=format&fit=crop" },
  { _id: "4", name: "Multi Gyms", slug: { current: "multi-gyms" }, image: "https://images.unsplash.com/photo-1518310952931-168b33a35b04?q=80&w=1600&auto=format&fit=crop" },
  { _id: "5", name: "Cross Trainers", slug: { current: "cross-trainers" }, image: "https://images.unsplash.com/photo-1526404869-8faa2b62b7cb?q=80&w=1600&auto=format&fit=crop" },
  { _id: "6", name: "Dumbbells", slug: { current: "dumbbells" }, image: "https://images.unsplash.com/photo-1599058917122-d7358b7163ce?q=80&w=1600&auto=format&fit=crop" },
]

interface Category {
  _id: string
  name: string
  slug: { current: string }
  image: string | SanityImageSource | null
}

export default function CategoryShowcase() {
  const [categories, setCategories] = useState<Category[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardWidth, setCardWidth] = useState(0)
  const [centerOffset, setCenterOffset] = useState(0)
  const [mobileCardPx, setMobileCardPx] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(true)

  const cardRef = useRef<HTMLAnchorElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null)

  const stopAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current)
      autoPlayTimerRef.current = null
    }
  }, [])

  const startAutoPlay = useCallback(() => {
    if (categories.length === 0) return
    
    stopAutoPlay()
    
    autoPlayTimerRef.current = setInterval(() => {
      setCurrentIndex(prev => prev + 1)
    }, 3000)
  }, [categories.length, stopAutoPlay])

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current)
    }
    
    stopAutoPlay()
    
    inactivityTimerRef.current = setTimeout(() => {
      startAutoPlay()
    }, 5000)
  }, [stopAutoPlay, startAutoPlay])

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1)
    resetInactivityTimer()
  }

  const handlePrev = () => {
    setCurrentIndex(prev => prev - 1)
    resetInactivityTimer()
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(categories.length + index)
    resetInactivityTimer()
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = `*[_type == "category"]{
          _id,
          name,
          slug,
          image
        }`
        const result = await client.fetch(query) as Category[]
        const filtered = (result || []).filter(
          (c) => (c.slug?.current || "").toLowerCase() !== "top-selling-products" &&
                 (c.name || "").toLowerCase() !== "top selling products" &&
                 (c.image !== null && c.image !== undefined)
        )
        if (filtered.length > 0) {
          setCategories(filtered)
        } else {
          setCategories(STATIC_CATEGORIES)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
        setCategories(STATIC_CATEGORIES)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const updateWidth = () => {
      if (!maskRef.current) return
      let gap = 24
      if (trackRef.current) {
        const style = getComputedStyle(trackRef.current)
        const gapStr = style.columnGap || (style as CSSStyleDeclaration).gap || "24px"
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

    return () => {
      window.removeEventListener("resize", updateWidth)
      clearTimeout(timer)
    }
  }, [categories])

  // Handle infinite loop wrapping
  useEffect(() => {
    if (categories.length === 0) return

    const timer = setTimeout(() => {
      // When we reach the end of the second copy, jump back to the first copy
      if (currentIndex >= categories.length * 2) {
        setIsTransitioning(false)
        setCurrentIndex(categories.length)
        
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true)
          })
        })
      }
      // When we go before the first copy, jump to the last position of the second copy
      else if (currentIndex < 0) {
        setIsTransitioning(false)
        setCurrentIndex(categories.length - 1)
        
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true)
          })
        })
      }
    }, 0)

    return () => clearTimeout(timer)
  }, [currentIndex, categories.length])

  useEffect(() => {
    startAutoPlay()
    return () => {
      stopAutoPlay()
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }
    }
  }, [categories.length, startAutoPlay, stopAutoPlay])

  // Create infinite array: 3 copies of categories
  const displayCategories = [...categories, ...categories, ...categories]
  const activeDotIndex = currentIndex % categories.length

  return (
    <section className={styles.section}>
      <div className={styles.container}>
       <h2 className={styles.heading}>Shop by Category</h2>
        <div className={styles.carouselOuter}>
          {/* Arrow buttons */}
          <button
            onClick={handlePrev}
            className={`${styles.arrowBtn} ${styles.arrowLeft}`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={handleNext}
            className={`${styles.arrowBtn} ${styles.arrowRight}`}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Mask */}
          <div ref={maskRef} className={styles.mask}>
            {/* Track */}
            <div
              ref={trackRef}
              className={styles.track}
              style={{
                transform: `translateX(${-(currentIndex * cardWidth) + centerOffset}px)`,
                transition: isTransitioning ? "transform 500ms ease-out" : "none",
              }}
            >
              {displayCategories.map((category, index) => (
                <Link
                  href={`/${category.slug.current}`}
                  key={`${category._id}-${index}`}
                  ref={index === 0 ? cardRef : null}
                  className={styles.card}
                  style={mobileCardPx ? { width: mobileCardPx, height: "auto", aspectRatio: "3 / 4" } : undefined}
                >
                  {/* Image */}
                  <div className={styles.cardImageWrap}>
                    <Image
                      src={typeof category.image === "string" ? category.image : category.image ? urlFor(category.image).url() : "/images/placeholder.png"}
                      alt={category.name}
                      fill
                      className={styles.cardImage}
                      unoptimized
                    />
                  </div>

                  {/* Gradient */}
                  <div className={styles.cardGradient} />

                  {/* Content */}
                  <div className={styles.cardContent}>
                    <div>
                      <h3 className={styles.cardTitle}>{category.name}</h3>
                      <div className={styles.cardUnderline} />
                    </div>
                    <div className={styles.cardArrow}>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Dots + mobile nav */}
          <div className={styles.controls}>
            <button
              type="button"
              onClick={handlePrev}
              className={styles.mobileNavBtn}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className={styles.dots}>
              {categories.map((_, index) => (
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
              className={styles.mobileNavBtn}
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

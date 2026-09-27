"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ChevronLeft } from "lucide-react"
import styles from "@/styles/components/CategoryShowcase.module.css"

interface Category {
  _id: string
  name: string
  slug: { current: string }
  image: string | null
}

interface Props {
  categories: Category[]
}

export default function CategoryShowcase({ categories }: Props) {
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
    if (categories.length > 0) {
      setCurrentIndex(categories.length)
    }
  }, [categories.length])

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

  useEffect(() => {
    if (categories.length === 0) return

    const timer = setTimeout(() => {
      if (currentIndex >= categories.length * 2) {
        setIsTransitioning(false)
        setCurrentIndex(categories.length)

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true)
          })
        })
      } else if (currentIndex < 0) {
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

  if (!categories.length) return null

  const displayCategories = [...categories, ...categories, ...categories]
  const activeDotIndex = ((currentIndex % categories.length) + categories.length) % categories.length

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Shop by Category</h2>
        <div className={styles.carouselOuter}>
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

          <div ref={maskRef} className={styles.mask}>
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
                  <div className={styles.cardImageWrap}>
                    <Image
                      src={category.image || "/images/placeholder.png"}
                      alt={category.name}
                      fill
                      className={styles.cardImage}
                      unoptimized
                    />
                  </div>

                  <div className={styles.cardGradient} />

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
              {categories.map((category, index) => (
                <button
                  key={category._id}
                  type="button"
                  onClick={() => handleDotClick(index)}
                  className={`${styles.dot} ${index === activeDotIndex ? styles.dotActive : ""}`}
                  aria-label={`Go to ${category.name}`}
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

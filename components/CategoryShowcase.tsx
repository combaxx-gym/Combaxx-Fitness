"use client"

import { useState, useRef, useEffect } from "react"
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
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [cardWidth, setCardWidth] = useState(0)
  const [centerOffset, setCenterOffset] = useState(0)

  const cardRef = useRef<HTMLAnchorElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1)
  }

  const handlePrev = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false)
      setCurrentIndex(categories.length)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true)
          setCurrentIndex(categories.length - 1)
        })
      })
    } else {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
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
                 (c.name || "").toLowerCase() !== "top selling products"
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
      if (cardRef.current) {
        let gap = 24
        if (trackRef.current) {
          const style = getComputedStyle(trackRef.current)
          const gapStr = style.columnGap || (style as CSSStyleDeclaration).gap || "24px"
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

    return () => {
      window.removeEventListener("resize", updateWidth)
      clearTimeout(timer)
    }
  }, [categories])

  useEffect(() => {
    if (categories.length === 0) return
    const interval = setInterval(() => {
      handleNext()
    }, 3000)
    return () => clearInterval(interval)
  }, [categories.length])

  useEffect(() => {
    if (currentIndex === categories.length) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(0)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true)
          })
        })
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, categories.length])

  const displayCategories = [...categories, ...categories]
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
                >
                  {/* Image */}
                  <div className={styles.cardImageWrap}>
                    {category.image ? (
                      <Image
                        src={typeof category.image === "string" ? category.image : urlFor(category.image).url()}
                        alt={category.name}
                        fill
                        className={styles.cardImage}
                        unoptimized
                      />
                    ) : (
                      <div className={styles.cardNoImage}>No Image</div>
                    )}
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

          {/* Dots */}
          <div className={styles.dots}>
            {categories.map((_, index) => (
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

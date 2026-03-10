"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { urlFor } from "@/sanity/lib/image"
import type { SanityImageSource } from "@sanity/image-url"
import type { ProductsCarouselProduct } from "./ProductsCarousel"

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
    const slug =
      p.category?.slug?.current ||
      p.categories?.find(c => !!c?.slug?.current)?.slug?.current ||
      ""
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

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1)
  }
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
  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }
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
    return () => {
      window.removeEventListener("resize", updateWidth)
      clearTimeout(timer)
    }
  }, [items])
  useEffect(() => {
    if (items.length === 0) return
    const interval = setInterval(() => {
      handleNext()
    }, 3000)
    return () => clearInterval(interval)
  }, [items.length])
  useEffect(() => {
    if (currentIndex === items.length) {
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
  }, [currentIndex, items.length])
  const displayProducts = [...items, ...items]
  const activeDotIndex = items.length ? currentIndex % items.length : 0

  

  return (
    <section className="bg-[#111111] border-y border-gray-900 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="md:max-w-[55%]">
            <p className="text-xs font-bold text-[#FF3333] uppercase tracking-[0.3em] mb-4">
              Elegantly designed. Fueled by technology.
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-[50px] font-light leading-tight mb-4">
              Precision engineered equipment, tuned for human performance.
            </h2>
            <p className="text-gray-400 max-w-md text-sm sm:text-base">
              Glide through a curated line-up of treadmills, bikes and strength systems built to
              feel smooth, solid and responsive at speed.
            </p>
          </div>
          <div className="flex items-center justify-center md:justify-center md:items-center md:min-w-[320px]">
            <Link
              href="/shop"
              className="inline-flex w-[220px] sm:w-[240px] items-center justify-center gap-2 text-sm font-bold uppercase tracking-[0.25em] border border-white/20 px-6 py-3 rounded-full text-white hover:text-[#FF3333] hover:border-[#FF3333] transition-colors"
            >
              Shop online
            </Link>
          </div>
        </div>

        

        <div className="relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]">
          <button
            onClick={handlePrev}
            aria-label="Previous"
            className="absolute left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-black/70 md:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next"
            className="absolute right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-black/70 md:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div ref={maskRef} className="overflow-hidden px-6 md:px-12 pb-12">
            <div
              ref={trackRef}
              className="flex gap-3 sm:gap-4 md:gap-6 will-change-transform"
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
                  className="flex-shrink-0 w-[220px] sm:w-[260px] md:w-[320px] lg:w-[380px] xl:w-[420px] h-[360px] sm:h-[420px] md:h-[460px] lg:h-[500px] xl:h-[520px] relative rounded-2xl overflow-hidden group/card border border-transparent hover:border-[#FF3333] transition-all duration-500 bg-[#0d0d0d]"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={urlFor(product.image as SanityImageSource).width(1200).height(1500).url()}
                      alt={product.name || product.title || "Product image"}
                      fill
                      className="object-contain transition-transform duration-700 group-hover/card:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-300 mb-1">
                        {displayLabel(getPrimaryCategory(product))}
                      </p>
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover/card:text-[#FF3333] transition-colors duration-300 uppercase tracking-wider">
                        {product.name || product.title}
                      </h3>
                    </div>
                    <div className="shrink-0 w-10 h-10 aspect-square border border-white/30 rounded-full flex items-center justify-center text-white group-hover/card:bg-[#FF3333] group-hover/card:border-[#FF3333] transition-all duration-300">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center gap-2 mt-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeDotIndex ? "w-[30px] bg-[#FF3333]" : "w-2 bg-gray-600 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { SanityImageSource } from "@sanity/image-url"

 

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
    s.includes("titan") ||
    s.includes("strength") ||
    s.includes("bench") ||
    s.includes("weight") ||
    s.includes("multi gym") ||
    s.includes("gym") ||
    s.includes("press")
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
  const groups = (() => {
    const res: Array<{ key: string; start: number; end: number }> = []
    if (!items.length) return res
    let currentKey = catKey(items[0])
    let start = 0
    for (let i = 1; i < items.length; i++) {
      const k = catKey(items[i])
      if (k !== currentKey) {
        res.push({ key: currentKey, start, end: i }) // end exclusive
        currentKey = k
        start = i
      }
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
  const categoryKeys = groups.length ? groups.map(g => g.key) : ["treadmills", "bikes", "strength"].filter(k => items.some(p => catKey(p) === k))
  const catLabel = (k: string) => (k === "strength" ? "TITAN SERIES" : k.toUpperCase())
  const handleCategoryClick = (k: string) => {
    const g = groups.find(gr => gr.key === k)
    const idx = g ? g.start : items.findIndex(p => catKey(p) === k)
    if (idx >= 0) setCurrentIndex(idx)
  }

  const getCatSlug = (p: ProductsCarouselProduct): string => {
    const slug =
      p.category?.slug?.current ||
      p.categories?.find(c => !!c?.slug?.current)?.slug?.current ||
      ""
    return slug || toSlug(p.category?.name || p.categories?.[0]?.name || "products")
  }
  const getProdSlug = (p: ProductsCarouselProduct) =>
    p.slug?.current ?? toSlug(p.name || p.title)

  return (
    <section className="border-t border-gray-800 bg-[#161616] py-16">
      <div className="mx-auto max-w-[1920px] px-4 md:px-12">
        <div className="relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]">
          <div className="mb-10 flex items-center justify-center gap-6 px-6 md:px-12">
            {categoryKeys.map(k => (
              <button
                key={k}
                onClick={() => handleCategoryClick(k)}
                className={`text-[14px] sm:text-[15px] md:text-[16px] font-bold tracking-[0.2em] uppercase transition-colors ${
                  activeCategory === k ? "text-[#FF3333]" : "text-gray-500 hover:text-gray-300"
                }`}
                aria-pressed={activeCategory === k}
              >
                {catLabel(k)}
              </button>
            ))}
          </div>
          <button
            onClick={handlePrev}
            aria-label="Previous"
            className="absolute left-6 sm:left-8 md:left-10 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-black/70 md:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next"
            className="absolute right-6 sm:right-8 md:right-10 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-black/70 md:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div ref={maskRef} className="overflow-hidden px-6 md:px-12 pb-10">
            <div
              ref={trackRef}
              className="flex gap-3 sm:gap-4 md:gap-6 will-change-transform"
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
                  className="flex-shrink-0 w-[220px] sm:w-[260px] md:w-[320px] lg:w-[380px] xl:w-[420px] h-[360px] sm:h-[420px] md:h-[460px] lg:h-[500px] xl:h-[520px] relative rounded-2xl overflow-hidden group/card border border-transparent hover:border-[#FF3333] transition-all duration-500 bg-[#0d0d0d]"
                >
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={urlFor(product.image as SanityImageSource).width(1200).height(1500).url()}
                      alt={product.name || product.title || "Product image"}
                      fill
                      className="object-contain transition-transform duration-700 group-hover/card:scale-105"
                    />
                  </div>
                  {!isActive && (
                    <div className="absolute inset-0 z-20 bg-black/50 pointer-events-none transition-opacity duration-300" />
                  )}
                  <div className="absolute inset-0 pointer-events-none z-10">
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 z-30 p-8 flex justify-between items-end">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-300 mb-1">
                        {displayCatLabel(product)}
                      </p>
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover/card:text-[#FF3333] transition-colors uppercase tracking-wider">
                        {product.name || product.title}
                      </h3>
                    </div>
                    <div className="shrink-0 w-10 h-10 aspect-square border border-white/30 rounded-full flex items-center justify-center text-white group-hover/card:bg-[#FF3333] group-hover/card:border-[#FF3333] transition-all duration-300">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              )})}
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

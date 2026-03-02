"use client"
import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import type { SanityImageSource } from "@sanity/image-url"
import { useEffect, useRef, useState } from "react"

const categoriesOrder = ["Treadmills", "Bikes", "Strength"] as const
const categorySet = new Set<string>(Array.from(categoriesOrder))

export type ProductsCarouselProduct = {
  _id: string
  name: string
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
  const [activeCat, setActiveCat] = useState<string>(categoriesOrder[0])
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<HTMLDivElement[]>([])

  const getPrimaryCategory = (p: ProductsCarouselProduct): string => {
    const names = [
      ...(p.categories?.map(c => c?.name || "") || []),
      p.category?.name || "",
    ].filter(Boolean) as string[]
    const matched = Array.from(categoriesOrder).find(cat => names.includes(cat))
    return matched || names[0] || ""
  }

  const filtered = products.filter(p => categorySet.has(getPrimaryCategory(p)))

  const firstIndexByCat: Record<string, number> = {}
  categoriesOrder.forEach(cat => {
    const idx = filtered.findIndex(p => getPrimaryCategory(p) === cat)
    if (idx >= 0) firstIndexByCat[cat] = idx
  })

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const onScroll = () => {
      for (let i = 0; i < cardRefs.current.length; i++) {
        const card = cardRefs.current[i]
        if (!card) continue
        const rect = card.getBoundingClientRect()
        const vw = window.innerWidth
        const visible = Math.max(0, Math.min(rect.right, vw) - Math.max(rect.left, 0))
        const ratio = visible / rect.width
        if (ratio > 0.6) {
          const cat = getPrimaryCategory(filtered[i]) || categoriesOrder[0]
          if (cat !== activeCat) setActiveCat(cat)
          break
        }
      }
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [filtered, activeCat])

  const scrollToCat = (cat: string) => {
    const start = firstIndexByCat[cat]
    if (start == null) return
    const card = cardRefs.current[start]
    if (!card || !scrollerRef.current) return
    const left = card.offsetLeft - 16
    scrollerRef.current.scrollTo({ left, behavior: "smooth" })
    setActiveCat(cat)
  }

  if (!products || products.length === 0) {
    return (
      <section className="border-t border-gray-800 bg-[#161616] py-16">
        <div className="mx-auto max-w-[1920px] text-center">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#FF3333]">Latest Gear</h2>
          <p className="mb-8 text-3xl md:text-4xl font-light">Products coming soon.</p>
          <Link href="/studio" className="inline-block border border-white/30 px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-200 hover:border-[#FF3333] hover:text-[#FF3333] transition-colors">Add products in Studio</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="border-t border-gray-800 bg-[#161616] py-16">
      <div className="mx-auto max-w-[1920px] px-4 md:px-12">
        <div className="mb-6 flex items-center justify-center gap-8">
          {categoriesOrder.map((cat) => (
            <button
              key={cat}
              onClick={() => scrollToCat(cat)}
              className={`text-xs font-bold uppercase tracking-[0.3em] transition-colors ${
                activeCat === cat ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {cat}
              {activeCat === cat && <span className="ml-2 inline-block align-middle h-[3px] w-2 rounded-full bg-[#FFCC00]" />}
            </button>
          ))}
        </div>

        <div className="relative">
          <button
            onClick={() => scrollerRef.current?.scrollBy({ left: -((scrollerRef.current?.clientWidth || 0) * 0.9), behavior: "smooth" })}
            aria-label="Previous"
            className="absolute left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-black/70 md:flex"
          >
            ‹
          </button>
          <button
            onClick={() => scrollerRef.current?.scrollBy({ left: (scrollerRef.current?.clientWidth || 0) * 0.9, behavior: "smooth" })}
            aria-label="Next"
            className="absolute right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-black/70 md:flex"
          >
            ›
          </button>
          <div ref={scrollerRef} className="flex gap-6 overflow-x-auto pb-6 scroll-smooth hide-scrollbar snap-x snap-mandatory">
            {filtered.map((product, idx) => (
              <div
                key={product._id}
                ref={(el) => { if (el) cardRefs.current[idx] = el }}
                className="group relative min-w-[280px] md:min-w-[360px] lg:min-w-[420px] rounded-3xl bg-[#E0E0DA] text-black snap-start"
              >
                <Link href={`/products/${product.slug?.current ?? product._id}`} className="block">
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={urlFor(product.image).width(1200).height(900).url()}
                      alt={product.name}
                      fill
                      className="object-contain p-6"
                    />
                  </div>
                </Link>
                <div className="absolute inset-x-6 bottom-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
                      {getPrimaryCategory(product)}
                    </p>
                    <p className="text-sm font-bold uppercase tracking-[0.12em]">
                      {product.name}
                    </p>
                  </div>
                  <Link
                    href={`/products/${product.slug?.current ?? product._id}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-black/30 bg-white/70 text-black hover:border-[#FF3333] hover:text-[#FF3333] transition-colors"
                    aria-label="View product"
                  >
                    <span className="text-lg leading-none">›</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-2 flex w-40 items-center justify-center gap-2">
            <span className={`h-[2px] w-6 rounded-full ${activeCat === "Treadmills" ? "bg-[#FFCC00]/80" : "bg-white/20"}`} />
            <span className={`h-[2px] w-6 rounded-full ${activeCat === "Bikes" ? "bg-[#FFCC00]/80" : "bg-white/20"}`} />
            <span className={`h-[2px] w-6 rounded-full ${activeCat === "Strength" ? "bg-[#FFCC00]/80" : "bg-white/20"}`} />
          </div>
        </div>
      </div>
    </section>
  )
}

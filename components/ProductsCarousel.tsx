"use client"
import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import type { SanityImageSource } from "@sanity/image-url"
import { useEffect, useMemo, useState } from "react"

const categoriesOrder = ["Treadmills", "Bikes", "Strength"] as const
const categorySet = new Set<string>(Array.from(categoriesOrder))

const toSlug = (s?: string) =>
  (s || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")

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
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(3)

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
    const calc = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1200
      if (w < 768) setPerPage(1)
      else if (w < 1024) setPerPage(2)
      else setPerPage(3)
    }
    calc()
    window.addEventListener("resize", calc, { passive: true })
    return () => window.removeEventListener("resize", calc)
  }, [])

  const activeCat = useMemo(() => {
    const idx = Math.min(page * perPage, Math.max(0, filtered.length - 1))
    const item = filtered[idx] ?? filtered[0]
    return (item ? getPrimaryCategory(item) : categoriesOrder[0]) || categoriesOrder[0]
  }, [page, perPage, filtered])

  const slides = useMemo(() => {
    const out: ProductsCarouselProduct[][] = []
    for (let i = 0; i < filtered.length; i += perPage) {
      out.push(filtered.slice(i, i + perPage))
    }
    return out
  }, [filtered, perPage])

  const scrollToCat = (cat: string) => {
    const start = firstIndexByCat[cat]
    if (start == null) return
    const targetPage = Math.floor(start / perPage)
    setPage(targetPage)
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
            onClick={() => setPage(p => Math.max(0, p - 1))}
            aria-label="Previous"
            className="absolute left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-black/70 md:flex"
          >
            ‹
          </button>
          <button
            onClick={() => setPage(p => Math.min(slides.length - 1, p + 1))}
            aria-label="Next"
            className="absolute right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-black/70 md:flex"
          >
            ›
          </button>
          <div className="overflow-hidden pb-6">
            <div
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${page * 100}%)`, width: `${slides.length * 100}%` }}
            >
              {slides.map((group, gi) => (
                <div
                  key={gi}
                  className="grid gap-6 px-1"
                  style={{ gridTemplateColumns: `repeat(${perPage}, minmax(0,1fr))`, width: `${100 / slides.length}%` }}
                >
                  {group.map((product) => (
                    <div
                      key={product._id}
                      className="group relative rounded-3xl bg-[#E0E0DA] text-black"
                    >
                      <Link href={`/products/${product.slug?.current ?? toSlug(product.name)}`} className="block">
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
                          href={`/products/${product.slug?.current ?? toSlug(product.name)}`}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/30 bg-white/70 text-black hover:border-[#FF3333] hover:text-[#FF3333] transition-colors"
                          aria-label="View product"
                        >
                          <span className="text-lg leading-none">›</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
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

"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { urlFor } from "@/sanity/lib/image"
import type { SanityImageSource } from "@sanity/image-url"
import type { ProductsCarouselProduct } from "./ProductsCarousel"

type StaticItem = {
  id: number
  category: string
  name: string
  image: string
  href: string
}

const SLIDER_ITEMS: StaticItem[] = [
  {
    id: 1,
    category: "Cardio",
    name: "Sprint Tread",
    image: "https://images.unsplash.com/photo-1517963628607-235ccdd58bd3?q=80&w=1600&auto=format&fit=crop",
    href: "/products",
  },
  {
    id: 2,
    category: "Strength",
    name: "Power Bench",
    image: "https://images.unsplash.com/photo-1517964603305-1349863e3cde?q=80&w=1600&auto=format&fit=crop",
    href: "/products",
  },
  {
    id: 3,
    category: "Cycling",
    name: "Studio Bike",
    image: "https://images.unsplash.com/photo-1533560904424-0d24b42299a0?q=80&w=1600&auto=format&fit=crop",
    href: "/products",
  },
  {
    id: 4,
    category: "Multi Gym",
    name: "Performance Station",
    image: "https://images.unsplash.com/photo-1518310952931-168b33a35b04?q=80&w=1600&auto=format&fit=crop",
    href: "/products",
  },
]

type TechSliderProps = {
  products?: ProductsCarouselProduct[]
}

export default function TechnologySlider({ products = [] }: TechSliderProps) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const items: Array<ProductsCarouselProduct | StaticItem> = products.length > 0 ? products : SLIDER_ITEMS
  const isStatic = (it: ProductsCarouselProduct | StaticItem): it is StaticItem => "href" in it

  const scroll = (direction: "left" | "right") => {
    const node = trackRef.current
    if (!node) return
    const amount = node.clientWidth * 0.8
    node.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }

  return (
    <section className="bg-[#111111] border-y border-gray-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold text-[#FF3333] uppercase tracking-[0.3em] mb-4">
              Elegantly designed. Fueled by technology.
            </p>
            <h2 className="text-[50px] font-light leading-tight mb-4">
              Precision engineered equipment, tuned for human performance.
            </h2>
            <p className="text-gray-400 max-w-md">
              Glide through a curated line-up of treadmills, bikes and strength systems built to
              feel smooth, solid and responsive at speed.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:border-[#FF3333] hover:text-[#FF3333] transition-colors"
              aria-label="Previous product"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:border-[#FF3333] hover:text-[#FF3333] transition-colors"
              aria-label="Next product"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-none"
          >
            {items.map((item) => (
              <Link
                key={isStatic(item) ? `static-${item.id}` : item._id}
                href={isStatic(item) ? item.href : `/products/${item.slug?.current ?? item._id}`}
                className="group relative min-w-[260px] sm:min-w-[280px] md:min-w-[320px] lg:min-w-[340px] overflow-hidden rounded-3xl bg-[#111111]"
              >
                <div className="relative aspect-[3/4] w-full">
                  {isStatic(item) ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <Image
                      src={urlFor(item.image as SanityImageSource).width(900).height(1200).url()}
                      alt={item.name}
                      fill
                      className="object-contain bg-[#0d0d0d] transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                </div>
                <div className="absolute inset-x-6 bottom-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-200">
                      {isStatic(item) ? item.category : item.category?.name}
                    </p>
                    <p className="text-sm font-bold uppercase tracking-[0.12em]">
                      {item.name}
                    </p>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-black/60 text-white/90 group-hover:border-[#FF3333] group-hover:text-[#FF3333] transition-colors">
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

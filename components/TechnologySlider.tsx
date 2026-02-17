"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const SLIDER_ITEMS = [
  {
    id: 1,
    category: "Cardio",
    name: "Sprint Tread",
    image: "/images/treadmill.jpg",
    href: "/products",
  },
  {
    id: 2,
    category: "Strength",
    name: "Power Bench",
    image: "/images/bench.jpg",
    href: "/products",
  },
  {
    id: 3,
    category: "Cycling",
    name: "Studio Bike",
    image: "/images/bike.jpg",
    href: "/products",
  },
  {
    id: 4,
    category: "Multi Gym",
    name: "Performance Station",
    image: "/images/multigym.jpg",
    href: "/products",
  },
]

export default function TechnologySlider() {
  const trackRef = useRef<HTMLDivElement | null>(null)

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
            <h2 className="text-3xl md:text-4xl font-light leading-tight mb-4">
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
            {SLIDER_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group relative min-w-[260px] sm:min-w-[280px] md:min-w-[320px] lg:min-w-[340px] overflow-hidden rounded-3xl bg-[#111111]"
              >
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                </div>
                <div className="absolute inset-x-6 bottom-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-200">
                      {item.category}
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

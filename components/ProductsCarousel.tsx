import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import type { SanityImageSource } from "@sanity/image-url"

export type ProductsCarouselProduct = {
  _id: string
  name: string
  slug: { current: string }
  image: SanityImageSource
  price: number
  description: string
}

interface ProductsCarouselProps {
  products: ProductsCarouselProduct[]
}

export default function ProductsCarousel({ products }: ProductsCarouselProps) {
  if (!products || products.length === 0) {
    return (
      <section className="border-t border-gray-800 bg-[#161616] px-4 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#FF3333]">
            Latest Gear
          </h2>
          <p className="mb-8 text-3xl md:text-4xl font-light">Products coming soon.</p>
          <Link
            href="/studio"
            className="inline-block border border-white/30 px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-200 hover:border-[#FF3333] hover:text-[#FF3333] transition-colors"
          >
            Add products in Studio
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="border-t border-gray-800 bg-[#161616] px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#FF3333]">
              Latest Gear
            </p>
            <h2 className="text-3xl md:text-4xl font-light leading-tight">
              Shop by product
              <span className="block text-sm font-normal uppercase tracking-[0.25em] text-gray-400 md:text-xs">
                Treadmills · Bikes · Strength · Multi gyms
              </span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 border-b border-transparent hover:text-[#FF3333] hover:border-[#FF3333] pb-1 transition-colors"
          >
            View all
          </Link>
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-none">
            {products.map((product) => (
              <Link
                key={product._id}
                href="/products"
                className="group relative min-w-[260px] sm:min-w-[280px] md:min-w-[320px] lg:min-w-[340px] overflow-hidden rounded-3xl bg-[#111111]"
              >
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={urlFor(product.image).width(900).height(1100).url()}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </div>
                <div className="absolute inset-x-6 bottom-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-300">
                      {product.price ? `$${product.price.toFixed(0)}` : "Premium"}
                    </p>
                    <p className="text-sm font-bold uppercase tracking-[0.12em]">
                      {product.name}
                    </p>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-black/60 text-white/90 group-hover:border-[#FF3333] group-hover:text-[#FF3333] transition-colors">
                    <span className="text-lg leading-none">›</span>
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

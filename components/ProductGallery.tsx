"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import type { SanityImageSource } from "@sanity/image-url"

interface ProductGalleryProps {
  name: string
  mainImage: SanityImageSource
  gallery: SanityImageSource[]
}

export default function ProductGallery({ name, mainImage, gallery }: ProductGalleryProps) {
  const images = useMemo(() => {
    const arr = [mainImage, ...(Array.isArray(gallery) ? gallery : [])]
    const seen = new Set<string>()
    return arr.filter(img => {
      try {
        const u = urlFor(img).width(100).height(100).url()
        if (seen.has(u)) return false
        seen.add(u)
        return true
      } catch {
        return false
      }
    })
  }, [mainImage, gallery])

  const [active, setActive] = useState(0)
  const activeSrc = urlFor(images[active] || mainImage).width(1600).height(1200).url()

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 md:gap-4 items-start">
      {images.length > 1 && (
        <div className="hidden md:block md:col-span-2 self-start">
          <div className="rounded-3xl bg-[#111111] p-2 md:p-3 h-full">
            <div className="flex flex-col gap-2 h-full">
              {images.slice(0, 8).map((img, i) => {
                const thumb = urlFor(img).width(300).height(300).url()
                const isActive = i === active
                return (
                  <button
                    key={thumb + i}
                    onClick={() => setActive(i)}
                    className={`relative aspect-square overflow-hidden rounded-xl border ${
                      isActive ? "border-[#FF3333]" : "border-white/10 hover:border-white/30"
                    } bg-white`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image
                      src={thumb}
                      alt={`${name}-${i + 1}`}
                      fill
                      className="object-contain p-1"
                      sizes="100px"
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <div className="md:col-span-10 self-start">
        <div className="rounded-3xl bg-[#111111] p-2 md:p-3 h-full">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white">
            <Image
              key={activeSrc}
              src={activeSrc}
              alt={name}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>
        </div>
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6 md:hidden">
          {images.slice(0, 8).map((img, i) => {
            const thumb = urlFor(img).width(300).height(300).url()
            const isActive = i === active
            return (
              <button
                key={thumb + i}
                onClick={() => setActive(i)}
                className={`relative aspect-square overflow-hidden rounded-xl border ${
                  isActive ? "border-[#FF3333]" : "border-white/10 hover:border-white/30"
                } bg-white`}
                aria-label={`View image ${i + 1}`}
              >
                <Image
                  src={thumb}
                  alt={`${name}-${i + 1}`}
                  fill
                  className="object-contain p-1"
                  sizes="80px"
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import type { SanityImageSource } from "@sanity/image-url"
import styles from "@/styles/components/ProductGallery.module.css"

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
    <div className={styles.galleryGrid}>
      {/* Desktop thumbnail sidebar */}
      {images.length > 1 && (
        <div className={styles.thumbSidebar}>
          <div className={styles.thumbSidebarInner}>
            <div className={styles.thumbList}>
              {images.slice(0, 8).map((img, i) => {
                const thumb = urlFor(img).width(300).height(300).url()
                return (
                  <button
                    key={thumb + i}
                    onClick={() => setActive(i)}
                    className={`${styles.thumbBtn} ${i === active ? styles.thumbBtnActive : ""}`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image
                      src={thumb}
                      alt={`${name}-${i + 1}`}
                      fill
                      className={styles.thumbImage}
                      sizes="100px"
                      unoptimized
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main image */}
      <div className={styles.mainCol}>
        <div className={styles.mainWrap}>
          <div className={styles.mainImageBox}>
            <Image
              key={activeSrc}
              src={activeSrc}
              alt={name}
              fill
              className={styles.mainImage}
              sizes="(max-width: 1024px) 100vw, 66vw"
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Mobile thumbnail strip */}
      {images.length > 1 && (
        <div className={styles.thumbMobileGrid}>
          {images.slice(0, 8).map((img, i) => {
            const thumb = urlFor(img).width(300).height(300).url()
            return (
              <button
                key={thumb + i}
                onClick={() => setActive(i)}
                className={`${styles.thumbBtn} ${i === active ? styles.thumbBtnActive : ""}`}
                aria-label={`View image ${i + 1}`}
              >
                <Image
                  src={thumb}
                  alt={`${name}-${i + 1}`}
                  fill
                  className={styles.thumbImage}
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

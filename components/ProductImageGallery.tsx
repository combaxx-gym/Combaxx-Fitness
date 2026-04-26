'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { urlFor } from '@/sanity/lib/image'
import { SanityImageSource } from '@sanity/image-url'
import styles from '@/styles/components/ProductImageGallery.module.css'

const ThreeModelViewer = dynamic(() => import('./ThreeModelViewer'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 32, height: 32, border: '2px solid rgba(255,51,51,0.2)', borderTopColor: '#FF3333', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    </div>
  ),
})

interface Props {
  name: string
  mainImage: SanityImageSource
  gallery?: SanityImageSource[]
  model3DUrl?: string
}

function CubeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

export default function ProductImageGallery({ name, mainImage, gallery = [], model3DUrl }: Props) {
  const allImages = [mainImage, ...gallery].filter(Boolean) as SanityImageSource[]
  const [activeIndex, setActiveIndex] = useState(0)
  const [show3D, setShow3D] = useState(false)

  const goTo = useCallback((index: number) => {
    setActiveIndex(index)
    setShow3D(false)
  }, [])

  const goPrev = useCallback(() => {
    setActiveIndex(prev => (prev - 1 + allImages.length) % allImages.length)
    setShow3D(false)
  }, [allImages.length])

  const goNext = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % allImages.length)
    setShow3D(false)
  }, [allImages.length])

  return (
    <div className={styles.wrapper}>
      {/* Thumbnail Strip */}
      <div className={styles.thumbnails}>
        {allImages.map((img, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`${styles.thumb} ${activeIndex === i && !show3D ? styles.thumbActive : ''}`}
            aria-label={`View image ${i + 1}`}
          >
            <Image
              src={urlFor(img).width(120).height(120).url()}
              alt={`${name} view ${i + 1}`}
              fill
              className={styles.thumbImg}
              sizes="80px"
              unoptimized
            />
          </button>
        ))}

        {model3DUrl && (
          <button
            onClick={() => setShow3D(true)}
            className={`${styles.thumb} ${styles.thumb3D} ${show3D ? styles.thumbActive : ''}`}
            aria-label="View 3D model"
          >
            <span className={styles.thumb3DLabel}>3D<br />View</span>
          </button>
        )}
      </div>

      {/* Main Viewer */}
      <div className={styles.mainView}>
        <AnimatePresence mode="wait">
          {show3D && model3DUrl ? (
            <motion.div
              key="3d"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={styles.viewerContainer}
            >
              <ThreeModelViewer url={model3DUrl} />
            </motion.div>
          ) : (
            <motion.div
              key={`img-${activeIndex}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={styles.zoomContainer}
            >
              <Image
                src={urlFor(allImages[activeIndex]).width(900).height(900).quality(90).url()}
                alt={name}
                fill
                className={styles.mainImage}
                priority={activeIndex === 0}
                sizes="(max-width: 768px) 100vw, 55vw"
                unoptimized
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav Arrows */}
        {allImages.length > 1 && !show3D && (
          <>
            <button onClick={goPrev} className={`${styles.navBtn} ${styles.navPrev}`} aria-label="Previous image">
              <ChevronLeft />
            </button>
            <button onClick={goNext} className={`${styles.navBtn} ${styles.navNext}`} aria-label="Next image">
              <ChevronRight />
            </button>
          </>
        )}

        {/* Counter */}
        {!show3D && allImages.length > 1 && (
          <div className={styles.counter}>{activeIndex + 1} / {allImages.length}</div>
        )}

        {/* 3D Toggle */}
        {model3DUrl && (
          <button
            onClick={() => setShow3D(v => !v)}
            className={styles.toggleBtn}
            aria-label={show3D ? 'Switch to photos' : 'View 3D model'}
          >
            <span className={styles.toggleIcon}>
              {show3D ? <CameraIcon /> : <CubeIcon />}
            </span>
            {show3D ? 'Photos' : '3D View'}
          </button>
        )}
      </div>
    </div>
  )
}

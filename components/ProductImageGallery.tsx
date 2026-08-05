'use client'

import { useState, useCallback, Component, ReactNode } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { urlFor } from '@/sanity/lib/image'
import { SanityImageSource } from '@sanity/image-url'
import styles from '@/styles/components/ProductImageGallery.module.css'

class ViewerErrorBoundary extends Component<
  { children: ReactNode; fallback: (error: string, retry: () => void) => ReactNode },
  { hasError: boolean; errorMsg: string }
> {
  constructor(props: { children: ReactNode; fallback: (error: string, retry: () => void) => ReactNode }) {
    super(props)
    this.state = { hasError: false, errorMsg: '' }
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMsg: error?.message || 'Failed to load 3D viewer' }
  }
  componentDidCatch(error: Error) {
    console.error('Viewer chunk/error boundary caught:', error)
  }
  reset = () => this.setState({ hasError: false, errorMsg: '' })
  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.state.errorMsg, this.reset)
    }
    return this.props.children
  }
}

const ThreeModelViewer = dynamic(
  () =>
    import('./ThreeModelViewer').catch((err) => {
      console.error('Failed to load ThreeModelViewer chunk:', err)
      throw err
    }),
  {
    ssr: false,
    loading: () => (
      <div style={{ width: '100%', height: '100%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 32, height: 32, border: '2px solid rgba(255,51,51,0.2)', borderTopColor: '#FF3333', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
    ),
  }
)

function ViewerErrorFallback({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        textAlign: 'center',
        gap: 12,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'rgba(255, 51, 51, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF3333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>3D View Unavailable</span>
        <span style={{ color: '#999', fontSize: 13, maxWidth: 360, lineHeight: 1.5 }}>
          {message
            ? `${message.length > 80 ? message.slice(0, 80) + '...' : message}`
            : 'There was a problem loading the interactive 3D view.'}
          <br />Please refresh the page or try again later.
        </span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            marginTop: 8,
            padding: '10px 22px',
            background: '#FF3333',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Retry
        </button>
      )}
    </div>
  )
}

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
              src={urlFor(img).url()}
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
              <ViewerErrorBoundary
                fallback={(err, retry) => (
                  <ViewerErrorFallback message={err} onRetry={retry} />
                )}
              >
                <ThreeModelViewer url={model3DUrl} />
              </ViewerErrorBoundary>
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
                src={urlFor(allImages[activeIndex]).url()}
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

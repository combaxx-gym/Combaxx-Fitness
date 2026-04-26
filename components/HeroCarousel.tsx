"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import styles from "@/styles/components/HeroCarousel.module.css"

const SLIDES = [
  {
    id: 1,
    video: "/videos/743f8627-519af9c4.mp4",
    poster: "/images/hero-section-slide-1.webp",
    title: "SKILLRUN",
    description:
      "Fast-paced running. Intense climbs and descents. Instant speed and gradient changes. Skillrun is designed for performance running.",
    cta: "Discover More",
    link: "/shop",
  },
  {
    id: 2,
    video: "/videos/9560d960.mp4",
    poster: "/images/hero-section-slide-2.webp",
    title: "POWER STRENGTH",
    description:
      "Unleash your full potential with our industrial-grade strength equipment. Built for heavy lifting and maximum durability.",
    cta: "Explore Strength",
    link: "/shop",
  },
  {
    id: 3,
    video: "/videos/9af5361d.mp4",
    poster: "/images/hero-section-slide-3.webp",
    title: "CARDIO ELITE",
    description:
      "Experience the next level of cardio. Advanced biomechanics meet sleek design to keep you moving further and faster.",
    cta: "View Cardio",
    link: "/shop",
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const duration = 8000
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const nextSlide = () => {
    setProgress(0)
    setCurrent((prev) => (prev + 1) % SLIDES.length)
  }

  const prevSlide = () => {
    setProgress(0)
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined
    let progressInterval: NodeJS.Timeout | undefined

    if (isPlaying) {
      const startTime = Date.now()

      progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const newProgress = Math.min((elapsed / duration) * 100, 100)
        setProgress(newProgress)
      }, 100)

      interval = setTimeout(() => {
        nextSlide()
      }, duration)
    }

    return () => {
      if (interval) clearTimeout(interval)
      if (progressInterval) clearInterval(progressInterval)
    }
  }, [current, isPlaying])

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === current) {
          video.currentTime = 0
          video.play().catch(() => {
            console.log("Autoplay blocked or video missing")
          })
        } else {
          video.pause()
        }
      }
    })
  }, [current])

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Slides */}
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${index === current ? styles.slideActive : ""}`}
          >
            {/* Video overlay */}
            <div className={styles.videoOverlay} />
            <video
              ref={(el) => {
                if (videoRefs.current) {
                  videoRefs.current[index] = el
                }
              }}
              className={styles.video}
              muted
              loop
              playsInline
              poster={slide.poster ?? `/images/COMBAXX FITNESS logo.png`}
            >
              <source src={slide.video} type="video/mp4" />
            </video>

            {/* Content */}
            <div className={styles.content}>
              <div className={`${styles.contentInner} ${index === current ? "" : styles.contentInnerHidden}`}>
                <h2 className={styles.slideTitle}>{slide.title}</h2>
                <p className={styles.slideDesc}>{slide.description}</p>
                <Link href={slide.link}>
                  <button className={styles.ctaBtn}>
                    {slide.cta}
                    <ChevronRight className="w-4 h-4 hero-arrow-icon" strokeWidth={3} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Controls */}
        <div className={styles.controls}>
          <div className={styles.navGroup}>
            <button onClick={prevSlide} className={styles.arrowBtn}>
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Progress Bars */}
            <div className={styles.progressBars}>
              {SLIDES.map((_, index) => (
                <div
                  key={index}
                  className={styles.progressTrack}
                  onClick={() => {
                    setCurrent(index)
                    setProgress(0)
                  }}
                >
                  <div
                    className={`${styles.progressFill} ${index === current ? styles.progressFillActive : ""}`}
                    style={{ width: index === current ? `${progress}%` : "0%" }}
                  />
                </div>
              ))}
            </div>

            <button onClick={nextSlide} className={styles.arrowBtn}>
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Play/Pause */}
          <button onClick={togglePlay} className={styles.playBtn}>
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
        </div>

      </div>
    </section>
  )
}

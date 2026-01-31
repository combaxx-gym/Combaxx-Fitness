"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

const SLIDES = [
  {
    id: 1,
    video: "/videos/743f8627-519af9c4.mp4",
    title: "SKILLRUN",
    description:
      "Fast-paced running. Intense climbs and descents. Instant speed and gradient changes. Skillrun is designed for performance running.",
    cta: "Discover More",
    link: "/shop",
  },
  {
    id: 2,
    video: "/videos/9560d960.mp4",
    title: "POWER STRENGTH",
    description:
      "Unleash your full potential with our industrial-grade strength equipment. Built for heavy lifting and maximum durability.",
    cta: "Explore Strength",
    link: "/shop",
  },
  {
    id: 3,
    video: "/videos/9af5361d.mp4",
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
  const duration = 8000 // 8 seconds per slide
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    let interval: NodeJS.Timeout
    let progressInterval: NodeJS.Timeout

    if (isPlaying) {
      // Reset progress when slide changes
      setProgress(0)
      
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
      clearTimeout(interval)
      clearInterval(progressInterval)
    }
  }, [current, isPlaying])

  // Handle video playback when slide changes
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === current) {
          video.currentTime = 0
          video.play().catch(() => {
            // Auto-play might be blocked by browser policies
            console.log("Autoplay blocked or video missing")
          })
        } else {
          video.pause()
        }
      }
    })
  }, [current])

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % SLIDES.length)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="relative h-screen w-full bg-[#161616] p-4 md:p-6 group">
      <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
      
      {/* Slides */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Video Background */}
          <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay for text readability */}
          <video
            ref={(el) => {
                if (videoRefs.current) {
                    videoRefs.current[index] = el;
                }
            }}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            poster={`/images/slide-placeholder-${index + 1}.jpg`} // Optional poster
          >
            <source src={slide.video} type="video/mp4" />
          </video>

          {/* Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-20 max-w-[1920px] mx-auto">
            <div className={`max-w-2xl transition-all duration-700 transform ${
                index === current ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}>
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter uppercase">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-xl">
                {slide.description}
              </p>
              <Link href={slide.link}>
                <button className="bg-[#F0D348] text-black font-bold py-4 px-8 uppercase tracking-widest text-sm hover:bg-white transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  {slide.cta}
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Controls - Bottom Right */}
      <div className="absolute bottom-12 right-6 md:right-20 z-30 flex items-center gap-6">
        
        {/* Navigation Arrows */}
        <div className="flex items-center gap-4">
            <button onClick={prevSlide} className="p-2 text-white hover:text-[#F0D348] transition-colors">
                <ChevronLeft className="w-6 h-6" />
            </button>
            
            {/* Progress Bars */}
            <div className="flex items-center gap-2">
            {SLIDES.map((_, index) => (
                <div 
                    key={index} 
                    className="relative w-12 h-1 bg-gray-600 rounded-full overflow-hidden cursor-pointer"
                    onClick={() => setCurrent(index)}
                >
                    <div 
                        className={`absolute top-0 left-0 h-full bg-[#F0D348] transition-all duration-100 ease-linear ${
                            index === current ? "opacity-100" : "opacity-0"
                        }`}
                        style={{ width: index === current ? `${progress}%` : '0%' }}
                    />
                </div>
            ))}
            </div>

            <button onClick={nextSlide} className="p-2 text-white hover:text-[#F0D348] transition-colors">
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>

        {/* Play/Pause */}
        <button onClick={togglePlay} className="p-2 text-white hover:text-[#F0D348] transition-colors">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>

      </div>
      
      </div>
    </section>
  )
}

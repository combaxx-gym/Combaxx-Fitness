"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

// Fallback data if Sanity is empty
const STATIC_CATEGORIES = [
  { _id: "1", name: "Treadmills", slug: { current: "treadmills" }, image: "/images/treadmill.jpg" },
  { _id: "2", name: "Bikes", slug: { current: "bikes" }, image: "/images/bike.jpg" },
  { _id: "3", name: "Weight Benches", slug: { current: "weight-benches" }, image: "/images/bench.jpg" },
  { _id: "4", name: "Multi Gyms", slug: { current: "multi-gyms" }, image: "/images/multigym.jpg" },
  { _id: "5", name: "Cross Trainers", slug: { current: "cross-trainers" }, image: "/images/crosstrainer.jpg" },
  { _id: "6", name: "Dumbbells", slug: { current: "dumbbells" }, image: "/images/dumbbells.jpg" },
]

interface Category {
  _id: string
  name: string
  slug: { current: string }
  image: any
}

export default function CategoryShowcase() {
  const [categories, setCategories] = useState<Category[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [cardWidth, setCardWidth] = useState(0)
  
  // Use a ref to access the card to measure it
  const cardRef = useRef<HTMLAnchorElement>(null)
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = `*[_type == "category"]{
          _id,
          name,
          slug,
          image
        }`
        const result = await client.fetch(query)
        if (result.length > 0) {
          setCategories(result)
        } else {
          setCategories(STATIC_CATEGORIES)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
        setCategories(STATIC_CATEGORIES)
      }
    }
    fetchCategories()
  }, [])

  // Measure card width for calculation
  useEffect(() => {
    const updateWidth = () => {
      if (cardRef.current) {
        // card width + gap (24px = 1.5rem)
        setCardWidth(cardRef.current.offsetWidth + 24)
      }
    }

    // Initial measure
    updateWidth()
    
    // Add resize listener
    window.addEventListener('resize', updateWidth)
    
    // Check periodically in case of layout shifts
    const timer = setTimeout(updateWidth, 500)
    
    return () => {
      window.removeEventListener('resize', updateWidth)
      clearTimeout(timer)
    }
  }, [categories])

  // Auto slide logic
  useEffect(() => {
    if (categories.length === 0) return

    const interval = setInterval(() => {
      handleNext()
    }, 3000)

    return () => clearInterval(interval)
  }, [categories.length]) // Depend on categories.length only to avoid resetting interval too often

  // Handle Infinite Loop Reset
  useEffect(() => {
    if (currentIndex === categories.length) {
      // We reached the start of the cloned set
      // Wait for transition to finish (500ms), then snap back to 0
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(0)
        // Re-enable transition after a small tick
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true)
          })
        })
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, categories.length])


  const handleNext = () => {
    setCurrentIndex(prev => prev + 1)
  }

  const handlePrev = () => {
    if (currentIndex === 0) {
      // Snap to end (cloned start) instantly, then slide to N-1
      setIsTransitioning(false)
      setCurrentIndex(categories.length)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true)
          setCurrentIndex(categories.length - 1)
        })
      })
    } else {
      setCurrentIndex(prev => prev - 1)
    }
  }

  // Handle dot click
  const handleDotClick = (index: number) => {
      setCurrentIndex(index)
  }

  // Double the categories for infinite loop
  const displayCategories = [...categories, ...categories]
  
  // Calculate active index for dots (modulo)
  const activeDotIndex = currentIndex % categories.length

  return (
    <section className="py-20 bg-[#f4f4f4] dark:bg-[#161616] transition-colors duration-300 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase tracking-widest text-black dark:text-white">
          Shop by Category
        </h2>

        <div className="relative group">
          {/* Scroll Buttons */}
          <button 
            onClick={handlePrev} 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-[#FF3333] text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm -ml-4 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={handleNext} 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-[#FF3333] text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm -mr-4 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Container - Mask */}
          <div className="overflow-hidden -mx-6 md:-mx-12 px-6 md:px-12 pb-12">
            {/* Track */}
            <div 
              className="flex gap-6 will-change-transform"
              style={{
                transform: `translateX(-${currentIndex * cardWidth}px)`,
                transition: isTransitioning ? 'transform 500ms ease-out' : 'none'
              }}
            >
              {displayCategories.map((category, index) => (
                <Link 
                  href={`/shop?category=${category.slug.current}`} 
                  key={`${category._id}-${index}`}
                  ref={index === 0 ? cardRef : null}
                  className="flex-shrink-0 w-[300px] md:w-[400px] h-[500px] relative rounded-2xl overflow-hidden group/card border border-transparent hover:border-[#FF3333] transition-all duration-500"
                >
                  {/* Image */}
                  <div className="absolute inset-0 bg-gray-800">
                     {category.image ? (
                       <Image
                          src={typeof category.image === 'string' ? category.image : urlFor(category.image).url()}
                          alt={category.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                       />
                     ) : (
                       <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-700">
                          No Image
                       </div>
                     )}
                  </div>

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end">
                      <div>
                          <h3 className="text-xl md:text-2xl font-bold text-white group-hover/card:text-[#FF3333] transition-colors duration-300 uppercase tracking-wider mb-2">
                              {category.name}
                          </h3>
                          <div className="h-1 w-12 bg-white group-hover/card:bg-[#FF3333] rounded-full group-hover/card:w-20 transition-all duration-300" />
                      </div>
                      
                      <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white group-hover/card:bg-[#FF3333] group-hover/card:border-[#FF3333] transition-all duration-300">
                          <ChevronRight className="w-5 h-5" />
                      </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-4">
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeDotIndex 
                    ? "w-[30px] bg-[#FF3333]" 
                    : "w-2 bg-gray-600 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

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
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      const maxScroll = scrollWidth - clientWidth
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
      setScrollProgress(progress)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current
      const scrollAmount = clientWidth / 2
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="py-20 bg-[#f4f4f4] dark:bg-[#161616] transition-colors duration-300">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase tracking-widest text-black dark:text-white">
          Shop by Category
        </h2>

        <div className="relative group">
          {/* Scroll Buttons */}
          <button 
            onClick={() => scroll('left')} 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-[#F0D348] text-white hover:text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm -ml-4"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => scroll('right')} 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-[#F0D348] text-white hover:text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm -mr-4"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Container */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto pb-12 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <Link 
                href={`/shop?category=${category.slug.current}`} 
                key={category._id}
                className="flex-shrink-0 w-[300px] md:w-[400px] h-[500px] relative rounded-2xl overflow-hidden group/card snap-start cursor-pointer"
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
                        <h3 className="text-xl md:text-2xl font-bold text-[#F0D348] uppercase tracking-wider mb-2">
                            {category.name}
                        </h3>
                        <div className="h-1 w-12 bg-white rounded-full group-hover/card:w-20 transition-all duration-300" />
                    </div>
                    
                    <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white group-hover/card:bg-[#F0D348] group-hover/card:border-[#F0D348] group-hover/card:text-black transition-all duration-300">
                        <ChevronRight className="w-5 h-5" />
                    </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Progress Bar (Bottom Dots Style) */}
          <div className="flex justify-center items-center gap-1 mt-4">
             <div className="w-48 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-[#F0D348] transition-all duration-100 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                />
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}

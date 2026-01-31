import React from 'react'
import Link from 'next/link'

export default function ProductCategoriesPage() {
  const categories = [
    "Treadmills", "Bikes", "Ellipticals", "Rower", "Strength", "Exercise Tools"
  ]

  return (
    <div className="min-h-screen pt-32 px-6 md:px-12 bg-neutral-900 text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-[#FF3333]">Product Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <Link key={index} href={`/products?category=${category.toLowerCase()}`}>
            <div className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-[#FF3333] hover:text-white transition-all duration-300 cursor-pointer h-full flex flex-col justify-between">
              <h2 className="text-3xl font-bold mb-4">{category}</h2>
              <p className="text-gray-400 group-hover:text-white/90 mb-6">Explore our premium range of {category.toLowerCase()}.</p>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20">
                 <span className="text-xl">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

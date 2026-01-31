import React from 'react'

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-32 px-6 md:px-12 bg-neutral-900 text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-[#FF3333]">Latest Stories & News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Placeholder Blog Posts */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
            <div className="h-48 bg-gray-700 rounded-xl mb-6"></div>
            <h2 className="text-2xl font-bold mb-4">Blog Post Title {item}</h2>
            <p className="text-gray-400 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button className="text-[#FF3333] font-bold uppercase tracking-wider text-sm hover:text-white transition-colors">Read More</button>
          </div>
        ))}
      </div>
    </div>
  )
}

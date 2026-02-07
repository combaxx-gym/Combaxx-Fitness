import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/Header"
import HeroCarousel from "@/components/HeroCarousel"
import CategoryShowcase from "@/components/CategoryShowcase"
import Footer from "@/components/Footer"

interface Product {
  _id: string
  name: string
  slug: { current: string }
  image: any
  price: number
  description: string
}

async function getProducts() {
  try {
    const query = `*[_type == "product"]{
      _id,
      name,
      slug,
      image,
      price,
      description
    }`
    const products = await client.fetch(query)
    return products
  } catch (error) {
    console.error("Failed to fetch products:", error)
    return []
  }
}

export default async function Home() {
  const products: Product[] = await getProducts()

  return (
    <div className="min-h-screen bg-[#161616] text-white selection:bg-[#FF3333] selection:text-black">
      <Header />

      {/* Hero Section */}
      <HeroCarousel />

      {/* Category Section */}
      <CategoryShowcase />

      {/* Story / Materials Section */}
      <section className="py-20 px-4 border-b border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xs font-bold text-[#FF3333] uppercase tracking-[0.3em] mb-4">Our Obsession</h2>
          <p className="text-3xl md:text-4xl font-light leading-tight">
            We don't just build gym equipment. We engineer tools for human transformation. 
            Using industrial-grade steel and precision mechanics, our gear is designed 
            to withstand your absolute best.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto py-20 px-4">
        <div className="flex justify-between items-end mb-12">
           <h2 className="text-3xl font-bold uppercase tracking-tighter">Latest Gear</h2>
           <Link href="/shop" className="text-sm text-gray-400 hover:text-[#FF3333] uppercase tracking-widest border-b border-transparent hover:border-[#FF3333] pb-1 transition-all">
             View All
           </Link>
        </div>
        
        {products.length === 0 ? (
           <div className="text-center py-20 border border-dashed border-gray-800 rounded-lg">
             <p className="text-gray-500 mb-4">No products found.</p>
             <Link href="/studio" className="btn-primary inline-block">
               Add Products in Studio
             </Link>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {products.map((product) => (
              <div key={product._id} className="group cursor-pointer">
                {product.image && (
                  <div className="relative aspect-square w-full bg-[#111] mb-6 overflow-hidden">
                    <Image
                      src={urlFor(product.image).url()}
                      alt={product.name}
                      fill
                      className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    {/* Minimal Badge */}
                    <div className="absolute top-4 left-4 bg-[#FF3333] text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      New Arrival
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#FF3333] transition-colors uppercase tracking-tight">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-1">{product.description}</p>
                  </div>
                  <span className="text-lg font-mono text-[#F0D348]">${product.price}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

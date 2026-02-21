import { client } from "@/sanity/lib/client"
import Header from "@/components/Header"
import HeroCarousel from "@/components/HeroCarousel"
import CategoryShowcase from "@/components/CategoryShowcase"
import ShapingFuture from "@/components/ShapingFuture"
import Footer from "@/components/Footer"
import TechnologySlider from "@/components/TechnologySlider"
import PerformanceWorld from "@/components/PerformanceWorld"
import StoriesShowcase from "@/components/StoriesShowcase"
import PartnersStrip from "@/components/PartnersStrip"
import BusinessFaq from "@/components/BusinessFaq"
import ProductsCarousel, { ProductsCarouselProduct } from "@/components/ProductsCarousel"

async function getProducts(): Promise<ProductsCarouselProduct[]> {
  try {
    const query = `*[_type == "product"]{
      _id,
      name,
      slug,
      image,
      description
      ,category->{name, slug}
    }`
    const products = await client.fetch(query)
    return products as ProductsCarouselProduct[]
  } catch (error) {
    console.error("Failed to fetch products:", error)
    return []
  }
}

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-[#161616] text-white selection:bg-[#FF3333] selection:text-black">
      <Header />

      {/* Hero Section */}
      <HeroCarousel />

      <TechnologySlider />

      {/* Category Section */}
      <CategoryShowcase />

      {/* Shaping the Future Section */}
      <ShapingFuture />

      <PerformanceWorld />

      {/* Story / Materials Section */}
      <section className="py-20 border-b border-gray-800">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xs font-bold text-[#FF3333] uppercase tracking-[0.3em] mb-4">Our Obsession</h2>
          <p className="text-3xl md:text-4xl font-light leading-tight">
            We don&apos;t just build gym equipment. We engineer tools for human transformation. 
            Using industrial-grade steel and precision mechanics, our gear is designed 
            to withstand your absolute best.
          </p>
          </div>
        </div>
      </section>

      <StoriesShowcase />

      <PartnersStrip />

      <ProductsCarousel products={products} />

      <BusinessFaq />

      <Footer />
    </div>
  )
}

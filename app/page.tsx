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
      ,categories[]->{name, slug}
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
  const isTopSelling = (p: ProductsCarouselProduct) => {
    const match = (name?: string, slug?: string) => {
      const n = (name || "").toLowerCase()
      const s = (slug || "").toLowerCase()
      return (
        n === "top selling products" ||
        n === "top selling" ||
        s === "top-selling-products" ||
        s === "top-selling"
      )
    }
    if (match(p.category?.name, p.category?.slug?.current)) return true
    if (Array.isArray(p.categories)) {
      for (const c of p.categories) {
        if (match(c?.name, c?.slug?.current)) return true
      }
    }
    return false
  }
  const topSellingProducts = products.filter(isTopSelling)

  return (
    <div className="min-h-screen bg-[#161616] text-white selection:bg-[#FF3333] selection:text-black">
      <Header />

      {/* Hero Section */}
      <HeroCarousel />

      <TechnologySlider products={topSellingProducts} />

      {/* Category Section */}
      <CategoryShowcase />

      {/* Shaping the Future Section */}
      <ShapingFuture />

      <PerformanceWorld />

      <StoriesShowcase />

      <PartnersStrip />

      <ProductsCarousel products={products} />

      <BusinessFaq />

      <Footer />
    </div>
  )
}

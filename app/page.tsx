import { client } from "@/sanity/lib/client"
import HeroCarousel from "@/components/HeroCarousel"
import CategoryShowcase from "@/components/CategoryShowcase"
import ShapingFuture from "@/components/ShapingFuture"
import TechnologySlider from "@/components/TechnologySlider"
import PerformanceWorld from "@/components/PerformanceWorld"
import StoriesShowcase from "@/components/StoriesShowcase"
import BusinessFaq from "@/components/BusinessFaq"
import ProductsCarousel, { ProductsCarouselProduct } from "@/components/ProductsCarousel"
import styles from "@/styles/pages/home.module.css"

async function getProducts(): Promise<ProductsCarouselProduct[]> {
  try {
    const query = `*[_type == "product"]{
      _id,
      name,
      slug,
      image,
      gallery[],
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
    <div className={styles.page}>
      <HeroCarousel />
      <TechnologySlider products={topSellingProducts} />
      <CategoryShowcase />
      <ShapingFuture />
      <PerformanceWorld />
      <StoriesShowcase />
      <ProductsCarousel products={products} />
      <BusinessFaq />
    </div>
  )
}

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

/* ── 5 CANONICAL CATEGORIES (matches ProductsCarousel tab order) ── */
const CANONICAL_SLUGS = [
  { key: "rigs-racks"          as const, slugVariants: ["rigs-and-racks", "rigs", "racks", "rigs-racks", "rig", "rack"] },
  { key: "storage-systems"     as const, slugVariants: ["storage-systems", "storage", "storage-system", "storages"] },
  { key: "functional-training" as const, slugVariants: ["functional-training", "functional"] },
  { key: "barbells"            as const, slugVariants: ["barbells", "barbell"] },
  { key: "benches"             as const, slugVariants: ["benches", "bench"] },
]

const productFragment = `
  _id, name, title, slug, image, gallery[], description,
  category->{name, slug},
  categories[]->{name, slug},
  subCategory->{name, slug},
  subCategories[]->{name, slug}
`

/** Fetch products using THE SAME 2-QUERY LOGIC as app/[category]/page.tsx (references + cat.products[]) */
async function fetchProductsForCatSlug(slugVariants: string[]) {
  const allProducts: ProductsCarouselProduct[] = []
  for (const slug of slugVariants) {
    try {
      /* 1) From Category -> products[] direction */
      const catResult = await client.fetch<{ products: ProductsCarouselProduct[] } | null>(
        `*[_type == "category" && slug.current == $slug][0]{
          products[]->{${productFragment}}
        }`, { slug }
      )
      if (catResult?.products) allProducts.push(...catResult.products)

      /* 2) From Product -> category references direction (REVERSE) */
      const refResult = await client.fetch<ProductsCarouselProduct[]>(
        `*[(_type in ["product","products"]) && references(*[_type == "category" && slug.current == $slug]._id)]{${productFragment}}`,
        { slug }
      )
      if (refResult) allProducts.push(...refResult)
    } catch { /* skip if variant doesn't exist */ }
  }
  return allProducts
}

async function getProducts(): Promise<ProductsCarouselProduct[]> {
  try {
    const seenIds = new Set<string>()
    const allProducts: ProductsCarouselProduct[] = []

    /* Fetch per canonical category — and tag with __matchedCat (SAME RELIABLE LOGIC AS CATEGORY PAGE) */
    for (const { key, slugVariants } of CANONICAL_SLUGS) {
      const raw = await fetchProductsForCatSlug(slugVariants)
      for (const p of raw) {
        if (!p || !p._id) continue
        if (seenIds.has(p._id)) continue
        seenIds.add(p._id)
        allProducts.push({ ...p, __matchedCat: key })
      }
    }

    /* Also fetch ALL products as safety net (for new/other products not covered above) */
    const net = await client.fetch<ProductsCarouselProduct[]>(
      `*[_type in ["product","products"]]{${productFragment}}`
    )
    for (const p of net || []) {
      if (!p || !p._id || seenIds.has(p._id)) continue
      seenIds.add(p._id)
      allProducts.push(p)
    }

    console.log(`[Home getProducts] Total = ${allProducts.length}. Per-key counts (server-side matched via Sanity refs):`)
    const byCat: Record<string, number> = {}
    for (const p of allProducts) {
      const k = (p as ProductsCarouselProduct).__matchedCat || "UNMATCHED"
      byCat[k] = (byCat[k] || 0) + 1
    }
    console.log(JSON.stringify(byCat, null, 2))
    return allProducts
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error("Failed to fetch products:", msg)
    return []
  }
}

export default async function Home() {
  const products = await getProducts()
  const functionalTrainingProducts = products.filter(
    (p) => p.__matchedCat === "functional-training"
  )

  return (
    <div className={styles.page}>
      <HeroCarousel />
      <TechnologySlider products={functionalTrainingProducts} />
      <CategoryShowcase />
      <ShapingFuture />
      <PerformanceWorld />
      <StoriesShowcase />
      <ProductsCarousel
        products={products}
        heading={{
          eyebrow: "Our Equipment Range",
          title: "Featured equipment across core categories",
          description: "Commercial-grade pieces spanning Rigs & Racks, Storage Systems, Functional Training, Barbells, and Benches — engineered for facilities that never compromise on durability or biomechanics.",
          moreLink: "/shop",
          moreText: "Browse All Products"
        }}
      />
      <BusinessFaq />
    </div>
  )
}

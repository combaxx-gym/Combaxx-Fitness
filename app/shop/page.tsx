import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { SanityImageSource } from '@sanity/image-url'
import CTA from '@/components/CTA'
import styles from '@/styles/pages/category.module.css'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Product {
  _id: string
  name?: string
  title?: string
  slug: { current: string }
  image: SanityImageSource
  description?: string
  category?: { name?: string; slug?: { current?: string } }
  categories?: Array<{ name?: string; slug?: { current?: string } }>
}

// ─── Data fetching ────────────────────────────────────────────────────────────
async function getProducts(searchQuery?: string): Promise<Product[]> {
  let query = '*[_type == "product"]'
  const params: Record<string, unknown> = {}
  
  if (searchQuery && searchQuery.trim().length >= 2) {
    const pattern = `*${searchQuery.toLowerCase()}*`
    query = `*[_type == "product" && (
      lower(name) match $pattern ||
      lower(coalesce(title, "")) match $pattern
    )] | order(_score desc)`
    params.pattern = pattern
  }
  
  const products = await client.fetch(
    `${query}{
      _id, name, title, slug, image, description,
      category->{name, slug},
      categories[]->{name, slug}
    }`,
    params
  )
  return products || []
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Shop All Gym Equipment',
  description: 'Explore our complete range of premium commercial gym equipment. Strength, cardio, benches, dumbbells, and more for professional fitness facilities.',
}

// ─── Static features ──────────────────────────────────────────────────────────
const WHY_FEATURES = [
  { num: '01', title: 'Commercial Grade', desc: 'Built to withstand the rigorous demands of professional fitness facilities worldwide.' },
  { num: '02', title: 'ISO Certified', desc: 'All products meet international quality and safety standards for commercial equipment.' },
  { num: '03', title: '5-Year Warranty', desc: 'Industry-leading warranty on frames, components, and structural elements.' },
  { num: '04', title: 'Expert Support', desc: 'Dedicated technical and after-sales support available for every product line.' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ShopPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const q = searchParams?.q as string | undefined
  const products = await getProducts(q)
  const title = q ? `Search Results for "${q}"` : 'Shop All Products'

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero} aria-label="All products">
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            {/* Breadcrumb */}
            <nav className={styles.heroBreadcrumb} aria-label="Breadcrumb">
              <Link href="/" className={styles.heroBreadLink}>Home</Link>
              <span className={styles.heroBreadSep}>/</span>
              <span>{title}</span>
            </nav>

            <span className={styles.heroBadge}>All Products</span>

            <h1 className={styles.heroTitle}>{title}</h1>
            <p className={styles.heroDesc}>
              Explore our complete range of premium commercial gym equipment, built for serious training and professional fitness facilities.
            </p>

            <div className={styles.heroStats}>
              <span className={styles.heroStat}>
                <span className={styles.heroStatDot} />
                {products.length} Product{products.length !== 1 ? 's' : ''}
              </span>
              <span className={styles.heroStat}>
                <span className={styles.heroStatDot} />
                Commercial Grade
              </span>
              <span className={styles.heroStat}>
                <span className={styles.heroStatDot} />
                Built to Last
              </span>
            </div>
          </div>

          <div className={styles.heroRight}>
            <a href="#products" className={styles.heroScrollBtn}>
              View Products ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className={styles.main}>
        {/* ── Products Grid ── */}
        <section id="products" className={styles.productsSection} aria-labelledby="products-heading">
          <div className={styles.sectionHead}>
            <span className={styles.sectionBadge}>{q ? 'Search Results' : 'Our Range'}</span>
            <h2 className={styles.sectionTitle} id="products-heading">{q ? `Results for "${q}"` : 'All Products'}</h2>
          </div>

          {products.length === 0 ? (
            <div className={styles.emptyState}>No products found.</div>
          ) : (
            <div className={styles.productGrid}>
              {products.map(p => {
                const name = p.name || p.title || 'Product'
                const catSlug = p.category?.slug?.current || p.categories?.[0]?.slug?.current || 'shop'
                const catName = p.category?.name || p.categories?.[0]?.name || 'Product'
                return (
                  <article key={p._id} className={styles.productCard}>
                    <Link href={`/${catSlug}/${p.slug.current}`} className={styles.productImageLink}>
                      <div className={styles.productImageWrap}>
                        <Image
                          src={urlFor(p.image).url()}
                          alt={name}
                          fill
                          className={styles.productImage}
                          sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          unoptimized
                        />
                      </div>
                    </Link>
                    <div className={styles.productCardFooter}>
                      <div className={styles.productCardTop}>
                        <div className={styles.productCardText}>
                          <p className={styles.productCardCategory}>{catName}</p>
                          <p className={styles.productCardName}>{name}</p>
                          {p.description && (
                            <p className={styles.productCardDesc}>{p.description}</p>
                          )}
                        </div>
                        <Link
                          href={`/${catSlug}/${p.slug.current}`}
                          className={styles.productCardArrow}
                          aria-label={`View ${name}`}
                         >
                          →
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>

        {/* ── Why section ── */}
        <section className={styles.whySection} aria-labelledby="why-heading">
          <div className={styles.sectionHead}>
            <span className={styles.sectionBadge}>Why Choose Us</span>
            <h2 className={styles.sectionTitle} id="why-heading">Built for Professionals</h2>
          </div>
          <div className={styles.whyGrid}>
            {WHY_FEATURES.map(f => (
              <div key={f.num} className={styles.whyCard}>
                <div className={styles.whyNumber}>{f.num}</div>
                <h3 className={styles.whyCardTitle}>{f.title}</h3>
                <p className={styles.whyCardDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <CTA 
          title="Ready to Equip Your Facility?"
          description="Contact our B2B team for bulk pricing, custom configurations, and professional installation services tailored to your gym or fitness center."
        />
      </div>
    </div>
  )
}

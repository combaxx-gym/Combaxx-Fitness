import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { SanityImageSource } from '@sanity/image-url'
import CategoryFaqAccordion from '@/components/CategoryFaqAccordion'
import CTA from '@/components/CTA'
import styles from '@/styles/pages/category.module.css'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Category {
  _id: string
  name: string
  slug: { current: string }
  image?: SanityImageSource
  heroImage?: SanityImageSource
  tagline?: string
  description?: string
  faqs?: Array<{ question: string; answer: string }>
}

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

async function getCategoryData(slug: string) {
  const [cat, products] = await Promise.all([
    client.fetch<Category | null>(
      `*[_type == "category" && slug.current == $slug][0]{
        _id, name, slug, image, heroImage, tagline, description,
        faqs[]{question, answer}
      }`,
      { slug }
    ),
    client.fetch<Product[]>(
      `*[_type == "product" && references(*[_type == "category" && slug.current == $slug]._id)]{
        _id, name, title, slug, image, description,
        category->{name, slug},
        categories[]->{name, slug}
      }`,
      { slug }
    ),
  ])
  return { cat, products: products || [] }
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(
  props: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const { category: slug } = await props.params
  const { cat } = await getCategoryData(slug)
  const name = cat?.name || slug.replace(/-/g, ' ')
  return {
    title: `${name} | Commercial Gym Equipment`,
    description: cat?.description?.slice(0, 160) ?? `Explore premium commercial ${name} for professional gyms and fitness facilities.`,
  }
}

// ─── Static features ──────────────────────────────────────────────────────────

const WHY_FEATURES = [
  { num: '01', title: 'Commercial Grade', desc: 'Built to withstand the rigorous demands of professional fitness facilities worldwide.' },
  { num: '02', title: 'ISO Certified', desc: 'All products meet international quality and safety standards for commercial equipment.' },
  { num: '03', title: '5-Year Warranty', desc: 'Industry-leading warranty on frames, components, and structural elements.' },
  { num: '04', title: 'Expert Support', desc: 'Dedicated technical and after-sales support available for every product line.' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
  const { category: slug } = await props.params
  const { cat, products } = await getCategoryData(slug)

  const title = cat?.name || slug.replace(/-/g, ' ')
  const heroImage = cat?.heroImage || cat?.image
  const faqs = cat?.faqs || []

  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero} aria-label={`${title} category`}>
        {heroImage && (
          <div className={styles.heroBg}>
            <Image
              src={urlFor(heroImage).width(1920).height(800).url()}
              alt={title}
              fill
              className={styles.heroBgImage}
              priority
              sizes="100vw"
              unoptimized
            />
          </div>
        )}

        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            {/* Breadcrumb */}
            <nav className={styles.heroBreadcrumb} aria-label="Breadcrumb">
              <Link href="/" className={styles.heroBreadLink}>Home</Link>
              <span className={styles.heroBreadSep}>/</span>
              <Link href="/shop" className={styles.heroBreadLink}>Products</Link>
              <span className={styles.heroBreadSep}>/</span>
              <span>{title}</span>
            </nav>

            <span className={styles.heroBadge}>Category</span>

            <h1 className={styles.heroTitle}>{title}</h1>

            {cat?.description && (
              <p className={styles.heroDesc}>{cat.description}</p>
            )}

            <div className={styles.heroStats}>
              <span className={styles.heroStat}>
                <span className={styles.heroStatDot} />
                {products.length} Product{products.length !== 1 ? 's' : ''}
              </span>
              {cat?.tagline && (
                <span className={styles.heroStat}>
                  <span className={styles.heroStatDot} />
                  {cat.tagline}
                </span>
              )}
              <span className={styles.heroStat}>
                <span className={styles.heroStatDot} />
                Commercial Grade
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
            <span className={styles.sectionBadge}>Our Range</span>
            <h2 className={styles.sectionTitle} id="products-heading">{title} Products</h2>
          </div>

          {products.length === 0 ? (
            <div className={styles.emptyState}>No products found in this category.</div>
          ) : (
            <div className={styles.productGrid}>
              {products.map(p => {
                const name = p.name || p.title || 'Product'
                const catSlug = p.category?.slug?.current || p.categories?.[0]?.slug?.current || slug
                const catName = p.category?.name || p.categories?.[0]?.name || title
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

        {/* ── FAQs (dynamic from Sanity) ── */}
        {faqs.length > 0 && (
          <section className={styles.faqSection} aria-labelledby="faq-heading">
            <div className={styles.sectionHead}>
              <span className={styles.sectionBadge}>Got Questions?</span>
              <h2 className={styles.sectionTitle} id="faq-heading">
                {title} — FAQs
              </h2>
            </div>
            <CategoryFaqAccordion faqs={faqs} />
          </section>
        )}

        {/* ── CTA Banner ── */}
        <CTA 
          title={`Ready to Equip Your ${title} Facility?`}
          description={`Contact our B2B team for bulk pricing, custom configurations, and professional installation services tailored to your gym or fitness center.`}
        />

      </div>
    </div>
  )
}

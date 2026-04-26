import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import Link from "next/link"
import type { SanityImageSource } from "@sanity/image-url"
import { redirect } from "next/navigation"
import styles from "@/styles/pages/shop.module.css"

type Cat = { _id: string; name?: string; slug?: { current?: string } }
type Product = {
  _id: string
  name?: string
  title?: string
  slug: { current: string }
  image: SanityImageSource
  description?: string
  category?: { name?: string; slug?: { current?: string } }
  categories?: Array<{ name?: string; slug?: { current?: string } }>
}

async function getCategories(): Promise<Cat[]> {
  const cats = await client.fetch(
    `*[_type=="category"]|order(name asc){_id,name,slug}`
  )
  return cats as Cat[]
}

async function getProductsByCategory(slug?: string): Promise<Product[]> {
  if (!slug) {
    const all = await client.fetch(
      `*[_type=="product"]{
        _id,
        name, title, slug, image, description,
        category->{name,slug},
        categories[]->{name,slug}
      }`
    )
    return all as Product[]
  }
  const products = await client.fetch(
    `*[_type=="product" && references(*[_type=="category" && slug.current==$slug]._id)]{
      _id,
      name, title, slug, image, description,
      category->{name,slug},
      categories[]->{name,slug}
    }`,
    { slug }
  )
  return products as Product[]
}

export default async function ShopPage({ searchParams }: { searchParams?: Promise<{ category?: string }> }) {
  const sp = (await (searchParams || Promise.resolve({}))) as { category?: string }
  const selected = sp.category
  if (selected) {
    redirect(`/${selected}`)
  }
  const [categories, products] = await Promise.all([
    getCategories(),
    getProductsByCategory(undefined),
  ])

  const title = "Shop"

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>{title}</h1>
        <p className={styles.pageDesc}>
          Explore all of our latest gym equipment and product collections.
        </p>

        <div className={styles.filterBar}>
          <Link
            href="/shop"
            className={`${styles.filterChip} ${!selected ? styles.filterChipActive : ""}`}
          >
            All
          </Link>
          {categories.map(c => (
            <Link
              key={c._id}
              href={`/${c.slug?.current}`}
              className={styles.filterChip}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {products.length === 0 ? (
          <div className={styles.emptyState}>No products found.</div>
        ) : (
          <div className={styles.productGrid}>
            {products.map(p => {
              const catSlug = p.category?.slug?.current || p.categories?.[0]?.slug?.current || "shop"
              return (
                <div key={p._id} className={styles.productCard}>
                  <Link href={`/${catSlug}/${p.slug.current}`} className={styles.productCardLink}>
                    <div className={styles.productImageWrap}>
                      <Image
                        src={urlFor(p.image).width(1200).height(900).url()}
                        alt={p.name || p.title || "Product"}
                        fill
                        className={styles.productImage}
                        unoptimized
                      />
                    </div>
                  </Link>
                  <div className={styles.productCardFooter}>
                    <div>
                      <p className={styles.productCardCategory}>
                        {p.category?.name || p.categories?.[0]?.name || "Product"}
                      </p>
                      <p className={styles.productCardName}>{p.name || p.title}</p>
                    </div>
                    <Link
                      href={`/${catSlug}/${p.slug.current}`}
                      className={styles.productCardArrow}
                      aria-label="View product"
                    >
                      <span>›</span>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

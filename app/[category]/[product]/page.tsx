import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import { redirect, notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { SanityImageSource } from '@sanity/image-url'

import ProductImageGallery from '@/components/ProductImageGallery'
import ProductHeroInfo from '@/components/ProductHeroInfo'
import StickyActionBar from '@/components/StickyActionBar'
import ProductFeatures from '@/components/ProductFeatures'
import ProductSpecifications from '@/components/ProductSpecifications'
import TrustBadges from '@/components/TrustBadges'
import InstallationWarranty from '@/components/InstallationWarranty'
import ProductAddons from '@/components/ProductAddons'
import ProductFaqs from '@/components/ProductFaqs'
import ProductDownloads from '@/components/ProductDownloads'
import InquiryForm from '@/components/InquiryForm'
import RelatedProductsSlider from '@/components/RelatedProductsSlider'

import styles from '@/styles/pages/product.module.css'

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */

interface SpecItem { key: string; value: string }
interface SpecCategory { category: string; items: SpecItem[] }

interface Product {
  _id: string
  name: string
  slug: { current: string }
  sku?: string
  image: SanityImageSource
  description?: string
  gallery?: SanityImageSource[]
  model3D?: { asset?: { url?: string } }
  features?: string[]
  productFeatures?: Array<{ title: string; description: string; icon?: string }>
  specifications?: SpecCategory[]
  specs?: SpecItem[]
  addons?: Array<{ name: string; description?: string; image?: SanityImageSource }>
  downloads?: Array<{ name: string; file?: { asset?: { url?: string } }; fileType?: string }>
  installation?: string
  warranty?: string
  category?: { name?: string; slug?: { current?: string } }
  categories?: Array<{ name?: string; slug?: { current?: string } }>
  specsPdf?: { asset?: { url?: string } }
  faqs?: Array<{ question: string; answer: string }>
  additionalSections?: Array<{ title: string; content: string }>
}

interface RelatedProduct {
  _id: string
  name: string
  slug: { current: string }
  image?: SanityImageSource
  category?: { slug?: { current?: string } }
  categories?: Array<{ slug?: { current?: string } }>
}

/* ─────────────────────────────────────────
   Data fetching
───────────────────────────────────────── */

const PRODUCT_FIELDS = `
  _id,
  "name": coalesce(name, title),
  slug,
  sku,
  image,
  description,
  gallery[]{..., asset->},
  model3D{asset->{url}},
  features[],
  productFeatures[]{title, description, icon},
  specifications[]{category, items[]{key, value}},
  specs[]{key, value},
  addons[]{name, description, image{..., asset->}},
  downloads[]{name, file{asset->{url}}, fileType},
  installation,
  warranty,
  category->{name, slug},
  categories[]->{name, slug},
  specsPdf{asset->{url}},
  faqs[]{question, answer},
  additionalSections[]{title, content}
`

async function getProduct(ref: string): Promise<Product | null> {
  const types = ['product', 'products']

  type Minimal = { _id: string; slug?: { current?: string }; name?: string; title?: string }
  const minimal: Minimal[] = await client.fetch(`*[_type in $types]{ _id, slug, name, title }`, { types })

  const normalize = (s?: string) =>
    (s || '').toLowerCase().trim()
      .replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-')
      .replace(/-+/g, '-').replace(/(^-|-$)/g, '')

  const target = normalize(ref)
  const hit = minimal.find(m => {
    return normalize(m.slug?.current) === target ||
      normalize(m.name) === target ||
      normalize(m.title) === target
  })

  if (hit) {
    return await client.fetch(`*[_id == $id][0]{ ${PRODUCT_FIELDS} }`, { id: hit._id })
  }

  const refLower = ref.toLowerCase()
  return await client.fetch(
    `*[_type in $types && (
      slug.current == $ref ||
      lower(slug.current) == $refLower ||
      lower(name) == $refLower ||
      lower(title) == $refLower ||
      _id == $ref
    )][0]{ ${PRODUCT_FIELDS} }`,
    { ref, refLower, types }
  )
}

async function getRelatedProducts(currentId: string, categorySlug?: string): Promise<RelatedProduct[]> {
  const params: Record<string, string> = { currentId }
  let filter = `_type == "product" && _id != $currentId`
  if (categorySlug) {
    filter += ` && (category->slug.current == $categorySlug || categories[]->slug.current match $categorySlug)`
    params.categorySlug = categorySlug
  }
  return await client.fetch(
    `*[${filter}] | order(_createdAt desc) [0...8]{
      _id, "name": coalesce(name, title), slug, image,
      category->{slug}, categories[]->{slug}
    }`,
    params
  )
}

/* ─────────────────────────────────────────
   Metadata
───────────────────────────────────────── */

export async function generateMetadata(props: { params: Promise<{ category: string; product: string }> }): Promise<Metadata> {
  const { product: prodSlug } = await props.params
  const product = await getProduct(prodSlug)
  if (!product) return { title: 'Product Not Found' }

  const imageUrl = product.image ? urlFor(product.image).width(1200).height(630).url() : undefined

  return {
    title: `${product.name} | Commercial Gym Equipment`,
    description: product.description?.slice(0, 160) ?? `Premium commercial ${product.name} for gyms and fitness facilities.`,
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 160),
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
    },
  }
}

/* ─────────────────────────────────────────
   Page Component
───────────────────────────────────────── */

export default async function ProductPage(
  props: { params: Promise<{ category: string; product: string }> }
) {
  const { category, product: prodSlug } = await props.params
  const product = await getProduct(prodSlug)
  if (!product) notFound()

  const primaryCatSlug =
    product.category?.slug?.current ||
    product.categories?.[0]?.slug?.current ||
    null

  if (primaryCatSlug && primaryCatSlug !== category) {
    redirect(`/${primaryCatSlug}/${product.slug.current}`)
  }

  const categoryName = product.category?.name || product.categories?.[0]?.name
  const relatedProducts = await getRelatedProducts(product._id, primaryCatSlug || undefined)

  const model3DUrl = product.model3D?.asset?.url
  const specsPdfUrl = product.specsPdf?.asset?.url

  const hasFeatureCards = Array.isArray(product.productFeatures) && product.productFeatures.length > 0
  const hasSpecs = (Array.isArray(product.specifications) && product.specifications.length > 0) ||
    (Array.isArray(product.specs) && product.specs.length > 0)
  const hasAddons = Array.isArray(product.addons) && product.addons.length > 0
  const hasFaqs = Array.isArray(product.faqs) && product.faqs.length > 0
  const hasDownloads = (Array.isArray(product.downloads) && product.downloads.length > 0) || !!specsPdfUrl
  const hasAdditional = Array.isArray(product.additionalSections) && product.additionalSections.length > 0

  return (
    <>
      {/* Sticky Action Bar — client component, observes scroll */}
      {/* <StickyActionBar
        productId={product._id}
        productName={product.name}
        productSku={product.sku}
        productSlug={product.slug.current}
      /> */}

      <main className={styles.page}>
        <div className={styles.container}>

          {/* ── Breadcrumb ── */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <Link href="/shop" className={styles.breadcrumbLink}>Products</Link>
            {primaryCatSlug && (
              <>
                <span className={styles.breadcrumbSep}>/</span>
                <Link href={`/${primaryCatSlug}`} className={styles.breadcrumbLink}>
                  {categoryName || 'Category'}
                </Link>
              </>
            )}
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{product.name}</span>
          </nav>

          {/* ── Hero Section ── */}
          <section className={styles.heroGrid} aria-label="Product overview">
            {/* Gallery */}
            <ProductImageGallery
              name={product.name}
              mainImage={product.image}
              gallery={product.gallery || []}
              model3DUrl={model3DUrl}
            />

            {/* Info panel */}
            <ProductHeroInfo
              productId={product._id}
              productName={product.name}
              productSku={product.sku}
              productSlug={product.slug.current}
              categoryName={categoryName}
              description={product.description}
              features={product.features || []}
              specsPdfUrl={specsPdfUrl}
            />
          </section>

          {/* ── Detailed Feature Cards ── */}
          {hasFeatureCards && (
            <ProductFeatures features={product.productFeatures!} />
          )}

          {/* ── Specifications ── */}
          {hasSpecs && (
            <ProductSpecifications
              specifications={product.specifications}
              flatSpecs={product.specs}
            />
          )}

          {/* ── Trust Badges ── */}
          <TrustBadges />

          {/* ── Installation & Warranty ── */}
          <InstallationWarranty
            installation={product.installation}
            warranty={product.warranty}
          />

          {/* ── Add-ons ── */}
          {hasAddons && <ProductAddons addons={product.addons!} />}

          {/* ── FAQs ── */}
          {hasFaqs && <ProductFaqs faqs={product.faqs!} />}

          {/* ── Downloads ── */}
          {hasDownloads && (
            <ProductDownloads
              downloads={product.downloads}
              specsPdfUrl={specsPdfUrl}
            />
          )}

          {/* ── Additional CMS Sections ── */}
          {hasAdditional && (
            <div className={styles.additionalSections}>
              {product.additionalSections!.map((sec, i) => (
                <div key={i} className={styles.additionalSection}>
                  <h2 className={styles.sectionTitle}>{sec.title}</h2>
                  <p className={styles.sectionContent}>{sec.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* ── Inquiry Form ── */}
          <InquiryForm
            productId={product._id}
            productName={product.name}
            productSku={product.sku}
            productSlug={product.slug.current}
          />

          {/* ── Related Products ── */}
          {relatedProducts.length > 0 && (
            <RelatedProductsSlider
              products={relatedProducts}
              categorySlug={primaryCatSlug || undefined}
            />
          )}

        </div>
      </main>
    </>
  )
}

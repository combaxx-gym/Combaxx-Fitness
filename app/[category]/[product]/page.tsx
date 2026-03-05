import { client } from "@/sanity/lib/client"
import Link from "next/link"
import { redirect, notFound } from "next/navigation"
import QuoteForm from "@/components/QuoteForm"
import type { SanityImageSource } from "@sanity/image-url"
import ProductGallery from "@/components/ProductGallery"

interface Product {
  _id: string
  name: string
  slug: { current: string }
  image: SanityImageSource
  description: string
  price?: number
  gallery?: SanityImageSource[]
  features?: string[]
  specs?: Array<{ key: string; value: string }>
  category?: { name?: string; slug?: { current?: string } }
  categories?: Array<{ name?: string; slug?: { current?: string } }>
}

async function getProduct(ref?: string): Promise<Product | null> {
  if (!ref) return null
  const types = ["product", "products"]

  type Minimal = { _id: string; slug?: { current?: string }; name?: string; title?: string }
  const minimal: Minimal[] = await client.fetch(
    `*[_type in $types]{ _id, slug, name, title }`,
    { types }
  )
  const normalize = (s?: string) =>
    (s || "")
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/(^-|-$)/g, "")
  const target = normalize(ref)
  const hit = minimal.find(m => {
    const slugN = normalize(m.slug?.current)
    const nameN = normalize(m.name)
    const titleN = normalize(m.title)
    return slugN === target || nameN === target || titleN === target
  })
  if (hit) {
    const byId = await client.fetch(
      `*[_id == $id][0]{
        _id,
        "name": coalesce(name, title),
        slug, image, description, price,
        gallery[]{asset->},
        features[],
        specs[]{key, value},
        category->{name, slug},
        categories[]->{name, slug}
      }`,
      { id: hit._id }
    )
    if (byId) return byId
  }

  const refLower = ref.toLowerCase()
  const refLike = `*${refLower}*`
  const altLower = refLower.replace(/-/g, " ")
  const altLike = `*${altLower}*`
  const query = `*[_type in $types && (
      slug.current == $ref ||
      lower(slug.current) == $refLower ||
      lower(slug.current) match $refLike ||
      lower(name) == $refLower ||
      lower(name) match $refLike ||
      lower(name) == $altLower ||
      lower(name) match $altLike ||
      lower(title) == $refLower ||
      lower(title) match $refLike ||
      lower(title) == $altLower ||
      lower(title) match $altLike ||
      _id == $ref
    )][0]{
      _id,
      "name": coalesce(name, title),
      slug, image, description, price,
      gallery[]{asset->},
      features[],
      specs[]{key, value},
      category->{name, slug},
      categories[]->{name, slug}
    }`
  const params = { ref, refLower, refLike, altLower, altLike, types }
  const published = await client.fetch(query, params)
  if (published) return published
  return null
}

export default async function CategoryProductPage(props: { params: Promise<{ category: string; product: string }> }) {
  const { category, product: prodSlug } = await props.params
  const product = await getProduct(prodSlug)
  if (!product) {
    notFound()
  }
  const primaryCatSlug =
    product.category?.slug?.current ||
    product.categories?.[0]?.slug?.current ||
    null
  if (primaryCatSlug && primaryCatSlug !== category) {
    redirect(`/${primaryCatSlug}/${product.slug.current}`)
  }

  return (
    <div className="min-h-screen bg-[#161616] text-white pt-28 md:pt-32">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 py-10 md:py-16">
        <div className="mb-8 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gray-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-white">Products</Link>
          {primaryCatSlug && (
            <>
              <span>/</span>
              <Link href={`/${primaryCatSlug}`} className="hover:text-white">
                {product.category?.name || product.categories?.[0]?.name || "Category"}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <ProductGallery name={product.name} mainImage={product.image} gallery={product.gallery || []} />
          </div>

          <div className="lg:col-span-5">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#FF3333]">
              {product.category?.name || product.categories?.[0]?.name || "Product"}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-[50px] font-bold uppercase tracking-tight">{product.name}</h1>
            {product.price != null && (
              <div className="mt-3 text-2xl font-semibold text-white/90">${product.price.toLocaleString()}</div>
            )}
            <p className="mt-6 text-gray-300 leading-relaxed">{product.description}</p>

            {Array.isArray(product.features) && product.features.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-gray-400">Key Features</h2>
                <ul className="grid grid-cols-1 gap-2">
                  {product.features.slice(0, 8).map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-200">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#FF3333]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {Array.isArray(product.specs) && product.specs.length > 0 && (
              <div className="mt-10">
                <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-gray-400">Specifications</h2>
                <dl className="grid grid-cols-1 gap-2">
                  {product.specs.map((s, i) => (
                    <div key={i} className="flex items-center justify-between gap-6 border-b border-white/10 py-3">
                      <dt className="text-xs uppercase tracking-[0.25em] text-gray-400">{s.key}</dt>
                      <dd className="text-sm text-gray-200">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className="mt-10">
              <QuoteForm productName={product.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

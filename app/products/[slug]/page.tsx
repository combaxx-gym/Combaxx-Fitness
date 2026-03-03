import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import Link from "next/link"
import QuoteForm from "@/components/QuoteForm"
import type { SanityImageSource } from "@sanity/image-url"

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
}

async function getProduct(ref?: string): Promise<Product | null> {
  if (!ref) return null
  const refLower = ref.toLowerCase()
  const types = ["product", "products"]
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
      _id == $ref
    )][0]{
    _id, name, slug, image, description, price,
    gallery[]{asset->},
    features[],
    specs[]{key, value},
    category->{name, slug}
  }`
  const params = { ref, refLower, refLike, altLower, altLike, types }
  const published = await client.fetch(query, params)
  if (published) return published
  const previewClient = client.withConfig({ perspective: "previewDrafts" })
  return await previewClient.fetch(query, params)
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)
  if (!product) {
    return (
      <div className="min-h-screen bg-[#161616] text-white">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-20">
          <h1 className="text-[50px] font-bold">Product not found</h1>
          <p className="text-gray-400 mt-4">The requested product does not exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#161616] text-white">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 py-10 md:py-16">
        <div className="mb-8 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gray-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-white">Products</Link>
          {product.category?.slug?.current && (
            <>
              <span>/</span>
              <Link href={`/shop?category=${product.category.slug.current}`} className="hover:text-white">
                {product.category?.name || "Category"}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="relative w-full overflow-hidden rounded-3xl bg-[#111111] aspect-[4/3]">
              <Image
                src={urlFor(product.image).width(1600).height(1200).url()}
                alt={product.name}
                fill
                className="object-contain p-6 md:p-10"
              />
            </div>
            {Array.isArray(product.gallery) && product.gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                {product.gallery.slice(0, 6).map((img, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-xl bg-[#111111]">
                    <Image
                      src={urlFor(img).width(600).height(600).url()}
                      alt={`${product.name}-${i + 1}`}
                      fill
                      className="object-contain p-3"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#FF3333]">
              {product.category?.name || "Product"}
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
              <div className="mt-8">
                <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-gray-400">Specifications</h2>
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <table className="w-full text-sm">
                    <tbody>
                      {product.specs.slice(0, 12).map((s, i) => (
                        <tr key={i} className="border-b border-white/10 odd:bg-white/[0.02]">
                          <td className="p-3 text-gray-400">{s.key}</td>
                          <td className="p-3 text-white">{s.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="mt-10 rounded-2xl border border-white/10 bg-black/40 p-6">
              <h2 className="text-xl font-bold uppercase tracking-widest mb-4">Request a Quote</h2>
              <QuoteForm productName={product.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

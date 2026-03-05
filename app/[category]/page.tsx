import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import Link from "next/link"
import type { SanityImageSource } from "@sanity/image-url"

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

async function getCategory(slug: string): Promise<Cat | null> {
  return await client.fetch(
    `*[_type=="category" && slug.current==$slug][0]{_id,name,slug}`,
    { slug }
  )
}

async function getProductsByCategory(slug: string): Promise<Product[]> {
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

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const [cat, products] = await Promise.all([
    getCategory(category),
    getProductsByCategory(category),
  ])
  const title = cat?.name || category.replace(/-/g, " ")

  return (
    <div className="min-h-screen pt-28 md:pt-32 px-6 md:px-12 bg-neutral-900 text-white">
      <div className="max-w-[1920px] mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#FF3333]">{title}</h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Explore {title} products.
        </p>

        {products.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p._id} className="group relative rounded-3xl bg-[#E0E0DA] text-black overflow-hidden">
                <Link href={`/${category}/${p.slug.current}`} className="block">
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={urlFor(p.image).width(1200).height(900).url()}
                      alt={p.name || p.title || "Product"}
                      fill
                      className="object-contain p-6"
                    />
                  </div>
                </Link>
                <div className="absolute inset-x-6 bottom-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
                      {p.category?.name || p.categories?.[0]?.name || "Product"}
                    </p>
                    <p className="text-sm font-bold uppercase tracking-[0.12em]">
                      {p.name || p.title}
                    </p>
                  </div>
                  <Link
                    href={`/${category}/${p.slug.current}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-black/30 bg-white/70 text_black hover:border-[#FF3333] hover:text-[#FF3333] transition-colors"
                    aria-label="View product"
                  >
                    <span className="text-lg leading-none">›</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

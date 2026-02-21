import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import QuoteForm from "@/components/QuoteForm"
import type { SanityImageSource } from "@sanity/image-url"

interface Product {
  _id: string
  name: string
  slug: { current: string }
  image: SanityImageSource
  description: string
}

async function getProduct(ref?: string): Promise<Product | null> {
  if (!ref) return null
  const query = `*[_type == "product" && (slug.current == $ref || _id == $ref)][0]{
    _id, name, slug, image, description
  }`
  return await client.fetch(query, { ref })
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
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <div className="relative w-full overflow-hidden rounded-3xl bg-[#111111] aspect-[4/3]">
            <Image
              src={urlFor(product.image).width(1600).height(1200).url()}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="lg:col-span-5">
          <h1 className="text-[50px] font-bold uppercase tracking-tight">{product.name}</h1>
          <p className="mt-6 text-gray-300">{product.description}</p>

          <div className="mt-10 rounded-2xl border border-white/10 bg-black/40 p-6">
            <h2 className="text-xl font-bold uppercase tracking-widest mb-4">Request a Quote</h2>
            <QuoteForm productName={product.name} />
          </div>
        </div>
      </div>
    </div>
  )
}

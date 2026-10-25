import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImageSource } from '@sanity/image-url'
import { getZubairSession } from '@/lib/zubairAuth'
import ZubairLogin from '@/components/zubair/ZubairLogin'
import ZubairDashboard from '@/components/zubair/ZubairDashboard'

export const metadata: Metadata = {
  title: 'Price Dashboard | Combaxx',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

type DashProduct = {
  _id: string
  name: string
  sku?: string
  price?: number | null
  slug?: string
  image?: SanityImageSource | null
  categories?: Array<{ name?: string; slug?: string } | null> | null
  primaryCategory?: string | null
}

async function getProducts(): Promise<DashProduct[]> {
  try {
    return await client.fetch(
      `*[_type == "product" && defined(slug.current)] | order(name asc) {
        _id,
        name,
        sku,
        price,
        "slug": slug.current,
        image,
        "categories": categories[]->{ name, "slug": slug.current },
        "primaryCategory": coalesce(categories[0]->slug.current, "shop")
      }`
    )
  } catch (err) {
    console.error('[Zubair] products fetch failed:', err)
    return []
  }
}

export default async function ZubairPage() {
  const session = await getZubairSession()

  if (!session) {
    return <ZubairLogin />
  }

  const products = await getProducts()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || ''

  const rows = products.map(p => {
    const catSlug = p.primaryCategory || p.categories?.[0]?.slug || 'shop'
    const path = `/${catSlug}/${p.slug}`
    const absolute = siteUrl ? `${siteUrl}${path}` : path
    return {
      _id: p._id,
      name: p.name || 'Untitled',
      sku: p.sku || '',
      price: typeof p.price === 'number' ? p.price : null,
      imageUrl: p.image ? urlFor(p.image).width(120).height(120).url() : '',
      categories: (p.categories || []).map(c => c?.name).filter(Boolean).join(', ') || '—',
      path,
      url: absolute,
    }
  })

  return <ZubairDashboard email={session.email} products={rows} />
}

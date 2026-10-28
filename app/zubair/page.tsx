import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImageSource } from '@sanity/image-url'
import { getZubairSession } from '@/lib/zubairAuth'
import ZubairLogin from '@/components/zubair/ZubairLogin'
import ZubairDashboard from '@/components/zubair/ZubairDashboard'

const isSeriesCategory = (name?: string | null) =>
  Boolean(name && /series/i.test(name))

export const metadata: Metadata = {
  title: 'Price Dashboard | Combaxx',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

type CatRef = { name?: string; slug?: string } | null

type DashProduct = {
  _id: string
  name: string
  sku?: string
  price?: number | null
  slug?: string
  image?: SanityImageSource | null
  categories?: CatRef[] | null
  /** Categories that list this product in category.products[] */
  linkedCategories?: CatRef[] | null
  primaryCategory?: string | null
}

type SanityCategory = { name?: string; slug?: string }

function mergeCategoryNames(...groups: Array<CatRef[] | null | undefined>) {
  const seen = new Set<string>()
  const names: string[] = []
  for (const group of groups) {
    for (const c of group || []) {
      const name = c?.name?.trim()
      if (!name || seen.has(name)) continue
      seen.add(name)
      names.push(name)
    }
  }
  return names
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
        "linkedCategories": *[_type == "category" && references(^._id)]{ name, "slug": slug.current },
        "primaryCategory": coalesce(categories[0]->slug.current, "shop")
      }`
    )
  } catch (err) {
    console.error('[Zubair] products fetch failed:', err)
    return []
  }
}

/** All Sanity categories: name has "series" → Series, otherwise → Category (your 7). */
async function getCategoryLists(): Promise<{ series: string[]; categories: string[] }> {
  try {
    const cats = await client.fetch<SanityCategory[]>(
      `*[_type == "category" && defined(name)] | order(name asc) { name, "slug": slug.current }`
    )
    const series: string[] = []
    const categories: string[] = []
    for (const c of cats || []) {
      const name = c?.name?.trim()
      if (!name) continue
      if (isSeriesCategory(name)) series.push(name)
      else categories.push(name)
    }
    return { series, categories }
  } catch (err) {
    console.error('[Zubair] categories fetch failed:', err)
    return { series: [], categories: [] }
  }
}

export default async function ZubairPage() {
  const session = await getZubairSession()

  if (!session) {
    return <ZubairLogin />
  }

  const [products, lists] = await Promise.all([getProducts(), getCategoryLists()])
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || ''

  const rows = products.map(p => {
    const catSlug = p.primaryCategory || p.categories?.[0]?.slug || 'shop'
    const path = `/${catSlug}/${p.slug}`
    const absolute = siteUrl ? `${siteUrl}${path}` : path
    // Series usually on product.categories[]; the 7 type categories often only on category.products[]
    const names = mergeCategoryNames(p.categories, p.linkedCategories)
    const seriesNames = names.filter(isSeriesCategory)
    const categoryNames = names.filter(n => !isSeriesCategory(n))
    return {
      _id: p._id,
      name: p.name || 'Untitled',
      sku: p.sku || '',
      price: typeof p.price === 'number' ? p.price : null,
      imageUrl: p.image ? urlFor(p.image).width(120).height(120).url() : '',
      series: seriesNames.join(', ') || '—',
      categories: categoryNames.join(', ') || '—',
      path,
      url: absolute,
    }
  })

  return (
    <ZubairDashboard
      email={session.email}
      products={rows}
      seriesOptions={lists.series}
      categoryOptions={lists.categories}
    />
  )
}

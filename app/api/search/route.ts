import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get('q')?.trim() || ''
    if (q.length < 2) {
      return NextResponse.json([])
    }

    const pattern = `*${q.toLowerCase()}*`
    const results = await client.fetch(
      `*[_type == "product" && defined(slug.current) && (
        name match $pattern ||
        coalesce(title, "") match $pattern ||
        lower(coalesce(name, title, "")) match $pattern
      )][0...8]{
        _id,
        "name": coalesce(name, title, "Product"),
        slug,
        image,
        category->{name, slug},
        categories[]->{name, slug}
      }`,
      { pattern }
    )

    return NextResponse.json(Array.isArray(results) ? results : [])
  } catch (err) {
    console.error('[api/search]', err)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}

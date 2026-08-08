import type { PortableTextBlock } from 'next-sanity'

export type SanityImage = {
  _type?: 'image'
  asset?: {
    _ref: string
    _type: 'reference'
  }
  [key: string]: unknown
}

export interface BlogPostArchive {
  _id: string
  title: string
  slug: { current: string }
  category: string
  tags?: string[]
  author?: string
  authorRole?: string
  date?: string
  readingTime?: number
  excerpt?: string
  featured?: boolean
  coverImage: SanityImage
}

export interface BlogPostDetail extends BlogPostArchive {
  authorPhoto?: SanityImage
  content?: PortableTextBlock[]
  seoTitle?: string
  seoDescription?: string
}

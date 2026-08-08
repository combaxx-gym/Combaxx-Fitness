export type SanityImage = {
  _type?: 'image'
  asset?: {
    _ref: string
    _type: 'reference'
  }
  [key: string]: unknown
}

export interface StoryHeroStat {
  value: string
  label: string
}

export interface StoryTestimonial {
  personName?: string
  personTitle?: string
  personPhoto?: SanityImage
  quote?: string
  signatureImage?: SanityImage
  stat?: {
    value: string
    label: string
  }
}

export interface StoryProductItem {
  image: SanityImage
  imageAlt?: string
  productName?: string
  productDescription?: string
  size?: 'small' | 'large'
}

export interface StoryArchiveItem {
  _id: string
  title: string
  slug: { current: string }
  category: 'Athletes' | 'Facilities' | 'Innovation' | 'Lifestyle' | 'Community'
  tag?: string
  date?: string
  excerpt?: string
  featured?: boolean
  featuredImage: SanityImage
}

export interface StoryDetail extends StoryArchiveItem {
  intro?: string
  clientLogo?: SanityImage
  heroStats?: StoryHeroStat[]
  testimonial?: StoryTestimonial
  showcaseHeading?: string
  showcaseSubheading?: string
  productGallery?: StoryProductItem[]
  seoTitle?: string
  seoDescription?: string
}

import type { Metadata } from 'next'
import Link from 'next/link'
import CTA from '@/components/CTA'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import type { StoryDetail, StoryHeroStat, StoryProductItem } from '@/types/story'
import styles from '@/styles/pages/story.module.css'

const STORY_FIELDS = `
  _id,
  title,
  slug,
  category,
  tag,
  date,
  excerpt,
  intro,
  featuredImage,
  clientLogo,
  heroStats,
  testimonial,
  showcaseHeading,
  showcaseSubheading,
  productGallery,
  seoTitle,
  seoDescription
`

async function getStory(slug: string): Promise<StoryDetail | null> {
  try {
    const result = await client.fetch(
      `*[_type == "story" && slug.current == $slug][0]{ ${STORY_FIELDS} }`,
      { slug }
    )
    return (result as StoryDetail) || null
  } catch (e) {
    console.error(`[story detail] getStory failed for slug=${slug}:`, e)
    return null
  }
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const slugs: { slug?: string }[] = await client.fetch(
      `*[_type == "story" && defined(slug.current)]{ "slug": slug.current }`
    )
    return (slugs || [])
      .filter(s => typeof s?.slug === 'string' && s.slug.length > 0)
      .map(s => ({ slug: s.slug as string }))
  } catch (e) {
    console.error('[story detail] generateStaticParams failed:', e)
    return []
  }
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  try {
    const { slug } = await props.params
    const story = await getStory(slug)
    if (!story) {
      return { title: 'Story Not Found | Combaxx Fitness' }
    }
    const title = story.seoTitle || `${story.title} | Stories | Combaxx Fitness`
    const desc = story.seoDescription || story.excerpt ||
      'Read the case study — real facilities, real athletes, real equipment transformation stories by Combaxx Fitness.'
    const ogImage = story.featuredImage
      ? urlFor(story.featuredImage).width(1200).height(630).quality(85).url()
      : undefined
    return {
      title,
      description: desc,
      openGraph: {
        title,
        description: desc,
        type: 'article',
        ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: story.title }] } : {}),
        publishedTime: story.date ? new Date(story.date).toISOString() : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description: desc,
        ...(ogImage ? { images: [ogImage] } : {}),
      },
      alternates: { canonical: `/stories/${slug}` },
    }
  } catch (e) {
    console.error('[story detail] generateMetadata failed:', e)
    return { title: 'Story | Combaxx Fitness' }
  }
}

const img = (source?: unknown) =>
  source ? urlFor(source) : null

export default async function StoryDetailPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const story = await getStory(slug)

  if (!story) {
    return (
      <div className={styles.page}>
        <div className={styles.backBar}>
          <div className={styles.container}>
            <Link href="/stories" className={styles.backLink}>← Back to Stories</Link>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.notFoundWrap}>
            <h1 className={styles.notFoundTitle}>Story Not Found</h1>
            <p className={styles.notFoundText}>The story you are looking for does not exist or has been removed.</p>
            <Link href="/stories" className={styles.notFoundBtn}>Go to Stories</Link>
          </div>
        </div>
      </div>
    )
  }

  const featuredImageUrl = img(story.featuredImage)
    ?.width(2000)
    .quality(82)
    .url()
  const clientLogoUrl = img(story.clientLogo)
    ?.width(200)
    .height(200)
    .quality(85)
    .url()
  const personPhotoUrl = img(story.testimonial?.personPhoto)
    ?.width(900)
    .quality(82)
    .url()
  const signatureUrl = img(story.testimonial?.signatureImage)
    ?.width(400)
    .height(120)
    .quality(90)
    .url()

  // Format date as "Month YYYY" (e.g. March 2025)
  const formatDate = (d?: string) => {
    if (!d) return null
    const date = new Date(d)
    if (Number.isNaN(date.getTime())) return d
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const heroStats: StoryHeroStat[] = (story.heroStats || []).filter(s => s?.value && s?.label)

  const products: StoryProductItem[] = (story.productGallery || []).filter(p => p?.image)

  const showcaseHeading = story.showcaseHeading || 'Explore the range of products'
  const showcaseSubheading = story.showcaseSubheading ||
    `Discover how we helped ${story.title.split(' ').slice(-1)[0] || 'the client'} build a premium training facility with customised COMBAXX equipment.`

  return (
    <div className={styles.page}>
      {/* ======= 1. HERO ======= */}
      <section className={styles.hero} aria-label="Story hero">
        <div className={styles.heroBg}>
          {featuredImageUrl && (
            <img src={featuredImageUrl} alt="" aria-hidden="true" className={styles.heroBgImg} />
          )}
          <div className={styles.heroBgOverlay} />
          <div className={styles.heroGrid} />
        </div>

        {/* Hero floating stat cards */}
        {heroStats.length > 0 && (
          <div className={styles.heroStats} aria-hidden="false">
            {heroStats.map((s, i) => (
              <div key={i} className={styles.heroStatCard}>
                <div className={styles.heroStatValue}>{s.value}</div>
                <div className={styles.heroStatLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className={styles.container}>
          <div className={styles.heroInner}>
            <Link href="/stories" className={styles.heroBreadcrumb}>
              Stories <span className={styles.heroBreadcrumbSep}>/</span>
              <span style={{ color: 'rgba(255,255,255,0.55)' }}>{story.category}</span>
            </Link>

            <div className={styles.heroMetaRow}>
              {story.tag && <span className={styles.heroTag}>{story.tag}</span>}
              <span className={styles.heroCategory}>{story.category}</span>
              {formatDate(story.date) && <span className={styles.heroDate}>{formatDate(story.date)}</span>}
            </div>

            <h1 className={styles.heroTitle}>{story.title}</h1>
            {story.intro && <p className={styles.heroIntro}>{story.intro}</p>}
          </div>
        </div>
      </section>

      {/* ======= 2. TESTIMONIAL ======= */}
      <section className={styles.testimonialSection} aria-label="Story testimonial">
        <div className={styles.container}>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialCornerGlow} />

            <div className={styles.testimonialTopRow}>
              <div className={styles.clientLogo}>
                {clientLogoUrl ? (
                  <img src={clientLogoUrl} alt="" className={styles.clientLogoImg} />
                ) : (
                  <div className={styles.clientLogoPlaceholder}>
                    {story.title.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()}
                  </div>
                )}
                <span className={styles.clientLogoText}>
                  {story.title.split(' ').slice(0, 2).join(' ')}
                </span>
              </div>
            </div>

            <div className={styles.testimonialBody}>
              {/* Person photo */}
              <div className={styles.personPhotoWrap}>
                {personPhotoUrl ? (
                  <img src={personPhotoUrl} alt={story.testimonial?.personName || 'Client photo'} className={styles.personPhoto} />
                ) : (
                  <div className={styles.personPhotoPlaceholder} />
                )}
              </div>

              {/* Text + quote + signature */}
              <div className={styles.testimonialTextWrap}>
                {story.testimonial?.personName && (
                  <h2 className={styles.personName}>{story.testimonial.personName}</h2>
                )}
                {story.testimonial?.personTitle && (
                  <div className={styles.personTitle}>{story.testimonial.personTitle}</div>
                )}
                {story.testimonial?.quote && (
                  <p className={styles.quote}>{story.testimonial.quote}</p>
                )}
                {signatureUrl ? (
                  <img src={signatureUrl} alt="" className={styles.signature} />
                ) : (
                  <span className={styles.signaturePlaceholder}>{story.testimonial?.personName || story.title.split(' ')[0]}</span>
                )}
              </div>

              {/* Side stat card */}
              {story.testimonial?.stat?.value && (
                <div className={styles.sideStat} aria-label="Side stat">
                  <div className={styles.sideStatValue}>{story.testimonial.stat.value}</div>
                  <div className={styles.sideStatLabel}>{story.testimonial.stat.label}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ======= 3. PRODUCT SHOWCASE BENTO GRID ======= */}
      {products.length > 0 && (
        <section className={styles.showcaseSection} aria-label="Product showcase">
          <div className={styles.container}>
            <div className={styles.showcaseHead}>
              <span className={styles.showcaseBadge}>Project Showcase</span>
              <h2 className={styles.showcaseTitle}>{showcaseHeading}</h2>
              <p className={styles.showcaseSubheading}>{showcaseSubheading}</p>
            </div>

            <div className={styles.bentoGrid}>
              {products.map((item, i) => {
                const imgUrl = img(item.image)?.width(900).quality(82).url()
                if (!imgUrl) return null
                const isLarge = item.size === 'large' || (i === products.length - 1 && products.length === 4)
                return (
                  <div
                    key={i}
                    className={`${styles.bentoCard} ${isLarge ? styles.bentoCardLarge : ''}`}
                  >
                    <img
                      src={imgUrl}
                      alt={item.imageAlt || item.productName || 'Project product photo'}
                      className={styles.bentoImage}
                    />
                    <div className={styles.bentoOverlay} />
                    <div className={styles.bentoContent}>
                      {item.productName && <h3 className={styles.bentoProductName}>{item.productName}</h3>}
                      {item.productDescription && (
                        <p className={styles.bentoProductDesc}>{item.productDescription}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ======= 4. CTA ======= */}
      <section className={styles.ctaSection}>
        <CTA
          badge="Build Yours"
          title={`Ready to Build Your ${story.category === 'Facilities' ? 'Facility' : 'Project'}?`}
          description="Talk to our B2B team about bulk pricing, custom branding, layout planning, and professional installation for your gym or facility."
          primaryButtonText="Request a Quote"
          primaryButtonLink="/contact"
          secondaryButtonText="Browse Products"
          secondaryButtonLink="/shop"
        />
      </section>
    </div>
  )
}

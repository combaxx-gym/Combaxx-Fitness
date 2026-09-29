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
  location,
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

const imgUrl = (source?: unknown) =>
  source ? urlFor(source).ignoreImageParams().url() : undefined

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
      'Real gym setups by Combaxx Fitness — commercial equipment, installation, and facility stories.'
    const ogImage = imgUrl(story.featuredImage)
    return {
      title,
      description: desc,
      openGraph: {
        title,
        description: desc,
        type: 'article',
        ...(ogImage ? { images: [{ url: ogImage, alt: story.title }] } : {}),
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

const DEMO_STATS: StoryHeroStat[] = [
  { value: '150+', label: 'Active members' },
  { value: '76k', label: 'Followers' },
  { value: '250+', label: 'Active members' },
]

const DEMO_GALLERY = [
  { src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80', alt: 'Power rack floor', name: 'Power racks' },
  { src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80', alt: 'Free weight zone', name: 'Free weights' },
  { src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900&q=80', alt: 'Cable machines', name: 'Cable systems' },
  { src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=900&q=80', alt: 'Training floor', name: 'Floor layout' },
  { src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80', alt: 'Bench press area', name: 'Benches' },
  { src: 'https://images.unsplash.com/photo-1599058945522-28d884b0e550?w=900&q=80', alt: 'Functional zone', name: 'Functional training' },
]

export default async function StoryDetailPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const story = await getStory(slug)

  if (!story) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.notFoundWrap}>
            <p className={styles.eyebrow}>Stories</p>
            <h1 className={styles.notFoundTitle}>Story not found</h1>
            <p className={styles.notFoundText}>
              This gym story doesn&apos;t exist or was removed.
            </p>
            <Link href="/stories" className={styles.notFoundBtn}>Back to Stories</Link>
          </div>
        </div>
      </div>
    )
  }

  const featuredImageUrl = imgUrl(story.featuredImage)
  const clientLogoUrl = imgUrl(story.clientLogo)
  const personPhotoUrl = imgUrl(story.testimonial?.personPhoto)
  const signatureUrl = imgUrl(story.testimonial?.signatureImage)

  const heroStats: StoryHeroStat[] =
    (story.heroStats || []).filter(s => s?.value && s?.label).length > 0
      ? (story.heroStats || []).filter(s => s?.value && s?.label)
      : DEMO_STATS

  const products: StoryProductItem[] = (story.productGallery || []).filter(p => p?.image)

  const showcaseHeading = story.showcaseHeading || 'Installed equipment'
  const showcaseSubheading =
    story.showcaseSubheading ||
    `Machines and systems Combaxx installed at ${story.title}.`

  const intro =
    story.intro ||
    `Combaxx planned, supplied, and installed a complete commercial strength floor for ${story.title} — built for daily high-volume training.`

  const personName = story.testimonial?.personName || 'Facility Partner'
  const personTitle = story.testimonial?.personTitle || `Founder — ${story.title}`
  const quote =
    story.testimonial?.quote ||
    `Working with Combaxx changed how we open floors. The layout, the steel quality, and the install team meant we launched on schedule with equipment our members trust every day. This partnership is why ${story.title} feels like a serious training space — not a showroom of compromises.`

  return (
    <div className={styles.page}>
      {/* ── HERO (glass stats overlay) ── */}
      <section className={styles.hero} aria-label={`${story.title} banner`}>
        <div className={styles.heroMedia}>
          {featuredImageUrl ? (
            <img src={featuredImageUrl} alt="" className={styles.heroImg} aria-hidden />
          ) : (
            <div className={styles.heroFallback} />
          )}
          <div className={styles.heroShade} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.container}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/" className={styles.breadcrumbLink}>Home</Link>
              <span className={styles.breadcrumbSep}>/</span>
              <Link href="/stories" className={styles.breadcrumbLink}>Stories</Link>
              <span className={styles.breadcrumbSep}>/</span>
              <span className={styles.breadcrumbCurrent}>{story.title}</span>
            </nav>

            <div className={styles.heroLayout}>
              <div className={styles.heroLeft}>
                <h1 className={styles.heroTitle}>{story.title}</h1>
                <p className={styles.heroIntro}>{intro}</p>

                {heroStats.length > 0 && (
                  <div className={styles.heroStatsSmall} aria-label="Project metrics">
                    {heroStats.slice(0, 2).map((s, i) => (
                      <div key={i} className={styles.glassCard}>
                        <span className={styles.glassValue}>{s.value}</span>
                        <span className={styles.glassLabel}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {heroStats[2] && (
                <div className={styles.heroRight}>
                  <div className={`${styles.glassCard} ${styles.glassCardLarge}`}>
                    <span className={styles.glassValue}>{heroStats[2].value}</span>
                    <span className={styles.glassLabel}>{heroStats[2].label}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section className={styles.founderSection} aria-label="Founder story">
        <div className={styles.container}>
          {(clientLogoUrl || story.title) && (
            <div className={styles.logoRow}>
              {clientLogoUrl ? (
                <img src={clientLogoUrl} alt="" className={styles.clientLogo} />
              ) : (
                <span className={styles.logoMark}>
                  {story.title.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()}
                </span>
              )}
            </div>
          )}

          <div className={styles.founderGrid}>
            <div className={styles.founderVisual}>
              {personPhotoUrl ? (
                <img
                  src={personPhotoUrl}
                  alt={personName}
                  className={styles.founderPhoto}
                />
              ) : (
                <div className={styles.founderPhotoPlaceholder} aria-hidden />
              )}
            </div>

            <div className={styles.founderCopy}>
              <h2 className={styles.founderName}>{personName}</h2>
              <p className={styles.founderRole}>{personTitle}</p>
              <p className={styles.founderQuote}>{quote}</p>

              <div className={styles.founderFooter}>
                {signatureUrl ? (
                  <img src={signatureUrl} alt="" className={styles.signature} />
                ) : (
                  <span className={styles.signatureText}>{personName}</span>
                )}

                {(story.testimonial?.stat?.value || heroStats[0]) && (
                  <div className={`${styles.glassCard} ${styles.founderStat}`}>
                    <span className={styles.glassValue}>
                      {story.testimonial?.stat?.value || heroStats[0].value}
                    </span>
                    <span className={styles.glassLabel}>
                      {story.testimonial?.stat?.label || heroStats[0].label}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EQUIPMENT GALLERY ── */}
      <section className={styles.gallerySection} aria-label="Installed equipment">
        <div className={styles.container}>
          <div className={styles.galleryHead}>
            <p className={styles.sectionEyebrow}>On the floor</p>
            <h2 className={styles.galleryTitle}>{showcaseHeading}</h2>
            <p className={styles.gallerySub}>{showcaseSubheading}</p>
          </div>

          {products.length > 0 ? (
            <div className={styles.galleryGrid}>
              {products.map((item, i) => {
                const src = imgUrl(item.image)
                if (!src) return null
                return (
                  <figure key={i} className={styles.galleryItem}>
                    <div className={styles.galleryFrame}>
                      <img
                        src={src}
                        alt={item.imageAlt || item.productName || 'Installed equipment'}
                        className={styles.galleryImg}
                        loading="lazy"
                      />
                    </div>
                    {item.productName && (
                      <figcaption className={styles.galleryCaption}>{item.productName}</figcaption>
                    )}
                  </figure>
                )
              })}
            </div>
          ) : (
            <div className={styles.galleryGrid}>
              {DEMO_GALLERY.map((item, i) => (
                <figure key={i} className={styles.galleryItem}>
                  <div className={styles.galleryFrame}>
                    <img src={item.src} alt={item.alt} className={styles.galleryImg} loading="lazy" />
                  </div>
                  <figcaption className={styles.galleryCaption}>{item.name}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTA
        badge="Build Yours"
        title="Ready to equip your facility?"
        description="Talk to our B2B team about layout planning, bulk pricing, and professional installation — the same process we used for this gym."
        primaryButtonText="Request a Quote"
        primaryButtonLink="/contact"
        secondaryButtonText="Browse Products"
        secondaryButtonLink="/shop"
      />
    </div>
  )
}

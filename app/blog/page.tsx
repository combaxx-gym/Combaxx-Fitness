import type { Metadata } from 'next'
import Link from 'next/link'
import BlogGrid from '@/components/BlogGrid'
import CTA from '@/components/CTA'
import styles from '@/styles/pages/blog.module.css'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import type { BlogPostArchive } from '@/types/blog'

export const metadata: Metadata = {
  title: 'Blog | Latest News, Tips & Industry Insights',
  description: 'Latest stories, product news, gym design guides, maintenance tips, and industry insights from the Combaxx Fitness editorial team.',
}

export const BLOG_CATEGORIES = [
  'All',
  'News',
  'Tips & Guides',
  'Industry Insights',
  'Product Updates',
  'Events',
  'Company',
]

const POST_ARCHIVE_FIELDS = `
  _id,
  title,
  slug,
  category,
  tags,
  author,
  authorRole,
  date,
  readingTime,
  excerpt,
  featured,
  coverImage
`

async function getPosts(): Promise<BlogPostArchive[]> {
  try {
    return await client.fetch(
      `*[_type == "post"] | order(featured desc, date desc, _createdAt desc){
        ${POST_ARCHIVE_FIELDS}
      }`
    )
  } catch (e) {
    console.error('[blog] getPosts failed:', e)
    return []
  }
}

function formatDate(d?: string) {
  if (!d) return ''
  const date = new Date(d)
  if (Number.isNaN(date.getTime())) return d
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default async function BlogPage() {
  const posts = await getPosts()
  const hasPosts = posts.length > 0
  const featured = posts.find(p => p.featured) || posts[0] || null
  const rest = featured ? posts.filter(p => p._id !== featured._id) : []

  // Prepare grid items with resolved image URLs server-side (so client comp doesn't need sanity import)
  let gridItems = rest.map(p => ({
    id: p._id,
    slug: p.slug.current,
    category: p.category,
    title: p.title,
    excerpt: p.excerpt || '',
    author: p.author || 'Combaxx Team',
    authorRole: p.authorRole || 'Editorial',
    date: formatDate(p.date),
    readingTime: p.readingTime || 5,
    imageUrl: p.coverImage ? urlFor(p.coverImage).width(900).quality(82).url() : null,
    isPlaceholder: false,
  }))

  // If 0 Sanity posts → create 6 skeleton placeholders so page structure looks alive
  if (!hasPosts) {
    const PLACEHOLDER_CATS = ['Tips & Guides', 'Industry Insights', 'News', 'Product Updates', 'Company', 'Events']
    gridItems = PLACEHOLDER_CATS.map((cat, i) => ({
      id: `placeholder-${i}`,
      slug: '',
      category: cat,
      title: '',
      excerpt: '',
      author: '',
      authorRole: '',
      date: '',
      readingTime: 5,
      imageUrl: null,
      isPlaceholder: true,
    }))
  }

  return (
    <div className={styles.page}>
      {/* ===== MAIN SITE-WIDE CANONICAL CONTAINER — ALL SECTIONS LIVE INSIDE THIS ONE CONTAINER ===== */}
      <div className={styles.container}>

        {/* ===== HERO ===== */}
        <section className={styles.hero} aria-label="Blog hero">
          <div className={styles.heroBg}>
            <div className={styles.heroOverlay} />
            <div className={styles.heroPattern} />
          </div>
          <div className={styles.heroInner}>
            <div className={styles.heroBadgeRow}>
              <span className={styles.heroBadge}>Combaxx Blog</span>
              <span className={styles.heroBadgeSub}>Latest Stories &amp; News</span>
            </div>
            <h1 className={styles.heroTitle}>
              Latest <span className={styles.heroTitleRed}>Stories &amp;</span><br />News
            </h1>
            <p className={styles.heroDesc}>
              Gym design guides, equipment maintenance tips, industry trends, product announcements, and real-world insights from our commercial fitness experts.
            </p>
          </div>
        </section>

        {/* ===== FEATURED POST ===== */}
        <section className={styles.featuredSection}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionHeadText}>
              <span className={styles.sectionBadge}>Featured Article</span>
              <h2>Editor&rsquo;s Pick</h2>
            </div>
          </div>
          {featured ? (
            <Link href={`/blog/${featured.slug.current}`} className={styles.featuredLink} aria-label={`Read ${featured.title}`}>
              <article className={styles.featuredCard}>
                <div className={styles.featuredImageWrap}>
                  {featured.coverImage && (
                    <img src={urlFor(featured.coverImage).width(1600).quality(85).url()} alt="" />
                  )}
                  <div className={styles.featuredImgOverlay} />
                </div>
                <div className={styles.featuredBody}>
                  <div className={styles.featuredLabel}>
                    <span className={styles.featuredTag}>Featured</span>
                    <span className={styles.featuredCat}>{featured.category}</span>
                  </div>
                  <h3 className={styles.featuredTitle}>{featured.title}</h3>
                  <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                  <div className={styles.featuredMeta}>
                    <div className={styles.featuredAuth}>
                      <strong>{featured.author || 'Combaxx Team'}</strong>
                      <span>·</span>
                      <span>{formatDate(featured.date) || 'Recently'}</span>
                      <span>·</span>
                      <span>{featured.readingTime || 5} min read</span>
                    </div>
                    <span className={styles.readMore}>Read Article</span>
                  </div>
                </div>
              </article>
            </Link>
          ) : (
            <article className={styles.featuredCard} style={{ cursor: 'default' }}>
              <div className={styles.featuredImageWrap}>
                <div className={`${styles.skeleton} ${styles.skeletonImage}`} />
                <div className={styles.featuredImgOverlay} />
                <div className={styles.featPlaceholderInfo}>
                  <span className={styles.featPlaceholderBadge}>Featured Coming Soon</span>
                  <h3 className={styles.skeletonTitle} style={{ marginBottom: '1rem', maxWidth: '620px' }} />
                  <div className={styles.skeletonText} style={{ maxWidth: 620, margin: '0 auto 0.5rem' }} />
                  <div className={`${styles.skeletonText} ${styles.skeletonTextHalf}`} style={{ maxWidth: 420, margin: '0 auto' }} />
                  <p className={styles.featPlaceholderHint}>
                    💡 Mark any blog post as <strong>&ldquo;Featured Post (Hero Card)&rdquo;</strong> in Sanity Studio to pin it here.
                    Go to <strong>/studio → Blog / News Articles</strong>.
                  </p>
                </div>
              </div>
              <div className={styles.featuredBody}>
                <div className={styles.featuredLabel}>
                  <div className={`${styles.skeleton} ${styles.skeletonBadgeSm}`} style={{ width: 88 }} />
                  <div className={`${styles.skeleton} ${styles.skeletonBadgeSm}`} style={{ width: 110 }} />
                </div>
                <div className={`${styles.skeleton} ${styles.skeletonTitle}`} style={{ height: '2.5rem', marginBottom: '1rem' }} />
                <div className={styles.skeletonText} />
                <div className={styles.skeletonText} />
                <div className={`${styles.skeletonText} ${styles.skeletonText70}`} style={{ marginBottom: '2.5rem' }} />
                <div className={styles.featuredMeta}>
                  <div className={`${styles.skeleton}`} style={{ width: 230, height: 16, margin: 0 }} />
                  <div className={`${styles.skeleton}`} style={{ width: 100, height: 16, margin: 0 }} />
                </div>
              </div>
            </article>
          )}
        </section>

        {/* ===== GRID + FILTERS ===== */}
        <section className={styles.gridSection}>
          <BlogGrid
            posts={gridItems}
            categories={BLOG_CATEGORIES}
            showPlaceholderHint={!hasPosts}
            sectionHead={
              <div className={styles.sectionHead}>
                <div className={styles.sectionHeadText}>
                  <span className={styles.sectionBadge}>All Articles</span>
                  <h2>Browse the Archive</h2>
                </div>
              </div>
            }
          />
        </section>

        {/* ===== CTA ===== */}
        <section className={styles.ctaSection}>
          <CTA
            badge="Stay Updated"
            title="Building Your Next Facility?"
            description="Subscribe to our blog for the latest gym design guides, equipment maintenance tips, and bulk pricing updates from Combaxx Fitness."
            primaryButtonText="Get in Touch"
            primaryButtonLink="/contact"
            secondaryButtonText="Browse Equipment"
            secondaryButtonLink="/shop"
          />
        </section>

      </div>
      {/* ===== END MAIN CANONICAL CONTAINER ===== */}
    </div>
  )
}

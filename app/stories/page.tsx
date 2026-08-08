import type { Metadata } from 'next'
import Link from 'next/link'
import StoriesGrid from '@/components/StoriesGrid'
import StoriesQuoteSlider from '@/components/StoriesQuoteSlider'
import CTA from '@/components/CTA'
import styles from '@/styles/pages/stories.module.css'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import type { StoryArchiveItem } from '@/types/story'

export const metadata: Metadata = {
  title: 'Stories | Commercial Gym Equipment',
  description: 'Real stories from the facilities, athletes, and communities we equip. Inspiring transformations, world-class builds, and the people behind them.',
}

export const STORY_CATEGORIES = ['All', 'Athletes', 'Facilities', 'Innovation', 'Lifestyle', 'Community']

const PULL_QUOTES = [
  {
    text: "The machines arrived on time, the installation was flawless, and our members noticed the difference immediately. This is what a serious supplier looks like.",
    author: "James R.",
    role: "CEO, Apex Fitness Group",
    location: "Lahore, Pakistan",
  },
  {
    text: "I've trained in gyms all over the world. The equipment in this facility matches anything in Dubai or London. I was genuinely surprised.",
    author: "Mia Chen",
    role: "Professional Sprinter",
    location: "Karachi, Pakistan",
  },
  {
    text: "For a hotel gym, quality matters enormously. Guests judge your property by the fitness room. We made the right investment.",
    author: "Marco L.",
    role: "General Manager, The Meridian",
    location: "Islamabad, Pakistan",
  },
]

async function getStories(): Promise<StoryArchiveItem[]> {
  try {
    return await client.fetch(
      `*[_type == "story"] | order(featured desc, date desc, _createdAt desc){
        _id,
        title,
        slug,
        category,
        tag,
        date,
        excerpt,
        featured,
        featuredImage
      }`
    )
  } catch (e) {
    console.error('[stories] Failed to fetch stories from Sanity:', e)
    return []
  }
}

export default async function StoriesPage() {
  const allStories = await getStories()
  const hasStories = allStories.length > 0
  const featured = allStories.find(s => s.featured) || allStories[0] || null
  const rest = featured ? allStories.filter(s => s._id !== featured._id) : []

  const featuredImgSrc = featured?.featuredImage ? urlFor(featured.featuredImage).width(1600).quality(80).url() : null
  const heroImgSrc = featuredImgSrc

  // Format grid-compatible items already in JSX rendered server side with image URLs so client component doesn't need Sanity import
  let gridItems = rest.map((s, idx) => {
    const size = idx % 5 === 0 ? 'large' : 'normal'
    const accent = s.category === 'Facilities' || s.category === 'Community' ? '#FF3333' : s.category === 'Innovation' ? '#ffffff' : '#9ca3af'
    return {
      id: s._id,
      slug: s.slug.current,
      category: s.category,
      tag: s.tag || s.category,
      title: s.title,
      excerpt: s.excerpt || '',
      author: 'Combaxx Team',
      role: 'Editorial',
      date: s.date || '2025',
      readTime: '5 min read',
      featured: false,
      size,
      accent,
      imageUrl: s.featuredImage ? urlFor(s.featuredImage).width(900).quality(80).url() : null,
      isPlaceholder: false,
    }
  })

  // If 0 Sanity stories → show skeleton placeholders (same as blog page pattern)
  if (!hasStories) {
    const PLACEHOLDER_CATS: StoryArchiveItem['category'][] = ['Facilities', 'Athletes', 'Innovation', 'Lifestyle', 'Community', 'Facilities']
    gridItems = PLACEHOLDER_CATS.map((cat, i) => ({
      id: `placeholder-story-${i}`,
      slug: '',
      category: cat,
      tag: cat,
      title: '',
      excerpt: '',
      author: '',
      role: '',
      date: '',
      readTime: '',
      featured: false,
      size: (i === 0 || i === 5) ? 'large' : 'normal',
      accent: (cat === 'Facilities' || cat === 'Community') ? '#FF3333' : '#9ca3af',
      imageUrl: null,
      isPlaceholder: true,
    })) as typeof gridItems
  }

  return (
    <div className={styles.page}>
      {/* ===== MAIN SITE-WIDE CANONICAL CONTAINER — ALL SECTIONS LIVE INSIDE THIS ONE CONTAINER ===== */}
      <div className={styles.container}>

        {/* ── HERO ── ONLY TEXT (no featured card) → min-height 100vh, push content to bottom */}
        <section className={styles.hero}>
          <div className={styles.heroBg}>
            {heroImgSrc && (
              <img src={heroImgSrc} alt="" aria-hidden="true" className={styles.heroBgImage} />
            )}
            <div className={styles.heroPattern} />
            <div className={styles.heroOverlay} />
          </div>
          <div className={styles.heroInner}>
            <div className={styles.heroMeta}>
              <span className={styles.heroBadge}>Stories</span>
              <span className={styles.heroFeaturedLabel}>Featured Story</span>
            </div>
            <h1 className={styles.heroTitle}>The People &amp;<br />Places We Equip</h1>
            <p className={styles.heroDesc}>
              Real projects. Real athletes. Real transformation. These are the stories behind the equipment.
            </p>
          </div>
        </section>

        {/* ── FEATURED STORY — SEPARATE SECTION BELOW HERO ── */}
        <section className={styles.featuredSection}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionHeadText}>
              <span className={styles.sectionBadge}>Featured Story</span>
              <h2 className={styles.sectionTitle}>Editor&rsquo;s Showcase</h2>
            </div>
          </div>
          {featured ? (
            <Link href={`/stories/${featured.slug.current}`} className={styles.featuredCard} aria-label={`Read ${featured.title}`}>
              {featuredImgSrc && (
                <div className={styles.featuredCardImage}>
                  <img src={featuredImgSrc} alt="" aria-hidden="true" />
                </div>
              )}
              <div className={styles.featuredCardBg} />
              <div className={styles.featuredCardInner}>
                <div className={styles.featuredCardMeta}>
                  <span className={styles.featuredTag}>{featured.tag || 'Case Study'}</span>
                  <span className={styles.featuredCategory}>{featured.category}</span>
                  {featured.date && <span className={styles.featuredDate}>{featured.date}</span>}
                </div>
                <h2 className={styles.featuredTitle}>{featured.title}</h2>
                <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                <div className={styles.featuredFooter}>
                  <div className={styles.featuredAuthor}>
                    <div className={styles.featuredAvatar}>C</div>
                    <div>
                      <div className={styles.featuredAuthorName}>Combaxx Editorial</div>
                      <div className={styles.featuredAuthorRole}>Stories Team</div>
                    </div>
                  </div>
                  <span className={styles.featuredReadBtn}>
                    Read Story →
                  </span>
                </div>
              </div>
            </Link>
          ) : (
            <article className={styles.featuredCard} style={{ cursor: 'default' }}>
              <div className={styles.featuredCardImage}>
                <div className={`${styles.skeleton} ${styles.skeletonImage}`} />
                <div className={styles.featPlaceholderInfo}>
                  <span className={styles.featPlaceholderBadge}>Featured Coming Soon</span>
                  <h3 className={styles.skeletonTitle} style={{ marginBottom: '1rem', maxWidth: '620px' }} />
                  <div className={styles.skeletonText} style={{ maxWidth: 620, margin: '0 auto 0.5rem' }} />
                  <div className={`${styles.skeletonText} ${styles.skeletonTextHalf}`} style={{ maxWidth: 420, margin: '0 auto' }} />
                  <p className={styles.featPlaceholderHint}>
                    💡 Mark any story as <strong>&ldquo;Featured&rdquo;</strong> in Sanity Studio to pin it here.
                    Go to <strong>/studio → Stories / Case Studies</strong>.
                  </p>
                </div>
              </div>
              <div className={styles.featuredCardBg} />
              <div className={styles.featuredCardInner}>
                <div className={styles.featuredCardMeta}>
                  <div className={`${styles.skeleton} ${styles.skeletonBadgeSm}`} style={{ width: 88 }} />
                  <div className={`${styles.skeleton} ${styles.skeletonBadgeSm}`} style={{ width: 110 }} />
                  <div className={`${styles.skeleton} ${styles.skeletonBadgeSm}`} style={{ width: 80, marginLeft: 'auto' }} />
                </div>
                <div className={`${styles.skeleton} ${styles.skeletonTitle}`} style={{ height: '2.5rem', marginBottom: '1rem' }} />
                <div className={styles.skeletonText} />
                <div className={styles.skeletonText} />
                <div className={`${styles.skeletonText} ${styles.skeletonText70}`} style={{ marginBottom: '2.5rem' }} />
                <div className={styles.featuredFooter}>
                  <div className={styles.featuredAuthor} style={{ opacity: 0.5 }}>
                    <div className={styles.featuredAvatar}>C</div>
                    <div>
                      <div className={`${styles.skeleton}`} style={{ width: 130, height: 14, margin: '2px 0 4px' }} />
                      <div className={`${styles.skeleton}`} style={{ width: 90, height: 12, opacity: 0.6 }} />
                    </div>
                  </div>
                  <div className={`${styles.skeleton}`} style={{ width: 110, height: 32, borderRadius: 3 }} />
                </div>
              </div>
            </article>
          )}
        </section>

        {/* ── STORIES GRID with filter ── */}
        <section className={styles.gridSection}>
          <StoriesGrid
            stories={gridItems}
            categories={STORY_CATEGORIES}
            sectionHead={
              <div className={styles.sectionHead}>
                <div className={styles.sectionHeadText}>
                  <span className={styles.sectionBadge}>All Stories</span>
                  <h2 className={styles.sectionTitle}>Explore the Archive</h2>
                </div>
                {!hasStories && (
                  <p className={styles.gridPlaceholderHint}>
                    ✍️ No stories published yet — head to <strong>/studio → Stories / Case Studies</strong> to upload your first case study.
                  </p>
                )}
              </div>
            }
          />
        </section>

        {/* ── PULL QUOTE SLIDER ── */}
        <section className={styles.quotesSection}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionBadge}>In Their Words</span>
            <h2 className={styles.sectionTitle}>Voices from the Floor</h2>
          </div>
          <StoriesQuoteSlider quotes={PULL_QUOTES} />
        </section>

        {/* ── NUMBERS ── */}
        <section className={styles.numbersSection}>
          <div className={styles.numbersGrid}>
            <div className={styles.numberItem}>
              <span className={styles.numberValue}>200+</span>
              <span className={styles.numberLabel}>Facilities Documented</span>
            </div>
            <div className={styles.numberItem}>
              <span className={styles.numberValue}>50+</span>
              <span className={styles.numberLabel}>Countries Featured</span>
            </div>
            <div className={styles.numberItem}>
              <span className={styles.numberValue}>1000+</span>
              <span className={styles.numberLabel}>Athletes Profiled</span>
            </div>
            <div className={styles.numberItem}>
              <span className={styles.numberValue}>12yr</span>
              <span className={styles.numberLabel}>Of Publishing Stories</span>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className={styles.ctaSection}>
          <CTA
            badge="Share Your Story"
            title="Is Your Facility Ready for Its Story?"
            description="If you've built something exceptional with our equipment, we want to document it. Reach out and let's tell your story."
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

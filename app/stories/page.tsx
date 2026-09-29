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

const imgUrl = (source?: unknown) =>
  source ? urlFor(source).ignoreImageParams().url() : null

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
  const heroStory = allStories.find(s => s.featured) || allStories[0] || null
  const heroImgSrc = heroStory?.featuredImage ? imgUrl(heroStory.featuredImage) : null

  // Format grid-compatible items already in JSX rendered server side with image URLs so client component doesn't need Sanity import
  let gridItems = allStories.map((s, idx) => {
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
      imageUrl: s.featuredImage ? imgUrl(s.featuredImage) : null,
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

      {/* ═══════ HERO — OUTSIDE container (full viewport bleed) ═══════ */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          {heroImgSrc && (
            <img src={heroImgSrc} alt="" aria-hidden="true" className={styles.heroBgImage} />
          )}
          <div className={styles.heroPattern} />
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroInner}>
          <nav className={styles.heroBreadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.heroBreadcrumbLink}>Home</Link>
            <span className={styles.heroBreadcrumbSep}>/</span>
            <span className={styles.heroBreadcrumbSep}>Stories</span>
          </nav>

          <h1 className={styles.heroTitle}>
            The People &amp;<br />
            <span className={styles.heroTitleAccent}>Places</span> We Equip
          </h1>

          <p className={styles.heroDesc}>
            Real projects. Real athletes. Real transformation. From boutique studios to
            five-star hotel gyms and professional training facilities — these are the
            stories behind the equipment.
          </p>

        </div>
      </section>

      {/* ===== MAIN SITE-WIDE CANONICAL CONTAINER — REST OF SECTIONS LIVE INSIDE ===== */}
      <div className={styles.container}>
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
            {/* <div className={styles.numberItem}>
              <span className={styles.numberValue}>12yr</span>
              <span className={styles.numberLabel}>Of Publishing Stories</span>
            </div> */}
          </div>
        </section>
      </div>
      {/* ── CTA ── */}
          <CTA
            badge="Share Your Story"
            title="Is Your Facility Ready for Its Story?"
            description="If you've built something exceptional with our equipment, we want to document it. Reach out and let's tell your story."
            primaryButtonText="Get in Touch"
            primaryButtonLink="/contact"
            secondaryButtonText="Browse Equipment"
            secondaryButtonLink="/shop"
          />
      {/* ===== END MAIN CANONICAL CONTAINER ===== */}
    </div>
  )
}

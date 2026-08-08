import type { Metadata } from 'next'
import Link from 'next/link'
import StoriesGrid from '@/components/StoriesGrid'
import StoriesQuoteSlider from '@/components/StoriesQuoteSlider'
import styles from '@/styles/pages/stories.module.css'

export const metadata: Metadata = {
  title: 'Stories | Commercial Gym Equipment',
  description: 'Real stories from the facilities, athletes, and communities we equip. Inspiring transformations, world-class builds, and the people behind them.',
}

export const STORY_CATEGORIES = ['All', 'Athletes', 'Facilities', 'Innovation', 'Lifestyle', 'Community']

export const STORIES = [
  {
    id: '1',
    slug: '#',
    category: 'Facilities',
    tag: 'Case Study',
    title: 'How Apex Fitness Built a 3,000 sqm Flagship',
    excerpt: 'Starting from an empty warehouse, Apex Fitness partnered with us for a complete turnkey fit-out — equipment, layout, branding, and beyond.',
    author: 'James R.',
    role: 'CEO, Apex Fitness',
    date: 'March 2025',
    readTime: '6 min read',
    featured: true,
    size: 'hero',
    accent: '#FF3333',
  },
  {
    id: '2',
    slug: '#',
    category: 'Athletes',
    tag: 'Profile',
    title: 'Training Like a Pro: Inside the Equipment Room',
    excerpt: 'Elite sprinter Mia Chen reveals the machines that drive her 5am sessions and how commercial-grade equipment changed her training.',
    author: 'Mia Chen',
    role: 'Professional Athlete',
    date: 'February 2025',
    readTime: '4 min read',
    featured: false,
    size: 'large',
    accent: '#ffffff',
  },
  {
    id: '3',
    slug: '#',
    category: 'Innovation',
    tag: 'Technology',
    title: 'The Engineering Behind 500,000-Cycle Testing',
    excerpt: 'Our QA lab runs every machine through half a million movement cycles before it ships. Here&apos;s what we found.',
    author: 'Engineering Team',
    role: 'R&D Division',
    date: 'January 2025',
    readTime: '8 min read',
    featured: false,
    size: 'normal',
    accent: '#FF3333',
  },
  {
    id: '4',
    slug: '#',
    category: 'Lifestyle',
    tag: 'Wellness',
    title: 'Recovery Is Performance — Build Your Zone',
    excerpt: 'The most overlooked section in any gym. Recovery zones are now the fastest-growing segment in commercial fitness.',
    author: 'Dr. Sara K.',
    role: 'Sports Physiotherapist',
    date: 'January 2025',
    readTime: '5 min read',
    featured: false,
    size: 'normal',
    accent: '#9ca3af',
  },
  {
    id: '5',
    slug: '#',
    category: 'Community',
    tag: 'Impact',
    title: 'Equipping 10 Community Gyms Across Pakistan',
    excerpt: 'A partnership with the national sports federation brought commercial-grade equipment to 10 underserved community fitness centres.',
    author: 'Editorial',
    role: 'Combaxx Team',
    date: 'December 2024',
    readTime: '5 min read',
    featured: false,
    size: 'large',
    accent: '#FF3333',
  },
  {
    id: '6',
    slug: '#',
    category: 'Facilities',
    tag: 'Design',
    title: 'Hotel Wellness: The Meridian Spa Transformation',
    excerpt: 'A 5-star hotel spa that went from dated to award-winning in 8 weeks. The complete equipment and design story.',
    author: 'Marco L.',
    role: 'GM, The Meridian',
    date: 'November 2024',
    readTime: '6 min read',
    featured: false,
    size: 'normal',
    accent: '#c8a96e',
  },
  {
    id: '7',
    slug: '#',
    category: 'Innovation',
    tag: 'Product',
    title: 'Why Cable Ratio Matters More Than Weight Stack',
    excerpt: 'The engineering truth behind cable machines: it&apos;s not about how heavy the stack is — it&apos;s about how accurately the cable ratio delivers resistance.',
    author: 'Engineering Team',
    role: 'R&D Division',
    date: 'October 2024',
    readTime: '7 min read',
    featured: false,
    size: 'normal',
    accent: '#ffffff',
  },
  {
    id: '8',
    slug: '#',
    category: 'Athletes',
    tag: 'Strength',
    title: 'Powerlifting Platforms for Commercial Gyms',
    excerpt: 'A deep dive into competition-specification powerlifting setup — what serious lifters demand and what gyms actually need to deliver it.',
    author: 'Ali Hassan',
    role: 'National Powerlifting Coach',
    date: 'October 2024',
    readTime: '5 min read',
    featured: false,
    size: 'normal',
    accent: '#FF3333',
  },
]

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

const FEATURED = STORIES[0]

export default function StoriesPage() {
  return (
    <div className={styles.page}>

      {/* ── HERO — FEATURED STORY ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroOverlay} />
          <div className={styles.heroPattern} />
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

        {/* Featured card */}
        <div className={styles.featuredCard}>
          <div className={styles.featuredCardBg} />
          <div className={styles.featuredCardInner}>
            <div className={styles.featuredCardMeta}>
              <span className={styles.featuredTag}>{FEATURED.tag}</span>
              <span className={styles.featuredCategory}>{FEATURED.category}</span>
              <span className={styles.featuredDate}>{FEATURED.date}</span>
            </div>
            <h2 className={styles.featuredTitle}>{FEATURED.title}</h2>
            <p className={styles.featuredExcerpt}>{FEATURED.excerpt}</p>
            <div className={styles.featuredFooter}>
              <div className={styles.featuredAuthor}>
                <div className={styles.featuredAvatar}>{FEATURED.author[0]}</div>
                <div>
                  <div className={styles.featuredAuthorName}>{FEATURED.author}</div>
                  <div className={styles.featuredAuthorRole}>{FEATURED.role}</div>
                </div>
              </div>
              <Link href={FEATURED.slug} className={styles.featuredReadBtn}>
                Read Story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STORIES GRID with filter ── */}
      <section className={styles.gridSection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionBadge}>All Stories</span>
            <h2 className={styles.sectionTitle}>Explore the Archive</h2>
          </div>
        </div>
        <StoriesGrid stories={STORIES.slice(1)} categories={STORY_CATEGORIES} />
      </section>

      {/* ── PULL QUOTE SLIDER ── */}
      <section className={styles.quotesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionBadge}>In Their Words</span>
            <h2 className={styles.sectionTitle}>Voices from the Floor</h2>
          </div>
        </div>
        <StoriesQuoteSlider quotes={PULL_QUOTES} />
      </section>

      {/* ── NUMBERS ── */}
      <section className={styles.numbersSection}>
        <div className={styles.container}>
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
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaLeft}>
              <span className={styles.sectionBadge}>Share Your Story</span>
              <h2 className={styles.ctaTitle}>
                Is Your Facility<br />Ready for Its Story?
              </h2>
              <p className={styles.ctaDesc}>
                If you&apos;ve built something exceptional with our equipment, we want to document it. Reach out and let&apos;s tell your story.
              </p>
            </div>
            <div className={styles.ctaRight}>
              <Link href="/contact" className={styles.ctaBtnRed}>
                Get in Touch
              </Link>
              <Link href="/shop" className={styles.ctaBtnOutline}>
                Browse Equipment
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

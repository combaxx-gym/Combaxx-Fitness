'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '@/styles/pages/stories.module.css'

interface Story {
  id: string
  slug: string
  category: string
  tag: string
  title: string
  excerpt: string
  author: string
  role: string
  date: string
  readTime: string
  featured: boolean
  size: string
  accent: string
  imageUrl?: string | null
  isPlaceholder?: boolean
}

interface Props {
  stories: Story[]
  categories: string[]
  sectionHead?: ReactNode
}

export default function StoriesGrid({ stories, categories, sectionHead }: Props) {
  const [active, setActive] = useState('All')
  const showSkeletons = stories.length > 0 && stories.every(s => s.isPlaceholder)

  // Preserve skeleton placeholder cards across all category filters (don't filter them out)
  const filtered = active === 'All'
    ? stories
    : stories.filter(s => s.category === active || s.isPlaceholder)

  return (
    <>
      {sectionHead}
      {/* Filter tabs */}
      <div className={styles.filterTabs}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`${styles.filterTab} ${active === cat ? styles.filterTabActive : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

        {/* Grid */}
        <motion.div className={styles.storiesGrid} layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((story, i) => (
              <motion.article
                key={story.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`${styles.storyCard} ${story.size === 'large' ? styles.storyCardLarge : ''}`}
                style={story.isPlaceholder ? { cursor: 'default' } : undefined}
              >
                {story.isPlaceholder ? (
                  <div className={styles.storyCardLink} style={{ pointerEvents: 'none' }}>
                    {/* Card visual skeleton */}
                    <div className={styles.storyCardVisual}>
                      <div className={`${styles.skeleton} ${styles.skeletonImage}`} />
                      <div className={styles.storyCardBg} style={{ background: `linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)` }} />
                      <div className={styles.storyCardAccentLine} style={{ background: story.accent }} />
                      <div className={styles.storyCardPattern} />
                    </div>

                    {/* Card content skeleton */}
                    <div className={styles.storyCardContent}>
                      <div className={styles.storyCardMeta}>
                        <div className={`${styles.skeleton} ${styles.skeletonBadgeSm}`} style={{ width: 72, borderRadius: 3 }} />
                        <div className={`${styles.skeleton} ${styles.skeletonBadgeSm}`} style={{ width: 110 }} />
                      </div>
                      <div className={`${styles.skeleton} ${styles.skeletonTitle}`} style={{ height: '1.4rem', marginBottom: '0.75rem' }} />
                      <div className={styles.skeletonText} />
                      <div className={`${styles.skeletonText} ${styles.skeletonText70}`} />
                      <div className={styles.storyCardFooter} style={{ borderTopColor: 'transparent' }}>
                        <div className={styles.storyCardAuthorWrap}>
                          <div className={`${styles.skeleton}`} style={{ width: 32, height: 32, borderRadius: '50%' }} />
                          <div>
                            <div className={`${styles.skeleton}`} style={{ width: 90, height: 12, margin: '2px 0 4px' }} />
                            <div className={`${styles.skeleton}`} style={{ width: 110, height: 10, opacity: 0.7 }} />
                          </div>
                        </div>
                        <div className={`${styles.skeleton}`} style={{ width: 34, height: 34, borderRadius: '50%' }} />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Card visual */
                  <Link href={`/stories/${story.slug}`} className={styles.storyCardLink} aria-label={`Read ${story.title}`}>
                    <div className={styles.storyCardVisual}>
                      {story.imageUrl ? (
                        <img
                          src={story.imageUrl}
                          alt=""
                          className={styles.storyCardImg}
                          loading="lazy"
                        />
                      ) : null}
                      <div className={styles.storyCardBg} style={{ background: `linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)` }} />
                      <div className={styles.storyCardAccentLine} style={{ background: story.accent }} />
                      <div className={styles.storyCardPattern} />
                    </div>

                    {/* Card content */}
                    <div className={styles.storyCardContent}>
                      <div className={styles.storyCardMeta}>
                        <span className={styles.storyCardTag}>{story.tag}</span>
                        <span className={styles.storyCardCat}>{story.category}</span>
                      </div>
                      <h3 className={styles.storyCardTitle}>{story.title}</h3>
                      <p className={styles.storyCardExcerpt}>{story.excerpt}</p>
                      <div className={styles.storyCardFooter}>
                        <div className={styles.storyCardAuthorWrap}>
                          <div className={styles.storyCardAvatar} style={{ borderColor: story.accent }}>
                            {story.author[0]}
                          </div>
                          <div>
                            <div className={styles.storyCardAuthor}>{story.author}</div>
                            <div className={styles.storyCardDate}>{story.date} · {story.readTime}</div>
                          </div>
                        </div>
                        <span className={styles.storyCardArrow}>
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                )}
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {!showSkeletons && filtered.length === 0 && (
          <div className={styles.emptyState}>
            No stories in this category yet.
          </div>
        )}
    </>
  )
}

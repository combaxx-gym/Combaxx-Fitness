'use client'

import { useState } from 'react'
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
}

interface Props {
  stories: Story[]
  categories: string[]
}

export default function StoriesGrid({ stories, categories }: Props) {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? stories : stories.filter(s => s.category === active)

  return (
    <div className={styles.gridWrap}>
      <div className={styles.container}>
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
              >
                {/* Card visual */}
                <div className={styles.storyCardVisual}>
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
                    <Link href={story.slug} className={styles.storyCardArrow}>
                      →
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className={styles.emptyState}>
            No stories in this category yet.
          </div>
        )}
      </div>
    </div>
  )
}

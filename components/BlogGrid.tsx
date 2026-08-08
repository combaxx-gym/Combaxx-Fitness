'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '@/styles/pages/blog.module.css'

interface BlogGridItem {
  id: string
  slug: string
  category: string
  title: string
  excerpt: string
  author: string
  authorRole: string
  date: string
  readingTime: number
  imageUrl?: string | null
  isPlaceholder?: boolean
}

interface Props {
  posts: BlogGridItem[]
  categories: string[]
  showPlaceholderHint?: boolean
  sectionHead?: ReactNode
}

export default function BlogGrid({ posts, categories, showPlaceholderHint, sectionHead }: Props) {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? posts : posts.filter(p => p.category === active || p.isPlaceholder)
  const showSkeletons = posts.length > 0 && posts.every(p => p.isPlaceholder)

  return (
    <>
      {sectionHead}
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

      {showPlaceholderHint && showSkeletons && (
        <p className={styles.gridPlaceholderHint}>
          ✍️ No articles published yet — head to <strong>/studio → Blog / News Articles</strong> to upload your first post.
        </p>
      )}

      <motion.div className={styles.postsGrid} layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.article
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className={styles.postCard}
              style={p.isPlaceholder ? { cursor: 'default' } : undefined}
            >
              {p.isPlaceholder ? (
                <div className={styles.postLink} style={{ pointerEvents: 'none' }}>
                  <div className={styles.postThumb}>
                    <div className={`${styles.skeleton} ${styles.skeletonImage}`} />
                    <div className={styles.postThumbOverlay} />
                  </div>
                  <div className={styles.postBody}>
                    <div className={styles.postMetaRow}>
                      <span className={`${styles.skeleton} ${styles.skeletonBadgeSm}`} />
                      <span className={`${styles.skeleton} ${styles.skeletonBadgeSm}`} style={{ width: 110 }} />
                    </div>
                    <div className={`${styles.skeleton} ${styles.skeletonTitleSm}`} />
                    <div className={`${styles.skeleton} ${styles.skeletonText}`} />
                    <div className={`${styles.skeleton} ${styles.skeletonText} ${styles.skeletonText70}`} />
                    <div className={styles.postCardFooter} style={{ borderTopColor: 'transparent' }}>
                      <div className={`${styles.skeleton}`} style={{ width: 90, height: 14, margin: 0 }} />
                      <div className={`${styles.skeleton}`} style={{ width: 55, height: 14, margin: 0 }} />
                    </div>
                  </div>
                </div>
              ) : (
                <Link href={`/blog/${p.slug}`} className={styles.postLink} aria-label={`Read ${p.title}`}>
                  <div className={styles.postThumb}>
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt="" loading="lazy" />
                    ) : null}
                    <div className={styles.postThumbOverlay} />
                  </div>
                  <div className={styles.postBody}>
                    <div className={styles.postMetaRow}>
                      <span className={styles.postCat}>{p.category}</span>
                      <span className={styles.postDateRead}>
                        {p.date || 'Recently'} · {p.readingTime} min read
                      </span>
                    </div>
                    <h3 className={styles.postTitle}>{p.title}</h3>
                    <p className={styles.postExcerpt}>{p.excerpt}</p>
                    <div className={styles.postCardFooter}>
                      <div className={styles.postAuthorMini}>
                        <strong>{p.author}</strong>
                      </div>
                      <span className={styles.readBtn}>Read</span>
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
          No articles in this category yet — check back soon.
        </div>
      )}
    </>
  )
}

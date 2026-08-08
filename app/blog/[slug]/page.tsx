import type { Metadata } from 'next'
import Link from 'next/link'
import { PortableText, type PortableTextComponents } from 'next-sanity'
import CTA from '@/components/CTA'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import type { BlogPostDetail } from '@/types/blog'
import styles from '@/styles/pages/blog-post.module.css'

const POST_FIELDS = `
  _id,
  title,
  slug,
  category,
  tags,
  author,
  authorRole,
  authorPhoto,
  date,
  readingTime,
  excerpt,
  featured,
  coverImage,
  content,
  seoTitle,
  seoDescription
`

async function getPost(slug: string): Promise<BlogPostDetail | null> {
  try {
    const result = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{ ${POST_FIELDS} }`,
      { slug }
    )
    return (result as BlogPostDetail) || null
  } catch (e) {
    console.error(`[blog detail] getPost failed for slug=${slug}:`, e)
    return null
  }
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const slugs: { slug?: string }[] = await client.fetch(
      `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`
    )
    return (slugs || [])
      .filter(s => typeof s?.slug === 'string' && s.slug.length > 0)
      .map(s => ({ slug: s.slug as string }))
  } catch (e) {
    console.error('[blog detail] generateStaticParams failed:', e)
    return []
  }
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  try {
    const { slug } = await props.params
    const post = await getPost(slug)
    if (!post) {
      return { title: 'Post Not Found | Combaxx Fitness' }
    }
    const title = post.seoTitle || `${post.title} | Blog | Combaxx Fitness`
    const desc = post.seoDescription || post.excerpt ||
      'Read the latest article from Combaxx Fitness — gym guides, equipment tips, industry news, and product updates.'
    const ogImage = post.coverImage
      ? urlFor(post.coverImage).width(1200).height(630).quality(85).url()
      : undefined
    return {
      title,
      description: desc,
      openGraph: {
        title,
        description: desc,
        type: 'article',
        ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }] } : {}),
        publishedTime: post.date ? new Date(post.date).toISOString() : undefined,
        authors: post.author ? [post.author] : undefined,
        tags: post.tags || [],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description: desc,
        ...(ogImage ? { images: [ogImage] } : {}),
      },
      alternates: { canonical: `/blog/${slug}` },
    }
  } catch (e) {
    console.error('[blog detail] generateMetadata failed:', e)
    return { title: 'Blog | Combaxx Fitness' }
  }
}

const img = (source?: unknown) =>
  source ? urlFor(source) : null

function formatDate(d?: string) {
  if (!d) return ''
  const date = new Date(d)
  if (Number.isNaN(date.getTime())) return d
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const imgSrc = img(value)?.width(1200).quality(85).url()
      if (!imgSrc) return null
      return (
        <figure>
          <img src={imgSrc} alt={value?.alt || ''} loading="lazy" />
          {value?.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      )
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || '#'
      const blank = value?.blank !== false
      return (
        <a href={href} target={blank ? '_blank' : undefined} rel={blank ? 'noopener noreferrer' : undefined}>
          {children}
        </a>
      )
    },
  },
}

export default async function BlogPostDetailPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const post = await getPost(slug)

  if (!post) {
    return (
      <div className={styles.page}>
        <div className={styles.backBar}>
          <div className={styles.container}>
            <Link href="/blog" className={styles.backLink}>← Back to Blog</Link>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.notFoundWrap}>
            <h1 className={styles.notFoundTitle}>Article Not Found</h1>
            <p className={styles.notFoundText}>The article you are looking for does not exist or has been removed.</p>
            <Link href="/blog" className={styles.notFoundBtn}>Go to Blog</Link>
          </div>
        </div>
      </div>
    )
  }

  const coverImg = img(post.coverImage)
    ?.width(2000)
    .quality(85)
    .url()

  const authorAvatarImg = img(post.authorPhoto)
    ?.width(200)
    .height(200)
    .quality(85)
    .url()

  const displayAuthor = post.author || 'Combaxx Team'
  const displayRole = post.authorRole || 'Editorial'
  const avatarInitials = displayAuthor
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()

  const displayDate = formatDate(post.date)
  const readingTime = post.readingTime || 5

  const tags = (post.tags || []).filter(Boolean)
  const content = post.content || []

  return (
    <div className={styles.page}>
      {/* ===== BACK BAR ===== */}
      <div className={styles.backBar}>
        <div className={styles.container}>
          <Link href="/blog" className={styles.backLink}>← Back to Blog</Link>
        </div>
      </div>

      {/* ===== HERO ===== */}
      <section className={styles.hero} aria-label="Article hero">
        <div className={styles.container}>
          <div className={styles.heroCover}>
            {coverImg && <img src={coverImg} alt="" aria-hidden="true" className={styles.heroCoverImg} />}
            <div className={styles.heroCoverOverlay} />
            <div className={styles.heroContent}>
              <div className={styles.heroLabelRow}>
                {post.category && <span className={styles.heroCatPill}>{post.category}</span>}
                {displayDate && <span className={styles.heroMetaPill}>{displayDate}</span>}
                <span className={styles.heroMetaPill}>{readingTime} min read</span>
              </div>
              <h1 className={styles.heroTitle}>{post.title}</h1>
              {post.excerpt && <p className={styles.heroExcerpt}>{post.excerpt}</p>}
            </div>
          </div>

          {/* ===== AUTHOR ROW ===== */}
          <div className={styles.authorRow}>
            <div className={styles.authorBlock}>
              <div className={styles.authorAvatar}>
                {authorAvatarImg ? (
                  <img src={authorAvatarImg} alt={displayAuthor} />
                ) : (
                  avatarInitials
                )}
              </div>
              <div className={styles.authorMeta}>
                <span className={styles.authorName}>{displayAuthor}</span>
                <span className={styles.authorSub}>
                  {displayRole}
                  {displayDate && ` · ${displayDate}`}
                </span>
              </div>
            </div>
            <div className={styles.shareRow} aria-hidden="true">
              <span>Share this article</span>
            </div>
          </div>

          {/* ===== ARTICLE BODY ===== */}
          <div className={styles.articleWrap}>
            <article className={styles.article}>
              <PortableText value={content} components={portableTextComponents} />
            </article>

            {/* ===== TAGS ===== */}
            {tags.length > 0 && (
              <div className={styles.tagsRow}>
                {tags.map((tag, i) => (
                  <span key={i} className={styles.tagPill}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className={styles.ctaSection}>
        <CTA
          badge="Stay Updated"
          title="Ready to Equip Your Facility?"
          description="Get the latest equipment guides, bulk pricing deals, and gym design tips directly from our commercial fitness experts."
          primaryButtonText="Get in Touch"
          primaryButtonLink="/contact"
          secondaryButtonText="Browse Equipment"
          secondaryButtonLink="/shop"
        />
      </section>
    </div>
  )
}

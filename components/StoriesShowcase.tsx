import Image from "next/image"
import Link from "next/link"
import styles from "@/styles/components/StoriesShowcase.module.css"

export default function StoriesShowcase() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Stories</p>
            <h2 className={styles.heading}>
              Human stories
              <span className={styles.headingAlt}>written on every rep.</span>
            </h2>
          </div>
          <Link href="/stories" className={styles.viewAllLink}>
            View all stories
          </Link>
        </div>

        <div className={styles.grid}>
          {/* Featured card */}
          <div className={styles.cardFeatured}>
            <Image
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop"
              alt="Athlete training with sled"
              fill
              className={styles.cardImage}
              unoptimized
            />
            <div className={styles.cardGradient} />
            <div className={styles.featuredText}>
              <p className={styles.cardLabel}>Performance lab</p>
              <p className={styles.featuredTitle}>
                How elite sprinters use incline work to unlock top speed.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className={styles.card}>
            <Image
              src="/images/hero-section-slide-1.webp"
              alt="Coach adjusting athlete posture"
              fill
              className={styles.cardImage}
              unoptimized
            />
            <div className={styles.cardGradient} />
            <div className={styles.cardText}>
              <p className={styles.cardSubLabel}>Coaching</p>
              <p className={styles.cardTitle}>
                Building better movement patterns with small adjustments.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className={styles.card}>
            <Image
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop"
              alt="Group training session"
              fill
              className={styles.cardImage}
              unoptimized
            />
            <div className={styles.cardGradient} />
            <div className={styles.cardText}>
              <p className={styles.cardSubLabel}>Community</p>
              <p className={styles.cardTitle}>
                Why training together pushes effort further.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

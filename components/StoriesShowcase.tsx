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
          {/* Box 1: Featured card (Large - spans 2 rows) */}
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

          {/* Box 2: Middle Top */}
          <div className={styles.cardSmall}>
            <Image
              src="/images/Human stories 1.webp"
              alt="Human Story 1"
              fill
              className={styles.cardImage}
            />
            <div className={styles.cardGradient} />
            <div className={styles.cardContent}>
              <p className={styles.cardSubLabel}>Technique</p>
              <p className={styles.cardTitle}>
                Precision in every move defines your progress.
              </p>
            </div>
          </div>

          {/* Box 4: Right Top */}
          <div className={styles.cardSmall}>
            <Image
              src="/images/Human stories 2.webp"
              alt="Human Story 2"
              fill
              className={styles.cardImage}
            />
            <div className={styles.cardGradient} />
            <div className={styles.cardContent}>
              <p className={styles.cardSubLabel}>Recovery</p>
              <p className={styles.cardTitle}>
                Rest as hard as you train to reach your peak.
              </p>
            </div>
          </div>

          {/* Box 3: Middle Bottom */}
          <div className={styles.cardSmall}>
            <Image
              src="/images/Human stories 3.webp"
              alt="Human Story 3"
              fill
              className={styles.cardImage}
            />
            <div className={styles.cardGradient} />
            <div className={styles.cardContent}>
              <p className={styles.cardSubLabel}>Coaching</p>
              <p className={styles.cardTitle}>
                Building better movement patterns with small adjustments.
              </p>
            </div>
          </div>

          {/* Box 5: Right Bottom */}
          <div className={styles.cardSmall}>
            <Image
              src="/images/Human stories 4.webp"
              alt="Human Story 4"
              fill
              className={styles.cardImage}
            />
            <div className={styles.cardGradient} />
            <div className={styles.cardContent}>
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

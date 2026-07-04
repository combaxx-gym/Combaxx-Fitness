import { ChevronRight } from "lucide-react"
import Link from "next/link"
import styles from "@/styles/components/BusinessFaq.module.css"

export default function BusinessFaq() {
  const items = [
    {
      q: "What are gym equipment?",
      a: "Gym equipment covers cardio, strength and functional tools designed to improve fitness, endurance and performance.",
    },
    {
      q: "What are cardio fitness equipment?",
      a: "Cardio equipment includes treadmills, bikes, rowers and cross trainers focused on heart rate and stamina.",
    },
    {
      q: "What are strength workout equipment?",
      a: "Strength equipment includes benches, racks, dumbbells and multi gyms engineered for progressive overload.",
    },
    {
      q: "What are home gym equipment?",
      a: "Home gym equipment is optimized for compact spaces, low noise and versatile training at home.",
    },
    {
      q: "What are commercial fitness equipment?",
      a: "Commercial fitness equipment is built for heavy duty use, durability and consistent performance in shared spaces.",
    },
    {
      q: "Who is Technogym?",
      a: "Technogym is a global fitness brand known for premium equipment and connected digital ecosystems.",
    },
  ]

  return (
    <>
      {/* Section 2: Video Hero */}
      <section className={styles.videoSection}>
        <video
          className={styles.videoBg}
          src="/videos/2bd2404b.mp4"
          muted
          loop
          playsInline
          autoPlay
        />
        <div className={styles.videoGradient} />
        <div className={styles.videoContent}>
          <div className={styles.videoInner}>
            <div className={styles.videoTextBlock}>
              <h2 className={styles.videoTitle}>
                SHAPE UP YOUR BUSINESS
                <br />
                WITH TECHNOGYM
              </h2>
              <p className={styles.videoDesc}>
                Since 1983, we&apos;ve been empowering health and wellness facilities with top‑notch technology.
                Revolutionize your business and boost customer engagement with our integrated ecosystem.
              </p>
              <Link href="/shop" className={styles.videoCta}>
                <span className={styles.videoCtaText}>Browse business solutions</span>
                <span className={styles.videoCtaIcon}>
                  <ChevronRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: FAQ */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.faqIntro}>
            <h2 className={styles.faqIntroTitle}>
              Home gym equipment, commercial gym machines, professional gym equipment
            </h2>
            <p className={styles.faqIntroDesc}>
              Technogym is a leading company for high-end gym equipment for fitness, health, sports, and wellness.
              Discover our range of home gym equipment, professional gym equipment and home fitness solutions.
              From stationary bikes to treadmills, our impeccable engineering for ergonomics, design and materials
              will help you achieve your goals more efficiently, safely, and quickly. All of our products belong to
              a connected and open ecosystem based on artificial intelligence, enabling a fully personalized training
              experience easily accessible anywhere, anytime.
            </p>
          </div>

          <div className={styles.faqGrid}>
            <div>
              <h3 className={styles.faqSideTitle}>FAQs</h3>
            </div>
            <div className={styles.faqList}>
              {items.map((item, idx) => (
                <details key={idx} className={styles.faqItem}>
                  <summary className={styles.faqSummary}>
                    <span className={styles.faqQuestion}>{item.q}</span>
                    <span className={styles.faqIcon}>+</span>
                  </summary>
                  <p className={styles.faqAnswer}>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

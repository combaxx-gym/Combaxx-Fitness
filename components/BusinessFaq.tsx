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
      {/* Section 1: Partners Marquee */}
      <section className={styles.partnersSection}>
        <div className={styles.container}>
          <div className={styles.partnersHeader}>
            <h2 className={styles.partnersTitle}>
              Achieving excellence alongside with
            </h2>
            <span className={styles.partnersLabel}>Our partnerships</span>
          </div>
          <div className={styles.logoTrack}>
            <div className={styles.logoFadeLeft} />
            <div className={styles.logoFadeRight} />
            <div className={styles.logoScroller}>
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/39/Scuderia_Ferrari_Logo.svg/320px-Scuderia_Ferrari_Logo.svg.png" alt="Ferrari" className={`${styles.logoImg} ${styles.logoImgLg}`} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/McLaren_Logo.svg/320px-McLaren_Logo.svg.png" alt="McLaren" className={`${styles.logoImg} ${styles.logoImgSm}`} />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/FC_Internazionale_Milano_2014.svg/320px-FC_Internazionale_Milano_2014.svg.png" alt="Inter" className={`${styles.logoImg} ${styles.logoImgMd}`} />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Juventus_2020.svg/320px-Juventus_2020.svg.png" alt="Juventus" className={`${styles.logoImg} ${styles.logoImgSm}`} />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/Logo_of_AC_Milan.svg/320px-Logo_of_AC_Milan.svg.png" alt="AC Milan" className={`${styles.logoImg} ${styles.logoImgMd}`} />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Brazil_national_football_team_logo.svg/320px-Brazil_national_football_team_logo.svg.png" alt="Brazil" className={`${styles.logoImg} ${styles.logoImgMd}`} />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Italy_national_football_team_logo_2023.svg/320px-Italy_national_football_team_logo_2023.svg.png" alt="Italy" className={`${styles.logoImg} ${styles.logoImgMd}`} />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/39/Scuderia_Ferrari_Logo.svg/320px-Scuderia_Ferrari_Logo.svg.png" alt="Ferrari" className={`${styles.logoImg} ${styles.logoImgLg}`} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/McLaren_Logo.svg/320px-McLaren_Logo.svg.png" alt="McLaren" className={`${styles.logoImg} ${styles.logoImgSm}`} />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/FC_Internazionale_Milano_2014.svg/320px-FC_Internazionale_Milano_2014.svg.png" alt="Inter" className={`${styles.logoImg} ${styles.logoImgMd}`} />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Juventus_2020.svg/320px-Juventus_2020.svg.png" alt="Juventus" className={`${styles.logoImg} ${styles.logoImgSm}`} />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/Logo_of_AC_Milan.svg/320px-Logo_of_AC_Milan.svg.png" alt="AC Milan" className={`${styles.logoImg} ${styles.logoImgMd}`} />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Brazil_national_football_team_logo.svg/320px-Brazil_national_football_team_logo.svg.png" alt="Brazil" className={`${styles.logoImg} ${styles.logoImgMd}`} />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Italy_national_football_team_logo_2023.svg/320px-Italy_national_football_team_logo_2023.svg.png" alt="Italy" className={`${styles.logoImg} ${styles.logoImgMd}`} />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Video Hero */}
      <section className={styles.videoSection}>
        <video
          className={styles.videoBg}
          src="/videos/2bd2404b.mp4"
          muted
          loop
          playsInline
          autoPlay
          poster="/images/COMBAXX FITNESS logo.png"
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
              <Link href="/business" className={styles.videoCta}>
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

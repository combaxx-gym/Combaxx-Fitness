import { Dumbbell, HeartPulse, ShieldCheck, Globe2 } from "lucide-react"
import styles from "@/styles/components/PerformanceWorld.module.css"

export default function PerformanceWorld() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.textBlock}>
          <p className={styles.eyebrow}>Enter the performance world</p>
          <h2 className={styles.heading}>
            Built for athletes, clubs and high-performance spaces.
          </h2>
          <p className={styles.desc}>
            Whether you train at home or manage a full facility, our ecosystem keeps experience,
            data and durability perfectly aligned.
          </p>
        </div>
        <div className={styles.featureGrid}>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <Dumbbell className="h-5 w-5 text-[#F0D348]" />
            </div>
            <p className={styles.featureLabel}>Strength sessions</p>
            <p className={styles.featureDesc}>Engineered for heavy daily use.</p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <HeartPulse className="h-5 w-5 text-[#F0D348]" />
            </div>
            <p className={styles.featureLabel}>Cardio science</p>
            <p className={styles.featureDesc}>Biomechanics tuned for real athletes.</p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <ShieldCheck className="h-5 w-5 text-[#F0D348]" />
            </div>
            <p className={styles.featureLabel}>Built to last</p>
            <p className={styles.featureDesc}>Industrial-grade components and finishes.</p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <Globe2 className="h-5 w-5 text-[#F0D348]" />
            </div>
            <p className={styles.featureLabel}>Connected</p>
            <p className={styles.featureDesc}>Ready for clubs, hotels and hybrid spaces.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

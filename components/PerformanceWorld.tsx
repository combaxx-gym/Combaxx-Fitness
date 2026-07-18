import { Dumbbell, HeartPulse, ShieldCheck, Globe2 } from "lucide-react"
import styles from "@/styles/components/PerformanceWorld.module.css"

export default function PerformanceWorld() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.textBlock}>
          <p className={styles.eyebrow}>Enter the performance world</p>
          <h2 className={styles.heading}>
            Built for Athletes, Clubs and high performance spaces
          </h2>
          <p className={styles.desc}>
            COMBAXX partners with gyms, fitness clubs, hotels, institutions, and performance centers to design and deliver complete commercial strength facilities built for lasting performance.
          </p>
        </div>
        <div className={styles.featureGrid}>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <Dumbbell className="h-5 w-5 text-[#FF3333]" />
            </div>
            <p className={styles.featureLabel}>Complete Facility Solutions</p>
            <p className={styles.featureDesc}>From concept to installation.</p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <HeartPulse className="h-5 w-5 text-[#FF3333]" />
            </div>
            <p className={styles.featureLabel}>Commercial Grade</p>
            <p className={styles.featureDesc}>Built for continuous, high-volume use.</p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <ShieldCheck className="h-5 w-5 text-[#FF3333]" />
            </div>
            <p className={styles.featureLabel}>Modular Design</p>
            <p className={styles.featureDesc}>Flexible systems that adapt as your facility grows.</p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <Globe2 className="h-5 w-5 text-[#FF3333]" />
            </div>
            <p className={styles.featureLabel}>Engineered to Last</p>
            <p className={styles.featureDesc}>Precision manufacturing with uncompromising durability.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

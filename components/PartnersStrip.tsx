import styles from "@/styles/components/PartnersStrip.module.css"

export default function PartnersStrip() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div>
          <p className={styles.label}>Achieving excellence alongside</p>
          <p className={styles.desc}>
            Trusted by performance studios, hotels, clubs and workplace gyms around the world.
          </p>
        </div>
        <div className={styles.tagsWrap}>
          <span className={styles.tag}>Elite Clubs</span>
          <span className={styles.tag}>Boutique Studios</span>
          <span className={styles.tag}>Hotels</span>
          <span className={styles.tag}>Corporate</span>
        </div>
      </div>
    </section>
  )
}

import React from "react"
import Image from "next/image"
import styles from "@/styles/components/ShapingFuture.module.css"

const ShapingFuture = () => {
  return (
    <div className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.textBlock}>
          <h2 className={styles.heading}>
            Shaping the future <br /> of performance
          </h2>
          <p className={styles.desc}>
            We are the first to create connected ecosystems in fitness, creating
            seamless workout experiences.
          </p>
          <button className={styles.btn}>Discover our story</button>
        </div>
        <div className={styles.imageWrap}>
          <Image
            src="/images/hero-section-slide-2.webp"
            alt="Man on a treadmill"
            width={800}
            height={600}
            className={styles.image}
          />
        </div>
      </div>
    </div>
  )
}

export default ShapingFuture

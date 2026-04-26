import React from "react"
import styles from "@/styles/pages/simple.module.css"

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>About Us</h1>
      <p className={styles.desc}>
        Learn more about our mission to engineer high-performance fitness equipment.
      </p>
    </div>
  )
}

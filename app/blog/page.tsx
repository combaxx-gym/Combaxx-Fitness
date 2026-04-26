import React from "react"
import styles from "@/styles/pages/simple.module.css"

export default function BlogPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Latest Stories &amp; News</h1>
      <div className={styles.blogGrid}>
        {[1, 2, 3].map((item) => (
          <div key={item} className={styles.blogCard}>
            <div className={styles.blogCardThumb}></div>
            <h2 className={styles.blogCardTitle}>Blog Post Title {item}</h2>
            <p className={styles.blogCardDesc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <button className={styles.blogCardBtn}>Read More</button>
          </div>
        ))}
      </div>
    </div>
  )
}

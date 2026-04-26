import React from "react"
import styles from "@/styles/pages/simple.module.css"

export default function LegalPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Legal</h1>
      <p className={styles.desc}>
        Read our terms of service, privacy policy, and legal information.
      </p>
    </div>
  )
}

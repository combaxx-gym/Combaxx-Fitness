'use client'

import { useState } from 'react'
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import styles from "@/styles/components/BusinessFaq.module.css"

export default function BusinessFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const items = [
    {
      q: "Do you supply complete gym equipment packages?",
      a: "Yes. COMBAXX supplies complete strength equipment packages for commercial gyms, fitness studios, educational institutions, hotels, corporate wellness facilities, and premium home gyms.",
    },
    {
      q: "What types of strength equipment does COMBAXX manufacture?",
      a: "Our range includes modular rigs and racks, weight benches, barbells, storage systems, functional training equipment, gym accessories, and strength training attachments designed for commercial use.",
    },
    {
      q: "Is COMBAXX equipment suitable for commercial gyms?",
      a: "Absolutely. Every COMBAXX product is engineered for high-volume commercial environments using heavy-duty steel, precision manufacturing, and durable powder-coated finishes.",
    },
    {
      q: "Can I expand my COMBAXX gym as my facility grows?",
      a: "Yes. Many COMBAXX rigs, racks, and storage systems are modular, allowing you to add bays, storage, and compatible attachments as your training requirements evolve.",
    },
    {
      q: "What makes COMBAXX equipment different?",
      a: "COMBAXX combines precision engineering, commercial-grade construction, and functional design to deliver strength equipment built for reliability, performance, and years of continuous use.",
    },
    {
      q: "Does COMBAXX offer equipment for home gyms?",
      a: "Yes. While our products are engineered to commercial standards, many are equally suited to premium home gyms for users who want professional-quality strength equipment.",
    },
  ]

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      {/* Section 2: Video Hero */}
      <section className={styles.videoSection}>
        <video
          className={styles.videoBg}
          src="/videos/main-banner-video-first.mp4"
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
              Home Gym Equipment, Commercial Gym Equipment & Professional Strength Solutions
            </h2>
            <p className={styles.faqIntroDesc}>
              COMBAXX designs and manufactures premium commercial-grade strength equipment for fitness clubs, performance centers, hotels, educational institutions, corporate wellness facilities, and premium home gyms. Our product range includes modular rigs and racks, weight benches, barbells, storage systems, functional training equipment, and gym accessories—all engineered with uncompromising precision, durability, and performance. Whether outfitting a single training space or supplying an entire facility, COMBAXX delivers strength solutions built to perform for generations.
            </p>
          </div>

          <div className={styles.faqGrid}>
            <div>
              <h3 className={styles.faqSideTitle}>FAQs</h3>
            </div>
            <div className={styles.faqList}>
              {items.map((item, idx) => (
                <div key={idx} className={styles.faqItem}>
                  <button
                    className={styles.faqSummary}
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={openIndex === idx}
                  >
                    <span className={styles.faqQuestion}>{item.q}</span>
                    <span className={styles.faqIcon}>
                      {openIndex === idx ? '−' : '+'}
                    </span>
                  </button>
                  {openIndex === idx && (
                    <p className={styles.faqAnswer}>{item.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

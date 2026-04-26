'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from '@/styles/pages/wellness.module.css'

interface Zone {
  id: string
  badge: string
  title: string
  subtitle: string
  desc: string
  color: string
  href: string
}

export default function WellnessZonesSlider({ zones }: { zones: Zone[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const scrollTo = (i: number) => {
    setActive(i)
    const track = trackRef.current
    if (!track) return
    const card = track.children[i] as HTMLElement
    if (card) {
      track.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' })
    }
  }

  return (
    <div className={styles.zonesWrap}>
      {/* Dots nav */}
      <div className={styles.zonesDots}>
        {zones.map((_, i) => (
          <button
            key={i}
            className={`${styles.zonesDot} ${active === i ? styles.zonesDotActive : ''}`}
            onClick={() => scrollTo(i)}
            aria-label={`Go to zone ${i + 1}`}
          />
        ))}
      </div>

      {/* Scrollable track */}
      <div className={styles.zonesTrack} ref={trackRef}>
        {zones.map((zone, i) => (
          <motion.div
            key={zone.id}
            className={styles.zoneCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className={styles.zoneCardTop}>
              <span className={styles.zoneBadge} style={{ color: zone.color }}>
                Zone {zone.badge}
              </span>
              <div className={styles.zoneAccent} style={{ background: zone.color }} />
            </div>
            <h3 className={styles.zoneTitle}>{zone.title}</h3>
            <p className={styles.zoneSubtitle}>{zone.subtitle}</p>
            <p className={styles.zoneDesc}>{zone.desc}</p>
            <Link href={zone.href} className={styles.zoneLink}>
              Explore {zone.title} →
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

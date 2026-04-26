import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import WellnessZonesSlider from '@/components/WellnessZonesSlider'
import WellnessQuoteSlider from '@/components/WellnessQuoteSlider'
import styles from '@/styles/pages/wellness.module.css'

export const metadata: Metadata = {
  title: 'Wellness | Commercial Gym Equipment',
  description: 'Discover our holistic approach to wellness — premium equipment, science-backed design, and spaces that inspire lasting transformation.',
}

const STATS = [
  { value: '50+', label: 'Years of Innovation' },
  { value: '150+', label: 'Countries Worldwide' },
  { value: '10K+', label: 'Facilities Equipped' },
  { value: '5M+', label: 'Active Users' },
]

const ZONES = [
  {
    id: 'cardio',
    badge: '01',
    title: 'Cardio',
    subtitle: 'Endurance & Energy',
    desc: 'Treadmills, bikes, ellipticals — engineered for peak cardiovascular performance with data-driven tracking built in.',
    color: '#FF3333',
    href: '/cardio',
  },
  {
    id: 'strength',
    badge: '02',
    title: 'Strength',
    subtitle: 'Power & Performance',
    desc: 'Plate-loaded and selectorized systems built to the highest commercial standards, designed for serious athletes.',
    color: '#e0e0e0',
    href: '/strength',
  },
  {
    id: 'recovery',
    badge: '03',
    title: 'Recovery',
    subtitle: 'Rest & Regeneration',
    desc: 'Stretch zones, foam rollers, massage stations — recovery is performance. Equip it accordingly.',
    color: '#9ca3af',
    href: '/shop',
  },
  {
    id: 'functional',
    badge: '04',
    title: 'Functional',
    subtitle: 'Movement & Agility',
    desc: 'Rigs, sleds, cables and free-motion systems for HIIT, CrossFit and dynamic movement training.',
    color: '#FF3333',
    href: '/shop',
  },
]

const SCIENCE = [
  {
    num: '01',
    title: 'Biomechanical Precision',
    desc: 'Every machine is designed around natural movement patterns — joint-safe, efficient, effective. No wasted motion.',
  },
  {
    num: '02',
    title: 'Data-Driven Design',
    desc: 'We partner with sports scientists and physiotherapists to ensure each product delivers measurable results.',
  },
  {
    num: '03',
    title: 'Environmental Wellness',
    desc: 'Space planning, layout design, lighting consultation — we help you build environments people want to return to.',
  },
  {
    num: '04',
    title: 'Long-Term Durability',
    desc: 'Commercial-grade construction with 5-year frame warranties. Equipment that performs as well in year 10 as day one.',
  },
]

const QUOTES = [
  {
    text: "The facility transformation was remarkable. Our member retention jumped 40% after we redesigned with their wellness philosophy.",
    author: "James R.",
    role: "CEO, Apex Fitness Group",
  },
  {
    text: "Not just equipment — a complete wellness ecosystem. The layout planning and product selection made our flagship club exceptional.",
    author: "Sarah K.",
    role: "Director, Urban Health Clubs",
  },
  {
    text: "Our hotel spa went from average to award-winning. The premium equipment selection elevated the entire guest experience.",
    author: "Marco L.",
    role: "GM, The Meridian Hotel Group",
  },
]

const LIFESTYLE = [
  { label: 'Cardio Zone', size: 'tall' },
  { label: 'Free Weights', size: 'wide' },
  { label: 'Functional', size: 'normal' },
  { label: 'Recovery', size: 'normal' },
  { label: 'Stretching', size: 'tall' },
]

export default function WellnessPage() {
  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroBgOverlay} />
          <div className={styles.heroBgGrid} />
        </div>
        <div className={styles.heroInner}>
          <div className={styles.heroMeta}>
            <span className={styles.heroBadge}>Wellness Philosophy</span>
            <div className={styles.heroLine} />
          </div>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleLine}>Wellness Is</span>
            <span className={styles.heroTitleLineAccent}>Not A Destination</span>
            <span className={styles.heroTitleLine}>It&apos;s A Journey</span>
          </h1>
          <p className={styles.heroDesc}>
            We design, manufacture and supply the environments where transformation happens — for elite athletes, premium hotels, and commercial facilities worldwide.
          </p>
          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.heroCta}>
              Build Your Facility
            </Link>
            <Link href="/shop" className={styles.heroCtaSecondary}>
              Browse Equipment →
            </Link>
          </div>
        </div>
        {/* Stats bar */}
        <div className={styles.statsBar}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.statItem}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className={styles.philosophySection}>
        <div className={styles.container}>
          <div className={styles.philosophyInner}>
            <div className={styles.philosophyLeft}>
              <span className={styles.sectionBadge}>Our Approach</span>
              <h2 className={styles.philosophyTitle}>
                Spaces That<br />Inspire Action
              </h2>
              <div className={styles.philosophyAccent} />
            </div>
            <div className={styles.philosophyRight}>
              <p className={styles.philosophyLead}>
                True wellness goes beyond equipment. It&apos;s about designing environments where people feel motivated the moment they walk in — and keep coming back for more.
              </p>
              <p className={styles.philosophyBody}>
                Our B2B approach combines commercial-grade equipment with space planning expertise, material science, and decades of facility data. Whether you&apos;re equipping a boutique studio or a 5,000 sqm flagship club, we deliver the complete picture.
              </p>
              <div className={styles.philosophyPillars}>
                {['Environment', 'Equipment', 'Experience', 'Results'].map((p) => (
                  <span key={p} className={styles.pill}>{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ZONES SLIDER ── */}
      <section className={styles.zonesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionBadge}>Training Zones</span>
            <h2 className={styles.sectionTitle}>Every Zone.<br />Every Goal.</h2>
          </div>
        </div>
        <WellnessZonesSlider zones={ZONES} />
      </section>

      {/* ── SCIENCE SECTION ── */}
      <section className={styles.scienceSection}>
        <div className={styles.container}>
          <div className={styles.scienceInner}>
            <div className={styles.scienceLeft}>
              <span className={styles.sectionBadge}>Science & Design</span>
              <h2 className={styles.scienceTitle}>
                Performance<br />Backed by<br />Research
              </h2>
              <p className={styles.scienceDesc}>
                Every product in our range has been developed in collaboration with sports scientists, physiotherapists, and elite athletic trainers.
              </p>
              <Link href="/contact" className={styles.scienceCta}>
                Request a Consultation
              </Link>
            </div>
            <div className={styles.scienceGrid}>
              {SCIENCE.map((s) => (
                <div key={s.num} className={styles.scienceCard}>
                  <div className={styles.scienceNum}>{s.num}</div>
                  <h3 className={styles.scienceCardTitle}>{s.title}</h3>
                  <p className={styles.scienceCardDesc}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LIFESTYLE MOSAIC ── */}
      <section className={styles.mosaicSection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionBadge}>The Environment</span>
            <h2 className={styles.sectionTitle}>Built for Excellence</h2>
          </div>
        </div>
        <div className={styles.mosaic}>
          <div className={`${styles.mosaicItem} ${styles.mosaicTall}`}>
            <div className={styles.mosaicBg} />
            <div className={styles.mosaicLabel}>Cardio Zone</div>
          </div>
          <div className={styles.mosaicCol}>
            <div className={`${styles.mosaicItem} ${styles.mosaicWide}`}>
              <div className={styles.mosaicBg} style={{ background: 'linear-gradient(135deg, #1a1a1a, #2a1a1a)' }} />
              <div className={styles.mosaicLabel}>Free Weights</div>
            </div>
            <div className={styles.mosaicRow}>
              <div className={styles.mosaicItem}>
                <div className={styles.mosaicBg} style={{ background: 'linear-gradient(135deg, #1f1f1f, #0d0d0d)' }} />
                <div className={styles.mosaicLabel}>Functional</div>
              </div>
              <div className={styles.mosaicItem}>
                <div className={styles.mosaicBg} style={{ background: 'linear-gradient(135deg, #1a1a2a, #0d0d0d)' }} />
                <div className={styles.mosaicLabel}>Recovery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE SLIDER ── */}
      <section className={styles.quotesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionBadge}>Client Voices</span>
            <h2 className={styles.sectionTitle}>What Our Partners Say</h2>
          </div>
        </div>
        <WellnessQuoteSlider quotes={QUOTES} />
      </section>

      {/* ── CTA BANNER ── */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaGlow} />
            <span className={styles.sectionBadge}>Get Started</span>
            <h2 className={styles.ctaTitle}>
              Ready to Build Your<br />Wellness Facility?
            </h2>
            <p className={styles.ctaDesc}>
              Our B2B team handles everything — equipment selection, layout design, delivery, installation, and after-sales support. Let&apos;s build something exceptional.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact" className={styles.ctaBtnRed}>
                Request a Quote
              </Link>
              <Link href="/shop" className={styles.ctaBtnOutline}>
                Browse All Products
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

import Link from "next/link"
import type { Metadata } from "next"
import {
  Shield, Award, Factory, Target, Users, CheckCircle2,
  Gauge, Wrench, ArrowRight, Phone
} from "lucide-react"
import styles from "@/styles/pages/about.module.css"
import CTA from "@/components/CTA"

export const metadata: Metadata = {
  title: "About Us | Combaxx Fitness — Commercial Gym Equipment",
  description:
    "Combaxx Fitness engineers premium commercial-grade strength, cardio and functional training equipment for gyms, hotels, universities and fitness facilities worldwide.",
}

const STATS = [
  { num: "15", suffix: "+", label: "Years of Engineering Excellence" },
  { num: "60", suffix: "+", label: "Countries & Global Partners" },
  { num: "2500", suffix: "+", label: "Commercial Facilities Equipped" },
  { num: "5", suffix: "yr", label: "Industry-Leading Frame Warranty" },
]

const VALUES = [
  {
    num: "01",
    icon: Shield,
    title: "Uncompromising Quality",
    desc:
      "Every frame, pin and weld is engineered for 10,000+ hours of commercial use. We source only aerospace-grade aluminum and industrial-grade steel.",
  },
  {
    num: "02",
    icon: Target,
    title: "Performance First Design",
    desc:
      "Biomechanically tested with elite athletes and physiotherapists. Every piece feels intuitive, responsive and built for record-breaking lifts.",
  },
  {
    num: "03",
    icon: Factory,
    title: "In-House Manufacturing",
    desc:
      "Precision laser cutting, robotic welding and multi-stage powder coating under one roof — giving us complete control over tolerances and finish.",
  },
  {
    num: "04",
    icon: Users,
    title: "B2B Partner Support",
    desc:
      "Dedicated project managers, space planners and technical teams. From concept to installation, we deliver on spec, on budget, on time.",
  },
]

const JOURNEY = [
  {
    year: "2010",
    title: "The Combaxx Vision Begins",
    desc:
      "Founded by a team of former competitive athletes and industrial engineers frustrated by equipment that broke mid-session. Our first rack prototypes roll out of a 2,000 sqft workshop.",
  },
  {
    year: "2014",
    title: "First Commercial Factory",
    desc:
      "Expanded into a 40,000 sqft production facility with automated CNC lines and a dedicated R&D lab. Began supplying national gym chains across Asia-Pacific.",
  },
  {
    year: "2018",
    title: "ISO 9001 & CE Certification",
    desc:
      "Achieved ISO 9001 quality management and CE marking across our strength and cardio lines. Opened our first European distribution hub in Germany.",
  },
  {
    year: "2021",
    title: "Launch of the Titan & Ironcore Series",
    desc:
      "Our flagship power racks, plate-loaded machines and functional rigs were unveiled at FIBO — earning acclaim from professional bodybuilders and Olympic training centers.",
  },
  {
    year: "2024",
    title: "Smart Connected Equipment",
    desc:
      "Combined our mechanical heritage with integrated performance tracking. Facilities now get real-time usage analytics, predictive maintenance and member engagement tools.",
  },
  {
    year: "Today",
    title: "Performance, Engineered Global",
    desc:
      "Serving 60+ countries with turnkey solutions for boutique studios, luxury hotels, military academies, universities and professional sports franchises.",
  },
]

const PROCESS = [
  {
    num: "STEP 01",
    icon: Target,
    title: "Design & Engineering",
    desc:
      "Our biomechanics team drafts every movement path in 3D CAD, then validates with force plates and motion capture before a single prototype is cut.",
  },
  {
    num: "STEP 02",
    icon: Factory,
    title: "Precision Manufacturing",
    desc:
      "Laser-cut steel, robotic MIG/TIG welding, CNC machining and multi-stage powder coating — each station inspected by senior technicians with digital QA checks.",
  },
  {
    num: "STEP 03",
    icon: Gauge,
    title: "Rigorous Testing",
    desc:
      "Frames undergo 1,000,000-cycle fatigue testing, weight stacks are load-verified and cardio consoles run 72-hour non-stop stress simulations in our test lab.",
  },
  {
    num: "STEP 04",
    icon: Shield,
    title: "Certification & Finish",
    desc:
      "Every batch is audited against ISO, CE and ASTM standards. Final surfaces receive our signature anti-rust, anti-sweat textured powder coat for a lifetime of use.",
  },
  {
    num: "STEP 05",
    icon: Wrench,
    title: "Install & Commission",
    desc:
      "Certified installation teams deliver, assemble and commission each machine on-site. Floor plans, 3D layouts and full-site branding are included for every project.",
  },
  {
    num: "STEP 06",
    icon: Award,
    title: "Lifetime Partnership",
    desc:
      "5-year frame warranty, dedicated account managers, rapid spare-parts dispatch and preventive maintenance programs keep your floors profitable for decades.",
  },
]

const WHY_ITEMS = [
  {
    title: "Commercial-Grade Steel Frames",
    desc:
      "11-gauge 3x3 box section steel with 10,000 lb rated weight stacks, proven in gyms with 2000+ daily members.",
  },
  {
    title: "Biomechanically Optimized",
    desc:
      "Co-designed with elite strength coaches and sports physicians to protect joints while maximizing muscle activation.",
  },
  {
    title: "5-Year Frame Warranty",
    desc:
      "Industry-leading structural coverage with priority spare-parts dispatch within 48 hours across 60+ countries.",
  },
  {
    title: "Turnkey Facility Design",
    desc:
      "Free 3D floor planning, equipment selection, branding and installation — handled by dedicated project managers.",
  },
  {
    title: "Global Supply Chain",
    desc:
      "Strategic warehouses in Asia, Europe and the Middle East mean fast lead times and low shipping costs on every order.",
  },
  {
    title: "Smart Equipment Ready",
    desc:
      "Optional IoT sensors, member app integration and usage analytics to help you maximize ROI on every machine.",
  },
]

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroTexture} />
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.breadLink}>Home</Link>
            <span className={styles.breadSep}>/</span>
            <span className={styles.breadSep}>About Us</span>
          </nav>

          <span className={styles.heroBadge}>Since 2010 · Global B2B Manufacturer</span>

          <h1 className={styles.heroTitle}>
            Performance,<br />
            <span className={styles.heroTitleAccent}>Engineered</span> to<br />
            Outlast Records.
          </h1>

          <p className={styles.heroDesc}>
            Combaxx Fitness builds commercial-strength gym equipment for
            operators who refuse to compromise. From boutique studios to Olympic
            training centers, every rack, bench and treadmill is engineered in
            the pursuit of one goal — <strong>uninterrupted performance</strong>.
          </p>

          <div className={styles.heroMicro}>
            <span className={styles.microItem}>ISO 9001 Certified</span>
            <span className={styles.microDivider}>·</span>
            <span className={styles.microItem}>CE Marked</span>
            <span className={styles.microDivider}>·</span>
            <span className={styles.microItem}>60+ Countries</span>
            <span className={styles.microDivider}>·</span>
            <span className={styles.microItem}>5-Year Frame Warranty</span>
          </div>
        </div>

        <div className={styles.heroScroll} aria-hidden>
          <span>SCROLL</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {STATS.map((s, i) => (
              <div key={i} className={styles.statsItem}>
                <div className={styles.statsNum}>
                  {s.num}<span className={styles.statsNumAccent}>{s.suffix}</span>
                </div>
                <div className={styles.statsLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE / INTRO ── */}
      <section className={styles.introSection}>
        <div className={styles.container}>
          <div className={styles.introGrid}>
            <div className={styles.introLeft}>
              <span className={styles.sectionBadge}>Who We Are</span>
              <h2 className={styles.introTitle}>
                Built by<br />Athletes,<br />Trusted by<br />Facilities.
              </h2>
            </div>

            <div className={styles.introRight}>
              <p className={styles.introLead}>
                Combaxx Fitness is a global manufacturer of premium commercial
                fitness equipment headquartered in Asia with distribution across
                Europe, the Middle East, Africa and the Americas.
              </p>
              <p className={styles.introBody}>
                We don&apos;t re-brand white-label machines. Every product in the
                Combaxx catalogue is designed from the frame up inside our own
                engineering labs, then stamped, welded, powder-coated and tested
                in our fully-integrated production facilities.
              </p>
              <p className={styles.introBody}>
                Our clients include five-star hotel chains, luxury boutique
                studios, military academies, professional sports franchises,
                universities and municipal recreation projects. Whether you need
                a single specialty rack or a full 40,000 sqft turnkey facility,
                the Combaxx team delivers with the same obsessive attention to
                detail.
              </p>
              <p className={styles.introBody}>
                If your floor demands durability, precision and a premium member
                experience — Combaxx Fitness is built for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES / PILLARS ── */}
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionBadge}>Our Pillars</span>
            <h2 className={styles.sectionTitle}>Four Principles<br />That Define Every Build.</h2>
          </div>

          <div className={styles.valuesGrid}>
            {VALUES.map((v, i) => (
              <article key={i} className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <v.icon className={styles.valueIconSvg} aria-hidden strokeWidth={2} />
                </div>
                <div className={styles.valueNum}>{v.num}</div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOURNEY / TIMELINE ── */}
      <section className={styles.journeySection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionBadge}>Our Journey</span>
            <h2 className={styles.sectionTitle}>From Garage Workshop<br />To Global Manufacturer.</h2>
          </div>

          <div className={styles.journeyTrack}>
            {JOURNEY.map((j, i) => (
              <div key={i} className={styles.journeyStep}>
                <div className={styles.journeyStepLeft}>
                  <div className={styles.journeyDot}>
                    <div className={styles.journeyYear}>{j.year}</div>
                  </div>
                  {i !== JOURNEY.length - 1 && <div className={styles.journeyConnector} />}
                </div>
                <div className={styles.journeyContent}>
                  <h3 className={styles.journeyTitle}>{j.title}</h3>
                  <p className={styles.journeyDesc}>{j.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANUFACTURING PROCESS ── */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionBadge}>How We Build</span>
            <h2 className={styles.sectionTitle}>Six Stages of<br />Combaxx Manufacturing.</h2>
          </div>

          <div className={styles.processGrid}>
            {PROCESS.map((p, i) => (
              <article key={i} className={styles.processCard}>
                <div className={styles.processCardBgNum} aria-hidden>0{i + 1}</div>
                <div className={styles.processCardNum}>{p.num}</div>
                <div className={styles.processCardIcon}>
                  <p.icon className={styles.processCardIconSvg} aria-hidden strokeWidth={2} />
                </div>
                <h3 className={styles.processCardTitle}>{p.title}</h3>
                <p className={styles.processCardDesc}>{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className={styles.whySection}>
        <div className={styles.container}>
          <div className={styles.whyGrid}>
            <div className={styles.whyLeft}>
              <div className={styles.sectionHead}>
                <span className={styles.sectionBadge}>Why Combaxx</span>
                <h2 className={styles.sectionTitle}>
                  Why Facilities<br />
                  Switch — And<br />Never Leave.
                </h2>
              </div>

              <div className={styles.whyList}>
                {WHY_ITEMS.map((w, i) => (
                  <div key={i} className={styles.whyItem}>
                    <div className={styles.whyCheck}>
                      <CheckCircle2 className={styles.whyCheckSvg} aria-hidden strokeWidth={3} />
                    </div>
                    <div className={styles.whyText}>
                      <h3 className={styles.whyItemTitle}>{w.title}</h3>
                      <p className={styles.whyItemDesc}>{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.whyRight} aria-hidden>
              <div className={styles.whyVisual}>
                <div className={styles.whyVisualInner}>
                  <div className={styles.whyVisualBig}>
                    Built for<br />
                    <span>Commercial</span><br />
                    Performance.
                  </div>
                  <div className={styles.whyVisualText}>
                    SERIES LINEUP
                  </div>
                  <div className={styles.whyVisualStrip}>
                    <span className={styles.whyVisualTag}>Titan</span>
                    <span className={styles.whyVisualTag}>Ironcore</span>
                    <span className={styles.whyVisualTag}>Precision</span>
                    <span className={styles.whyVisualTag}>Strata</span>
                    <span className={styles.whyVisualTag}>Anchor</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTA
        badge="Stay Updated"
        title="Building Your Next Facility?"
        description="Subscribe to our blog for the latest gym design guides, equipment maintenance tips, and bulk pricing updates from Combaxx Fitness."
        primaryButtonText="Get in Touch"
        primaryButtonLink="/contact"
        secondaryButtonText="Browse Equipment"
        secondaryButtonLink="/shop"
      />
    </div>
  )
}

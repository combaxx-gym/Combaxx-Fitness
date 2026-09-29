import type { Metadata } from 'next'
import Link from 'next/link'
import MaterialsAccordion from '@/components/MaterialsAccordion'
import CTA from '@/components/CTA'
import styles from '@/styles/pages/materials.module.css'

export const metadata: Metadata = {
  title: 'Materials Information | Commercial Gym Equipment',
  description: 'Discover the premium materials, engineering processes, and quality certifications behind every piece of equipment we manufacture.',
}

const MATERIALS = [
  {
    id: 'steel',
    num: '01',
    name: 'High-Tensile Steel',
    category: 'Structural Frame',
    color: '#6b7280',
    hex: '#6B7280',
    properties: ['EN 10219 Certified', 'Tensile strength: 550 MPa', 'Anti-corrosion treatment', 'Welded to 3mm tolerance'],
    desc: 'Our frames are fabricated from high-tensile structural steel, heat-treated and precision-welded. Every tube, joint and bracket is engineered to handle the continuous load cycles of a commercial facility — not just occasional home use.',
    weight: 'Frame Weight: 25–280 kg',
    certLabel: 'Commercial Frame Spec',
  },
  {
    id: 'upholstery',
    num: '02',
    name: 'Performance Upholstery',
    category: 'Seating & Padding',
    color: '#1a1a2e',
    hex: '#1A1A2E',
    properties: ['High-density foam (60 kg/m³)', 'Anti-microbial fabric coating', 'UV-resistant outer layer', 'Tear-strength: 400N'],
    desc: 'The upholstery on every seat, back pad and handle is engineered for hygiene, longevity and comfort under daily commercial use. Our foam maintains its shape after 500,000+ compression cycles, and the outer material resists sweat, cleaning agents and UV degradation.',
    weight: 'Foam Density: 60 kg/m³',
    certLabel: 'OEKO-TEX Standard 100',
  },
  {
    id: 'coating',
    num: '03',
    name: 'Automotive Paint',
    category: 'Surface Finish',
    color: '#FF3333',
    hex: '#FF3333',
    properties: [
      'Multi-layer base + clear coat',
      'UV-resistant high-gloss finish',
      'Chip & scratch resistant',
      'Custom colour matching available',
    ],
    desc: 'Every frame receives a multi-stage automotive paint system — primer, colour base, and protective clear coat — applied in controlled spray booths. The finish delivers a durable, high-gloss surface that resists sweat, cleaning chemicals, UV fade, and daily commercial wear. Available in standard black and grey, or custom colours for branded facility builds.',
    weight: 'Paint System: 3-Layer Coat',
    certLabel: 'Finish Durability Tested',
  },
  {
    id: 'hardware',
    num: '04',
    name: 'Stainless Steel Hardware',
    category: 'Fasteners & Details',
    color: '#d1d5db',
    hex: '#D1D5DB',
    properties: ['Grade 316 marine stainless', 'Anti-seize threaded inserts', 'DIN 933 bolt standard', '20+ year corrosion life'],
    desc: 'Every visible fastener, adjustment pin, and chrome detail is manufactured from Grade 316 marine-grade stainless steel. This specification — typically found in marine and food processing environments — guarantees zero corrosion even in high-humidity gym environments.',
    weight: 'Grade: AISI 316',
    certLabel: 'ASTM A276 Certified',
  },
]

const PROCESS = [
  { step: '01', title: 'Material Sourcing', desc: 'All raw materials are sourced from certified European suppliers. Every batch is tested for tensile strength, chemical composition, and surface quality before entering production.' },
  { step: '02', title: 'Precision Fabrication', desc: 'CNC laser cutting and robotic MIG welding ensure dimensional accuracy to ±0.5mm. Each weld is visually inspected and a 5% sample batch undergoes destructive pull testing.' },
  { step: '03', title: 'Surface Treatment', desc: 'Shot-blasting removes mill scale and surface contamination. A primer stage locks adhesion, then frames move into spray booths for multi-layer automotive paint and clear-coat finishing.' },
  { step: '04', title: 'Assembly & QC', desc: 'Each unit is assembled by trained technicians against a 47-point checklist. Load testing, adjustment verification, and safety pin tests are completed before packaging.' },
  { step: '05', title: 'Final Inspection', desc: 'A final audit covering structural integrity, surface finish, upholstery seam quality, and hardware torque values is completed. Documentation pack issued with each unit.' },
]

const FINISHES = [
  { name: 'Graphite Black', hex: '#1a1a1a' },
  { name: 'Steel Grey', hex: '#4b5563' },
  { name: 'Slate Blue', hex: '#1e3a5f' },
  { name: 'Performance Red', hex: '#FF3333' },
  { name: 'Champagne', hex: '#c8a96e' },
  { name: 'Pure White', hex: '#f5f5f5' },
  { name: 'Anthracite', hex: '#2d2d2d' },
  { name: 'Forest Green', hex: '#1a3a2a' },
]

const HERO_FLOATS = [
  {
    id: 'sourcing',
    label: 'Material Sourcing',
    meta: 'Certified',
    image: '/images/Material Sourcing.webp',
    pos: 'a' as const,
  },
  {
    id: 'engineering',
    label: 'Precision Engineering',
    meta: '±0.5 mm',
    image: '/images/Precision Engineering.webp',
    pos: 'b' as const,
  },
  {
    id: 'testing',
    label: 'Quality Testing',
    meta: '47-Point QC',
    image: '/images/Quality Testing.webp',
    pos: 'c' as const,
  },
]

export default function MaterialsPage() {
  const floatPos = {
    a: styles.float_a,
    b: styles.float_b,
    c: styles.float_c,
  }

  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden>
          <div className={styles.heroGlow} />
          <div className={styles.heroTexture} />
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroFloats} aria-hidden>
          {HERO_FLOATS.map((item) => (
            <div
              key={item.id}
              className={`${styles.floatCard} ${floatPos[item.pos]}`}
            >
              <div className={styles.floatMedia}>
                <img
                  src={item.image}
                  alt=""
                  className={styles.floatImg}
                />
              </div>
              <div className={styles.floatCopy}>
                <span className={styles.floatLabel}>{item.label}</span>
                <span className={styles.floatMeta}>{item.meta}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.breadLink}>Home</Link>
            <span className={styles.breadSep}>/</span>
            <span>Materials Information</span>
          </nav>
          <h1 className={styles.heroTitle}>
            Built With<br />
            <span className={styles.heroTitleAccent}>Precision</span><br />
            Crafted to Last
          </h1>
          <p className={styles.heroDesc}>
            Every frame, pad, cable, and fastener has been selected for one reason: to perform under the harshest commercial conditions, day after day, year after year.
          </p>
        </div>
        <div className={styles.heroScroll}>
          <span>Scroll to explore</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className={styles.introSection}>
        <div className={styles.container}>
          <div className={styles.introGrid}>
            <div className={styles.introLeft}>
              <span className={styles.sectionBadge}>Our Standard</span>
              <h2 className={styles.introTitle}>
                No Compromises.<br />Ever.
              </h2>
            </div>
            <div className={styles.introRight}>
              <p className={styles.introLead}>
                Commercial gym equipment fails when manufacturers cut corners on materials. We don&apos;t. Every component specification is chosen for longevity, safety, and performance — not cost reduction.
              </p>
              <p className={styles.introBody}>
                Our engineering team reviews every material supplier annually. Raw materials are tested on-arrival at our facility. Finished goods undergo a 47-point quality checklist before dispatch. This is what &quot;commercial grade&quot; actually means.
              </p>
            </div>
          </div>
          <div className={styles.statsGrid}>
            <article className={styles.statCard}>
              <span className={styles.statIndex}>01</span>
              <span className={styles.statNum}>47</span>
              <span className={styles.statLabel}>Point QC Checklist</span>
            </article>
            <article className={styles.statCard}>
              <span className={styles.statIndex}>02</span>
              <span className={styles.statNum}>2yr</span>
              <span className={styles.statLabel}>Frame Warranty</span>
            </article>
            <article className={styles.statCard}>
              <span className={styles.statIndex}>03</span>
              <span className={styles.statNum}>500K</span>
              <span className={styles.statLabel}>Cycle Tested</span>
            </article>
            <article className={styles.statCard}>
              <span className={styles.statIndex}>04</span>
              <span className={styles.statNum}>3-Layer</span>
              <span className={styles.statLabel}>Automotive Paint</span>
            </article>
          </div>
        </div>
      </section>

      {/* ── MATERIALS ACCORDION ── */}
      <section className={styles.materialsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionBadge}>Material Specification</span>
            <h2 className={styles.sectionTitle}>What&apos;s Inside Every Machine</h2>
          </div>
          <MaterialsAccordion materials={MATERIALS} />
        </div>
      </section>

      {/* ── PROCESS ROADMAP ── */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionBadge}>From Raw to Ready</span>
            <h2 className={styles.sectionTitle}>Manufacturing Process</h2>
          </div>

          <div className={styles.processRoad}>
            {PROCESS.map((p, i) => {
              const isLeft = i % 2 === 0
              const card = (
                <article className={styles.processCard}>
                  <span className={styles.processCardTag}>Step {p.step}</span>
                  <h3 className={styles.processTitle}>{p.title}</h3>
                  <p className={styles.processDesc}>{p.desc}</p>
                </article>
              )

              return (
                <div
                  key={p.step}
                  className={`${styles.processStep} ${isLeft ? styles.processStepLeft : styles.processStepRight}`}
                >
                  {isLeft ? card : <div className={styles.processPad} aria-hidden />}
                  <div className={styles.processMilestone}>
                    <span>{p.step}</span>
                  </div>
                  {isLeft ? <div className={styles.processPad} aria-hidden /> : card}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CUSTOM FINISHES ── */}
      <section className={styles.finishesSection}>
        <div className={styles.container}>
          <div className={styles.finishesPanel}>
            <div className={styles.finishesHead}>
              <div>
                <span className={styles.sectionBadge}>Bespoke Options</span>
                <h2 className={styles.finishesTitle}>
                  Your Brand.<br />Our Equipment.
                </h2>
                <p className={styles.finishesDesc}>
                  Custom automotive paint colours, branded upholstery, laser-engraved logos — we offer full bespoke finishing for facilities that want a truly unique look. Minimum order quantities apply.
                </p>
              </div>
              <div className={styles.finishesCopy}>
                <div className={styles.finishesActions}>
                  <Link href="/contact" className={styles.finishesCta}>
                    Request Custom Quote
                  </Link>
                </div>
              </div>
            </div>

            <div className={styles.swatchGrid}>
              {FINISHES.map((f) => (
                <div key={f.name} className={styles.swatch}>
                  <div className={styles.swatchColor} style={{ background: f.hex }} />
                  <div className={styles.swatchMeta}>
                    <span className={styles.swatchName}>{f.name}</span>
                    <span className={styles.swatchHex}>{f.hex}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
        <CTA
          title="Need Full Material Documentation?"
          description="Our technical team can provide full material data sheets, test reports, and compliance certificates for any product in our range."
          primaryButtonText="Request Documentation"
          primaryButtonLink="/contact"
          secondaryButtonText="Browse Products"
          secondaryButtonLink="/shop"
        />

    </div>
  )
}

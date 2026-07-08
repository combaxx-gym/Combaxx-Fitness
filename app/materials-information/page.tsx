import type { Metadata } from 'next'
import Link from 'next/link'
import MaterialsAccordion from '@/components/MaterialsAccordion'
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
    certLabel: 'ISO 9001 Frame Standard',
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
    name: 'Powder Coating',
    category: 'Surface Finish', 
    color: '#FF3333',
    hex: '#FF3333',
    properties: ['Electrostatic application', '60–80 micron thickness', 'Salt spray test: 500h', 'RAL custom colors available'],
    desc: 'Our powder coating process uses electrostatic application at 180°C cure temperature, achieving a 60–80 micron film that resists chipping, scratching, and chemical attack. Available in standard black and grey, or custom RAL colors for branded facility builds.',
    weight: 'Coating Thickness: 60–80μm',
    certLabel: 'ISO 2409 Adhesion Test',
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
  {
    id: 'cables',
    num: '05',
    name: 'Aircraft-Grade Cable',
    category: 'Cable Systems',
    color: '#374151',
    hex: '#374151',
    properties: ['7×19 strand configuration', 'Min. break load: 12 kN', 'Nylon-jacketed', 'Factory pre-stretched'],
    desc: 'Our cable systems use 7×19 aircraft-specification wire rope — the same strand configuration used in aviation and rigging applications. Pre-stretched at the factory to eliminate initial stretch, nylon-jacketed to reduce friction, and rated to a minimum breaking load of 12,000 Newtons.',
    weight: 'Break Load: 12,000 N',
    certLabel: 'DIN 3060 / EN 12385',
  },
]

const PROCESS = [
  { step: '01', title: 'Material Sourcing', desc: 'All raw materials are sourced from certified European suppliers. Every batch is tested for tensile strength, chemical composition, and surface quality before entering production.' },
  { step: '02', title: 'Precision Fabrication', desc: 'CNC laser cutting and robotic MIG welding ensure dimensional accuracy to ±0.5mm. Each weld is visually inspected and a 5% sample batch undergoes destructive pull testing.' },
  { step: '03', title: 'Surface Treatment', desc: 'Shot-blasting removes mill scale and surface contamination. Pre-treatment phosphate coat improves paint adhesion by 300% before electrostatic powder application.' },
  { step: '04', title: 'Assembly & QC', desc: 'Each unit is assembled by trained technicians against a 47-point checklist. Load testing, adjustment verification, and safety pin tests are completed before packaging.' },
  { step: '05', title: 'Final Inspection', desc: 'A final audit covering structural integrity, surface finish, upholstery seam quality, and hardware torque values is completed. Documentation pack issued with each unit.' },
]

const CERTS = [
  { code: 'ISO 9001', name: 'Quality Management' },
  { code: 'EN 957', name: 'Fitness Equipment Standard' },
  { code: 'CE Marked', name: 'European Conformity' },
  { code: 'ISO 20957', name: 'Stationary Training' },
  { code: 'OEKO-TEX', name: 'Textile Safety' },
  { code: 'RoHS', name: 'Hazardous Substances' },
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

export default function MaterialsPage() {
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
            <span>Materials Information</span>
          </nav>
          <span className={styles.heroBadge}>Engineering Excellence</span>
          <h1 className={styles.heroTitle}>
            Built With<br />
            <span className={styles.heroTitleAccent}>Precision</span><br />
            Crafted to Last
          </h1>
          <p className={styles.heroDesc}>
            Every frame, pad, cable, and fastener has been selected for one reason: to perform under the harshest commercial conditions, day after day, year after year.
          </p>
          <div className={styles.heroMicro}>
            <span className={styles.microItem}>ISO 9001 Certified</span>
            <span className={styles.microDivider}>·</span>
            <span className={styles.microItem}>CE Marked</span>
            <span className={styles.microDivider}>·</span>
            <span className={styles.microItem}>EN 957 Compliant</span>
          </div>
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
          <div className={styles.introBanner}>
            <div className={styles.introBannerItem}>
              <span className={styles.introBannerNum}>47</span>
              <span className={styles.introBannerLabel}>Point QC Checklist</span>
            </div>
            <div className={styles.introBannerDivider} />
            <div className={styles.introBannerItem}>
              <span className={styles.introBannerNum}>5yr</span>
              <span className={styles.introBannerLabel}>Frame Warranty</span>
            </div>
            <div className={styles.introBannerDivider} />
            <div className={styles.introBannerItem}>
              <span className={styles.introBannerNum}>500K</span>
              <span className={styles.introBannerLabel}>Cycle Tested</span>
            </div>
            <div className={styles.introBannerDivider} />
            <div className={styles.introBannerItem}>
              <span className={styles.introBannerNum}>6</span>
              <span className={styles.introBannerLabel}>International Certs</span>
            </div>
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

      {/* ── PROCESS TIMELINE ── */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionBadge}>From Raw to Ready</span>
            <h2 className={styles.sectionTitle}>Manufacturing Process</h2>
          </div>
          <div className={styles.processTrack}>
            {PROCESS.map((p, i) => (
              <div key={p.step} className={styles.processStep}>
                <div className={styles.processStepLeft}>
                  <div className={styles.processNum}>{p.step}</div>
                  {i < PROCESS.length - 1 && <div className={styles.processConnector} />}
                </div>
                <div className={styles.processContent}>
                  <h3 className={styles.processTitle}>{p.title}</h3>
                  <p className={styles.processDesc}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className={styles.certsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionBadge}>Verified Quality</span>
            <h2 className={styles.sectionTitle}>Certifications & Standards</h2>
          </div>
          <div className={styles.certsGrid}>
            {CERTS.map((c) => (
              <div key={c.code} className={styles.certCard}>
                <div className={styles.certShield}>
                  <svg viewBox="0 0 40 46" fill="none" className={styles.certShieldSvg}>
                    <path d="M20 2L36 9V21C36 31 29 40 20 44C11 40 4 31 4 21V9L20 2Z" stroke="#FF3333" strokeWidth="1.5" fill="rgba(255,51,51,0.06)" />
                  </svg>
                </div>
                <div className={styles.certCode}>{c.code}</div>
                <div className={styles.certName}>{c.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CUSTOM FINISHES ── */}
      <section className={styles.finishesSection}>
        <div className={styles.container}>
          <div className={styles.finishesInner}>
            <div className={styles.finishesLeft}>
              <span className={styles.sectionBadge}>Bespoke Options</span>
              <h2 className={styles.finishesTitle}>
                Your Brand.<br />Our Equipment.
              </h2>
              <p className={styles.finishesDesc}>
                Custom powder coat colours, branded upholstery, laser-engraved logos — we offer full bespoke finishing for facilities that want a truly unique look. Minimum order quantities apply.
              </p>
              <Link href="/contact" className={styles.finishesCta}>
                Request Custom Quote
              </Link>
            </div>
            <div className={styles.finishesRight}>
              <div className={styles.swatchGrid}>
                {FINISHES.map((f) => (
                  <div key={f.name} className={styles.swatch}>
                    <div className={styles.swatchColor} style={{ background: f.hex }} />
                    <span className={styles.swatchName}>{f.name}</span>
                  </div>
                ))}
              </div>
              <p className={styles.finishesNote}>
                + Custom RAL colours available on request
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaGlow} />
            <h2 className={styles.ctaTitle}>Need Full Material Documentation?</h2>
            <p className={styles.ctaDesc}>
              Our technical team can provide full material data sheets, test reports, and compliance certificates for any product in our range.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact" className={styles.ctaBtnRed}>Request Documentation</Link>
              <Link href="/shop" className={styles.ctaBtnOutline}>Browse Products</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

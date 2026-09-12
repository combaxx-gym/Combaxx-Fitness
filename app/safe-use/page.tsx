import type { Metadata } from 'next'
import Link from 'next/link'
import CTA from '@/components/CTA'
import styles from '@/styles/pages/legal.module.css'

export const metadata: Metadata = {
  title: 'Safe Use of Combaxx Equipment | User Guidelines',
  description: 'Important safety instructions, usage guidelines, and maintenance tips for all Combaxx commercial fitness equipment.',
}

const TOC = [
  { href: '#overview', label: 'Overview' },
  { href: '#before-use', label: 'Before Every Use' },
  { href: '#safety-gear', label: 'Required Safety Gear' },
  { href: '#proper-form', label: 'Proper Form & Technique' },
  { href: '#free-weights', label: 'Free Weights & Racks' },
  { href: '#cardio', label: 'Cardio Equipment' },
  { href: '#cable-strength', label: 'Cable & Strength Machines' },
  { href: '#facility-rules', label: 'Gym Facility Best Practices' },
  { href: '#maintenance', label: 'Maintenance & Inspections' },
  { href: '#warning-signs', label: 'Warning Signs & Damage' },
  { href: '#contact', label: 'Need Help?' },
]

export default function SafeUsePage() {
  return (
    <div className={styles.page}>

      {/* ═══════ HERO (OUTSIDE CONTAINER) ═══════ */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroOverlay} />
          <div className={styles.heroPattern} />
        </div>
        <div className={styles.heroInner}>
          <nav className={styles.heroBreadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.heroBreadcrumbLink}>Home</Link>
            <span className={styles.heroBreadcrumbSep}>/</span>
            <span>Safe Use</span>
          </nav>
          <span className={styles.heroBadge}>User Safety</span>
          <h1 className={styles.heroTitle}>Safe Use of Combaxx Products</h1>
          <p className={styles.heroDesc}>
            Combaxx equipment is engineered to commercial safety standards. These guidelines
            help athletes, facility operators, and owners get the maximum lifespan from every
            unit — while keeping every user safe on the floor.
          </p>
        </div>
      </section>

      {/* ═══════ CONTENT (INSIDE CANONICAL CONTAINER) ═══════ */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.contentGrid}>

            {/* Sidebar TOC */}
            <aside className={styles.toc} aria-label="Page contents">
              <div className={styles.tocLabel}>Contents</div>
              <ul className={styles.tocList}>
                {TOC.map(t => (
                  <li key={t.href}><Link href={t.href} className={styles.tocItem}>{t.label}</Link></li>
                ))}
              </ul>
            </aside>

            {/* Article */}
            <article className={styles.article}>
              <span className={styles.lastUpdated}>Last updated: September 2026</span>

              {/* 1 */}
              <section id="overview" className={styles.articleBlock}>
                <h2>Overview</h2>
                <p>
                  Every Combaxx piece is certified for commercial use — engineered to withstand
                  thousands of load cycles per day. However, certification does not replace
                  <strong> proper training, common sense, and daily inspection.</strong>
                  Serious injury can result from improper assembly, misuse, worn parts, or
                  attempts to lift beyond a user&apos;s ability.
                </p>
                <p>
                  These guidelines are a complement to the printed User &amp; Installation
                  Manual shipped with every unit. Always defer to the serial-number-specific
                  manual for exact weight ratings, torque values, and replacement part numbers.
                </p>
              </section>

              {/* 2 */}
              <section id="before-use" className={styles.articleBlock}>
                <h2>Before Every Use (5-Second Check)</h2>
                <p>Every user — or a facility floor manager — must visually confirm:</p>
                <ul>
                  <li>No visible cracks, bent tubes, or broken welds on frames and uprights.</li>
                  <li>All adjustment pins, J-cups, and pop-pins are fully seated and locked.</li>
                  <li>Fasteners (bolts, nuts, screws) appear tight; nothing rattles when shaken.</li>
                  <li>Guides, rails, and weight plate holders are clear of debris or obstructions.</li>
                  <li>Cables are seated inside pulleys; no fraying, kinks, or bird-caging visible.</li>
                  <li>Upholstery is intact; no exposed foam or sharp edges on pads.</li>
                  <li>Floor area around the machine is clear of plates, bands, and bottles.</li>
                </ul>
              </section>

              {/* 3 */}
              <section id="safety-gear" className={styles.articleBlock}>
                <h2>Required Safety Gear</h2>
                <ul>
                  <li><strong>Closed-toe, non-slip athletic footwear</strong> at all times.</li>
                  <li>Chalk or liquid grip for free-weights, deadlift platforms and pull-up bars.</li>
                  <li>A properly fitted <strong>weightlifting belt</strong> for maximal attempts on squats, deadlifts, and rows.</li>
                  <li>Spotters for any lift at 90%+ estimated 1RM on bench, squat, and overhead movements.</li>
                  <li>Spotter arms or safety straps <strong>always engaged</strong> when using Combaxx power racks or half racks alone.</li>
                </ul>
              </section>

              {/* 4 */}
              <div className={styles.highlightBox}>
                <div className={styles.highlightTitle}>General Rule</div>
                <p>
                  If you are unsure how to use a machine, <strong>do not guess.</strong>
                  Ask a qualified trainer, scan the QR code printed on every frame sticker for a
                  product video, or contact Combaxx support. Correct form always takes priority
                  over additional weight.
                </p>
              </div>

              {/* 5 */}
              <section id="proper-form" className={styles.articleBlock}>
                <h2>Proper Form &amp; Technique</h2>
                <p>
                  Combaxx equipment is designed to enforce a natural biomechanical path; but a
                  machine cannot prevent user error. Respect the following:
                </p>
                <ol>
                  <li>Adjust seat height, back rest, and roller pads BEFORE loading any weight.</li>
                  <li>Start with a very light warm-up set even on machines.</li>
                  <li>Maintain <strong>controlled eccentric (lowering) tempo</strong> — avoid dropping or slamming stacks unless the machine is specifically rated for drop use.</li>
                  <li>Never use momentum to complete repetitions; controlled full range of motion.</li>
                  <li>Use collars / spring clips on <em>every</em> Olympic barbell set — even with light plates.</li>
                </ol>
              </section>

              <hr className={styles.articleDivider} />

              {/* 6 */}
              <section id="free-weights" className={styles.articleBlock}>
                <h2>Free Weights, Racks &amp; Platforms</h2>
                <h3>Power Racks / Half Racks / Squat Stands</h3>
                <ul>
                  <li>Set safety straps <strong>before</strong> un-racking the bar.</li>
                  <li>Never exceed the posted rackable max (see rating label on each upright).</li>
                  <li>Do not perform kipping pull-ups on racks not rated for CrossFit-style loads — use a dedicated rig.</li>
                </ul>
                <h3>Benches</h3>
                <ul>
                  <li>Ensure bench feet are fully on the floor; never block rear legs with plates.</li>
                  <li>Use spotters on bench press over 60% of 1RM — spotter arms alone do not replace a human spotter.</li>
                </ul>
                <h3>Olympic Plates &amp; Bars</h3>
                <ul>
                  <li>Load bars symmetrically — one plate at a time alternating sides.</li>
                  <li>Drop only bumper plates on certified platforms. Never drop cast-iron, change plates, or micro plates.</li>
                </ul>
              </section>

              {/* 7 */}
              <section id="cardio" className={styles.articleBlock}>
                <h2>Cardio Equipment (Treadmills, Bikes, Rowers, Ellipticals)</h2>
                <ul>
                  <li><strong>Treadmills</strong> — always clip the safety lanyard to clothing. Start at walking speed. Do not attempt to step off at running speed.</li>
                  <li><strong>Bikes</strong> — adjust seat height so knee is 5–10° short of full lockout at pedal bottom.</li>
                  <li><strong>Rowers</strong> — strap feet in firmly; drive with legs first, then hinge, then pull arms.</li>
                  <li>Allow at least 60 cm of clear space to the rear and sides of every cardio unit.</li>
                  <li>Wipe touchscreens, handlebars, and heart-rate sensors after every use with an isopropyl wipe rated for electronics.</li>
                </ul>
              </section>

              {/* 8 */}
              <section id="cable-strength" className={styles.articleBlock}>
                <h2>Cable Machines &amp; Selectorized Strength</h2>
                <ul>
                  <li>Verify that the weight stack selector pin is <em>fully inserted</em> through the selected plate hole — not sitting partially between plates.</li>
                  <li>Never stand directly under high-pulley loading arms or lat bar while weight is selected.</li>
                  <li>Do not drop weight stacks — controlled return every rep. Dropped stacks damage guide rods and void warranty.</li>
                  <li>Inspect cable condition weekly: any fray, kink, or corrosion → immediately tag machine out of service and contact Combaxx for replacement.</li>
                  <li>Do not attach bands, chains, or third-party accessories to pulleys or handles unless explicitly approved in the equipment manual.</li>
                </ul>
              </section>

              {/* 9 */}
              <section id="facility-rules" className={styles.articleBlock}>
                <h2>Gym Facility Best Practices</h2>
                <ul>
                  <li><strong>Re-rack all weights, dumbbells, and attachments</strong> to their labeled position after use.</li>
                  <li>Do not drag plates or drop dumbbells on rubber flooring; rubber protects against <em>accidental</em> drops, not repeated abuse.</li>
                  <li>Keep water bottles, phones, and personal items in cubbies — never on or under equipment.</li>
                  <li>Wipe upholstery, handles, and touch surfaces after use with an approved non-abrasive disinfectant.</li>
                  <li>Report any squeak, wobble, damaged pad, or loose bolt to the facility manager immediately — do not attempt to &ldquo;band-aid&rdquo; it with tape.</li>
                </ul>
              </section>

              {/* 10 */}
              <section id="maintenance" className={styles.articleBlock}>
                <h2>Maintenance &amp; Scheduled Inspections</h2>
                <p>
                  To keep Combaxx equipment safe and preserve warranty coverage, facility owners
                  must complete the following schedule:
                </p>
                <div className={styles.highlightBox} style={{ marginTop: '1rem' }}>
                  <div className={styles.highlightTitle}>Owner&apos;s Checklist</div>
                  <ul style={{ marginTop: '0.5rem' }}>
                    <li><strong>Daily</strong> — wipe down surfaces; visually inspect cables, pins, welds, floor bolts.</li>
                    <li><strong>Weekly</strong> — torque connection points on racks and benches (per manual values); lubricate guide rods.</li>
                    <li><strong>Monthly</strong> — full unit inspection; cable tension check; belt tension on cardios.</li>
                    <li><strong>Quarterly</strong> — load-test all adjustable racks, benches, and spotter arms.</li>
                    <li><strong>Annually</strong> — Combaxx on-site or remote audit (included in Premium Support packages).</li>
                  </ul>
                </div>
              </section>

              {/* 11 */}
              <section id="warning-signs" className={styles.articleBlock}>
                <h2>Warning Signs — Take Equipment Out of Service</h2>
                <p>
                  Immediately tag the machine &ldquo;Out of Service&rdquo; and contact Combaxx
                  technical support if ANY of the following appear:
                </p>
                <ul>
                  <li>Cracked, bent, or deformed structural tubes on racks, frames, or uprights.</li>
                  <li>Broken or porous welds — visual cracks, rust bleeding through seams.</li>
                  <li>Frayed, kinked, or rusted cables; cable pop-out of pulley groove.</li>
                  <li>Weight plates or racks with chips exposing sharp edges.</li>
                  <li>Loose or spinning floor anchor bolts.</li>
                  <li>Any electrical smell, smoke, screen error, or unresponsive console on cardio.</li>
                  <li>Torn upholstery with exposed hard plastic or wood substrate.</li>
                </ul>
              </section>

              {/* 12 */}
              <section id="contact" className={styles.articleBlock}>
                <h2>Need Help?</h2>
                <p>
                  Our technical support team responds to 95% of inquiries within one business day.
                  Have the equipment <strong>serial number and model</strong> (printed on the frame
                  QR sticker) ready for fastest service.
                </p>
                <p>
                  Email <strong>support@combaxxfitness.com</strong> or call <strong>+92 000 0000000</strong>,
                  Mon–Sat 9:00 – 18:00 PKT.
                </p>
              </section>
            </article>
          </div>
        </div>
      </section>

      <CTA
        badge="Need more details?"
        title="Product Manuals & CAD Downloads"
        description="Serial-number-specific manuals, dimensional drawings, 3D files, and certification documents for every Combaxx unit are available in the product downloads section."
        primaryButtonText="Browse Equipment"
        primaryButtonLink="/shop"
        secondaryButtonText="Contact Support"
        secondaryButtonLink="/contact"
      />
    </div>
  )
}

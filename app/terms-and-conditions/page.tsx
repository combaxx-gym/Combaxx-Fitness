import type { Metadata } from 'next'
import Link from 'next/link'
import CTA from '@/components/CTA'
import styles from '@/styles/pages/legal.module.css'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Combaxx Fitness',
  description: 'Terms of service for Combaxx Fitness — website use, quotations, orders, delivery, warranty, returns, payment, IP rights, dispute resolution, and more.',
}

const TOC = [
  { href: '#acceptance', label: 'Acceptance' },
  { href: '#scope', label: 'Scope' },
  { href: '#site-use', label: 'Acceptable Website Use' },
  { href: '#accounts', label: 'User Accounts' },
  { href: '#quotations', label: 'Quotations' },
  { href: '#orders', label: 'Orders & Contract Formation' },
  { href: '#pricing-taxes', label: 'Pricing & Taxes' },
  { href: '#payment', label: 'Payment Terms' },
  { href: '#delivery', label: 'Delivery, Fulfillment, Risk' },
  { href: '#title', label: 'Passing of Title' },
  { href: '#warranty', label: 'Limited Warranty' },
  { href: '#warranty-exclusions', label: 'Warranty Exclusions' },
  { href: '#returns', label: 'Returns & Cancellations' },
  { href: '#ip', label: 'Intellectual Property' },
  { href: '#user-content', label: 'User-Generated Content' },
  { href: '#confidentiality', label: 'Confidentiality' },
  { href: '#liability', label: 'Limitation of Liability' },
  { href: '#indemnity', label: 'Indemnification' },
  { href: '#force-majeure', label: 'Force Majeure' },
  { href: '#assignment', label: 'Assignment & Sub-contracting' },
  { href: '#entirety', label: 'Entire Agreement' },
  { href: '#severability', label: 'Severability & Waiver' },
  { href: '#law-jurisdiction', label: 'Governing Law & Jurisdiction' },
  { href: '#dispute', label: 'Dispute Resolution' },
  { href: '#amendments', label: 'Amendments' },
  { href: '#contact', label: 'Contact' },
]

export default function TermsPage() {
  return (
    <div className={styles.page}>

      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroOverlay} />
          <div className={styles.heroPattern} />
        </div>
        <div className={styles.heroInner}>
          <nav className={styles.heroBreadcrumb}>
            <Link href="/" className={styles.heroBreadcrumbLink}>Home</Link>
            <span className={styles.heroBreadcrumbSep}>/</span>
            <span>Terms &amp; Conditions</span>
          </nav>
          <span className={styles.heroBadge}>Legal & Policies</span>
          <h1 className={styles.heroTitle}>Terms and Conditions</h1>
          <p className={styles.heroDesc}>
            The full set of terms that apply when you visit combaxxfitness.com, request a
            quotation, place an order, or use Combaxx Fitness products and services. Please
            read them carefully.
          </p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.contentGrid}>

            <aside className={styles.toc}>
              <div className={styles.tocLabel}>Contents</div>
              <ul className={styles.tocList}>
                {TOC.map(t => (
                  <li key={t.href}><Link href={t.href} className={styles.tocItem}>{t.label}</Link></li>
                ))}
              </ul>
            </aside>

            <article className={styles.article}>
              <span className={styles.lastUpdated}>Effective: September 01, 2026 · Last updated: September 05, 2026</span>

              <section id="acceptance" className={styles.articleBlock}>
                <h2>1. Acceptance</h2>
                <p>
                  By using the website, submitting an inquiry, requesting a quotation,
                  registering a user account, or placing an order for any Combaxx product or
                  service, you (the &ldquo;Customer&rdquo; or &ldquo;User&rdquo;) confirm that
                  you have read, understood, and agree to be bound by these Terms &amp;
                  Conditions (the &ldquo;Agreement&rdquo;) and our <Link href="/privacy-policy">Privacy Policy</Link> and <Link href="/cookie-policy">Cookie Policy</Link>.
                </p>
                <p>
                  If you do not accept these terms, you must discontinue use of our website
                  and services immediately.
                </p>
              </section>

              <section id="scope" className={styles.articleBlock}>
                <h2>2. Scope &amp; Definitions</h2>
                <ul>
                  <li><strong>&ldquo;Goods&rdquo;</strong> means any gym equipment, accessories, spare parts, installation kits, and digital deliverables (CAD files, BIM files, manuals, warranties) supplied by Combaxx.</li>
                  <li><strong>&ldquo;Services&rdquo;</strong> includes quotation, project consultation, site survey, installation, after-sales, maintenance, and warranty services.</li>
                  <li><strong>&ldquo;Customer&rdquo;</strong> means any business, institution, or end consumer requesting or purchasing Goods / Services.</li>
                  <li><strong>&ldquo;Combaxx&rdquo;</strong> means Combaxx Fitness (Private) Limited, its affiliated distributors, dealers, or authorized service partners as applicable.</li>
                </ul>
              </section>

              <section id="site-use" className={styles.articleBlock}>
                <h2>3. Acceptable Website Use</h2>
                <p>You agree not to:</p>
                <ul>
                  <li>Attempt to probe, scan, test or breach security of any Combaxx system, CMS, API, or admin area.</li>
                  <li>Interfere with, overload, or launch DDoS-style traffic against the website or connected services.</li>
                  <li>Scrape product data, pricing, or media for competitive purposes without prior written consent.</li>
                  <li>Impersonate Combaxx staff, dealers, or another Customer on forums, review platforms, or support channels.</li>
                  <li>Distribute malware, viruses, or malicious code through uploads or User-Generated Content (§15).</li>
                </ul>
              </section>

              <section id="accounts" className={styles.articleBlock}>
                <h2>4. User Accounts &amp; Dealer Portals</h2>
                <ul>
                  <li>Customers may be invited to a secure portal (Clerk-based) to track quotes, orders, invoices, and warranty registrations.</li>
                  <li>You are responsible for safeguarding credentials and for all activity under your login.</li>
                  <li>You must notify Combaxx immediately of any suspected unauthorized account use.</li>
                  <li>We reserve the right to suspend accounts with abusive, fraudulent, or unpaid-balance activity without prior notice.</li>
                </ul>
              </section>

              <section id="quotations" className={styles.articleBlock}>
                <h2>5. Quotations</h2>
                <ul>
                  <li>All Combaxx quotations are valid for <strong>30 calendar days</strong> from the quoted date unless explicitly stated otherwise in writing.</li>
                  <li>Quotation pricing is subject to re-confirmation if the Customer makes a material change to configuration, quantities, delivery destination, or service scope.</li>
                  <li>Illustrative 3D renderings, layouts, and space plans included in a quotation are design concepts only — final construction drawings are issued with a signed project contract.</li>
                </ul>
              </section>

              <section id="orders" className={styles.articleBlock}>
                <h2>6. Orders &amp; Formation of Contract</h2>
                <p>
                  A binding contract between the Customer and Combaxx is formed only when:
                </p>
                <ol>
                  <li>A written quotation is accepted by the Customer with signature and/or PO; AND</li>
                  <li>The required deposit or full payment (§8) is received into a verified Combaxx account.</li>
                </ol>
                <p>
                  Website inquiry forms, chat logs, and verbal discussions are not binding contracts
                  — they are expressions of interest only.
                </p>
              </section>

              <section id="pricing-taxes" className={styles.articleBlock}>
                <h2>7. Pricing &amp; Taxes</h2>
                <ul>
                  <li>All prices are listed in <strong>PKR / USD / EUR</strong> as specified on the quotation, <strong>EXCLUSIVE</strong> of VAT, GST, sales tax, customs duties, port clearing, and any other government imposts — all of which are for the Customer&apos;s account unless a specific inclusive quote is provided in writing.</li>
                  <li>Published retail prices on the website are indicative MSRP only and may change without notice. Binding prices are stated on the signed quotation.</li>
                  <li>Promotional and bulk-discount prices cannot be combined with other offers unless expressly permitted in writing by the Sales Director.</li>
                </ul>
              </section>

              <section id="payment" className={styles.articleBlock}>
                <h2>8. Payment Terms</h2>
                <ul>
                  <li><strong>Standard domestic orders</strong>: 50% deposit with PO / 50% balance prior to dispatch.</li>
                  <li><strong>Export / FCL L/C orders</strong>: 30% TT deposit / 70% Irrevocable Sight L/C via a Combaxx-approved bank, or 100% advance TT for selected regular partners.</li>
                  <li><strong>Small accessories (spare parts &lt; PKR 50,000)</strong>: 100% prepaid only.</li>
                  <li>Late payment accrues <strong>1.5% per month</strong> (or maximum legal rate, whichever is lower) on the outstanding balance from the due date.</li>
                  <li>All payments must be made to the Combaxx bank account listed on the official invoice — never to personal accounts. Combaxx is not liable for payments misdirected by phishing or third-party fraud.</li>
                </ul>
              </section>

              <section id="delivery" className={styles.articleBlock}>
                <h2>9. Delivery, Fulfillment, Passing of Risk</h2>
                <ul>
                  <li>Lead times quoted are <strong>estimates only</strong> and commence from the date of cleared deposit + signed design approvals + final BOQ sign-off. Lead times are not of the essence.</li>
                  <li><strong>Incoterms 2020</strong> apply as specified: typically ExW, FOB Karachi, CIF destination port, or DAP project address.</li>
                  <li>Risk of loss or damage passes to the Customer <strong>upon handover to the first carrier</strong> (ExW / FOB) or upon unloading at the project site (DAP), per the selected Incoterm.</li>
                  <li>Customers must inspect every consignment at delivery and note <em>all damage or shortages on the POD / Waybill within 48 hours</em>; otherwise, any insurance claim will be voided.</li>
                  <li>Force Majeure delays (§19) do not constitute a breach of delivery schedule.</li>
                </ul>
              </section>

              <section id="title" className={styles.articleBlock}>
                <h2>10. Passing of Title</h2>
                <p>
                  Legal ownership (title) of Goods <strong>does not pass</strong> to the Customer
                  until 100% of the invoiced price, plus any storage, demurrage, transport, or
                  other accrued charges, have been paid in cleared funds to Combaxx. Until
                  full payment the Customer holds Goods as bailee and must keep them free of
                  any third-party liens, pledges, or encumbrances.
                </p>
              </section>

              <section id="warranty" className={styles.articleBlock}>
                <h2>11. Limited Manufacturer&apos;s Warranty</h2>
                <p>
                  Combaxx warrants every unit of manufacture to be free from defects in
                  materials and workmanship under <strong>normal commercial use</strong> for
                  the following periods from date of delivery to the end-user facility:
                </p>
                <ul>
                  <li><strong>Frames, uprights, welds, structural tubes</strong>: 5 years (Titan, Ironcore, Anchor Series); 3 years (Precision, Strata Series).</li>
                  <li><strong>Bearings, pulleys, linear guides, chrome bars, weight stacks</strong>: 2 years.</li>
                  <li><strong>Cables, upholstery, grips, bolts, wear parts</strong>: 1 year.</li>
                  <li><strong>Cardio electronics, motors, touch consoles</strong>: 3 years parts / 1 year labor (2 years extended labor available on Premium Care).</li>
                  <li><strong>Accessories / consumables</strong> (bands, collars, chalk, lifting belts, etc.): 90 days from delivery.</li>
                </ul>
                <p>
                  Our obligations under warranty: at our option, (a) repair the unit;
                  (b) supply replacement parts free-of-charge; or (c) replace the product
                  with an equivalent or upgraded model. Customer is responsible for labor
                  and freight on out-of-warranty claims, and on wear-part claims after
                  year 1.
                </p>
              </section>

              <section id="warranty-exclusions" className={styles.articleBlock}>
                <h2>12. What the Warranty Does NOT Cover</h2>
                <ul>
                  <li>Damage from abuse, negligence, misuse, accident, vandalism, intentional dropping, loading beyond posted max, use contrary to the User Manual, or use in outdoor / marine / corrosive environments not approved in the order.</li>
                  <li>Damage from unapproved modifications, third-party add-ons, custom welding, powder-coating, field drilling, non-genuine Combaxx spare parts.</li>
                  <li>Normal wear and tear on upholstery, grips, cables, belts, running decks, friction surfaces, filter cartridges.</li>
                  <li>Damage from power surge, incorrect voltage, improper floor anchoring, rodents, insects, water, fire, or environmental catastrophe.</li>
                  <li>Units without valid warranty registration, units without serial numbers, or units on which a Combaxx tamper seal has been broken.</li>
                  <li>Travel, living, labor, freight costs for on-site warranty work on units outside of Premium Support scope.</li>
                </ul>
                <div className={styles.highlightBox} style={{ marginTop: '1rem' }}>
                  <div className={styles.highlightTitle}>Exclusive Remedy</div>
                  <p>
                    The above warranty is <strong>exclusive and in lieu of all other
                    warranties, oral, written, express, or implied</strong>, including
                    warranties of merchantability or fitness for a particular purpose,
                    to the fullest extent permitted by law.
                  </p>
                </div>
              </section>

              <section id="returns" className={styles.articleBlock}>
                <h2>13. Returns, Refunds &amp; Cancellations</h2>
                <ul>
                  <li><strong>Made-to-order / custom-configured / branded / powder-coated custom-color orders</strong> cannot be cancelled once production has started (after 72 hours of order confirmation).</li>
                  <li><strong>Standard stocked items</strong>: cancellation accepted within 72 hours of order, subject to a 5% admin fee.</li>
                  <li>Return merchandise authorization (<strong>RMA</strong>) is mandatory for all returns. Do not ship goods without a written RMA number.</li>
                  <li>Goods must be returned in original packaging, unused, unmodified, freight pre-paid. A 20% restocking fee applies to change-of-mind returns of standard goods.</li>
                  <li><strong>No refunds on completed installations</strong>; warranty remedies only (§11).</li>
                </ul>
              </section>

              <section id="ip" className={styles.articleBlock}>
                <h2>14. Intellectual Property Rights</h2>
                <ul>
                  <li>All Combaxx brand names, logos (including &ldquo;Combaxx Fitness&rdquo; and sub-brand marks Titan, Ironcore, Precision, Strata, Anchor), product industrial designs, CAD / BIM / 3D models, drawings, marketing images, user manuals, and website content remain the exclusive intellectual property of Combaxx Fitness (Private) Limited, and where applicable, are protected under design registration, copyright, and trademark law.</li>
                  <li>You may <em>not</em> reproduce, reverse-engineer, copy, re-publish, sell, distribute, or create derivative works from any Combaxx IP for resale or public display purposes without written consent.</li>
                  <li>Paid Customers receive a limited, non-exclusive, non-transferable license to use CAD files and space plans <em>only</em> for the internal design and build of the specific facility project for which they were supplied.</li>
                </ul>
              </section>

              <section id="user-content" className={styles.articleBlock}>
                <h2>15. User-Generated Content (UGC)</h2>
                <p>
                  When you submit a product review, project photo, testimonial, blog comment,
                  support attachment, or social media tag mentioning Combaxx (collectively
                  &ldquo;UGC&rdquo;):
                </p>
                <ul>
                  <li>You confirm you hold all rights necessary to grant the license below.</li>
                  <li>You grant Combaxx a worldwide, perpetual, royalty-free, sublicenseable, transferable license to use, publish, reproduce, modify, crop, translate, and display your UGC in marketing, website, case-study pages, and social media — in any media.</li>
                  <li>Combaxx does not pay for UGC absent a separate written creator agreement.</li>
                  <li>We reserve the right to moderate or remove UGC that is defamatory, illegal, infringes third-party rights, is pornographic, or harms the brand reputation of Combaxx or its partners.</li>
                </ul>
              </section>

              <section id="confidentiality" className={styles.articleBlock}>
                <h2>16. Confidentiality</h2>
                <p>
                  Each party agrees to keep confidential any non-public information disclosed
                  in the course of the relationship (pricing, project layouts, vendor lists,
                  customer data, unreleased product roadmaps, commercial terms, technical
                  drawings) and to use it solely for the purpose of performing obligations
                  under this Agreement. Obligations survive termination for <strong>5 years</strong>.
                </p>
              </section>

              <section id="liability" className={styles.articleBlock}>
                <h2>17. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by applicable law:
                </p>
                <ul>
                  <li>Combaxx&apos;s total aggregate liability under any order or service agreement shall not exceed <strong>100% of the price actually paid to Combaxx for the specific Goods or Services that are the subject matter of the claim</strong>.</li>
                  <li>Neither party shall be liable for any <strong>indirect, incidental, consequential, special, punitive, reliance, or exemplary damages</strong>, including loss of profits, revenue, anticipated savings, business interruption, loss of data, injury to reputation, or third-party claims arising out of or in connection with this Agreement — even if advised of the possibility of such damages.</li>
                  <li>Nothing in this clause excludes or limits liability for: (a) death or personal injury caused by negligence; (b) fraud or fraudulent misrepresentation; (c) breach of statutory implied terms that cannot be excluded by law; or (d) any other liability that cannot by law be excluded.</li>
                </ul>
              </section>

              <section id="indemnity" className={styles.articleBlock}>
                <h2>18. Indemnification</h2>
                <p>
                  The Customer agrees to defend, indemnify and hold harmless Combaxx, its
                  officers, employees, dealers, and agents from and against all claims,
                  damages, losses, liabilities, fines, penalties, costs and expenses
                  (including reasonable attorneys&apos; fees) arising out of or relating to:
                </p>
                <ul>
                  <li>Customer&apos;s breach of this Agreement or any applicable law / regulation;</li>
                  <li>Customer&apos;s UGC, data, or materials infringing any third-party IP, privacy, or publicity right;</li>
                  <li>Customer&apos;s negligent acts, omissions, willful misconduct, or failure to follow installation / Safe Use guidance (see <Link href="/safe-use">Safe Use of Products</Link>);</li>
                  <li>Personal injury or property damage arising from Customer&apos;s misuse, unauthorized modification, or re-sale of Combaxx Goods outside the territory authorized by a distribution contract.</li>
                </ul>
              </section>

              <section id="force-majeure" className={styles.articleBlock}>
                <h2>19. Force Majeure</h2>
                <p>
                  Neither party shall be liable for delay or failure to perform due to causes
                  beyond its reasonable control, including but not limited to: acts of God,
                  wars, riots, civil disturbance, pandemics / government lockdown orders,
                  trade embargoes, sanctions, port strikes, carrier strikes, raw material
                  shortages, supplier defaults, cyber-attacks or infrastructure outages,
                  earthquakes, floods, fires, explosions, or power grid collapse.
                </p>
                <p>
                  The affected party must promptly notify the other and use reasonable
                  efforts to mitigate the impact. If performance is delayed beyond
                  <strong> 120 calendar days</strong>, either party may terminate the
                  affected order with full refund of any prepaid but un-performed portion.
                </p>
              </section>

              <section id="assignment" className={styles.articleBlock}>
                <h2>20. Assignment &amp; Sub-contracting</h2>
                <ul>
                  <li>Combaxx may assign, novate, or sub-contract any of its rights or obligations, in whole or in part, without prior notice.</li>
                  <li>Customer may not assign, sub-license, or transfer any right or obligation under this Agreement without Combaxx&apos;s prior written consent, which shall not be unreasonably withheld in the case of a corporate merger / acquisition.</li>
                </ul>
              </section>

              <section id="entirety" className={styles.articleBlock}>
                <h2>21. Entire Agreement</h2>
                <p>
                  This document (together with the signed Quotation, any applicable
                  Equipment Schedule, Warranty card, and our referenced Privacy / Cookie /
                  Safe Use policies) is the entire agreement between the parties, and
                  supersedes all prior understandings, conversations, representations,
                  marketing brochures, or oral promises of any kind. No modification is
                  effective unless signed by an authorized director of Combaxx.
                </p>
              </section>

              <section id="severability" className={styles.articleBlock}>
                <h2>22. Severability &amp; Waiver</h2>
                <ul>
                  <li>If any clause of this Agreement is held to be invalid or unenforceable, the remaining clauses remain in full force. Parties agree to replace the invalid clause with a valid enforceable clause that most closely approximates the original intent.</li>
                  <li>Failure by Combaxx to enforce any provision does not constitute a waiver of that or any future breach. A waiver is only effective if made in writing and signed by the General Counsel or Managing Director.</li>
                </ul>
              </section>

              <section id="law-jurisdiction" className={styles.articleBlock}>
                <h2>23. Governing Law &amp; Jurisdiction</h2>
                <ul>
                  <li>This Agreement and all non-contractual obligations arising out of or in connection with it are governed by the laws of <strong>Islamic Republic of Pakistan</strong>.</li>
                  <li>Subject to §24 (Alternative Dispute Resolution), the courts of <strong>Karachi, Pakistan</strong> shall have exclusive jurisdiction to settle any dispute or claim (including non-contractual disputes or claims) arising out of or in connection with this Agreement or its subject matter or formation.</li>
                  <li>For EU-based consumers, nothing in this clause removes mandatory statutory consumer protection rights of your country of habitual residence.</li>
                </ul>
              </section>

              <section id="dispute" className={styles.articleBlock}>
                <h2>24. Dispute Resolution</h2>
                <p>
                  Before filing formal proceedings, the parties agree to:
                </p>
                <ol>
                  <li><strong>Step 1 — Escalation</strong> (10 business days): Customer contacts Account Manager and Combaxx Sales Director in writing with full documentary detail.</li>
                  <li><strong>Step 2 — Mediation</strong> (30 calendar days): If unresolved, parties jointly appoint a neutral commercial mediator from the Karachi Centre for Dispute Resolution (KCDR) or equivalent, costs shared equally.</li>
                  <li><strong>Step 3 — Arbitration or Courts</strong>: If mediation fails, either party may commence proceedings under §23 or submit to binding arbitration at KCDR under the Arbitration Act 1940, in English, with one arbitrator mutually agreed.</li>
                </ol>
              </section>

              <section id="amendments" className={styles.articleBlock}>
                <h2>25. Amendments to These Terms</h2>
                <p>
                  Combaxx may revise these Terms from time to time. Material changes take
                  effect 30 calendar days after posting. Your continued use of the website
                  after the effective date constitutes acceptance of the revised Terms.
                  In-flight orders remain governed by the version in effect at the date of
                  contract formation (§6).
                </p>
              </section>

              <section id="contact" className={styles.articleBlock}>
                <h2>26. Notices &amp; Contact</h2>
                <p>
                  All formal notices under this Agreement must be in writing and delivered
                  by registered post, courier, or email (with read receipt) to:
                </p>
                <p>
                  <strong>Combaxx Fitness (Private) Limited — Legal Department</strong><br />
                  Email: <a href="mailto:legal@combaxxfitness.com">legal@combaxxfitness.com</a><br />
                  General contact form available on the <Link href="/contact">Contact</Link> page.
                </p>
              </section>
            </article>
          </div>
        </div>
      </section>

      <CTA
        badge="Have a project in mind?"
        title="Build your next facility with Combaxx"
        description="From free 2D/3D layouts and BOQ to delivery, installation, and 5-year warranty — the Combaxx team supports your B2B fitness project end-to-end."
        primaryButtonText="Request a Quote"
        primaryButtonLink="/contact"
        secondaryButtonText="Browse Equipment"
        secondaryButtonLink="/shop"
      />
    </div>
  )
}

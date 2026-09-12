import type { Metadata } from 'next'
import Link from 'next/link'
import CTA from '@/components/CTA'
import styles from '@/styles/pages/legal.module.css'

export const metadata: Metadata = {
  title: 'Privacy Policy | Combaxx Fitness',
  description: 'How Combaxx Fitness collects, uses, stores, and protects personal data — across our website, in-store operations, and customer communications.',
}

const TOC = [
  { href: '#intro', label: 'Introduction' },
  { href: '#controller', label: 'Data Controller' },
  { href: '#what-collect', label: 'Information We Collect' },
  { href: '#how-collect', label: 'How We Collect Data' },
  { href: '#why-use', label: 'Why We Use Your Data' },
  { href: '#legal-basis', label: 'Legal Basis (GDPR)' },
  { href: '#sharing', label: 'Who We Share Data With' },
  { href: '#international', label: 'International Transfers' },
  { href: '#retention', label: 'Data Retention' },
  { href: '#security', label: 'Security Measures' },
  { href: '#rights', label: 'Your Data Rights' },
  { href: '#cookies', label: 'Cookies & Tracking' },
  { href: '#children', label: 'Children' },
  { href: '#updates', label: 'Updates to This Policy' },
  { href: '#contact', label: 'Contact Us' },
]

export default function PrivacyPolicyPage() {
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
            <span>Privacy Policy</span>
          </nav>
          <span className={styles.heroBadge}>Legal & Policies</span>
          <h1 className={styles.heroTitle}>Privacy Policy</h1>
          <p className={styles.heroDesc}>
            At Combaxx Fitness, we take data protection seriously. This policy explains exactly
            what personal information we collect, why we collect it, how long we keep it, and the
            rights you hold over your data under Pakistani PDP, GDPR, and other applicable laws.
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

              <section id="intro" className={styles.articleBlock}>
                <h2>1. Introduction</h2>
                <p>
                  Combaxx Fitness (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;Combaxx&rdquo;)
                  is a commercial fitness equipment manufacturer and B2B solutions provider. We
                  serve gyms, hotel groups, educational institutions, government bodies,
                  professional sports franchises, and retail end-consumers worldwide.
                </p>
                <p>
                  This Privacy Policy applies to <strong>combaxxfitness.com</strong>, any of our
                  sub-domains, customer portal login areas, product inquiry forms, quotation
                  requests, promotional emails, offline showroom visits, and service delivery
                  (collectively, the &ldquo;Services&rdquo;).
                </p>
              </section>

              <section id="controller" className={styles.articleBlock}>
                <h2>2. Data Controller</h2>
                <p>
                  The data controller responsible for your information is <strong>Combaxx
                  Fitness (Private) Limited</strong>, registered in Pakistan, with our registered
                  office and primary operations address published on our Contact page.
                </p>
                <p>
                  For privacy-specific correspondence email
                  <a href="mailto:privacy@combaxxfitness.com"> privacy@combaxxfitness.com</a>.
                  We respond within 7 business days to data-subject requests.
                </p>
              </section>

              <section id="what-collect" className={styles.articleBlock}>
                <h2>3. Information We Collect</h2>
                <h3>3.1 Information you give us</h3>
                <ul>
                  <li><strong>Identity</strong>: full name, job title, company name, tax / GST / VAT number.</li>
                  <li><strong>Contact</strong>: email, phone / mobile, business address, shipping / billing address.</li>
                  <li><strong>Inquiry data</strong>: products of interest, project timelines, facility size, desired budget range.</li>
                  <li><strong>Transaction data</strong>: order history, invoice numbers, payment records (processed via PCI-DSS compliant gateways — we never store full card numbers on our systems).</li>
                  <li><strong>Correspondence</strong>: tickets, phone call notes, emails, or in-showroom discussion notes.</li>
                </ul>
                <h3>3.2 Information collected automatically</h3>
                <ul>
                  <li>IP address, approximate geolocation (country-level), browser language, device type, OS, screen size.</li>
                  <li>Pages visited, file downloads, form drop-offs, referring sites, exit pages, session duration.</li>
                  <li>Basic usage analytics from self-hosted or privacy-friendly platforms.</li>
                </ul>
                <h3>3.3 Information from third parties</h3>
                <ul>
                  <li>Our authorized sales partners, distributors, or resellers may share your contact data with us when referring a project.</li>
                  <li>Credit bureau or business registry data — strictly for commercial B2B credit evaluation when required.</li>
                </ul>
              </section>

              <section id="how-collect" className={styles.articleBlock}>
                <h2>4. How We Collect Data</h2>
                <ul>
                  <li>Forms: &ldquo;Request a Quote&rdquo;, product inquiry, dealer application, contact, newsletter, career application.</li>
                  <li>Clerk / customer portal account registration (see <Link href="/cookie-policy">Cookie Policy</Link> for session cookies).</li>
                  <li>Email and telephone correspondence initiated by you.</li>
                  <li>Showroom or factory visits where we scan a business card or note a meeting.</li>
                  <li>Website cookies and server logs.</li>
                </ul>
              </section>

              <section id="why-use" className={styles.articleBlock}>
                <h2>5. Why We Use Your Data</h2>
                <ol>
                  <li><strong>Performance of contract</strong>: quote generation, order fulfillment, shipping, invoicing, installation coordination, warranty registration.</li>
                  <li><strong>Legitimate interest</strong>: respond to inbound inquiries; share product brochures &amp; CAD files requested; improve website UX via aggregate analytics; fraud prevention; after-sales customer satisfaction surveys.</li>
                  <li><strong>Marketing consent</strong>: send product launches, industry guides, event invitations, and maintenance tips (only with explicit opt-in consent — you can unsubscribe one-click in every email).</li>
                  <li><strong>Legal obligation</strong>: issue VAT invoices, maintain accounting records (7+ years per local tax law), comply with a lawful court or regulator request.</li>
                </ol>
              </section>

              <div className={styles.highlightBox}>
                <div className={styles.highlightTitle}>No Sell, No Rent</div>
                <p>
                  We do <strong>NOT</strong> sell, rent, or exchange personal data with data
                  brokers, ad networks, or list-management services. Ever.
                </p>
              </div>

              <section id="legal-basis" className={styles.articleBlock}>
                <h2>6. Legal Basis (GDPR / UK GDPR)</h2>
                <p>
                  For EU / UK resident data subjects, we rely on one or more of these six
                  lawful bases: (a) consent (Art. 6.1.a); (b) contract performance (Art.
                  6.1.b); (c) legal obligation (Art. 6.1.c); (d) vital interest (Art. 6.1.d —
                  extremely rare); (e) public task (Art. 6.1.e); (f) legitimate interests
                  (Art. 6.1.f) — subject always to your right to object (Art. 21).
                </p>
              </section>

              <section id="sharing" className={styles.articleBlock}>
                <h2>7. Who We Share Data With</h2>
                <ul>
                  <li><strong>Logistics partners</strong>: name + shipping address + phone only — for delivery of equipment &amp; spare parts.</li>
                  <li><strong>Professional advisors</strong>: accountants, auditors, insurers, lawyers — on a strictly need-to-know basis.</li>
                  <li><strong>Payment processors</strong>: PCI-DSS Level 1 certified gateways.</li>
                  <li><strong>IT services</strong>: hosting (Sanity, Vercel, AWS where used), CRM, ticketing, email service providers — all bound by data processing agreements (DPAs) if handling EU/UK personal data.</li>
                  <li><strong>Authorized dealers / installers</strong>: only when a project is assigned to a local Combaxx partner and you have given your consent.</li>
                  <li><strong>Law enforcement / regulators</strong>: when compelled by a valid court order, subpoena, or binding regulatory request.</li>
                </ul>
              </section>

              <section id="international" className={styles.articleBlock}>
                <h2>8. International Transfers</h2>
                <p>
                  Combaxx operates a global supply chain, hence some personal data may be
                  processed outside the country of collection. We ensure all such transfers
                  are protected via:
                </p>
                <ul>
                  <li>EU Standard Contractual Clauses (SCCs) for processors/importers in non-adequacy countries;</li>
                  <li>Encryption in transit + at rest; and</li>
                  <li>Annual data-transfer impact reviews.</li>
                </ul>
              </section>

              <section id="retention" className={styles.articleBlock}>
                <h2>9. Data Retention</h2>
                <ul>
                  <li><strong>Customer &amp; transaction records</strong>: 7 years after last commercial activity (tax + warranty).</li>
                  <li><strong>Inquiry / marketing records (no order)</strong>: 2 years from last interaction — unless you opt-in to marketing and stay subscribed.</li>
                  <li><strong>Career applications</strong>: 6 months post role-closing; then securely deleted unless you opt-in to the talent pool (kept for 2 years).</li>
                  <li><strong>Product reviews</strong>: retained until business need ceases or user requests deletion — subject to Sanity CMS record-keeping.</li>
                  <li><strong>Website analytics</strong>: raw IP logs 14 days; aggregated and anonymized data retained 26 months.</li>
                </ul>
              </section>

              <section id="security" className={styles.articleBlock}>
                <h2>10. Security Measures</h2>
                <p>
                  Combaxx implements appropriate administrative, technical, and physical
                  safeguards to protect personal data from loss, misuse, unauthorized access,
                  disclosure, alteration, or destruction:
                </p>
                <ul>
                  <li>TLS 1.3 encryption on all public websites and portals.</li>
                  <li>Role-based access controls; principle of least privilege; SSO + MFA for admins.</li>
                  <li>Quarterly vulnerability scans; annual penetration tests on customer-facing systems.</li>
                  <li>Off-site encrypted backups; 90-day rotation retention schedule.</li>
                  <li>All employees complete mandatory privacy &amp; security onboarding; annual refreshers.</li>
                </ul>
              </section>

              <section id="rights" className={styles.articleBlock}>
                <h2>11. Your Data Rights</h2>
                <p>
                  Depending on your jurisdiction, you may hold all or some of the following
                  rights with respect to your personal data:
                </p>
                <ul>
                  <li>Right of <strong>Access</strong> — a machine-readable copy of what we hold on you.</li>
                  <li>Right of <strong>Rectification</strong> — correct inaccurate or incomplete data.</li>
                  <li>Right of <strong>Erasure</strong> (right to be forgotten) — where no legal retention obligation overrides.</li>
                  <li>Right to <strong>Restrict Processing</strong>.</li>
                  <li>Right to <strong>Data Portability</strong> — where processing is based on consent or contract.</li>
                  <li>Right to <strong>Object</strong> to direct marketing or legitimate-interest-based processing.</li>
                  <li>Right to <strong>Withdraw Consent</strong> at any time (without affecting lawfulness of prior processing).</li>
                  <li>Right to <strong>Lodge a Complaint</strong> with your national data protection supervisory authority if dissatisfied with our response.</li>
                </ul>
                <p>
                  To exercise any of these rights, email
                  <a href="mailto:privacy@combaxxfitness.com"> privacy@combaxxfitness.com</a>.
                  For identity verification we may request a copy of a valid government ID —
                  standard for sensitive data requests.
                </p>
              </section>

              <section id="cookies" className={styles.articleBlock}>
                <h2>12. Cookies &amp; Tracking</h2>
                <p>
                  Please see our separate <Link href="/cookie-policy">Cookie Policy</Link> for
                  granular categories of cookies used, purpose, duration, and consent
                  management options.
                </p>
              </section>

              <section id="children" className={styles.articleBlock}>
                <h2>13. Children</h2>
                <p>
                  Our Services are directed at commercial facilities, businesses, and adults
                  who can legally contract. We do not knowingly solicit or collect personal
                  data from children under 16 (or the age of digital consent in your
                  jurisdiction). If you believe a minor&apos;s data has been collected, please
                  contact us and we will remove it within 30 days.
                </p>
              </section>

              <section id="updates" className={styles.articleBlock}>
                <h2>14. Updates to This Policy</h2>
                <p>
                  This Privacy Policy may be amended from time to time. Material changes
                  (e.g., new processing purposes, new controller, new international transfers)
                  will be announced via a prominent banner on our homepage and/or via email
                  to active customers for 30 days before the effective date. The &ldquo;Last
                  updated&rdquo; stamp at the top always reflects the current applicable
                  version.
                </p>
              </section>

              <section id="contact" className={styles.articleBlock}>
                <h2>15. Contact</h2>
                <p>
                  For privacy, data protection, or DPA-related questions — write to our Data
                  Protection Officer at:
                </p>
                <p>
                  <strong>Combaxx Fitness (Private) Limited</strong><br />
                  Email: <a href="mailto:privacy@combaxxfitness.com">privacy@combaxxfitness.com</a><br />
                  Postal address (DPO) available on the <Link href="/contact">Contact</Link> page.
                </p>
              </section>
            </article>
          </div>
        </div>
      </section>

      <CTA
        badge="Have a privacy question?"
        title="Talk to our Data Protection Team"
        description="DSAR, DPA, data-processing audit, or a quick privacy question — we respond to 95% of privacy tickets within 7 business days."
        primaryButtonText="Email DPO"
        primaryButtonLink="mailto:privacy@combaxxfitness.com"
        secondaryButtonText="Visit Contact"
        secondaryButtonLink="/contact"
      />
    </div>
  )
}

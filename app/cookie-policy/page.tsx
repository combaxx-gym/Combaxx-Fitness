import type { Metadata } from 'next'
import Link from 'next/link'
import CTA from '@/components/CTA'
import styles from '@/styles/pages/legal.module.css'

export const metadata: Metadata = {
  title: 'Cookie Policy | Combaxx Fitness',
  description: 'Detailed breakdown of cookie categories used on combaxxfitness.com — purposes, lifespans, providers, and how to manage or disable them.',
}

const TOC = [
  { href: '#what-are', label: 'What Are Cookies' },
  { href: '#consent', label: 'Consent & Management' },
  { href: '#strictly-necessary', label: 'Strictly Necessary' },
  { href: '#functional', label: 'Functional' },
  { href: '#analytics', label: 'Analytics' },
  { href: '#marketing', label: 'Marketing' },
  { href: '#third-party', label: 'Third-Party Providers' },
  { href: '#storage', label: 'Storage & Lifespan' },
  { href: '#how-disable', label: 'How to Disable Cookies' },
  { href: '#updates', label: 'Updates' },
  { href: '#contact', label: 'Contact' },
]

const NECESSARY_COOKIES = [
  { name: 'cf-csrf', purpose: 'Cross-site request forgery protection token', duration: 'Session', type: 'First-party HTTP only' },
  { name: '__cf_bm', purpose: 'Bot & attack mitigation by our edge network', duration: '30 minutes', type: 'First-party' },
  { name: 'cler_session / clersk_active', purpose: 'Signed-in session state for the customer portal (Clerk)', duration: '7 days', type: 'First-party HTTP only' },
  { name: '__Secure_clerk_id', purpose: 'Clerk authenticated user identifier', duration: '1 year', type: 'First-party HTTP only' },
  { name: 'cf-cart (future)', purpose: 'Shopping / quote-request basket tokens', duration: 'Session or 30 days', type: 'First-party' },
]
const FUNCTIONAL_COOKIES = [
  { name: 'cf_cookie_consent', purpose: 'Store which cookie categories the user has accepted or rejected', duration: '180 days', type: 'First-party' },
  { name: 'cf_theme', purpose: 'Remember light / dark preference (if toggled)', duration: '1 year', type: 'First-party' },
  { name: 'cf_locale', purpose: 'Remember user region / currency / language preference', duration: '1 year', type: 'First-party' },
  { name: 'cf_filters', purpose: 'Remember product-grid filters & sorting on /shop and /blog', duration: 'Session', type: 'First-party' },
  { name: 'Sanity Preview Cookie', purpose: 'CMS logged-in editors previewing unpublished content', duration: 'Session', type: 'First-party HTTP only' },
]
const ANALYTICS_COOKIES = [
  { name: 'cf_visits', purpose: 'Self-hosted anonymous visit counter (no PII, no cross-site tracking)', duration: '13 months', type: 'First-party' },
  { name: 'cf_session_id', purpose: 'Tie page views within a single browsing session', duration: 'Session', type: 'First-party' },
  { name: 'cf_dnt_ping', purpose: 'Honor DNT / GPC headers; no identifiers stored', duration: 'Session', type: 'First-party' },
]
const MARKETING_COOKIES = [
  { name: 'cf_newsletter_seen', purpose: 'Remember whether the newsletter pop-up has been displayed this session', duration: '30 days', type: 'First-party' },
  { name: 'cf_utm_source', purpose: 'Remember UTM source/campaign/creator attribution to credit a sign-up or inquiry correctly', duration: '30 days', type: 'First-party' },
  { name: '3rd-party pixels (opt-in only)', purpose: 'LinkedIn / Meta / Google Ads conversion pixels — only if user opts in via cookie banner', duration: 'Up to 13 months', type: 'Third-party' },
]

function CookieTable({ title, description, rows }: { title: string; description: string; rows: typeof NECESSARY_COOKIES }) {
  return (
    <section className={styles.articleBlock}>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className={styles.cookieTableWrap}>
        <table className={styles.cookieTable}>
          <thead>
            <tr>
              <th>Cookie</th>
              <th>Purpose</th>
              <th>Duration</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                <td data-label="Cookie">
                  <strong className={styles.cookieName}>{r.name}</strong>
                </td>
                <td data-label="Purpose">{r.purpose}</td>
                <td data-label="Duration">{r.duration}</td>
                <td data-label="Type">{r.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default function CookiePolicyPage() {
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
            <span>Cookie Policy</span>
          </nav>
          <span className={styles.heroBadge}>Legal & Policies</span>
          <h1 className={styles.heroTitle}>Cookie Policy</h1>
          <p className={styles.heroDesc}>
            Transparent, granular, and privacy-first. This page explains every cookie type used
            on combaxxfitness.com, why we use it, how long it lasts, and exactly how to turn
            them off — at site, browser, or device level.
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

              <section id="what-are" className={styles.articleBlock}>
                <h2>1. What Are Cookies &amp; Similar Technologies</h2>
                <p>
                  A cookie is a small text file placed on your device (phone, laptop, tablet)
                  when you visit a website. Cookies help websites remember things about you
                  between page visits — such as your login state, preferences, or an item you
                  added to a quote cart.
                </p>
                <p>
                  &ldquo;Similar technologies&rdquo; includes LocalStorage / SessionStorage
                  entries, service workers, indexeddb, tracking pixels, SDKs, and
                  fingerprinting-resistance scripts — all referenced collectively as
                  &ldquo;cookies&rdquo; in this policy.
                </p>
              </section>

              <section id="consent" className={styles.articleBlock}>
                <h2>2. Consent Management (Opt-in by Default)</h2>
                <p>
                  On your first visit to combaxxfitness.com we display a cookie consent banner.
                  <strong> Only the &ldquo;Strictly Necessary&rdquo; category is active by
                  default.</strong> No Analytics, Marketing, or Functional (non-essential)
                  cookies are set until you explicitly click &ldquo;Accept all&rdquo; or
                  customize &amp; save individual categories.
                </p>
                <ul>
                  <li>You can change your preferences any time via the floating cookie widget in the page footer.</li>
                  <li>Honors <strong>Do Not Track (DNT)</strong> and <strong>Global Privacy Control (GPC)</strong> signals automatically — opt-out categories are not activated if these headers are set.</li>
                  <li>Every marketing email includes a one-click unsubscribe link, separate from cookie consent.</li>
                </ul>
              </section>

              <CookieTable
                title="3. Strictly Necessary Cookies (Always On)"
                description="These cookies are essential for basic functionality and security. You cannot switch them off. Without them, checkout flows, inquiry baskets, authentication, and CSRF protection would fail."
                rows={NECESSARY_COOKIES}
              />

              <CookieTable
                title="4. Functional Cookies (Opt-in)"
                description="These improve convenience: remember your cookie preference, theme, region, filters, and allow CMS editors to preview drafts. Not essential, but recommended."
                rows={FUNCTIONAL_COOKIES}
              />

              <CookieTable
                title="5. Analytics Cookies (Opt-in)"
                description="Aggregated, privacy-friendly statistics about how visitors use our site. We do NOT use Google Analytics with advertiser features enabled. IPs are truncated or anonymized."
                rows={ANALYTICS_COOKIES}
              />

              <CookieTable
                title="6. Marketing Cookies (Opt-in)"
                description="Measure conversion, attribute leads to source, and suppress duplicate ads. Only activated if you explicitly opt-in via the cookie banner."
                rows={MARKETING_COOKIES}
              />

              <section id="third-party" className={styles.articleBlock}>
                <h2>7. Third-Party Providers</h2>
                <p>
                  Cookies may be set by these vendors (depending on your consent):
                </p>
                <ul>
                  <li><strong>Clerk</strong> — user authentication; <a href="https://clerk.com/legal/privacy" target="_blank" rel="noopener noreferrer">Clerk Privacy Policy</a></li>
                  <li><strong>Sanity.io</strong> — CMS preview editors; <a href="https://www.sanity.io/privacy" target="_blank" rel="noopener noreferrer">Sanity Privacy</a></li>
                  <li><strong>Vercel</strong> — hosting, edge network &amp; security headers; <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Privacy</a></li>
                  <li>Optional advertising pixels (LinkedIn, Meta, Google Ads) only when user opts-in.</li>
                </ul>
                <p>
                  We perform due diligence on every sub-processor and sign written DPAs
                  (Data Processing Agreements) where EU/UK data rights apply.
                </p>
              </section>

              <section id="storage" className={styles.articleBlock}>
                <h2>8. Storage, Encryption &amp; Jurisdiction</h2>
                <ul>
                  <li>All first-party cookies are served with the <code>Secure</code>, <code>SameSite=Lax</code>, and (where possible) <code>HttpOnly</code> flags.</li>
                  <li>No authentication tokens or PII cookies are stored in LocalStorage or readable by 3rd-party JavaScript.</li>
                  <li>Primary storage regions: Germany (Vercel EU-Central-1) &amp; Singapore; backups replicated to AWS us-east-1 under EU SCCs.</li>
                </ul>
              </section>

              <section id="how-disable" className={styles.articleBlock}>
                <h2>9. How to Disable or Delete Cookies</h2>
                <p>
                  Besides our cookie banner, you can control cookies at the browser level. Below
                  are help pages for major browsers:
                </p>
                <ul>
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/en-pk/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
                  <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
                  <li><a href="https://help.opera.com/en/latest/web-preferences/#cookies" target="_blank" rel="noopener noreferrer">Opera</a></li>
                </ul>
                <p>
                  iOS / Android users: manage cookies in the browser app settings, or via
                  system-level App Tracking Transparency.
                </p>
                <div className={styles.highlightBox} style={{ marginTop: '1rem' }}>
                  <div className={styles.highlightTitle}>Note</div>
                  <p>
                    Blocking &ldquo;Strictly Necessary&rdquo; cookies at the browser level can
                    cause parts of the site (login, quote basket, inquiry forms) to malfunction.
                    If you need only non-essential cookies disabled, prefer our own cookie
                    banner widget instead of a global browser block.
                  </p>
                </div>
              </section>

              <section id="updates" className={styles.articleBlock}>
                <h2>10. Updates to This Cookie Policy</h2>
                <p>
                  Whenever we add a new provider, a new cookie category, or materially change
                  retention periods, we update the &ldquo;Last updated&rdquo; date above and
                  re-trigger the consent banner to returning users, so you can re-evaluate
                  acceptance.
                </p>
              </section>

              <section id="contact" className={styles.articleBlock}>
                <h2>11. Contact</h2>
                <p>
                  Cookie-specific questions, SOC-2 or audit requests, or deletion of your
                  stored consent decisions — email
                  <a href="mailto:privacy@combaxxfitness.com"> privacy@combaxxfitness.com</a>
                  with subject line &ldquo;Cookie Request&rdquo;.
                </p>
              </section>
            </article>
          </div>
        </div>
      </section>

      <CTA
        badge="Your data, your call"
        title="Adjust your cookie preferences any time"
        description="The floating cookie widget on the homepage footer lets you enable or disable each category individually — no account, no email required."
        primaryButtonText="Back to Home"
        primaryButtonLink="/"
        secondaryButtonText="Contact Privacy Team"
        secondaryButtonLink="mailto:privacy@combaxxfitness.com"
      />
    </div>
  )
}

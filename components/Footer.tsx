import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Mail, Instagram, Facebook, Twitter, Youtube, Linkedin } from "lucide-react"
import { client } from "@/sanity/lib/client"
import styles from "@/styles/components/Footer.module.css"

interface FooterCategory {
  _id: string
  name: string
  slug: { current: string }
}

/**
 * Categories HIDE karne ke liye list — inke naam / slug se match karne waali
 * poori entries Footer mein dikhain ge hi nahin. Case insensitive, slug/name dono.
 */
const FOOTER_HIDE_CATEGORIES: Array<{ names: string[]; slugs: string[] }> = [
  { names: ["ANCHOR Series", "Anchor Series", "anchor series", "ANCHOR"], slugs: ["anchor-series", "anchor"] },
  { names: ["AXIS SERIES", "Axis Series", "axis series", "AXIS"],          slugs: ["axis-series", "axis"] },
  { names: ["FUNCTIONAL SERIES", "Functional Series", "functional series"],slugs: ["functional-series"] },
  { names: ["Ironcore series", "Ironcore Series", "IRONCORE SERIES", "Ironcore"], slugs: ["ironcore-series", "ironcore"] },
  { names: ["PRECISION Series", "Precision Series", "precision series"],   slugs: ["precision-series", "precision"] },
  { names: ["Pulse Series", "PULSE SERIES", "pulse series", "Pulse"],      slugs: ["pulse-series", "pulse"] },
  { names: ["STRATA Series", "Strata Series", "strata series", "STRATA"],  slugs: ["strata-series", "strata"] },
  { names: ["Titan Series", "TITAN SERIES", "titan series", "Titan"],      slugs: ["titan-series", "titan"] },
  { names: ["Top Selling Products", "top selling products", "TopSelling"], slugs: ["top-selling-products", "top-selling"] },
]

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "").trim()

const isHiddenInFooter = (c: FooterCategory): boolean => {
  const rawName = c?.name || ""
  const rawSlug = c?.slug?.current || ""
  const nName = normalize(rawName)
  const nSlug = normalize(rawSlug)
  return FOOTER_HIDE_CATEGORIES.some(entry =>
    entry.names.some(nm => normalize(nm) === nName || nName.includes(normalize(nm))) ||
    entry.slugs.some(sl => normalize(sl) === nSlug || nSlug.includes(normalize(sl)))
  )
}

async function getFooterCategories(): Promise<FooterCategory[]> {
  try {
    const cats = await client.fetch<FooterCategory[]>(
      `*[_type == "category" && defined(slug.current)] | order(name asc){ _id, name, slug }`
    )
    const filtered = (cats || []).filter(c => !isHiddenInFooter(c))
    if (filtered.length > 0) return filtered
    return []
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error("[Footer] categories fetch failed:", msg)
    return []
  }
}

export default async function Footer() {
  const categories = await getFooterCategories()

  return (
    <footer className={styles.footer}>

      {/* Top CTA Section */}
      <div className={`${styles.container} ${styles.ctaRow}`}>
        <div className={styles.ctaGrid}>
          {/* Card 1 */}
          <div className={styles.ctaCard}>
            <h3 className={styles.ctaCardTitle}>Join the Community</h3>
            <p className={styles.ctaCardDesc}>Unlock exclusive training content and member-only offers.</p>
            <div className={styles.ctaCardBtn}>
              Become a Member <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2 */}
          <div className={styles.ctaCard}>
            <h3 className={styles.ctaCardTitle}>Visit Our Showrooms</h3>
            <p className={styles.ctaCardDesc}>Experience the equipment in person at our boutiques.</p>
            <div className={styles.ctaCardBtn}>
              Find Nearest <MapPin className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3 */}
          <div className={styles.ctaCard}>
            <h3 className={styles.ctaCardTitle}>Business Solutions</h3>
            <p className={styles.ctaCardDesc}>Equip your gym or hotel with professional gear.</p>
            <div className={styles.ctaCardBtn}>
              Explore B2B <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className={`${styles.container} ${styles.mainContent}`}>

        {/* Centered Logo */}
        <div className={styles.logoWrap}>
          <Link href="/" className="block w-fit">
            <Image
              src="/images/COMBAXX FITNESS logo.png"
              alt="COMBAXX FITNESS Logo"
              width={200}
              height={120}
              className={styles.logoImg}
              style={{ width: 'auto', height: undefined }}
              unoptimized
            />
          </Link>
        </div>

        <div className={styles.mainGrid}>

          {/* Left: Newsletter */}
          <div className={styles.newsletter}>
            <h4 className={styles.newsletterTitle}>Newsletter Signup</h4>
            <p className={styles.newsletterDesc}>
              Get the latest news, product launches, and training tips delivered directly to your inbox.
            </p>
            <div className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.newsletterInput}
              />
              <button className={styles.newsletterBtn}>
                Subscribe Now <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Middle: Links */}
          <div className={styles.linksGrid}>
            {/* Column 1 */}
            <div>
              <h5 className={styles.linkColTitle}>Explore</h5>
              <ul className={styles.linkList}>
                <li><Link href="/shop" className={styles.linkItem}>Products</Link></li>
                <li><Link href="/materials-information" className={styles.linkItem}>Materials Information</Link></li>
                <li><Link href="/stories" className={styles.linkItem}>Stories</Link></li>
                <li><Link href="/blog" className={styles.linkItem}>Blog</Link></li>
                <li><Link href="/about" className={styles.linkItem}>About Us</Link></li>
                <li><Link href="/contact" className={styles.linkItem}>Contact</Link></li>
              </ul>
            </div>

            {/* Column 2 — SANITY ACTUAL CATEGORIES (no dummy list) */}
            <div>
              <h5 className={styles.linkColTitle}>Categories</h5>
              <ul className={styles.linkList}>
                {categories.length === 0 ? (
                  <li className={styles.linkItem} style={{ opacity: 0.6 }}>
                    Coming soon
                  </li>
                ) : (
                  categories.map((c) => (
                    <li key={c._id}>
                      <Link
                        href={`/${c.slug.current}`}
                        className={styles.linkItem}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h5 className={styles.linkColTitle}>Legal & Policies</h5>
              <ul className={styles.linkList}>
                <li><Link href="/safe-use" className={styles.linkItem}>Safe use of Technogym products</Link></li>
                <li><Link href="/privacy-policy" className={styles.linkItem}>Privacy policy</Link></li>
                <li><Link href="/cookie-policy" className={styles.linkItem}>Cookie policy</Link></li>
                <li><Link href="/terms-and-conditions" className={styles.linkItem}>Terms and conditions</Link></li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`${styles.container} ${styles.bottomBar}`}>
        {/* Social Icons */}
        <div className={styles.socialRow}>
          <Link href="#" className={styles.socialIcon}>
            <Instagram className={styles.socialIconSvg} />
          </Link>
          <Link href="#" className={styles.socialIcon}>
            <Facebook className={styles.socialIconSvg} />
          </Link>
          <Link href="#" className={styles.socialIcon}>
            <Twitter className={styles.socialIconSvg} />
          </Link>
          <Link href="#" className={styles.socialIcon}>
            <Youtube className={styles.socialIconSvg} />
          </Link>
          <Link href="#" className={styles.socialIcon}>
            <Linkedin className={styles.socialIconSvg} />
          </Link>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} COMBAXX. All rights reserved.</p>
          {/* <div className={styles.legalLinks}>
            <Link href="#" className={styles.legalLink}>Privacy Policy</Link>
            <Link href="#" className={styles.legalLink}>Terms of Use</Link>
            <Link href="#" className={styles.legalLink}>Cookie Settings</Link>
          </div> */}
        </div>
      </div>

    </footer>
  )
}

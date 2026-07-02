import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Mail, Instagram, Facebook, Twitter, Youtube, Linkedin } from "lucide-react"
import styles from "@/styles/components/Footer.module.css"

export default function Footer() {
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
                <li><Link href="/contact" className={styles.linkItem}>Contact</Link></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h5 className={styles.linkColTitle}>Categories</h5>
              <ul className={styles.linkList}>
                <li><Link href="/treadmills" className={styles.linkItem}>Treadmills</Link></li>
                <li><Link href="/bikes" className={styles.linkItem}>Bikes</Link></li>
                <li><Link href="/ellipticals" className={styles.linkItem}>Ellipticals</Link></li>
                <li><Link href="/rower" className={styles.linkItem}>Rower</Link></li>
                <li><Link href="/strength" className={styles.linkItem}>Strength</Link></li>
                <li><Link href="/exercise-tools" className={styles.linkItem}>Exercise Tools</Link></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h5 className={styles.linkColTitle}>Company</h5>
              <ul className={styles.linkList}>
                <li><Link href="/blog" className={styles.linkItem}>Latest News (Blog)</Link></li>
                <li><Link href="/about" className={styles.linkItem}>About Us</Link></li>
                <li><Link href="/careers" className={styles.linkItem}>Careers</Link></li>
                <li><Link href="/legal" className={styles.linkItem}>Legal</Link></li>
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
          <div className={styles.legalLinks}>
            <Link href="#" className={styles.legalLink}>Privacy Policy</Link>
            <Link href="#" className={styles.legalLink}>Terms of Use</Link>
            <Link href="#" className={styles.legalLink}>Cookie Settings</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}

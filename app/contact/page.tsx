"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown, ChevronRight, Mail, MapPin, Phone } from "lucide-react"
import styles from "@/styles/pages/contact.module.css"

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)
  const phoneDisplay = "+92 300 000 0000"
  const phoneHref = "tel:+923000000000"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("loading")
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = {
      product: "Contact",
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      company: String(formData.get("company") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
    }

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Failed to submit")
      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
      setError("Submission failed. Please try again.")
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left column */}
          <div>
            <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
              <Link href="/" className={styles.breadcrumbLink}>Home</Link>
              <span className={styles.breadcrumbSep}>/</span>
              <span className={styles.breadcrumbActive}>Contact</span>
            </nav>
            <h1 className={styles.pageTitle}>Let&apos;s talk about your next setup.</h1>
            <p className={styles.pageDesc}>
              Use the form to reach our team for product questions, showroom visits, or business solutions.
            </p>

            <div className={styles.cardList}>
              <Link href="/shop" className={styles.contactCard}>
                <div>
                  <p className={styles.contactCardLabel}>Shop</p>
                  <p className={styles.contactCardTitle}>Browse equipment</p>
                </div>
                <div className={styles.contactCardIcon}>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Link>

              <a href="mailto:info@combaxxfitness.com" className={styles.contactCard}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div className={styles.contactCardIcon}>
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className={styles.contactCardLabel}>Email</p>
                    <p className={styles.contactCardTitle}>info@combaxxfitness.com</p>
                  </div>
                </div>
                <ArrowRight className={`h-5 w-5 ${styles.arrowIcon}`} />
              </a>

              <a href={phoneHref} className={styles.contactCard}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div className={styles.contactCardIcon}>
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className={styles.contactCardLabel}>Phone</p>
                    <p className={styles.contactCardTitle}>{phoneDisplay}</p>
                  </div>
                </div>
                <ArrowRight className={`h-5 w-5 ${styles.arrowIcon}`} />
              </a>

              <Link href="/shop" className={styles.contactCard}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div className={styles.contactCardIcon}>
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className={styles.contactCardLabel}>Showrooms</p>
                    <p className={styles.contactCardTitle}>Visit &amp; test in person</p>
                  </div>
                </div>
                <ArrowRight className={`h-5 w-5 ${styles.arrowIcon}`} />
              </Link>
            </div>
          </div>

          {/* Right column: form */}
          <div>
            <div className={styles.formBox}>
              <div className={styles.formHeader}>
                <div>
                  <h2 className={styles.formTitle}>Send a Message</h2>
                  <p className={styles.formSubtitle}>Share a few details and we&apos;ll get back to you shortly.</p>
                </div>
                <div className={styles.responseBadge}>
                  <span className={styles.responseBadgeInner}>Response 24–48h</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <input name="name" placeholder="Your Name" className={styles.input} required />
                  <input type="email" name="email" placeholder="Email Address" className={styles.input} required />
                </div>
                <div className={styles.formRow}>
                  <input name="phone" placeholder="Phone" className={styles.input} required />
                  <input name="company" placeholder="Company / Organization" className={styles.input} required />
                </div>
                <div className={styles.selectWrap}>
                  <select name="subject" className={styles.select} defaultValue="" required>
                    <option value="" disabled className="bg-black">Select a subject</option>
                    <option value="Product Inquiry" className="bg-black">Product Inquiry</option>
                    <option value="Showroom Visit" className="bg-black">Showroom Visit</option>
                    <option value="Business / B2B" className="bg-black">Business / B2B</option>
                    <option value="Support" className="bg-black">Support</option>
                  </select>
                  <div className={styles.selectChevron}>
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </div>
                <textarea name="message" placeholder="Tell us what you need" rows={5} className={styles.textarea} required />

                <div className={styles.formActions}>
                  <button type="submit" disabled={status === "loading"} className={styles.submitBtn}>
                    {status === "loading" ? "Sending..." : "Send Message"}
                    <ChevronRight className={`h-4 w-4 ${styles.submitArrow}`} strokeWidth={3} />
                  </button>
                  <p className={styles.disclaimer}>
                    By submitting, you agree to be contacted about your request.
                  </p>
                </div>

                {status === "success" && <p className={styles.successMsg}>Thanks! Your message has been sent.</p>}
                {status === "error" && <p className={styles.errorMsg}>{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown, ChevronRight, Mail, MapPin, Phone } from "lucide-react"

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
    <div className="min-h-screen bg-[#161616] text-white selection:bg-[#FF3333] selection:text-black">
      <div className="max-w-[1920px] mx-auto pt-24 md:pt-28 px-6 md:px-12 pb-16 mt-0 md:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-5">
            <nav
              aria-label="Breadcrumb"
              className="mb-2 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400"
            >
              <Link href="/" className="hover:text-white transition-colors">
               Home
              </Link>
              <span className="text-white/20">/</span>
              <span className="text-[#FF3333]">Contact</span>
            </nav>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-[1.05] mb-6">
              Let&apos;s talk about your next setup.
            </h1>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl">
              Use the form to reach our team for product questions, showroom visits, or business solutions.
            </p>

            <div className="mt-10 grid gap-4">
              <Link
                href="/shop"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/30 px-6 py-5 transition-colors hover:border-[#FF3333]"
              >
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-gray-400">Shop</p>
                  <p className="text-lg font-semibold">Browse equipment</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors group-hover:border-[#FF3333] group-hover:text-[#FF3333]">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Link>

              <a
                href="mailto:info@combaxxfitness.com"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/30 px-6 py-5 transition-colors hover:border-[#FF3333]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors group-hover:border-[#FF3333] group-hover:text-[#FF3333]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-gray-400">Email</p>
                    <p className="text-lg font-semibold">info@combaxxfitness.com</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-white/40 transition-colors group-hover:text-[#FF3333]" />
              </a>

              <a
                href={phoneHref}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/30 px-6 py-5 transition-colors hover:border-[#FF3333]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors group-hover:border-[#FF3333] group-hover:text-[#FF3333]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-gray-400">Phone</p>
                    <p className="text-lg font-semibold">{phoneDisplay}</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-white/40 transition-colors group-hover:text-[#FF3333]" />
              </a>

              <Link
                href="/shop"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/30 px-6 py-5 transition-colors hover:border-[#FF3333]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors group-hover:border-[#FF3333] group-hover:text-[#FF3333]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-gray-400">Showrooms</p>
                    <p className="text-lg font-semibold">Visit & test in person</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-white/40 transition-colors group-hover:text-[#FF3333]" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-[#0f0f0f] p-6 sm:p-8 md:p-10">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-[0.2em]">
                    Send a Message
                  </h2>
                  <p className="mt-2 text-sm text-gray-400">
                    Share a few details and we&apos;ll get back to you shortly.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-gray-300">
                    Response 24–48h
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="name"
                    placeholder="Your Name"
                    className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#FF3333]"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#FF3333]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="phone"
                    placeholder="Phone"
                    className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#FF3333]"
                    required
                  />
                  <input
                    name="company"
                    placeholder="Company / Organization"
                    className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#FF3333]"
                    required
                  />
                </div>

                <div className="relative">
                  <select
                    name="subject"
                    className="w-full appearance-none rounded-xl border border-white/20 bg-black/40 px-4 py-3 pr-14 text-white focus:outline-none focus:border-[#FF3333]"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled className="bg-black">
                      Select a subject
                    </option>
                    <option value="Product Inquiry" className="bg-black">
                      Product Inquiry
                    </option>
                    <option value="Showroom Visit" className="bg-black">
                      Showroom Visit
                    </option>
                    <option value="Business / B2B" className="bg-black">
                      Business / B2B
                    </option>
                    <option value="Support" className="bg-black">
                      Support
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/70">
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </div>

                <textarea
                  name="message"
                  placeholder="Tell us what you need"
                  rows={5}
                  className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#FF3333]"
                  required
                />

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/30 bg-black/20 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black hover:border-white disabled:opacity-60"
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
                    <ChevronRight
                      className="h-4 w-4 text-[#FF3333] transition-colors group-hover:text-black"
                      strokeWidth={3}
                    />
                  </button>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    By submitting, you agree to be contacted about your request.
                  </p>
                </div>

                {status === "success" && (
                  <p className="text-green-400 text-sm">
                    Thanks! Your message has been sent.
                  </p>
                )}
                {status === "error" && <p className="text-red-400 text-sm">{error}</p>}
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"

interface QuoteFormProps {
  productName: string
}

export default function QuoteForm({ productName }: QuoteFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("loading")
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = {
      product: productName,
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      company: String(formData.get("company") || ""),
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
    <form onSubmit={handleSubmit} className="space-y-4">
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
        />
        <input
          name="company"
          placeholder="Company / Organization"
          className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#FF3333]"
        />
      </div>
      <textarea
        name="message"
        placeholder="Tell us about your requirements"
        rows={4}
        className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#FF3333]"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-3 rounded-full bg-[#FF3333] px-6 py-3 text-sm font-bold uppercase tracking-[0.25em] text-black hover:bg-white hover:text-black transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Request a Quote"}
      </button>
      {status === "success" && (
        <p className="text-green-400 text-sm">Thanks! We&apos;ll get back to you shortly.</p>
      )}
      {status === "error" && <p className="text-red-400 text-sm">{error}</p>}
    </form>
  )
}

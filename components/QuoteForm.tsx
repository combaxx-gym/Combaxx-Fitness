"use client"

import { useState } from "react"
import styles from "@/styles/components/QuoteForm.module.css"

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
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.row}>
        <input
          name="name"
          placeholder="Your Name"
          className={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className={styles.input}
          required
        />
      </div>
      <div className={styles.row}>
        <input
          name="phone"
          placeholder="Phone"
          className={styles.input}
        />
        <input
          name="company"
          placeholder="Company / Organization"
          className={styles.input}
        />
      </div>
      <textarea
        name="message"
        placeholder="Tell us about your requirements"
        rows={4}
        className={styles.textarea}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className={styles.submitBtn}
      >
        {status === "loading" ? "Sending..." : "Request a Quote"}
      </button>
      {status === "success" && (
        <p className={styles.successMsg}>Thanks! We&apos;ll get back to you shortly.</p>
      )}
      {status === "error" && <p className={styles.errorMsg}>{error}</p>}
    </form>
  )
}

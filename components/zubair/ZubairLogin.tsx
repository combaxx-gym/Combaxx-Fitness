'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '@/styles/pages/zubair.module.css'

export default function ZubairLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/zubair/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'Login failed')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.loginPage}>
      <form className={styles.loginCard} onSubmit={onSubmit}>
        <p className={styles.eyebrow}>Combaxx Fitness</p>
        <h1 className={styles.loginTitle}>Price Dashboard</h1>
        <p className={styles.loginSub}>Sign in to view products and update prices.</p>

        <label className={styles.field}>
          <span>Email</span>
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </label>

        <label className={styles.field}>
          <span>Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </label>

        {error && <p className={styles.error} role="alert">{error}</p>}

        <button type="submit" className={styles.primaryBtn} disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}

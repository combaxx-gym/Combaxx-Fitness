'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChevronDown, ExternalLink, LogOut, Search } from 'lucide-react'
import styles from '@/styles/pages/zubair.module.css'

export type ZubairProductRow = {
  _id: string
  name: string
  sku: string
  price: number | null
  imageUrl: string
  series: string
  categories: string
  path: string
  url: string
}

export default function ZubairDashboard({
  email,
  products,
  seriesOptions,
  categoryOptions,
}: {
  email: string
  products: ZubairProductRow[]
  /** Sanity categories whose name contains "Series" */
  seriesOptions: string[]
  /** Sanity categories without "Series" in the name (your 7 categories) */
  categoryOptions: string[]
}) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [seriesFilter, setSeriesFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [drafts, setDrafts] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {}
    for (const p of products) init[p._id] = p.price == null ? '' : String(p.price)
    return init
  })
  const [saved, setSaved] = useState<Record<string, number | null>>(() => {
    const init: Record<string, number | null> = {}
    for (const p of products) init[p._id] = p.price
    return init
  })
  const [busyId, setBusyId] = useState<string | null>(null)
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  const splitList = (value: string) =>
    !value || value === '—' ? [] : value.split(',').map(s => s.trim()).filter(Boolean)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter(p => {
      if (seriesFilter !== 'all' && !splitList(p.series).includes(seriesFilter)) return false
      if (categoryFilter !== 'all' && !splitList(p.categories).includes(categoryFilter)) return false
      if (!q) return true
      return [p.name, p.sku, p.series, p.categories, p.path].join(' ').toLowerCase().includes(q)
    })
  }, [products, query, seriesFilter, categoryFilter])

  const logout = async () => {
    await fetch('/api/zubair/logout', { method: 'POST' })
    router.refresh()
  }

  const savePrice = async (id: string) => {
    setMsg(null)
    setBusyId(id)
    try {
      const raw = drafts[id] ?? ''
      const res = await fetch('/api/zubair/price', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: id,
          price: raw.trim() === '' ? null : Number(raw),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'Update failed')
      const next = data.price as number | null
      setSaved(prev => ({ ...prev, [id]: next }))
      setDrafts(prev => ({ ...prev, [id]: next == null ? '' : String(next) }))
      setMsg({ type: 'ok', text: 'Price saved.' })
    } catch (err) {
      setMsg({ type: 'err', text: err instanceof Error ? err.message : 'Update failed' })
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className={styles.dash}>
      <header className={styles.topbar}>
        <div>
          <p className={styles.eyebrow}>Combaxx Fitness</p>
          <h1 className={styles.title}>Product Price List</h1>
          <p className={styles.sub}>Signed in as {email}</p>
        </div>
        <button type="button" className={styles.ghostBtn} onClick={logout}>
          <LogOut size={16} /> Logout
        </button>
      </header>

      <div className={styles.toolbar}>
        <label className={styles.search}>
          <Search size={16} />
          <input
            type="search"
            placeholder="Search name, SKU, series, category…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </label>

        <label className={styles.filterWrap}>
          <span className={styles.filterLabel}>Series</span>
          <span className={styles.selectWrap}>
            <select
              className={styles.filterSelect}
              value={seriesFilter}
              onChange={e => setSeriesFilter(e.target.value)}
              aria-label="Filter by series"
            >
              <option value="all">All series</option>
              {seriesOptions.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown size={14} className={styles.selectChevron} />
          </span>
        </label>

        <label className={styles.filterWrap}>
          <span className={styles.filterLabel}>Category</span>
          <span className={styles.selectWrap}>
            <select
              className={styles.filterSelect}
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              aria-label="Filter by category"
            >
              <option value="all">All categories</option>
              {categoryOptions.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown size={14} className={styles.selectChevron} />
          </span>
        </label>

        <p className={styles.count}>{filtered.length} products</p>
      </div>

      {msg && (
        <p className={msg.type === 'ok' ? styles.okMsg : styles.error} role="status">
          {msg.text}
        </p>
      )}

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Series</th>
              <th>Categories</th>
              <th>Price</th>
              <th>Product URL</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const dirty = (drafts[p._id] ?? '') !== (saved[p._id] == null ? '' : String(saved[p._id]))
              return (
                <tr key={p._id}>
                  <td>
                    <div className={styles.productCell}>
                      <div className={styles.thumb}>
                        {p.imageUrl ? (
                          <Image src={p.imageUrl} alt="" width={56} height={56} unoptimized />
                        ) : (
                          <span />
                        )}
                      </div>
                      <div>
                        <p className={styles.productName}>{p.name}</p>
                        {p.sku && <p className={styles.sku}>SKU: {p.sku}</p>}
                      </div>
                    </div>
                  </td>
                  <td className={styles.series}>{p.series}</td>
                  <td className={styles.cats}>{p.categories}</td>
                  <td>
                    <div className={styles.priceCell}>
                      <input
                        className={styles.priceInput}
                        type="number"
                        min={0}
                        step="0.01"
                        inputMode="decimal"
                        placeholder="—"
                        value={drafts[p._id] ?? ''}
                        onChange={e => setDrafts(prev => ({ ...prev, [p._id]: e.target.value }))}
                        disabled={busyId === p._id}
                      />
                      <button
                        type="button"
                        className={styles.saveBtn}
                        disabled={!dirty || busyId === p._id}
                        onClick={() => savePrice(p._id)}
                      >
                        {busyId === p._id ? '…' : 'Save'}
                      </button>
                    </div>
                  </td>
                  <td>
                    <a className={styles.url} href={p.path} target="_blank" rel="noopener noreferrer">
                      <span>{p.url}</span>
                      <ExternalLink size={14} />
                    </a>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className={styles.empty}>No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

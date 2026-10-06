export interface QuoteCartItem {
  _id: string
  name: string
  slug: string
  sku?: string
  image?: string
  categorySlug?: string
  qty: number
}

const STORAGE_KEY = 'quoteCart'
export const QUOTE_CART_UPDATED = 'quoteCartUpdated'
export const QUOTE_CART_OPEN = 'quoteCartOpen'

export function getQuoteCart(): QuoteCartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    if (!Array.isArray(raw)) return []
    return raw
      .filter((i): i is QuoteCartItem => !!i && typeof i._id === 'string')
      .map(i => ({ ...i, qty: Math.max(1, Number(i.qty) || 1) }))
  } catch {
    return []
  }
}

function saveQuoteCart(items: QuoteCartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  window.dispatchEvent(new Event(QUOTE_CART_UPDATED))
}

export function addToQuoteCart(item: Omit<QuoteCartItem, 'qty'> & { qty?: number }) {
  const cart = getQuoteCart()
  const existing = cart.find(i => i._id === item._id)
  if (existing) {
    Object.assign(existing, { ...item, qty: existing.qty })
  } else {
    cart.push({ ...item, qty: item.qty ?? 1 })
  }
  saveQuoteCart(cart)
}

export function setQuoteCartQty(id: string, qty: number) {
  saveQuoteCart(getQuoteCart().map(i => (i._id === id ? { ...i, qty: Math.min(999, Math.max(1, qty)) } : i)))
}

export function removeFromQuoteCart(id: string) {
  saveQuoteCart(getQuoteCart().filter(i => i._id !== id))
}

export function clearQuoteCart() {
  saveQuoteCart([])
}

export function isInQuoteCart(id: string) {
  return getQuoteCart().some(i => i._id === id)
}

export function openQuoteCart() {
  window.dispatchEvent(new Event(QUOTE_CART_OPEN))
}

export function getProductPath(item: Pick<QuoteCartItem, 'slug' | 'categorySlug'>) {
  return `/${item.categorySlug || 'shop'}/${item.slug}`
}

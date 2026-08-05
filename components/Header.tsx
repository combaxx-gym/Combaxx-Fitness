"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { Search, X } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import type { SanityImageSource } from "@sanity/image-url"
import MegaMenu from "@/components/MegaMenu"
import styles from "@/styles/components/Header.module.css"

interface SearchResult {
  _id: string
  name: string
  slug: { current: string }
  image?: SanityImageSource
  category?: { name?: string; slug?: { current?: string } }
  categories?: Array<{ name?: string; slug?: { current?: string } }>
}

async function searchProducts(query: string): Promise<SearchResult[]> {
  if (!query.trim() || query.trim().length < 2) return []
  const pattern = `*${query.toLowerCase()}*`
  return client.fetch(
    `*[_type in ["product", "products"] && (
      lower(name) match $pattern ||
      lower(coalesce(title, "")) match $pattern
    )] | order(_score desc) [0...7]{
      _id,
      "name": coalesce(name, title),
      slug,
      image,
      category->{name, slug},
      categories[]->{name, slug}
    }`,
    { pattern }
  )
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <span>{text}</span>
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
  const parts = text.split(regex)
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part)
          ? <mark key={i} className={styles.highlight}>{part}</mark>
          : <span key={i}>{part}</span>
      )}
    </span>
  )
}

export default function Header() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [isMegaOpen, setIsMegaOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const searchWrapRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const megaLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (searchQuery.trim().length < 2) {
      setResults([])
      setShowDropdown(false)
      setIsSearching(false)
      return
    }
    setIsSearching(true)
    setShowDropdown(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const data = await searchProducts(searchQuery)
        setResults(data)
      } catch {
        setResults([])
      } finally {
        setIsSearching(false)
      }
    }, 300)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [searchQuery])

  // Click outside search → close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const openSearch = useCallback(() => {
    setIsSearchOpen(true)
    setIsMegaOpen(false)
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [])

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false)
    setSearchQuery("")
    setResults([])
    setShowDropdown(false)
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") closeSearch()
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`)
      closeSearch()
    }
  }, [closeSearch, searchQuery, router])

  const getProductUrl = (r: SearchResult) => {
    const cat = r.category?.slug?.current || r.categories?.[0]?.slug?.current || "shop"
    return `/${cat}/${r.slug.current}`
  }

  const getCategoryName = (r: SearchResult) =>
    r.category?.name || r.categories?.[0]?.name || ""

  // Mega menu hover logic with a small delay to prevent flicker
  const handleProductsEnter = useCallback(() => {
    if (megaLeaveTimer.current) clearTimeout(megaLeaveTimer.current)
    setIsMegaOpen(true)
    if (isSearchOpen) closeSearch()
  }, [isSearchOpen, closeSearch])

  const handleMegaLeave = useCallback(() => {
    megaLeaveTimer.current = setTimeout(() => setIsMegaOpen(false), 100)
  }, [])

  const handleMegaEnter = useCallback(() => {
    if (megaLeaveTimer.current) clearTimeout(megaLeaveTimer.current)
  }, [])

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}
    >
      <div className={styles.inner}>

        {/* Logo */}
        <div className={styles.logoWrap}>
          <Link href="/">
            <Image
              src="/images/COMBAXX FITNESS logo.png"
              alt="COMBAXX FITNESS Logo"
              width={150}
              height={80}
              className="site-logo"
              sizes="(min-width: 768px) 160px, 150px"
              style={{ width: undefined, height: 'auto' }}
              priority
              unoptimized
            />
          </Link>
        </div>

        {/* Center Navigation */}
        <div className={styles.navWrap}>
          <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
            {/* Products with mega menu trigger */}
            <div className={styles.megaTrigger} onMouseEnter={handleProductsEnter}>
              <Link
                href="/shop"
                className={`${styles.navLink} ${isMegaOpen ? styles.navLinkActive : ""}`}
              >
                Products
                <span className={`${styles.chevron} ${isMegaOpen ? styles.chevronOpen : ""}`}>▾</span>
              </Link>
            </div>


            <Link href="/materials-information" className={styles.navLink}>Materials Information</Link>
            <Link href="/stories" className={styles.navLink}>Stories</Link>
            <Link href="/contact" className={styles.navLink}>Contact</Link>
          </nav>
        </div>

        {/* Right Pill */}
        <div className={`${styles.rightPill} ${scrolled ? styles.rightPillScrolled : ""}`}>
          {/* Search */}
          <div className={styles.searchWrap} ref={searchWrapRef}>
            {isSearchOpen ? (
              <div className={styles.searchInputWrap}>
                <Search size={14} className={styles.searchIcon} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search products..."
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  aria-label="Search products"
                  aria-expanded={showDropdown}
                  role="combobox"
                  aria-autocomplete="list"
                />
                <button onClick={closeSearch} className={styles.iconBtn} aria-label="Close search">
                  <X size={15} />
                </button>

                {/* Results Dropdown */}
                {showDropdown && (
                  <div className={styles.dropdown} role="listbox" aria-label="Search results">
                    {isSearching ? (
                      <div className={styles.dropdownLoading}>
                        <span className={styles.spinner} />
                        <span>Searching…</span>
                      </div>
                    ) : results.length > 0 ? (
                      <>
                        {results.map(r => (
                          <Link
                            key={r._id}
                            href={getProductUrl(r)}
                            className={styles.dropdownItem}
                            onClick={closeSearch}
                            role="option"
                          >
                            <div className={styles.dropdownImgWrap}>
                              {r.image ? (
                                <Image
                                  src={urlFor(r.image).width(64).height(64).url()}
                                  alt={r.name}
                                  fill
                                  className={styles.dropdownImg}
                                  sizes="40px"
                                  unoptimized
                                />
                              ) : (
                                <div className={styles.dropdownImgFallback}>
                                  <Search size={14} />
                                </div>
                              )}
                            </div>
                            <div className={styles.dropdownInfo}>
                              <span className={styles.dropdownName}>
                                <HighlightMatch text={r.name} query={searchQuery} />
                              </span>
                              {getCategoryName(r) && (
                                <span className={styles.dropdownCat}>{getCategoryName(r)}</span>
                              )}
                            </div>
                            <span className={styles.dropdownArrow}>→</span>
                          </Link>
                        ))}
                        <Link
                          href={`/shop?q=${encodeURIComponent(searchQuery.trim())}`}
                          className={styles.dropdownFooter}
                          onClick={closeSearch}
                        >
                          View all results for &ldquo;{searchQuery}&rdquo;
                        </Link>
                      </>
                    ) : (
                      <div className={styles.dropdownEmpty}>
                        No products found for &ldquo;{searchQuery}&rdquo;
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <button onClick={openSearch} className={styles.iconBtn} aria-label="Open search">
                <Search size={18} />
              </button>
            )}
          </div>

          <SignedOut>
            <SignInButton mode="modal">
              <button className={styles.loginBtn}>Login</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: { avatarBox: "w-8 h-8 ring-2 ring-white/20 hover:ring-[#FF3333] transition-all" },
              }}
            />
          </SignedIn>
        </div>
      </div>

      {/* Mega Menu — rendered inside header so position:absolute works */}
      <div onMouseEnter={handleMegaEnter} onMouseLeave={handleMegaLeave}>
        <MegaMenu 
          isOpen={isMegaOpen} 
          onClose={() => setIsMegaOpen(false)} 
          onMouseEnter={handleMegaEnter} 
          onMouseLeave={handleMegaLeave} 
        />
      </div>
    </header>
  )
}

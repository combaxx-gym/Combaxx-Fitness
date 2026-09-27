"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search, X, Menu } from "lucide-react"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
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
  const pattern = `*${query.trim().toLowerCase()}*`
  return client.fetch(
    `*[_type == "product" && defined(slug.current) && (
      name match $pattern ||
      coalesce(title, "") match $pattern
    )][0...8]{
      _id,
      "name": coalesce(name, title, "Product"),
      slug,
      image,
      category->{name, slug},
      categories[]->{name, slug}
    }`,
    { pattern }
  )
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim() || !text) return <span>{text}</span>
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const parts = text.split(new RegExp(`(${escaped})`, "gi"))
  const q = query.toLowerCase()
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === q
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
  const [megaPinned, setMegaPinned] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const searchWrapRef = useRef<HTMLDivElement>(null)
  const mobileSearchRef = useRef<HTMLDivElement>(null)
  const desktopInputRef = useRef<HTMLInputElement>(null)
  const mobileInputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const megaLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isMegaOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [isMegaOpen])

  useEffect(() => {
    if (!isSearchOpen) return
    const prev = document.body.style.overflow
    const isMobile = window.matchMedia("(max-width: 767px)").matches
    if (isMobile) document.body.style.overflow = "hidden"
    const t = setTimeout(() => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        mobileInputRef.current?.focus()
      } else {
        desktopInputRef.current?.focus()
      }
    }, 50)
    return () => {
      document.body.style.overflow = prev
      clearTimeout(t)
    }
  }, [isSearchOpen])

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
        setResults(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error("[Header search]", err)
        setResults([])
      } finally {
        setIsSearching(false)
      }
    }, 300)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      const inDesktop = searchWrapRef.current?.contains(target)
      const inMobile = mobileSearchRef.current?.contains(target)
      if (!inDesktop && !inMobile) setShowDropdown(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const closeMega = useCallback(() => {
    setIsMegaOpen(false)
    setMegaPinned(false)
  }, [])

  const toggleMega = useCallback(() => {
    setIsMegaOpen(prev => {
      const next = !prev
      setMegaPinned(next)
      return next
    })
    setIsSearchOpen(false)
    setSearchQuery("")
    setResults([])
    setShowDropdown(false)
  }, [])

  const openSearch = useCallback(() => {
    setIsSearchOpen(true)
    closeMega()
  }, [closeMega])

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

  const handleProductsEnter = useCallback(() => {
    if (megaPinned) return
    if (megaLeaveTimer.current) clearTimeout(megaLeaveTimer.current)
    setIsMegaOpen(true)
    if (isSearchOpen) closeSearch()
  }, [megaPinned, isSearchOpen, closeSearch])

  const handleMegaLeave = useCallback(() => {
    if (megaPinned) return
    megaLeaveTimer.current = setTimeout(() => setIsMegaOpen(false), 100)
  }, [megaPinned])

  const handleMegaEnter = useCallback(() => {
    if (megaLeaveTimer.current) clearTimeout(megaLeaveTimer.current)
  }, [])

  const renderResults = (listClassName: string) => (
    <div className={listClassName} role="listbox" aria-label="Search results">
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
  )

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
      <div className={styles.inner}>
        <div className={styles.logoWrap}>
          <Link href="/">
            <Image
              src="/images/COMBAXX FITNESS logo.png"
              alt="COMBAXX FITNESS Logo"
              width={150}
              height={80}
              className="site-logo"
              sizes="(min-width: 768px) 160px, 120px"
              style={{ width: undefined, height: "auto" }}
              priority
              unoptimized
            />
          </Link>
        </div>

        <div className={styles.navWrap}>
          <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
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

        <div className={`${styles.rightPill} ${scrolled ? styles.rightPillScrolled : ""}`}>
          <div className={styles.searchWrap} ref={searchWrapRef}>
            <button
              onClick={() => (isSearchOpen ? closeSearch() : openSearch())}
              className={`${styles.iconBtn} ${isSearchOpen ? styles.iconBtnActive : ""}`}
              aria-label={isSearchOpen ? "Close search" : "Open search"}
              aria-expanded={isSearchOpen}
              type="button"
            >
              {isSearchOpen ? <X size={18} /> : <Search size={18} />}
            </button>

            {/* Desktop search popover — stays inside screen, does not expand header */}
            {isSearchOpen && (
              <div className={styles.desktopSearchPanel}>
                <div className={styles.desktopSearchBar}>
                  <Search size={14} className={styles.searchIcon} />
                  <input
                    ref={desktopInputRef}
                    type="text"
                    placeholder="Search products..."
                    className={styles.desktopSearchInput}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    aria-label="Search products"
                    aria-expanded={showDropdown}
                    role="combobox"
                    aria-autocomplete="list"
                    autoComplete="off"
                  />
                </div>
                {showDropdown && renderResults(styles.dropdown)}
              </div>
            )}
          </div>

          <div className={styles.desktopAuth}>
            <SignedOut>
              <SignInButton mode="modal">
                <button type="button" className={styles.loginBtn}>Login</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 ring-2 ring-white/20 hover:ring-[#FF3333] transition-all",
                  },
                }}
              />
            </SignedIn>
          </div>

          <button
            type="button"
            className={`${styles.menuBtn} ${isMegaOpen ? styles.menuBtnActive : ""}`}
            aria-label={isMegaOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMegaOpen}
            onClick={toggleMega}
          >
            {isMegaOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile search overlay — never expands the header pill */}
      {isSearchOpen && (
        <div className={styles.mobileSearchOverlay} ref={mobileSearchRef}>
          <button
            type="button"
            className={styles.mobileSearchBackdrop}
            aria-label="Close search"
            onClick={closeSearch}
          />
          <div className={styles.mobileSearchSheet}>
            <div className={styles.mobileSearchBar}>
              <Search size={16} className={styles.searchIcon} />
              <input
                ref={mobileInputRef}
                type="text"
                placeholder="Search products..."
                className={styles.mobileSearchInput}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Search products"
                autoComplete="off"
              />
              <button onClick={closeSearch} className={styles.iconBtn} aria-label="Close search" type="button">
                <X size={18} />
              </button>
            </div>
            {showDropdown && renderResults(styles.mobileSearchResults)}
          </div>
        </div>
      )}

      <div onMouseEnter={handleMegaEnter} onMouseLeave={handleMegaLeave}>
        <MegaMenu
          isOpen={isMegaOpen}
          onClose={closeMega}
          onMouseEnter={handleMegaEnter}
          onMouseLeave={handleMegaLeave}
        />
      </div>
    </header>
  )
}

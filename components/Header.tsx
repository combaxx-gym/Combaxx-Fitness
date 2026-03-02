"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image" // Keeping this for the logo option
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { Search, X } from "lucide-react"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        scrolled ? "py-6 shadow-xl backdrop-blur-md bg-black/10" : "py-10 bg-gradient-to-b from-black/90 to-transparent"
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex-shrink-0 z-50 ml-4 md:ml-6">
            <Link href="/">
               <Image 
                 src="/images/COMBAXX FITNESS logo.png" 
                 alt="COMBAXX FITNESS Logo" 
                 width={150} 
                 height={80} 
                 className="object-contain w-30 md:w-40 h-auto"
               /> 
            </Link>
        </div>

        {/* Center Navigation - The "Pill" Style from Screenshot */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500">
            <nav className={`hidden md:flex items-center gap-8 text-[12px] font-bold uppercase tracking-[0.15em] transition-all duration-500 ${
                scrolled 
                ? "bg-[#1A1A1A] text-white px-8 py-3 rounded-full border border-white/10 shadow-2xl" 
                : "bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-full border border-white/10"
            }`}>
            <Link href="/products" className="hover:text-[#FF3333] transition-colors">Products</Link>
            <Link href="/wellness" className="hover:text-[#FF3333] transition-colors">Wellness</Link>
            <Link href="/materials-information" className="hover:text-[#FF3333] transition-colors">Materials Information</Link>
            <Link href="/stories" className="hover:text-[#FF3333] transition-colors">Stories</Link>
            <Link href="/contact" className="hover:text-[#FF3333] transition-colors">Contact</Link>
            </nav>
        </div>

        {/* Right Section - User Profile & Search */}
        <div className={`flex items-center gap-6 z-50 transition-all duration-500 ${
             scrolled 
             ? "bg-[#1A1A1A] px-6 py-2.5 rounded-full border border-white/10 shadow-2xl" 
             : "bg-white/10 backdrop-blur-sm px-6 py-2.5 rounded-full border border-white/10"
        }`}>
            {/* Search Component */}
            <div className="flex items-center border-r border-white/20 pr-6 mr-2">
                {isSearchOpen ? (
                    <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-300">
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className="bg-transparent border-b border-white/30 text-white text-xs focus:outline-none w-32 placeholder:text-white/50"
                            autoFocus
                        />
                        <button onClick={() => setIsSearchOpen(false)} className="text-white hover:text-[#FF3333] transition-colors">
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <button onClick={() => setIsSearchOpen(true)} className="text-white hover:text-[#FF3333] transition-colors">
                        <Search size={18} />
                    </button>
                )}
            </div>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-xs font-bold uppercase tracking-widest text-white hover:text-[#FF3333] transition-colors">
                  Login
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 ring-2 ring-white/20 hover:ring-[#FF3333] transition-all"
                  }
                }}
              />
            </SignedIn>
        </div>
      </div>
    </header>
  )
}

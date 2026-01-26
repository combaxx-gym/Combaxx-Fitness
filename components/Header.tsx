"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image" // Keeping this for the logo option
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

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
        scrolled ? "py-4 bg-gradient-to-b from-black/80 to-transparent" : "py-6 bg-gradient-to-b from-black/50 to-transparent"
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex-shrink-0 z-50">
             <Link href="/">
                <Image 
                  src="/images/combaxx white.png" 
                  alt="Combaxx Logo" 
                  width={200} 
                  height={80} 
                  className="object-contain h-12 md:h-16 w-auto" 
                /> 
             </Link>
        </div>

        {/* Center Navigation - The "Pill" Style from Screenshot */}
        <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 ${
            scrolled ? "top-4" : "top-8"
        }`}>
            <nav className={`hidden md:flex items-center gap-8 text-[12px] font-bold uppercase tracking-[0.15em] transition-all duration-500 ${
                scrolled 
                ? "bg-[#1A1A1A] text-white px-8 py-3 rounded-full border border-white/10 shadow-2xl" 
                : "bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-full border border-white/10"
            }`}>
            <Link href="#" className="hover:text-[#F0D348] transition-colors">Equipment</Link>
            <Link href="#" className="hover:text-[#F0D348] transition-colors">Apparel</Link>
            <Link href="#" className="hover:text-[#F0D348] transition-colors">Accessories</Link>
            <Link href="#" className="hover:text-[#F0D348] transition-colors">About Us</Link>
            </nav>
        </div>

        {/* Right Section - User Profile (No Cart) */}
        <div className="flex items-center gap-6 z-50">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-xs font-bold uppercase tracking-widest text-white hover:text-[#F0D348] transition-colors border-b border-transparent hover:border-[#F0D348] pb-1">
                  Login
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 ring-1 ring-white/20 hover:ring-[#F0D348] transition-all"
                  }
                }}
              />
            </SignedIn>
        </div>
      </div>
    </header>
  )
}

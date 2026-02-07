import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Mail, Instagram, Facebook, Twitter, Youtube, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white pt-20 pb-10 border-t border-white/5">
      
      {/* Top CTA Section (Neutral Dark Blocks) */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#111] border border-white/10 text-white p-8 md:p-12 rounded-2xl group cursor-pointer hover:border-[#FF3333] transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1">
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4 group-hover:text-[#FF3333] transition-colors">Join the Community</h3>
            <p className="font-medium mb-8 opacity-60 group-hover:opacity-100 transition-opacity">Unlock exclusive training content and member-only offers.</p>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest border border-white/20 px-6 py-3 w-fit group-hover:border-[#FF3333] group-hover:text-[#FF3333] transition-colors rounded-full">
              Become a Member <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#111] border border-white/10 text-white p-8 md:p-12 rounded-2xl group cursor-pointer hover:border-[#FF3333] transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1">
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4 group-hover:text-[#FF3333] transition-colors">Visit Our Showrooms</h3>
            <p className="font-medium mb-8 opacity-60 group-hover:opacity-100 transition-opacity">Experience the equipment in person at our boutiques.</p>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest border border-white/20 px-6 py-3 w-fit group-hover:border-[#FF3333] group-hover:text-[#FF3333] transition-colors rounded-full">
              Find Nearest <MapPin className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#111] border border-white/10 text-white p-8 md:p-12 rounded-2xl group cursor-pointer hover:border-[#FF3333] transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1">
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4 group-hover:text-[#FF3333] transition-colors">Business Solutions</h3>
            <p className="font-medium mb-8 opacity-60 group-hover:opacity-100 transition-opacity">Equip your gym or hotel with professional gear.</p>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest border border-white/20 px-6 py-3 w-fit group-hover:border-[#FF3333] group-hover:text-[#FF3333] transition-colors rounded-full">
              Explore B2B <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 border-b border-white/10 pb-16">
        
        {/* Centered Logo */}
        <div className="flex justify-center mb-8">
            <Link href="/" className="block w-fit">
              <Image 
                  src="/images/combaxx white.png" 
                  alt="Combaxx Logo" 
                  width={280} 
                  height={120} 
                  className="object-contain h-20 w-auto" 
              />
            </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left: Newsletter */}
          <div className="lg:col-span-4 bg-[#111] p-8 rounded-2xl border border-white/5">
            <h4 className="text-2xl font-bold uppercase tracking-widest mb-4 text-[#FFF]">Newsletter Signup</h4>
            <p className="text-gray-400 text-base mb-6 leading-relaxed">
              Get the latest news, product launches, and training tips delivered directly to your inbox.
            </p>
            <div className="space-y-4">
               <input 
                 type="email" 
                 placeholder="Enter your email" 
                 className="w-full bg-black border border-white/20 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-[#FF3333] transition-colors text-base"
               />
               <button className="w-full bg-[#FF3333] text-white font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-white hover:text-black transition-colors flex justify-center items-center gap-2">
                 Subscribe Now <Mail className="w-5 h-5" />
               </button>
            </div>
          </div>

          {/* Middle: Links */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Column 1: Main Navigation (Header Links) */}
             <div>
                <h5 className="text-xl font-bold text-[#FFF] uppercase tracking-widest mb-6">Explore</h5>
                <ul className="space-y-4 text-lg text-white">
                   <li><Link href="/products" className="hover:text-[#FF3333] transition-colors">Products</Link></li>
                   <li><Link href="/wellness" className="hover:text-[#FF3333] transition-colors">Wellness</Link></li>
                   <li><Link href="/materials-information" className="hover:text-[#FF3333] transition-colors">Materials Information</Link></li>
                   <li><Link href="/stories" className="hover:text-[#FF3333] transition-colors">Stories</Link></li>
                   <li><Link href="/contact" className="hover:text-[#FF3333] transition-colors">Contact</Link></li>
                </ul>
             </div>
             
             {/* Column 2: Product Categories */}
             <div>
                <h5 className="text-xl font-bold text-[#FFF] uppercase tracking-widest mb-6">Categories</h5>
                <ul className="space-y-4 text-lg text-white">
                   <li><Link href="/product-categories" className="hover:text-[#FF3333] transition-colors">Treadmills</Link></li>
                   <li><Link href="/product-categories" className="hover:text-[#FF3333] transition-colors">Bikes</Link></li>
                   <li><Link href="/product-categories" className="hover:text-[#FF3333] transition-colors">Ellipticals</Link></li>
                   <li><Link href="/product-categories" className="hover:text-[#FF3333] transition-colors">Rower</Link></li>
                   <li><Link href="/product-categories" className="hover:text-[#FF3333] transition-colors">Strength</Link></li>
                   <li><Link href="/product-categories" className="hover:text-[#FF3333] transition-colors">Exercise Tools</Link></li>
                </ul>
             </div>

             {/* Column 3: Company */}
             <div>
                <h5 className="text-xl font-bold text-[#FFF] uppercase tracking-widest mb-6">Company</h5>
                <ul className="space-y-4 text-lg text-white">
                   <li><Link href="/blog" className="hover:text-[#FF3333] transition-colors">Latest News (Blog)</Link></li>
                   <li><Link href="/about" className="hover:text-[#FF3333] transition-colors">About Us</Link></li>
                   <li><Link href="/careers" className="hover:text-[#FF3333] transition-colors">Careers</Link></li>
                   <li><Link href="/legal" className="hover:text-[#FF3333] transition-colors">Legal</Link></li>
                </ul>
             </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
         {/* Social Icons (Replaces Logo) */}
         <div className="flex gap-4">
            <Link href="#" className="w-10 h-10 bg-[#FF3333] rounded-full flex items-center justify-center hover:bg-white hover:text-[#FF3333] transition-colors group">
              <Instagram className="w-5 h-5 text-white group-hover:text-[#FF3333] transition-colors" />
            </Link>
            <Link href="#" className="w-10 h-10 bg-[#FF3333] rounded-full flex items-center justify-center hover:bg-white hover:text-[#FF3333] transition-colors group">
              <Facebook className="w-5 h-5 text-white group-hover:text-[#FF3333] transition-colors" />
            </Link>
            <Link href="#" className="w-10 h-10 bg-[#FF3333] rounded-full flex items-center justify-center hover:bg-white hover:text-[#FF3333] transition-colors group">
              <Twitter className="w-5 h-5 text-white group-hover:text-[#FF3333] transition-colors" />
            </Link>
            <Link href="#" className="w-10 h-10 bg-[#FF3333] rounded-full flex items-center justify-center hover:bg-white hover:text-[#FF3333] transition-colors group">
              <Youtube className="w-5 h-5 text-white group-hover:text-[#FF3333] transition-colors" />
            </Link>
            <Link href="#" className="w-10 h-10 bg-[#FF3333] rounded-full flex items-center justify-center hover:bg-white hover:text-[#FF3333] transition-colors group">
              <Linkedin className="w-5 h-5 text-white group-hover:text-[#FF3333] transition-colors" />
            </Link>
         </div>

         {/* Copyright */}
         <div className="text-gray-500 text-xs md:text-sm text-center md:text-right space-y-2">
            <p>&copy; {new Date().getFullYear()} COMBAXX. All rights reserved.</p>
            <div className="flex gap-4 justify-center md:justify-end">
               <Link href="#" className="hover:text-white">Privacy Policy</Link>
               <Link href="#" className="hover:text-white">Terms of Use</Link>
               <Link href="#" className="hover:text-white">Cookie Settings</Link>
            </div>
         </div>
      </div>

    </footer>
  )
}

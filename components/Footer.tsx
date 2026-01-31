import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white pt-20 pb-10 border-t border-white/5">
      
      {/* Top CTA Section (Red Blocks) */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#FF3333] text-white p-8 md:p-12 rounded-2xl group cursor-pointer hover:bg-white hover:text-black transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1">
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">Join the Community</h3>
            <p className="font-medium mb-8 opacity-90">Unlock exclusive training content and member-only offers.</p>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest border border-white px-6 py-3 w-fit group-hover:border-black transition-colors rounded-full">
              Become a Member <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#FF3333] text-white p-8 md:p-12 rounded-2xl group cursor-pointer hover:bg-white hover:text-black transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1">
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">Visit Our Showrooms</h3>
            <p className="font-medium mb-8 opacity-90">Experience the equipment in person at our boutiques.</p>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest border border-white px-6 py-3 w-fit group-hover:border-black transition-colors rounded-full">
              Find Nearest <MapPin className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#FF3333] text-white p-8 md:p-12 rounded-2xl group cursor-pointer hover:bg-white hover:text-black transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1">
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">Business Solutions</h3>
            <p className="font-medium mb-8 opacity-90">Equip your gym or hotel with professional gear.</p>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest border border-white px-6 py-3 w-fit group-hover:border-black transition-colors rounded-full">
              Explore B2B <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 border-b border-white/10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left: Newsletter */}
          <div className="lg:col-span-4 bg-[#111] p-8 rounded-2xl border border-white/5">
            <h4 className="text-xl font-bold uppercase tracking-widest mb-4 text-[#FF3333]">Newsletter Signup</h4>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Get the latest news, product launches, and training tips delivered directly to your inbox.
            </p>
            <div className="space-y-4">
               <input 
                 type="email" 
                 placeholder="Enter your email" 
                 className="w-full bg-black border border-white/20 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-[#FF3333] transition-colors text-sm"
               />
               <button className="w-full bg-[#FF3333] text-white font-bold uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-white hover:text-black transition-colors flex justify-center items-center gap-2">
                 Subscribe Now <Mail className="w-4 h-4" />
               </button>
            </div>
          </div>

          {/* Middle: Links */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Column 1: Main Navigation (Header Links) */}
             <div>
                <h5 className="text-sm font-bold text-[#FF3333] uppercase tracking-widest mb-6">Explore</h5>
                <ul className="space-y-4 text-sm text-gray-400">
                   <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
                   <li><Link href="/wellness" className="hover:text-white transition-colors">Wellness</Link></li>
                   <li><Link href="/materials-information" className="hover:text-white transition-colors">Materials Information</Link></li>
                   <li><Link href="/stories" className="hover:text-white transition-colors">Stories</Link></li>
                   <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
             </div>
             
             {/* Column 2: Product Categories */}
             <div>
                <h5 className="text-sm font-bold text-[#FF3333] uppercase tracking-widest mb-6">Categories</h5>
                <ul className="space-y-4 text-sm text-gray-400">
                   <li><Link href="/product-categories" className="hover:text-white transition-colors">Treadmills</Link></li>
                   <li><Link href="/product-categories" className="hover:text-white transition-colors">Bikes</Link></li>
                   <li><Link href="/product-categories" className="hover:text-white transition-colors">Ellipticals</Link></li>
                   <li><Link href="/product-categories" className="hover:text-white transition-colors">Rower</Link></li>
                   <li><Link href="/product-categories" className="hover:text-white transition-colors">Strength</Link></li>
                   <li><Link href="/product-categories" className="hover:text-white transition-colors">Exercise Tools</Link></li>
                </ul>
             </div>

             {/* Column 3: More / Blog */}
             <div>
                <h5 className="text-sm font-bold text-[#FF3333] uppercase tracking-widest mb-6">Company</h5>
                <ul className="space-y-4 text-sm text-gray-400">
                   <li><Link href="/blog" className="hover:text-white transition-colors">Latest News (Blog)</Link></li>
                   <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                   <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                   <li><Link href="/legal" className="hover:text-white transition-colors">Legal</Link></li>
                </ul>
             </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
         {/* Logo */}
         <div className="flex items-center gap-4">
            <Image 
                src="/images/combaxx white.png" 
                alt="Combaxx Logo" 
                width={150} 
                height={60} 
                className="object-contain h-10 w-auto opacity-80 hover:opacity-100 transition-opacity" 
            />
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

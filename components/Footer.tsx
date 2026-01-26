import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Instagram, Facebook, Twitter, Youtube, Linkedin, MapPin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#111] text-white pt-20 pb-10">
      
      {/* Top CTA Section (Yellow Blocks) */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#F0D348] text-black p-8 md:p-12 rounded-sm group cursor-pointer hover:bg-white transition-colors duration-500">
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">Join the Community</h3>
            <p className="font-medium mb-8 opacity-80">Unlock exclusive training content and member-only offers.</p>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest border border-black px-6 py-3 w-fit group-hover:border-black transition-colors">
              Become a Member <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#F0D348] text-black p-8 md:p-12 rounded-sm group cursor-pointer hover:bg-white transition-colors duration-500">
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">Visit Our Showrooms</h3>
            <p className="font-medium mb-8 opacity-80">Experience the equipment in person at our boutiques.</p>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest border border-black px-6 py-3 w-fit group-hover:border-black transition-colors">
              Find Nearest <MapPin className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#F0D348] text-black p-8 md:p-12 rounded-sm group cursor-pointer hover:bg-white transition-colors duration-500">
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">Business Solutions</h3>
            <p className="font-medium mb-8 opacity-80">Equip your gym or hotel with professional gear.</p>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest border border-black px-6 py-3 w-fit group-hover:border-black transition-colors">
              Explore B2B <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 border-b border-gray-800 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left: Newsletter */}
          <div className="lg:col-span-4 bg-[#1A1A1A] p-8 rounded-sm">
            <h4 className="text-xl font-bold uppercase tracking-widest mb-4">Newsletter Signup</h4>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Get the latest news, product launches, and training tips delivered directly to your inbox.
            </p>
            <div className="space-y-4">
               <input 
                 type="email" 
                 placeholder="Enter your email" 
                 className="w-full bg-[#111] border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-[#F0D348] transition-colors text-sm"
               />
               <button className="w-full bg-white text-black font-bold uppercase tracking-widest text-xs py-4 hover:bg-[#F0D348] transition-colors flex justify-center items-center gap-2">
                 Subscribe Now <Mail className="w-4 h-4" />
               </button>
            </div>
          </div>

          {/* Middle: Links */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
             {/* Column 1 */}
             <div>
                <h5 className="text-sm font-bold text-[#F0D348] uppercase tracking-widest mb-6">Products</h5>
                <ul className="space-y-4 text-sm text-gray-400">
                   <li><Link href="#" className="hover:text-white transition-colors">Treadmills</Link></li>
                   <li><Link href="#" className="hover:text-white transition-colors">Bikes</Link></li>
                   <li><Link href="#" className="hover:text-white transition-colors">Ellipticals</Link></li>
                   <li><Link href="#" className="hover:text-white transition-colors">Strength</Link></li>
                   <li><Link href="#" className="hover:text-white transition-colors">Accessories</Link></li>
                </ul>
             </div>
             
             {/* Column 2 */}
             <div>
                <h5 className="text-sm font-bold text-[#F0D348] uppercase tracking-widest mb-6">Support</h5>
                <ul className="space-y-4 text-sm text-gray-400">
                   <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                   <li><Link href="#" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                   <li><Link href="#" className="hover:text-white transition-colors">Returns</Link></li>
                   <li><Link href="#" className="hover:text-white transition-colors">Warranty</Link></li>
                   <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
                </ul>
             </div>

             {/* Column 3 */}
             <div>
                <h5 className="text-sm font-bold text-[#F0D348] uppercase tracking-widest mb-6">Company</h5>
                <ul className="space-y-4 text-sm text-gray-400">
                   <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                   <li><Link href="#" className="hover:text-white transition-colors">Our Story</Link></li>
                   <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                   <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                   <li><Link href="#" className="hover:text-white transition-colors">Press</Link></li>
                </ul>
             </div>
          </div>

          {/* Right: Socials */}
          <div className="lg:col-span-2">
             <h5 className="text-sm font-bold text-[#F0D348] uppercase tracking-widest mb-6">Connect</h5>
             <div className="flex flex-col gap-4">
                <Link href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider font-medium">
                   <Instagram className="w-5 h-5" /> Instagram
                </Link>
                <Link href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider font-medium">
                   <Facebook className="w-5 h-5" /> Facebook
                </Link>
                <Link href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider font-medium">
                   <Twitter className="w-5 h-5" /> X (Twitter)
                </Link>
                <Link href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider font-medium">
                   <Youtube className="w-5 h-5" /> Youtube
                </Link>
                <Link href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider font-medium">
                   <Linkedin className="w-5 h-5" /> Linkedin
                </Link>
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

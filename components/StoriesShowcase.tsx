import Image from "next/image"
import Link from "next/link"

export default function StoriesShowcase() {
  return (
    <section className="border-b border-gray-800 bg-[#161616] py-20">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="mb-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold text-[#FF3333] uppercase tracking-[0.3em] mb-4">
              Stories
            </p>
            <h2 className="text-[50px] font-light leading-tight">
              Human stories
              <span className="block text-gray-400">written on every rep.</span>
            </h2>
          </div>
          <Link
            href="/stories"
            className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 border-b border-transparent hover:text-[#FF3333] hover:border-[#FF3333] pb-1 transition-colors"
          >
            View all stories
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#111111] md:col-span-2 md:row-span-2">
            <Image
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop"
              alt="Athlete training with sled"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="mb-2 text-[11px] uppercase tracking-[0.25em] text-[#FF3333]">
                Performance lab
              </p>
              <p className="text-xl font-semibold">
                How elite sprinters use incline work to unlock top speed.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#111111]">
            <Image
              src="/images/hero-section-slide-1.webp"
              alt="Coach adjusting athlete posture"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="mb-1 text-[11px] uppercase tracking-[0.25em] text-gray-400">
                Coaching
              </p>
              <p className="text-sm font-semibold">
                Building better movement patterns with small adjustments.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#111111]">
            <Image
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop"
              alt="Group training session"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="mb-1 text-[11px] uppercase tracking-[0.25em] text-gray-400">
                Community
              </p>
              <p className="text-sm font-semibold">
                Why training together pushes effort further.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

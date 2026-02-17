export default function PartnersStrip() {
  return (
    <section className="border-b border-gray-800 bg-[#111111] px-4 py-14">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-bold text-[#FF3333] uppercase tracking-[0.3em] mb-3">
            Achieving excellence alongside
          </p>
          <p className="text-sm text-gray-400 max-w-md">
            Trusted by performance studios, hotels, clubs and workplace gyms around the world.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 md:justify-end">
          <span className="rounded-full border border-white/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-gray-300">
            Elite Clubs
          </span>
          <span className="rounded-full border border-white/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-gray-300">
            Boutique Studios
          </span>
          <span className="rounded-full border border-white/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-gray-300">
            Hotels
          </span>
          <span className="rounded-full border border-white/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-gray-300">
            Corporate
          </span>
        </div>
      </div>
    </section>
  )
}

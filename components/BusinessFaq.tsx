import Link from "next/link"

export default function BusinessFaq() {
  return (
    <section className="border-b border-gray-800 bg-[#161616] px-4 py-20">
      <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-bold text-[#FF3333] uppercase tracking-[0.3em] mb-4">
            Shape up your business
          </p>
          <h2 className="text-3xl md:text-4xl font-light leading-tight mb-4">
            End-to-end solutions for gyms, hotels and workplaces.
          </h2>
          <p className="mb-8 max-w-lg text-gray-400">
            From layout planning to installation and service, our team supports every stage of
            building a space that keeps people training longer and better.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-[0.25em] hover:bg-[#FF3333] hover:text-black transition-colors"
          >
            Talk to our team
            <span className="h-px w-8 bg-black" />
          </Link>
        </div>
        <div className="space-y-4 rounded-3xl bg-[#111111] p-8">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            FAQs
          </h3>
          <div className="space-y-3">
            <details className="group rounded-2xl border border-white/10 bg-black/40 px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-sm font-medium">
                  What support do you offer for new facilities?
                </span>
                <span className="text-xl leading-none text-gray-500 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-gray-400">
                Our specialists help with equipment mix, layout, installation and staff training so
                your space is ready from day one.
              </p>
            </details>
            <details className="group rounded-2xl border border-white/10 bg-black/40 px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-sm font-medium">
                  Can I connect equipment to my existing membership system?
                </span>
                <span className="text-xl leading-none text-gray-500 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-gray-400">
                Yes. Our connected ecosystem is designed to integrate with popular management and
                access-control platforms.
              </p>
            </details>
            <details className="group rounded-2xl border border-white/10 bg-black/40 px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-sm font-medium">
                  Do you offer service and maintenance plans?
                </span>
                <span className="text-xl leading-none text-gray-500 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-gray-400">
                We provide tailored service packages to keep your equipment running at peak
                performance with minimal downtime.
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
  )
}

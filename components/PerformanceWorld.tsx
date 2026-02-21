import { Dumbbell, HeartPulse, ShieldCheck, Globe2 } from "lucide-react"

export default function PerformanceWorld() {
  return (
    <section className="border-y border-gray-800 bg-[#111111] py-16">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-bold text-[#FF3333] uppercase tracking-[0.3em] mb-3">
            Enter the performance world
          </p>
          <h2 className="text-[50px] font-light leading-tight mb-4">
            Built for athletes, clubs and high-performance spaces.
          </h2>
          <p className="text-gray-400 max-w-lg">
            Whether you train at home or manage a full facility, our ecosystem keeps experience,
            data and durability perfectly aligned.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="flex flex-col items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
              <Dumbbell className="h-5 w-5 text-[#F0D348]" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Strength sessions
            </p>
            <p className="text-sm text-gray-200">Engineered for heavy daily use.</p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
              <HeartPulse className="h-5 w-5 text-[#F0D348]" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Cardio science
            </p>
            <p className="text-sm text-gray-200">Biomechanics tuned for real athletes.</p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
              <ShieldCheck className="h-5 w-5 text-[#F0D348]" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Built to last
            </p>
            <p className="text-sm text-gray-200">Industrial-grade components and finishes.</p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
              <Globe2 className="h-5 w-5 text-[#F0D348]" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Connected
            </p>
            <p className="text-sm text-gray-200">Ready for clubs, hotels and hybrid spaces.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

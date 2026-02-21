import { ChevronRight } from "lucide-react"

export default function BusinessFaq() {
  const items = [
    {
      q: "What are gym equipment?",
      a:
        "Gym equipment covers cardio, strength and functional tools designed to improve fitness, endurance and performance.",
    },
    {
      q: "What are cardio fitness equipment?",
      a:
        "Cardio equipment includes treadmills, bikes, rowers and cross trainers focused on heart rate and stamina.",
    },
    {
      q: "What are strength workout equipment?",
      a:
        "Strength equipment includes benches, racks, dumbbells and multi gyms engineered for progressive overload.",
    },
    {
      q: "What are home gym equipment?",
      a:
        "Home gym equipment is optimized for compact spaces, low noise and versatile training at home.",
    },
    {
      q: "What are commercial fitness equipment?",
      a:
        "Commercial fitness equipment is built for heavy duty use, durability and consistent performance in shared spaces.",
    },
    {
      q: "Who is Technogym?",
      a:
        "Technogym is a global fitness brand known for premium equipment and connected digital ecosystems.",
    },
  ]

  return (
    <>
      <section className="border-b border-gray-800 bg-[#161616] py-16">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12">
          <div className="mb-10 flex items-center justify-center gap-8">
            <h2 className="text-[50px] font-bold uppercase tracking-tight text-center">
              Achieving excellence alongside with
            </h2>
            <span className="hidden md:inline-block text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
              Our partnerships
            </span>
          </div>
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#161616] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#161616] to-transparent" />
            <div className="flex items-center gap-14 whitespace-nowrap animate-logos">
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/39/Scuderia_Ferrari_Logo.svg/320px-Scuderia_Ferrari_Logo.svg.png" alt="Ferrari" className="h-14 w-auto opacity-90" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/McLaren_Logo.svg/320px-McLaren_Logo.svg.png" alt="McLaren" className="h-10 w-auto opacity-90" />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/FC_Internazionale_Milano_2014.svg/320px-FC_Internazionale_Milano_2014.svg.png" alt="Inter" className="h-12 w-auto opacity-90" />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Juventus_2020.svg/320px-Juventus_2020.svg.png" alt="Juventus" className="h-10 w-auto opacity-90" />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/Logo_of_AC_Milan.svg/320px-Logo_of_AC_Milan.svg.png" alt="AC Milan" className="h-12 w-auto opacity-90" />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Brazil_national_football_team_logo.svg/320px-Brazil_national_football_team_logo.svg.png" alt="Brazil" className="h-12 w-auto opacity-90" />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Italy_national_football_team_logo_2023.svg/320px-Italy_national_football_team_logo_2023.svg.png" alt="Italy" className="h-12 w-auto opacity-90" />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/39/Scuderia_Ferrari_Logo.svg/320px-Scuderia_Ferrari_Logo.svg.png" alt="Ferrari" className="h-14 w-auto opacity-90" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/McLaren_Logo.svg/320px-McLaren_Logo.svg.png" alt="McLaren" className="h-10 w-auto opacity-90" />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/FC_Internazionale_Milano_2014.svg/320px-FC_Internazionale_Milano_2014.svg.png" alt="Inter" className="h-12 w-auto opacity-90" />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Juventus_2020.svg/320px-Juventus_2020.svg.png" alt="Juventus" className="h-10 w-auto opacity-90" />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/Logo_of_AC_Milan.svg/320px-Logo_of_AC_Milan.svg.png" alt="AC Milan" className="h-12 w-auto opacity-90" />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Brazil_national_football_team_logo.svg/320px-Brazil_national_football_team_logo.svg.png" alt="Brazil" className="h-12 w-auto opacity-90" />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Italy_national_football_team_logo_2023.svg/320px-Italy_national_football_team_logo_2023.svg.png" alt="Italy" className="h-12 w-auto opacity-90" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-[95vh] bg-black">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/2bd2404b.mp4"
          muted
          loop
          playsInline
          autoPlay
          poster="/images/Combaxx-Logo.avif"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 h-full">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12 h-full flex items-end">
            <div className="max-w-3xl pb-20">
              <h2 className="text-[50px] font-bold uppercase tracking-tight text-white leading-[1.1] drop-shadow-lg">
                SHAPE UP YOUR BUSINESS
                <br />
                WITH TECHNOGYM
              </h2>
              <p className="mt-5 text-base md:text-lg text-gray-200 max-w-xl">
                Since 1983, we&apos;ve been empowering health and wellness facilities with top‑notch technology.
                Revolutionize your business and boost customer engagement with our integrated ecosystem.
              </p>
              <a
                href="/business"
                className="mt-8 inline-flex items-center rounded-full bg-[#FF3333] px-5 py-3 text-sm font-bold uppercase tracking-[0.25em] text-black shadow-md hover:bg-white hover:text-black transition-colors"
              >
                <span className="mr-6">Browse business solutions</span>
                <span className="flex ml-2 h-6 w-6 items-center justify-center rounded-full bg-black text-white shrink-0">
                  <ChevronRight className="h-4 w-4" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-800 bg-[#161616] py-24">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12">
          <div className="mb-16">
            <h2 className="text-[50px] max-w-5xl font-bold tracking-tight">
              Home gym equipment, commercial gym machines, professional gym equipment
            </h2>
            <p className="mt-6 text-gray-300">
             Technogym is a leading company for high-end gym equipment for fitness, health, sports, and wellness. Discover our range of home gym equipment, professional gym equipment and home fitness solutions. From stationary bikes to treadmills, our impeccable engineering for ergonomics, design and materials will help you achieve your goals more efficiently, safely, and quickly. All of our products belong to a connected and open ecosystem based on artificial intelligence, enabling a fully personalized training experience easily accessible anywhere, anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div>
              <h3 className="text-[45px] font-bold">FAQs</h3>
            </div>
            <div className="md:col-span-2">
              <div className="divide-y divide-gray-700">
                {items.map((item, idx) => (
                  <details key={idx} className="group py-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between">
                      <span className="text-2xl md:text-3xl font-semibold leading-tight">
                        {item.q}
                      </span>
                      <span className="text-xl leading-none text-gray-400 group-open:rotate-45 transition-transform">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-base text-gray-400">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

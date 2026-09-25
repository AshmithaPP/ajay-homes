"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Flame, FileCheck, Shovel, HardHat, BrickWall, PaintRoller, KeyRound, ArrowUpRight, Phone } from "lucide-react";

// Bhoomi Pooja → Griha Pravesam: every step handled by one Ajay team.
// Durations are typical for a G+2 independent residence.
const steps = [
  {
    icon: Flame,
    title: "Bhoomi Pooja",
    desc: "Auspicious ground-breaking at the muhurtham of your choice.",
    time: "Day 1",
  },
  {
    icon: FileCheck,
    title: "Approvals",
    desc: "Plan sanction, CMDA / DTCP approvals and bank loan documents.",
    time: "Weeks 1–6",
  },
  {
    icon: Shovel,
    title: "Foundation",
    desc: "Soil test, excavation, footings and plinth beam.",
    time: "Months 2–3",
  },
  {
    icon: HardHat,
    title: "Structure",
    desc: "RCC columns, beams and slabs, rising floor by floor.",
    time: "Months 3–7",
  },
  {
    icon: BrickWall,
    title: "Brickwork & Plastering",
    desc: "Walls, electrical and plumbing conduits, inside and outside plaster.",
    time: "Months 7–10",
  },
  {
    icon: PaintRoller,
    title: "Interiors & Finishing",
    desc: "Flooring, joinery, painting, fixtures and landscaping.",
    time: "Months 10–13",
  },
  {
    icon: KeyRound,
    title: "Griha Pravesam",
    sub: "House Warming",
    desc: "Keys in your hands, ready for your house warming ceremony.",
    time: "Handover",
  },
];

export default function HomeJourney() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home-journey"
      className="relative w-full bg-white pt-12 sm:pt-16 lg:pt-20 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-8 text-slate-900"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[1440px]">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-widest text-[#ff8c00]">
              Your Home Journey
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-[32px] 2xl:text-[38px] font-bold tracking-tight text-slate-900 font-sans">
              From Bhoomi Pooja to <span className="text-[#ff8c00]">House Warming</span>
            </h2>
            <p className="mt-3 text-sm md:text-base 2xl:text-lg text-slate-600 font-sans">
              One team, one promise. We walk with you through every step of building your home.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="#contact"
              className="group inline-flex h-10 sm:h-11 items-center gap-2 rounded-full bg-[#ff8c00] px-5 text-xs sm:text-sm font-bold text-white shadow-md shadow-orange-500/25 transition-colors hover:bg-[#e07b00]"
            >
              Start your journey
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href="tel:+919840012345"
              className="inline-flex h-10 sm:h-11 items-center gap-2 rounded-full border border-slate-300 px-5 text-xs sm:text-sm font-semibold text-slate-800 transition-colors hover:border-[#ff8c00] hover:text-[#ff8c00]"
            >
              <Phone className="h-3.5 w-3.5 text-[#ff8c00]" />
              Call us
            </a>
          </div>
        </div>

        {/* Timeline: vertical on phones/tablets, horizontal on desktops */}
        <ol className="relative mt-10 lg:mt-14 grid grid-cols-1 gap-6 lg:grid-cols-7 lg:gap-4 2xl:gap-6">
          {/* Connecting line (horizontal on desktop) */}
          <span className="absolute left-[7.14%] right-[7.14%] top-6 2xl:top-7 hidden h-0.5 bg-slate-200 lg:block" aria-hidden="true">
            <span
              className={`absolute inset-y-0 left-0 bg-[#ff8c00] transition-[width] duration-[1600ms] ease-out ${
                isVisible ? "w-full" : "w-0"
              }`}
            />
          </span>
          {/* Connecting line (vertical on phones/tablets) */}
          <span className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-200 lg:hidden" aria-hidden="true">
            <span
              className={`absolute inset-x-0 top-0 bg-[#ff8c00] transition-[height] duration-[1600ms] ease-out ${
                isVisible ? "h-full" : "h-0"
              }`}
            />
          </span>

          {steps.map((step, i) => {
            const Icon = step.icon;
            const isBookend = i === 0 || i === steps.length - 1;
            return (
              <li
                key={step.title}
                style={{ transitionDelay: isVisible ? `${i * 150}ms` : "0ms" }}
                className={`relative flex gap-4 lg:flex-col lg:items-center lg:gap-0 lg:text-center transition-all duration-700 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <div
                  className={`relative z-10 flex h-12 w-12 2xl:h-14 2xl:w-14 shrink-0 items-center justify-center rounded-xl text-white shadow-md ring-4 ring-white ${
                    isBookend ? "bg-[#ff8c00] shadow-orange-500/30" : "bg-[#003a70] shadow-[#003a70]/25"
                  }`}
                >
                  <Icon className="h-5 w-5 2xl:h-6 2xl:w-6" />
                </div>
                <div className="min-w-0 lg:mt-4">
                  <span className="text-[10px] 2xl:text-[11px] font-bold uppercase tracking-wider text-[#008ba3]">
                    {String(i + 1).padStart(2, "0")} · {step.time}
                  </span>
                  <h3 className="mt-1 text-sm 2xl:text-base font-bold leading-snug text-slate-900 font-sans">
                    {step.title}
                    {step.sub && <span className="block text-xs 2xl:text-[13px] font-semibold text-[#ff8c00]">{step.sub}</span>}
                  </h3>
                  <p className="mt-1 text-xs 2xl:text-[13px] leading-relaxed text-slate-500 font-sans">{step.desc}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-8 text-[11px] text-slate-400 font-sans">
          Timelines are indicative for a G+2 independent residence and vary with plot size and approvals.
        </p>
      </div>
    </section>
  );
}

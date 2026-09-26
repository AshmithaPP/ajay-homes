"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { House, Handshake, DraftingCompass, Sprout, Building2, MapPin } from "lucide-react";

// Ajay Homes & Estates milestones with authentic landmark project photography
const milestones = [
  {
    icon: House,
    year: "1966",
    title: "Ajay Homes Founded",
    description:
      "Founded in 1966, Ajay Homes has grown through decades of experience, evolving with changing lifestyles while staying committed to quality, trust and thoughtful design.",
    tagline: "Visionary Foundation in Chennai",
    projectImage: "/assets/img/r3-brc-views/img12.jpg",
    projectName: "Mr. Bhaskar Residence • Foundation Craftsmanship",
    location: "Chennai, Tamil Nadu",
  },
  {
    icon: Handshake,
    year: "1980s",
    title: "Building Trust & Expanding Expertise",
    description:
      "Expanding across prime neighborhoods in Adyar and Besant Nagar, building enduring homeowner trust through rock-solid structural integrity and timely handovers.",
    tagline: "Generational Community Trust",
    projectImage: "/assets/img/img-011.jpeg",
    projectName: "Adyar Residential Enclave • Structural Expansion",
    location: "Adyar, Chennai",
  },
  {
    icon: DraftingCompass,
    year: "2000s",
    title: "Evolving with Modern Architecture",
    description:
      "Pioneering modern architectural engineering with expansive cantilevers, open-concept luxury layouts, and bespoke contemporary residential elevations.",
    tagline: "Contemporary Structural Design",
    projectImage: "/assets/img/img-002.jpeg",
    projectName: "Besant Nagar Contemporary Luxury Residence",
    location: "Besant Nagar, Chennai",
  },
  {
    icon: Sprout,
    year: "2010s",
    title: "Growing with New-Generation Design",
    description:
      "Integrating sustainable green building practices, smart home automation, curated terrace gardens, and high-end natural architectural materials.",
    tagline: "Sustainable Eco-Luxury Living",
    projectImage: "/assets/img/img-001.jpeg",
    projectName: "Scarlet Diamond • Bespoke Luxury Landmark",
    location: "Alwarpet, Chennai",
  },
  {
    icon: Building2,
    year: "2020s",
    title: "50+ Years of Experience, Built for Tomorrow",
    description:
      "Delivering landmark turnkey residential projects with 100% IS-code certified structural resilience, visionary aesthetics, and enduring lifestyle value.",
    tagline: "Iconic Turnkey Landmarks",
    projectImage: "/assets/img/besantnagar-residence-view/img19.jpg",
    projectName: "Besant Nagar Coastal Landmark Manor",
    location: "ECR / Besant Nagar, Chennai",
  },
];

export default function UnsurpassedLegacy() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Smooth entrance transition on scroll
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-advance to next era every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % milestones.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const activeMilestone = milestones[activeIdx];

  return (
    <section
      ref={sectionRef}
      id="unsurpassed-legacy"
      className="relative w-full overflow-hidden bg-slate-900 py-14 sm:py-18 lg:py-24 px-4 sm:px-6 lg:px-8 font-sans text-slate-900 border-t border-slate-100 select-text min-h-[600px] sm:min-h-[660px] lg:min-h-[720px] flex items-center justify-center"
    >
      {/* =========================================================================
          BACKGROUND: Authentic Ajay Homes Project Image (Fully Visible & Vivid)
         ========================================================================= */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        {milestones.map((item, idx) => (
          <div
            key={item.year}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === activeIdx ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={item.projectImage}
              alt={item.projectName}
              fill
              sizes="100vw"
              priority={idx === 0}
              className="object-cover object-center scale-100 transition-transform duration-1000 ease-out"
            />
          </div>
        ))}

        {/* Cinematic ambient vignette ensuring the background image is clearly visible while anchoring contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* =========================================================================
          CONTENT: Luxury Frosted Glass Floating Card (Spacious & Architectural)
         ========================================================================= */}
      <div
        className={`relative z-10 mx-auto w-full max-w-4xl rounded-3xl bg-white/90 sm:bg-white/92 backdrop-blur-md p-6 sm:p-8 lg:p-10 xl:p-11 shadow-2xl border border-white/80 transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Header Block matching Reference Design */}
        <div className="mx-auto max-w-2xl text-center px-2 sm:px-4">
          {/* Brand Secondary Orange Accent Bar */}
          <span className="mx-auto block h-1 w-12 rounded-full bg-[#ff8c00]" aria-hidden />

          {/* Heading: Black text with Orange Accent */}
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[34px] 2xl:text-[38px] font-bold tracking-tight text-slate-900 font-sans leading-tight">
            A Legacy Built Over{" "}
            <span className="gradient-text-orange font-extrabold">50+ Years</span>
          </h2>

          {/* Big Display Year with Smooth Transition */}
          <div className="relative my-2 sm:my-3 min-h-[64px] sm:min-h-[76px] lg:min-h-[86px] flex flex-col items-center justify-center">
            <p
              key={`year-${activeMilestone.year}`}
              className="text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-light tracking-tight text-[#003a70] font-sans leading-none animate-in fade-in zoom-in-95 duration-400"
            >
              {activeMilestone.year}
            </p>
            <span
              key={`tag-${activeMilestone.year}`}
              className="mt-1 text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-[#ff8c00] font-sans animate-in fade-in duration-300"
            >
              {activeMilestone.tagline}
            </span>
          </div>

          {/* Narrative Paragraph with Smooth Cross-Fade */}
          <p
            key={`desc-${activeMilestone.year}`}
            className="mx-auto max-w-xl text-xs sm:text-sm lg:text-[14.5px] leading-relaxed text-slate-700 font-sans animate-in fade-in duration-300"
          >
            {activeMilestone.description}
          </p>

          {/* Active Project Reference Tag Pill */}
          <div className="mt-3 flex justify-center">
            <span
              key={`project-${activeMilestone.year}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-100/90 border border-slate-200 px-3 py-1 text-[11px] sm:text-xs font-medium text-slate-700 shadow-2xs animate-in fade-in duration-300 font-sans"
            >
              <MapPin className="h-3.5 w-3.5 text-[#ff8c00]" />
              <span className="font-semibold text-[#003a70]">{activeMilestone.projectName}</span>
            </span>
          </div>
        </div>

        {/* =========================================================================
            HORIZONTAL TIMELINE: 5 Interactive Milestone Nodes matching Reference UI
           ========================================================================= */}
        <div className="relative mx-auto mt-6 sm:mt-8 lg:mt-10 max-w-3xl px-2">
          {/* Continuous horizontal baseline connecting all nodes */}
          <div
            className="pointer-events-none absolute left-[8%] right-[8%] top-7 sm:top-8 hidden sm:block h-px bg-slate-200"
            aria-hidden
          />

          {/* Active progress fill along the timeline in brand orange */}
          <div
            className="pointer-events-none absolute left-[8%] top-7 sm:top-8 hidden sm:block h-px bg-[#ff8c00] transition-all duration-400 ease-out"
            style={{ width: `${(activeIdx / (milestones.length - 1)) * 84}%` }}
            aria-hidden
          />

          {/* Milestone Nodes Grid */}
          <ol className="relative grid grid-cols-1 sm:grid-cols-5 gap-5 sm:gap-2">
            {milestones.map(({ year, title, icon: Icon }, idx) => {
              const isActive = idx === activeIdx;

              return (
                <li
                  key={year}
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className="group relative flex items-center gap-4 sm:flex-col sm:gap-0 sm:text-center cursor-pointer select-none transition-transform duration-200 active:scale-95"
                >
                  {/* Round Icon Badge */}
                  <div className="relative flex items-center justify-center">
                    <span
                      className={`relative z-10 flex h-14 w-14 sm:h-15 sm:w-15 lg:h-16 lg:w-16 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-white text-[#ff8c00] border-2 border-[#ff8c00] shadow-md ring-4 ring-[#ff8c00]/15 scale-105"
                          : "bg-white text-[#003a70] border border-slate-200 shadow-2xs group-hover:border-[#ff8c00]/60 group-hover:text-[#ff8c00] group-hover:scale-102"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 ${
                          isActive ? "text-[#ff8c00] scale-110" : "text-[#003a70] group-hover:text-[#ff8c00]"
                        }`}
                        strokeWidth={1.5}
                      />
                    </span>
                  </div>

                  {/* Text details below node */}
                  <div className="sm:mt-3 flex-1 sm:flex-initial">
                    <p
                      className={`text-lg sm:text-xl lg:text-[22px] font-bold tracking-tight font-sans transition-colors duration-200 ${
                        isActive ? "text-[#003a70]" : "text-slate-800 group-hover:text-[#003a70]"
                      }`}
                    >
                      {year}
                    </p>
                    <p
                      className={`mt-0.5 text-xs sm:text-[12px] lg:text-[13px] leading-snug sm:mx-auto sm:max-w-[140px] font-sans transition-colors duration-200 ${
                        isActive ? "text-[#003a70] font-semibold" : "text-slate-600 group-hover:text-slate-800"
                      }`}
                    >
                      {title}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

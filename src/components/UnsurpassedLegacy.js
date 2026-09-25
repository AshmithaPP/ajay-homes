"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Compass, ArrowRight } from "lucide-react";

// The 50+ Years Architectural Journey of Ajay Homes & Estates
const ERAS = [
  {
    year: "1966",
    badge: "1966 — Foundation",
    title: "Ajay Homes Founded",
    tagline: "Visionary Foundation in Chennai",
    desc: "Founded in 1966, Ajay Homes & Estates pioneered bespoke residential craftsmanship in Chennai, establishing an enduring benchmark for structural honesty, quality masonry, and thoughtful architecture.",
    stats: [
      { label: "Origin", val: "Chennai, TN" },
      { label: "Craft", val: "Handcrafted Masonry" },
      { label: "Benchmark", val: "Quality First" },
    ],
    image: "/assets/img/legacy-blueprint-left.jpg",
    alt: "Ajay Homes Foundation Blueprint & Architectural Drafting",
    blueprintTag: "PLAN // 1966-01 • STRUCTURAL FOUNDATION",
  },
  {
    year: "1980s",
    badge: "1980s — Trust & Expansion",
    title: "Building Trust & Expanding Expertise",
    tagline: "Generational Community Trust",
    desc: "Expanding across prime coastal and residential neighborhoods in Adyar and Besant Nagar, delivering homes defined by uncompromising reinforced concrete engineering and 100% on-time handovers.",
    stats: [
      { label: "Key Locales", val: "Adyar & Besant Nagar" },
      { label: "Engineering", val: "Reinforced Concrete" },
      { label: "Execution", val: "100% On-Time" },
    ],
    image: "/assets/img/img-011.jpeg",
    alt: "Ajay Homes 1980s Landmark Residential Construction",
    blueprintTag: "ELEV // 1980-04 • RESIDENTIAL ELEVATION",
  },
  {
    year: "2000s",
    badge: "2000s — Modern Architecture",
    title: "Evolving with Modern Architecture",
    tagline: "Contemporary Structural Engineering",
    desc: "Pioneering modern architectural engineering across Chennai with expansive cantilevered balconies, open luxury floorplans, double-height living spaces, and contemporary facade engineering.",
    stats: [
      { label: "Design Language", val: "Contemporary Luxury" },
      { label: "Structure", val: "Expansive Cantilevers" },
      { label: "Spaces", val: "Open Floorplans" },
    ],
    image: "/assets/img/img-002.jpeg",
    alt: "Ajay Homes 2000s Contemporary Multi-Story Residence",
    blueprintTag: "CANTILEVER // 2000-09 • MODERN FACADE",
  },
  {
    year: "2010s",
    badge: "2010s — Sustainable Living",
    title: "Growing with New-Generation Design",
    tagline: "Sustainable Eco-Luxury Living",
    desc: "Integrating sustainable green building principles, smart home automation, curated rooftop garden terraces, and natural cross-ventilation into iconic private coastal residences.",
    stats: [
      { label: "Philosophy", val: "Bioclimatic Design" },
      { label: "Technology", val: "Smart Home Automation" },
      { label: "Lifestyle", val: "Curated Terraces" },
    ],
    image: "/assets/img/besantnagar-residence-view/img19.jpg",
    alt: "Ajay Homes 2010s Luxury Coastal Residence Besant Nagar",
    blueprintTag: "TERRACE // 2010-12 • BIOCLIMATIC ESTATE",
  },
  {
    year: "2020s",
    badge: "2020s — Built for Tomorrow",
    title: "50+ Years of Experience, Built for Tomorrow",
    tagline: "Iconic Turnkey Architectural Landmarks",
    desc: "Delivering South India's premier turnkey luxury residences with 100% IS-code certified structural precision, visionary contemporary aesthetics, and enduring multi-generational lifestyle value.",
    stats: [
      { label: "Portfolio", val: "150+ Landmarks" },
      { label: "Standards", val: "100% IS-Code Certified" },
      { label: "Delivery", val: "Turnkey Excellence" },
    ],
    image: "/assets/img/besantnagar-residence-view/img103.jpg",
    alt: "Ajay Homes 2020s Award-Winning Architectural Landmark",
    blueprintTag: "LANDMARK // 2020-PRESENT • TURNKEY LUXURY",
  },
];

export default function UnsurpassedLegacy() {
  const [activeEraIndex, setActiveEraIndex] = useState(0);

  // Automatically transition the era and image every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveEraIndex((prev) => (prev + 1) % ERAS.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const activeEra = ERAS[activeEraIndex];

  return (
    <section
      id="unsurpassed-legacy"
      className="relative w-full bg-white pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10 lg:pb-14 px-4 sm:px-6 lg:px-8 xl:px-10 text-slate-900 border-t border-slate-100 select-text"
    >
      <div className="mx-auto w-full max-w-[1400px] 2xl:max-w-[1480px] grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-14 items-center">
        
        {/* LEFT COLUMN (6 Cols): Typography, Year Display, and Editorial Story */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-3 sm:space-y-4">
          
          {/* Era Tag & Accent Line */}
          <div className="flex items-center gap-3">
            <span className="h-1 w-10 rounded-full bg-secondary shrink-0" />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-secondary font-sans">
              {activeEra.tagline}
            </span>
          </div>

          {/* Giant Architectural Display Year with smooth fade-in */}
          <div className="relative overflow-hidden py-0.5">
            <div
              key={`year-${activeEra.year}`}
              className="text-6xl sm:text-7xl lg:text-8xl 2xl:text-[96px] font-extralight tracking-tight text-primary font-sans leading-none animate-in fade-in duration-300"
            >
              {activeEra.year}
            </div>
          </div>

          {/* Era Title */}
          <h3
            key={`title-${activeEra.year}`}
            className="text-2xl sm:text-3xl lg:text-[32px] 2xl:text-[38px] font-extrabold text-primary tracking-tight font-sans leading-snug animate-in fade-in duration-300"
          >
            {activeEra.title}
          </h3>

          {/* Narrative Story */}
          <p
            key={`desc-${activeEra.year}`}
            className="text-xs sm:text-sm lg:text-base leading-relaxed text-slate-600 font-sans max-w-xl animate-in fade-in duration-300 min-h-[4rem]"
          >
            {activeEra.desc}
          </p>

          {/* 3 Key Architectural Metrics / Highlights for this Era */}
          <div
            key={`stats-${activeEra.year}`}
            className="grid grid-cols-3 gap-4 sm:gap-6 border-t border-slate-100 pt-3 sm:pt-4 animate-in fade-in duration-300 max-w-xl"
          >
            {activeEra.stats.map((s) => (
              <div key={s.label}>
                <p className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-600 font-sans font-medium">
                  {s.label}
                </p>
                <p className="mt-0.5 text-xs sm:text-sm 2xl:text-base font-bold text-primary font-sans">
                  {s.val}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Era Dots Indicator */}
          <div className="flex items-center gap-2 pt-2">
            {ERAS.map((era, idx) => (
              <button
                key={era.year}
                type="button"
                onClick={() => setActiveEraIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeEraIndex
                    ? "w-8 bg-secondary"
                    : "w-2 bg-slate-200 hover:bg-slate-300"
                }`}
                title={`View ${era.year}`}
                aria-label={`Go to ${era.year}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN (6 Cols): Architectural Showcase Card with Smooth Cross-Fade */}
        <div className="lg:col-span-6 relative w-full h-[300px] sm:h-[360px] md:h-[420px] lg:h-[450px] xl:h-[490px] 2xl:h-[530px]">
          
          {/* Background subtle elevation blueprint coordinate watermark */}
          <div className="pointer-events-none absolute -top-4 -right-4 text-[10px] font-mono text-slate-300 uppercase tracking-widest hidden sm:block">
            {activeEra.blueprintTag}
          </div>

          {/* The Image Container with Natural Cross-Fading */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-md">
            {ERAS.map((era, idx) => {
              const isCurrent = idx === activeEraIndex;
              return (
                <div
                  key={era.year}
                  className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                    isCurrent
                      ? "opacity-100 z-10"
                      : "opacity-0 pointer-events-none z-0"
                  }`}
                >
                  <Image
                    src={era.image}
                    alt={era.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={idx === 0}
                    className="object-cover object-center"
                  />

                  {/* Gradient Overlay for Editorial Depth & Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Architectural Blueprint Tag Pill on Image */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/60 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-white border border-white/20 font-sans">
                      <Compass className="h-3 w-3 text-secondary animate-spin-slow" />
                      <span>{era.badge}</span>
                    </span>
                  </div>

                  {/* Bottom Project Caption Pill */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 flex items-center justify-between text-white">
                    <div>
                      <p className="text-xs sm:text-sm font-bold font-sans drop-shadow-sm">
                        {era.title}
                      </p>
                      <p className="text-[10px] sm:text-xs text-white/80 font-sans">
                        Ajay Homes &amp; Estates • Architectural Milestone
                      </p>
                    </div>
                    <span className="h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center shrink-0 shadow-sm">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

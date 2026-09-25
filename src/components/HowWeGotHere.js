"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function HowWeGotHere() {
  const [activeYear, setActiveYear] = useState("2023");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const timelineData = [
    {
      year: "2026",
      title: "Pioneering Net-Zero Bioclimatic Architectural Living.",
      subtitle: "Smart sustainable engineering integrated into bespoke coastal luxury estates.",
      image: "/assets/img/besantnagar-residence-view/img19.jpg",
    },
    {
      year: "2025",
      title: "Expanded Ultra-Luxury Coastal Villa Portfolio.",
      subtitle: "Commissioned bespoke waterfront estates across Besant Nagar and ECR.",
      image: "/assets/img/besantnagar-residence-view/img103.jpg",
    },
    {
      year: "2024",
      title: "Delivers 100th Bespoke Masterpiece Landmark.",
      subtitle: "Handing over 100+ precision-crafted architectural residences on schedule.",
      image: "/assets/img/besantnagar-residence-view/img110.jpg",
    },
    {
      year: "2023",
      title: "Honored with Premier Architectural Excellence Award.",
      subtitle: "Celebrated as South India's foremost creator of bespoke residential landmarks.",
      image: "/assets/img/besantnagar-residence-view/img117.jpg",
    },
    {
      year: "2022",
      title: "Unveils Iconic Besant Nagar Coastal Residence.",
      subtitle: "A multi-level architectural triumph overlooking the Bay of Bengal.",
      image: "/assets/img/besantnagar-residence-view/img19.jpg",
    },
    {
      year: "2021",
      title: "Full IoT Smart Automation in Every Residence.",
      subtitle: "Biometric security, intelligent climate control, and architectural lighting.",
      image: "/assets/img/besantnagar-residence-view/img181.jpg",
    },
    {
      year: "2020",
      title: "Pioneering Private Biophilic Sanctuary Courtyards.",
      subtitle: "Designing residences with open natural ventilation and landscaped atriums.",
      image: "/assets/img/besantnagar-residence-view/img195.jpg",
    },
    {
      year: "2019",
      title: "Curated Italian Marble & European Finish Studio.",
      subtitle: "Direct sourcing of hand-picked materials for unparalleled finish quality.",
      image: "/assets/img/besantnagar-residence-view/img202.jpg",
    },
    {
      year: "2018",
      title: "Surpassed 50 Landmark Residential Deliveries.",
      subtitle: "Setting the gold benchmark for build quality and customer trust in Chennai.",
      image: "/assets/img/besantnagar-residence-view/img216.jpg",
    },
    {
      year: "2017",
      title: "Acquired Prime Waterfront Parcels in Besant Nagar.",
      subtitle: "Expanding luxury residential footprints into Chennai's most sought-after avenues.",
      image: "/assets/img/besantnagar-residence-view/img223.jpg",
    },
    {
      year: "2016",
      title: "Seismic-Resistant Structural Engineering Standards.",
      subtitle: "Engineered post-tensioned concrete technology for generational longevity.",
      image: "/assets/img/besantnagar-residence-view/img75.jpg",
    },
    {
      year: "2015",
      title: "Completed First Multi-Unit Luxury Residence.",
      subtitle: "Modern bespoke apartments blending boutique privacy with urban luxury.",
      image: "/assets/img/besantnagar-residence-view/img82.jpg",
    },
    {
      year: "2013",
      title: "Founded with Uncompromising Architectural Passion.",
      subtitle: "Ajay Homes was established to create timeless lifestyle landmarks.",
      image: "/assets/img/besantnagar-residence-view/img96.jpg",
    },
  ];

  const activeIndex = timelineData.findIndex((item) => item.year === activeYear);
  const activeItem = activeIndex !== -1 ? timelineData[activeIndex] : timelineData[3];

  return (
    <section
      ref={sectionRef}
      id="legacy"
      className={`relative w-full bg-white py-8 sm:py-10 lg:py-12 text-slate-900 overflow-hidden transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="mx-auto w-[calc(100%-1.25rem)] sm:w-[calc(100%-2.5rem)] md:w-[calc(100%-4rem)] max-w-[1640px]">
        {/* Section Heading: "How we got here?" matching reference pixel-precisely */}
        <div className="mb-4 sm:mb-6 pl-1 sm:pl-2">
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 tracking-tight font-sans">
            How we got <span className="text-[#ff8c00]">here?</span>
          </h2>
        </div>

        {/* Main Full-Viewport Showcase Card with Small Left/Right Margin */}
        <div className="relative w-full h-[clamp(440px,68vh,540px)] sm:h-[clamp(460px,62vh,600px)] lg:h-[clamp(440px,64vh,660px)] rounded-2xl sm:rounded-3xl bg-slate-950 overflow-hidden shadow-2xl border border-slate-800/80">
          
          {/* Architectural Background Images with Smooth Crossfade (Crisp, Bright, High-End) */}
          <div className="absolute inset-0 z-0">
            {timelineData.map((item) => {
              const isSelected = item.year === activeYear;
              return (
                <div
                  key={item.year}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    isSelected ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="100vw"
                    priority={item.year === "2023" || item.year === "2022"}
                    className="object-cover object-center filter brightness-100 contrast-[1.03]"
                  />
                </div>
              );
            })}

            {/* Targeted Vignette Overlays: Keeps the home luminous while ensuring crisp text readability */}
            {/* Bottom-left gradient for the milestone title */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-15 pointer-events-none" />
            
            {/* Right dark gradient strip behind the years column matching reference screenshot */}
            <div className="absolute inset-y-0 right-0 w-36 sm:w-56 md:w-64 bg-gradient-to-l from-black/75 via-black/35 to-transparent z-15 pointer-events-none" />
          </div>

          {/* Top Pill / Badge inside the card */}
          <div className="absolute top-5 left-5 sm:top-7 sm:left-8 md:left-10 lg:left-12 z-20 max-w-[calc(100%-6rem)] sm:max-w-[calc(100%-10rem)]">
            <span className="inline-flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md px-3.5 py-1 text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-white/85 font-semibold font-sans border border-white/10 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff8c00] animate-pulse" />
              Ajay Homes &amp; Estates • Architectural Journey
            </span>
          </div>

          {/* Bottom-Left Milestone Content matching reference */}
          <div className="absolute bottom-6 left-5 sm:bottom-8 sm:left-8 md:left-10 lg:bottom-10 lg:left-12 z-20 max-w-[calc(100%-100px)] sm:max-w-[calc(100%-160px)] md:max-w-2xl lg:max-w-3xl text-left pr-4">
            <div className="overflow-hidden">
              <h3
                key={`title-${activeItem.year}`}
                className="text-xl sm:text-[26px] md:text-[30px] lg:text-[34px] 2xl:text-[40px] font-extrabold text-white tracking-tight leading-snug sm:leading-tight font-sans transition-all duration-500 animate-fadeIn drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
              >
                {activeItem.title}
              </h3>
            </div>
            <p
              key={`sub-${activeItem.year}`}
              className="mt-2 sm:mt-3 text-xs sm:text-sm lg:text-base text-white/85 font-medium leading-relaxed font-sans max-w-xl transition-all duration-500 drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]"
            >
              {activeItem.subtitle}
            </p>
          </div>

          {/* Right-Side Vertical Year Timeline matching reference image EXACTLY */}
          <div className="absolute right-3 sm:right-6 md:right-10 lg:right-12 top-5 bottom-5 sm:top-7 sm:bottom-7 z-30 flex flex-col justify-between items-end select-none">
            {timelineData.map((item) => {
              const isActive = item.year === activeYear;
              return (
                <button
                  key={item.year}
                  onClick={() => setActiveYear(item.year)}
                  onMouseEnter={() => setActiveYear(item.year)}
                  className={`relative text-right transition-all font-sans cursor-pointer group py-0.5 px-2 flex items-center justify-end ${
                    isActive
                      ? "text-white font-black text-base sm:text-lg lg:text-[clamp(18px,2.4vh,26px)] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
                      : "text-white/40 hover:text-white/85 font-extrabold text-xs sm:text-sm lg:text-[clamp(13px,1.8vh,20px)] leading-tight tracking-tight drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
                  }`}
                  aria-label={`Select year ${item.year}`}
                >
                  {/* Vertical Accent Indicator Line to the left of the active year matching reference screenshot */}
                  {isActive && (
                    <span className="absolute -left-3.5 sm:-left-5 top-1/2 -translate-y-1/2 w-[2.5px] h-6 sm:h-7 lg:h-8 bg-[#ff8c00] rounded-none shadow-[0_0_12px_rgba(255,140,0,0.95)] transition-all duration-300" />
                  )}
                  <span>{item.year}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

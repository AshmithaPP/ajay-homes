"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Palette,
  Landmark,
  Sparkles,
} from "lucide-react";

export default function SignatureLivingShowcase() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const rafId = useRef(null);

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(mediaQuery.matches);
    }
  }, []);

  // Pinned scroll scrubber listener
  useEffect(() => {
    if (isReducedMotion) return;

    const handleScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const scrollableDist = containerRef.current.offsetHeight - window.innerHeight;
        if (scrollableDist <= 0) return;

        // Progress goes from 0 (section top reaches viewport top) to 1 (section finishes)
        const progress = Math.min(1, Math.max(0, -rect.top / scrollableDist));
        setScrollProgress(progress);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isReducedMotion]);

  // If reduced motion is enabled, force full expanded composition
  const activeProgress = isReducedMotion ? 1 : scrollProgress;

  // Staggered calculation helper: images originate at (0,0) behind the central home and expand radially outward
  const calcCardTransform = (cardIndex, targetX, targetY, targetRotate, zIndex) => {
    if (isReducedMotion) {
      return {
        transform: `translate3d(${targetX}px, ${targetY}px, 0) scale(1) rotate(${targetRotate}deg)`,
        opacity: 1,
        zIndex,
      };
    }

    // Emergence starts smoothly, each image stagger-starts as scroll progresses
    const start = 0.05 + cardIndex * 0.06;
    const duration = 0.35;
    const rawP = Math.min(1, Math.max(0, (activeProgress - start) / duration));

    // Smooth cubic ease-out curve
    const eased = 1 - Math.pow(1 - rawP, 3);

    // Initial position: x = 0, y = 0 (tucked behind central home)
    // Final position: targetX, targetY (neatly spaced, zero collision)
    const currentX = targetX * eased;
    const currentY = targetY * eased;
    const currentScale = 0.4 + 0.6 * eased;
    const currentRotate = targetRotate * eased;
    const currentOpacity = Math.min(1, rawP * 2.2);

    return {
      transform: `translate3d(${currentX}px, ${currentY}px, 0) scale(${currentScale}) rotate(${currentRotate}deg)`,
      opacity: currentOpacity,
      zIndex,
    };
  };

  // Exactly 6 neatly spaced real project images: 3 on the Left, 3 on the Right
  // Calibrated so they NEVER overlap, NEVER touch each other, and NEVER collide with side text
  const realProjectImages = [
    {
      id: "img-besant",
      title: "Besant Nagar Beach Villa",
      image: "/assets/img/img-004.jpeg",
      targetX: -260,
      targetY: -140,
      rotate: -2,
      zIndex: 10,
    },
    {
      id: "img-interior",
      title: "Luxury Interior Craft",
      image: "/assets/img/img-016.jpeg",
      targetX: -275,
      targetY: 0,
      rotate: 0,
      zIndex: 10,
    },
    {
      id: "img-ankan",
      title: "Ankan Contemporary Villa",
      image: "/assets/img/img-020.jpeg",
      targetX: -260,
      targetY: 140,
      rotate: -2,
      zIndex: 10,
    },
    {
      id: "img-suresh",
      title: "Suresh Landmark Estate",
      image: "/assets/img/img-028.jpeg",
      targetX: 260,
      targetY: -140,
      rotate: 2,
      zIndex: 10,
    },
    {
      id: "img-raman",
      title: "Raman Prestige Villa",
      image: "/assets/img/img-035.jpeg",
      targetX: 275,
      targetY: 0,
      rotate: 0,
      zIndex: 10,
    },
    {
      id: "img-shastri",
      title: "Shastri Nagar Residency",
      image: "/assets/img/img-048.jpeg",
      targetX: 260,
      targetY: 140,
      rotate: 2,
      zIndex: 10,
    },
  ];

  // Left Feature Items (pushed far to the outer left margin)
  const leftFeatures = [
    {
      icon: Compass,
      title: "Bespoke architectural planning",
      desc: "Custom floorplans tailored to your life",
    },
    {
      icon: Building2,
      title: "Turnkey residential engineering",
      desc: "Groundbreak to handover EPC execution",
    },
    {
      icon: CheckCircle2,
      title: "100% IS-Code certified materials",
      desc: "Ultra-durable structural integrity",
    },
  ];

  // Right Feature Items (pushed far to the outer right margin)
  const rightFeatures = [
    {
      icon: ShieldCheck,
      title: "Transparent milestone governance",
      desc: "Realtime tracking & clear legal NOC",
    },
    {
      icon: Palette,
      title: "Custom luxury interior tailoring",
      desc: "Fine Italian marble & artisanal millwork",
    },
    {
      icon: Landmark,
      title: "Prime Chennai real estate assets",
      desc: "Handpicked premium land parcels",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white"
      style={{ height: isReducedMotion ? "auto" : "220vh" }}
    >
      {/* Pinned Viewport Container */}
      <div className={`${isReducedMotion ? "relative py-16" : "sticky top-0 h-screen"} w-full flex flex-col justify-center items-center overflow-hidden bg-white px-4 sm:px-8 lg:px-12`}>
        <div className="w-full max-w-[1440px] mx-auto">
          {/* Section Header: Centered & ALWAYS visible on section entry */}
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">           

            {/* Main Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 tracking-tight font-sans leading-snug">
              Spaces designed to become your{" "}
              <span className="text-[#ff8c00]">forever home</span>
            </h2>

            {/* Supporting Text & CTA */}
            <p className="mt-2.5 text-xs sm:text-sm md:text-base text-slate-600 font-sans max-w-2xl mx-auto">
              Explore homes and residences crafted by Ajay Homes &amp; Estates &mdash; from thoughtful planning to completed living spaces.{" "}
              <Link
                href="#projects"
                className="text-[#ff8c00] font-bold underline decoration-[#ff8c00]/40 underline-offset-4 hover:decoration-[#ff8c00] transition-colors"
              >
                Explore Our Projects &rarr;
              </Link>
            </p>
          </div>

          {/* 3-Column Core Showcase Layout with generous horizontal clearance */}
          <div className="relative flex flex-col lg:flex-row items-center justify-between min-h-[460px] sm:min-h-[520px]">
            {/* Left 3 Features: Docked to far left margin with zero card overlap */}
            <div className="hidden lg:flex w-[240px] xl:w-[260px] shrink-0 flex-col justify-center space-y-16 pl-2 z-30">
              {leftFeatures.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3.5 group">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ff8c00]/10 border border-[#ff8c00]/25 text-[#ff8c00] shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#ff8c00] group-hover:text-white mt-0.5">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-[#ff8c00] transition-colors font-sans">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 font-sans leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center Architectural Showcase: Fixed Central Home + Emergent Real Project Images (Zero Overlap) */}
            <div className="relative flex-1 flex items-center justify-center my-4 lg:my-0 min-w-[320px] max-w-[800px]">
              {/* Emerging Real Project Photos: Arranged with clean, generous gaps (NO touching) */}
              <div className="absolute inset-0 pointer-events-none hidden sm:flex items-center justify-center">
                {realProjectImages.map((card, i) => {
                  const style = calcCardTransform(i, card.targetX, card.targetY, card.rotate, card.zIndex);
                  return (
                    <div
                      key={card.id}
                      className="absolute transition-transform duration-75 ease-out will-change-transform pointer-events-auto"
                      style={style}
                    >
                      {/* Realtime Project Image: Neatly proportioned, no collision */}
                      <div className="group relative overflow-hidden rounded-xl border-2 border-white ring-1 ring-slate-200/90 shadow-xl shadow-slate-900/10 bg-slate-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:ring-[#ff8c00] cursor-pointer w-44 h-28 sm:w-48 sm:h-30">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          sizes="192px"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Subtle Title Overlay on Image Bottom */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2 pt-5 text-left">
                          <p className="text-[10px] sm:text-[11px] font-bold text-white font-sans truncate drop-shadow-sm">
                            {card.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Central Real Project: img-001.jpeg ("Scarlet Diamond") */}
              {/* Clean, authentic architectural elevation panel (NO fake phone bezels, NO speaker notches) */}
              <div className="relative z-20 w-[270px] sm:w-[290px] md:w-[310px] rounded-2xl overflow-hidden bg-white shadow-2xl shadow-slate-900/15 border-2 border-white ring-1 ring-slate-200/80 transition-transform duration-300 hover:scale-[1.01]">
                <div className="relative h-[400px] sm:h-[450px] md:h-[480px] w-full overflow-hidden bg-slate-100">
                  <Image
                    src="/assets/img/img-001.jpeg"
                    alt="Scarlet Diamond - Flagship Residence by Ajay Homes & Estates"
                    fill
                    priority
                    sizes="(max-width: 768px) 290px, 310px"
                    className="object-cover object-center"
                  />

                  {/* Gradient shadow for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

                  {/* Top Badge: Clean Architectural Pill */}
                  <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold text-slate-900 shadow-sm backdrop-blur-sm">
                      <Sparkles className="h-3 w-3 text-[#ff8c00]" />
                      Flagship Residence
                    </span>
                  </div>

                  {/* Bottom Architectural Info Card */}
                  <div className="absolute bottom-3.5 inset-x-3.5 z-10 rounded-xl bg-white/95 backdrop-blur-md p-3 shadow-md border border-white/60 text-center">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#ff8c00]">
                      Central Featured Landmark
                    </span>
                    <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5 font-sans">
                      Scarlet Diamond
                    </h3>
                    <p className="text-[10px] text-slate-600 mt-0.5 font-sans">
                      Bespoke G+3 Villa &bull; South India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 3 Features: Docked to far right margin with zero card overlap */}
            <div className="hidden lg:flex w-[240px] xl:w-[260px] shrink-0 flex-col justify-center space-y-16 pr-2 z-30">
              {rightFeatures.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3.5 group">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ff8c00]/10 border border-[#ff8c00]/25 text-[#ff8c00] shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#ff8c00] group-hover:text-white mt-0.5">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-[#ff8c00] transition-colors font-sans">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 font-sans leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile / Tablet Features Strip (shown below without horizontal overflow) */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 lg:hidden">
            {[...leftFeatures, ...rightFeatures].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ff8c00]/10 text-[#ff8c00]">
                    <IconComp className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 font-sans">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-sans">
                      {item.desc}
                    </p>
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

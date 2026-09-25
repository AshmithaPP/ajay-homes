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

// Left Feature Items (beside the showcase on desktop, first column below it on mobile)
const leftFeatures = [
  {
    icon: Compass,
    title: "Bespoke architectural planning",
  },
  {
    icon: Building2,
    title: "Turnkey residential engineering",
  },
  {
    icon: CheckCircle2,
    title: "100% IS-Code certified materials",
  },
];

// Right Feature Items (beside the showcase on desktop, second column below it on mobile)
const rightFeatures = [
  {
    icon: ShieldCheck,
    title: "Transparent milestone governance",
  },
  {
    icon: Palette,
    title: "Custom luxury interior tailoring",
  },
  {
    icon: Landmark,
    title: "Prime Chennai real estate assets",
  },
];

// Exactly 6 real project images: 3 fan out to the Left, 3 to the Right
const projectImages = [
  { id: "img-besant", title: "Besant Nagar Beach Villa", image: "/assets/img/img-004.jpeg", side: -1, row: -1 },
  { id: "img-interior", title: "Luxury Interior Craft", image: "/assets/img/img-016.jpeg", side: -1, row: 0 },
  { id: "img-ankan", title: "Ankan Contemporary Villa", image: "/assets/img/img-020.jpeg", side: -1, row: 1 },
  { id: "img-suresh", title: "Suresh Landmark Estate", image: "/assets/img/img-028.jpeg", side: 1, row: -1 },
  { id: "img-raman", title: "Raman Prestige Villa", image: "/assets/img/img-035.jpeg", side: 1, row: 0 },
  { id: "img-shastri", title: "Shastri Nagar Residency", image: "/assets/img/img-048.jpeg", side: 1, row: 1 },
];

// Height of the fixed navbar (running top bar + main bar) on desktop; the pinned stage sits just below it
const NAV_H = 108;

function FeatureItem({ item, large }) {
  const IconComp = item.icon;
  return (
    <div className={`flex items-center group ${large ? "gap-4" : "gap-3"}`}>
      <div
        className={`flex shrink-0 items-center justify-center rounded-xl bg-[#003a70] border-2 border-[#003a70] ring-4 ring-[#003a70]/10 text-white shadow-md shadow-[#003a70]/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-[#003a70]/35 ${
          large ? "h-11 w-11 2xl:h-14 2xl:w-14" : "h-11 w-11"
        }`}
      >
        <IconComp className={large ? "h-5 w-5 2xl:h-6 2xl:w-6" : "h-5 w-5"} />
      </div>
      <div className="min-w-0">
        <h4
          className={`font-bold text-slate-900 leading-snug group-hover:text-[#003a70] transition-colors font-sans ${
            large ? "text-sm 2xl:text-base" : "text-[13px] sm:text-sm"
          }`}
        >
          {item.title}
        </h4>
        <p className={`text-slate-500 mt-1 font-sans leading-normal ${large ? "text-xs 2xl:text-sm" : "text-xs"}`}>
          {item.desc}
        </p>
      </div>
    </div>
  );
}

export default function SignatureLivingShowcase() {
  const containerRef = useRef(null);
  const fanRef = useRef(null);
  const headerRef = useRef(null);
  const [headerH, setHeaderH] = useState(190);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [vp, setVp] = useState({ w: 1440, h: 900 });
  const rafId = useRef(null);

  // Viewport size and reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setIsReducedMotion(mediaQuery.matches);
      setVp({ w: window.innerWidth, h: window.innerHeight });
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  // Measure the heading block (incl. its bottom margin) so the pinned stage can size the fan to fit
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const measure = () => {
      const mb = parseFloat(getComputedStyle(el).marginBottom) || 0;
      setHeaderH(Math.ceil(el.offsetHeight + mb));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Desktop (>=1280px): feature columns sit beside the fan and the section is pinned while scrolling.
  // Smaller screens: same fan composition scaled down, features listed below it.
  const isDesktop = vp.w >= 1280;

  // Scroll scrubber: pinned progress on desktop, "scroll into view" progress on mobile/tablet
  useEffect(() => {
    if (isReducedMotion) return;

    const handleScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        if (isDesktop) {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const scrollableDist = containerRef.current.offsetHeight - window.innerHeight;
          if (scrollableDist <= 0) return;
          // 0 when the section top reaches the navbar, 1 when the pinned stretch ends
          setScrollProgress(Math.min(1, Math.max(0, (NAV_H - rect.top) / scrollableDist)));
        } else {
          if (!fanRef.current) return;
          const rect = fanRef.current.getBoundingClientRect();
          // 0 as the showcase enters from the bottom, 1 once it has risen ~80% of the screen
          const vh = window.innerHeight;
          setScrollProgress(Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.8))));
        }
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
  }, [isReducedMotion, isDesktop]);

  const activeProgress = isReducedMotion ? 1 : scrollProgress;

  // Composition sizes derived from the viewport
  let centerW;
  let centerH;
  let sideRatio;
  let gapRatio;
  if (isDesktop) {
    centerW = Math.round(Math.min(390, Math.max(270, vp.h * 0.36, vp.w * 0.17)));
    // Room left under the navbar after the top padding (up to 56), heading block, fan margin (40) and bottom breathing space (40)
    centerH = Math.round(Math.max(200, Math.min(centerW * 1.42, vp.h - NAV_H - headerH - 136)));
    // On short laptop screens (e.g. 14" at 150% scaling) keep the card from turning wide and squat
    centerW = Math.min(centerW, Math.round(centerH / 1.2));
    sideRatio = 0.62;
    gapRatio = 0.09;
  } else {
    // Fan width ≈ 2.32 × centre width with these ratios; fit it inside the screen gutters
    const avail = Math.min(vp.w - 32, 900);
    centerW = Math.round(Math.min(300, avail / 2.32));
    centerH = Math.round(centerW * 1.42);
    sideRatio = 0.56;
    gapRatio = 0.05;
  }
  const fanY = Math.round(centerH * 0.33);
  // Side photos shrink when needed so the stacked rows never overlap each other
  const sideH = Math.round(Math.min(centerW * sideRatio * 0.64, fanY - 14));
  const sideW = Math.round(sideH / 0.64);
  const sideGap = Math.round(centerW * gapRatio);
  const fanX = centerW / 2 + sideW / 2 + sideGap;
  const fanWidth = Math.round(2 * (fanX + sideGap + sideW / 2) + (isDesktop ? 24 : 0));
  const compact = !isDesktop && centerW < 200;

  // Staggered emergence: photos start behind the central home and expand outward
  const calcCardTransform = (cardIndex, targetX, targetY, targetRotate) => {
    const start = 0.05 + cardIndex * 0.06;
    const duration = 0.35;
    const rawP = Math.min(1, Math.max(0, (activeProgress - start) / duration));
    const eased = 1 - Math.pow(1 - rawP, 3);

    return {
      transform: `translate3d(${targetX * eased}px, ${targetY * eased}px, 0) scale(${0.4 + 0.6 * eased}) rotate(${targetRotate * eased}deg)`,
      opacity: Math.min(1, rawP * 2.2),
      zIndex: 10,
    };
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white"
      style={{ height: isDesktop && !isReducedMotion ? "220vh" : "auto" }}
    >
      {/* Pinned Viewport Container on Desktop; Natural Flow on Mobile/Tablet */}
      <div
        className={`${
          isDesktop && !isReducedMotion ? "sticky pt-12 2xl:pt-14 justify-start" : "relative py-16 sm:py-20 justify-center"
        } w-full flex flex-col items-center overflow-hidden bg-white px-4 sm:px-6 lg:px-10 2xl:px-16`}
        style={isDesktop && !isReducedMotion ? { top: `${NAV_H}px`, height: `calc(100vh - ${NAV_H}px)` } : undefined}
      >
        <div className="w-full max-w-[1680px] mx-auto">
          {/* Section Header */}
          <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-6 2xl:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] 2xl:text-[38px] font-bold text-slate-900 tracking-tight font-sans leading-snug">
              Spaces designed for your{" "}
              <span className="text-[#ff8c00]">forever home</span>
            </h2>
            {/* One line from tablets up; wraps naturally on phones */}
            <p className="mt-2.5 text-sm md:text-base 2xl:text-lg text-slate-600 font-sans mx-auto md:whitespace-nowrap">
              Explore thoughtfully planned homes and residences by Ajay Homes &amp; Estates.
            </p>
          </div>

          {/* Core Showcase Area */}
          <div className="relative flex flex-row items-center justify-center xl:gap-5 2xl:gap-8">
            {/* Desktop Left 3 Features */}
            {isDesktop && (
              <div
                className="flex w-[240px] 2xl:w-[260px] min-[1800px]:w-[280px] shrink-0 flex-col justify-evenly pl-2 z-30"
                style={{ height: `${centerH + 40}px` }}
              >
                {leftFeatures.map((item) => (
                  <FeatureItem key={item.title} item={item} large />
                ))}
              </div>
            )}

            {/* Central Showcase + Radially Emerging Project Photos */}
            <div
              ref={fanRef}
              className="relative flex flex-none items-center justify-center"
              style={{ width: `${fanWidth}px`, height: `${centerH + (isDesktop ? 40 : 16)}px` }}
            >
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {projectImages.map((card, i) => {
                  const targetX = card.side * (card.row === 0 ? fanX + sideGap : fanX);
                  const targetY = card.row * fanY;
                  const rotate = card.row === 0 ? 0 : card.side * 2;
                  return (
                    <div
                      key={card.id}
                      className="absolute transition-transform duration-75 ease-out will-change-transform pointer-events-auto"
                      style={calcCardTransform(i, targetX, targetY, rotate)}
                    >
                      <div
                        className={`group relative overflow-hidden border-white ring-1 ring-slate-200/90 shadow-xl shadow-slate-900/10 bg-slate-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:ring-[#ff8c00] cursor-pointer ${
                          compact ? "rounded-lg border" : "rounded-xl border-2"
                        }`}
                        style={{ width: `${sideW}px`, height: `${sideH}px` }}
                      >
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          sizes="(max-width: 1280px) 180px, 260px"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div
                          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-left ${
                            compact ? "px-1 pb-0.5 pt-3" : "p-2 pt-5"
                          }`}
                        >
                          <p
                            className={`font-bold text-white font-sans truncate drop-shadow-sm ${
                              compact ? "text-[7px] leading-tight" : "text-[11px] 2xl:text-xs"
                            }`}
                          >
                            {card.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Central Real Project Card */}
              <div
                className={`relative z-20 overflow-hidden bg-white shadow-xl shadow-slate-900/10 border-white ring-1 ring-slate-200/80 transition-transform duration-300 hover:scale-[1.01] ${
                  compact ? "rounded-xl border" : "rounded-2xl border-2"
                }`}
                style={{ width: `${centerW}px` }}
              >
                <div className="relative w-full overflow-hidden bg-slate-100" style={{ height: `${centerH}px` }}>
                  <Image
                    src="/assets/img/img-001.jpeg"
                    alt="Scarlet Diamond - Flagship Residence by Ajay Homes & Estates"
                    fill
                    priority
                    sizes="(max-width: 1280px) 300px, 400px"
                    className="object-cover object-center"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

                  {/* Top Badge */}
                  <div className={`absolute z-10 pointer-events-none ${compact ? "top-1.5 left-1.5" : "top-3 left-3"}`}>
                    <span
                      className={`inline-flex items-center rounded-full bg-white/95 font-bold text-slate-900 shadow-xs backdrop-blur-xs ${
                        compact ? "gap-1 px-1.5 py-0.5 text-[7px]" : "gap-1.5 px-2.5 py-1 text-[10px]"
                      }`}
                    >
                      <Sparkles className={`text-[#ff8c00] ${compact ? "h-2 w-2" : "h-3 w-3"}`} />
                      Flagship Residence
                    </span>
                  </div>

                  {/* Bottom Info Card */}
                  <div
                    className={`absolute z-10 bg-white/95 backdrop-blur-md shadow-md border border-white/60 text-center ${
                      compact ? "bottom-1.5 inset-x-1.5 rounded-lg p-1.5" : "bottom-3 inset-x-3 rounded-xl p-2.5 sm:p-3"
                    }`}
                  >
                    <span
                      className={`block font-extrabold uppercase text-[#ff8c00] ${
                        compact ? "text-[6px] tracking-wider" : "text-[9px] tracking-widest"
                      }`}
                    >
                      Central Featured Landmark
                    </span>
                    <h3 className={`font-extrabold text-slate-900 mt-0.5 font-sans ${compact ? "text-[10px]" : "text-xs sm:text-sm"}`}>
                      Scarlet Diamond
                    </h3>
                    {!compact && (
                      <p className="text-[10px] text-slate-600 mt-0.5 font-sans">Bespoke G+3 Villa &bull; South India</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Right 3 Features */}
            {isDesktop && (
              <div
                className="flex w-[240px] 2xl:w-[260px] min-[1800px]:w-[280px] shrink-0 flex-col justify-evenly pr-2 z-30"
                style={{ height: `${centerH + 40}px` }}
              >
                {rightFeatures.map((item) => (
                  <FeatureItem key={item.title} item={item} large />
                ))}
              </div>
            )}
          </div>

          {/* Tablet only: same feature points, left set and right set as two columns (hidden on phones) */}
          {!isDesktop && (
            <div className="hidden md:grid mt-10 mx-auto max-w-3xl grid-cols-2 gap-x-10 gap-y-7">
              {[leftFeatures, rightFeatures].map((column, c) => (
                <div key={c} className="flex flex-col gap-5 sm:gap-7">
                  {column.map((item) => (
                    <FeatureItem key={item.title} item={item} />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

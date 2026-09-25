"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Card sizes derived from both viewport width and height so the whole
// composition (year + card + caption) fits on short laptop screens,
// large desktops (1920×1080) and phones alike.
const CARD_RATIO = 1.27; // height / width of the portrait cards

function computeDims(vw, vh) {
  const isMobile = vw < 640;

  let centerW;
  if (isMobile) centerW = Math.min(270, vw * 0.7);
  else if (vw < 1024) centerW = 340;
  else if (vw < 1536) centerW = 400;
  else if (vw < 2200) centerW = 440;
  else centerW = 500;

  // Keep the card short enough that title, year, card and caption fit under the navbar
  const maxH = Math.max(isMobile ? 300 : 320, (vh - 340) / 1.2);
  let centerH = Math.min(centerW * CARD_RATIO, maxH);
  centerW = centerH / CARD_RATIO;

  // Side photos are large and sit close to the centre card so the row reads as one composition
  const sideW = centerW * 0.72;
  const sideH = centerH * 0.78;
  const gap = isMobile ? 14 : Math.min(40, vw * 0.022);

  return {
    isMobile,
    centerW,
    centerH,
    sideW,
    sideH,
    slotWidth: centerW / 2 + sideW / 2 + gap,
    yearSize: Math.round(centerW * 0.28),
    captionW: Math.min(vw - 32, 448),
    captionH: isMobile ? 72 : 80,
  };
}

export default function UnsurpassedLegacy() {
  const milestones = [
    {
      year: "1996",
      title: "Foundation & Vision",
      caption: "Ajay Homes was incorporated with a singular dedication to bespoke architectural leadership.",
      image: "/assets/img/img-001.jpeg",
    },
    {
      year: "2001",
      title: "Central Chennai Landmark",
      caption: "Delivered first boutique residential enclave in Central Chennai, establishing benchmark construction standards.",
      image: "/assets/img/besantnagar-residence-view/img19.jpg",
    },
    {
      year: "2006",
      title: "Adyar & Boat Club Enclaves",
      caption: "Pioneered exclusive private residences along Adyar and Boat Club Road.",
      image: "/assets/img/suresh-residence-view/img17.jpg",
    },
    {
      year: "2011",
      title: "15 Years of Excellence",
      caption: "Celebrated 15 years of excellence with 50+ delivered architectural landmarks across Tamil Nadu.",
      image: "/assets/img/raman-residence/img106.jpg",
    },
    {
      year: "2016",
      title: "Coastal Luxury Enclaves",
      caption: "Unveiled signature coastal villa enclaves along the prestigious East Coast Road corridor.",
      image: "/assets/img/ankan-resideance-view/img13.jpg",
    },
    {
      year: "2020",
      title: "Automated Biophilic Sanctuaries",
      caption: "Pioneered integrated biophilic architecture and smart automated home sanctuaries.",
      image: "/assets/img/natraj-residence/img102.jpg",
    },
    {
      year: "2023",
      title: "Architectural Excellence",
      caption: "Honored with Premier Architectural Excellence Award for iconic coastal living.",
      image: "/assets/img/img-062.jpeg",
    },
    {
      year: "2026",
      title: "Three Decades of Mastery",
      caption: "Celebrating three decades of craftsmanship from 1996 to 2026, leading net-zero energy luxury estates.",
      image: "/assets/img/raman-residence/img160.jpg",
    },
  ];

  const total = milestones.length;
  // Triplicate milestones for seamless infinite loop
  const triplicated = [...milestones, ...milestones, ...milestones];

  // Start at middle set (virtualIndex = 8 for index 0)
  const [virtualIndex, setVirtualIndex] = useState(total);
  const [isJumping, setIsJumping] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dims, setDims] = useState(() => computeDims(1440, 900));
  const [touchStartX, setTouchStartX] = useState(null);
  const { isMobile, slotWidth, centerW, centerH, sideW, sideH, yearSize, captionW, captionH } = dims;

  useEffect(() => {
    const updateDimensions = () => {
      setDims(computeDims(window.innerWidth, window.innerHeight));
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const slideBy = useCallback(
    (steps) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setVirtualIndex((prev) => prev + steps);
      setTimeout(() => setIsTransitioning(false), 850);
    },
    [isTransitioning]
  );
  const slideNext = useCallback(() => slideBy(1), [slideBy]);
  const slidePrev = useCallback(() => slideBy(-1), [slideBy]);

  // Seamless jump to keep virtualIndex within the middle set [total, total * 2 - 1]
  const handleTransitionEnd = () => {
    if (virtualIndex >= total * 2) {
      setIsJumping(true);
      setVirtualIndex((prev) => prev - total);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsJumping(false);
        });
      });
    } else if (virtualIndex < total) {
      setIsJumping(true);
      setVirtualIndex((prev) => prev + total);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsJumping(false);
        });
      });
    }
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 40) {
      slideNext();
    } else if (diff < -40) {
      slidePrev();
    }
    setTouchStartX(null);
  };

  return (
    <section
      id="unsurpassed-legacy"
      className="relative w-full bg-white pt-14 sm:pt-16 lg:pt-12 pb-16 sm:pb-20 lg:pb-16 text-slate-900 overflow-hidden border-t border-slate-100 select-none"
    >
      {/* Title matching consistent site heading design */}
      <div className="mx-auto max-w-4xl text-center px-4 mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 tracking-tight font-sans">
          An Unsurpassed Legacy of Leadership
        </h2>
      </div>

      {/* Main Composition Container */}
      <div
        className="relative w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Continuous Thin Golden Horizontal Baseline behind all cards */}
        <div
          className="absolute left-0 right-0 h-[1px] bg-[#d5bf9f]/75 pointer-events-none z-0"
          style={{ bottom: `${captionH + (isMobile ? 16 : 24) + sideH * 0.35}px` }}
        />

        {/* Physical GPU-Accelerated Sliding Track with Graceful 850ms Glide */}
        <div
          onTransitionEnd={handleTransitionEnd}
          className="flex items-end"
          style={{
            transform: `translate3d(calc(50vw - ${(virtualIndex + 0.5) * slotWidth}px), 0, 0)`,
            transition: isJumping ? "none" : "transform 850ms cubic-bezier(0.16, 1, 0.3, 1)",
            willChange: "transform",
          }}
        >
          {triplicated.map((item, idx) => {
            const distance = idx - virtualIndex;
            const isCenter = distance === 0;
            const isLeft = distance === -1;
            const isRight = distance === 1;
            // Second photo on each side fills the outer edges of wide screens
            const isOuter = Math.abs(distance) === 2;
            // Pull outer photos toward the centre so every gap between photos is equal
            const outerShift = isOuter ? -Math.sign(distance) * ((centerW - sideW) / 2) : 0;

            return (
              <div
                key={`${item.year}-${idx}`}
                style={{ width: `${slotWidth}px` }}
                className="shrink-0 flex flex-col items-center justify-end px-2 sm:px-4 relative z-10"
              >
                {/* Year Display placed directly ABOVE the image with dedicated clearance (zero cutting off) */}
                <div
                  className={`transition-all duration-700 pointer-events-none select-none mb-2 sm:mb-3 md:mb-4 z-10 ${isCenter
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-3 scale-95"
                    }`}
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <span
                    className="font-[100] text-[#1c1917] leading-none tracking-tight block font-sans"
                    style={{
                      fontFamily: "var(--font-montserrat), system-ui, sans-serif",
                      fontWeight: 100,
                      fontSize: `${yearSize}px`,
                    }}
                  >
                    {item.year}
                  </span>
                </div>

                {/* The Card Image: Original image as it is (no blur, 100% opacity) */}
                <div
                  onClick={() => {
                    if (isLeft || isRight || isOuter) slideBy(distance);
                  }}
                  className={`group relative overflow-hidden rounded-[2px] bg-white transition-all duration-700 ${isCenter
                      ? "shadow-lg z-20 border border-slate-200/90"
                      : isLeft || isRight
                        ? "shadow-sm opacity-100 z-10 cursor-pointer border border-slate-200/80 hover:-translate-y-1"
                        : isOuter
                          ? "shadow-sm opacity-60 hover:opacity-100 z-10 cursor-pointer border border-slate-200/80"
                          : "opacity-0 pointer-events-none scale-75"
                    }`}
                  style={{
                    width: `${isCenter ? centerW : sideW}px`,
                    height: `${isCenter ? centerH : sideH}px`,
                    translate: `${outerShift}px 0`,
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {/* Clean original image (no blur, no darkening, 100% true colors) */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 270px, 500px"
                    priority={Math.abs(distance) <= 1}
                    className="object-cover"
                  />

                  {/* Left Card Hover State: Shows smooth interactive arrow affordance */}
                  {isLeft && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 text-[#003a70] shadow-xl flex items-center justify-center border border-slate-200/80 transform translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                      </div>
                    </div>
                  )}

                  {/* Right Card Hover State: Shows smooth interactive arrow affordance */}
                  {isRight && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 text-[#003a70] shadow-xl flex items-center justify-center border border-slate-200/80 transform -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Milestone Caption Centered Below active card */}
                <div
                  className={`shrink-0 text-center mt-4 sm:mt-6 px-2 transition-all duration-700 ${isCenter
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                  style={{
                    width: `${captionW}px`,
                    height: `${captionH}px`,
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans font-normal">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

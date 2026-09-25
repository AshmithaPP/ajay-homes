"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Video Reels Data for Ajay Homes & Estates
 * (Placeholder videos removed. Homeowner images displayed crisp 'as it is'.)
 */
const videoReels = [
  {
    id: "reel-arvind",
    name: "Dr. R. Arvind",
    role: "Homeowner",
    project: "Scarlet Diamond Residence · Anna Nagar",
    poster: "/assets/testimonials/reels-arvind.jpg",
    text: "Arvind was looking for a bespoke turnkey villa in Anna Nagar that matched his family's architectural standards. Through Ajay Homes & Estates, they completed a 5,800 sq.ft luxury residence with Italian marble and landscaped terraces delivered right on schedule.",
  },
  {
    id: "reel-ananya",
    name: "Ananya Subramanian",
    role: "Homeowner",
    project: "Nanavati Coastal Villa · Besant Nagar",
    poster: "/assets/testimonials/reels-ananya.jpg",
    text: "Ananya was working overseas and needed a reliable builder in Chennai for a coastal residence near Elliot's Beach. Through Ajay Homes & Estates, their 7,200 sq.ft sea-facing home was engineered with marine-grade materials and full digital milestone transparency.",
  },
  {
    id: "reel-suresh",
    name: "Suresh Kumar",
    role: "Homeowner",
    project: "Suresh Boat Club Manor · Adyar",
    poster: "/assets/testimonials/reels-suresh.jpg",
    text: "Suresh had a clear vision for an ultra-luxury contemporary manor on Boat Club Road with double-height atriums. Ajay Homes delivered master craftsmanship, turnkey IS-code structural certification, and flawless bespoke interior finishes.",
  },
  {
    id: "reel-karthik",
    name: "Karthik Viswanathan",
    role: "Homeowner",
    project: "Raman Prestige Villa · OMR Corridor",
    poster: "/assets/testimonials/reels-karthik.jpg",
    text: "Karthik wanted a modern tech-integrated smart home with acoustic glazing and cantilevered architectural profiles. Ajay Homes turned complex architectural blueprints into a quiet, sunlit sanctuary for his growing family.",
  },
  {
    id: "reel-priya",
    name: "Priya Natarajan",
    role: "Homeowner",
    project: "Natraj Independent Villa · Velachery",
    poster: "/assets/testimonials/reels-priya.jpg",
    text: "Priya and her parents wanted an independent multi-generational villa with private lift access and landscaped rooftop gardens. Ajay Homes handled everything from Bhoomi Pooja to Griha Pravesam with exceptional warmth and integrity.",
  },
];

const N = videoReels.length;

function AnimatedReelPoster({ currentReel, incomingReel, isAnimating, direction, isCenter, priority }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Primary / Outgoing image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={
          isAnimating
            ? {
                animation: `${direction === "next" ? "reelSlideNextOut" : "reelSlidePrevOut"} 460ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
              }
            : undefined
        }
      >
        <Image
          src={currentReel.poster}
          alt={currentReel.name}
          fill
          priority={priority}
          sizes={isCenter ? "(max-width: 640px) 75vw, 750px" : "(max-width: 640px) 25vw, 320px"}
          className="object-cover object-center transition-transform duration-500 hover:scale-102"
        />
      </div>

      {/* Incoming image during slide animation */}
      {isAnimating && incomingReel && (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            animation: `${direction === "next" ? "reelSlideNextIn" : "reelSlidePrevIn"} 460ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
          }}
        >
          <Image
            src={incomingReel.poster}
            alt={incomingReel.name}
            fill
            sizes={isCenter ? "(max-width: 640px) 75vw, 750px" : "(max-width: 640px) 25vw, 320px"}
            className="object-cover object-center"
          />
        </div>
      )}
    </div>
  );
}

export default function HappyClients() {
  const [activeIndex, setActiveIndex] = useState(1); // Default center reel (Ananya)
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("next"); // "next" | "prev"
  const [targetIndex, setTargetIndex] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef(null);
  const animTimeoutRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Smooth entrance reveal when scrolling into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Exactly three reels in the viewport: Left, Center (Big), Right
  const prevIndex = (activeIndex - 1 + N) % N;
  const nextIndex = (activeIndex + 1) % N;

  const leftReel = videoReels[prevIndex];
  const centerReel = videoReels[activeIndex];
  const rightReel = videoReels[nextIndex];

  // Incoming target reels during transition
  const targetPrevIndex = (targetIndex - 1 + N) % N;
  const targetNextIndex = (targetIndex + 1) % N;

  const incomingLeftReel = videoReels[targetPrevIndex];
  const incomingCenterReel = videoReels[targetIndex];
  const incomingRightReel = videoReels[targetNextIndex];

  // Navigate with smooth synchronized slide animation across all 3 cards
  const handleNavigate = useCallback(
    (newIndex, forcedDirection = null) => {
      if (isAnimating) return;
      const normalizedNewIndex = ((newIndex % N) + N) % N;
      if (normalizedNewIndex === activeIndex) return;

      const navDir =
        forcedDirection ||
        (normalizedNewIndex > activeIndex && !(activeIndex === 0 && normalizedNewIndex === N - 1)
          ? "next"
          : activeIndex === N - 1 && normalizedNewIndex === 0
          ? "next"
          : "prev");

      setDirection(navDir);
      setTargetIndex(normalizedNewIndex);
      setIsAnimating(true);

      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
      animTimeoutRef.current = setTimeout(() => {
        setActiveIndex(normalizedNewIndex);
        setIsAnimating(false);
      }, 460);
    },
    [activeIndex, isAnimating]
  );

  const goNext = useCallback(() => handleNavigate(activeIndex + 1, "next"), [activeIndex, handleNavigate]);
  const goPrev = useCallback(() => handleNavigate(activeIndex - 1, "prev"), [activeIndex, handleNavigate]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  // Touch gesture handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) goNext();
    else if (diff < -40) goPrev();
  };

  const displayCenterReel = isAnimating ? incomingCenterReel : centerReel;

  return (
    <section
      ref={sectionRef}
      id="happy-clients"
      className="relative w-full bg-white py-14 sm:py-18 lg:py-20 2xl:py-24 text-slate-900 overflow-hidden font-sans border-t border-slate-100"
    >
      {/* Synchronized 60fps GPU-accelerated horizontal slide keyframes */}
      <style>{`
        @keyframes reelSlideNextOut {
          0% { transform: translate3d(0%, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        @keyframes reelSlideNextIn {
          0% { transform: translate3d(100%, 0, 0); }
          100% { transform: translate3d(0%, 0, 0); }
        }
        @keyframes reelSlidePrevOut {
          0% { transform: translate3d(0%, 0, 0); }
          100% { transform: translate3d(100%, 0, 0); }
        }
        @keyframes reelSlidePrevIn {
          0% { transform: translate3d(-100%, 0, 0); }
          100% { transform: translate3d(0%, 0, 0); }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1480px] px-3 sm:px-6 lg:px-8">
        {/* Section Header: 2-line heading with smooth scroll-entrance reveal */}
        <div
          className={`text-center max-w-3xl mx-auto transition-all duration-800 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-900 tracking-tight font-sans leading-tight">
            Real journeys. Real people.
            <br />
            <span className="text-[#003a70]">Real </span>
            <span className="text-[#ff8c00]">success.</span>
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 font-sans max-w-xl mx-auto leading-relaxed">
            Over 150+ Chennai families have trusted us with their forever homes.
            <br className="hidden sm:inline" />{" "}
            Watch these short stories to hear how we turned their dream residences into reality.
          </p>

          {/* Centered Pill Carousel Indicator */}
          <div
            className={`flex items-center justify-center gap-2 mt-4 sm:mt-5 transition-all duration-800 delay-150 ease-out ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
            }`}
          >
            {videoReels.map((reel, idx) => {
              const currentActive = isAnimating ? targetIndex : activeIndex;
              const isActive = currentActive === idx;
              return (
                <button
                  key={reel.id}
                  onClick={() => handleNavigate(idx)}
                  className={`transition-all duration-400 ease-out cursor-pointer ${
                    isActive
                      ? "w-8 h-2 rounded-full bg-slate-900"
                      : "w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to reel ${idx + 1}`}
                />
              );
            })}
          </div>
        </div>

        {/* 
          EXACTLY THREE VIDEOS IN VIEWPORT WITH SMOOTH SCROLL ENTRANCE REVEAL
          Left Card: Narrow vertical framing
          Center Card: BIG, prominent in center
          Right Card: Narrow vertical framing
        */}
        <div
          className={`relative mt-8 sm:mt-10 w-full transition-all duration-1000 delay-200 ease-out ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-[0.98]"
          }`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Subtle Desktop Navigation Arrows */}
          <button
            onClick={goPrev}
            className="hidden md:flex absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-30 h-10 w-10 2xl:h-12 2xl:w-12 items-center justify-center rounded-full bg-white/95 text-slate-800 shadow-xl border border-slate-200/90 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white cursor-pointer active:scale-95"
            aria-label="Previous reel"
          >
            <ChevronLeft className="h-5 w-5 2xl:h-6 2xl:w-6 stroke-[2.5]" />
          </button>

          <button
            onClick={goNext}
            className="hidden md:flex absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-30 h-10 w-10 2xl:h-12 2xl:w-12 items-center justify-center rounded-full bg-white/95 text-slate-800 shadow-xl border border-slate-200/90 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white cursor-pointer active:scale-95"
            aria-label="Next reel"
          >
            <ChevronRight className="h-5 w-5 2xl:h-6 2xl:w-6 stroke-[2.5]" />
          </button>

          {/* Three-Card Responsive Grid: Left (1fr), Center BIG (2.4fr), Right (1fr) */}
          <div className="flex items-stretch justify-center gap-2.5 sm:gap-4 lg:gap-6 w-full h-[400px] sm:h-[480px] lg:h-[530px] xl:h-[570px]">
            {/* 1. LEFT VIDEO CARD (Smooth synchronized sliding) */}
            <div
              onClick={goPrev}
              className="group relative flex-[0.8] sm:flex-1 min-w-0 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden cursor-pointer bg-slate-900 shadow-md transition-all duration-300 ease-out hover:shadow-xl hover:opacity-100 opacity-80 select-none"
            >
              <AnimatedReelPoster
                currentReel={leftReel}
                incomingReel={incomingLeftReel}
                isAnimating={isAnimating}
                direction={direction}
                isCenter={false}
                priority={false}
              />
              {/* Name tooltip/scrim on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4 pointer-events-none z-10">
                <p className="text-[11px] sm:text-xs font-semibold text-white truncate font-sans">
                  {(isAnimating ? incomingLeftReel : leftReel).name}
                </p>
              </div>
            </div>

            {/* 2. CENTER VIDEO CARD (BIG, with smooth horizontal slide & text transition) */}
            <div className="relative flex-[2.2] sm:flex-[2.4] min-w-0 rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 shadow-2xl transition-all duration-300 ease-out ring-1 ring-slate-900/10 group select-none">
              <AnimatedReelPoster
                currentReel={centerReel}
                incomingReel={incomingCenterReel}
                isAnimating={isAnimating}
                direction={direction}
                isCenter={true}
                priority={true}
              />

              {/* Top Controls: 'Play Video' Pill Button */}
              <div className="absolute top-3.5 sm:top-5 left-3.5 sm:left-5 z-20 pointer-events-auto">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                  <span className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-white/25 transition-colors">
                    <Play className="h-2 w-2 sm:h-2.5 sm:w-2.5 fill-white text-white translate-x-0.5" />
                  </span>
                  <span>Play Video</span>
                </div>
              </div>

              {/* Bottom Scrim & Narrative Story Overlay with smooth fade/slide */}
              <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none bg-gradient-to-t from-black/95 via-black/60 to-transparent pt-16 sm:pt-20 pb-5 sm:pb-7 px-4 sm:px-7 lg:px-8 text-white">
                <div
                  className={`transition-all duration-300 ease-out ${
                    isAnimating ? "opacity-0 translate-y-1.5" : "opacity-100 translate-y-0"
                  }`}
                >
                  <p className="text-[11.5px] sm:text-[13.5px] lg:text-[14.5px] leading-relaxed text-white/95 font-sans font-normal line-clamp-3 sm:line-clamp-4">
                    {displayCenterReel.text}
                  </p>
                  <p className="mt-2 text-[10px] sm:text-xs font-semibold text-[#ff8c00] uppercase tracking-wider font-sans">
                    — {displayCenterReel.name} · {displayCenterReel.project}
                  </p>
                </div>
              </div>
            </div>

            {/* 3. RIGHT VIDEO CARD (Smooth synchronized sliding) */}
            <div
              onClick={goNext}
              className="group relative flex-[0.8] sm:flex-1 min-w-0 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden cursor-pointer bg-slate-900 shadow-md transition-all duration-300 ease-out hover:shadow-xl hover:opacity-100 opacity-80 select-none"
            >
              <AnimatedReelPoster
                currentReel={rightReel}
                incomingReel={incomingRightReel}
                isAnimating={isAnimating}
                direction={direction}
                isCenter={false}
                priority={false}
              />
              {/* Name tooltip/scrim on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4 pointer-events-none z-10">
                <p className="text-[11px] sm:text-xs font-semibold text-white truncate font-sans">
                  {(isAnimating ? incomingRightReel : rightReel).name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { ArrowUpRight, Phone, ChevronRight, CheckCircle2 } from "lucide-react";

const TOTAL_FRAMES = 31;
// Construction animation completes at 65% of the scroll runway.
// The remaining 35% (over 110vh of scroll) showcases the finished luxury landmark
// so the user can comfortably view and admire the completed home before moving to the next section.
const BUILD_COMPLETION = 0.65;

// 31 Progressive 3D architectural construction frames for Shastri Nagar, Adyar (img79.jpg)
// Builds from ground excavation -> RCC frame floor-by-floor -> facade louvers & glass -> glowing landmark
const DESKTOP_FRAMES = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) => `/construction-frames/frame_${String(i).padStart(2, "0")}.jpg?v=3d_5`
);

// Dedicated 9:16 vertical frames for mobile so the 5-story building is tall, centered, and never cropped
const MOBILE_FRAMES = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) => `/construction-frames/mobile_frame_${String(i).padStart(2, "0")}.jpg?v=3d_5`
);

export default function HeroScrollConstruction() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const textContentRef = useRef(null);
  const gradientOverlayRef = useRef(null);
  const scrollPromptRef = useRef(null);
  const completeBadgeRef = useRef(null);

  const imagesRef = useRef([]);
  const isMobileRef = useRef(false);
  const isRafLocked = useRef(false);
  const currentProgressRef = useRef(0);
  const lastRenderedIdxRef = useRef(-1);
  const [isCompleted, setIsCompleted] = useState(false);

  // Render the active frame onto the canvas with crisp full-bleed scaling and roof clearance
  const renderFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const images = imagesRef.current;
    if (!images || images.length === 0) return;

    // Find requested frame, or closest loaded frame before it
    let img = images[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let i = frameIdx - 1; i >= 0; i--) {
        if (images[i] && images[i].complete && images[i].naturalWidth > 0) {
          img = images[i];
          break;
        }
      }
    }
    if (!img || !img.complete || img.naturalWidth === 0) {
      img = images[0];
    }
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const W = canvas.width;
    const H = canvas.height;
    if (W === 0 || H === 0) return;

    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    // Full-bleed cover tailored to device aspect ratio
    const scale = Math.max(W / imgW, H / imgH);
    const dw = imgW * scale;
    const dh = imgH * scale;
    const ox = (W - dw) / 2.0;

    // Positioning vertically:
    // Ensure the top rooftop and pergola have ample starry night sky space below the top navbar (approx 80px)
    let oy;
    if (W / H >= 1.0) {
      // On desktop, anchor so that top sky is visible (never pushed offscreen)
      oy = Math.max((H - dh) * 0.35, 10);
    } else {
      // On mobile portrait, keep sky natural and top-aligned so roof sits comfortably below navbar
      oy = Math.max(H - dh, Math.min(0, (H - dh) * 0.15));
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Draw solid photorealistic frame (zero ghosting, zero graphic artifacts)
    ctx.drawImage(img, ox, oy, dw, dh);
    lastRenderedIdxRef.current = frameIdx;
  }, []);

  // Preload frames based on screen aspect ratio
  useEffect(() => {
    let isCancelled = false;

    const loadFrames = () => {
      const isMobile = window.innerWidth < 768 || window.innerHeight > window.innerWidth;
      isMobileRef.current = isMobile;
      const sources = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;

      const loadedImages = sources.map((src, idx) => {
        const img = new Image();
        img.onload = () => {
          if (!isCancelled) {
            // Render initial frame as soon as frame 0 is ready
            if (idx === 0 && lastRenderedIdxRef.current === -1) {
              renderFrame(0);
            } else {
              const buildProgress = Math.min(1, currentProgressRef.current / BUILD_COMPLETION);
              const currentIdx = Math.min(
                TOTAL_FRAMES - 1,
                Math.floor(buildProgress * TOTAL_FRAMES)
              );
              if (idx === currentIdx) {
                renderFrame(currentIdx);
              }
            }
          }
        };
        img.src = src;
        return img;
      });

      imagesRef.current = loadedImages;
    };

    loadFrames();

    return () => {
      isCancelled = true;
    };
  }, [renderFrame]);

  // Window Resize & Scroll Listener with RAF throttling
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const updateCanvasDimensions = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Check if orientation / device profile changed
      const isMobile = width < 768 || height > width;
      if (isMobile !== isMobileRef.current) {
        isMobileRef.current = isMobile;
        const sources = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
        imagesRef.current = sources.map((src) => {
          const img = new Image();
          img.onload = () => {
            const buildProgress = Math.min(1, currentProgressRef.current / BUILD_COMPLETION);
            const currentIdx = Math.min(
              TOTAL_FRAMES - 1,
              Math.floor(buildProgress * TOTAL_FRAMES)
            );
            renderFrame(currentIdx);
          };
          img.src = src;
          return img;
        });
      }

      const buildProgress = Math.min(1, currentProgressRef.current / BUILD_COMPLETION);
      const frameIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(buildProgress * TOTAL_FRAMES)
      );
      renderFrame(frameIdx);
    };

    const handleScroll = () => {
      if (isRafLocked.current) return;
      isRafLocked.current = true;

      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const scrollableDist = section.offsetHeight - window.innerHeight;
        const progress = Math.min(1, Math.max(0, -rect.top / Math.max(scrollableDist, 1)));

        currentProgressRef.current = progress;

        // Construction builds until BUILD_COMPLETION (65%), then the completed building stays pinned
        const buildProgress = Math.min(1, progress / BUILD_COMPLETION);
        const frameIdx = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(buildProgress * TOTAL_FRAMES)
        );
        renderFrame(frameIdx);

        const completed = progress >= BUILD_COMPLETION;
        setIsCompleted(completed);

        // 1. Hero text fade-out on scroll
        if (textContentRef.current) {
          const textOpacity = Math.max(0, 1 - progress / 0.16);
          const translateY = progress * 90;
          textContentRef.current.style.opacity = String(textOpacity);
          textContentRef.current.style.transform = `translateY(${translateY}px)`;
          textContentRef.current.style.pointerEvents = textOpacity < 0.05 ? "none" : "auto";
        }

        // 2. Dark gradient overlay fades out so the building is bright and vivid
        if (gradientOverlayRef.current) {
          const gradOpacity = Math.max(0, 1 - progress / 0.14);
          gradientOverlayRef.current.style.opacity = String(gradOpacity);
        }

        // 3. Scroll prompt fade-out
        if (scrollPromptRef.current) {
          const promptOpacity = Math.max(0, 1 - progress / 0.07);
          scrollPromptRef.current.style.opacity = String(promptOpacity);
        }

        // 4. Completed building showcase pill (shows when complete until next section)
        if (completeBadgeRef.current) {
          if (completed) {
            completeBadgeRef.current.style.opacity = "1";
            completeBadgeRef.current.style.transform = "translate(-50%, 0)";
          } else {
            completeBadgeRef.current.style.opacity = "0";
            completeBadgeRef.current.style.transform = "translate(-50%, 14px)";
          }
        }

        isRafLocked.current = false;
      });
    };

    window.addEventListener("resize", updateCanvasDimensions);
    window.addEventListener("scroll", handleScroll, { passive: true });

    updateCanvasDimensions();
    handleScroll();

    return () => {
      window.removeEventListener("resize", updateCanvasDimensions);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [renderFrame]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full bg-[#070e1c] select-text"
      style={{ height: "320vh" }}
    >
      {/* Sticky Fullscreen Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#070e1c]">
        {/* Canvas displaying the building evolving from scratch */}
        <canvas
          ref={canvasRef}
          style={{ imageRendering: "-webkit-optimize-contrast" }}
          className="absolute inset-0 z-0 h-full w-full pointer-events-none"
        />

        {/* Soft Initial Gradient Overlays (Fades out completely on scroll for pure, bright building view) */}
        <div
          ref={gradientOverlayRef}
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300"
        />

        {/* Initial Hero Text & CTAs (Fades out smoothly as the user scrolls) */}
        <div
          ref={textContentRef}
          style={{ opacity: 1 }}
          className="pointer-events-auto absolute inset-0 z-10 flex flex-col justify-center pt-28 sm:pt-36 md:pt-40 lg:pt-48 2xl:pt-56 px-4 sm:px-6 lg:px-8 transition-transform duration-100 ease-out"
        >
          <div className="mx-auto w-full max-w-[92rem]">
            {/* Main Headline */}
            <h1 className="text-[24px] sm:text-[32px] lg:text-[36px] 2xl:text-[42px] font-semibold tracking-tight text-white leading-[1.2] max-w-xl 2xl:max-w-2xl font-sans drop-shadow-lg">
              Crafting architectural landmarks{" "}
              <span className="gradient-text-orange font-bold">
                from the ground up.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-4 max-w-lg 2xl:max-w-xl text-xs sm:text-sm 2xl:text-base leading-relaxed text-white/90 font-normal font-sans drop-shadow-sm">
              Watch Shastri Nagar Manor, Adyar, Chennai evolve from bare ground excavation to completed contemporary luxury landmark.{" "}
              <strong className="text-white font-semibold">Ajay Homes &amp; Estates</strong>{" "}
              delivers turnkey architectural excellence.
            </p>

            {/* Action Buttons */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex h-10 sm:h-11 items-center gap-2.5 rounded-full bg-[#ff8c00] hover:bg-[#e07b00] active:scale-[0.98] pl-5 pr-2 text-xs sm:text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Explore Realtime Projects</span>
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#003a70] transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4 text-[#003a70]" />
                </span>
              </a>

              <a
                href="tel:+919840012345"
                className="inline-flex h-10 sm:h-11 items-center gap-2.5 rounded-full border border-white/30 bg-black/40 px-5 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-[#ff8c00] hover:bg-white/10"
              >
                <Phone className="h-3.5 w-3.5 text-[#ff8c00]" />
                <span>Call us directly</span>
              </a>
            </div>

            {/* Trust Metrics Strip */}
            <div className="mt-6 sm:mt-8 w-fit max-w-full flex flex-wrap items-center gap-6 sm:gap-8 border-t border-white/15 pt-4 text-white/80">
              <div>
                <div className="text-base sm:text-xl font-extrabold text-white font-sans">50+</div>
                <div className="text-[9px] sm:text-[10px] text-white/70 uppercase tracking-wider font-sans">Years Experience</div>
              </div>
              <div className="h-6 w-px bg-white/15 hidden sm:block" />
              <div>
                <div className="text-base sm:text-xl font-extrabold text-white font-sans">150+</div>
                <div className="text-[9px] sm:text-[10px] text-white/70 uppercase tracking-wider font-sans">Completed Landmarks</div>
              </div>
              <div className="h-6 w-px bg-white/15 hidden sm:block" />
              <div>
                <div className="text-base sm:text-xl font-extrabold text-[#ff8c00] font-sans">100%</div>
                <div className="text-[9px] sm:text-[10px] text-white/70 uppercase tracking-wider font-sans">IS-Code Certified</div>
              </div>
            </div>
          </div>
        </div>
    
      </div>
    </section>
  );
}

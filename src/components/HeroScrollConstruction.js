"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowUpRight, Phone, Sparkles, Building, Layers } from "lucide-react";

const DESKTOP_FRAMES_COUNT = 127;
const MOBILE_FRAMES_COUNT = 146;

export default function HeroScrollConstruction() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const textContentRef = useRef(null);
  const gradientOverlayRef = useRef(null);
  const stageBadgeRef = useRef(null);
  const scrollPromptRef = useRef(null);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [currentStageText, setCurrentStageText] = useState("Phase 01 • Site Excavation & Ground Prep");
  const [scrollPercent, setScrollPercent] = useState(0);

  const imagesRef = useRef([]);
  const isRafLocked = useRef(false);
  const totalFramesRef = useRef(DESKTOP_FRAMES_COUNT);
  const currentProgressRef = useRef(0);

  // Helper to determine active frame count based on viewport width
  const getIsMobile = useCallback(() => {
    return typeof window !== "undefined" && window.innerWidth <= 768;
  }, []);

  // Render a specific frame index onto the canvas (with HD crisp scaling)
  const renderFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Find requested frame, or closest loaded frame before it
    let img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let i = frameIndex - 1; i >= 0; i--) {
        if (imagesRef.current[i] && imagesRef.current[i].complete && imagesRef.current[i].naturalWidth > 0) {
          img = imagesRef.current[i];
          break;
        }
      }
    }
    if (!img || !img.complete || img.naturalWidth === 0) {
      img = imagesRef.current[0];
    }
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const physicalW = canvas.width;
    const physicalH = canvas.height;
    if (physicalW === 0 || physicalH === 0) return;

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const screenRatio = physicalW / physicalH;

    let drawW, drawH;
    if (screenRatio > imgRatio) {
      drawW = physicalW;
      drawH = physicalW / imgRatio;
    } else {
      drawH = physicalH;
      drawW = physicalH * imgRatio;
    }

    const offsetX = (physicalW - drawW) / 2;
    const offsetY = (physicalH - drawH) / 2;

    // Direct 1:1 physical pixel map for razor-sharp HD rendering
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.fillStyle = "#070e1c";
    ctx.fillRect(0, 0, physicalW, physicalH);
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }, []);

  // Preload frames
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = getIsMobile();
    const totalFrames = isMobile ? MOBILE_FRAMES_COUNT : DESKTOP_FRAMES_COUNT;
    const folder = isMobile ? "/frames-mobile" : "/frames";
    totalFramesRef.current = totalFrames;

    let loadedCount = 0;
    const imageElements = [];

    // Preload first frame immediately
    const firstImg = new Image();
    firstImg.src = `${folder}/frame_0001.jpg`;
    firstImg.onload = () => {
      loadedCount++;
      setLoadingProgress(Math.floor((loadedCount / totalFrames) * 100));
      renderFrame(0);
    };
    imageElements[0] = firstImg;

    // Load remaining frames asynchronously
    for (let i = 2; i <= totalFrames; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(4, "0");
      img.src = `${folder}/frame_${paddedIndex}.jpg`;

      const onFrameLoad = () => {
        loadedCount++;
        const pct = Math.floor((loadedCount / totalFrames) * 100);
        setLoadingProgress(pct);

        // Re-render active scroll frame whenever a new frame finishes loading
        const activeIdx = Math.min(
          totalFrames - 1,
          Math.floor(currentProgressRef.current * totalFrames)
        );
        renderFrame(activeIdx);

        if (loadedCount === totalFrames) {
          setIsFullyLoaded(true);
        }
      };

      img.onload = onFrameLoad;
      img.onerror = onFrameLoad;

      imageElements[i - 1] = img;
    }

    imagesRef.current = imageElements;

    const handleResizeCheck = () => {
      const currentMobile = getIsMobile();
      if (currentMobile !== isMobile) {
        window.location.reload();
      }
    };

    window.addEventListener("resize", handleResizeCheck);
    return () => window.removeEventListener("resize", handleResizeCheck);
  }, [getIsMobile, renderFrame]);

  // Scroll and Resize Handler using Sticky Container + Section Rect calculation
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

      const framesCount = totalFramesRef.current;
      const frameIdx = Math.min(
        framesCount - 1,
        Math.floor(currentProgressRef.current * framesCount)
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
        setScrollPercent(Math.round(progress * 100));

        const framesCount = totalFramesRef.current;
        const frameIdx = Math.min(framesCount - 1, Math.floor(progress * framesCount));
        renderFrame(frameIdx);

        // Update construction phase text
        if (progress < 0.15) {
          setCurrentStageText("Phase 01 • Site Excavation & Ground Prep");
        } else if (progress < 0.45) {
          setCurrentStageText("Phase 02 • Reinforced Concrete Columns");
        } else if (progress < 0.75) {
          setCurrentStageText("Phase 03 • Multi-Tier Structural Slabs");
        } else if (progress < 0.9) {
          setCurrentStageText("Phase 04 • Architectural Envelope & Glazing");
        } else {
          setCurrentStageText("Phase 05 • Completed Luxury Landmark");
        }

        // 1. Hero text fade-out
        if (textContentRef.current) {
          const textOpacity = Math.max(0, 1 - progress / 0.18);
          const translateY = progress * 140;
          textContentRef.current.style.opacity = String(textOpacity);
          textContentRef.current.style.transform = `translateY(${translateY}px)`;
        }

        // 2. Scroll prompt fade-out
        if (scrollPromptRef.current) {
          const promptOpacity = Math.max(0, 1 - progress / 0.06);
          scrollPromptRef.current.style.opacity = String(promptOpacity);
        }

        // 3. Stage badge visibility (shows during mid scroll)
        if (stageBadgeRef.current) {
          if (progress > 0.08 && progress < 0.95) {
            stageBadgeRef.current.style.opacity = "1";
            stageBadgeRef.current.style.transform = "translateY(0)";
          } else {
            stageBadgeRef.current.style.opacity = "0";
            stageBadgeRef.current.style.transform = "translateY(12px)";
          }
        }

        // 4. Dark gradient overlay opacity
        if (gradientOverlayRef.current) {
          const gradOpacity = Math.max(0.3, 1 - progress / 0.25);
          gradientOverlayRef.current.style.opacity = String(gradOpacity);
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
      className="relative w-full bg-[#070e1c]"
      style={{ height: "500vh" }}
    >
      {/* Sticky Fullscreen Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#070e1c]">
        {/* Canvas for Construction Scrubbing Animation */}
        <canvas
          ref={canvasRef}
          style={{ imageRendering: "-webkit-optimize-contrast" }}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
        />

        {/* Ambient Light Soft Gradient Overlays for Clear Building Visibility */}
        <div
          ref={gradientOverlayRef}
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent transition-opacity duration-500"
        />
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />

        {/* Main Hero Content (Compact size, fades out rapidly on scroll) */}
        <div
          ref={textContentRef}
          style={{ opacity: 1 }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-20 transition-transform duration-100 ease-out"
        >
          <div className="mx-auto w-full max-w-6xl">

            {/* Headline (Compact & Sleek) */}
            <h1 className="text-3xl sm:text-4xl md:text-[44px] font-bold tracking-tight text-white leading-tight max-w-xl font-sans drop-shadow-md">
              Building tomorrow&#39;s
              <br />
              infrastructure,{" "}
              <span className="gradient-text-orange font-bold">
                today.
              </span>
            </h1>

            {/* Subtitle (Compact) */}
            <p className="mt-4 max-w-lg text-xs sm:text-sm md:text-base leading-relaxed text-white/90 font-normal font-sans drop-shadow-sm">
              From multi-acre residential layouts to bespoke architectural residences,{" "}
              <strong className="text-white font-semibold">Ajay Homes &amp; Estates</strong>{" "}
              delivers engineering-grade buildings across Chennai &amp; South India.
            </p>

            {/* Action Buttons (Compact & Sleek) */}
            <div className="pointer-events-auto mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex h-11 sm:h-12 items-center gap-2.5 rounded-full bg-white pl-5 pr-2 text-xs sm:text-sm font-bold text-[#070e1c] shadow-lg shadow-black/40 transition-all duration-300 hover:bg-neutral-100 hover:scale-[1.02]"
              >
                <span>Explore Realtime Projects</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#003a70] text-white transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4 text-[#ff8c00]" />
                </span>
              </a>

              <a
                href="tel:+919840012345"
                className="inline-flex h-11 sm:h-12 items-center gap-2.5 rounded-full border border-white/30 bg-black/40 px-5 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-[#ff8c00] hover:bg-white/10"
              >
                <Phone className="h-3.5 w-3.5 text-[#ff8c00]" />
                <span>Call us directly</span>
              </a>
            </div>

            {/* Quick Metrics Strip */}
            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-white/15 pt-4 text-white/80">
              <div>
                <div className="text-lg sm:text-xl font-bold text-white font-sans">25+</div>
                <div className="text-[10px] text-white/60 uppercase tracking-wider font-sans">Years Experience</div>
              </div>
              <div className="h-6 w-px bg-white/15 hidden sm:block" />
              <div>
                <div className="text-lg sm:text-xl font-bold text-white font-sans">150+</div>
                <div className="text-[10px] text-white/60 uppercase tracking-wider font-sans">Realized Projects</div>
              </div>
              <div className="h-6 w-px bg-white/15 hidden sm:block" />
              <div>
                <div className="text-lg sm:text-xl font-bold text-[#ff8c00] font-sans">100%</div>
                <div className="text-[10px] text-white/60 uppercase tracking-wider font-sans">IS-Code Quality</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

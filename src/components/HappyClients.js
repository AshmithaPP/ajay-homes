"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HeartHandshake, Star } from "lucide-react";

// Diamond lattice positions in half-diamond units (x + y is always even so the tiles interlock)
const CLUSTER = [
  { x: 2, y: 0 },
  { x: 4, y: 0 },
  { x: 1, y: 1 },
  { x: 3, y: 1 },
  { x: 5, y: 1 },
  { x: 2, y: 2 },
  { x: 4, y: 2 },
  { x: 3, y: 3 },
];

const leftPhotos = [
  { src: "/assets/img/img-001.jpeg", caption: "Scarlet Diamond · Anna Nagar" },
  { src: "/assets/img/img-085.jpeg", caption: "Handover day · Adyar" },
  { src: "/assets/img/img-006.jpeg", caption: "Emerald Heights · Anna Nagar" },
  { src: "/assets/img/natraj-residence/img74.jpg", caption: "Natraj Residence · Velachery" },
  { src: "/assets/img/img-014.jpeg", caption: "Pearl Villa · Besant Nagar" },
  { src: "/assets/img/suresh-residence-view/img30.jpg", caption: "Suresh Manor · Boat Club" },
  { src: "/assets/img/img-034.jpeg", caption: "Family living room · ECR" },
  { src: "/assets/img/img-011.jpeg", caption: "Kasturba Villa · Adyar" },
];

const rightPhotos = [
  { src: "/assets/img/besantnagar-residence-view/img19.jpg", caption: "Nanavati Residence · Besant Nagar" },
  { src: "/assets/img/raman-residence/img106.jpg", caption: "Raman Villa · OMR" },
  { src: "/assets/img/img-049.jpeg", caption: "Home theatre handover · Anna Nagar" },
  { src: "/assets/img/img-012.jpeg", caption: "Cedar Residence · Besant Nagar" },
  { src: "/assets/img/ankan-resideance-view/img41.jpg", caption: "Ankan Villa · ECR" },
  { src: "/assets/img/besantnagar-residence-view/img82.jpg", caption: "Grand Atrium · Velachery" },
  { src: "/assets/img/img-015.jpeg", caption: "Canal View · Adyar" },
  { src: "/assets/img/img-009.jpeg", caption: "Terrace Garden · Anna Nagar" },
];

function DiamondCluster({ photos, isVisible, mirror, delayOffset }) {
  return (
    <div className="relative w-full max-w-[420px] lg:max-w-[520px] 2xl:max-w-[600px] aspect-[3/2.5]">
      {CLUSTER.map((pos, i) => {
        const photo = photos[i];
        const x = mirror ? 6 - pos.x : pos.x;
        const delay = delayOffset + i * 90;
        return (
          <div
            key={photo.src}
            className="group absolute"
            style={{
              left: `${((x - 1) / 6) * 100}%`,
              top: `${(pos.y / 5) * 100}%`,
              width: "33.333%",
              height: "40%",
            }}
          >
            <div
              style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
              className={`absolute inset-[15.5%] rotate-45 overflow-hidden rounded-md border-2 border-white bg-[#2a68a2] shadow-xl shadow-black/40 transition-all duration-700 ease-out group-hover:z-10 group-hover:scale-110 group-hover:shadow-2xl ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
            >
              {/* Odd tiles blink continuously, staggered so the mosaic twinkles */}
              <div
                className={`absolute inset-0 -rotate-45 scale-[1.42] ${i % 2 === 1 ? "diamond-blink" : ""}`}
                style={i % 2 === 1 ? { animationDelay: `${(i * 0.35 + delayOffset / 1000).toFixed(2)}s` } : undefined}
              >
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  sizes="(max-width: 1024px) 30vw, 180px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
            {/* Caption on hover */}
            <span className="pointer-events-none absolute left-1/2 top-full z-20 -translate-x-1/2 -translate-y-6 whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-[#003a70] opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100">
              {photo.caption}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function HappyClients() {
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
      id="happy-clients"
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#3a78b0] via-[#2a68a2] to-[#1b5892] px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16 font-sans text-white"
    >
      <div className="mx-auto max-w-[1680px]">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2.5 text-white">
            <HeartHandshake className="h-6 w-6 sm:h-7 sm:w-7 text-[#ff8c00]" strokeWidth={1.75} />
            <span className="text-lg sm:text-xl 2xl:text-2xl font-semibold">Happy Clients</span>
            <HeartHandshake className="h-6 w-6 sm:h-7 sm:w-7 -scale-x-100 text-[#ff8c00]" strokeWidth={1.75} />
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-[32px] 2xl:text-[38px] font-bold tracking-tight text-white">
            Join our family of <span className="text-[#ff8c00]">happy homeowners.</span>
          </h2>
          <div className="mx-auto mt-3 h-px w-full max-w-md border-b-2 border-dotted border-white/35" />
        </div>

        {/* Diamond mosaic: left cluster · stat · right cluster */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-center lg:gap-4 2xl:gap-8">
          <div className="w-full lg:w-[40%] flex justify-center">
            <DiamondCluster photos={leftPhotos} isVisible={isVisible} delayOffset={0} />
          </div>

          <div
            className={`shrink-0 text-center transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-4xl sm:text-5xl 2xl:text-6xl font-extrabold text-[#ff8c00] leading-none">150+</p>
            <p className="mt-2 text-xs sm:text-sm 2xl:text-base font-bold uppercase tracking-wider text-white/90 leading-snug">
              Families welcomed
              <br />
              home since 1996
            </p>
            <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              4.9 Google rating
            </div>
          </div>

          <div className="w-full lg:w-[40%] flex justify-center">
            <DiamondCluster photos={rightPhotos} isVisible={isVisible} mirror delayOffset={300} />
          </div>
        </div>
      </div>
    </section>
  );
}

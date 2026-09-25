"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { House, Handshake, DraftingCompass, Sprout, Building2 } from "lucide-react";

// Ajay Homes & Estates milestones (founded 1966, per the "Since 1966" brand mark)
const milestones = [
  { icon: House, year: "1966", text: "Ajay Homes Founded" },
  { icon: Handshake, year: "1980s", text: "Building Trust & Expanding Expertise" },
  { icon: DraftingCompass, year: "2000s", text: "Evolving with Modern Architecture" },
  { icon: Sprout, year: "2010s", text: "Growing with New-Generation Design" },
  { icon: Building2, year: "2020s", text: "60 Years of Experience, Built for Tomorrow" },
];

const HEADING = "A Legacy Built Over 60 Years";

// Soft fade so the sketches melt into the background instead of ending in hard edges
const fadeLeft = "radial-gradient(ellipse 70% 75% at 35% 40%, #000 45%, transparent 100%)";
const fadeRight = "radial-gradient(ellipse 70% 75% at 65% 45%, #000 45%, transparent 100%)";

export default function UnsurpassedLegacy() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Type the heading out once the section is on screen (instant for reduced-motion users)
  useEffect(() => {
    if (!isVisible) return;
    const step = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? HEADING.length : 1;
    let i = 0;
    const id = setInterval(() => {
      i += step;
      setTyped(i);
      if (i >= HEADING.length) clearInterval(id);
    }, 70);
    return () => clearInterval(id);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="unsurpassed-legacy"
      className="relative mt-6 sm:mt-8 2xl:mt-10 w-full overflow-hidden bg-white pt-16 sm:pt-20 2xl:pt-24 pb-16 sm:pb-20 2xl:pb-24 px-4 sm:px-6 lg:px-8 font-sans text-slate-900"
    >
      {/* Very light brand-navy wash behind the whole section */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-primary/[0.05] to-primary/[0.02]" aria-hidden />

      {/* Pencil-sketch illustrations of Ajay projects (Scarlet Diamond left, contemporary villa right), in brand navy */}
      <div
        className="pointer-events-none absolute left-0 top-0 hidden lg:block lg:w-[300px] xl:w-[380px] 2xl:w-[440px] aspect-[648/720] opacity-30"
        style={{ WebkitMaskImage: fadeLeft, maskImage: fadeLeft }}
        aria-hidden
      >
        <Image src="/assets/img/legacy-sketch-left.png" alt="" fill sizes="440px" className="object-contain object-left-top" />
      </div>
      <div
        className="pointer-events-none absolute right-0 top-10 hidden lg:block lg:w-[310px] xl:w-[400px] 2xl:w-[460px] aspect-square opacity-30"
        style={{ WebkitMaskImage: fadeRight, maskImage: fadeRight }}
        aria-hidden
      >
        <Image src="/assets/img/legacy-sketch-right.png" alt="" fill sizes="460px" className="object-contain object-right-top" />
      </div>

      <div
        className={`relative mx-auto w-full max-w-7xl 2xl:max-w-[1440px] transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Heading block */}
        <div className="mx-auto max-w-xl text-center">
          <span className="mx-auto block h-0.5 w-10 rounded-full bg-secondary" />
          <h2
            aria-label={HEADING}
            className="mt-5 text-2xl sm:text-3xl lg:text-[34px] 2xl:text-[40px] font-bold leading-tight tracking-tight text-primary"
          >
            {/* Full text is always laid out (untyped part transparent), so line breaks never shift while typing */}
            <span aria-hidden>
              {HEADING.slice(0, typed)}
              {/* Zero-width anchor: the caret never takes up space, so it can't wrap onto a new line */}
              <span className="relative">
                <span className="typing-caret absolute left-1 top-[0.12em] h-[1em] w-[3px] rounded-full bg-secondary" />
              </span>
              <span className="text-transparent">{HEADING.slice(typed)}</span>
            </span>
          </h2>
          <p className="mt-2 text-5xl sm:text-6xl lg:text-[64px] 2xl:text-[76px] font-light leading-none tracking-tight text-primary">
            1966
          </p>
          <p className="mx-auto mt-5 max-w-md text-[13px] sm:text-sm 2xl:text-base leading-relaxed text-slate-600">
            Founded in 1966, Ajay Homes &amp; Estates has grown through decades of experience, evolving with
            changing lifestyles while staying committed to quality, trust and thoughtful design.
          </p>
        </div>

        {/* Timeline: vertical on phones, horizontal row from tablets up */}
        <ol className="relative mx-auto mt-10 sm:mt-12 lg:mt-14 grid max-w-5xl 2xl:max-w-6xl grid-cols-1 gap-7 sm:grid-cols-5 sm:gap-3 lg:gap-6">
          {/* connector line through the icon centres (tablet/desktop) */}
          <span
            className="pointer-events-none absolute left-[10%] right-[10%] top-7 lg:top-8 hidden sm:block h-px bg-secondary/30"
            aria-hidden
          />
          {/* connector line on phones */}
          <span
            className="pointer-events-none absolute left-7 top-7 bottom-7 w-px bg-secondary/30 sm:hidden"
            aria-hidden
          />

          {milestones.map(({ icon: Icon, year, text }, i) => (
            <li
              key={year}
              style={{ transitionDelay: `${150 + i * 90}ms` }}
              className={`relative flex items-center gap-4 text-left sm:flex-col sm:gap-0 sm:text-center transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="relative z-10 flex h-14 w-14 lg:h-16 lg:w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-white">
                <Icon className="h-6 w-6 lg:h-7 lg:w-7" strokeWidth={1.4} />
              </span>
              <span className="hidden sm:block mt-3 h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden />
              <div className="sm:mt-2">
                <p className="text-xl lg:text-2xl 2xl:text-[26px] font-bold leading-tight text-primary">{year}</p>
                <p className="mt-1 sm:mx-auto sm:max-w-[150px] lg:max-w-[170px] text-xs lg:text-[13px] 2xl:text-sm leading-snug text-slate-600">
                  {text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowLeft, ArrowRight, ShieldCheck, Award, MapPin, CheckCircle2 } from "lucide-react";

export default function RealtimeProjects() {
  const [activeLocation, setActiveLocation] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);

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

  const locations = [
    { id: "all", label: "All Locations" },
    { id: "anna-nagar", label: "Anna Nagar" },
    { id: "besant-nagar", label: "Besant Nagar" },
    { id: "adyar", label: "Adyar / Boat Club" },
    { id: "ecr", label: "ECR Coastal" },
    { id: "omr", label: "OMR Corridor" },
    { id: "velachery", label: "Velachery" },
  ];

  const projects = [
    {
      id: "scarlet-diamond",
      title: "Scarlet Diamond Super Speciality Residence",
      location: "Anna Nagar East, Chennai",
      locationTag: "anna-nagar",
      image: "/assets/img/img-001.jpeg",
      rating: "4.9",
    },
    {
      id: "besant-oceanfront",
      title: "Nanavati Coastal Super Luxury Residence",
      location: "Beach Road, Besant Nagar",
      locationTag: "besant-nagar",
      image: "/assets/img/besantnagar-residence-view/img19.jpg",
      rating: "4.9",
    },
    {
      id: "suresh-boat-club",
      title: "Suresh Boat Club Super Speciality Manor",
      location: "Boat Club Road, Adyar",
      locationTag: "adyar",
      image: "/assets/img/suresh-residence-view/img17.jpg",
      rating: "4.8",
    },
    {
      id: "ankan-coastal",
      title: "Ankan Oceanfront Super Speciality Villa",
      location: "Akkarai Golden Beach, ECR",
      locationTag: "ecr",
      image: "/assets/img/ankan-resideance-view/img13.jpg",
      rating: "4.9",
    },
    {
      id: "raman-prestige",
      title: "Raman Prestige Super Automated Villa",
      location: "IT Expressway Corridor, OMR",
      locationTag: "omr",
      image: "/assets/img/raman-residence/img106.jpg",
      rating: "4.8",
    },
    {
      id: "natraj-royal",
      title: "Natraj Royal Super Speciality Residence",
      location: "Grand Southern Trunk, Velachery",
      locationTag: "velachery",
      image: "/assets/img/natraj-residence/img102.jpg",
      rating: "4.9",
    },
    {
      id: "shastri-nagar",
      title: "Shasthri Penthouse Super Luxury Suite",
      location: "1st Cross Street, Adyar",
      locationTag: "adyar",
      image: "/assets/img/img-048.jpeg",
      rating: "4.8",
    },
    {
      id: "ecr-coastal",
      title: "ECR Beachfront Super Luxury Enclave",
      location: "Coastal Highway, ECR",
      locationTag: "ecr",
      image: "/assets/img/img-062.jpeg",
      rating: "4.9",
    },
  ];

  const filteredProjects =
    activeLocation === "all"
      ? projects
      : projects.filter((p) => p.locationTag === activeLocation);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`relative w-full bg-white pt-6 sm:pt-8 pb-8 sm:pb-10 text-slate-900 overflow-hidden border-t border-slate-100 transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="mx-auto w-full max-w-[1720px] px-4 sm:px-6 lg:px-8">
        
        {/* Top Controls: Location Tabs on Left & Carousel Arrows on Right */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-slate-200 pb-2.5 mb-5 sm:mb-6">
          {/* Location Filter Tabs */}
          <div
            className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {locations.map((loc) => {
              const isActive = activeLocation === loc.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => setActiveLocation(loc.id)}
                  className={`whitespace-nowrap pb-2 text-sm sm:text-[15.5px] transition-all font-sans cursor-pointer ${
                    isActive
                      ? "border-b-[3px] border-[#003a70] text-[#003a70] font-bold"
                      : "text-slate-600 font-medium hover:text-[#003a70]"
                  }`}
                >
                  {loc.label}
                </button>
              );
            })}
          </div>

          {/* Cyan/Teal Carousel Arrows */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0 pb-1">
            <button
              onClick={scrollLeft}
              className="flex items-center justify-center text-[#008ba3] hover:text-[#005f70] transition-colors cursor-pointer p-1.5 rounded-full hover:bg-slate-100"
              aria-label="Scroll left"
            >
              <ArrowLeft className="h-6 w-6 stroke-[2.5]" />
            </button>
            <button
              onClick={scrollRight}
              className="flex items-center justify-center text-[#008ba3] hover:text-[#005f70] transition-colors cursor-pointer p-1.5 rounded-full hover:bg-slate-100"
              aria-label="Scroll right"
            >
              <ArrowRight className="h-6 w-6 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track (Cards fit fully without cut-off, NO scrollbar) */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex items-stretch gap-6 overflow-x-auto scroll-smooth pb-4 pt-1 no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {/* The Left Blue Banner Card enclosing Text, Rich Metrics, and Card 1 */}
            <div
              className={`shrink-0 w-[580px] sm:w-[630px] lg:w-[660px] xl:w-[680px] rounded-2xl sm:rounded-3xl bg-[#003a70] p-6 sm:p-7 text-white flex flex-col sm:flex-row items-stretch justify-between gap-5 sm:gap-6 shadow-xl transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
              }`}
            >
              {/* Left Column: Heading, Rich Content / Trust Highlights, Action Button */}
              <div className="flex-1 text-left flex flex-col justify-between py-1">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans leading-tight">
                    Our Landmark Network
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-[13px] text-white/90 leading-relaxed font-sans max-w-[320px]">
                    Ajay Homes &amp; Estates is South India&#39;s premier builder with 150+ architectural landmarks delivered across Chennai.
                  </p>

                  {/* Rich Content & Trust Highlights filling empty space */}
                  <div className="mt-4 pt-4 border-t border-white/15 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs sm:text-[12.5px] text-white/90 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#ff8c00] shrink-0" />
                      <span>150+ Luxury Residences &amp; Enclaves</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-[12.5px] text-white/90 font-medium">
                      <ShieldCheck className="w-4 h-4 text-[#ff8c00] shrink-0" />
                      <span>100% CMDA &amp; RERA Approved Titles</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-[12.5px] text-white/90 font-medium">
                      <MapPin className="w-4 h-4 text-[#ff8c00] shrink-0" />
                      <span>Prime Anna Nagar, Besant Nagar &amp; ECR</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <Link
                    href="#contact"
                    className="inline-flex items-center justify-between rounded-xl bg-[#008ba3] hover:bg-[#00768c] pl-4 sm:pl-5 pr-3 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition-all shadow-md group hover:scale-[1.02]"
                  >
                    <span>Find Landmark Near You</span>
                    <span className="ml-3 pl-3 border-l border-white/25 flex items-center">
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Card 1 embedded inside the blue banner */}
              {filteredProjects[0] && (
                <div className="w-[230px] sm:w-[255px] lg:w-[270px] shrink-0 rounded-2xl bg-white shadow-xl border border-slate-100 text-slate-900 flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  {/* Top flush image */}
                  <div className="relative h-[180px] sm:h-[200px] lg:h-[215px] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={filteredProjects[0].image}
                      alt={filteredProjects[0].title}
                      fill
                      sizes="320px"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Card Content: Title, Location, and Google Rating */}
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <h4 className="text-xs sm:text-[13.5px] font-bold text-slate-800 leading-snug line-clamp-2 font-sans">
                        {filteredProjects[0].title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1 line-clamp-1 font-sans">
                        {filteredProjects[0].location}
                      </p>
                    </div>

                    {/* Google Rating Badge */}
                    <div className="mt-3.5 flex items-center gap-1 text-[12px] pt-1.5 border-t border-slate-100">
                      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      <div className="flex text-amber-400 text-[11px] tracking-tighter ml-0.5">
                        {"★★★★★"}
                      </div>
                      <span className="font-bold text-slate-700 ml-1">{filteredProjects[0].rating}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Remaining Cards Row (Card 2, 3, 4, 5, 6...) sized to fit cleanly without cut-off */}
            {filteredProjects.slice(1).map((proj, idx) => (
              <div
                key={proj.id}
                style={{
                  transitionDelay: `${(idx + 1) * 80}ms`,
                }}
                className={`w-[250px] sm:w-[280px] lg:w-[305px] xl:w-[315px] shrink-0 rounded-2xl bg-white shadow-md border border-slate-200/90 text-slate-900 flex flex-col overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                {/* Top flush image */}
                <div className="relative h-[180px] sm:h-[200px] lg:h-[215px] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="320px"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Card Content: Title, Location, and Google Rating */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="text-xs sm:text-[13.5px] font-bold text-slate-800 leading-snug line-clamp-2 font-sans">
                      {proj.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1 line-clamp-1 font-sans">
                      {proj.location}
                    </p>
                  </div>

                  {/* Google Rating Badge */}
                  <div className="mt-3.5 flex items-center gap-1 text-[12px] pt-1.5 border-t border-slate-100">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <div className="flex text-amber-400 text-[11px] tracking-tighter ml-0.5">
                      {"★★★★★"}
                    </div>
                    <span className="font-bold text-slate-700 ml-1">{proj.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

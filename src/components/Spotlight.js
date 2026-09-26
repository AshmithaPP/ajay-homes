"use client";

import { useState } from "react";
import Image from "next/image";
import { X, MapPin } from "lucide-react";

// 16 Signature Spotlight Silhouettes / Offerings inspired by Nike's iconic showcase
const spotlightItems = [
  {
    id: "scarlet-diamond",
    name: "Scarlet Diamond",
    category: "villas",
    badge: "Flagship",
    subtext: "G+3 Luxury Villa",
    location: "ECR Beach Road, Chennai",
    area: "6,200 sq.ft",
    timeline: "14 Months",
    image: "/spotlight/spotlight1.png",
    description:
      "Our premier beachfront residence combining Italian marble, cantilevered terraces, and IS-456 earthquake-resistant structural engineering.",
  },
  {
    id: "besant-oceanfront",
    name: "Besant Beach Villa",
    category: "villas",
    badge: "Coastal",
    subtext: "Contemporary Coastal",
    location: "Besant Nagar, Chennai",
    area: "4,850 sq.ft",
    timeline: "12 Months",
    image: "/spotlight/spotlight-2.png",
    description:
      "Turnkey coastal luxury designed with marine-grade anti-corrosive concrete, expansive glass facades, and private pool deck.",
  },
  {
    id: "emerald-heights",
    name: "Emerald Heights",
    category: "villas",
    badge: "Signature",
    subtext: "Garden Residence",
    location: "2nd Avenue, Anna Nagar",
    area: "5,200 sq.ft",
    timeline: "12 Months",
    image: "/spotlight/spotlight-3.png",
    description:
      "Terracotta-clad villa with planter balconies and a landscaped roof deck.",
  },
  {
    id: "ankan-modern",
    name: "Ankan Modern",
    category: "villas",
    badge: "Minimalist",
    subtext: "Glass & Steel Villa",
    location: "Anna Nagar, Chennai",
    area: "5,400 sq.ft",
    timeline: "11 Months",
    image: "/spotlight/spotlight4.jpg",
    description:
      "Sculptural residential masterpiece with double-height living areas, internal courtyard gardens, and German-engineered sliding glass.",
  },
  {
    id: "suresh-landmark",
    name: "Suresh Landmark",
    category: "villas",
    badge: "Signature",
    subtext: "Multi-Tier Estate",
    location: "Adyar, Chennai",
    area: "7,100 sq.ft",
    timeline: "16 Months",
    image: "/spotlight/spotlight5.jpg",
    description:
      "Multi-generational luxury estate boasting private lift access, home theatre, landscaped rooftop terrace, and 4-car basement parking.",
  },
  {
    id: "raman-prestige",
    name: "Raman Prestige",
    category: "turnkey",
    badge: "Turnkey",
    subtext: "Independent Living",
    location: "Nungambakkam, Chennai",
    area: "3,950 sq.ft",
    timeline: "10 Months",
    image: "/spotlight/spotlight6.jpg",
    description:
      "A seamless turnkey construction delivered with 100% IS-code certified steel and cement, 240+ quality inspection checklist checkpoints.",
  },
  {
    id: "shastri-residency",
    name: "Shastri Residency",
    category: "villas",
    badge: "Prime Adyar",
    subtext: "Heritage Modernity",
    location: "Shastri Nagar, Chennai",
    area: "4,600 sq.ft",
    timeline: "12 Months",
    image: "/spotlight/spotlight7.jpg",
    description:
      "Classic contemporary residence blending traditional courtyard ventilation with ultra-modern smart home energy infrastructure.",
  },
  {
    id: "green-eco-villa",
    name: "Green Eco Villa",
    category: "villas",
    badge: "Solar Smart",
    subtext: "Net-Zero Sustainable",
    location: "OMR Tech Corridor",
    area: "4,200 sq.ft",
    timeline: "11 Months",
    image: "/spotlight/spotlight8.jpg",
    description:
      "IGBC-certified sustainable architecture featuring integrated solar rooftop power, rainwater harvesting, and thermal-insulated clay brick masonry.",
  },
  {
    id: "duplex-penthouse",
    name: "Duplex Penthouse",
    category: "villas",
    badge: "Skyline",
    subtext: "Terrace Panoramic",
    location: "Alwarpet, Chennai",
    area: "5,800 sq.ft",
    timeline: "9 Months",
    image: "/spotlight/spotlight9.jpg",
    description:
      "Ultra-exclusive skyline duplex with double-height glazing, private rooftop infinity plunge pool, and dedicated butler kitchen.",
  },
  {
    id: "skyline-glass-villa",
    name: "Skyline Glass Villa",
    category: "villas",
    badge: "Corner Villa",
    subtext: "Glazed Elevation",
    location: "Shanthi Colony, Anna Nagar",
    area: "6,100 sq.ft",
    timeline: "12 Months",
    image: "/spotlight/spotlight10.jpg",
    description:
      "Glazed corner elevation flooding every level with natural light, premium fittings, and private terrace lounge.",
  },
  {
    id: "twin-crest-villa",
    name: "Twin Crest Villa",
    category: "villas",
    badge: "Twin Living",
    subtext: "Family Enclave",
    location: "AA Block, Anna Nagar",
    area: "8,400 sq.ft",
    timeline: "14 Months",
    image: "/spotlight/spotlight2.jpg",
    description:
      "Mirror-image family villas sharing a private landscaped driveway, imported marble, and dedicated staff quarters.",
  },
  {
    id: "terrace-garden-villa",
    name: "Terrace Garden",
    category: "villas",
    badge: "Sky Garden",
    subtext: "Cantilevered Luxury",
    location: "Anna Nagar West",
    area: "6,600 sq.ft",
    timeline: "13 Months",
    image: "/spotlight/spotlight3.jpg",
    description:
      "Cascading cantilevered terraces with lush sky gardens on every floor and sustainable rainwater retention.",
  },
  {
    id: "corporate-tower",
    name: "Corporate Hub",
    category: "commercial",
    badge: "Corporate",
    subtext: "Tech Office Building",
    location: "Roundtana, Anna Nagar",
    area: "32,000 sq.ft",
    timeline: "15 Months",
    image: "/spotlight/spotlight4.jpg",
    description:
      "Glass-fronted corporate address with basement parking, structural curtain walling, and high-speed lifts.",
  },
  {
    id: "heritage-classic",
    name: "Heritage Classic",
    category: "villas",
    badge: "Heritage",
    subtext: "Classic Coastal Villa",
    location: "Elliot's Beach Road, Besant Nagar",
    area: "6,900 sq.ft",
    timeline: "13 Months",
    image: "/spotlight/spotlight7.jpg",
    description:
      "Neo-classical sea-facing villa with landscaped courtyards, traditional woodwork, and modern reinforced stability.",
  },
  {
    id: "country-farmhouse",
    name: "Country Farmhouse",
    category: "villas",
    badge: "Weekend",
    subtext: "Scenic Retreat",
    location: "East Coast Road",
    area: "6,500 sq.ft on 1 Acre",
    timeline: "10 Months",
    image: "/spotlight/spotlight8.jpg",
    description:
      "Tranquil rustic-contemporary retreat featuring open verandas, landscaped lotus ponds, and outdoor entertainment pavilions.",
  },
  {
    id: "luxury-interiors",
    name: "Luxury Penthouse",
    category: "interiors",
    badge: "Bespoke",
    subtext: "Italian Marble & Teak",
    location: "Boat Club, Chennai",
    area: "Custom Spaces",
    timeline: "60-90 Days",
    image: "/spotlight/spotlight9.jpg",
    description:
      "End-to-end bespoke interior architecture featuring bookmatched Statuario marble, acoustic acoustic wall paneling, and smart automation.",
  },
];

export default function Spotlight() {
  const [selectedItem, setSelectedItem] = useState(null);

  const openConsultation = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-consultation"));
    }
  };

  return (
    <section id="spotlight" className="relative w-full bg-white py-14 sm:py-20 lg:py-24 font-sans overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Nike-Style Clean Heading using same font as other sections */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] 2xl:text-[38px] font-bold uppercase tracking-tight text-slate-900 font-sans leading-tight">
            SPOTLIGHT
          </h2>
          {/* One-Line Subtitle */}
          <p className="mt-2.5 text-xs sm:text-sm md:text-[15px] font-medium text-slate-600 font-sans leading-relaxed">
            Classic silhouettes and cutting-edge innovation to build your dream home from the ground up.
          </p>
        </div>

        {/* Nike-Style Pixel-Perfect 8-Column Grid with floating images and clean titles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-4 sm:gap-x-6 lg:gap-x-6 gap-y-8 sm:gap-y-10 lg:gap-y-12">
          {spotlightItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedItem(item);
                }
              }}
              className="group flex flex-col items-center cursor-pointer select-none text-center outline-none"
            >
              {/* Product Silhouette Floating Frame */}
              <div className="relative h-16 sm:h-20 lg:h-22 w-full flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={140}
                  height={100}
                  className="max-h-full w-auto max-w-full object-contain object-center transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1 drop-shadow-xs"
                />
              </div>

              {/* Title below image matching Nike clean typography */}
              <div className="mt-3 w-full">
                <h3 className="text-[11px] sm:text-[12px] font-bold text-slate-900 group-hover:text-[#ff8c00] transition-colors leading-tight font-sans text-center">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Interactive Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="spotlight-title"
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full max-w-2xl flex-col md:flex-row overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200"
          >
            {/* Close Button */}
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setSelectedItem(null)}
              aria-label="Close modal"
              className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-950 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Left: Project Image */}
            <div className="relative h-56 md:h-auto md:w-[48%] bg-slate-100 shrink-0">
              <Image
                src={selectedItem.image}
                alt={selectedItem.name}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="rounded-full bg-slate-950/80 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                  {selectedItem.badge}
                </span>
              </div>
            </div>

            {/* Right: Project Details */}
            <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff8c00]">
                  {selectedItem.subtext}
                </span>
                <h3 id="spotlight-title" className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {selectedItem.name}
                </h3>

                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <MapPin className="h-3.5 w-3.5 text-[#003a70]" />
                  <span>{selectedItem.location}</span>
                </p>

                <p className="mt-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  {selectedItem.description}
                </p>

                {/* Key Specs */}
                <div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-slate-100 pt-3 text-xs">
                  <div className="rounded-lg bg-slate-50 p-2 border border-slate-100">
                    <span className="block text-[10px] text-slate-400 font-medium">Built-up Area</span>
                    <span className="font-bold text-slate-800">{selectedItem.area}</span>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-2 border border-slate-100">
                    <span className="block text-[10px] text-slate-400 font-medium">Delivery Timeline</span>
                    <span className="font-bold text-slate-800">{selectedItem.timeline}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center gap-2.5">
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => {
                    setSelectedItem(null);
                    openConsultation();
                  }}
                  className="flex-1 rounded-xl bg-[#ff8c00] py-2.5 text-center text-xs sm:text-sm font-bold text-white shadow-md shadow-[#ff8c00]/25 transition-all hover:bg-[#e07b00] cursor-pointer"
                >
                  Request Quote for this Model
                </button>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setSelectedItem(null)}
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

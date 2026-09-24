"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function EverythingOnePlace() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);
  const sectionRef = useRef(null);

  // Trigger jump animation when section scrolls into viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Tabs Data with real project images from public/assets/img/
  const tabsData = [
    {
      id: "buyers",
      label: "For Buyers / Owners",
      items: [
        {
          title: "Home Loan",
          image: "/assets/img/img-001.jpeg",
          desc: "Lowest interest bank tie-ups & NOC",
        },
        {
          title: "Home Interior Design",
          image: "/assets/img/img-005.jpeg",
          desc: "Custom architectural luxury interiors",
        },
        {
          title: "Valuation",
          image: "/assets/img/img-012.jpeg",
          desc: "Certified structural & market assessment",
        },
        {
          title: "Vastu Calculator",
          image: "/assets/img/img-018.jpeg",
          desc: "Traditional orientation compliance",
        },
        {
          title: "Property Management",
          image: "/assets/img/img-024.jpeg",
          desc: "End-to-end site upkeep & leasing",
        },
        {
          title: "Sell or Rent Property",
          image: "/assets/img/img-030.jpeg",
          desc: "Turnkey marketing & joint venture",
        },
      ],
    },
    {
      id: "tenants",
      label: "For Tenants",
      items: [
        {
          title: "Verified Rentals",
          image: "/assets/img/img-035.jpeg",
          desc: "100% IS-code quality residences",
        },
        {
          title: "Lease Agreements",
          image: "/assets/img/img-040.jpeg",
          desc: "Instant digital legal documentation",
        },
        {
          title: "Move-in Support",
          image: "/assets/img/img-045.jpeg",
          desc: "Hassle-free physical relocation",
        },
        {
          title: "Maintenance & Care",
          image: "/assets/img/img-050.jpeg",
          desc: "24/7 structural & plumbing support",
        },
        {
          title: "Utility Connection",
          image: "/assets/img/img-055.jpeg",
          desc: "Fast EB electricity & water setup",
        },
        {
          title: "Tenant Protection",
          image: "/assets/img/img-060.jpeg",
          desc: "Transparent deposit guarantee",
        },
      ],
    },
    {
      id: "agents",
      label: "For Agents",
      items: [
        {
          title: "Joint Venture Deals",
          image: "/assets/img/img-065.jpeg",
          desc: "Prime land development partnerships",
        },
        {
          title: "Layout Promotion",
          image: "/assets/img/img-070.jpeg",
          desc: "Multi-acre DTCP township plots",
        },
        {
          title: "Partner Portal",
          image: "/assets/img/img-075.jpeg",
          desc: "Realtime inventory & payout tracking",
        },
        {
          title: "High-Yield Brokerage",
          image: "/assets/img/img-080.jpeg",
          desc: "Competitive commission structure",
        },
        {
          title: "Registration Audit",
          image: "/assets/img/img-085.jpeg",
          desc: "Title deed & encumbrance check",
        },
        {
          title: "Architectural Plans",
          image: "/assets/img/img-090.jpeg",
          desc: "2D & 3D layout blueprints",
        },
      ],
    },
    {
      id: "builders",
      label: "For Builders & Banks",
      items: [
        {
          title: "Structural Audit",
          image: "/assets/img/img-095.jpeg",
          desc: "IS-Code concrete test reporting",
        },
        {
          title: "Turnkey Execution",
          image: "/assets/img/img-098.jpeg",
          desc: "End-to-end EPC contracting",
        },
        {
          title: "Quality NOC",
          image: "/assets/img/img-100.jpeg",
          desc: "Government certified approvals",
        },
        {
          title: "Bank Loan NOC",
          image: "/assets/img/besantnagar-residence-view/img103.jpg",
          desc: "Approved project APF codes",
        },
        {
          title: "Commercial Development",
          image: "/assets/img/suresh-residence-view/img17.jpg",
          desc: "Multi-storey commercial hubs",
        },
        {
          title: "Township Approvals",
          image: "/assets/img/natraj-residence/img102.jpg",
          desc: "CMDA & DTCP sanctioning",
        },
      ],
    },
  ];

  const handleTabChange = (index) => {
    setActiveTab(index);
    setIsAnimated(false);
    setTimeout(() => setIsAnimated(true), 30);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 text-slate-900"
    >
      <div className="mx-auto max-w-7xl">
        {/* Main Section Header */}
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 tracking-tight mb-8 font-sans">
          Everything you Need at One Place
        </h2>

        {/* Outer Tabs & Card Box Wrapper */}
        <div className="w-full">
          {/* Navigation Tabs Bar sitting flush on the content box border */}
          <div className="flex flex-wrap sm:flex-nowrap items-end gap-2 sm:gap-2.5 relative z-10 px-2 sm:px-4">
            {tabsData.map((tab, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(idx)}
                  className={`whitespace-nowrap transition-colors text-xs sm:text-sm font-bold px-5 sm:px-7 py-3 rounded-t-xl rounded-b-none cursor-pointer select-none ${
                    isActive
                      ? "bg-[#2d2d2d] text-white border-t border-x border-[#2d2d2d] relative -mb-[1px] shadow-sm z-20 py-3.5"
                      : "bg-white text-[#1f2937] hover:bg-slate-50 border border-[#d1d5db] hover:text-black z-10 py-2.5"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content Box with 6 Items and Thin Line Dividers */}
          <div className="rounded-2xl border border-[#d1d5db] bg-white p-6 sm:p-8 sm:py-12 shadow-sm relative z-0">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-[#e5e7eb]">
              {tabsData[activeTab].items.map((item, index) => (
                <div
                  key={`${activeTab}-${index}`}
                  className="group flex flex-col items-center text-center px-2 sm:px-4 py-4 md:py-2 transition-all hover:bg-slate-50/60 rounded-xl cursor-pointer"
                >
                  {/* Real Project Image Tile with Staggered Viewport Jump Animation */}
                  <div
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-50 ${
                      isAnimated ? "animate-jump" : ""
                    }`}
                    style={{
                      animationDelay: isAnimated ? `${index * 80}ms` : "0ms",
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 80px, 96px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Title Label matching reference design */}
                  <h3 className="mt-4 text-xs sm:text-sm font-semibold text-[#1f2937] group-hover:text-[#ff8c00] transition-colors leading-snug font-sans max-w-[130px]">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

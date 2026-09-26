"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  ArrowUpRight,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  HardHat,
  Compass,
  ClipboardList,
  Palette,
  Key,
  Landmark,
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  const servicesList = [
    {
      title: "Construction",
      desc: "Residential & commercial structural engineering",
      icon: HardHat,
      href: "#services-construction",
    },
    {
      title: "Layout Promote",
      desc: "Multi-acre plots & township development",
      icon: Compass,
      href: "#services-layout",
    },
    {
      title: "Project Management",
      desc: "End-to-end site oversight & quality audit",
      icon: ClipboardList,
      href: "#services-pm",
    },
    {
      title: "Property Developer",
      desc: "Turnkey luxury residential developments",
      icon: Landmark,
      href: "#services-developer",
    },
    {
      title: "Interior Designing",
      desc: "Custom architectural interior aesthetics",
      icon: Palette,
      href: "#services-interior",
    },
    {
      title: "Real Estate Selling & Buy",
      desc: "Prime land & property trading solutions",
      icon: Key,
      href: "#services-realestate",
    },
  ];

  const journeySteps = [
    "Bhoomi Pooja",
    "Approvals",
    "Foundation",
    "Structure",
    "Brickwork & Plastering",
    "Interiors & Finishing",
    "Griha Pravesam · House Warming",
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white shadow-sm transition-all duration-300">
        {/* Running top bar: Bhoomi Pooja to House Warming journey */}
        <div className="relative h-9 sm:h-10 overflow-hidden bg-primary text-white" aria-label="From Bhoomi Pooja to House Warming">
          <div className="topbar-marquee flex h-full w-max items-center">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
                {[0, 1].map((rep) => (
                  <div key={rep} className="flex shrink-0 items-center gap-4 sm:gap-5 pr-14 text-xs sm:text-[13px] 2xl:text-sm font-sans font-medium tracking-wide whitespace-nowrap antialiased">
                    <span className="font-bold uppercase tracking-wider text-secondary">
                      From Bhoomi Pooja to House Warming
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    {journeySteps.map((step, i) => (
                      <span key={step} className="flex items-center gap-4 sm:gap-5">
                        <span className={i === journeySteps.length - 1 ? "font-bold text-secondary" : "text-white"}>
                          {step}
                        </span>
                        {i < journeySteps.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-white/60" />}
                      </span>
                    ))}
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    <span className="font-bold text-white">One team, one promise</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto flex h-14 sm:h-16 max-w-[92rem] items-center justify-between px-4 sm:px-6 lg:px-8 py-0.5 box-content">
          {/* Logo - Official Image on Clean White Navbar */}
          <Link href="/" className="group flex items-center shrink-0">
            <div className="relative flex items-center transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo/logo-ajay-homes.png"
                alt="Ajay Homes & Estates - Creating Quality Lifestyle Buildings"
                width={200}
                height={55}
                priority
                className="h-9 sm:h-11 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-1 xl:gap-2 lg:flex">
            <Link
              href="/"
              className="whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#ff8c00] hover:bg-slate-100/80 transition-all"
            >
              Home
            </Link>

            <Link
              href="#about"
              className="whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#ff8c00] hover:bg-slate-100/80 transition-all"
            >
              About
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`whitespace-nowrap inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-all ${
                  servicesDropdownOpen
                    ? "bg-[#ff8c00] text-white shadow-md shadow-[#ff8c00]/30"
                    : "text-slate-700 hover:text-[#ff8c00] hover:bg-slate-100/80"
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    servicesDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Mega Dropdown Menu */}
              {servicesDropdownOpen && (
                <div
                  className="absolute left-1/2 top-full mt-3 w-[560px] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200 text-slate-900"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="mb-3 border-b border-slate-200 pb-2 px-3 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Our Core Engineering Services
                    </span>
                    <span className="text-[10px] font-medium text-slate-500">
                      IS-Code Certified Execution
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {servicesList.map((item, idx) => {
                      return (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setServicesDropdownOpen(false)}
                          className="group block rounded-xl px-3 py-2.5 transition-all hover:bg-slate-50 hover:border-slate-200 border border-transparent"
                        >
                          <div>
                            <div className="text-xs font-bold text-slate-800 group-hover:text-slate-950 transition-colors flex items-center gap-1">
                              <span>{item.title}</span>
                              <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="#gallery"
              className="whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#ff8c00] hover:bg-slate-100/80 transition-all"
            >
              Gallery
            </Link>

            <Link
              href="#resources"
              className="whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#ff8c00] hover:bg-slate-100/80 transition-all"
            >
              Resources
            </Link>

            <Link
              href="#contact"
              className="whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#ff8c00] hover:bg-slate-100/80 transition-all"
            >
              Contact
            </Link>
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden items-center gap-3 shrink-0 lg:flex">
            <a
              href="tel:+919840012345"
              className="whitespace-nowrap group inline-flex items-center gap-1.5 rounded-full bg-[#ff8c00] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#ff8c00]/30 transition-all duration-300 hover:bg-[#e07b00] hover:shadow-[#ff8c00]/50 hover:scale-[1.02]"
            >
              <span>Get Free Consultation</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-slate-50 text-slate-800 transition-colors hover:bg-slate-100 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown & Soft Backdrop */}
      {mobileMenuOpen && (
        <>
          {/* Soft backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 top-[92px] sm:top-[104px] z-40 bg-black/35 backdrop-blur-[2px] lg:hidden animate-in fade-in duration-200"
            aria-hidden="true"
          />

          {/* Floating Compact Menu Card */}
          <div className="fixed top-[96px] sm:top-[108px] inset-x-3 sm:inset-x-6 z-50 max-h-[calc(100dvh-7.5rem)] overflow-y-auto rounded-2xl border border-slate-200/90 bg-white/98 backdrop-blur-md p-3.5 sm:p-4 shadow-2xl lg:hidden animate-in fade-in zoom-in-95 duration-200 text-slate-900">
            <div className="flex flex-col divide-y divide-slate-100">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-[14px] font-bold text-slate-800 hover:text-[#ff8c00] hover:bg-slate-50 transition-colors"
              >
                <span>Home</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
              </Link>

              <Link
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-[14px] font-bold text-slate-800 hover:text-[#ff8c00] hover:bg-slate-50 transition-colors"
              >
                <span>About</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
              </Link>

              {/* Mobile Services Accordion */}
              <div>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-[14px] font-bold text-slate-800 hover:text-[#ff8c00] hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span>Services</span>
                    <span className="rounded-full bg-[#ff8c00]/15 px-2 py-0.5 text-[10px] font-bold text-[#ff8c00]">
                      6 Specialties
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-[#ff8c00] transition-transform duration-200 ${
                      mobileServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileServicesOpen && (
                  <div className="my-1 grid grid-cols-1 gap-1 border-l-2 border-[#ff8c00]/30 pl-2.5 ml-2.5 animate-in fade-in duration-200">
                    {servicesList.map((item, idx) => {
                      const IconComponent = item.icon;
                      return (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileServicesOpen(false);
                          }}
                          className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[12.5px] font-semibold text-slate-700 hover:text-[#ff8c00] hover:bg-orange-50/50 transition-colors"
                        >
                          <IconComponent className="h-3.5 w-3.5 text-[#ff8c00] shrink-0" />
                          <span>{item.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Link
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-[14px] font-bold text-slate-800 hover:text-[#ff8c00] hover:bg-slate-50 transition-colors"
              >
                <span>Gallery</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
              </Link>

              <Link
                href="#resources"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-[14px] font-bold text-slate-800 hover:text-[#ff8c00] hover:bg-slate-50 transition-colors"
              >
                <span>Resources</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
              </Link>

              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-[14px] font-bold text-slate-800 hover:text-[#ff8c00] hover:bg-slate-50 transition-colors"
              >
                <span>Contact</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
              </Link>
            </div>

            {/* Contact Action Strip in Mobile Menu */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
              <a
                href="tel:+919840012345"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-[12px] font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-[#ff8c00]" />
                <span>+91 98400 12345</span>
              </a>

              <a
                href="tel:+919840012345"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#ff8c00] py-2.5 px-3 text-[12px] font-bold text-white shadow-md shadow-[#ff8c00]/30 hover:bg-[#e07b00] transition-colors"
              >
                <span>Get Free Consultation</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}

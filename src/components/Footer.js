"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";

// Social Icons SVGs
function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689-.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.001.572 1.769.883 2.806.883 3.18 0 5.767-2.587 5.767-5.766.001-3.18-2.585-5.766-5.767-5.766zm9.969 5.766c0 5.518-4.482 10-10 10-1.748 0-3.385-.45-4.819-1.238l-4.757 1.248 1.272-4.641c-.868-1.487-1.372-3.217-1.372-5.069 0-5.518 4.482-10 10-10s10 4.482 10 10zm-5.467 3.328c-.244-.122-1.446-.713-1.67-.795-.224-.082-.387-.122-.55.122-.163.245-.631.795-.774.958-.143.163-.285.184-.53.061-.244-.122-1.031-.38-1.964-1.212-.727-.648-1.217-1.448-1.36-1.693-.143-.245-.015-.377.107-.499.11-.11.244-.286.367-.428.122-.143.163-.245.245-.408.082-.163.041-.306-.02-.428-.061-.122-.55-1.326-.754-1.815-.198-.477-.4-.412-.55-.42-.143-.008-.306-.01-.469-.01-.163 0-.428.061-.652.306-.224.245-.856.836-.856 2.039 0 1.203.876 2.365.999 2.529.122.163 1.723 2.631 4.174 3.689.583.252 1.039.403 1.394.516.586.186 1.119.16 1.541.097.471-.07 1.446-.591 1.65-1.162.204-.571.204-1.06.143-1.162-.061-.102-.224-.163-.469-.285z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function YouTubeIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

// Link group: collapsible accordion on phones, always-open column from md up
function FooterLinkGroup({ title, links, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/15 md:border-0">
      <h4 className="font-sans">
        <button
          type="button"
          suppressHydrationWarning
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between py-3 md:py-0 md:mb-3 lg:mb-4 md:pointer-events-none text-sm sm:text-base lg:text-[17px] 2xl:text-lg font-bold text-[#ff8c00] tracking-wider uppercase"
        >
          {title}
          <ChevronDown className={`h-4 w-4 md:hidden transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </h4>
      <ul
        className={`${
          isOpen ? "grid" : "hidden"
        } grid-cols-2 gap-x-4 gap-y-2 pb-4 md:pb-0 md:block md:space-y-2 lg:space-y-2.5 text-xs sm:text-[13px] 2xl:text-sm font-sans text-white/90`}
      >
        {links.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="hover:text-[#ff8c00] transition-colors inline-flex items-center gap-1 group py-0.5"
            >
              <span>{item.label}</span>
              {item.external && (
                <ArrowUpRight className="w-3 h-3 text-white/60 group-hover:text-[#ff8c00] transition-colors" />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [openGroup, setOpenGroup] = useState(null);
  const toggleGroup = (name) => setOpenGroup((prev) => (prev === name ? null : name));

  // 1. Quick Links from Navbar items
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Resources", href: "#resources" },
    { label: "Contact", href: "#contact" },
  ];

  // 2. All company services
  const servicesLinks = [
    { label: "Construction", href: "#services-construction" },
    { label: "Layout promote", href: "#services-layout" },
    { label: "Project management", href: "#services-pm" },
    { label: "Property developer", href: "#services-developer" },
    { label: "Interior designing", href: "#services-interior" },
    { label: "Real estate selling and buy", href: "#services-realestate" },
  ];

  // 3. Social Media links: Instagram, WhatsApp, Facebook, YouTube
  const socialLinks = [
    {
      name: "Instagram",
      handle: "@ajayhomesestates",
      href: "https://instagram.com",
      icon: InstagramIcon,
      accent: "hover:border-[#E1306C] hover:text-[#E1306C]",
    },
    {
      name: "WhatsApp",
      handle: "+91 98400 12345",
      href: "https://wa.me/919840012345",
      icon: WhatsAppIcon,
      accent: "hover:border-[#25D366] hover:text-[#25D366]",
    },
    {
      name: "Facebook",
      handle: "Ajay Homes & Estates",
      href: "https://facebook.com",
      icon: FacebookIcon,
      accent: "hover:border-[#1877F2] hover:text-[#1877F2]",
    },
    {
      name: "YouTube",
      handle: "Ajay Homes Official",
      href: "https://youtube.com",
      icon: YouTubeIcon,
      accent: "hover:border-[#FF0000] hover:text-[#FF0000]",
    },
  ];

  return (
    <div className="w-full relative select-none font-sans">
      {/* Main Footer Section with Full-Width Video & Uniform Dark Overlay */}
      <footer className="relative w-full text-white overflow-hidden bg-[#0d0b09]">
        {/* Full-Width Background Video (Spans 100% of Footer background) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
          >
            <source src="/footer/footer-video2.mp4" type="video/mp4" />
          </video>

          {/* Light overlay: keeps the video clearly visible while text stays readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b09]/80 via-[#0d0b09]/55 to-[#0d0b09]/35 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09]/75 via-transparent to-[#0d0b09]/30 pointer-events-none" />
        </div>

        {/* Main 4-Column Content Container */}
        <div className="relative z-10 mx-auto max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 2xl:pt-24 pb-6 sm:pb-8 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1.1fr_1.2fr] gap-x-6 gap-y-6 md:gap-y-8 sm:gap-x-8 lg:gap-x-8 xl:gap-x-10">
            {/* Column 1: Logo + Contact Details */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1 max-w-sm">
              <Link
                href="#hero"
                aria-label="Ajay Homes & Estates - back to top"
                className="mb-4 lg:mb-5 inline-flex"
              >
                <Image
                  src="/logo/logo-ajay-homes.png"
                  alt="Ajay Homes & Estates - Creating Quality Lifestyle Buildings"
                  width={2172}
                  height={724}
                  sizes="180px"
                  className="h-10 sm:h-11 2xl:h-12 w-auto"
                />
              </Link>

              {/* Corporate Address */}
              <div className="text-xs 2xl:text-sm text-white/90 leading-relaxed font-sans lg:space-y-0.5">
                <p className="font-bold text-white">Corporate Address:</p>
                <p className="text-white/85 inline lg:block">Ajay Signature Towers, </p>
                <p className="text-white/85 inline lg:block">2nd Avenue, Anna Nagar East, </p>
                <p className="text-white/85 inline lg:block">Chennai - 600102, </p>
                <p className="text-white/85 inline lg:block">Tamil Nadu, India </p>
              </div>

              <div className="mt-3 lg:mt-0 grid grid-cols-2 gap-x-4 lg:block">
                {/* Sales Enquiries */}
                <div className="lg:mt-4 text-xs 2xl:text-sm font-sans">
                  <p className="text-white/70">For sales enquiries:</p>
                  <a
                    href="tel:18003130080"
                    className="font-bold text-white tracking-wide hover:text-[#ff8c00] transition-colors"
                  >
                    1800 313 0080
                  </a>
                </div>

                {/* Other Enquiries */}
                <div className="lg:mt-3 text-xs 2xl:text-sm font-sans">
                  <p className="text-white/70">For other enquiries:</p>
                  <a
                    href="tel:+914426267890"
                    className="font-bold text-white tracking-wide hover:text-[#ff8c00] transition-colors"
                  >
                    +91 44 2626 7890
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="mt-2 lg:mt-3 text-xs 2xl:text-sm font-sans">
                <p className="text-white/70">Email:</p>
                <a
                  href="mailto:properties@ajayhomesestates.com"
                  className="font-bold text-white tracking-wide hover:text-[#ff8c00] transition-colors break-all"
                >
                  properties@ajayhomesestates.com
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links (Navbar items) */}
            <div className="col-span-2 md:col-span-1 border-t border-white/15 md:border-0 pt-3 md:pt-0">
              <FooterLinkGroup
                title="Quick Links"
                links={quickLinks}
                isOpen={openGroup === "quicklinks"}
                onToggle={() => toggleGroup("quicklinks")}
              />
            </div>

            {/* Column 3: All Our Services */}
            <div className="col-span-2 md:col-span-1 border-t border-white/15 md:border-0 pt-3 md:pt-0">
              <FooterLinkGroup
                title="Our Services"
                links={servicesLinks}
                isOpen={openGroup === "services"}
                onToggle={() => toggleGroup("services")}
              />
            </div>

            {/* Column 4: Social Media Icons in One Line */}
            <div className="col-span-2 md:col-span-1 border-t border-white/15 md:border-0 pt-3 md:pt-0">
              <div className="border-b border-white/15 md:border-0">
                <h4 className="font-sans">
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={() => toggleGroup("social")}
                    aria-expanded={openGroup === "social"}
                    className="flex w-full items-center justify-between py-3 md:py-0 md:mb-3 lg:mb-4 md:pointer-events-none text-sm sm:text-base lg:text-[17px] 2xl:text-lg font-bold text-[#ff8c00] tracking-wider uppercase"
                  >
                    Connect With Us
                    <ChevronDown
                      className={`h-4 w-4 md:hidden transition-transform duration-200 ${
                        openGroup === "social" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h4>

                <div
                  className={`${
                    openGroup === "social" ? "flex" : "hidden"
                  } flex-col gap-3 pb-4 md:pb-0 md:flex`}
                >
                  <p className="text-xs sm:text-[13px] 2xl:text-sm text-white/80 leading-relaxed">
                    Follow us on social media for exclusive walkthroughs and project updates:
                  </p>

                  {/* Single Line of Social Icons */}
                  <div className="flex flex-row items-center gap-3 pt-1">
                    {/* Instagram */}
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      title="Follow us on Instagram"
                      className="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-[#E1306C] hover:bg-[#E1306C]/20 hover:text-[#E1306C] hover:scale-110 shadow-sm"
                    >
                      <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white/90 group-hover:text-[#E1306C] transition-colors" />
                    </a>

                    {/* WhatsApp */}
                    <a
                      href="https://wa.me/919840012345"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="WhatsApp"
                      title="Chat on WhatsApp"
                      className="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-[#25D366] hover:bg-[#25D366]/20 hover:text-[#25D366] hover:scale-110 shadow-sm"
                    >
                      <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white/90 group-hover:text-[#25D366] transition-colors" />
                    </a>

                    {/* Facebook */}
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook"
                      title="Follow us on Facebook"
                      className="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-[#1877F2] hover:bg-[#1877F2]/20 hover:text-[#1877F2] hover:scale-110 shadow-sm"
                    >
                      <FacebookIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white/90 group-hover:text-[#1877F2] transition-colors" />
                    </a>

                    {/* YouTube */}
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="YouTube"
                      title="Watch on YouTube"
                      className="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-[#FF0000] hover:bg-[#FF0000]/20 hover:text-[#FF0000] hover:scale-110 shadow-sm"
                    >
                      <YouTubeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white/90 group-hover:text-[#FF0000] transition-colors" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="mt-8 md:mt-10 lg:mt-14 pt-4 sm:pt-5 border-t border-white/15 text-[11.5px] 2xl:text-[13px] text-white/75 font-sans text-center sm:text-left">
            <p>© 2026 Official Website of Ajay Homes &amp; Estates Projects Ltd. | All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}



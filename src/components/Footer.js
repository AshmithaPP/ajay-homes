"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";

// Link group: collapsible accordion on phones, always-open column from md up
function FooterLinkGroup({ title, links, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/15 md:border-0">
      <h4 className="font-sans">
        <button
          type="button"
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
        } grid-cols-2 gap-x-4 gap-y-1.5 pb-4 md:pb-0 md:block md:space-y-1 lg:space-y-1.5 text-xs 2xl:text-sm font-sans text-white/90`}
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

  const quickMenu = [
    { label: "About Us", href: "#about" },
    { label: "Residential", href: "#projects" },
    { label: "Offices", href: "#projects" },
    { label: "Resale", href: "#projects" },
    { label: "Videos", href: "#gallery" },
    { label: "Events", href: "#news" },
    { label: "News Corner", href: "#news" },
    { label: "Blogs", href: "#blogs" },
    { label: "FAQs", href: "#faqs" },
    { label: "Awards", href: "#awards" },
    { label: "Careers", href: "#careers", external: true },
    { label: "Become a Channel Partner", href: "#partner" },
    { label: "Ajay Gazette", href: "#news", external: true },
  ];

  const quickLinks = [
    { label: "Customer Portal", href: "#portal", external: true },
    { label: "Crisil Rating", href: "#rating" },
    { label: "Referral", href: "#referral" },
    { label: "EMI Calculator", href: "#calculator" },
    { label: "Interior Design", href: "#interiors", external: true },
    { label: "NRIs", href: "#nri" },
    { label: "Corporate", href: "#corporate" },
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms & Conditions", href: "#terms" },
    { label: "Disclaimer", href: "#disclaimer" },
    { label: "Public Notices", href: "#notices" },
  ];

  const investors = [
    { label: "Investors", href: "#investors" },
    { label: "Financial Performance", href: "#financials" },
    { label: "Share Holding Pattern", href: "#shareholding" },
    { label: "AGM Notice", href: "#agm", external: true },
    { label: "Annual Report", href: "#report", external: true },
    { label: "ESG", href: "#esg" },
    { label: "CSR", href: "#csr" },
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b09]/75 via-[#0d0b09]/50 to-[#0d0b09]/30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09]/70 via-transparent to-[#0d0b09]/30 pointer-events-none" />
        </div>

        {/* Main 4-Column Content Container */}
        <div className="relative z-10 mx-auto max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 lg:pt-16 pb-6 sm:pb-8 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-x-6 gap-y-6 md:gap-y-8 sm:gap-x-10 lg:gap-x-8 xl:gap-x-12">
            
            {/* Column 1: Reach Us */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1 max-w-sm">
              <h4 className="text-sm sm:text-base lg:text-[17px] 2xl:text-lg font-bold text-[#ff8c00] tracking-wider uppercase font-sans mb-3 lg:mb-4">
                Reach Us
              </h4>

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

              {/* Social Icons Row */}
              <div className="mt-4 lg:mt-6 flex flex-wrap items-center gap-2.5 text-white/90">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-8 w-8 lg:h-9 lg:w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:border-[#ff8c00] hover:text-[#ff8c00] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-8 w-8 lg:h-9 lg:w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:border-[#ff8c00] hover:text-[#ff8c00] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689-.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X"
                  className="flex h-8 w-8 lg:h-9 lg:w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:border-[#ff8c00] hover:text-[#ff8c00] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-8 w-8 lg:h-9 lg:w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:border-[#ff8c00] hover:text-[#ff8c00] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="flex h-8 w-8 lg:h-9 lg:w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:border-[#ff8c00] hover:text-[#ff8c00] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Link groups: accordions on phones, columns from tablet up */}
            <div className="col-span-2 md:contents border-t border-white/15 md:border-0">
              <FooterLinkGroup
                title="Quick Menu"
                links={quickMenu}
                isOpen={openGroup === "menu"}
                onToggle={() => toggleGroup("menu")}
              />
              <FooterLinkGroup
                title="Quick Links"
                links={quickLinks}
                isOpen={openGroup === "links"}
                onToggle={() => toggleGroup("links")}
              />
              <FooterLinkGroup
                title="Investors"
                links={investors}
                isOpen={openGroup === "investors"}
                onToggle={() => toggleGroup("investors")}
              />
            </div>

          </div>

          {/* Bottom Copyright Bar matching Prestige */}
          <div className="mt-4 md:mt-10 lg:mt-14 pt-4 sm:pt-5 md:border-t border-white/15 text-[11.5px] 2xl:text-[13px] text-white/75 font-sans text-center sm:text-left">
            <p>© 2026 Official Website of Ajay Homes &amp; Estates Projects Ltd. | All Rights Reserved.</p>
          </div>
        </div>

       

      </footer>
    </div>
  );
}


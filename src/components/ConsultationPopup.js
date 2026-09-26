"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, CheckCircle2, ShieldCheck, Clock, BadgeIndianRupee } from "lucide-react";

// The popup opens once the visitor has scrolled the whole page, hero to footer
const TRIGGER_SELECTOR = "footer";

const propertyTypes = ["Independent Villa", "Apartment", "Commercial", "Interiors Only"];
const services = [
  "Construction",
  "Layout Promote",
  "Project Management",
  "Property Developer",
  "Interior Designing",
  "Real Estate Selling & Buying",
];
const locations = ["Anna Nagar", "Besant Nagar", "Adyar / Boat Club", "ECR", "OMR", "Velachery", "Other"];

const perks = [
  { icon: ShieldCheck, label: "IS-Code certified" },
  { icon: BadgeIndianRupee, label: "Transparent pricing" },
  { icon: Clock, label: "On-time handover" },
];

export default function ConsultationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    propertyType: "",
    service: "",
    location: "",
    name: "",
    phone: "",
    whatsapp: true,
  });
  const [errors, setErrors] = useState({});

  const close = useCallback(() => setIsOpen(false), []);

  // Open on every visit (every page load, all devices) once the visitor scrolls down to the footer
  useEffect(() => {
    const check = () => {
      const footer = document.querySelector(TRIGGER_SELECTOR);
      const footerTop = footer ? footer.getBoundingClientRect().top : Infinity;
      const nearPageEnd =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 150;
      // footer is well into view, or the visitor hit the very bottom of the page
      if (footerTop < window.innerHeight * 0.7 || nearPageEnd) {
        setIsOpen(true);
        window.removeEventListener("scroll", check);
      }
    };

    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  // Let other sections open the popup (e.g. "Get a Free Quote" buttons)
  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener("open-consultation", open);
    return () => window.removeEventListener("open-consultation", open);
  }, []);

  // Lock page scroll and close on Escape while open
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.propertyType) next.propertyType = "Select a property type";
    if (!form.location) next.location = "Select your plot location";
    if (form.name.trim().length < 2) next.name = "Enter your name";
    if (!/^[6-9]\d{9}$/.test(form.phone)) next.phone = "Enter a valid 10-digit mobile number";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    // TODO: send `form` to the CRM / enquiry API once available
    setSubmitted(true);
  };

  if (!isOpen) return null;

  const fieldClass = (hasError) =>
    `w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15 ${
      hasError ? "border-red-400" : "border-slate-300"
    }`;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-sm p-0 sm:p-4 font-sans animate-in fade-in duration-200"
      onClick={close}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-title"
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-[860px] max-h-[92vh] flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl md:flex-row"
      >
        {/* Close */}
        <button
          type="button"
          suppressHydrationWarning
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Left: promo panel (compact banner on phones) */}
        <div className="relative h-36 shrink-0 overflow-hidden sm:h-44 md:h-auto md:w-[44%]">
          <Image
            src="/assets/img/img-001.jpeg"
            alt="Scarlet Diamond residence by Ajay Homes & Estates"
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/10" />

          <div className="relative flex h-full flex-col justify-between p-4 sm:p-5 md:p-6 text-white">
            <div className="inline-flex w-fit items-center rounded-lg bg-white px-2.5 py-1.5 shadow-sm">
              <Image src="/logo/logo-ajay-homes.png" alt="Ajay Homes & Estates" width={110} height={30} className="h-6 w-auto" />
            </div>

            <div>
              <p className="hidden md:block text-[11px] font-bold uppercase tracking-widest text-secondary">
                Bhoomi Pooja to House Warming
              </p>
              <p className="text-lg sm:text-xl md:mt-1 md:text-[26px] font-bold leading-tight">
                Free site visit &amp; <span className="text-secondary">detailed cost estimate</span>
              </p>
              <p className="mt-2 hidden md:block text-xs leading-relaxed text-white/85">
                Talk to our architects and engineers about your plot, budget and timeline — no obligation.
              </p>
              <ul className="mt-4 hidden md:grid grid-cols-3 gap-2">
                {perks.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex flex-col items-center gap-1 rounded-lg bg-white/10 px-1.5 py-2 text-center backdrop-blur-sm">
                    <Icon className="h-4 w-4 text-secondary" />
                    <span className="text-[10px] font-semibold leading-tight">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 md:p-7">
          {submitted ? (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
              <CheckCircle2 className="h-14 w-14 text-emerald-500" />
              <h2 className="mt-4 text-xl font-bold text-slate-900">Thank you, {form.name.split(" ")[0]}!</h2>
              <p className="mt-2 max-w-xs text-sm text-slate-600">
                Our team will call you on +91 {form.phone} within 24 hours to schedule your free site visit.
              </p>
              <button
                type="button"
                suppressHydrationWarning
                onClick={close}
                className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#002b54]"
              >
                Continue browsing
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h2 id="consultation-title" className="pr-8 text-lg sm:text-xl font-semibold text-slate-900">
                Get a <span className="font-bold text-primary">free consultation</span>
              </h2>

              {/* Property type chips */}
              <p className="mt-4 text-xs font-medium text-slate-500">Property type</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {propertyTypes.map((type) => {
                  const active = form.propertyType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      suppressHydrationWarning
                      onClick={() => update("propertyType", type)}
                      className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                        active
                          ? "border-primary bg-primary text-white"
                          : "border-slate-300 text-slate-600 hover:border-primary hover:text-primary"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
              {errors.propertyType && <p className="mt-1 text-[11px] text-red-500">{errors.propertyType}</p>}

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <select
                    suppressHydrationWarning
                    value={form.service}
                    onChange={(e) => update("service", e.target.value)}
                    className={fieldClass(false)}
                    aria-label="Service required"
                  >
                    <option value="">Service required</option>
                    {services.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    suppressHydrationWarning
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    className={fieldClass(errors.location)}
                    aria-label="Plot location"
                  >
                    <option value="">Plot location</option>
                    {locations.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                  {errors.location && <p className="mt-1 text-[11px] text-red-500">{errors.location}</p>}
                </div>
              </div>

              <div className="mt-3">
                <input
                  type="text"
                  suppressHydrationWarning
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Name"
                  autoComplete="name"
                  className={fieldClass(errors.name)}
                />
                {errors.name && <p className="mt-1 text-[11px] text-red-500">{errors.name}</p>}
              </div>

              <div className="mt-3">
                <div
                  className={`flex items-center rounded-lg border bg-white transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 ${
                    errors.phone ? "border-red-400" : "border-slate-300"
                  }`}
                >
                  <span className="border-r border-slate-200 px-3 py-2.5 text-sm text-slate-600">+91</span>
                  <input
                    type="tel"
                    suppressHydrationWarning
                    inputMode="numeric"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="Mobile number"
                    autoComplete="tel-national"
                    className="w-full rounded-r-lg bg-transparent px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none"
                  />
                </div>
                {errors.phone && <p className="mt-1 text-[11px] text-red-500">{errors.phone}</p>}
              </div>

              <label className="mt-4 flex cursor-pointer items-center gap-2 text-xs text-slate-700">
                <input
                  type="checkbox"
                  suppressHydrationWarning
                  checked={form.whatsapp}
                  onChange={(e) => update("whatsapp", e.target.checked)}
                  className="h-4 w-4 accent-[#003a70]"
                />
                Yes, send me updates on WhatsApp
              </label>

              <button
                type="submit"
                suppressHydrationWarning
                className="mt-5 w-full rounded-lg bg-secondary py-3 text-sm font-bold text-white shadow-md shadow-orange-500/25 transition-colors hover:bg-[#e07b00]"
              >
                Book a Free Consultation
              </button>

              <p className="mt-3 text-center text-[10px] leading-relaxed text-slate-500">
                By submitting, you agree to be contacted by Ajay Homes &amp; Estates and accept our{" "}
                <a href="#privacy" className="text-primary underline underline-offset-2">privacy policy</a> and{" "}
                <a href="#terms" className="text-primary underline underline-offset-2">terms of use</a>.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

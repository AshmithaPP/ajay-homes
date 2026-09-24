"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, CheckCircle, Gift, Sparkles, Send, Smartphone, QrCode, ArrowRight, ShieldCheck } from "lucide-react";

export default function ReferralRewardBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("form"); // "form" | "app"
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({
    friendName: "",
    friendPhone: "",
    projectInterest: "Property Management Services",
    referrerName: "",
    referrerPhone: "",
  });

  // Smooth scroll-driven entrance transition for this section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const baseRewards = [
    {
      line1: "Gold &",
      line2: "Jewellery",
      image: "/assets/img/rewards/gold.jpg",
    },
    {
      line1: "Food &",
      line2: "Restaurant",
      image: "/assets/img/rewards/food.jpg",
    },
    {
      line1: "Travel &",
      line2: "Entertainment",
      image: "/assets/img/rewards/travel.jpg",
    },
    {
      line1: "Gift &",
      line2: "Hampers",
      image: "/assets/img/rewards/gift.jpg",
    },
  ];

  // Quadruple for smooth infinite seamless running marquee without any blank gaps
  const marqueeRewards = [...baseRewards, ...baseRewards, ...baseRewards, ...baseRewards];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setFormData({
        friendName: "",
        friendPhone: "",
        projectInterest: "Property Management Services",
        referrerName: "",
        referrerPhone: "",
      });
    }, 2800);
  };

  return (
    <section
      ref={sectionRef}
      className={`relative w-full bg-white py-3 sm:py-5 px-2 sm:px-4 lg:px-6 font-sans overflow-hidden transition-all duration-700 ease-out select-text ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {/* Full width container with small left & right spaces */}
      <div className="w-full max-w-[98.5%] xl:max-w-[98%] mx-auto">

        {/* Replica Banner Card - pure white background, reduced height, full width */}
        <div className="relative w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-slate-300 overflow-hidden flex flex-col lg:flex-row items-center justify-between p-4 sm:p-5 lg:px-8 lg:py-5 gap-5 lg:gap-8 transition-all duration-300">
          
          {/* Top-Left "App Exclusive" Badge using Brand Primary #003a70 and Secondary #ff8c00 */}
          <div className="absolute top-0 left-0 z-20">
            <div className="bg-[#003a70] text-white text-[11px] sm:text-xs font-bold tracking-wide px-4 py-2 rounded-br-2xl shadow-xs flex items-center gap-1.5 select-text">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff8c00]" />
              <span>App Exclusive</span>
            </div>
          </div>

          {/* Left Column: 3D Illustration with Smooth Floating Animation (compact height) */}
          <div className="w-full lg:w-[32%] xl:w-[30%] flex items-center justify-center pt-6 sm:pt-4 lg:pt-0 shrink-0">
            <div className="relative w-[210px] sm:w-[250px] md:w-[280px] lg:w-[300px] h-[190px] sm:h-[220px] md:h-[230px] flex items-center justify-center group">
              
              {/* Soft warm circular platform glow using brand secondary #ff8c00 */}
              <div className="absolute inset-x-4 bottom-2 h-14 bg-gradient-to-t from-[#ff8c00]/25 via-[#ff8c00]/10 to-transparent rounded-full filter blur-lg pointer-events-none" />

              {/* 3D Animated Illustration */}
              <div className="relative w-full h-full transform transition-all duration-500 ease-out group-hover:scale-[1.03] animate-[referralFloat_4s_ease-in-out_infinite]">
                <Image
                  src="/assets/img/referral-reward-3d.jpg"
                  alt="Ajay Homes Referral Rewards 3D Character Illustration"
                  fill
                  priority
                  sizes="(max-width: 768px) 250px, 300px"
                  className="object-contain select-none pointer-events-none"
                />
              </div>

              {/* Interactive Pill */}
              <button
                type="button"
                onClick={() => {
                  setModalTab("form");
                  setIsModalOpen(true);
                }}
                className="absolute -bottom-1 bg-white/95 backdrop-blur-xs border border-[#ff8c00]/30 text-[#003a70] text-[11px] font-bold px-3 py-1 rounded-full shadow-xs hover:bg-orange-50/60 transition-all flex items-center gap-1.5 cursor-pointer opacity-90 hover:opacity-100"
              >
                <Sparkles className="w-3 h-3 text-[#ff8c00]" />
                <span className="select-text">Earn ₹50,000 Rewards</span>
              </button>
            </div>
          </div>

          {/* Right Column: Content, Running Rewards Marquee & Action CTA */}
          <div className="w-full lg:w-[68%] xl:w-[70%] flex flex-col justify-center text-left min-w-0">
            
            {/* Two-Line Headline with Brand Secondary #ff8c00 */}
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] font-extrabold text-[#111827] tracking-tight leading-[1.2] font-sans select-text">
              Refer a friend for{" "}
              <span className="text-[#ff8c00] font-extrabold">Property Management</span>
              <br />
              &amp; Earn rewards.
            </h2>

            {/* Subtext */}
            <p className="mt-2 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed font-sans max-w-2xl select-text">
              Refer a friend to any of our services &amp; earn rewards you&#39;ll be excited to redeem, only on Ajay Homes app.
            </p>

            {/* Running Rewards Marquee Row matching exact screenshot */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3.5 pt-0.5 w-full min-w-0">
              
              {/* Static Prefix Label */}
              <span className="text-xs sm:text-[13px] font-normal text-slate-500 font-sans whitespace-nowrap shrink-0 select-text">
                Rewards you&#39;ll love
              </span>

              {/* Continuous Running Marquee Track (exact unboxed style matching user reference) */}
              <div className="relative flex-1 overflow-hidden py-1 min-w-0">
                {/* Edge fade masks */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10" />

                {/* Running ticker ribbon */}
                <div className="flex items-center w-max animate-[marqueeContinuous_24s_linear_infinite] hover:[animation-play-state:paused]">
                  {marqueeRewards.map((reward, index) => (
                    <div
                      key={`${reward.line1}-${reward.line2}-${index}`}
                      className="flex items-center shrink-0"
                    >
                      {/* Reward item: thumbnail image + 2-line text (no container box, exact to reference) */}
                      <div className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer">
                        <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden bg-slate-100 shadow-2xs group-hover:scale-105 transition-transform shrink-0">
                          <Image
                            src={reward.image}
                            alt={`${reward.line1} ${reward.line2}`}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col text-xs sm:text-[13px] font-medium text-slate-700 leading-tight select-text">
                          <span>{reward.line1}</span>
                          <span>{reward.line2}</span>
                        </div>
                      </div>

                      {/* Brand Secondary #ff8c00 dot separator */}
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#ff8c00] mx-3 sm:mx-4.5 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* CTA Button matching brand color pattern: #ff8c00 secondary */}
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <button
                type="button"
                id="referral-cta-btn"
                onClick={() => {
                  setModalTab("form");
                  setIsModalOpen(true);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#ff8c00] hover:bg-[#e07b00] active:scale-[0.98] text-white text-sm sm:text-[15px] font-bold py-2.5 sm:py-3 px-8 sm:px-10 rounded-xl shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-200 cursor-pointer"
              >
                <span>Install App &amp; Start Earning</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setModalTab("form");
                  setIsModalOpen(true);
                }}
                className="text-xs sm:text-sm font-bold text-[#003a70] hover:text-[#ff8c00] flex items-center gap-1.5 transition-colors cursor-pointer select-text"
              >
                <span>Or Refer Online Instantly</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Interactive Referral Form Modal ("take the form and show in UI") */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-200 select-text">
            
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 transition-colors p-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Tabs: Quick Form vs App Install */}
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={() => setModalTab("form")}
                className={`text-xs sm:text-sm font-bold pb-1 px-2 border-b-2 transition-all cursor-pointer ${
                  modalTab === "form"
                    ? "border-[#ff8c00] text-[#003a70]"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                Instant Referral Form
              </button>
              <button
                type="button"
                onClick={() => setModalTab("app")}
                className={`text-xs sm:text-sm font-bold pb-1 px-2 border-b-2 transition-all cursor-pointer ${
                  modalTab === "app"
                    ? "border-[#ff8c00] text-[#003a70]"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                Download Mobile App
              </button>
            </div>

            {modalTab === "app" ? (
              /* Mobile App Download Info */
              <div className="py-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-[#003a70] mx-auto flex items-center justify-center mb-3">
                  <Smartphone className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-sans select-text">
                  Ajay Homes &amp; Estates Mobile App
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-500 max-w-sm mx-auto select-text">
                  Scan the QR code or click below to install the official mobile app and track rewards live on your phone.
                </p>

                <div className="my-6 p-4 bg-slate-50 rounded-xl border border-slate-200 inline-block">
                  <div className="w-36 h-36 bg-white rounded-lg p-2 border border-slate-300 mx-auto flex items-center justify-center shadow-xs">
                    <QrCode className="w-32 h-32 text-slate-800" />
                  </div>
                  <span className="block mt-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider select-text">
                    Scan for Android &amp; iOS
                  </span>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setModalTab("form")}
                    className="bg-[#003a70] hover:bg-[#00284d] text-white text-xs font-bold py-2.5 px-5 rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    Refer Online Instead
                  </button>
                </div>
              </div>
            ) : isSubmitted ? (
              /* Success Screen */
              <div className="py-8 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-sans select-text">
                  Referral Submitted Successfully!
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-sm select-text">
                  Thank you! Your friend has been registered and 5,000 reward points have been credited to your Ajay Homes account.
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#ff8c00] bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-full select-text">
                  <Gift className="w-4 h-4" />
                  <span>5,000 Points Added to Your Wallet</span>
                </div>
              </div>
            ) : (
              /* Referral Input Form */
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#ff8c00]/10 text-[#ff8c00] text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md select-text">
                    Exclusive Rewards Program
                  </span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-sans mt-2 select-text">
                  Refer a Friend &amp; Claim Rewards
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-5 select-text">
                  Enter your friend&#39;s details below. Once verified, you will receive your chosen vouchers and bonus credits.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1 select-text">
                      Friend&#39;s Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.friendName}
                      onChange={(e) => setFormData({ ...formData, friendName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-[#ff8c00] focus:ring-2 focus:ring-[#ff8c00]/20 outline-none transition-all select-text"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1 select-text">
                      Friend&#39;s Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.friendPhone}
                      onChange={(e) => setFormData({ ...formData, friendPhone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-[#ff8c00] focus:ring-2 focus:ring-[#ff8c00]/20 outline-none transition-all select-text"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1 select-text">
                      Service / Project of Interest
                    </label>
                    <select
                      value={formData.projectInterest}
                      onChange={(e) => setFormData({ ...formData, projectInterest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-[#ff8c00] focus:ring-2 focus:ring-[#ff8c00]/20 outline-none transition-all bg-white select-text"
                    >
                      <option value="Property Management Services">Property Management Services</option>
                      <option value="Custom Home Construction">Custom Home Construction</option>
                      <option value="Luxury Interior Designing">Luxury Interior Designing</option>
                      <option value="Layout &amp; Land Promotion">Layout &amp; Land Promotion</option>
                      <option value="Anna Nagar Luxury Residences">Anna Nagar Luxury Residences</option>
                      <option value="Nanavati Coastal Luxury Enclave">Nanavati Coastal Luxury Enclave</option>
                    </select>
                  </div>

                  <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1 select-text">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={formData.referrerName}
                        onChange={(e) => setFormData({ ...formData, referrerName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-[#ff8c00] focus:ring-2 focus:ring-[#ff8c00]/20 outline-none transition-all select-text"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1 select-text">
                        Your Mobile *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Your Mobile Number"
                        value={formData.referrerPhone}
                        onChange={(e) => setFormData({ ...formData, referrerPhone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-[#ff8c00] focus:ring-2 focus:ring-[#ff8c00]/20 outline-none transition-all select-text"
                      />
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full bg-[#ff8c00] hover:bg-[#e07b00] text-white text-sm font-bold py-3 px-6 rounded-xl shadow-md shadow-orange-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Submit Referral &amp; Claim Vouchers</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1 select-text">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% Privacy Protected &bull; Verified Reward Fulfillment</span>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes referralFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes marqueeContinuous {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}

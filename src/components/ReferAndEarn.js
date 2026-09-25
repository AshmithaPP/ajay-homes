"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Gem, UtensilsCrossed, Plane, Gift, ShoppingBag, Sofa } from "lucide-react";

const highlightServices = [
  "Property Management",
  "Construction",
  "Interior Designing",
  "Layout Promote",
  "Real Estate",
];

const rewards = [
  { title: "Gold &", sub: "Jewellery", icon: Gem, bg: "from-amber-100 to-yellow-300", color: "text-amber-700" },
  { title: "Food &", sub: "Restaurant", icon: UtensilsCrossed, bg: "from-orange-100 to-rose-200", color: "text-rose-600" },
  { title: "Travel &", sub: "Entertainment", icon: Plane, bg: "from-sky-100 to-emerald-200", color: "text-emerald-700" },
  { title: "Gift &", sub: "Hampers", icon: Gift, bg: "from-violet-100 to-fuchsia-200", color: "text-fuchsia-700" },
  { title: "Shopping", sub: "Vouchers", icon: ShoppingBag, bg: "from-pink-100 to-orange-200", color: "text-orange-700" },
  { title: "Home", sub: "Décor", icon: Sofa, bg: "from-stone-100 to-amber-200", color: "text-stone-700" },
];

function ReferIllustration() {
  return (
    <svg viewBox="0 0 330 300" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="walletBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFD86B" />
          <stop offset="55%" stopColor="#F5B42A" />
          <stop offset="100%" stopColor="#D9901A" />
        </linearGradient>
        <linearGradient id="walletFlap" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F0A726" />
          <stop offset="100%" stopColor="#FFCF55" />
        </linearGradient>
        <linearGradient id="cash" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7EE08F" />
          <stop offset="100%" stopColor="#2FA553" />
        </linearGradient>
        <linearGradient id="hoodie" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E3EEFB" />
          <stop offset="100%" stopColor="#A9CBF2" />
        </linearGradient>
        <radialGradient id="coin" cx="0.35" cy="0.35" r="0.7">
          <stop offset="0%" stopColor="#FFF1A8" />
          <stop offset="60%" stopColor="#F7C531" />
          <stop offset="100%" stopColor="#C98A0B" />
        </radialGradient>
      </defs>

      {/* Floating coins popping out of the wallet */}
      {[0, 1, 2].map((i) => (
        <g key={i} className="refer-coin" style={{ animationDelay: `${i * 1.1}s` }}>
          <circle cx={150 + i * 14} cy={95} r="9" fill="url(#coin)" stroke="#B97C08" strokeWidth="1" />
          <text x={150 + i * 14} y={99} textAnchor="middle" fontSize="10" fontWeight="700" fill="#8A5A00">
            ₹
          </text>
        </g>
      ))}

      {/* Cash bills fluttering behind the wallet */}
      <g className="refer-cash" style={{ transformOrigin: "160px 150px" }}>
        <rect x="128" y="62" width="44" height="92" rx="4" fill="url(#cash)" transform="rotate(-14 150 108)" />
        <rect x="150" y="56" width="44" height="96" rx="4" fill="url(#cash)" transform="rotate(8 172 104)" />
        <rect x="140" y="60" width="44" height="94" rx="4" fill="#4CC46C" />
        <circle cx="162" cy="98" r="10" fill="none" stroke="#E4FFE9" strokeWidth="2" />
        <line x1="146" y1="72" x2="178" y2="72" stroke="#E4FFE9" strokeWidth="2" opacity="0.7" />
      </g>
      {/* Pink card peeking out */}
      <rect x="118" y="100" width="40" height="54" rx="5" fill="#F07BB3" transform="rotate(-10 138 127)" />

      {/* Wallet */}
      <g className="refer-wallet" style={{ transformOrigin: "160px 260px" }}>
        <rect x="112" y="132" width="98" height="130" rx="14" fill="url(#walletBody)" />
        <rect x="112" y="132" width="98" height="130" rx="14" fill="none" stroke="#C88512" strokeWidth="1.5" opacity="0.5" />
        <path d="M150 176 h56 a8 8 0 0 1 8 8 v34 a8 8 0 0 1 -8 8 h-56 z" fill="url(#walletFlap)" stroke="#C88512" strokeWidth="1.5" />
        <circle cx="170" cy="201" r="8" fill="#3B2A1A" />
        <circle cx="170" cy="201" r="4" fill="#6B5237" />
        <path d="M122 142 v110" stroke="#FFE7A3" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      </g>

      {/* Woman (left) */}
      <g className="refer-bob" style={{ animationDelay: "0.4s" }}>
        {/* legs (crossed) */}
        <path d="M76 176 L84 278" stroke="#7FB2EA" strokeWidth="15" strokeLinecap="round" />
        <path d="M94 176 L68 276" stroke="#9CC4F0" strokeWidth="15" strokeLinecap="round" />
        <ellipse cx="88" cy="284" rx="13" ry="6" fill="#FFFFFF" stroke="#B9D3F3" strokeWidth="2" />
        <ellipse cx="64" cy="282" rx="13" ry="6" fill="#FFFFFF" stroke="#B9D3F3" strokeWidth="2" />
        {/* torso */}
        <path d="M60 106 Q84 96 106 106 L110 176 Q84 186 56 176 Z" fill="url(#hoodie)" />
        {/* arm leaning on wallet */}
        <path d="M104 114 Q118 132 126 150" stroke="#C7DCF6" strokeWidth="12" strokeLinecap="round" fill="none" />
        <circle cx="127" cy="152" r="6" fill="#F6CBA8" />
        {/* waving arm */}
        <g className="refer-wave" style={{ transformOrigin: "62px 112px" }}>
          <path d="M62 112 Q44 102 38 80" stroke="#C7DCF6" strokeWidth="12" strokeLinecap="round" fill="none" />
          <circle cx="37" cy="74" r="7" fill="#F6CBA8" />
        </g>
        {/* head */}
        <circle cx="84" cy="70" r="30" fill="#6B3E26" />
        <circle cx="62" cy="48" r="12" fill="#6B3E26" />
        <circle cx="84" cy="76" r="23" fill="#F6CBA8" />
        <path d="M61 70 Q70 50 96 56 Q104 60 107 70 Q96 60 80 62 Q68 64 61 70 Z" fill="#6B3E26" />
        <circle cx="75" cy="76" r="7" fill="#FFFFFF" fillOpacity="0.45" stroke="#8EBBEB" strokeWidth="3" />
        <circle cx="93" cy="76" r="7" fill="#FFFFFF" fillOpacity="0.45" stroke="#8EBBEB" strokeWidth="3" />
        <line x1="82" y1="76" x2="86" y2="76" stroke="#8EBBEB" strokeWidth="2.5" />
        <path d="M76 88 Q84 95 92 88" stroke="#8A4B2F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>

      {/* Man (right) */}
      <g className="refer-bob">
        <path d="M242 190 L234 282" stroke="#7FB2EA" strokeWidth="16" strokeLinecap="round" />
        <path d="M262 190 L270 282" stroke="#9CC4F0" strokeWidth="16" strokeLinecap="round" />
        <ellipse cx="230" cy="288" rx="14" ry="6" fill="#FFFFFF" stroke="#B9D3F3" strokeWidth="2" />
        <ellipse cx="274" cy="288" rx="14" ry="6" fill="#FFFFFF" stroke="#B9D3F3" strokeWidth="2" />
        <path d="M226 96 Q252 86 278 96 L282 192 Q252 202 222 192 Z" fill="url(#hoodie)" />
        {/* arm resting on wallet */}
        <path d="M228 106 Q214 124 206 142" stroke="#C7DCF6" strokeWidth="13" strokeLinecap="round" fill="none" />
        <circle cx="205" cy="146" r="7" fill="#F6CBA8" />
        {/* hand on hip */}
        <path d="M276 106 Q294 132 280 156" stroke="#C7DCF6" strokeWidth="13" strokeLinecap="round" fill="none" />
        {/* head */}
        <circle cx="252" cy="62" r="25" fill="#F6CBA8" />
        <path d="M226 58 Q224 30 246 26 L250 14 L258 26 Q282 26 280 56 Q272 40 252 42 Q236 42 226 58 Z" fill="#5A3420" />
        <circle cx="243" cy="64" r="7.5" fill="#FFFFFF" fillOpacity="0.45" stroke="#8EBBEB" strokeWidth="3" />
        <circle cx="262" cy="64" r="7.5" fill="#FFFFFF" fillOpacity="0.45" stroke="#8EBBEB" strokeWidth="3" />
        <line x1="250.5" y1="64" x2="254.5" y2="64" stroke="#8EBBEB" strokeWidth="2.5" />
        <path d="M242 76 Q252 85 262 76" stroke="#8A4B2F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>

      {/* Sparkles */}
      <path className="refer-sparkle" d="M300 40 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z" fill="#FFD60A" />
      <path className="refer-sparkle" style={{ animationDelay: "1s" }} d="M24 150 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2 z" fill="#FFB800" />
    </svg>
  );
}

export default function ReferAndEarn() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [serviceIdx, setServiceIdx] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setServiceIdx((i) => (i + 1) % highlightServices.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="referral" ref={sectionRef} className="w-full bg-[#f0f0f0] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 2xl:py-16">
      <div
        className={`relative mx-auto flex max-w-[92rem] flex-col overflow-hidden rounded-2xl bg-white md:flex-row 2xl:rounded-3xl transition-all duration-700 ease-out ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Left: animated illustration */}
        <div className="relative mx-auto h-[240px] w-full max-w-[360px] shrink-0 sm:h-[280px] md:mx-0 md:h-auto md:min-h-[295px] md:w-[300px] md:max-w-none lg:w-[340px] xl:min-h-[330px] xl:w-[380px] 2xl:min-h-[380px] 2xl:w-[440px] min-[1800px]:min-h-[420px] min-[1800px]:w-[500px]">
          <div className="absolute -bottom-[50%] -left-[15%] h-[110%] w-[115%] rounded-full bg-gradient-to-b from-[#FFF1BF] to-[#FFFBEA]" />
          <div
            className={`absolute inset-x-0 bottom-0 top-3 transition-all duration-1000 delay-200 ease-out ${
              visible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <ReferIllustration />
          </div>
          <span className="absolute left-0 top-4 z-10 rounded-r-full bg-[#2b2b2b] py-1.5 pl-4 pr-5 text-base font-bold sm:top-5 sm:pl-5 sm:text-lg 2xl:py-2 2xl:pl-6 2xl:pr-7 2xl:text-xl text-[#FFD60A]">
            Referral Exclusive
          </span>
        </div>

        {/* Right: content */}
        <div className="flex min-w-0 flex-1 flex-col justify-center px-5 pb-8 pt-4 text-center sm:px-8 md:py-7 md:pl-8 md:pr-8 md:text-left lg:pl-11 2xl:py-10 2xl:pl-16 2xl:pr-14">
          <h2 className="text-xl font-bold leading-snug text-[#2b2b2b] sm:text-2xl 2xl:text-[32px] min-[1800px]:text-4xl">
            <span className="inline-flex flex-wrap items-baseline justify-center gap-x-2 md:justify-start">
              <span>Refer a friend for</span>
              <span className="relative inline-block h-[1.35em] w-[19ch] max-w-full overflow-hidden align-bottom text-[24px] sm:text-[30px] 2xl:text-[40px] min-[1800px]:text-[46px]">
                {highlightServices.map((service, i) => (
                  <span
                    key={service}
                    className={`absolute left-0 top-0 w-full whitespace-nowrap text-center md:text-left bg-gradient-to-b from-[#E9C400] to-[#C9A200] bg-clip-text font-semibold text-transparent transition-all duration-500 ease-out ${
                      i === serviceIdx
                        ? "translate-y-0 opacity-100"
                        : i === (serviceIdx - 1 + highlightServices.length) % highlightServices.length
                        ? "-translate-y-full opacity-0"
                        : "translate-y-full opacity-0"
                    }`}
                  >
                    {service}
                  </span>
                ))}
              </span>
            </span>
            <br />
            &amp; Earn rewards.
          </h2>

          <p className="mt-3 text-[13px] text-[#555] sm:text-sm 2xl:mt-4 2xl:text-base min-[1800px]:text-lg">
            Refer a friend to any of our services &amp; earn rewards you&apos;ll be excited to redeem, only with Ajay
            Homes &amp; Estates.
          </p>

          {/* Rewards marquee */}
          <div className="mt-5 flex flex-col items-center gap-2 sm:flex-row md:mt-4 2xl:mt-6 2xl:gap-4">
            <span className="shrink-0 text-[13px] text-[#555] 2xl:text-base min-[1800px]:text-lg">Rewards you&apos;ll love</span>
            <div className="refer-marquee-mask relative w-full min-w-0 flex-1 overflow-hidden">
              <div className="refer-marquee flex w-max items-center">
                {[...rewards, ...rewards].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex shrink-0 items-center" aria-hidden={idx >= rewards.length}>
                      <div className="flex items-center gap-2 pl-2 pr-6 text-left 2xl:gap-3 2xl:pl-3 2xl:pr-8">
                        <div
                          className={`flex h-12 w-[60px] items-center 2xl:h-14 2xl:w-[72px] min-[1800px]:h-16 min-[1800px]:w-20 justify-center rounded-md bg-gradient-to-br ${item.bg}`}
                        >
                          <Icon className={`h-5 w-5 2xl:h-6 2xl:w-6 ${item.color}`} />
                        </div>
                        <div className="text-[13px] leading-6 text-[#555] 2xl:text-[15px] 2xl:leading-7 min-[1800px]:text-base">
                          {item.title}
                          <br />
                          {item.sub}
                        </div>
                      </div>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FFD60A]" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <Link
            href="#contact"
            className="refer-cta group relative mx-auto mt-6 inline-flex h-11 w-full max-w-[373px] items-center justify-center overflow-hidden rounded-md bg-[#FFD60A] text-[13px] md:mx-0 2xl:mt-8 2xl:h-14 2xl:max-w-[440px] 2xl:rounded-lg 2xl:text-base font-bold text-[#2b2b2b] transition-colors hover:bg-[#F5C900]"
          >
            <span className="relative z-10">Refer a Friend &amp; Start Earning</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

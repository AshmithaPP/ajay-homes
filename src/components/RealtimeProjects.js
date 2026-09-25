"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowLeft, ArrowRight, ArrowUpRight, ShieldCheck, MapPin, CheckCircle2 } from "lucide-react";

function StatusChip({ proj }) {
  const delivered = proj.status === "Delivered";
  return (
    <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-md bg-white/95 px-2 py-1 text-[11px] font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
      <span className={`h-1.5 w-1.5 rounded-full ${delivered ? "bg-emerald-500" : "bg-amber-500"}`} />
      {proj.status} · {proj.year}
    </span>
  );
}

function ProjectCardBody({ proj }) {
  const specs = [
    { label: "Configuration", value: proj.config },
    { label: "Built-up Area", value: proj.area },
    { label: "Floors", value: proj.floors },
  ];
  return (
    <div className="p-4 2xl:p-5 flex flex-col flex-1">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#008ba3]">{proj.type}</p>
      <h4 className="mt-1 text-[13px] sm:text-sm 2xl:text-[15px] font-bold text-slate-800 leading-snug line-clamp-2 font-sans">
        {proj.title}
      </h4>
      <p className="mt-1 flex items-center gap-1 text-xs 2xl:text-[13px] text-slate-500 font-sans">
        <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
        <span className="truncate">{proj.location}</span>
      </p>

      {/* Key specs */}
      <dl className="mt-3.5 grid grid-cols-3 divide-x divide-slate-200 border-y border-slate-100 py-2.5">
        {specs.map(({ label, value }, i) => (
          <div key={label} className={`min-w-0 ${i === 0 ? "pr-2" : "px-2"}`}>
            <dt className="truncate text-[10px] 2xl:text-[11px] text-slate-500">{label}</dt>
            <dd className="mt-0.5 truncate text-xs 2xl:text-[13px] font-semibold text-slate-800">{value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-3 text-xs 2xl:text-[13px] leading-relaxed text-slate-600 line-clamp-2 font-sans">
        {proj.description}
      </p>

      {/* Footer: Google rating + details link, pinned to the bottom */}
      <div className="mt-auto pt-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-[12px]">
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <div className="flex text-amber-400 text-[11px] tracking-tighter ml-0.5">{"★★★★★"}</div>
          <span className="font-bold text-slate-700 ml-1">{proj.rating}</span>
        </div>
        <Link
          href="#contact"
          className="group/link inline-flex items-center gap-0.5 text-xs 2xl:text-[13px] font-semibold text-[#008ba3] hover:text-[#005f70] transition-colors"
        >
          View details
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}

// Number of full card columns that fit in the carousel viewport.
// Cards are sized from the measured width so no card is ever cut off at the edge.
function getColumns(width) {
  if (width < 600) return 1;
  if (width < 960) return 2;
  if (width < 1240) return 3;
  if (width < 1560) return 4;
  return 5;
}

export default function RealtimeProjects() {
  const [activeLocation, setActiveLocation] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const [layout, setLayout] = useState({ cols: 5, colW: 300, gap: 24 });

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const measure = () => {
      const width = el.clientWidth;
      const cols = getColumns(width);
      const gap = width < 640 ? 16 : 24;
      const colW = cols === 1 ? width * 0.86 : (width - gap * (cols - 1)) / cols;
      setLayout({ cols, gap, colW });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { cols, colW, gap } = layout;
  // The blue banner spans two columns on wider screens, one on phones
  const bannerSpan = cols >= 2 ? 2 : 1;
  const bannerW = bannerSpan * colW + (bannerSpan - 1) * gap;
  const isStacked = bannerSpan === 1;
  const imgH = Math.round(Math.min(colW * 0.82, 340));
  const step = colW + gap;

  // Banner copy: inside the carousel on tablets/desktops, above it (static) on phones
  const bannerIntro = (
        <div className="flex-1 text-left flex flex-col justify-between py-1">
          <div>
            <h3 className="text-2xl sm:text-3xl 2xl:text-[34px] font-bold tracking-tight text-white font-sans leading-tight">
              Our Landmark Network
            </h3>
            <p className="mt-3 text-xs sm:text-[13px] 2xl:text-[15px] text-white/90 leading-relaxed font-sans max-w-[340px]">
              Ajay Homes &amp; Estates is South India&#39;s premier builder with 150+ architectural landmarks delivered across Chennai.
            </p>

            {/* Rich Content & Trust Highlights filling empty space */}
            <div className="mt-5 pt-5 border-t border-white/15 space-y-3">
              <div className="flex items-center gap-2 text-xs sm:text-[12.5px] 2xl:text-sm text-white/90 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#ff8c00] shrink-0" />
                <span>150+ Luxury Residences &amp; Enclaves</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-[12.5px] 2xl:text-sm text-white/90 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#ff8c00] shrink-0" />
                <span>100% CMDA &amp; RERA Approved Titles</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-[12.5px] 2xl:text-sm text-white/90 font-medium">
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
  );

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
      type: "Luxury Residence",
      status: "Delivered",
      year: "2023",
      config: "4 BHK",
      area: "5,800 sq.ft",
      floors: "G + 3",
      description: "Signature perforated facade, private terrace garden and Italian marble interiors.",
    },
    {
      id: "anna-emerald",
      title: "Emerald Heights Garden Residence",
      location: "2nd Avenue, Anna Nagar",
      locationTag: "anna-nagar",
      image: "/assets/img/img-006.jpeg",
      rating: "4.8",
      type: "Independent Villa",
      status: "Delivered",
      year: "2022",
      config: "4 BHK",
      area: "5,200 sq.ft",
      floors: "G + 3",
      description: "Terracotta-clad villa with planter balconies and a landscaped roof deck.",
    },
    {
      id: "anna-skyline",
      title: "Skyline Glass Corner Villa",
      location: "Shanthi Colony, Anna Nagar",
      locationTag: "anna-nagar",
      image: "/assets/img/img-007.jpeg",
      rating: "4.8",
      type: "Contemporary Villa",
      status: "Delivered",
      year: "2021",
      config: "5 BHK",
      area: "6,100 sq.ft",
      floors: "G + 3",
      description: "Glazed corner elevation flooding every level with natural light.",
    },
    {
      id: "anna-twin",
      title: "Twin Crest Residences",
      location: "AA Block, Anna Nagar",
      locationTag: "anna-nagar",
      image: "/assets/img/img-008.jpeg",
      rating: "4.7",
      type: "Twin Villas",
      status: "Delivered",
      year: "2020",
      config: "2 x 4 BHK",
      area: "8,400 sq.ft",
      floors: "G + 2",
      description: "Mirror-image family villas sharing a private landscaped driveway.",
    },
    {
      id: "anna-terrace",
      title: "Terrace Garden Residence",
      location: "Anna Nagar West",
      locationTag: "anna-nagar",
      image: "/assets/img/img-009.jpeg",
      rating: "4.9",
      type: "Luxury Residence",
      status: "Ongoing",
      year: "2026",
      config: "5 BHK",
      area: "6,600 sq.ft",
      floors: "G + 3",
      description: "Cascading cantilevered terraces with lush sky gardens on every floor.",
    },
    {
      id: "anna-corporate",
      title: "Ajay Corporate Tower",
      location: "Roundtana, Anna Nagar",
      locationTag: "anna-nagar",
      image: "/assets/img/img-004.jpeg",
      rating: "4.8",
      type: "Commercial Building",
      status: "Delivered",
      year: "2019",
      config: "Office Space",
      area: "32,000 sq.ft",
      floors: "G + 5",
      description: "Glass-fronted corporate address with basement parking and high-speed lifts.",
    },
    {
      id: "besant-oceanfront",
      title: "Nanavati Coastal Super Luxury Residence",
      location: "Beach Road, Besant Nagar",
      locationTag: "besant-nagar",
      image: "/assets/img/besantnagar-residence-view/img19.jpg",
      rating: "4.9",
      type: "Coastal Villa",
      status: "Delivered",
      year: "2022",
      config: "5 BHK",
      area: "7,200 sq.ft",
      floors: "G + 2",
      description: "Neo-classical sea-facing villa with landscaped courtyards and a rooftop lounge.",
    },
    {
      id: "besant-heritage",
      title: "Heritage Classic Villa",
      location: "Elliot's Beach Road, Besant Nagar",
      locationTag: "besant-nagar",
      image: "/assets/img/besantnagar-residence-view/img26.jpg",
      rating: "4.9",
      type: "Classic Villa",
      status: "Delivered",
      year: "2023",
      config: "5 BHK",
      area: "6,900 sq.ft",
      floors: "G + 2",
      description: "Stone-clad classical elevation with pergola terraces and a formal lawn.",
    },
    {
      id: "besant-greenleaf",
      title: "Greenleaf Proposed Residence",
      location: "6th Avenue, Besant Nagar",
      locationTag: "besant-nagar",
      image: "/assets/img/img-002.jpeg",
      rating: "4.8",
      type: "Luxury Residence",
      status: "Ongoing",
      year: "2026",
      config: "4 BHK",
      area: "5,600 sq.ft",
      floors: "G + 3",
      description: "Vertical garden screens and timber louvres wrapped around a modern frame.",
    },
    {
      id: "besant-cedar",
      title: "Cedar Wood Residence",
      location: "Kalakshetra Colony, Besant Nagar",
      locationTag: "besant-nagar",
      image: "/assets/img/img-012.jpeg",
      rating: "4.8",
      type: "Contemporary Villa",
      status: "Delivered",
      year: "2021",
      config: "4 BHK",
      area: "4,800 sq.ft",
      floors: "G + 2",
      description: "Warm cedar cladding paired with exposed concrete and glass balconies.",
    },
    {
      id: "besant-pearl",
      title: "Pearl Neo-Classical Villa",
      location: "3rd Main Road, Besant Nagar",
      locationTag: "besant-nagar",
      image: "/assets/img/img-014.jpeg",
      rating: "4.9",
      type: "Classic Villa",
      status: "Delivered",
      year: "2024",
      config: "5 BHK",
      area: "7,000 sq.ft",
      floors: "G + 2",
      description: "Symmetrical neo-classical facade with ornate mouldings and a porte-cochere.",
    },
    {
      id: "besant-seabreeze",
      title: "Seabreeze Premium Apartments",
      location: "4th Avenue, Besant Nagar",
      locationTag: "besant-nagar",
      image: "/assets/img/img-013.jpeg",
      rating: "4.7",
      type: "Luxury Apartments",
      status: "Delivered",
      year: "2020",
      config: "3 & 4 BHK",
      area: "2,400 sq.ft",
      floors: "Stilt + 4",
      description: "Boutique apartments with wide balconies, a short walk from the beach.",
    },
    {
      id: "suresh-boat-club",
      title: "Suresh Boat Club Super Speciality Manor",
      location: "Boat Club Road, Adyar",
      locationTag: "adyar",
      image: "/assets/img/suresh-residence-view/img17.jpg",
      rating: "4.8",
      type: "Contemporary Manor",
      status: "Delivered",
      year: "2021",
      config: "4 BHK",
      area: "6,400 sq.ft",
      floors: "G + 2",
      description: "Pergola-shaded terraces, timber cladding and a double-height living atrium.",
    },
    {
      id: "shastri-nagar",
      title: "Shasthri Nagar Premium Residences",
      location: "1st Cross Street, Shastri Nagar, Adyar",
      locationTag: "adyar",
      image: "/assets/img/shasthri-nagar-adyar/img64.jpg",
      rating: "4.8",
      type: "Luxury Apartments",
      status: "Delivered",
      year: "2023",
      config: "3 BHK",
      area: "2,150 sq.ft",
      floors: "Stilt + 4",
      description: "Timber-framed balconies and green edges on a quiet residential street.",
    },
    {
      id: "adyar-luminaire",
      title: "Luminaire Night-Lit Residences",
      location: "Shastri Nagar, Adyar",
      locationTag: "adyar",
      image: "/assets/img/shasthri-nagar-adyar/img79.jpg",
      rating: "4.9",
      type: "Luxury Apartments",
      status: "Ongoing",
      year: "2026",
      config: "3 & 4 BHK",
      area: "2,600 sq.ft",
      floors: "Stilt + 5",
      description: "Architectural lighting and floor-to-ceiling glazing for every home.",
    },
    {
      id: "adyar-regal",
      title: "Regal Boat Club Enclave",
      location: "Boat Club Avenue, Adyar",
      locationTag: "adyar",
      image: "/assets/img/shasthri-nagar-adyar/img72.jpg",
      rating: "4.8",
      type: "Premium Enclave",
      status: "Ongoing",
      year: "2025",
      config: "4 BHK",
      area: "3,200 sq.ft",
      floors: "Stilt + 4",
      description: "Limited-edition enclave of four residences on Chennai's finest avenue.",
    },
    {
      id: "adyar-canal",
      title: "Canal View Residence",
      location: "Gandhi Nagar, Adyar",
      locationTag: "adyar",
      image: "/assets/img/img-015.jpeg",
      rating: "4.7",
      type: "Independent Villa",
      status: "Delivered",
      year: "2020",
      config: "4 BHK",
      area: "4,600 sq.ft",
      floors: "G + 3",
      description: "Stone and timber composition with deep shaded windows facing the canal.",
    },
    {
      id: "adyar-kasturba",
      title: "Kasturba Modern Villa",
      location: "Kasturba Nagar, Adyar",
      locationTag: "adyar",
      image: "/assets/img/img-011.jpeg",
      rating: "4.8",
      type: "Contemporary Villa",
      status: "Delivered",
      year: "2022",
      config: "5 BHK",
      area: "6,200 sq.ft",
      floors: "G + 2",
      description: "Crisp white volumes with a glass pergola roof and a private garden.",
    },
    {
      id: "ankan-coastal",
      title: "Ankan Oceanfront Super Speciality Villa",
      location: "Akkarai Golden Beach, ECR",
      locationTag: "ecr",
      image: "/assets/img/ankan-resideance-view/img13.jpg",
      rating: "4.9",
      type: "Beach Villa",
      status: "Delivered",
      year: "2020",
      config: "4 BHK",
      area: "4,900 sq.ft",
      floors: "G + 1",
      description: "Breezy beach-side retreat with open verandas steps from Golden Beach.",
    },
    {
      id: "ecr-palm-grove",
      title: "Palm Grove Coastal Villa",
      location: "Injambakkam, ECR",
      locationTag: "ecr",
      image: "/assets/img/ankan-resideance-view/img26.jpg",
      rating: "4.8",
      type: "Beach Villa",
      status: "Delivered",
      year: "2022",
      config: "4 BHK",
      area: "5,100 sq.ft",
      floors: "G + 1",
      description: "Low-slung coastal villa framed by coconut palms and a gated forecourt.",
    },
    {
      id: "ecr-sunset",
      title: "Sunset Bay Residence",
      location: "Neelankarai, ECR",
      locationTag: "ecr",
      image: "/assets/img/ankan-resideance-view/img29.jpg",
      rating: "4.8",
      type: "Coastal Villa",
      status: "Delivered",
      year: "2023",
      config: "4 BHK",
      area: "5,400 sq.ft",
      floors: "G + 1",
      description: "Sea-breeze planning with shaded sit-outs and a landscaped side garden.",
    },
    {
      id: "ecr-coastal",
      title: "ECR Beachfront Super Luxury Enclave",
      location: "Uthandi, ECR",
      locationTag: "ecr",
      image: "/assets/img/img-010.jpeg",
      rating: "4.9",
      type: "Beachfront Enclave",
      status: "Ongoing",
      year: "2026",
      config: "4 & 5 BHK",
      area: "8,500 sq.ft",
      floors: "G + 1",
      description: "Resort-style villas with sloping timber roofs and private pools.",
    },
    {
      id: "ecr-wave",
      title: "Wave Pavilion Residence",
      location: "Muttukadu, ECR",
      locationTag: "ecr",
      image: "/assets/img/img-003.jpeg",
      rating: "4.9",
      type: "Signature Villa",
      status: "Ongoing",
      year: "2027",
      config: "5 BHK",
      area: "9,200 sq.ft",
      floors: "G + 2",
      description: "Sculpted flowing roof forms inspired by the waves of the Bay of Bengal.",
    },
    {
      id: "ecr-brick-court",
      title: "R3 Brick Courtyard Villa",
      location: "Kanathur, ECR",
      locationTag: "ecr",
      image: "/assets/img/r3-brc-views/img4.jpg",
      rating: "4.8",
      type: "Courtyard Villa",
      status: "Delivered",
      year: "2024",
      config: "4 BHK",
      area: "5,000 sq.ft",
      floors: "G + 1",
      description: "Exposed-brick courtyard home with a grand pillared car porch.",
    },
    {
      id: "raman-prestige",
      title: "Raman Prestige Super Automated Villa",
      location: "IT Expressway Corridor, OMR",
      locationTag: "omr",
      image: "/assets/img/raman-residence-view/img39.jpg",
      rating: "4.8",
      type: "Smart Villa",
      status: "Delivered",
      year: "2024",
      config: "5 BHK",
      area: "6,800 sq.ft",
      floors: "G + 3",
      description: "Fully automated home with IoT climate control and biometric security.",
    },
    {
      id: "omr-cascade",
      title: "Cascade Terrace Residence",
      location: "Thoraipakkam, OMR",
      locationTag: "omr",
      image: "/assets/img/raman-residence-view/img44.jpg",
      rating: "4.8",
      type: "Contemporary Villa",
      status: "Delivered",
      year: "2023",
      config: "4 BHK",
      area: "5,300 sq.ft",
      floors: "G + 3",
      description: "Staggered terracotta volumes with cascading landscaped balconies.",
    },
    {
      id: "omr-terracotta",
      title: "Terracotta Loft Villa",
      location: "Sholinganallur, OMR",
      locationTag: "omr",
      image: "/assets/img/r3-brc-views/img12.jpg",
      rating: "4.7",
      type: "Independent Villa",
      status: "Delivered",
      year: "2022",
      config: "4 BHK",
      area: "4,700 sq.ft",
      floors: "G + 2",
      description: "Brick and timber loft-style home with a sheltered rooftop pavilion.",
    },
    {
      id: "omr-heritage",
      title: "Heritage Brick Residence",
      location: "Navalur, OMR",
      locationTag: "omr",
      image: "/assets/img/r3-brc-views/img20.jpg",
      rating: "4.8",
      type: "Courtyard Villa",
      status: "Ongoing",
      year: "2025",
      config: "5 BHK",
      area: "5,900 sq.ft",
      floors: "G + 2",
      description: "Tiled pitched roofs and exposed brick reinterpreting Chettinad heritage.",
    },
    {
      id: "omr-tech-park",
      title: "Ajay Tech Park",
      location: "Perungudi, OMR",
      locationTag: "omr",
      image: "/assets/img/img-046.jpeg",
      rating: "4.7",
      type: "Commercial Building",
      status: "Delivered",
      year: "2021",
      config: "IT Office Space",
      area: "48,000 sq.ft",
      floors: "G + 7",
      description: "Grade-A tech workspace with column-free floor plates and power backup.",
    },
    {
      id: "omr-business-square",
      title: "Ajay Business Square",
      location: "Karapakkam, OMR",
      locationTag: "omr",
      image: "/assets/img/img-047.jpeg",
      rating: "4.7",
      type: "Commercial Building",
      status: "Ongoing",
      year: "2026",
      config: "Office & Retail",
      area: "56,000 sq.ft",
      floors: "G + 8",
      description: "Mixed-use business address with retail podium and rooftop amenities.",
    },
    {
      id: "natraj-royal",
      title: "Natraj Royal Super Speciality Residence",
      location: "Grand Southern Trunk, Velachery",
      locationTag: "velachery",
      image: "/assets/img/r3-brc-views/img29.jpg",
      rating: "4.9",
      type: "Luxury Residence",
      status: "Delivered",
      year: "2024",
      config: "4 BHK",
      area: "5,200 sq.ft",
      floors: "G + 2",
      description: "Biophilic courtyards with natural ventilation and bespoke woodwork.",
    },
    {
      id: "vel-cube",
      title: "Cube Contemporary Residence",
      location: "Vijaya Nagar, Velachery",
      locationTag: "velachery",
      image: "/assets/img/raman-residence-view/img41.jpg",
      rating: "4.8",
      type: "Contemporary Villa",
      status: "Delivered",
      year: "2023",
      config: "4 BHK",
      area: "4,900 sq.ft",
      floors: "G + 3",
      description: "Interlocking cubic volumes with timber soffits and deep balconies.",
    },
    {
      id: "vel-urban-edge",
      title: "Urban Edge Residence",
      location: "Taramani Link Road, Velachery",
      locationTag: "velachery",
      image: "/assets/img/raman-residence-view/img40.jpg",
      rating: "4.7",
      type: "Independent Villa",
      status: "Ongoing",
      year: "2025",
      config: "4 BHK",
      area: "4,500 sq.ft",
      floors: "G + 3",
      description: "Compact city villa maximising light, privacy and green terraces.",
    },
    {
      id: "vel-lakeview",
      title: "Lakeview Classic Residence",
      location: "Velachery Main Road",
      locationTag: "velachery",
      image: "/assets/img/img-060.jpeg",
      rating: "4.7",
      type: "Classic Villa",
      status: "Delivered",
      year: "2019",
      config: "4 BHK",
      area: "4,200 sq.ft",
      floors: "G + 2",
      description: "Classical columns and balustrades overlooking Velachery Lake.",
    },
    {
      id: "vel-serene",
      title: "Serene Living Interiors",
      location: "Ram Nagar, Velachery",
      locationTag: "velachery",
      image: "/assets/img/natraj-residence/img74.jpg",
      rating: "4.9",
      type: "Interior Project",
      status: "Delivered",
      year: "2024",
      config: "4 BHK",
      area: "3,800 sq.ft",
      floors: "Full Home",
      description: "Turnkey interiors with warm neutrals, stone accents and bespoke joinery.",
    },
    {
      id: "vel-atrium",
      title: "Grand Atrium Interiors",
      location: "Velachery Bypass Road",
      locationTag: "velachery",
      image: "/assets/img/besantnagar-residence-view/img82.jpg",
      rating: "4.8",
      type: "Interior Project",
      status: "Delivered",
      year: "2025",
      config: "5 BHK",
      area: "4,600 sq.ft",
      floors: "Full Home",
      description: "Double-height atrium living with a sculptural staircase and marble finishes.",
    },
  ];

  const filteredProjects =
    activeLocation === "all"
      ? projects
      : projects.filter((p) => p.locationTag === activeLocation);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -step, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: step, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`relative w-full bg-white pt-8 sm:pt-10 lg:pt-12 pb-10 sm:pb-12 lg:pb-16 text-slate-900 overflow-hidden border-t border-slate-100 transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="mx-auto w-full max-w-[1720px] px-4 sm:px-6 lg:px-8">
        
        {/* Top Controls: Location Tabs on Left & Carousel Arrows on Right */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-slate-200 pb-2.5 mb-6 sm:mb-8">
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
                  onClick={() => {
                    setActiveLocation(loc.id);
                    carouselRef.current?.scrollTo({ left: 0 });
                  }}
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

        {/* Phones: banner sits above the carousel so only the project cards scroll */}
        {isStacked && (
          <div
            className={`mb-5 rounded-2xl bg-[#003a70] p-5 text-white shadow-xl transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {bannerIntro}
          </div>
        )}

        {/* Horizontal Carousel Track (Cards fit fully without cut-off, NO scrollbar) */}
        <div className="relative">
          <div
            ref={carouselRef}
            className={`flex items-stretch overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-2 no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
            style={{
              gap: `${gap}px`,
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {/* The Left Blue Banner Card enclosing Text, Rich Metrics, and Card 1 (tablet/desktop) */}
            {!isStacked && (
            <div
              style={{ width: `${bannerW}px` }}
              className={`snap-start shrink-0 rounded-2xl sm:rounded-3xl bg-[#003a70] p-5 sm:p-7 2xl:p-8 text-white flex items-stretch justify-between gap-5 sm:gap-6 shadow-xl transition-all duration-700 ease-out ${
                isStacked ? "flex-col" : "flex-row"
              } ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
            >
              {bannerIntro}

              {/* Card 1 embedded inside the blue banner */}
              {filteredProjects[0] && (
                <div
                  style={{ width: isStacked ? "100%" : `${colW - 28}px` }}
                  className="shrink-0 rounded-2xl bg-white shadow-xl border border-slate-100 text-slate-900 flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  {/* Top flush image */}
                  <div
                    className="relative flex-1 w-full overflow-hidden bg-slate-100"
                    style={{ minHeight: `${isStacked ? imgH : 170}px` }}
                  >
                    <Image
                      src={filteredProjects[0].image}
                      alt={filteredProjects[0].title}
                      fill
                      sizes="(max-width: 640px) 100vw, 400px"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <StatusChip proj={filteredProjects[0]} />
                  </div>

                  {/* Card Content: title, location, specs, description, rating */}
                  <ProjectCardBody proj={filteredProjects[0]} />
                </div>
              )}
            </div>
            )}

            {/* Remaining Cards Row (Card 2, 3, 4, 5, 6...) sized to fit cleanly without cut-off */}
            {filteredProjects.slice(isStacked ? 0 : 1).map((proj, idx) => (
              <div
                key={proj.id}
                style={{
                  width: `${colW}px`,
                  transitionDelay: `${(idx + 1) * 80}ms`,
                }}
                className={`snap-start shrink-0 rounded-2xl bg-white shadow-md border border-slate-200/90 text-slate-900 flex flex-col overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                {/* Top flush image */}
                <div className="relative w-full shrink-0 overflow-hidden bg-slate-100" style={{ height: `${imgH}px` }}>
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 400px"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <StatusChip proj={proj} />
                </div>

                {/* Card Content: title, location, specs, description, rating */}
                <ProjectCardBody proj={proj} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

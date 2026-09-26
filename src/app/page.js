import Navbar from "@/components/Navbar";
import HeroScrollConstruction from "@/components/HeroScrollConstruction";
import EverythingOnePlace from "@/components/EverythingOnePlace";
import Spotlight from "@/components/Spotlight";
import SignatureLivingShowcase from "@/components/SignatureLivingShowcase";
import RealtimeProjects from "@/components/RealtimeProjects";
import HowWeGotHere from "@/components/HowWeGotHere";
import UnsurpassedLegacy from "@/components/UnsurpassedLegacy";
import HappyClients from "@/components/HappyClients";
import ReferralRewardBanner from "@/components/ReferralRewardBanner";
import ConsultationPopup from "@/components/ConsultationPopup";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white text-slate-900">
      {/* Navigation Header */}
      <Navbar />

      {/* Hero Section with Interactive Scroll-Driven Construction Animation */}
      <HeroScrollConstruction />

      {/* 2nd Section: Everything you Need at One Place */}
      <EverythingOnePlace />

      {/* 3rd Section: Nike-Inspired Iconic Architectural Spotlight Showcase */}
      <Spotlight />

      {/* 4th Section: Signature Living Showcase with Scroll-Driven Emergent Projects */}
      <SignatureLivingShowcase />

      {/* Realtime Client Projects Showcase */}
      <RealtimeProjects />

      {/* 5th Section: How we got here? Interactive Timeline Showcase */}
      <HowWeGotHere />

      {/* 6th Section: A Legacy Built Over 60 Years (1966 - today) milestone timeline */}
      <UnsurpassedLegacy />

      {/* Happy Clients: customer testimonials mosaic */}
      <HappyClients />

      {/* Build with Confidence: projects & services banner (last section before the footer) */}
      <ReferralRewardBanner />

      {/* Footer */}
      <Footer />

      {/* Free consultation popup: opens once per session after the visitor reaches the footer */}
      <ConsultationPopup />
    </main>
  );
}

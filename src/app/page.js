import Navbar from "@/components/Navbar";
import HeroScrollConstruction from "@/components/HeroScrollConstruction";
import EverythingOnePlace from "@/components/EverythingOnePlace";
import SignatureLivingShowcase from "@/components/SignatureLivingShowcase";
import RealtimeProjects from "@/components/RealtimeProjects";
import HowWeGotHere from "@/components/HowWeGotHere";
import UnsurpassedLegacy from "@/components/UnsurpassedLegacy";
import ReferralRewardBanner from "@/components/ReferralRewardBanner";
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

      {/* 3rd Section: Signature Living Showcase with Scroll-Driven Emergent Projects */}
      <SignatureLivingShowcase />

      {/* Realtime Client Projects Showcase */}
      <RealtimeProjects />

      {/* 5th Section: How we got here? Interactive Timeline Showcase */}
      <HowWeGotHere />

      {/* 6th Section: An Unsurpassed Legacy of Leadership (1996 - 2026) */}
      <UnsurpassedLegacy />

      {/* Refer a Friend & Earn Rewards Banner (Replica of Reference UI) */}
      <ReferralRewardBanner />

      {/* Footer */}
      <Footer />
    </main>
  );
}

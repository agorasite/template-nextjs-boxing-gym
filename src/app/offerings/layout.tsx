// src/app/pricing/layout.tsx
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OfferingsHero from "@/components/offerings/OfferingsHero";

export const metadata = {
  title: "Pricing & Offerings — Boxing Gym",
  description: "Membership pricing and offerings plans for our Boxing Gym.",
};

export default function PricingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-svh bg-white text-[var(--brand-black)]">
      {/* Header */}
      <Navbar />
      <OfferingsHero/>
      {/* Page content */}
      {children}

      {/* Footer */}
      <Footer />
    </div>
  );
}

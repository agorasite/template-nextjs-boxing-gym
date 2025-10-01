// src/app/pricing/layout.tsx
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JoinUsHero from '@/components/joinus/JoinUsHero';

export const metadata = {
  title: "Pricing — Boxing Gym",
  description: "Membership pricing and plans for our Boxing Gym.",
};

export default function PricingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-svh bg-white text-[var(--brand-black)]">
      {/* Header */}
      <Navbar />    
      <JoinUsHero />
      {/* Page content */}
      {children}

      {/* Footer */}
      <Footer />
    </div>
  );
}

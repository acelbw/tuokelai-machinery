import { HeroSection } from "@/components/sections/home/HeroSection";
import { TrustBar } from "@/components/sections/home/TrustBar";
import { FeaturedProducts } from "@/components/sections/home/FeaturedProducts";
import { WhyUs } from "@/components/sections/home/WhyUs";
import { CTASection } from "@/components/sections/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <FeaturedProducts />
      <WhyUs />
      <CTASection />
    </>
  );
}

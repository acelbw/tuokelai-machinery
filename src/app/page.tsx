import { HeroSection } from "@/components/sections/home/HeroSection";
import { TrustBar } from "@/components/sections/home/TrustBar";
import { FeaturedProducts } from "@/components/sections/home/FeaturedProducts";
import { DeliveryCases } from "@/components/sections/home/DeliveryCases";
import { Partners } from "@/components/sections/home/Partners";
import { WhyUs } from "@/components/sections/home/WhyUs";
import { CTASection } from "@/components/sections/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <FeaturedProducts />
      <DeliveryCases />
      <WhyUs />
      <Partners />
      <CTASection />
    </>
  );
}

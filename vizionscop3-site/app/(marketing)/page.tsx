import { CTABlock } from "@/components/sections/CTABlock";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { FounderBlock } from "@/components/sections/FounderBlock";
import { FounderIdentityStrip } from "@/components/sections/FounderIdentityStrip";
import { Hero } from "@/components/sections/Hero";
import { LiveBuildTicker } from "@/components/sections/LiveBuildTicker";
import { MethodSection } from "@/components/sections/MethodSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";

export default function HomePage() {
  return (
    <>
      <LiveBuildTicker />
      <Hero />
      <FounderIdentityStrip />
      <FeaturedWork />
      <ServicesGrid />
      <MethodSection />
      <FounderBlock />
      <CTABlock />
    </>
  );
}

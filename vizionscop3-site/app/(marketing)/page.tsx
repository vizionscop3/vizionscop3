import {
  Hero,
  ValueProposition,
  ServicesOverview,
  FeaturedWork,
  WhoWeServe,
  Methodology,
  SocialProof,
  InsightsPreview,
  CTASection,
} from "@/components/sections";
import { generateOrganizationJsonLd } from "@/lib/seo";

export default function HomePage() {
  const organizationJsonLd = generateOrganizationJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <Hero />
      <ValueProposition />
      <ServicesOverview />
      <FeaturedWork />
      <WhoWeServe />
      <Methodology />
      <SocialProof />
      <InsightsPreview />
      <CTASection />
    </>
  );
}

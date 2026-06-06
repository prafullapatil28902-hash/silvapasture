import Preloader from "@/components/layout/Preloader";
import {
  HeroCinematic,
  DisappearingWorld,
  EcosystemMap,
  JourneyOfJar,
  CinematicQuote,
  ImpactDashboard,
  ProductReveal,
  Traceability,
  FoundersCircle,
  JournalPreview,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Preloader />
      <HeroCinematic />
      <DisappearingWorld />
      <EcosystemMap />
      <JourneyOfJar />
      <CinematicQuote />
      <ImpactDashboard />
      <ProductReveal />
      <Traceability />
      <FoundersCircle />
      <JournalPreview />
    </>
  );
}

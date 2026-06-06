import Preloader from "@/components/layout/Preloader";
import {
  HeroCinematic,
  DisappearingWorld,
  EcosystemMap,
  AdoptACow,
  JourneyOfJar,
  CinematicQuote,
  ImpactDashboard,
  ProductReveal,
  Traceability,
  TheArrival,
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
      <AdoptACow />
      <JourneyOfJar />
      <CinematicQuote />
      <ImpactDashboard />
      <ProductReveal />
      <Traceability />
      <TheArrival />
      <FoundersCircle />
      <JournalPreview />
    </>
  );
}

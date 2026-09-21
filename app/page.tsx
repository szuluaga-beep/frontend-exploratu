import {
  CallToAction,
  Footer,
  HeroSection,
  HowItWorksGuide,
  HowItWorksTourist,
  WhyChooseUs,
} from "@/components/landing";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowItWorksTourist />
      <HowItWorksGuide />
      <WhyChooseUs />
      <CallToAction />
      <Footer />
    </main>
  );
}

import HeroSection from "@/components/HeroSection/HeroSection";
import Testimonials from "@/components/Testimonials/Testimonials";
import MeetOurTeam from "@/components/MeetOurTeam/MeetOurTeam";
import Features from "@/components/Features/Features";
import Newsletter from "@/components/Newsletter/Newsletter";
import Stats from "@/components/Stats/Stats";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Features />
      <Stats />
      <Testimonials />
      <MeetOurTeam />
      <Newsletter />
    </>
  );
}

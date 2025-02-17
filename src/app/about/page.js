import HeroSection from "@/components/HeroSection/HeroSection";
import MeetOurTeam from "@/components/MeetOurTeam/MeetOurTeam";
import Testimonials from "@/components/Testimonials/Testimonials";
import CTA from "@/components/CTA/CTA";
import WorkWithUs from "@/components/WorkWithUs/WorkWithUs";
import AboutHeroSection from "@/components/AboutHeroSection/AboutHeroSection";
const about = ()=>{
    return (
        <>
        <AboutHeroSection/>
        <WorkWithUs/>
        <MeetOurTeam/>
        <Testimonials/>
        <CTA/>
        </>
    )
}
export default about;
import Testimonials from "@/components/Testimonials/Testimonials";
import WorkWithUs from "@/components/WorkWithUs/WorkWithUs";
import AboutHeroSection from "@/components/AboutHeroSection/AboutHeroSection";
const about = () => {
  return (
    <>
      <AboutHeroSection />
      <WorkWithUs />
      <div className="dark:bg-gray-900 pt-4 pb-10">
        <Testimonials />
      </div>
    </>
  );
};
export default about;

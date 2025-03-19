// import Testimonials from "@/components/Testimonials/Testimonials";
import Features from "@/components/Features/Features";
import Stats from "@/components/Stats/Stats";
import LoadingLogo from "@/components/ui/LoadingLogo";
import { Suspense } from "react";
import HeroSection from "@/components/HeroSection/HeroSection";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await auth();
  if (session) redirect("/home");
  return (
    <>
      <Suspense fallback={<LoadingLogo />}>
      <HeroSection/>
        <Features />
        <Stats />
        {/* <div className="dark:bg-gray-900 pb-10">
          <Testimonials />
        </div> */}
      </Suspense>
    </>
  );
}

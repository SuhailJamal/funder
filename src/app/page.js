import Testimonials from "@/components/Testimonials/Testimonials";
import Features from "@/components/Features/Features";
import Stats from "@/components/Stats/Stats";
import { Typewriter } from "@/components/TypeWriter/TypeWriter";

import {auth} from "@/auth"
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await auth()
  if(session) redirect("/home")
  return (
    <>

      <Typewriter/>
      <Features />
      <Stats />
      <div className="dark:bg-gray-900 pb-10">
      <Testimonials /></div>
    </>
  );
}

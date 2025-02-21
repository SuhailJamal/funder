"use server"
import UserProfile from "@/components/UserProfile/UserProfile";
import SupportAndPayment from "@/components/SupportAndPayment/SupportAndPayment";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const UserLanding = async ({ params }) => {
 const username = decodeURIComponent(await params.username);;
const user = await prisma.User.findUnique({
  where : {
    email : username.toLowerCase()
  }
})
if(!user){
  redirect("/404");
}

const data = {
  name : user.name,
  username : user.email,
  title : user.title,
  bio : user.bio,
  email : user.email,
  location : user.location,
  linkedin : user.linkedin,
  github : user.github,
  profileImage : user.profileImage,
  bannerImage : user.bannerImage,

}

  return (
    <>
    <UserProfile userData = {data}/>
    <SupportAndPayment/>
    </>
  );
};

export default UserLanding;

import UserProfile from "@/components/UserProfile/UserProfile";
import SupportAndPayment from "@/components/SupportAndPayment/SupportAndPayment";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import PostsContainer from "@/components/ui/PostsContainer";

const UserLanding = async ({ params }) => {
  const dataParams = await params;
  const username = decodeURIComponent(dataParams.username);
  const user = await prisma.User.findUnique({
    where: {
      email: username.toLowerCase()
    },
  });
  if (!user) {
    redirect("/404");
  }

  const data = {
    name: user.name,
    username: user.email,
    title: user.title,
    bio: user.bio,
    email: user.email,
    location: user.location,
    linkedin: user.linkedin,
    github: user.github,
    profileImage: user.profileImage,
    bannerImage: user?.bannerImage || 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2',
  };
  const donation = await prisma.Donation.findMany({
    where : {
      receiver_name : user.name
    },
    orderBy : {
      donated_at : "desc"
    },
    take : 3
  })

  const posts = await prisma.Post.findMany({
    where : {
      userEmail : user.email
    },
    orderBy : {
      createdAt : "desc"
    }
  })


  return (
    <>
      <UserProfile userData = { data } />
      <SupportAndPayment donation = {donation} />
      <div>
        <h1 className="text-2xl text-center p-5  bg-gray-50 dark:bg-gray-800 font-bold dark:text-white text-black">Posts</h1>
      </div>
      <PostsContainer posts = {posts} />
    </>
  );
};

export default UserLanding;

import { auth } from "@/auth";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import CreateCampaign from "@/components/CreateCompaign/CreateCompaign";
import PostsContainer from "@/components/ui/PostsContainer";
import prisma from "@/lib/prisma";
import LoadingLogo from "@/components/ui/LoadingLogo";

const Home = async () => {
  const session = await auth();
  if (!session) redirect("/");

  const posts = await prisma.Post.findMany({
    where: {
      NOT: {
        userEmail: session.user.email,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  
  return (
   
     <Suspense fallback={<LoadingLogo />}> 
      <CreateCampaign />
     <PostsContainer posts = {posts}/>
     </Suspense>
   
  );
};
export default Home;

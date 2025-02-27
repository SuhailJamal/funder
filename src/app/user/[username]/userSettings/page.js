import prisma from "@/lib/prisma";
import UpdateUserProfile from "@/components/UpdateUserProfile/UpdateUserProfile"
import CheckSession from "@/components/ui/CheckSession";
import { auth } from "@/auth";

const settings = async ( {props}) => {
  const session = await auth();

  return (
    <>
    <CheckSession/>
    {/* <UpdateUserProfile/> */}
    </>
  );
};

export default settings;

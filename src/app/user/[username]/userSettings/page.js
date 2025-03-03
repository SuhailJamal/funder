import UpdateUserProfile from "@/components/UpdateUserProfile/UpdateUserProfile"
import CheckSession from "@/components/ui/CheckSession";

const settings = async () => {

  return (
    <>
    <CheckSession/>
    <UpdateUserProfile/>
    </>
  );
};

export default settings;

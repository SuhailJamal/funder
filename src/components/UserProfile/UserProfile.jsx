"use client";
import { useEffect, useState } from "react";
import { MdLocationOn, MdEmail, MdWork } from "react-icons/md";
import { FaLinkedin, FaGithub, FaUserEdit } from "react-icons/fa";
import { useSession } from "next-auth/react";
import Link from "next/link";
const UserProfile = ({ userData }) => {
  const { data: session, status } = useSession();
  const [isSameUser, setIsSameUser] = useState(false);
  useEffect(() => {
    if (status === "loading") return;
    if (session.user.email == userData.email) setIsSameUser(true);
  }, [session, isSameUser]);
if (status === "loading") return "<p>loading</p>"
console.log("session user email is ", session.user.email)
console.log("user data email is ",userData.email)

  return (
    <>
      <div className=" bg-gray-50">
        <div className="relative">
          <div className="w-full h-[40vh] md:h-[50vh] overflow-hidden">
            <img
              src={userData.bannerImage}
              alt="Profile Banner"
              className="w-full h-[40vh] object-cover"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809";
              }}
            />
          </div>

          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-5">
            <div className="rounded-full border-4 border-white shadow-lg overflow-hidden w-32 h-32 md:w-40 md:h-40">
              <img
                src={userData.profileImage}
                alt={userData.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330";
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 max-w-4xl mx-auto px-4 py-2">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl flex flex-row justify-center gap-4 font-bold text-gray-800 mb-2">
              {userData.name}{" "}
              {session.user.email === userData.email && (
                <>
                  <Link href={`/user/${session.user.email}/userSettings`}>
                    {" "}
                    <FaUserEdit />{" "}
                  </Link>
                </>
              )}
            </h1>

            <h2 className="text-xl text-gray-600 mb-4">{userData.title}</h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-8">
              {userData.bio}
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
              <div className="flex items-center text-gray-600">
                <MdEmail className="w-5 h-5 mr-2" />
                <span>{userData.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MdLocationOn className="w-5 h-5 mr-2" />
                <span>{userData.location}</span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <a
                href={userData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a
                href={userData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors"
              >
                <FaGithub className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserProfile;

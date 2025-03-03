import { handleEditForm } from "@/app/actions";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
const UpdateUserProfile = async () => {
  const session = await auth();
  const user = await prisma.User.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!user) redirect("/404");


  return (
    <div className="w-full max-w-3xl mx-auto p-6 my-10 rounded-xl bg-white dark:bg-gray-900 shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Personal Info
      </h2>
      <form action={handleEditForm} className="space-y-4">
        {/* Name */}
        <div className="flex justify-between items-center px-6">
          <label className="text-gray-700 dark:text-gray-300 w-1/3">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={user.name}
            className="outline-none w-1/3 p-2 border-b-2 border-gray-400"
          />
        </div>

        {/* Email */}
        <div className="flex justify-between items-center px-6">
          <label className="text-gray-700 dark:text-gray-300 w-1/3">
            Email
          </label>
          <p className="outline-none w-1/3 p-2">{user.email}</p>
          <input type="hidden" name="email" value={user.email} />
        </div>

        {/* Username */}
        <div className="flex justify-between items-center px-6">
          <label className="text-gray-700 dark:text-gray-300 w-1/3">
            Username
          </label>
          <input
            type="text"
            name="username"
            defaultValue={user.username}
            className="outline-none input-field p-2 w-1/3 border-b-2 border-gray-400"
          />
        </div>

        {/* Profile URL */}
        <div className="flex justify-between items-center px-6">
          <label className="text-gray-700 dark:text-gray-300 w-1/3">
            Profile URL
          </label>
          <input
            type="text"
            name="profileImage"
            defaultValue={user.profileImage}
            className="outline-none input-field p-2 w-1/3 border-b-2 border-gray-400"
          />
        </div>

        {/* Banner Image URL */}
        <div className="flex justify-between items-center px-6">
          <label className="text-gray-700 dark:text-gray-300 w-1/3">
            Banner Image
          </label>
          <input
            type="text"
            name="bannerImage"
            defaultValue={user.bannerImage}
            className="outline-none input-field p-2 w-1/3 border-b-2 border-gray-400"
          />
        </div>

        {/* GitHub */}
        <div className="flex justify-between items-center px-6">
          <label className="text-gray-700 dark:text-gray-300 w-1/3">
            GitHub
          </label>
          <input
            type="text"
            name="github"
            defaultValue={user.github}
            className="outline-none input-field p-2 w-1/3 border-b-2 border-gray-400"
          />
        </div>

        {/* LinkedIn */}
        <div className="flex justify-between items-center px-6">
          <label className="text-gray-700 dark:text-gray-300 w-1/3">
            LinkedIn
          </label>
          <input
            type="text"
            name="linkedin"
            defaultValue={user.linkedin}
            className="outline-none input-field p-2 w-1/3 border-b-2 border-gray-400"
          />
        </div>

        {/* Location */}
        <div className="flex justify-between items-center px-6">
          <label className="text-gray-700 dark:text-gray-300 w-1/3">
            Location
          </label>
          <input
            type="text"
            name="location"
            defaultValue={user.location}
            className="outline-none input-field p-2 w-1/3 border-b-2 border-gray-400"
          />
        </div>

        {/* Title */}
        <div className="flex justify-between items-center px-6">
          <label className="text-gray-700 dark:text-gray-300 w-1/3">
            Title
          </label>
          <input
            type="text"
            name="title"
            defaultValue={user.title}
            className="outline-none input-field p-2 w-1/3 border-b-2 border-gray-400"
          />
        </div>

        {/* Password */}
        <div className="flex justify-between items-center px-6">
          <label className="text-gray-700 dark:text-gray-300 w-1/3">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="outline-none input-field p-2 w-1/3 border-b-2 border-gray-400"
            placeholder="Enter new password"
          />
        </div>

        {/* Bio */}
        <div className="flex flex-col px-6">
          <label className="text-gray-700 dark:text-gray-300 mb-1">Bio</label>
          <textarea
            name="bio"
            defaultValue={user.bio}
            className="outline-none input-field p-2 h-24"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end px-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserProfile;

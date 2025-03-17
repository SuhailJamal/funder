"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Image from "next/image";
import LoadingLogo from "../ui/LoadingLogo";
import { handlePostCreateForm } from "@/app/actions";



const CreateCampaign = () => {
  const { data: session, status } = useSession();
  const [expanded, setExpanded] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (isSubmitting) {
      setTimeout(() => {
        setImagePreview("");
        setExpanded(false);
        setIsSubmitting(false);
      }, 500); // Add slight delay for a smooth transition
    }
  }, [isSubmitting]);

  if (status === "loading") {
    return <LoadingLogo />;
  }

  const userEmail = session?.user?.email || "";
  const userImage = session?.user?.profileImage || "https://st4.depositphotos.com/3557671/23892/v/450/depositphotos_238923408-stock-illustration-vector-illustration-of-avatar-and.jpg"
  const CATEGORIES = ["Education", "Health", "Medical", "Disaster Relief", "Animal Welfare", "Other"];

  // Reset and open/close form
  const toggleExpanded = () => {
    if (expanded) setImagePreview(""); // Reset image preview when closing
    setExpanded(!expanded);
  };

  // Reset image preview and collapse form after submission
 

  return (
    <div className="w-full bg-white dark:bg-gray-800 py-5">
      <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        
        {/* 🟢 Compact View (Profile Image + Placeholder + Create Post Button) */}
        {!expanded && (
          <div className="w-full flex items-center gap-3 py-3 px-4 bg-gray-200 dark:bg-gray-700 rounded-lg">
            {/* 🖼️ Circular Profile Image */}
            <div className="relative w-12 h-12">
              <Image
                src={userImage}
                alt="User Profile"
                width={48}
                height={48}
                className="rounded-full object-cover w-full h-full"
              />
            </div>

            {/* 📝 Placeholder Text */}
            <span className="flex-1 text-gray-500 dark:text-gray-400">
              What's on your mind?
            </span>

            {/* ➕ Create Post Button */}
            <button 
              onClick={toggleExpanded} 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
            >
              Create Post
            </button>
          </div>
        )}

        {/* 📝 Expanded Form (Only Shown When Clicking Create Post Button) */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-5"
          >
            {/* 📸 Image Preview (If URL is provided) */}
            {imagePreview && (
              <motion.div
                className="relative w-full rounded-lg overflow-hidden border dark:border-gray-700 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={imagePreview}
                  alt="Campaign Preview"
                  width={600}
                  height={400}
                  layout="responsive"
                  objectFit="contain"
                  className="rounded-md"
                />
              </motion.div>
            )}

            {/* 📝 Form (Server Action) */}
            <form 
              action={handlePostCreateForm}
              className="space-y-4"
              onSubmit={() => setIsSubmitting(true)} // Set submitting state
            >
              <input type="hidden" name="userEmail" value={userEmail} />

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter a clear, attention-grabbing title"
                  required
                  className="w-full p-3 border rounded dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Describe your campaign and why it matters"
                  required
                  className="w-full p-3 border rounded dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <select
                  name="category"
                  defaultValue={CATEGORIES[0]}
                  className="w-full p-3 border rounded dark:bg-gray-800 dark:text-white"
                >
                  {CATEGORIES.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Image URL
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="Paste image URL"
                  required
                  onChange={(e) => {
                    const trimmedValue = e.target.value.trim();
                    setImagePreview(trimmedValue !== "" ? trimmedValue : "");
                  }}
                  className="w-full p-3 border rounded dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-between">
                <motion.button
                  type="button"
                  onClick={toggleExpanded} // Reset image & close form
                  className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create Campaign
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CreateCampaign;

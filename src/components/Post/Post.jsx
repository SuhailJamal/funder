"use client";
import { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Post = ({
  userProfileImage,
  userName,
  userEmail,
  title,
  category,
  description,
  imageUrl,
}) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked((prev) => !prev);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 mb-4 bg-white dark:bg-gray-900 dark:border-gray-700 shadow-md rounded-lg transition-all">
      {/* 🔹 Post Header (Profile & User Info) */}
      <div className="flex items-center mb-3">
        {/* 🖼️ Profile Image */}
        <div className="h-10 w-10 rounded-full overflow-hidden mr-3 ring-2 ring-gray-200 dark:ring-gray-600">
          <Image
            src={userProfileImage || "/default-profile.png"}
            alt={`${userName}'s profile`}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>

        {/* 🔹 User Info (Username & Title) */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1 flex-wrap">
            <Link href={`/user/${userEmail}`} className="relative group">
              <span className="font-medium text-gray-900 dark:text-gray-100 pb-1">
                {userName}
              </span>
              <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gray-600 dark:bg-gray-100 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <span className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[200px]">
              • {title}
            </span>
          </div>

          <span className="text-xs text-gray-500 dark:text-gray-400">
            {category}
          </span>
        </div>
      </div>

      {/* 🔹 Post Caption */}
      <p className="text-gray-800 dark:text-gray-200 text-sm md:text-base leading-relaxed mb-3">
        {description}
      </p>

      {/* 🔹 Post Image (If Available) */}
      {imageUrl && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt="Post content"
            width={600}
            height={400}
            className="w-full md:max-h-[70vh] max-h-[40vh] object-cover rounded-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      {/* 🔹 Post Actions (Like, Comment, Share) */}
      <div className="border-t border-gray-100 dark:border-gray-700 pt-3 mt-1">
        <div className="flex justify-between">
          {/* ❤️ Like Button */}
          <button
            className={`flex items-center gap-1 transition-colors duration-200 ${
              liked
                ? "text-red-500 dark:text-red-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
            onClick={handleLike}
          >
            <Heart size={18} className={liked ? "fill-current" : ""} />
            <span className="text-sm">{liked ? "Liked" : "Like"}</span>
          </button>

          {/* 💬 Comment Button */}
          <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200">
            <MessageCircle size={18} />
            <span className="text-sm">Comment</span>
          </button>

          {/* 🔄 Share Button */}
          <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200">
            <Share2 size={18} />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;

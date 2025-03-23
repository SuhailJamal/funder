"use client";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[80vh] bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-6 sm:px-12">
      <div className="max-w-4xl text-center space-y-6">
        {/* 📝 Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
          Empower Change Through{" "}
          <span className="text-blue-600">Crowdfunding</span>
        </h1>

        {/* 📄 Subtitle */}
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Join a community that helps bring meaningful projects to life. Support
          initiatives that matter or launch your own campaign today.
        </p>

        {/* 🎯 CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <Link
            href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
          >
            sign up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

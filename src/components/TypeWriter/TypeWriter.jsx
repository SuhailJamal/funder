"use client";
import { TypeWriterEffect } from "@/components/ui/TypeWriterEffect";

export function Typewriter() {
  const words = [
    {
      text: "Fund",
      className: "dark:text-gray-500",
    },
    {
      text: "Your",

      className: "dark:text-gray-500",
    },
    {
      text: "Projects",

      className: "dark:text-gray-500",
    },
    {
      text: "with",

      className: "dark:text-gray-500",
    },
    {
      text: "FUNDER.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[30rem] dark:bg-slate-800">
      <p className="text-neutral-600  text-base dark:text-white mb-10">
        The road to freedom starts from here
      </p>
      <TypeWriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Join now
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Signup
        </button>
      </div>
    </div>
  );
}

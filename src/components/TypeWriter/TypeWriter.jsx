"use client";
import { TypeWriterEffect } from "@/components/ui/TypeWriterEffect";

export function Typewriter() {
  const words = [
    {
      text: "Fund",
      className: "dark:text-gray-200",
    },
    {
      text: "Your",

      className: "dark:text-gray-200",
    },
    {
      text: "Projects",

      className: "dark:text-gray-200",
    },
    {
      text: "with",

      className: "dark:text-gray-200",
    },
    {
      text: "FUNDER.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[23rem] dark:bg-slate-900">
      <p className="text-neutral-600  text-base dark:text-white mb-10">
        The road to raising funds starts from here
      </p>
      <TypeWriterEffect words={words} />
     
    </div>
  );
}

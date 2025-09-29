"use client"

import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();
    
    return (
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-700/50 transition-colors duration-200 hover:scale-110 hover:cursor-pointer"
          title="Go back"
        >
            <svg
              className="w-6 h-6 text-gray-700 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
            </svg>
        </button>
    )
}
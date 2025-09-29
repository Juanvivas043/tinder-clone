"use client"

import { UserProfile } from "@/lib/definitions";
import { useState } from "react";
import MatchCard from "@/components/MatchCard";

export default function ClientMatches({ potentialMatches }: {potentialMatches: UserProfile[]}) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const currentPotentialMatch = potentialMatches[currentIndex]

    return (
        <div className="max-w-md mx-auto bg-gradient-to-br from-pink-300 to-red-500 p-7 rounded-2xl shadow-lg">
            <div className="mb-4">
                <MatchCard user={currentPotentialMatch}/>
            </div>

            <div className="mb-4 pt-4">
                <p className="text-center text-lg text-gray-900 bg-white p-2 rounded-full shadow-lg w-2/3 mx-auto">
                    {currentIndex + 1} de {potentialMatches.length} Perfiles
                </p>
            </div>
        </div>
    )
}
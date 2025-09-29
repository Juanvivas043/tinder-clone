"use client"

import { UserProfile } from "@/lib/definitions";
import { useState } from "react";
import MatchCard from "@/components/MatchCard";

export default function ClientMatches({ potentialMatches }: {potentialMatches: UserProfile[]}) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const currentPotentialMatch = potentialMatches[currentIndex]

    return (
        <div className="max-w-md mx-auto">
            <div className="mb-4">
                <MatchCard user={currentPotentialMatch}/>
            </div>

            <div className="mb-4">
                <p className="text-center text-lg text-gray-900 dark:text-white">
                    {currentIndex + 1} de {potentialMatches.length} Perfiles
                </p>
            </div>
        </div>
    )
}
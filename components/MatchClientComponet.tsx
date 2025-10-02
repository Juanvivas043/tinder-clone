"use client"

import { UserProfile } from "@/lib/definitions";
import { useState } from "react";
import MatchCard from "@/components/MatchCard";
import MatchButtons from "./MatchButtons";
import { likeUser } from "@/lib/actions/matches";
import MatchNotification from "./MatchNotification";

export default function ClientMatches({ potentialMatches }: {potentialMatches: UserProfile[]}) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [showMatchNotification, setShowMatchNotification] = useState<boolean>(false)
    const [matchUser, setMatchUser] = useState<UserProfile | null>(null)

    const currentPotentialMatch = potentialMatches[currentIndex]

    async function handleLike() {
        if (currentIndex < potentialMatches.length) {
           const likedUser = potentialMatches[currentIndex] 
           
           try {
                const result = await likeUser(likedUser.id)
                
                if (result.isMatch) { 
                    setMatchUser(result.matchedUser!)
                    setShowMatchNotification(true)
                    
                }

                setCurrentIndex(currentIndex + 1)

           } catch (err) {
                console.error(err)

        }}
    }

    {/* Crear la tabla para no mostar de nuevo una persona al hacer pass, tarea de hoy*/}
    function handlePass() {
        if (currentIndex <= potentialMatches.length - 1) {
            setCurrentIndex(currentIndex + 1)
        }
    }

    function handleCloseMatchNotification() {

    }

    function handleStartChat() {

    }

    if (currentIndex >= potentialMatches.length) {
        return (
            <div className="h-full bg-gradient-to-br from-pink-100 to-red-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">💕</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        No hay mas perfiles para mostrar
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Vuelve mas tarde para ver nuevos perfiles. O cambia tus preferencias!
                    </p>
                    <button
                        onClick={() => setCurrentIndex(0)}
                        className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-3 px-6 rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-200"
                    >
                        Refrescar
                    </button>
                </div>
                {(showMatchNotification && matchUser && (
                    <MatchNotification match={matchUser} onClose={handleCloseMatchNotification} onStartChat={handleStartChat}/>
                ))}
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto bg-gradient-to-br from-pink-300 to-red-500 p-7 rounded-2xl shadow-lg">
            <div className="mb-6">
                <p className="text-center text-lg text-gray-900 bg-white p-2 rounded-full shadow-lg w-2/3 mx-auto">
                    {currentIndex + 1} de {potentialMatches.length} Perfiles
                </p>
            </div>

            <div className="mb-2">
                <MatchCard user={currentPotentialMatch}/>
                <div className="mt-8">
                    <MatchButtons onLike={handleLike} onPass={handlePass}/>
                </div>
            </div>

            {(showMatchNotification && matchUser && (
                <MatchNotification match={matchUser} onClose={handleCloseMatchNotification} onStartChat={handleStartChat}/>
            ))}
        </div>
    )
}
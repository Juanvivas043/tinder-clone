"use client"

import { useEffect, useState } from "react";
import { getCurrentUserProfile } from "@/lib/actions/profile";
import Image from "next/image";

export interface UserProfile {
    id: string;
    full_name: string;
    username: string;
    email: string;
    gender: "male" | "female" | "other";
    birthdate: string;
    bio: string;
    avatar_url: string;
    preferences: UserPreferences;
    location_lat?: number;
    location_lng?: number;
    last_active: string;
    is_verified: boolean;
    is_online: boolean;
    created_at: string;
    updated_at: string;
}

export interface UserPreferences {
    gender_preferences: "male" | "female" | "other";
    distance: number;
    age_range: {
        min: number;
        max: number;
    };
}

export default function Profile() {
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadProfile() {
            try {
                const profileData = await getCurrentUserProfile()
                if (profileData) {
                    setProfile(profileData)
                } else {
                    setError("Error loading profile")
                }
            } catch (error) {
                console.error("Error loading profile:", error)
                setError("Error loading profile")
            } finally {
                setLoading(false)
            }
        }

        loadProfile()
    }, [])

    function calculateAge(birthdate : string) {
        const birthDate = new Date(birthdate)
        const today = new Date()
        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        return age
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">❌</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        No se encontro perfil
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {error || "No se pudo cargar tu perfil. Intenta de nuevo."}
                    </p>

                    <button 
                    onClick={() => window.location.reload()}
                    className="bg-gradient-to-r from bg-pink-500 to-red-500 text-white font-semibold py-3 px-6 rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-200">
                    Intentar de nuevo </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2"> 
                        Mi Perfil
                    </h1>

                    <p className="text-gray-600 dark:text-gray-300">
                        Configura tu cuenta y preferencias
                    </p>
                </header>

                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                                <div className="flex items-center space-x-6 mb-8">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-full overflow-hidden">
                                            <Image
                                                width={100}
                                                height={100}
                                                src={profile?.avatar_url || "/default-avatar.png"}
                                                alt={profile?.full_name || "Profile"}
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                            {profile.full_name}, {calculateAge(profile.birthdate)}
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                                        @{profile.username}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-500">
                                            Member since{" "}
                                        {new Date(profile.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}

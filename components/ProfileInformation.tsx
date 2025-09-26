import Image from "next/image";
import Link from "next/link";
import { getCurrentUserProfile } from "@/lib/actions/profile";
import { UserProfile } from "@/lib/definitions";

export default async function ProfileInformation () {
    const profile : UserProfile | null = await getCurrentUserProfile()
    await new Promise((resolve) => setTimeout(resolve, 1000));

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

    if (!profile) {
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
                        No se pudo cargar tu perfil. Intenta de nuevo o Inicia Sesion.
                    </p>
                </div>
            </div>
        )
    }

    return (
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
                        
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                                    Acerca de mí
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {profile.bio || "No hay información sobre mí."}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                    Información Básica
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Género
                                        </label>
                                        <p className="text-gray-900 dark:text-white capitalize">
                                            {profile.gender}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Birthday
                                        </label>
                                        <p className="text-gray-900 dark:text-white">
                                            {new Date(profile.birthdate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                    Preferencias
                                </h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Age Range
                                        </label>
                                        <p className="text-gray-900 dark:text-white">
                                            {profile.preferences.age_range.min} -{" "}
                                            {profile.preferences.age_range.max} years
                                        </p>    
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                          Distance
                                        </label>
                                        <p className="text-gray-900 dark:text-white">
                                          Up to {profile.preferences.distance} km
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Acciones Rápidas
                        </h3>
                        <div className="space-y-3">
                            <Link 
                            href="/profile/edit"
                            className="flex item-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <svg
                                      className="w-4 h-4 text-white"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                      />
                                    </svg>
                                  </div>
                                  <span className="text-gray-900 dark:text-white">
                                    Edit Profile
                                  </span>
                                </div>
                                <svg
                                  className="w-5 h-5 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                            </Link>
                        </div>
                    </div>
            
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Cuenta
                        </h3>
                        
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                                <span className="text-gray-900 dark:text-white">
                                    Username
                                </span>
                                <span className="text-gray-500 dark:text-gray-400">
                                    @{profile.username}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
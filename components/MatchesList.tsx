import { getMatchesList } from "@/lib/actions/matches";
import { UserProfile } from "@/lib/definitions";
import Link from "next/link";
import Image from "next/image";

export default async function MatchesList() {
    const matchesData : UserProfile[] = await getMatchesList() || []
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
    return (
        <div>            
            {matchesData.length === 0 ? (
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">💕</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Sin matches aún
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Descubre tu posible proxima pareja
                    </p>
                    <Link
                        href="/matches"
                        className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-3 px-6 rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-200">
                            Empieza a conocer
                    </Link>
                </div>
            ) : (
                <div className="max-w-2xl mx-auto">
                    <div className="grid gap-4">
                        {matchesData.map((match, key) => (
                            <Link 
                                key={key} 
                                href={`/chat/${match.id}`}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                        <Image
                                        fill
                                        src={match.avatar_url}
                                        alt={match.full_name}
                                        className="w-full h-full object-cover"/>
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {match.full_name}, {calculateAge(match.birthdate)}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                            @{match.username}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                            {match.bio}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
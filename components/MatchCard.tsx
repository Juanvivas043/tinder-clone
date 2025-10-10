import { UserProfile } from "@/lib/definitions";
import calculateAge from "@/lib/helpers/calculateAge";
import Image from "next/image";

export default function MatchCard({ user }: {user: UserProfile }) {
    return (
        <div className="w-full max-w-sm mx-auto">
            <div className="card-swipe aspect-[3/4] overflow-hidden">
                <div className="w-full h-full">
                    <Image
                        fill
                        priority
                        src={user.avatar_url}
                        alt={user.full_name}
                        className="object-cover transition-opacity duration-300"
                    />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex items-end justify-between">
                          <div>
                            <h2 className="text-2xl font-bold mb-1">
                              {user.full_name}, {calculateAge(user.birthdate)}
                            </h2>
                            <p className="text-sm opacity-90 mb-2">@{user.username}</p>
                            <p className="text-sm leading-relaxed">{user.bio}</p>
                        </div>
                    </div>
                </div>                
            </div>
        </div>

    )
}
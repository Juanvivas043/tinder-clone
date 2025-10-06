import BackButton from "@/components/BackButton";
import MatchesList from "@/components/MatchesList";
import MatchesListSkeleton from "@/components/MatchesListSkeleton";
import { Suspense } from "react";

export default function MatchesListPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <BackButton/>
                        <div className="flex-1"/>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Tus Parejas
                    </h1>

                    <p className="text-gray-600 dark:text-gray-400">
                        Chatea con tus parejas
                    </p>
                </header>
                <Suspense fallback={<MatchesListSkeleton/>}>
                    <MatchesList/>
                </Suspense>
            </div>
        </div>
    )
}
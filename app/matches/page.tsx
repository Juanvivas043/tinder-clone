import { Suspense } from "react";
import BackButton from "@/components/BackButton";
import MatchDataLoaderComponent from "@/components/MatchDataLoaderComponent";
import MatchCardSkeleton from "@/components/MatchCardSkeleton";

export default function MatchesPage() {
    
    return (
        <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-pink-100 to-red-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-8">
                <header className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <BackButton/>
                        <div className="flex-1"/>
                    </div>

                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Encuentra Tu Futura Pareja
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Descubre a personas que se adapten a tu estilo de vida y disfruten juntos.
                        </p>
                    </div>
                </header>

                <Suspense fallback={<MatchCardSkeleton/>}>
                    <MatchDataLoaderComponent/>
                </Suspense>
            </div>
        </div>
    );
}
const SKELETON_ITEMS = 5;

export default function MatchesListSkeleton() {
    return (
        // Contenedores que imitan tu componente real
        <div className="max-w-2xl mx-auto"> 
            <div className="grid gap-4"> 
                {/* AHORA SÍ, Mapeamos el ÍTEM INDIVIDUAL */}
                {Array.from({ length: SKELETON_ITEMS }).map((_, index) => (
                    <SkeletonMatchItem key={index} /> 
                ))}
            </div>
        </div>
    );
}

function SkeletonMatchItem() {
    return (
    // Imita el contenedor del Link
    <div 
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg animate-pulse h-30" 
        aria-hidden="true"
    >
        <div className="flex items-center space-x-4">
            
            {/* Esqueleto del Avatar: w-16 h-16 rounded-full */}
            {/* 🛑 CORRECCIÓN: Este <div> estaba mal cerrado en tu código. */}
            <div className="relative w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700 flex-shrink-0">
            </div> 
            
            {/* Esqueleto del Texto */}
            <div className="flex-1 min-w-0 space-y-2">
                {/* Nombre y Edad */}
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

                {/* @username */}
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>

                {/* Bio (2 líneas) */}
                <div className="space-y-1 mt-1">
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-11/12"></div>
                </div>
            </div>

            {/* Esqueleto del indicador de estado */}
            <div className="flex-shrink-0">
                <div className="w-3 h-3 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            </div>
        </div>
    </div>
  );
}
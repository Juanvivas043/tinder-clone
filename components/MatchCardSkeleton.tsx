// src/components/ClientMatchesSkeleton.tsx

export default function MatchCardSkeleton() {
  return (
    // 1. Contenedor principal: Mantiene el gradiente original
    <div className="max-w-md mx-auto bg-gradient-to-br from-pink-300 to-red-500 p-7 rounded-2xl shadow-lg animate-pulse">
      
      {/* 2. Contenedor de la Tarjeta (MatchCard Skeleton) */}
      <div className="mb-4">
        <div className="w-full max-w-sm mx-auto">
          <div className="card-swipe aspect-[3/4] overflow-hidden rounded-xl">
            {/* Esqueleto de la Imagen: Usamos un gris claro/medio */}
            <div className="relative w-full h-full bg-gray-200 dark:bg-gray-500" /> 
            
            {/* Gradiente y texto de la tarjeta */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="w-full">
                {/* Esqueleto de Nombre y Edad (Usamos gris muy claro/blanco) */}
                <div className="h-6 w-3/4 bg-gray-100 dark:bg-gray-300 rounded-md mb-2" />
                
                {/* Esqueleto de Username */}
                <div className="h-4 w-1/3 bg-gray-100 dark:bg-gray-300 rounded-md mb-2" />
                
                {/* Esqueleto de Bio (líneas múltiples) */}
                <div className="h-4 w-full bg-gray-100 dark:bg-gray-300 rounded-md mb-2" />
                <div className="h-4 w-4/5 bg-gray-100 dark:bg-gray-300 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Contenedor del Contador de Perfiles (Skeleton) */}
      <div className="mb-4 pt-4">
        {/* Fondo del contador: Replicamos el bg-white del diseño original */}
        <div className="bg-white p-2 rounded-full h-11 shadow-lg w-2/3 mx-auto">
        </div>
      </div>
    </div>
  );
}
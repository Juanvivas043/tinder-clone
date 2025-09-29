export default function MatchCardSkeleton() {
  return (
    <div className="relative w-full max-w-sm mx-auto animate-pulse">
      {/* El contador de perfiles NO va aquí arriba,
        va al final, después de la tarjeta.
      */}

      <div className="card-swipe aspect-[3/4] overflow-hidden">
        {/* Espacio para la imagen */}
        <div className="relative w-full h-full bg-gray-300 dark:bg-gray-700" />

        {/* Gradiente oscuro en la parte inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Contenedor para el texto del usuario */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-end justify-between">
            <div className="w-full">
              {/* Espacio para el nombre y la edad */}
              <div className="h-6 w-3/4 bg-gray-400 dark:bg-gray-600 rounded-md mb-2" />
              {/* Espacio para el nombre de usuario */}
              <div className="h-4 w-1/2 bg-gray-400 dark:bg-gray-600 rounded-md mb-2" />
              {/* Espacio para la biografía */}
              <div className="h-4 w-full bg-gray-400 dark:bg-gray-600 rounded-md mb-2" />
              <div className="h-4 w-4/5 bg-gray-400 dark:bg-gray-600 rounded-md" />
            </div>
          </div>
        </div>
      </div>
      
      {/* DIV del contador de perfiles - AHORA ABAJO, fuera de la tarjeta */}
      <div className="mb-4 mt-6"> {/* Agregado mt-6 para espacio */}
        {/* Usamos un div gris para simular el texto del contador */}
        <div className="h-6 w-1/2 mx-auto bg-gray-300 dark:bg-gray-700 rounded-full" />
      </div>
    </div>
  );
}
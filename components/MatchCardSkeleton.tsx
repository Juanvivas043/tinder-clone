export default function MatchCardSkeleton() {
  return (
    // 1. Contenedor Principal: Mantiene el gradiente y el ancho fijo (max-w-md, p-7)
    <div className="max-w-md mx-auto bg-gradient-to-br from-pink-300 to-red-500 p-7 rounded-2xl shadow-lg animate-pulse">
      
      {/* 2. Contador de Perfiles (Skeleton): DEBE IR PRIMERO como en tu diseño original */}
      <div className="mb-6">
        {/* Replicamos las dimensiones del contador: p-2, h-11 aprox., w-2/3 mx-auto, bg-white, shadow-lg */}
        <div className="bg-white p-2 h-11 flex items-center justify-center rounded-full shadow-lg w-2/3 mx-auto">
             {/* Barra gris para simular el texto 'X de Y Perfiles' */}
             <div className="h-5 bg-gray-300 rounded-full w-3/4"></div>
        </div>
      </div>

      {/* 3. Contenedor de la Tarjeta y Botones: mb-2 */}
      <div className="mb-2">
        
        {/* 3.1 MatchCard Skeleton: Replicamos w-full max-w-sm y aspect-[3/4] */}
        <div className="w-full max-w-sm mx-auto">
          <div className="card-swipe aspect-[3/4] overflow-hidden rounded-xl relative shadow-lg">
            
            {/* Área de la Imagen: Fondo de placeholder gris */}
            <div className="relative w-full h-full bg-gray-300 dark:bg-gray-700" />
            
            {/* Gradiente y detalles del usuario (Simulando la capa de texto blanco) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="w-full">
                {/* Nombre y Edad: h-6 */}
                <div className="h-6 w-3/4 bg-gray-100 dark:bg-gray-300 rounded-md mb-2" />
                
                {/* Username: h-4 */}
                <div className="h-4 w-1/3 bg-gray-100 dark:bg-gray-300 rounded-md mb-2" />
                
                {/* Bio (2 líneas): h-4 */}
                <div className="h-4 w-full bg-gray-100 dark:bg-gray-300 rounded-md mb-2" />
                <div className="h-4 w-4/5 bg-gray-100 dark:bg-gray-300 rounded-md" />
              </div>
            </div>
          </div>
        </div>

        {/* 3.2 MatchButtons Skeleton: Separación mt-8 */}
        <div className="mt-8">
            <div className="flex items-center justify-center gap-8">
                {/* Botón Pass: w-16 h-16 (dimensiones cruciales) */}
                <div className="w-16 h-16 bg-white rounded-full shadow-lg border-2 border-gray-300 flex items-center justify-center">
                     {/* Simulación del icono X */}
                     <div className="w-8 h-8 bg-red-300 dark:bg-red-500 rounded-sm"></div>
                </div>

                {/* Botón Like: w-16 h-16 (dimensiones cruciales) */}
                <div className="w-16 h-16 bg-white rounded-full shadow-lg border-2 border-gray-300 flex items-center justify-center">
                     {/* Simulación del icono Corazón */}
                     <div className="w-8 h-8 bg-green-300 dark:bg-green-500 rounded-full"></div>
                </div>
            </div>
        </div>

      </div>
      
      {/* NOTA: No necesitamos un esqueleto para MatchNotification ya que es un modal (fixed/absolute) 
          que no afecta el flujo de la página. */}
          
    </div>
  );
}
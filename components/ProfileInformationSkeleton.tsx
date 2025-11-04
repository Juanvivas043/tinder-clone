export default function ProfileInformationSkeleton() {
    // Clases base para los bloques grises
    const skeletonClass = "bg-gray-300 dark:bg-gray-600 rounded";
    
    return (
        <div className="min-h-screen max-w-4xl mx-auto p-4 md:p-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Columna principal izquierda (lg:col-span-2) */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 animate-pulse">
                        
                        {/* Sección de cabecera (Avatar, Nombre, Username) */}
                        <div className="flex items-center space-x-6 mb-8">
                            <div className={`w-24 h-24 rounded-full ${skeletonClass}`} /> {/* Avatar */}
                            
                            <div className="flex-1 space-y-2">
                                <div className={`h-6 ${skeletonClass} w-3/4`} /> {/* Nombre y Edad */}
                                <div className={`h-4 ${skeletonClass} w-1/2`} /> {/* Username */}
                                <div className={`h-4 ${skeletonClass} w-2/5`} /> {/* Miembro desde */}
                            </div>
                        </div>

                        {/* --- */}
                        
                        <div className="space-y-6">
                            
                            {/* Sección "Acerca de mí" (Bio) */}
                            <div>
                                <div className={`h-5 ${skeletonClass} w-1/3 mb-3`} /> {/* Título */}
                                <div className="space-y-2">
                                    <div className={`h-4 ${skeletonClass} w-full`} />
                                    <div className={`h-4 ${skeletonClass} w-11/12`} />
                                    <div className={`h-4 ${skeletonClass} w-3/4`} />
                                </div>
                            </div>

                            {/* Sección "Información Básica" */}
                            <div>
                                <div className={`h-5 ${skeletonClass} w-1/4 mb-3`} /> {/* Título */}
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Género */}
                                    <div>
                                        <div className={`h-4 ${skeletonClass} w-1/2 mb-1`} /> {/* Label */}
                                        <div className={`h-5 ${skeletonClass} w-3/4`} /> {/* Valor */}
                                    </div>
                                    {/* Fecha de Nacimiento */}
                                    <div>
                                        <div className={`h-4 ${skeletonClass} w-1/2 mb-1`} /> {/* Label */}
                                        <div className={`h-5 ${skeletonClass} w-3/4`} /> {/* Valor */}
                                    </div>
                                </div>
                            </div>

                            {/* Sección "Preferencias" (Rango de Edad y Distancia) */}
                            <div>
                                <div className={`h-5 ${skeletonClass} w-1/4 mb-3`} /> {/* Título */}
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Rango de Edad */}
                                    <div>
                                        <div className={`h-4 ${skeletonClass} w-1/2 mb-1`} /> {/* Label */}
                                        <div className={`h-5 ${skeletonClass} w-3/4`} /> {/* Valor */}
                                    </div>
                                    {/* Distancia */}
                                    <div>
                                        <div className={`h-4 ${skeletonClass} w-1/2 mb-1`} /> {/* Label */}
                                        <div className={`h-5 ${skeletonClass} w-3/4`} /> {/* Valor */}
                                    </div>
                                </div>
                            </div>
                            
                            {/* NUEVA SECCIÓN: Preferencias de Género (Chips/Tags) */}
                            <div>
                                {/* Label "Géneros" */}
                                <div className={`h-4 ${skeletonClass} w-1/5 mb-5`} /> 
                                
                                {/* Contenedor de chips: grid grid-cols-2 md:grid-cols-3 gap-2 */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {/* Simulación del chip (similar a px-2 py-1 y rounded-full) */}
                                    <div className={`h-8 w-1/2 ${skeletonClass} rounded-full`} /> 
                                    <div className={`h-8 w-1/2 ${skeletonClass} rounded-full`} /> 
                                    <div className={`h-8 w-1/2 ${skeletonClass} rounded-full`} />
                                </div>
                            </div>
                            {/* FIN DE NUEVA SECCIÓN */}

                        </div>
                    </div>
                </div>

                {/* Columna lateral derecha */}
                <div className="space-y-6">
                    {/* Tarjeta de "Acciones Rápidas" */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-pulse">
                        <div className={`h-5 ${skeletonClass} w-2/3 mb-6`} /> {/* Título */}
                        <div className="space-y-3">
                            {/* Enlace "Edit Profile" */}
                            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-200 dark:bg-gray-700">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-8 h-8 ${skeletonClass} rounded-full`} /> {/* Icono */}
                                    <div className={`h-4 ${skeletonClass} w-24`} /> {/* Texto del enlace */}
                                </div>
                                <div className={`w-5 h-5 ${skeletonClass} rounded`} /> {/* Flecha */}
                            </div>
                        </div>
                    </div>
                    
                    {/* Tarjeta de "Cuenta" */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-pulse">
                        <div className={`h-5 ${skeletonClass} w-1/3 mb-8`} /> {/* Título */}
                        <div className="space-y-3">
                            {/* Fila de Username */}
                            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-200 dark:bg-gray-700">
                                <div className={`h-4 ${skeletonClass} w-20`} /> {/* Label Username */}
                                <div className={`h-4 ${skeletonClass} w-24`} /> {/* Valor Username */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
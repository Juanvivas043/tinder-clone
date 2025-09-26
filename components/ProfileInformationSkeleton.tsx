export default function ProfileInformationSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-0"> {/* Añadido padding para dispositivos móviles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna principal izquierda */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 animate-pulse"> {/* Aplica animate-pulse aquí */}
            
            {/* Sección de cabecera (Avatar, Nombre, Rol, etc.) */}
            <div className="flex items-center space-x-6 mb-8">
              {/* Avatar del perfil */}
              <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600" />
              
              <div className="flex-1 space-y-2">
                {/* Nombre y Edad */}
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
                {/* Username */}
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
                {/* Miembro desde */}
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/5" />
              </div>
            </div>

            {/* Sección "Acerca de mí" */}
            <div className="space-y-6">
              <div>
                <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-3" /> {/* Título */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full" />
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-11/12" />
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
                </div>
              </div>

              {/* Sección "Información Básica" */}
              <div>
                <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-3" /> {/* Título */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-1" /> {/* Label */}
                    <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4" /> {/* Valor */}
                  </div>
                  <div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-1" /> {/* Label */}
                    <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4" /> {/* Valor */}
                  </div>
                </div>
              </div>

              {/* Sección "Preferencias" */}
              <div>
                <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-3" /> {/* Título */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-1" /> {/* Label */}
                    <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4" /> {/* Valor */}
                  </div>
                  <div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-1" /> {/* Label */}
                    <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4" /> {/* Valor */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna lateral derecha */}
        <div className="space-y-6">
          {/* Tarjeta de "Acciones Rápidas" */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-pulse">
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mb-4" /> {/* Título */}
            <div className="space-y-3">
              {/* Enlace "Edit Profile" */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-200 dark:bg-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-400 dark:bg-gray-500 rounded-full" /> {/* Icono */}
                  <div className="h-4 bg-gray-400 dark:bg-gray-500 rounded w-24" /> {/* Texto del enlace */}
                </div>
                <div className="w-5 h-5 bg-gray-400 dark:bg-gray-500 rounded" /> {/* Flecha */}
              </div>
              {/* Puedes añadir más elementos de acción aquí si los hay */}
            </div>
          </div>
          
          {/* Tarjeta de "Cuenta" */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-pulse">
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4" /> {/* Título */}
            <div className="space-y-3">
              {/* Fila de Username */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-200 dark:bg-gray-700">
                <div className="h-4 bg-gray-400 dark:bg-gray-500 rounded w-20" /> {/* Label Username */}
                <div className="h-4 bg-gray-400 dark:bg-gray-500 rounded w-24" /> {/* Valor Username */}
              </div>
              {/* Puedes añadir más elementos de cuenta aquí si los hay */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
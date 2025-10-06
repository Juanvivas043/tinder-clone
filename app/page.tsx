export default function Home() {
    return (
        <div className="min-h-screen flex text-center flex-col items-center justify-center gap-5 bg-gradient-to-br from-pink-100 to-red-100 dark:from-gray-900 dark:to-gray-800">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Bienvenido a Matching
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
                Registrate o inicia sesion para comenzar a usar Matching
            </p>
        </div>
    );
}

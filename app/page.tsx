export default function Home() {
    return (
        <div 
            style={{
                backgroundImage: 'url(/background.webp)',
            }}
            className="
                relative
                min-h-screen flex flex-col items-center justify-center 
                p-3 w-full h-full bg-cover bg-center bg-no-repeat
                before:content-['']            
                before:absolute 
                before:inset-0 
                before:bg-black/75 
            "
        >
            <div className="flex flex-col max-w-150 z-10 text-left px-10 py-10">
                <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-white text-transparent bg-clip-text mb-5">
                    Matching
                </span> 
                <h1 className="text-4xl font-bold text-white mb-5">
                    App de Citas
                </h1>
                <p className="text-lg text-gray-300 mb-5 ">
                    Matching es una app de citas que permite a los usuarios encontrarse con personas compatibles basándose en sus preferencias y intereses. Es una app diseñada para practicar la conexión y el desarrollo web moderno.
                </p>
            </div>
        </div>
    );
}

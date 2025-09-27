'use client'

import { useEffect, useState } from "react"
import { createClient } from '@/lib/supabase/client'
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"

export default function AuthPage () {
    const [isSingUp, setIsSignUp] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] =  useState<string>("")
    const supabase = createClient()
    const { user, loading: authLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if(user && !authLoading) {
            router.push("/")

        }
    }, [user, authLoading, router])

    async function handleAuth (e: React.FormEvent) {
        e.preventDefault()

        setLoading(true)
        setError("")

        try {  
            
            if (isSingUp) {
                const {data, error} = await supabase.auth.signUp({
                    email, 
                    password
                })

                if(error) throw error
                if(data.user && !data.session) {
                    setError("Revisa tu correo para confirmarlo")
                    return
                }

            } else {

                const {error} = await supabase.auth.signInWithPassword({
                    email,
                    password
                })

                if(error) throw error

            }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any){
            setError(error.message)

        } finally {
            setLoading(false)

        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-red-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-md w-full space-y-8 p-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Matching
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {isSingUp ? 'Crea una cuenta nueva': 'Inicia sesion en tu cuenta'}
                    </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-6">
                    <div>
                        <label 
                        htmlFor="email" 
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </label>
                        <input 
                        type="email" 
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounder-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-800 dark:text-white"
                        placeholder="Introduce tu correo" />
                    </div>
                    <div>
                        <label 
                        htmlFor="password" 
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Contraseña
                        </label>
                        <input 
                        type="password" 
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounder-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-800 dark:text-white"
                        placeholder="Introduce tu contraseña" />
                    </div>

                    {error&&(
                        <div className="text-red-600 dark:text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <button type="submit" 
                    disabled={loading} 
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 hover:cursor-pointer">
                        {loading ? 'Cargando...' : isSingUp ? 'Crear Cuenta':'Iniciar Sesion'}
                    </button>

                    <div className="text-center">
                        <a
                        onClick={() => setIsSignUp(!isSingUp)}
                        className="text-pink-600 dark:text-pink-400 hover:text-pink-500 dark:hover:text-pink-300 text-sm"
                        >
                            {isSingUp ? 'Ya tienes una cuenta? Inicia Sesion' : 'No tienes cuenta? Crea una'}
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}
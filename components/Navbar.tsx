'use client'
import { useAuth } from "@/context/auth-context"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
    {
        href: "/matches",
        label: "Descubre"
    },
    {
        href: "/matches/list",
        label: "Encuentros"
    },
    {
        href: "/chat",
        label: "Mensajes"
    },
    {
        href: "/profile",
        label: "Perfil"
    }
]

export default function Navbar() {
    const [isMobileMenuOpen, setMobileIsMenuOpen] = useState(false)
    const {signOut, user} = useAuth()

    return (
        <nav className="relative z-50 bg-slate-900 border-b border-gray-900/50">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center space-x-8">
                        <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-white bg-clip-text text-transparent">
                            Matching
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                      {user ? (
                        navItems.map((item) => {
                          return (
                            <Link 
                                key={item.href}
                                href={item.href} 
                                className="text-white dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 font-medium transition-colors duration-200">
                                    {item.label}
                            </Link>
                          )
                        })) : ""}
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                          <button
                            onClick={signOut}
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                            Cerrar sesión
                          </button>
                        ) : (
                          <Link
                            href="/auth"
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-sm font-medium rounded-lg hover:from-pink-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            Iniciar sesión
                          </Link>
                        )}
                    </div>

                    <div className={"flex flex-col items-center justify-center bg-slate-900/95 inset-0 fixed backdrop-blur-sm transition-all divide-neutral-300 gap-6" +
                      (isMobileMenuOpen ? " opacity-100 pointer-events-auto" : " opacity-0 pointer-events-none")}>
                        {user ? (
                          navItems.map((item) => {
                            return (
                              <Link 
                                  key={item.href}
                                  href={item.href} 
                                  onClick={() => setMobileIsMenuOpen(!isMobileMenuOpen)}
                                className="text-white text-lg font-medium py-2 block w-full text-center transition-colors duration-200 hover:bg-neutral-800">
                                    {item.label}
                            </Link>
                          )
                        })) : ""}

                        {user ? (
                            <button
                          onClick={()=> {
                            signOut()
                          }}
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Cerrar sesión
                        </button>
                        ): ""}
                    </div>
                    <div className={"flex flex-col items-center justify-center bg-slate-900/95 inset-0 fixed backdrop-blur-sm transition-all divide-neutral-300 gap-6" +
                      (isMobileMenuOpen ? " opacity-100 pointer-events-auto" : " opacity-0 pointer-events-none")}>
                        {user ? (
                          navItems.map((item) => {
                            return (
                              <Link 
                                  key={item.href}
                                  href={item.href} 
                                  onClick={() => setMobileIsMenuOpen(!isMobileMenuOpen)}
                                className="text-white text-lg font-medium py-2 block w-full text-center transition-colors duration-200 hover:bg-neutral-800">
                                    {item.label}
                            </Link>
                          )
                        })) : ""}

                        {user ? (
                            <button
                          onClick={()=> {
                            signOut()
                          }}
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Cerrar sesión
                        </button>
                        ): ""}
                    </div>
                
                    {/* Mobile Navigation */}
                    {user ? (
                        <button className="md:hidden p-2 text-white dark:text-gray-300 z-50" 
                            onClick={() => setMobileIsMenuOpen(!isMobileMenuOpen)}
                            aria-label={isMobileMenuOpen ? "Close Menu": "Open Menu"}>
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                    ) : (
                        <Link
                            href="/auth"
                            className="md:hidden inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-sm font-medium rounded-lg hover:from-pink-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            Iniciar sesión
                        </Link>
                    )}

                    <div className={"flex flex-col items-center justify-center bg-slate-900/95 inset-0 fixed backdrop-blur-sm transition-all divide-neutral-300 gap-6" +
                      (isMobileMenuOpen ? " opacity-100 pointer-events-auto" : " opacity-0 pointer-events-none")}>
                        {user ? (
                          navItems.map((item) => {
                            return (
                              <Link 
                                  key={item.href}
                                  href={item.href} 
                                  onClick={() => setMobileIsMenuOpen(!isMobileMenuOpen)}
                                className="text-white text-lg font-medium py-2 block w-full text-center transition-colors duration-200 hover:bg-neutral-800">
                                    {item.label}
                            </Link>
                          )
                        })) : ""}

                        {user ? (
                            <button
                          onClick={()=> {
                            signOut()
                            setMobileIsMenuOpen(!isMobileMenuOpen)
                          }}
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Cerrar sesión
                        </button>
                        ): ""}

                    </div>
                </div>
            </div>
        </nav>
    )
}
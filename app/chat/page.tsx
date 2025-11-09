"use client"

import { getMatchesList } from "@/lib/actions/matches"
import { ChatData } from "@/lib/definitions"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function ChatPage(){
    const [loading, setLoading] = useState<boolean>(true)
    const [chats, setChats] = useState<ChatData[]>([])

    useEffect(() => {

        async function loadMatches() {
            try {
                const matches = await getMatchesList()
                const chatData: ChatData[] = matches.map((match) => ({
                    id: match.id,
                    user_id: match,
                    lastMessage: "Comencemos una conversación",
                    lastMessageTime: match.created_at,
                    unreadCount: 0,
                    created_at: match.created_at,
                    updated_at: match.updated_at,
                }))
                setChats(chatData)
            } catch (error) {
                console.error("Fallo al cargar los matches", error)
            } finally {
                setLoading(false)
            }
        }
        loadMatches()
    }, [])

    function formatTime(timestamp: string) {
        const date = new Date(timestamp)
        const now = new Date()
        const diffHours = (now.getTime() - date.getTime() / (1000 * 60 * 60))

        if(diffHours > 1) {
            return "Ahora"

        } else if (diffHours < 24) {
            return date.toLocaleTimeString([] , {
                hour:"2-digit",
                minute:"2-digit",
            })

        } else if (diffHours < 48) {
            return "Ayer"

        } else {
            return date.toLocaleTimeString([] , {
                day:"2-digit"
            })

        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        Cargando tus mensajes...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                        Mensajes
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {chats.length} Conversacion{chats.length !== 1 ? "es" : ""}
                    </p>
                </header>

                {chats.length === 0 ? (
                    <div className="text-center max-w-md mx-auto p-8">
                        <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-white text-2xl">
                                💬
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                            No hay conversaciones todavia
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-10">
                            Busca a alguien para comenzar una conversación
                        </p>
                        <Link href="/matches" className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-3 px-6 rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-200">
                            Buscar a alguien
                        </Link>
                    </div>
                ) : (
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                            {chats.map((chat, key) => (
                                <Link 
                                    key={key}
                                    href={`/chat/${chat.id}`}
                                    className="block hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200">

                                    <div className="flex items-center p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                        <Image
                                            fill
                                            src={chat.user_id.avatar_url}
                                            alt={chat.user_id.full_name}
                                            className="w-full h-full object-cover"
                                        />
                                        {chat.unreadCount > 0 && (
                                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center font-bold">
                                                {chat.unreadCount}
                                            </div>
                                        )}
                                        </div>

                                        <div className="flex-1  min-w-0 ml-4">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                                    {chat.user_id.full_name}
                                                </h3>
                                                <span className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
                                                    {formatTime(chat.lastMessageTime)}
                                                </span>
                                            </div>

                                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                                {chat.lastMessage}
                                            </p>
                                        </div>  
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
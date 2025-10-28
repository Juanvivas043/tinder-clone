"use client"

import { createOrGetChannel, createVideoCall, getStreamUserToken } from "@/lib/actions/stream";
import { Message, UserProfile } from "@/lib/definitions";
import router from "next/router";
import { RefObject, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Channel, StreamChat } from "stream-chat";
import Image from "next/image";
import VideoCall from "./VideoCall";

export default function StreamChatInterface({otherUser, ref} : {otherUser: UserProfile, ref: RefObject<{ handleVideoCall: () => void } | null>}) {
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    const [userId, setCurrentUserId] = useState<string>("")
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState<string>("")

    const [showScrollBottom, setShowScrollButton] = useState<boolean>(false) 

    const [client, setClient] = useState<StreamChat | null>(null)
    const [channel, setChannel] = useState<Channel | null>(null)

    const [videoCallId, setVideoCallId] = useState<string>("")
    const [showVideoCall, setShowVideoCall] = useState<boolean>(false)
    const [isCallInitiator, setIsCallInitiator] = useState<boolean>(false)
    const [incomingCallId, setIncomingCallId] = useState<string>("")
    const [showIncomingCall, setShowIncomingCall] = useState<boolean>(false)
    const [callerName, setCallerName] = useState<string>("")


    const messagesEndRef = useRef<HTMLDivElement>(null)
    const messagesContainerRef = useRef<HTMLDivElement>(null)

    function scrollToBottom() {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
        setShowScrollButton(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function handleScroll() {
        if (messagesContainerRef.current) {
            const {scrollTop, scrollHeight, clientHeight} = messagesContainerRef.current
            const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
            setShowScrollButton(!isNearBottom)
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        const container = messagesContainerRef.current

        if (container) {
           container.addEventListener("scroll", handleScroll)
           return () => container.removeEventListener("scroll", handleScroll)
        }
    }, [handleScroll])

    useEffect(() => {

        setShowVideoCall(false)
        setShowIncomingCall(false)
        setVideoCallId("")
        setIncomingCallId("")
        setCallerName("")
        setIsCallInitiator(false)

        async function initializeChat() {
            try {
                const {token, userId, userName, userImage } = await getStreamUserToken()
                setCurrentUserId(userId!)

                const chatClient = StreamChat.getInstance(
                    process.env.NEXT_PUBLIC_STREAM_API_KEY!
                )

                await chatClient.connectUser({
                    id: userId!,
                    name: userName,
                    image: userImage,
                }, token)

                const {channelType, channelId} = await createOrGetChannel(otherUser.id)

                const chatChannel = chatClient.channel(channelType!, channelId)
                await chatChannel.watch()

                const state = await chatChannel.query({messages: {limit: 50}})
                
                const convertedMessages: Message[] = state.messages.map((msg) => ({
                    id: msg.id,
                    text: msg.text || "",
                    sender: msg.user?.id === userId ? "yo" : "otro",
                    timestamp: new Date(msg.created_at || new Date()),
                    user_id: msg.user?.id || "",
                }))

                setMessages(convertedMessages)

                chatChannel.on("message.new", (event) => {
                    if(event.message) {

                        if(event.message.text?.includes(`📸 Invitacion a videollamada`)) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const customData = event.message as any

                            if(customData.caller_id !== userId) {
                                setIncomingCallId(customData.call_id)
                                setCallerName(customData.caller_name || "Alguien")
                                setShowIncomingCall(true)
                            }

                            return
                        }

                        if(event.message.user?.id !== userId) {
                            const newMsg: Message = {
                                id: event.message.id,
                                text: event.message.text || "",
                                sender: "otro",
                                timestamp: new Date(event.message.created_at || new Date()),
                                user_id: event.message.user?.id || ""
                            }

                            setMessages((prev) => {
                                const messageExists = prev.some((msg) => msg.id === newMsg.id)  
                                                            
                                if (!messageExists) {
                                  return [...prev, newMsg]
                                }
                            
                                return prev
                })
                        }
                    }
                })

                setClient(chatClient)
                setChannel(chatChannel)
                
            } catch {
                router.push("/chat")

            } finally {
                setLoading(false)

            }

        }

        if(otherUser) {
            initializeChat()
        }

        return () => {
            if(client) {
                client.disconnectUser()
            }
        }

    }, [otherUser])

    function formatTime(date: Date){
        return date.toLocaleDateString([], {hour: "2-digit", minute: "2-digit"})
    }

    async function handleVideoCall() {
        try {
            const {callId} = await createVideoCall(otherUser.id)
            setVideoCallId(callId!)
            setShowVideoCall(true)
            setIsCallInitiator(true)

            if (channel) {
                const messageData = {
                    text: `📸 Invitacion a videollamada`,
                    call_id: callId!,
                    caller_id: userId,
                    caller_name: otherUser.full_name || "Alguien"
                }

                await channel.sendMessage(messageData)
            }
            
        } catch(error) {
            console.error(error)
        } finally {

        }
    }

    useImperativeHandle(ref, () => ({
        handleVideoCall
    }))

    function handleDeclineCall() {
        setShowIncomingCall(false)
        setIncomingCallId("")
        setCallerName("")
    }

    function handleAcceptCall(){
        setVideoCallId(incomingCallId)
        setShowVideoCall(true)
        setShowIncomingCall(false)
        setIncomingCallId("")
        setCallerName("")
        setIsCallInitiator(false)

    }

    async function handleSendMessage(e: React.FormEvent) {
        e.preventDefault()

        if (newMessage.trim() && channel) {
            try {
                const response = await channel.sendMessage({
                    text: newMessage.trim()
                })

                const message: Message = {
                    id: response.message.id,
                    text: newMessage.trim(),
                    sender: "yo",
                    timestamp: new Date(),
                    user_id: userId

                }

                setMessages((prev) => {
                  const messageExists = prev.some((msg) => msg.id === message.id)  

                  if (!messageExists) {
                    return [...prev, message]
                  }

                  return prev
                })

                setNewMessage("")

            } catch (error) {
                console.error("Fallo al enviar el mensaje: ", error)
            }
        }
    }
    if (!client || !channel) {
        return (
            <div className="flex-1 h-full flex items-center justify-center bg-white dark:bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                            Cargando el chat...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-white dark:bg-gray-900">
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth chat-scrollbar relative" style={{scrollBehavior: "smooth"}}>

                {messages.map((message, key) => (
                    <div 
                        key={key} 
                        className={`flex ${
                            message.sender === "yo" ? "justify-end" : "justify-start"
                        }`}
                    >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            message.sender === "yo" ? "bg-gradient-to-r from-pink-500 to-red-500 text-white" :
                            "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white" 
                        }`}>
                            <p className="text-sm">
                                {message.text}
                            </p>

                            <p className={`text-xs mt-1 ${
                                message.sender === "yo" ?
                                "text-pink-100" :
                                "text-gray-500 dark:text-gray-400"
                            }`}>
                                {formatTime(message.timestamp)}
                            </p>
                        </div>
                    </div>
                ))}

                <div ref={messagesEndRef}/>
            </div>

            {showScrollBottom && (
                <div className="absolute bottom-15 right-8 z-10">
                    <button
                      onClick={scrollToBottom}
                      className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                      title="Scroll to bottom"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </button>
                </div>
            )}

            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <form className="flex space-x-2" onSubmit={handleSendMessage}>
                    <input 
                    type="text"
                    value={newMessage}
                    onChange={(e) =>setNewMessage(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    disabled={!channel}/>

                    <button
                        type="submit"
                        disabled={!newMessage.trim() || !channel}
                        className="px-6 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full hover:from-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 12h14m-7-7l7 7-7 7"
                            />
                        </svg>
                    </button>
                </form>
            </div>
            
            {showIncomingCall && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-sm mx-4 shadow-2xl">
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-4 border-pink-500">
                                <Image
                                src={otherUser.avatar_url}
                                alt={otherUser.full_name}
                                className="w-full h-full object-cover"/>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Videollamada entrante
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            {callerName} te esta llamando
                        </p>

                        <div className="flex space-x-4">
                            <button
                                onClick={handleDeclineCall}
                                className="flex-1 bg-red-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-red-600 transition-colors duration-200"
                            >
                                Rechazar
                            </button>
                            <button
                                onClick={handleAcceptCall}
                                className="flex-1 bg-green-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-green-600 transition-colors duration-200"
                            >
                                Aceptar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showVideoCall && videoCallId && (
                <VideoCall onCallEnd={() => console.log("Llamada cerrada")} callId={videoCallId} isIncoming={!isCallInitiator}/>
            )}
        </div>
    )
}
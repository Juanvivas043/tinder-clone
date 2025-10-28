import { getStreamVideoToken } from "@/lib/actions/stream"
import { VideoCallProps } from "@/lib/definitions"
import { Call, CallControls, SpeakerLayout, StreamCall, StreamTheme, StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

import "@stream-io/video-react-sdk/dist/css/styles.css";

export default function VideoCall({callId, onCallEnd, isIncoming = false}: VideoCallProps) {
    const [client, setClient] = useState<StreamVideoClient | null>(null)
    const [call, setCall] = useState<Call | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [hasJoined, setHasJoined] = useState<boolean>(false)

    useEffect(() => {  
        let isMounted = true

        async function InitializeVideoCall() {

            if(hasJoined) return

            try {
                setError(null)

                const {token, userId, userName, userImage} = await getStreamVideoToken()

                if (!isMounted) return 

                const videoClient = new StreamVideoClient({
                    apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
                    user:{
                        id: userId!,
                        name: userName,
                        image: userImage
                    },
                    token
                })

                if (!isMounted) return 

                const videoCall = videoClient.call("default", callId)

                if(isIncoming) {
                    await videoCall.join()
                } else {
                    await videoCall.join({ create: true })
                }

                if (!isMounted) return 

                setClient(videoClient)
                setCall(videoCall)
                setHasJoined(true)

                return () => {
                    isMounted = false
                    if (call && hasJoined) {
                        call.leave()
                    }

                    if (client) {
                        client.disconnectUser()
                    }
                }
            } catch (error) {
                console.error(error)
                setError("Fallo al iniciar la llamada")
            } finally{
                setLoading(false)
            }
        }

        InitializeVideoCall()

    }, [callId, isIncoming])

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-lg">
                        {isIncoming ? "Uniendose a la llamada..." : "Iniciando la llamada..."}
                    </p>
                </div>
            </div>
        );
    }

    if (!client || !call) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-lg">Configurando la llamada...</p>
                </div>
          </div>
    );
    }

    return(
        <div className="fixed inset-0 bg-black z-50">
            <StreamVideo client={client}>
                <StreamCall call={call}>
                    <StreamTheme>
                        <SpeakerLayout/>
                        <CallControls onLeave={onCallEnd}/>
                    </StreamTheme>
                </StreamCall>
            </StreamVideo>
        </div>
    )
}
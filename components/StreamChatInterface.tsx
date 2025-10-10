import { UserProfile } from "@/lib/definitions";
import router from "next/router";
import { useEffect, useState } from "react";

export default function StreamChatInterface({otherUser} : {otherUser: UserProfile}) {
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {

        async function initializeChat() {
            try {
                //const {token, userId, UserName, userImage } = await getStreamUserToken()

            } catch {
                router.push("/chat")

            } finally {
                setLoading(false)

            }

        }

        if(otherUser) {
            initializeChat()
        }

    }, [otherUser])

    return (
        <div>

        </div>
    )
}
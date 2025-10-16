"use server"

import { StreamChat } from "stream-chat"
import { createClient } from "../supabase/server"

export async function getStreamUserToken() {

    const supabase = await createClient()

    const {data: {user}} = await supabase.auth.getUser()

    if (!user) {
        return {success: false, error: "Usuario no autenticado"}
    }

    const {data: userData , error: userError} = await supabase.from("users").select("full_name, avatar_url").eq("id", user.id).single()

    if (userError) {
        console.error("Fallo al cargar la data del usuario: ", userError)
        throw new Error("Fallo al cargar la data del usuario")
    }
    
    const serverClient = StreamChat.getInstance(
        process.env.NEXT_PUBLIC_STREAM_API_KEY!,
        process.env.STREAM_API_SECRET_KEY!
    )

    const token = serverClient.createToken(user.id)

    await serverClient.upsertUser({
        id: user.id,
        name: userData.full_name,
        image: userData.avatar_url || undefined
    })

    return {
        token,
        userId: user.id,
        userName: userData.full_name,
        userImage: userData.avatar_url || undefined
    }
}

export async function createOrGetChannel(otherUserId: string){
    const supabase = await createClient()

    const {data: {user}} = await supabase.auth.getUser()

    if (!user) {
        return {success: false, error: "Usuario no autenticado"}
    }

    const {data: matches, error: matchError} = await supabase.from("matches").select("*").or(
        `and(user1_id.eq.${user.id}, user2_id.eq.${otherUserId}), and(user1_id.eq.${otherUserId}, user2_id.eq.${user.id})`
    ).eq("is_active", true).single()

    if(matchError || !matches) {
        throw new Error("No hay match. No se puede crear un canal")
    }

    const sortedIds = [user.id, otherUserId].sort()
    const combineIds = sortedIds.join("_")   

    let hash = 0;
        for (let i = 0; i < combineIds.length; i++) {
          const char = combineIds.charCodeAt(i);
          hash = (hash << 5) - hash + char;
          hash = hash & hash;
        }
    
    const channelId = `match_${Math.abs(hash).toString(36)}`;

    const serverClient = StreamChat.getInstance(
        process.env.NEXT_PUBLIC_STREAM_API_KEY!,
        process.env.STREAM_API_SECRET_KEY!
    )

    const {data: otherUserData , error: otherUserError} = await supabase
        .from("users").select("full_name, avatar_url").eq("id", otherUserId).single()

    if (otherUserError) {
        console.error("Fallo al cargar la data del usuario: ", otherUserError)
        throw new Error("Fallo al cargar la data del usuario")
    }

    const channel = serverClient.channel("messaging", channelId, {
        members: [user.id, otherUserId],
        created_by_id: user.id
    })

    await serverClient.upsertUser({
        id: otherUserId,
        name: otherUserData.full_name,
        image: otherUserData.avatar_url || undefined
    })

    try {
        await channel.create()
        console.log("Se creo correctamente el canal", channelId)

    } catch (error) {
        console.log("Fallo al crear el canal", error)

        if (error instanceof Error && !error.message.includes("already exists")) {
            throw error
        }
    }

    return {
        channelType: "messaging",
        channelId
    }
}
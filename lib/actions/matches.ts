"use server"

import { createClient } from "@/lib/supabase/server";
import { UserProfile } from "../definitions";
import { error } from "console";

type ActionResult = { success: true } | { success: false, message: string };


export default async function getPotentialMatches(): Promise<UserProfile[]> {
    const supabase = await createClient()

    const {data: {user}} = await supabase.auth.getUser()

    if (!user) {
        throw new Error("No autenticado")
    }

    const {data: potentialMatches, error} = await supabase.from("users").select("*").neq("id", user.id).limit(50)

    if (error) {
        throw new Error("Fallo al cargar las potenciales parejas")
    }

    const {data: userPrefs, error: prefsError} = await supabase.from("users").select("preferences").eq("id", user.id).single()

    if (prefsError) {
        throw new Error("Fallo al cargar las preferencias")
    }

    const currentUserPrefs = userPrefs.preferences
    const genderPreferences = currentUserPrefs?.gender_preference || []

    const filteredMatches = potentialMatches.filter((match) => {
        if (!genderPreferences || genderPreferences.length === 0 ) {
            return true
        }

        return genderPreferences.includes(match.gender)
    }).map((match) => ({
        id: match.id,
        full_name: match.full_name,
        username: match.username,
        email: "",
        gender: match.gender,
        birthdate: match.birthdate,
        bio: match.bio,
        avatar_url: match.avatar_url,
        preferences: match.preferences,
        location_lat: undefined,
        location_lng: undefined,
        last_active: new Date().toISOString(),
        is_verified: true,
        is_online: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    })) || []

    return filteredMatches
}

export async function likeUser(toUserId: string) {
    const supabase = await createClient()

    const {data: {user}} = await supabase.auth.getUser()

    if (!user) {
        throw new Error("No autenticado")
    }

    const {error: likeError} = await supabase.from("likes").insert({
        from_user_id: user.id,
        to_user_id: toUserId
    })

    if(likeError) {
        throw new Error("Fallo al crear el like")
    }

    const { data: existingLike, error: checkError} = await supabase.from("likes").select("*").eq("from_user_id", toUserId).eq("to_user_id", user.id).single()

    if (checkError && checkError.code !== "PGRST116")  {
        throw new Error ("Fallo al buscar para match")
    }

    if (existingLike) {
        const {data: matchedUser, error: userError} = await supabase.from("users").select("*").eq("id", toUserId).single()

        if (userError) {
            throw new Error ("Fallo al cargar el perfil del match")
        }

        return { success: true, isMatch: true, matchedUser: matchedUser as UserProfile }
    }

    return { success: true, isMatch: false }
}
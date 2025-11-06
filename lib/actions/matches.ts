"use server"

import { createClient } from "@/lib/supabase/server";
import { UserProfile } from "../definitions";
import calculateAge from "../helpers/calculateAge";
import CalculateDistance from "../helpers/calculateDistance";

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
    const ageMinPreference = currentUserPrefs?.age_range?.min || 0
    const ageMaxPreference = currentUserPrefs?.age_range?.max || 100
    const distancePreference = currentUserPrefs?.distance || 50
    const filteredMatches = potentialMatches.filter((match) => {

        const meetsGenderCriteria = 
            genderPreferences.length === 0 || 
            genderPreferences.includes(match.gender);
        
        if (!meetsGenderCriteria) {
            return false; 
        }

        const matchAge = calculateAge(match.birthdate);
        const meetsAgeCriteria = 
            matchAge >= ageMinPreference && 
            matchAge <= ageMaxPreference;
        
        if (!meetsAgeCriteria) {
            return false; 
        }

        const locationLat = match.location_lat || 0
        const locationLng = match.location_lng || 0
        const distance = CalculateDistance(
            locationLat,
            locationLng,
            currentUserPrefs.location_lat || 0,
            currentUserPrefs.location_lng || 0
        )

        const meetsDistanceCriteria = distance <= distancePreference

        if (!meetsDistanceCriteria) {
            return false; 
        }

        return true
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


export async function getMatchesList() {
    const supabase = await createClient()

    const {data: {user}} = await supabase.auth.getUser() 

    if (!user) {
        throw new Error ("No autenticado")
    } 

    const {data: matches, error} = await supabase.from("matches").select("*").or(`user1_id.eq.${user.id}, user2_id.eq.${user.id}`).eq("is_active", true)

    if (error) {
        throw new Error("Fallo al cargar los usuarios")
    }

    const matchedUser: UserProfile[] = []

    for (const match of matches || []) {
        const otherUserId = match.user1_id === user.id ? match.user2_id : match.user1_id

        const {data: otherUser, error: userError} = await supabase.from("users").select("*").eq("id", otherUserId).single()

        if (userError) {
            continue
        }

        matchedUser.push({
            id: otherUser.id,
            full_name: otherUser.full_name,
            username: otherUser.username,
            email: "",
            gender: otherUser.gender,
            birthdate: otherUser.birthdate,
            bio: otherUser.bio,
            avatar_url: otherUser.avatar_url,
            preferences: otherUser.preferences,
            location_lat: undefined,
            location_lng: undefined,
            last_active: new Date().toISOString(),
            is_verified: true,
            is_online: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        })

    }
    
    return matchedUser

}
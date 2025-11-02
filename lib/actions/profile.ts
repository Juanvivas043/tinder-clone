"use server"

import { createClient } from "@/lib/supabase/server"
import { UserProfile } from "../definitions"

export async function getCurrentUserProfile() {
    const supabase = await createClient()

    const {data: {user}} = await supabase.auth.getUser()

    if (!user) {
        return null
    }

    const {data: profile, error} = await supabase.from("users").select("*").eq("id", user.id).single()

    if (error) {
        console.error("Error al cargar los datos del usuario:", error)
        return null
    }

    return profile
}


export async function uploadProfilePhoto(file : File) {
    const supabase = await createClient()

    const {data: {user}} = await supabase.auth.getUser()

    if (!user) {
        return {success: false, error: "Usuario no autenticado"}
    }

    const fileExt = file.name.split(".").pop()
    const fileName = `${user.id}-${Date.now()}.${fileExt}` 

    const {error} = await supabase.storage.from("profile-photos").upload(fileName, file, {
        cacheControl: "3600",
        upsert: false
    })

    if (error) {
        return {success: false, error: error.message}
    }

    const { data: {publicUrl}} = supabase.storage.from("profile-photos").getPublicUrl(fileName)
    return {success: true, url: publicUrl}
}


export async function updateUserProfile(profileData: Partial<UserProfile>) {
    const supabase = await createClient()

    const {data: {user}} = await supabase.auth.getUser()

    if (!user) {
        return {success: false, error: "Usuario no autenticado"}
    }

    const preferencesPayload = { 
        age_range: profileData.preferences?.age_range || {min: 18, max: 99},
        distance: profileData.preferences?.distance || 50,
        gender_preference: profileData.preferences?.gender_preferences || [], // Aquí va el array (ej: ["male", "other"])
    };

    const {error} = await supabase.from("users").update({
        full_name: profileData.full_name,
        username: profileData.username,
        bio: profileData.bio,
        gender: profileData.gender,
        preferences: preferencesPayload,
        birthdate: profileData.birthdate,
        avatar_url: profileData.avatar_url,
        updated_at: new Date().toISOString()
    }).eq("id", user.id)

    if(error){
        console.log(error);
        return { success: false, error: error.message }
    }

    return { success: true }
}
"use client"

import PhotoUpload from "@/components/PhotoUpload"
import { getCurrentUserProfile, updateUserProfile } from "@/lib/actions/profile"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditProfilePage() {
    const [loading, setLoading] = useState<boolean>(true)
    const [saving, setSaving] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const [formData, setFormData] = useState({
        full_name: "",
        username: "",
        bio: "",
        gender: "male" as "male" | "female" | "other",
        preferences: {
            gender_preference: [] as ("male" | "female" | "other")[], 
            distance: 50,
            age_range: {
                min: 18, 
                max: 50,
            },
        },
        birthdate: "",
        avatar_url: ""
    })

    useEffect(() => {
       async function loadProfile() {
        try {
            const profile = await getCurrentUserProfile()
            if (profile) {
                setFormData({
                    full_name: profile.full_name || "",
                    username: profile.username || "",
                    bio: profile.bio || "",
                    gender: profile.gender || "male",
                    preferences: {
                        gender_preference: profile.preferences?.gender_preference || [],
                        distance: profile.preferences?.distance || '50',
                        age_range: profile.preferences?.age_range || {min: 18, max: 99},
                    },
                    birthdate: profile.birthdate || "",
                    avatar_url: profile.avatar_url || ""
                })
            }
        } catch {
            setError("Error al cargar el perfil")
        } finally {
            await new Promise((resolve) => setTimeout(resolve, 700));
            setLoading(false)
        }
       }

       loadProfile()
    }, [])

    async function handleFormSubmit(e: React.FormEvent){

        console.log(formData)

        e.preventDefault()
        setSaving(true)
        setError(null)

        try {
            const result = await updateUserProfile(formData)
            if (result) {
                router.push("/profile")
            } else {
                setError("Error al actualizar los datos")
            }

        } catch {
            setError("Error al actualizar los datos")

        } finally {
            setSaving(false)

        }
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    function handlePreferencesChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {value, checked, name} = e.target
        setFormData((prev) => {
            const genderPreferences = checked ? [...prev.preferences.gender_preference, value] as ("male" | "female" | "other")[] : prev.preferences.gender_preference.filter(pref => pref !== value) 
            return {
                ...prev,
                preferences: {
                    ...prev.preferences,
                    gender_preference: genderPreferences,
                    age_range: {
                        ...prev.preferences.age_range,
                        [name]: value || '',
                    },
                    [name]: value || '',
                }
            }
        })
    }

    if (loading) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Cargando Perfil...
              </p>
            </div>
          </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Editar Perfil
                    </h1>

                    <p className="text-gray-600 dark:text-gray-400">
                        Actualiza tu información
                    </p>
                </header>

                <div className="max-w-2xl mx-auto">
                    <form className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8" onSubmit={handleFormSubmit}>
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                                Foto de Perfil
                            </label>

                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-full overflow-hidden">
                                        <Image
                                        src={formData.avatar_url || "/default-avatar.png"}
                                        alt="Foto de perfil"
                                        width={100}
                                        height={100}
                                        />
                                    </div>

                                    <PhotoUpload onPhotoUploaded={(url)=> {
                                        setFormData((prev) => ({
                                            ...prev,
                                            avatar_url: url

                                        }))
                                    }}/>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        Cambia tu foto de perfil
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500">
                                        JPG, PNG o GIF. Hasta 5MB
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label 
                                htmlFor="full_name"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Nombre completo
                                </label>
                                <input 
                                type="text" 
                                id="full_name"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                placeholder="Introduce tu nombre completo"
                                />
                            </div>
                            <div>
                                <label 
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                   Usuario
                                </label>
                                <input 
                                type="text" 
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                placeholder="Introduce tu usuario"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label 
                                htmlFor="gender"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Género
                                </label>
                                <select 
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                >
                                <option value="male">Masculino</option>
                                <option value="female">Femenino</option>
                                <option value="other">Otro</option>
                                </select>
                            </div>
                            <div>
                                <label 
                                htmlFor="birthdate"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                   Fecha de nacimiento
                                </label>
                                <input 
                                type="date" 
                                id="birthdate"
                                name="birthdate"
                                value={formData.birthdate}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label 
                                htmlFor="bio"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Biografía
                            </label>
                            <textarea 
                                id="bio"
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                placeholder="Escribe una breve biografía"
                                rows={4}
                                maxLength={500}
                            />
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {formData.bio.length} / 500 caracteres
                            </p>
                        </div>
                        
                        <h3 className="text-md font-semibold mb-4">
                            Preferencias
                        </h3>

                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 mb-6 gap-6">
                                <div>
                                    <label 
                                        htmlFor="distance"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >Distancia</label>
                                    <div className="flex items-center gap-3">
                                        <input 
                                            type="text" 
                                            id="distance"
                                            name="distance"
                                            value={formData.preferences.distance}
                                            onChange={handlePreferencesChange}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Introduce tu distancia de otros preferida"
                                        />
                                        <label 
                                            htmlFor="km"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >km</label>
                                    </div>
                                </div>

                                <div>
                                    <label 
                                        htmlFor="agerange"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >Rango de Edad</label>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex items-center gap-2 md:px-2">
                                            <input 
                                                type="number" 
                                                id="min"
                                                max={100}
                                                min={18}
                                                name="min"
                                                value={formData.preferences.age_range.min}
                                                onChange={handlePreferencesChange}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                placeholder="Introduce tu edad mínima"
                                            />
                                            <label 
                                                htmlFor="min"
                                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >Min</label>
                                        </div>

                                        <div className="flex items-center gap-2 md:px-2">
                                            <input 
                                                type="number" 
                                                id="max"
                                                name="max"
                                                max={100}
                                                min={18}
                                                value={formData.preferences.age_range.max}
                                                onChange={handlePreferencesChange}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                placeholder="Introduce tu edad máxima"
                                            />
                                            <label 
                                                htmlFor="max"
                                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >Max</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    <div className="grid grid-cols-1 mb-6">
                            <label 
                                htmlFor="gender"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >Géneros</label>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                <div className="flex items-center justify-between pl-3">
                                    <label 
                                        htmlFor="male"
                                        className="text-sm font-medium">Masculinos</label>
                                    <input
                                        type="checkbox"
                                        id="male"
                                        name="male"
                                        value="male"
                                        onChange={handlePreferencesChange}
                                        checked={formData.preferences.gender_preference.includes("male")}
                                        className="h-4 w-4 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        >
                                    </input>    
                                </div>
                                <div className="flex items-center justify-between pl-3">
                                    <label 
                                        htmlFor="female"
                                        className="text-sm font-medium">Femeninos</label>
                                    <input
                                        type="checkbox"
                                        id="female"
                                        name="female"
                                        value="female"
                                        onChange={handlePreferencesChange}
                                        checked={formData.preferences.gender_preference.includes("female")}
                                        className="h-4 w-4 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        >
                                    </input>    
                                </div>
                                <div className="flex items-center justify-between pl-3">
                                    <label 
                                        htmlFor="other"
                                        className="text-sm font-medium">Otros</label>
                                    <input
                                        type="checkbox"
                                        id="other"
                                        name="other"
                                        value="other"
                                        onChange={handlePreferencesChange}
                                        checked={formData.preferences.gender_preference.includes("other")}
                                        className="h-4 w-4 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        >
                                    </input>    
                                </div>
                            </div>
                        </div>

                        {error && (
                          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {error}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                            <button
                              type="button"
                              onClick={() => router.back()}
                              className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                            >
                              Cancelar
                            </button>
                            <button
                              type="submit"
                              disabled={saving}
                              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                              {saving ? "Guardando..." : "Guardar cambios"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}
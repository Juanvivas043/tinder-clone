"use client"

import PhotoUpload from "@/components/PhotoUpload"
import { getCurrentUserProfile, updateUserProfile } from "@/lib/actions/profile"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditProfile() {
    const [loading, setLoading] = useState<boolean>(true)
    const [saving, setSaving] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const [formData, setFormData] = useState({
        full_name: "",
        username: "",
        bio: "",
        gender: "male" as "male" | "female" | "other",
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

    if (loading) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
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
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
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

                        <div className="mb-8">
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
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={saving}
                              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                              {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}
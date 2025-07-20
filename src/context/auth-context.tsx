"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { datadogRum } from "@datadog/browser-rum"

import { AuthService, AuthServiceImpl } from "@/domain/services/AuthServiceImpl"

import { createClient } from "@/utils/supabase/client"
interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

interface User {
  id: string
  email: string
  createdAt: string
  updatedAt: string
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // Obtener una instancia del servicio de autenticación desde el contenedor de dependencias
  // o importar directamente según la configuración del proyecto

  const supabase = createClient()
  const authService = AuthServiceImpl.create(supabase)
  const checkUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser()
      console.log("👀 currentUser", currentUser)
      if (currentUser) {
        setUser({
          id: currentUser.id,
          email: currentUser.email || "",
          createdAt: currentUser.createdAt.toISOString(),
          updatedAt: currentUser.updatedAt.toISOString(),
        })
      }
    } catch (err) {
      console.error("Error checking authentication:", err)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    // Verificar si hay un usuario ya autenticado al cargar

    console.log("👀 checkUser")
    checkUser()
  }, [])
  useEffect(() => {
    // Suscribirse a los cambios de autenticación en Supabase
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      // console.log("🗺️🗺️ event", event, "session", session)
      if (event === "SIGNED_IN" && user === null) {
        console.log("👀 event SIGN IN", event, "session", session)
        if (session?.user) {
          const user = {
            id: session.user.id,
            email: session.user.email || "",
            createdAt: session.user.created_at || new Date().toISOString(),
            updatedAt: session.user.updated_at || new Date().toISOString(),
          }
          setUser(user)

          if (datadogRum.getInternalContext()) {
            datadogRum.setUser({
              id: session.user.id,       // ID único del usuario (obligatorio si vas a enviar datos de usuario)
              name: '-',    // (opcional) Nombre del usuario
              email: session.user.email // (opcional) Email u otros datos útiles
            });
          }
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null)
        if (datadogRum.getInternalContext()) {
          datadogRum.clearUser()
        }
      } else if (event === "INITIAL_SESSION" && user === null) {
        // console.log("👀 event INITIAL_SESSION", event, "session", session)
        // if (session?.user) {
        //   const user = {
        //     id: session.user.id,
        //     email: session.user.email || "",
        //     createdAt: session.user.created_at || new Date().toISOString(),
        //     updatedAt: session.user.updated_at || new Date().toISOString(),
        //   }
        //   //setUser(user)
        // } else {
        //   //setUser(null)
        // }
      }
    })

    // Limpiar la suscripción cuando el componente se desmonte
    return () => {
      subscription.unsubscribe()
    }
  }, [authService, supabase.auth])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      const result = await authService.login(email, password)

      if (!result) {
        throw new Error("No se pudo iniciar sesión")
      }

      setUser({
        id: result.user.id,
        email: result.user.email || "",
        createdAt: result.user.createdAt.toISOString(),
        updatedAt: result.user.updatedAt.toISOString(),
      })
      if (datadogRum.getInternalContext()) {
        datadogRum.setUser({
          id: result.user.id,       // ID único del usuario (obligatorio si vas a enviar datos de usuario)
          name: '-',    // (opcional) Nombre del usuario
          email: result.user.email // (opcional) Email u otros datos útiles
        });
      }

      // En un sistema real, guardaríamos el token en localStorage o similar
      localStorage.setItem("auth_token", result.token)
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      const result = await authService.register(name, email, password)

      setUser({
        id: result.user.id,
        email: result.user.email || "",
        createdAt: result.user.createdAt.toISOString(),
        updatedAt: result.user.updatedAt.toISOString(),
      })
      

      // En un sistema real, guardaríamos el token en localStorage o similar
      localStorage.setItem("auth_token", result.token)
    } catch (err: any) {
      setError(err.message || "Error al registrarse")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      setError(null)

      await authService.logout()

      setUser(null)
      if (datadogRum.getInternalContext()) {
        datadogRum.clearUser()
      }
      localStorage.removeItem("auth_token")
    } catch (err: any) {
      setError(err.message || "Error al cerrar sesión")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }

  return context
}

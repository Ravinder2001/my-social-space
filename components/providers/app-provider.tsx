"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useToast } from "@/components/ui/use-toast"

type User = {
  id: string
  name: string
  email: string
  avatar: string
}

type AppContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, avatar?: File) => Promise<void>
  logout: () => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()

  // Sync isDarkMode with theme provider
  useEffect(() => {
    setIsDarkMode(theme === "dark")
  }, [theme])

  // Mock authentication functions
  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock successful login
    setUser({
      id: "1",
      name: "Demo User",
      email: email,
      avatar: "/placeholder.svg?height=128&width=128",
    })

    toast({
      title: "Logged in successfully",
      description: "Welcome back to Nexus!",
    })
  }

  const register = async (name: string, email: string, password: string, avatar?: File) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock successful registration
    setUser({
      id: "1",
      name: name,
      email: email,
      avatar: "/placeholder.svg?height=128&width=128",
    })

    toast({
      title: "Account created",
      description: "Welcome to Nexus!",
    })
  }

  const logout = () => {
    setUser(null)
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
  }

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? "light" : "dark"
    setIsDarkMode(!isDarkMode)
    setTheme(newTheme)
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    isDarkMode,
    toggleDarkMode,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}

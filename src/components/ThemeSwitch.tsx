"use client"

import { useState, useEffect } from "react"
import { Switch } from "@/components/ui/Switch"
import { Sun, Moon } from "@/components/ui/icons"

export function ThemeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check if dark mode preference is saved in localStorage
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches

    // Set initial state based on saved preference or system preference
    setIsDarkMode(savedTheme === "dark" || (!savedTheme && prefersDark))

    // Apply the theme to the document
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)

    // Save preference to localStorage
    localStorage.setItem("theme", newMode ? "dark" : "light")

    // Apply the theme to the document
    document.documentElement.classList.toggle("dark", newMode)
  }

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-5 w-5 text-yellow-400" />
      <Switch
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
        aria-label="Toggle dark mode"
      />
      <Moon className="h-5 w-5 text-blue-300" />
    </div>
  )
}

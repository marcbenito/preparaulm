"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

interface CookieConsent {
  analytics: boolean
  functional: boolean
  hasDecided: boolean
  timestamp: number
}

interface CookieConsentContextType {
  consent: CookieConsent
  acceptAll: () => void
  rejectAll: () => void
  updateConsent: (updates: Partial<CookieConsent>) => void
  showBanner: boolean
  resetConsent: () => void
}

const CookieConsentContext = createContext<
  CookieConsentContextType | undefined
>(undefined)

const STORAGE_KEY = "aerotest-cookie-consent"

const defaultConsent: CookieConsent = {
  analytics: false,
  functional: true,
  hasDecided: false,
  timestamp: Date.now(),
}

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [consent, setConsent] = useState<CookieConsent>(defaultConsent)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsedConsent = JSON.parse(stored) as CookieConsent

        const oneYearAgo = Date.now() - 365 * 24 * 60 * 60 * 1000
        if (parsedConsent.timestamp > oneYearAgo) {
          setConsent(parsedConsent)
          setShowBanner(!parsedConsent.hasDecided)
        } else {
          setShowBanner(true)
        }
      } else {
        setShowBanner(true)
      }
    } catch (error) {
      console.error("Error loading cookie consent:", error)
      setShowBanner(true)
    }
  }, [])

  const updateGtagConsent = (analyticsEnabled: boolean) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: analyticsEnabled ? "granted" : "denied",
        ad_storage: analyticsEnabled ? "granted" : "denied",
      })
    }
  }

  const saveConsent = (newConsent: CookieConsent) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConsent))
      setConsent(newConsent)
      setShowBanner(false)
      updateGtagConsent(newConsent.analytics)
    } catch (error) {
      console.error("Error saving cookie consent:", error)
    }
  }

  const acceptAll = () => {
    const newConsent: CookieConsent = {
      analytics: true,
      functional: true,
      hasDecided: true,
      timestamp: Date.now(),
    }
    saveConsent(newConsent)
  }

  const rejectAll = () => {
    const newConsent: CookieConsent = {
      analytics: false,
      functional: true,
      hasDecided: true,
      timestamp: Date.now(),
    }
    saveConsent(newConsent)
  }

  const updateConsent = (updates: Partial<CookieConsent>) => {
    const newConsent: CookieConsent = {
      ...consent,
      ...updates,
      hasDecided: true,
      timestamp: Date.now(),
    }
    saveConsent(newConsent)
  }

  const resetConsent = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      setConsent(defaultConsent)
      setShowBanner(true)
      updateGtagConsent(false)
    } catch (error) {
      console.error("Error resetting cookie consent:", error)
    }
  }

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        acceptAll,
        rejectAll,
        updateConsent,
        showBanner,
        resetConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  )
}

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext)
  if (context === undefined) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider",
    )
  }
  return context
}

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void
  }
}

"use client"

import React, { createContext, useContext } from "react"
import { useToast } from "../hooks/useToast"
import { ToastActionElement } from "../components/ui/Toast"

type ToastType = "success" | "error" | "warning" | "info"

interface ToastContextType {
  showToast: (
    type: ToastType,
    title: string,
    description?: string,
    action?: ToastActionElement
  ) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()

  const showToast = (
    type: ToastType,
    title: string,
    description?: string,
    action?: ToastActionElement
  ) => {
    const variants: Record<ToastType, string> = {
      success: "bg-green-500",
      error: "bg-red-500",
      warning: "bg-amber-500",
      info: "bg-blue-500",
    }

    toast({
      title,
      description,
      action,
      variant: "destructive",
      className: `${variants[type]} text-white border-none`,
    })
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export const useToastContext = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToastContext must be used within a ToastProvider")
  }
  return context
}

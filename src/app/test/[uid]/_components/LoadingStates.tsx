"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Alert, AlertDescription } from "@/components/ui/Alert"
import { AlertCircle, Loader2 } from "@/components/ui/icons"

interface RedirectingProps {
  message: string
}

export function Redirecting({ message }: RedirectingProps) {
  return (
    <div className="min-h-screen bg-cosmic-night flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
        <p className="text-white">{message}</p>
      </div>
    </div>
  )
}

export function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="md:hidden flex flex-col gap-4 mb-6">
        <div className="h-10 bg-white/10 rounded w-full animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Question navigation skeleton - only visible on md and larger */}
        <div className="hidden md:block md:col-span-3">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded bg-white/10 animate-pulse"
                ></div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-white/10"></div>
                  <div className="h-4 w-20 bg-white/10 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Question content skeleton */}
        <div className="col-span-1 md:col-span-9">
          {/* Progress bar - only visible on md and up */}
          <div className="hidden md:block mb-6">
            <div className="h-10 bg-white/10 rounded w-full animate-pulse"></div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="h-8 bg-white/10 rounded w-48 animate-pulse"></div>
              <div className="h-10 w-24 bg-white/10 rounded animate-pulse"></div>
            </div>

            <div className="h-16 bg-white/10 rounded w-full mb-8 animate-pulse"></div>

            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full h-14 bg-white/10 rounded animate-pulse"
                ></div>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <div className="h-10 w-24 bg-white/10 rounded animate-pulse"></div>
              <div className="h-10 w-24 bg-white/10 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ErrorMessageProps {
  error: string | null
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  const router = useRouter()

  return (
    <div className="container mx-auto px-6 py-12">
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {typeof error === "object" ? JSON.stringify(error) : error}
        </AlertDescription>
      </Alert>
      <Button onClick={() => router.push("/test-selection")}>
        Volver a selección de test
      </Button>
    </div>
  )
}

interface EmptyMessageProps {
  message: string
}

export function EmptyMessage({ message }: EmptyMessageProps) {
  const router = useRouter()

  return (
    <div className="container mx-auto px-6 py-12">
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
      <Button onClick={() => router.push("/test-selection")}>
        Volver a selección de test
      </Button>
    </div>
  )
}

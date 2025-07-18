import React from "react"
import { AlertCircle } from "@/components/ui/icons"
import { Skeleton } from "@/components/ui/Skeleton"

type LoadingStatesProps = {
  isLoading: boolean
  error: string | null
}

export function LoadingStates({ isLoading, error }: LoadingStatesProps) {
  if (isLoading) {
    return (
      <div className="space-y-6 md:space-y-8">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="space-y-2">
            <Skeleton className="h-8 md:h-10 w-44 md:w-52 bg-white/10" />
            <Skeleton className="h-6 md:h-8 w-64 md:w-80 bg-white/10" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <div className="bg-white/10 rounded-xl p-4 md:p-6 space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 md:h-6 md:w-6 bg-white/20 rounded" />
              <Skeleton className="h-3 md:h-4 w-20 bg-white/20" />
            </div>
            <Skeleton className="h-6 md:h-8 w-14 md:w-16 bg-white/20" />
          </div>
          <div className="bg-white/10 rounded-xl p-4 md:p-6 space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 md:h-6 md:w-6 bg-white/20 rounded" />
              <Skeleton className="h-3 md:h-4 w-20 bg-white/20" />
            </div>
            <Skeleton className="h-6 md:h-8 w-14 md:w-16 bg-white/20" />
          </div>
          <div className="bg-white/10 rounded-xl p-4 md:p-6 space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 md:h-6 md:w-6 bg-white/20 rounded" />
              <Skeleton className="h-3 md:h-4 w-20 bg-white/20" />
            </div>
            <Skeleton className="h-6 md:h-8 w-14 md:w-16 bg-white/20" />
          </div>
        </div>

        <div className="space-y-3 md:space-y-4">
          <div className="grid grid-cols-5 gap-2 md:hidden">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton
                key={i}
                className={`h-10 w-10 bg-white/10 rounded-lg ${i >= 5 ? "mt-2" : ""}`}
              />
            ))}
          </div>
          <div className="hidden md:grid md:grid-cols-10 md:gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-12 bg-white/10 rounded-lg" />
            ))}
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          <Skeleton className="h-6 md:h-8 w-48 md:w-56 bg-white/10" />

          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white/10 rounded-xl p-4 md:p-6 space-y-4 md:space-y-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-2 md:space-y-3 min-w-0">
                  <Skeleton className="h-5 md:h-6 w-full bg-white/20" />
                  <Skeleton className="h-3 md:h-4 w-4/5 bg-white/20" />
                </div>
                <Skeleton className="h-7 w-16 md:h-8 md:w-20 bg-white/20 rounded-lg flex-shrink-0" />
              </div>

              <div className="space-y-2 md:space-y-3">
                {["A", "B", "C", "D"].map((letter) => (
                  <div
                    key={letter}
                    className="flex items-start gap-2 md:gap-3 p-3 md:p-3 rounded-lg bg-white/5"
                  >
                    <Skeleton className="h-5 w-5 md:h-6 md:w-6 bg-white/20 rounded-full flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0 space-y-1">
                      <Skeleton className="h-3 md:h-4 w-full bg-white/20" />
                      <Skeleton className="h-3 md:h-4 w-3/4 bg-white/20" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 md:space-y-3">
                <Skeleton className="h-3 md:h-4 w-28 md:w-32 bg-white/20" />
                <Skeleton className="h-16 md:h-24 w-full bg-white/20 rounded-lg" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-16 md:h-9 md:w-20 bg-white/20 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
        <AlertCircle className="w-8 h-8 text-rose-500 mb-4" />
        <p className="text-rose-500 font-medium mb-2">
          Error al cargar el test
        </p>
        <p className="text-slate-400 text-sm md:text-base">{error}</p>
      </div>
    )
  }

  return null
}

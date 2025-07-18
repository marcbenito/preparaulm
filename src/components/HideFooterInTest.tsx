"use client"

import { usePathname } from "next/navigation"

interface HideFooterInTestProps {
  children: React.ReactNode
}

export function HideFooterInTest({ children }: HideFooterInTestProps) {
  const pathname = usePathname()
  const isTestRoute = pathname?.includes("/test/")

  if (isTestRoute) {
    return null
  }

  return <>{children}</>
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeSwitch } from "../../components/ThemeSwitch"
import { cn } from "@/lib/utils"

const sidebarNavItems = [
  {
    title: "Index",
    href: "/styleguide",
  },
  {
    title: "Button",
    href: "/styleguide/button",
  },
  {
    title: "Card",
    href: "/styleguide/card",
  },
  {
    title: "CategoryIcon",
    href: "/styleguide/CategoryIcon",
  },
  {
    title: "Dialog",
    href: "/styleguide/dialog",
  },
  {
    title: "Score",
    href: "/styleguide/score",
  },
  {
    title: "Toast",
    href: "/styleguide/toast",
  },
]

interface StyleGuideLayoutProps {
  children: React.ReactNode
}

export default function StyleGuideLayout({ children }: StyleGuideLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-foreground">Style Guide</h1>
        <ThemeSwitch />
      </div>

      <div className="flex -mx-4">
        <aside className="w-1/5 px-4">
          <nav className="flex flex-col space-y-1">
            {sidebarNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium",
                  pathname === item.href
                    ? "bg-white/20 text-white font-semibold" // Active state with slight highlight
                    : "text-blue-200 hover:bg-white/10 hover:text-white", // Inactive state similar to main nav
                  "transition-colors",
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="w-4/5 px-4">{children}</main>
      </div>
    </div>
  )
}

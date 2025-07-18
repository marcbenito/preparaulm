import { cn } from "@/lib/utils"
import {
  AlertTriangle,
  Brain,
  Cloud,
  FileQuestion,
  Gauge,
  Navigation,
  Plane,
  Radio,
  Waypoints,
} from "@/components/ui/icons"

const iconMap = {
  Cloud,
  Gauge,
  Radio,
  Plane,
  NavigationIcon: Navigation,
  FileQuestion,
  Brain,
  Waypoints,
  AlertTriangle,
}

const defaultColor = "from-blue-800 to-indigo-900"

interface CategoryIconProps {
  iconName?: string | null
  color?: string | null
  className?: string
}

export function CategoryIcon({
  iconName,
  color = defaultColor,
  className,
}: CategoryIconProps) {
  const Icon = iconName
    ? iconMap[iconName as keyof typeof iconMap]
    : FileQuestion

  return (
    <div
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br",
        color || defaultColor,
        className,
      )}
    >
      <Icon className="h-6 w-6 text-white" />
    </div>
  )
}

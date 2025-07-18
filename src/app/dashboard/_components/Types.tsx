import { LucideIcon } from "lucide-react"

export interface Category {
  name: string
  slug: string
  iconName: string | null
  questions: number
  completed: number // Number of questions completed/attempted
  score: number // Average score percentage for this category
  color: string | null
  minProgress: number
  confidence: number
}

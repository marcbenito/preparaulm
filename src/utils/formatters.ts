export const formatTimeSpent = (createdAt: Date, completedAt: Date | null): string => {
  if (!completedAt) return "-"
  const diffInSeconds = Math.max(
    0,
    Math.floor((completedAt.getTime() - createdAt.getTime()) / 1000)
  )
  const minutes = Math.floor(diffInSeconds / 60)
  const seconds = diffInSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
} 
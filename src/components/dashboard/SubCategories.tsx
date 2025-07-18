import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { ChevronDown, ChevronUp } from "@/components/ui/icons"

interface SubcategoryItem {
  id: string
  name: string
  description: string | null
  score: number
  questionsAnswered: number
}

interface SubCategoriesProps {
  subcategories: SubcategoryItem[]
}

export function SubCategories({ subcategories }: SubCategoriesProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  const toggleDescription = (id: string) => {
    setExpandedIds((prevIds) => {
      const newIds = new Set(prevIds)
      if (newIds.has(id)) {
        newIds.delete(id)
      } else {
        newIds.add(id)
      }
      return newIds
    })
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl">Subcategories</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {subcategories.length > 0 ? (
          <div className="divide-y divide-border">
            {subcategories.map((subcategory) => {
              const score = subcategory.score
              const scoreBadgeStyle =
                score >= 90
                  ? "bg-green-500/20 text-green-400"
                  : score >= 75
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-yellow-500/20 text-yellow-400"

              const isExpanded = expandedIds.has(subcategory.id)

              return (
                <div key={subcategory.id} className="px-6 py-4">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleDescription(subcategory.id)}
                        className="p-1 rounded-full hover:bg-muted transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                      <h3 className="text-sm font-medium">
                        {subcategory.name}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">
                          Questions: {subcategory.questionsAnswered}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">
                          Score:
                        </span>
                        <span
                          className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium ${scoreBadgeStyle}`}
                        >
                          {subcategory.score}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {isExpanded && subcategory.description && (
                    <div className="mt-2 ml-6 text-sm text-muted-foreground">
                      {subcategory.description}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <p className="p-6 text-center text-muted-foreground">
            No subcategories found for this category.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

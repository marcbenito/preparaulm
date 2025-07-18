"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Eye, ChevronLeft, ChevronRight } from "@/components/ui/icons"
import { Skeleton } from "@/components/ui/Skeleton"
import { Score } from "@/components/Score"
import { createClient } from "@/utils/supabase/client"
import { GetUserTestExecutionsUseCase } from "@/domain/use-cases/GetUserTestExecutionsUseCase"

interface FormattedHistoryItem {
  id: number
  date: Date
  score: number | null
  timeSpent: string
  questions: number
  correct: number
  status: string
}

export default function RecentTests() {
  const [historyItems, setHistoryItems] = useState<FormattedHistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const pageSize = 10
  const [isMobile, setIsMobile] = useState(false)

  // Check if the screen is mobile-sized
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Listen for resize events
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true)
      const supabase = createClient()
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()
      if (sessionError || !session?.user) {
        console.error("User not authenticated on client", sessionError)
        setHistoryItems([])
        setLoading(false)
        return
      }
      const userId = session.user.id
      const useCase = GetUserTestExecutionsUseCase.create(supabase)
      // Obtener los test_executions (ahora con JOIN para mejor rendimiento)
      const executions = await useCase.execute({ userId })

      const formatted = executions
        .map((exec) => {
          const totalQuestions = exec.answers?.length || 0
          const correctCount =
            exec.answers?.filter((a) => a.isCorrect === true).length || 0
          const status = exec.completedAt ? "completed" : "inprogress"
          const timeSpent = (() => {
            if (!exec.completedAt) return "-"
            const diffSec = Math.max(
              0,
              Math.floor(
                (exec.completedAt.getTime() - exec.createdAt.getTime()) / 1000,
              ),
            )
            const minutes = Math.floor(diffSec / 60)
            const seconds = diffSec % 60
            return `${minutes}:${seconds.toString().padStart(2, "0")}`
          })()

          return {
            id: exec.id,
            date: exec.completedAt || exec.createdAt,
            score: exec.score,
            timeSpent,
            questions: totalQuestions,
            correct: correctCount,
            status,
          }
        })
        .sort((a, b) => b.date.getTime() - a.date.getTime())

      setHistoryItems(formatted)
      setLoading(false)
    }

    fetchHistory()
  }, [])

  const totalPages = Math.ceil(historyItems.length / pageSize) || 1
  const totalTests = historyItems.length
  const startIndex = (page - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalTests)
  const paginatedItems = historyItems.slice(startIndex, endIndex)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  // Generate page numbers to display (for mobile, show fewer page numbers)
  const renderPageNumbers = () => {
    if (isMobile) {
      // On mobile, show limited page numbers: current, first, last, and one on each side if possible
      let pagesToShow = new Set<number>([1, page, totalPages])
      if (page > 1) pagesToShow.add(page - 1)
      if (page < totalPages) pagesToShow.add(page + 1)

      const sortedPages = Array.from(pagesToShow).sort((a, b) => a - b)

      return sortedPages.map((pageNum, idx) => {
        // Add ellipsis if there's a gap
        const showEllipsis =
          idx > 0 && sortedPages[idx] - sortedPages[idx - 1] > 1

        return (
          <React.Fragment key={pageNum}>
            {showEllipsis && <span className="mx-1 text-blue-200">...</span>}
            <Button
              variant={page === pageNum ? "secondary" : "ghost"}
              size="sm"
              onClick={() => handlePageChange(pageNum)}
              className={`w-8 h-8 p-0 ${
                page === pageNum
                  ? "bg-blue-500 text-white"
                  : "text-blue-200 hover:text-white"
              }`}
            >
              {pageNum}
            </Button>
          </React.Fragment>
        )
      })
    } else {
      // On desktop, show all page numbers
      return Array.from({ length: totalPages }, (_, i) => i + 1).map(
        (pageNum) => (
          <Button
            key={pageNum}
            variant={page === pageNum ? "secondary" : "ghost"}
            size="sm"
            onClick={() => handlePageChange(pageNum)}
            className={`w-8 h-8 p-0 ${
              page === pageNum
                ? "bg-blue-500 text-white"
                : "text-blue-200 hover:text-white"
            }`}
          >
            {pageNum}
          </Button>
        ),
      )
    }
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-xl">Recent Tests</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="p-6 space-y-4">
            {Array.from({ length: pageSize }).map((_, idx) => (
              <Skeleton key={idx} className="h-6 w-full" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            {paginatedItems.length > 0 ? (
              <>
                <div className="min-w-full inline-block align-middle">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-muted-foreground">
                          Date
                        </th>
                        <th className="px-2 md:px-6 py-3 md:py-4 text-center text-xs md:text-sm font-semibold text-muted-foreground">
                          Score
                        </th>
                        {!isMobile && (
                          <th className="px-2 md:px-6 py-3 md:py-4 text-center text-xs md:text-sm font-semibold text-muted-foreground">
                            Time
                          </th>
                        )}
                        {!isMobile && (
                          <th className="px-2 md:px-6 py-3 md:py-4 text-center text-xs md:text-sm font-semibold text-muted-foreground">
                            Questions
                          </th>
                        )}
                        {!isMobile && (
                          <th className="px-2 md:px-6 py-3 md:py-4 text-center text-xs md:text-sm font-semibold text-muted-foreground">
                            Correct
                          </th>
                        )}
                        <th className="px-4 md:px-6 py-3 md:py-4 text-center text-xs md:text-sm font-semibold text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedItems.map((test) => {
                        return (
                          <tr
                            key={test.id}
                            className="border-b border-border/10 hover:bg-muted/50 transition-colors"
                          >
                            <td className="px-4 md:px-6 py-2 md:py-4 text-xs md:text-sm text-muted-foreground">
                              {isMobile
                                ? test.date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })
                                : test.date.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                            </td>
                            <td className="px-2 md:px-6 py-2 md:py-4 text-center">
                              {test.score !== null ? (
                                <Score
                                  value={test.score}
                                  size={isMobile ? "sm" : "md"}
                                />
                              ) : (
                                <span className="text-xs text-muted-foreground">
                                  N/A
                                </span>
                              )}
                            </td>
                            {!isMobile && (
                              <td className="px-2 md:px-6 py-2 md:py-4 text-center text-xs md:text-sm text-muted-foreground">
                                {test.timeSpent}
                              </td>
                            )}
                            {!isMobile && (
                              <td className="px-2 md:px-6 py-2 md:py-4 text-center text-xs md:text-sm text-muted-foreground">
                                {test.questions}
                              </td>
                            )}
                            {!isMobile && (
                              <td className="px-2 md:px-6 py-2 md:py-4 text-center text-xs md:text-sm text-muted-foreground">
                                {test.correct}
                              </td>
                            )}
                            <td className="px-4 md:px-6 py-2 md:py-4 text-center">
                              {test.status === "completed" ? (
                                <Link href={`/test/${test.id}/review`}>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-primary hover:text-primary/80 hover:bg-primary/10 text-xs md:text-sm px-2 md:px-3 h-8"
                                  >
                                    <Eye className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                                    {isMobile ? "" : "Review"}
                                  </Button>
                                </Link>
                              ) : (
                                <span className="text-xs text-muted-foreground">
                                  {isMobile ? "In Prog" : "In Progress"}
                                </span>
                              )}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 md:px-6 py-3 md:py-4 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="text-xs md:text-sm text-blue-200 text-center md:text-left">
                    Showing {startIndex + 1} to {Math.min(endIndex, totalTests)}{" "}
                    of {totalTests} tests
                  </div>
                  <div className="flex items-center justify-center gap-1 md:gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      className="text-blue-200 hover:text-white disabled:opacity-50 w-8 h-8 p-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {renderPageNumbers()}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages}
                      className="text-blue-200 hover:text-white disabled:opacity-50 w-8 h-8 p-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <p className="p-6 text-center text-muted-foreground">
                No test history found.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

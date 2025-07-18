"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Trophy, Clock, Calendar, TrendingUp, Eye } from "@/components/ui/icons"
import { UserCategoryHistoryResult } from "@/domain/use-cases/users/GetUserTestHistoryForCategory"
import { SubCategories } from "@/components/dashboard/SubCategories"

interface CategoryHistoryClientViewProps {
  result: UserCategoryHistoryResult
  categorySlug: string
}

export default function CategoryHistoryClientView({
  result,
  categorySlug,
}: CategoryHistoryClientViewProps) {
  const {
    categoryName,
    stats,
    historyItems,
    progressChartData,
    subcategories,
  } = result

  return (
    <main className="min-h-screen text-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 capitalize">
              {categoryName} History
            </h1>
            <p className="text-muted-foreground">
              Track your progress and performance over time
            </p>
          </div>
          <Link href={`/test/${categorySlug}`}>
            <Button variant="default">Comenzar Test</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4 sm:p-6 flex items-center gap-4">
              <div className="bg-primary/20 p-3 rounded-lg">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Best Score</p>
                <p className="text-xl sm:text-2xl font-bold">
                  {stats.bestScore}%
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6 flex items-center gap-4">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-xl sm:text-2xl font-bold">
                  {stats.averageScore}%
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6 flex items-center gap-4">
              <div className="bg-indigo-500/20 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Time</p>
                <p className="text-xl sm:text-2xl font-bold">
                  {stats.averageTime}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6 flex items-center gap-4">
              <div className="bg-pink-500/20 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-pink-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Tests</p>
                <p className="text-xl sm:text-2xl font-bold">
                  {stats.totalTests}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <SubCategories subcategories={subcategories} />

        <Card className="overflow mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Recent Tests</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              {historyItems.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                        Date
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">
                        Score
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">
                        Time Spent
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">
                        Questions
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">
                        Correct
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyItems.map((test) => {
                      const score = test.score ?? 0
                      const scoreBadgeStyle =
                        score >= 90
                          ? "bg-green-500/20 text-green-400"
                          : score >= 75
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-yellow-500/20 text-yellow-400"

                      return (
                        <tr
                          key={test.id}
                          className="border-b border-border/10 hover:bg-muted/50 transition-colors"
                        >
                          <td className="px-6 py-4 text-muted-foreground">
                            {test.date.toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {test.score !== null ? (
                              <span
                                className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium ${scoreBadgeStyle}`}
                              >
                                {test.score}%
                              </span>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                N/A
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center text-muted-foreground">
                            {test.timeSpent}
                          </td>
                          <td className="px-6 py-4 text-center text-muted-foreground">
                            {test.questions}
                          </td>
                          <td className="px-6 py-4 text-center text-muted-foreground">
                            {test.correct}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {test.status === "completed" ? (
                              <Link href={`/test/${test.id}/review`}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-primary hover:text-primary/80 hover:bg-primary/10"
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  Review
                                </Button>
                              </Link>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                In Progress
                              </span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              ) : (
                <p className="p-6 text-center text-muted-foreground">
                  No test history found for this category.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Score Progress</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-72">
              {progressChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={progressChartData}
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="date"
                      stroke="hsl(var(--muted-foreground))"
                      tick={{
                        fill: "hsl(var(--muted-foreground))",
                        fontSize: 12,
                      }}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      tick={{
                        fill: "hsl(var(--muted-foreground))",
                        fontSize: 12,
                      }}
                      domain={[0, 100]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "0.5rem",
                        color: "hsl(var(--card-foreground))",
                      }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{
                        fill: "hsl(var(--background))",
                        stroke: "hsl(var(--primary))",
                        strokeWidth: 1,
                        r: 4,
                      }}
                      activeDot={{
                        fill: "hsl(var(--primary))",
                        stroke: "hsl(var(--primary-foreground))",
                        strokeWidth: 1,
                        r: 6,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="flex items-center justify-center h-full text-center text-muted-foreground">
                  Not enough data for progress chart.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

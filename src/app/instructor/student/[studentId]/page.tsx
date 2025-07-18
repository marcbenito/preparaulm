"use client"

import React, { use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, Calendar, Clock, Star, Eye } from "@/components/ui/icons"
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

// Mock test history data
const studentTests = [
  {
    id: "test-1",
    date: "2024-03-15",
    category: "meteorology",
    difficulty: "Hard",
    score: 85,
    timeSpent: "42:15",
  },
  {
    id: "test-2",
    date: "2024-03-12",
    category: "navigation",
    difficulty: "Medium",
    score: 92,
    timeSpent: "38:30",
  },
  {
    id: "test-3",
    date: "2024-03-10",
    category: "radio",
    difficulty: "Easy",
    score: 95,
    timeSpent: "35:45",
  },
  {
    id: "test-4",
    date: "2024-03-08",
    category: "systems",
    difficulty: "Medium",
    score: 88,
    timeSpent: "40:20",
  },
  {
    id: "test-5",
    date: "2024-03-05",
    category: "planning",
    difficulty: "Hard",
    score: 78,
    timeSpent: "45:10",
  },
]

// Mock activity data by month
const activityData = [
  { month: "Jan 2024", testsCompleted: 8, averageScore: 72 },
  { month: "Feb 2024", testsCompleted: 12, averageScore: 78 },
  { month: "Mar 2024", testsCompleted: 15, averageScore: 85 },
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "bg-green-500/20 text-green-400"
    case "medium":
      return "bg-yellow-500/20 text-yellow-400"
    case "hard":
      return "bg-red-500/20 text-red-400"
    default:
      return "bg-blue-500/20 text-blue-400"
  }
}
interface StudentTestHistoryProps {
  params: Promise<{
    studentId: string
  }>
}

export default function StudentTestHistoryPage({
  params,
}: StudentTestHistoryProps) {
  const resolvedParams = use(params)
  const studentId = resolvedParams.studentId
  const router = useRouter()

  const student = {
    name: "Alex Johnson",
    email: "alex.j@email.com",
    averageScore: 85,
    totalTests: studentTests.length,
  }

  const handleTestClick = (test: (typeof studentTests)[0]) => {
    router.push(`/test/${test.category}?review=${test.id}`)
  }

  return (
    <div className="min-h-screen bg-cosmic-night">
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {student.name}
            </h1>
            <p className="text-blue-200">{student.email}</p>
          </div>
          <Button
            onClick={() => router.push("/instructor")}
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Students
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <Star className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-blue-200">Average Score</p>
                <p className="text-2xl font-bold text-white">
                  {student.averageScore}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-blue-200">Total Tests</p>
                <p className="text-2xl font-bold text-white">
                  {student.totalTests}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="bg-pink-500/20 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-pink-400" />
              </div>
              <div>
                <p className="text-blue-200">Average Time</p>
                <p className="text-2xl font-bold text-white">40:25</p>
              </div>
            </div>
          </div>
        </div>

        {/* Test History Table */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white">Test History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Category
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                    Difficulty
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                    Score
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                    Time
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentTests.map((test) => (
                  <tr
                    key={test.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-blue-200">
                      {new Date(test.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white capitalize">
                        {test.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <span
                          className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-sm font-medium
                          ${getDifficultyColor(test.difficulty)}`}
                        >
                          {test.difficulty}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-sm font-medium
                        ${
                          test.score >= 90
                            ? "bg-green-500/20 text-green-400"
                            : test.score >= 75
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {test.score}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-blue-200">
                      {test.timeSpent}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-300 hover:text-blue-200 hover:bg-blue-500/20"
                        onClick={() => handleTestClick(test)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Activity Overview
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={activityData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis
                  dataKey="month"
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: "rgba(255,255,255,0.7)" }}
                />
                <YAxis
                  yAxisId="left"
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: "rgba(255,255,255,0.7)" }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: "rgba(255,255,255,0.7)" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.8)",
                    borderColor: "rgba(255,255,255,0.1)",
                    color: "white",
                  }}
                  labelStyle={{ color: "white" }}
                />
                <Legend
                  wrapperStyle={{
                    paddingTop: 20,
                    color: "rgba(255,255,255,0.7)",
                  }}
                />
                <Bar
                  dataKey="testsCompleted"
                  yAxisId="left"
                  barSize={30}
                  fill="#6366f1"
                  name="Tests Completed"
                />
                <Line
                  type="monotone"
                  dataKey="averageScore"
                  yAxisId="right"
                  stroke="#f472b6"
                  name="Average Score (%)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Recommendations
          </h2>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-2">
                Scheduled Practice
              </h3>
              <p className="text-blue-200 mb-2">
                Based on {"Alex's"} test history, we recommend scheduling
                regular practice sessions focused on Planning topics where the
                student shows lower performance.
              </p>
              <div className="bg-purple-500/10 text-purple-300 text-xs inline-block px-2 py-1 rounded">
                Priority: High
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-2">
                Review Session
              </h3>
              <p className="text-blue-200 mb-2">
                Consider conducting a guided review of recent test results,
                focusing on pattern recognition in questions that caused
                difficulty.
              </p>
              <div className="bg-blue-500/10 text-blue-300 text-xs inline-block px-2 py-1 rounded">
                Priority: Medium
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-2">
                Advanced Topics
              </h3>
              <p className="text-blue-200 mb-2">
                Alex shows strong understanding in Radio Communications.
                Consider introducing more advanced material in this area to
                maintain engagement.
              </p>
              <div className="bg-green-500/10 text-green-300 text-xs inline-block px-2 py-1 rounded">
                Priority: Low
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

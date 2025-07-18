"use client"

import React from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import {
  UserPlus,
  Activity,
  CheckCircle2,
  AlertCircle,
  Link2,
  ClipboardCheck,
  UserCheck,
} from "@/components/ui/icons"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"

// Mock student data
const students = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.j@email.com",
    averageScore: 85,
    questionsAnswered: 450,
    activityLevel: "high",
    confidenceScore: 92,
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria.g@email.com",
    averageScore: 78,
    questionsAnswered: 320,
    activityLevel: "medium",
    confidenceScore: 85,
  },
  {
    id: 3,
    name: "James Wilson",
    email: "james.w@email.com",
    averageScore: 92,
    questionsAnswered: 580,
    activityLevel: "high",
    confidenceScore: 95,
  },
  {
    id: 4,
    name: "Sarah Chen",
    email: "s.chen@email.com",
    averageScore: 73,
    questionsAnswered: 180,
    activityLevel: "low",
    confidenceScore: 68,
  },
  {
    id: 5,
    name: "David Brown",
    email: "d.brown@email.com",
    averageScore: 88,
    questionsAnswered: 420,
    activityLevel: "medium",
    confidenceScore: 82,
  },
]

const getActivityColor = (level: string) => {
  switch (level) {
    case "high":
      return "bg-green-500/20 text-green-400"
    case "medium":
      return "bg-yellow-500/20 text-yellow-400"
    case "low":
      return "bg-red-500/20 text-red-400"
    default:
      return "bg-blue-500/20 text-blue-400"
  }
}

const getConfidenceIcon = (score: number) => {
  if (score >= 90) {
    return <CheckCircle2 className="h-5 w-5 text-green-400" />
  } else if (score >= 70) {
    return <Activity className="h-5 w-5 text-yellow-400" />
  } else {
    return <AlertCircle className="h-5 w-5 text-red-400" />
  }
}

export default function InstructorDashboardPage() {
  const router = useRouter()
  const registrationLink = "https://aerotests.com/register?instructor=123" // Example link

  const copyToClipboard = () => {
    navigator.clipboard.writeText(registrationLink)
  }

  return (
    <div className="min-h-screen bg-cosmic-night">
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Student Management
            </h1>
            <p className="text-blue-200">
              Monitor your students&apos; progress and performance
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="primary-gradient"
                size="lg"
                leftIcon={<UserPlus className="h-5 w-5" />}
              >
                Solicitar Acceso como Instructor
              </Button>
            </DialogTrigger>
            <DialogContent variant="gradient">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white">
                  Add New Student
                </DialogTitle>
                <DialogDescription className="text-blue-200">
                  Follow these steps to add a new student to your roster.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                {/* Step 1 */}
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                      <Link2 className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        1. Share Registration Link
                      </h3>
                      <p className="text-blue-200 mb-3">
                        Share this unique registration link with your student:
                      </p>
                      <div className="flex items-center gap-2">
                        <code className="bg-white/10 px-3 py-1 rounded text-blue-300 flex-1">
                          {registrationLink}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-300 hover:text-blue-200 hover:bg-blue-500/20"
                          onClick={copyToClipboard}
                        >
                          <ClipboardCheck className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-500/20 p-2 rounded-lg">
                      <UserPlus className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        2. Student Registration
                      </h3>
                      <p className="text-blue-200">
                        Your student will need to complete the registration form
                        and create their account using the provided link.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500/20 p-2 rounded-lg">
                      <UserCheck className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        3. Start Monitoring
                      </h3>
                      <p className="text-blue-200">
                        Once registered, you&apos;ll be able to track their
                        progress, review test results, and monitor their
                        learning journey.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Students Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Student
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                    Average Score
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                    Questions Answered
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                    Activity Level
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                    Confidence Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() =>
                      router.push(`/instructor/student/${student.id}`)
                    }
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-white">
                          {student.name}
                        </div>
                        <div className="text-sm text-blue-200">
                          {student.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                          student.averageScore >= 90
                            ? "bg-green-500/20 text-green-400"
                            : student.averageScore >= 75
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {student.averageScore}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-blue-200">
                      {student.questionsAnswered}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getActivityColor(
                          student.activityLevel
                        )}`}
                      >
                        {student.activityLevel.charAt(0).toUpperCase() +
                          student.activityLevel.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {getConfidenceIcon(student.confidenceScore)}
                        <span className="text-blue-200">
                          {student.confidenceScore}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

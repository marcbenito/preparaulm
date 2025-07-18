// Remove "use client" - Component will be Server Component
import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { type NextPage } from "next"

import {
  GetUserTestHistoryForCategoryUseCase,
  UserCategoryHistoryResult,
} from "@/domain/use-cases/users/GetUserTestHistoryForCategory"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import { AlertCircle } from "@/components/ui/icons"
import CategoryHistoryClientView from "./_components/CategoryHistoryClientView" // Import the new client component

interface CategoryPageProps {
  params: Promise<{
    category: string // category is the category ID (slug)
  }>
}

const CategoryHistoryPage: NextPage<CategoryPageProps> = async ({ params }) => {
  const categorySlug = (await params).category

  // --- Data Fetching ---
  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error("User not authenticated, redirecting to login.", userError)
    redirect("/login?message=Please log in to view category history.")
  }

  // Fetch history using the use case
  const result: UserCategoryHistoryResult | null =
    await GetUserTestHistoryForCategoryUseCase.create()
      .then((useCase) => useCase.execute({ userId: user.id, categorySlug }))
      .catch((error) => {
        console.error(
          "Error executing GetUserTestHistoryForCategoryUseCase:",
          error,
        )
        return null // Treat execution errors like category not found for simplicity
      })

  // Handle case where category is not found or fetch fails
  if (!result) {
    return (
      <main className="min-h-screen text-foreground">
        <div className="container mx-auto px-6 py-12">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Could not load test history for category &apos;{categorySlug}
              &apos;. It might not exist or there was an error.
            </AlertDescription>
          </Alert>
          <div className="mt-4">
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // Render the client component with the fetched data
  return (
    <CategoryHistoryClientView result={result} categorySlug={categorySlug} />
  )
}
export default CategoryHistoryPage

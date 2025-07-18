import React from "react"
import CategoryList from "./_components/CategoryList"
import DashboardRadarChart from "./_components/DashboardRadarChart"
import RecentTestsContainer from "@/components/dashboard/RecentTestsContainer"

export default async function Dashboard() {
  // const {
  //   data: { user },
  //   error: userError,
  // } = await supabase.auth.getUser()

  // if (userError || !user) {
  //   console.error("User not authenticated, redirecting to login.", userError)
  //   redirect("/login")
  // }

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-lg text-white/80">Your performance overview.</p>
      </header>

      <CategoryList />

      <RecentTestsContainer />

      <DashboardRadarChart />
    </div>
  )
}

import { notFound } from "next/navigation"
import testsData from "../tests-data.json"
import TestEspecificoClient from "./TestEspecificoClient"

interface TestEspecificoPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function TestEspecificoPage({ params }: TestEspecificoPageProps) {
  const { slug } = await params
  const test = testsData.find((t) => t.slug === slug)

  if (!test) {
    notFound()
  }
  
    return <TestEspecificoClient test={test} />
} 
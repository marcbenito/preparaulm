import PreparacionTestClient from "./PreparacionTestClient"

interface PreparacionTestPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function PreparacionTestPage({ params }: PreparacionTestPageProps) {
  const { slug } = await params
  
  return <PreparacionTestClient slug={slug} />
} 
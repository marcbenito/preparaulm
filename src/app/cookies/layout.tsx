import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Cookies - PreparaUlm",
  description:
    "Política de cookies de PreparaUlm. Información detallada sobre el uso de cookies y tecnologías similares en nuestra plataforma de preparación para exámenes ULM.",
  keywords: [
    "política cookies PreparaUlm",
    "cookies aviación",
    "privacidad web ULM",
    "cookies plataforma educativa",
    "GDPR aviación",
    "privacidad datos ULM"
  ],
  alternates: {
    canonical: "/cookies",
  },
  openGraph: {
    title: "Política de Cookies - PreparaUlm",
    description: "Información sobre el uso de cookies en nuestra plataforma de preparación ULM.",
    url: "https://www.preparaulm.com/cookies",
    type: "website",
  },
}

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

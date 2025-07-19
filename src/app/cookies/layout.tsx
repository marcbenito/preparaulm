import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Cookies - PreparaUlm",
  description:
    "Política de cookies de PreparaUlm. Información sobre el uso de cookies y tecnologías similares en nuestra plataforma de preparación ULM.",
  keywords:
    "política cookies PreparaUlm, cookies aviación, privacidad web ULM, cookies plataforma educativa",
}

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

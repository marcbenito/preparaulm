import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Cookies - AeroTest ULM",
  description:
    "Política de cookies de AeroTest ULM. Información sobre el uso de cookies y tecnologías similares en nuestra plataforma de preparación ULM.",
  keywords:
    "política cookies AeroTest ULM, cookies aviación, privacidad web ULM, cookies plataforma educativa",
}

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

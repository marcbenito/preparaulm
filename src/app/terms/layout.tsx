import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Términos y Condiciones - PreparaUlm",
  description:
    "Términos y condiciones de uso de PreparaUlm. Información sobre el uso del servicio, responsabilidades y derechos de los usuarios.",
  keywords:
    "términos condiciones PreparaUlm, condiciones uso ULM, términos legales aviación, normativa PreparaUlm",
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

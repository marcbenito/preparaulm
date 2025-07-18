import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Términos y Condiciones - AeroTest ULM",
  description:
    "Términos y condiciones de uso de AeroTest ULM. Información sobre el uso del servicio, responsabilidades y derechos de los usuarios.",
  keywords:
    "términos condiciones AeroTest ULM, condiciones uso ULM, términos legales aviación, normativa AeroTest ULM",
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

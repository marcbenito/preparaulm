import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidad - AeroTest ULM",
  description:
    "Política de privacidad de AeroTest ULM. Conoce cómo protegemos tus datos y la información que recopilamos para mejorar tu experiencia de aprendizaje.",
  keywords:
    "política privacidad AeroTest ULM, protección datos ULM, privacidad estudiantes ULM, seguridad datos aviación",
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

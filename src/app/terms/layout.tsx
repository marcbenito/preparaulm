import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Términos y Condiciones - PreparaUlm",
  description:
    "Términos y condiciones de uso de PreparaUlm. Información detallada sobre el uso del servicio, responsabilidades y derechos de los usuarios de nuestra plataforma.",
  keywords: [
    "términos condiciones PreparaUlm",
    "condiciones uso ULM",
    "términos legales aviación",
    "normativa PreparaUlm",
    "derechos usuarios ULM",
    "responsabilidades plataforma"
  ],
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Términos y Condiciones - PreparaUlm",
    description: "Información sobre términos de uso y condiciones de nuestra plataforma ULM.",
    url: "https://www.preparaulm.com/terms",
    type: "website",
  },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

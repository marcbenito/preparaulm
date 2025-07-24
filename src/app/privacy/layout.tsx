import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidad - PreparaUlm",
  description:
    "Política de privacidad de PreparaUlm. Conoce cómo protegemos tus datos personales y la información que recopilamos para mejorar tu experiencia de aprendizaje en aviación.",
  keywords: [
    "política privacidad PreparaUlm",
    "protección datos ULM",
    "privacidad estudiantes ULM",
    "seguridad datos aviación",
    "GDPR PreparaUlm",
    "privacidad online ULM"
  ],
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Política de Privacidad - PreparaUlm",
    description: "Conoce cómo protegemos tus datos en nuestra plataforma de preparación ULM.",
    url: "https://www.preparaulm.com/privacy",
    type: "website",
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

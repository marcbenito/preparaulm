import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Iniciar Sesión - Accede a Tu Cuenta",
  description:
    "Accede a tu cuenta de PreparaUlm para continuar tu preparación como piloto. Más de 5000 preguntas y exámenes actualizados te esperan.",
  keywords: [
    "login PreparaUlm",
    "acceso cuenta ULM",
    "preparación piloto ULM",
    "exámenes ULM online",
    "tests aviación ultraligera"
  ],
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

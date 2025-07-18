import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Iniciar Sesión - AeroTest ULM | Accede a Tu Cuenta",
  description:
    "Accede a tu cuenta de AeroTest ULM para continuar tu preparación como piloto. Más de 5000 preguntas y exámenes actualizados te esperan.",
  keywords:
    "login AeroTest ULM, acceso cuenta ULM, preparación piloto ULM, exámenes ULM online, tests aviación ultraligera",
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

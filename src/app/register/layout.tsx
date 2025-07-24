import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Registro - Crea tu Cuenta Gratuita",
  description:
    "Únete a PreparaUlm y comienza tu preparación como piloto ULM. Accede a más de 5000 preguntas, exámenes actualizados y seguimiento personalizado.",
  keywords: [
    "registro PreparaUlm",
    "crear cuenta ULM",
    "preparación piloto ULM",
    "exámenes ULM online",
    "tests aviación ultraligera",
    "cuenta gratuita ULM"
  ],
  robots: {
    index: false,
    follow: false,
  },
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

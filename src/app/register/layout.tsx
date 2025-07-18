import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Registro - AeroTest ULM | Crea tu Cuenta Gratuita",
  description:
    "Únete a AeroTest ULM y comienza tu preparación como piloto ULM. Accede a más de 5000 preguntas, exámenes actualizados y seguimiento personalizado.",
  keywords:
    "registro AeroTest ULM, crear cuenta ULM, preparación piloto ULM, exámenes ULM online, tests aviación ultraligera, cuenta gratuita ULM",
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

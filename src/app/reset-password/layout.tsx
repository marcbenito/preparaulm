import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Restablecer Contraseña - Recupera tu Cuenta",
  description:
    "Restablece tu contraseña de PreparaUlm de forma segura. Recupera el acceso a tu cuenta y continúa tu preparación para el examen de piloto ULM.",
  keywords: [
    "restablecer contraseña PreparaUlm",
    "recuperar cuenta ULM",
    "reset password aviación",
    "cambiar contraseña piloto",
    "recuperar acceso cuenta"
  ],
  robots: {
    index: false,
    follow: false,
  },
}

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 
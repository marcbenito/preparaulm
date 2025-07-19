import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import GoogleAnalytics from "@/components/GoogleAnalytics"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { CookieConsentProvider } from "@/context/CookieConsentContext"
import { CookieBanner } from "@/components/CookieBanner"
import { HideFooterInTest } from "@/components/HideFooterInTest"
import { DatadogRumProvider } from "@/components/DatadogRumProvider"
import { Toaster } from "@/components/ui/Toaster"
import { AuthModalProvider } from "@/context/AuthModalContext"
import { LoginModal } from "@/components/auth/LoginModal"
import { RegisterModal } from "@/components/auth/RegisterModal"
import { ForgotPasswordModal } from "@/components/auth/ForgotPasswordModal"
import { DatadogViewTracker } from "@/components/DatadogViewTracker"
import { ToastProvider } from "@/context/ToastContext"
import { AuthProvider } from "@/context/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default:
      "PreparaUlm - Tests de ultraligeros ULM Multieje Ala Fija gratis | Examen Piloto AESA",
    template: "%s | PreparaUlm",
  },
  description:
    "Prepárate para el examen ULM multieje ala fija con PreparaUlm. Tests online especializados según normativa AESA. Más de 5,000 preguntas actualizadas. ¡95% de tasa de aprobación! Próximamente: autogiro, instructor y RTC.",
  keywords: [
    "examen ULM multieje ala fija",
    "licencia piloto ultraligero multieje",
    "tests ULM online",
    "preparación examen AESA multieje",
    "multieje ala fija",
    "examen piloto ultraligero",
    "preguntas examen ULM",
    "academia vuelo ULM",
    "test aviación ultraligero",
    "licencia aviación España",
    "ULM AESA",
    "preparación piloto ULM",
  ],
  authors: [{ name: "PreparaUlm" }],
  creator: "PreparaUlm",
  publisher: "PreparaUlm",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.preparaulm.com"),
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://www.preparaulm.com",
    title:
      "PreparaUlm - Tests de ultraligeros ULM Multieje Ala Fija | Examen Piloto Ultraligero",
    description:
      "Prepárate para el examen ULM multieje ala fija con PreparaUlm. Tests online especializados según normativa AESA. Más de 5,000 preguntas actualizadas. ¡95% de tasa de aprobación! Próximamente: autogiro, instructor y RTC.",
    siteName: "PreparaUlm",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PreparaUlm - Preparación para examen ULM multieje ala fija",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PreparaUlm - Tests de ultraligeros ULM Multieje Ala Fija",
    description:
      "Prepárate para el examen ULM multieje ala fija con más de 5,000 preguntas actualizadas. 95% de tasa de aprobación.",
    images: ["/images/twitter-image.jpg"],
    creator: "@preparaulm",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "tu-codigo-de-verificacion-google",
  },
}

export interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "PreparaUlm",
              description:
                "Tests de ultraligeros ULM y licencias de piloto ultraligero",
              url: "https://www.preparaulm.com",
              logo: "https://www.preparaulm.com/images/logo.png",
              sameAs: [
                "https://facebook.com/preparaulm",
                "https://twitter.com/preparaulm",
                "https://linkedin.com/company/preparaulm",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "ES",
              },
              offers: {
                "@type": "Offer",
                category: "Educación Online",
                description: "Tests de preparación para exámenes ULM",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <CookieConsentProvider>
          <DatadogRumProvider>
            <AuthProvider>
              <AuthModalProvider>
                <ToastProvider>
                  <Suspense fallback={null}>
                    <DatadogViewTracker />
                  </Suspense>

                  <Navigation />
                  <div className="min-h-screen bg-cosmic-night animate-gradient bg-[length:400%_400%] flex flex-col">
                    <div className="flex-grow">{children}</div>
                    <HideFooterInTest>
                      <Footer />
                    </HideFooterInTest>
                  </div>
                  <Toaster />
                  <LoginModal />
                  <RegisterModal />
                  <ForgotPasswordModal />
                  <CookieBanner />
                </ToastProvider>
              </AuthModalProvider>
            </AuthProvider>
          </DatadogRumProvider>
          <GoogleAnalytics />
        </CookieConsentProvider>
      </body>
    </html>
  )
}

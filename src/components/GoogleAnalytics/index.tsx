"use client"

import React, { useEffect } from "react"
import Script from "next/script"
import { useCookieConsent } from "@/context/CookieConsentContext"

export default function GoogleAnalytics() {
  const { consent } = useCookieConsent()
 
  useEffect(() => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        functionality_storage: "granted",
        security_storage: "granted",
      })

      if (consent.hasDecided) {
        window.gtag("consent", "update", {
          analytics_storage: consent.analytics ? "granted" : "denied",
          ad_storage: consent.analytics ? "granted" : "denied",
        })
      }
    }
  }, [consent])

  if (!consent.analytics && consent.hasDecided) {
    return null
  }

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-98RRBFGTS6"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-98RRBFGTS6');
        `}
      </Script>
    </>
  )
}

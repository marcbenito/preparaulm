"use client"

import { useEffect } from "react"
import { datadogRum } from "@datadog/browser-rum"
import { useCookieConsent } from "@/context/CookieConsentContext"

const ALLOWED_DATADOG_SITES = [
  "datadoghq.com",
  "datadoghq.eu",
  "us3.datadoghq.com",
  "us5.datadoghq.com",
  "ap1.datadoghq.com",
  "ddog-gov.com",
] as const
type DatadogSite = (typeof ALLOWED_DATADOG_SITES)[number]

export function DatadogRumProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { consent } = useCookieConsent()

  useEffect(() => {
    if (!consent.analytics || !consent.hasDecided) {
      return
    }

    const applicationId = process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID
    const clientToken = process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN
    const siteEnvVar = process.env.NEXT_PUBLIC_DATADOG_SITE
    const service = process.env.NEXT_PUBLIC_DATADOG_SERVICE || "web-app"
    const env = process.env.NEXT_PUBLIC_DATADOG_ENV || process.env.NODE_ENV
    const version = process.env.NEXT_PUBLIC_APP_VERSION || "0.0.1"
    const sessionSampleRate = Number(
      process.env.NEXT_PUBLIC_DATADOG_SESSION_SAMPLE_RATE || 100,
    )
    const sessionReplaySampleRate = Number(
      process.env.NEXT_PUBLIC_DATADOG_SESSION_REPLAY_SAMPLE_RATE || 20,
    )
    const defaultPrivacyLevel =
      process.env.NEXT_PUBLIC_DATADOG_DEFAULT_PRIVACY_LEVEL || "mask-user-input"

    let site: DatadogSite | undefined = "datadoghq.eu"
    if (siteEnvVar) {
      if ((ALLOWED_DATADOG_SITES as readonly string[]).includes(siteEnvVar)) {
        site = siteEnvVar as DatadogSite
      } else {
        console.warn(
          `Invalid NEXT_PUBLIC_DATADOG_SITE value: "${siteEnvVar}". Using default "${site}". Allowed values are: ${ALLOWED_DATADOG_SITES.join(", ")}`,
        )
      }
    }

    if (!applicationId || !clientToken) {
      console.warn(
        "Datadog RUM is not configured because applicationId or clientToken is missing.",
      )
      return
    }

    if (
      env !== "production" &&
      !process.env.NEXT_PUBLIC_DATADOG_ENABLE_IN_DEV
    ) {
      console.log(
        `Datadog RUM disabled in env: ${env}. Set NEXT_PUBLIC_DATADOG_ENABLE_IN_DEV=true to enable.`,
      )
      return
    }

    if (!datadogRum.getInternalContext()) {
      try {
        datadogRum.init({
          applicationId,
          clientToken,
          site,
          service,
          env,
          version,
          sessionSampleRate,
          sessionReplaySampleRate,
          trackUserInteractions: true,
          trackResources: true,
          trackLongTasks: true,
          defaultPrivacyLevel: defaultPrivacyLevel as any,
        })

        console.log("Datadog RUM initialized successfully with user consent.")
      } catch (error) {
        console.error("Failed to initialize Datadog RUM:", error)
      }
    }
  }, [consent.analytics, consent.hasDecided])

  return <>{children}</>
}

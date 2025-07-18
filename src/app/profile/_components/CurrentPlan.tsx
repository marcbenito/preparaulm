"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Check, X, Loader2 } from "@/components/ui/icons"
import {
  subscriptionPlans,
  type SubscriptionPlan,
} from "@/app/data/subscription-plans"

import { Subscription } from "@/domain/entities/Subscription"

export default function CurrentPlan() {
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadUserSubscription() {
      try {
        // Try to get the user's subscription
        let planId = "solo" // Default to solo plan if no subscription found

        // Find the plan based on planId
        const userPlan = subscriptionPlans.find(
          (plan: SubscriptionPlan) => plan.id === planId,
        )

        setCurrentPlan(userPlan || null)
      } catch (error) {
        console.error("Error loading subscription plan:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserSubscription()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!currentPlan) {
    return (
      <div className="rounded-lg border p-6 text-center">
        <p className="mb-4">
          No hay información disponible sobre tu plan actual.
        </p>
        <Button asChild>
          <Link href="/pricing">Ver planes disponibles</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Tu plan actual</h3>
        <p className="text-muted-foreground">
          Estás suscrito al plan{" "}
          <span className="font-medium">{currentPlan.name}</span>
        </p>
      </div>

      <div className="rounded-lg border p-6">
        <div className="mb-4 flex items-baseline justify-between">
          <div>
            <h4 className="text-xl font-bold">{currentPlan.name}</h4>
            <p className="text-sm text-muted-foreground">
              {currentPlan.description}
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold">{currentPlan.price}€</span>
            <span className="text-sm text-muted-foreground"> / mes</span>
          </div>
        </div>

        {subscription && (
          <div className="mb-4 rounded-md bg-muted p-3 text-sm">
            <p>
              <span className="font-medium">Estado:</span>{" "}
              <span
                className={`${
                  subscription.status === "active"
                    ? "text-green-600"
                    : "text-amber-600"
                }`}
              >
                {subscription.status === "active"
                  ? "Activa"
                  : "Pendiente de renovación"}
              </span>
            </p>
            {subscription.current_period_end && (
              <p>
                <span className="font-medium">Próxima facturación:</span>{" "}
                {new Date(subscription.current_period_end).toLocaleDateString(
                  "es-ES",
                )}
              </p>
            )}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <h5 className="mb-2 font-medium">Características incluidas:</h5>
            <ul className="space-y-2">
              {currentPlan.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {currentPlan.limitations.length > 0 && (
            <div>
              <h5 className="mb-2 font-medium">Limitaciones:</h5>
              <ul className="space-y-2">
                {currentPlan.limitations.map(
                  (limitation: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <X className="mr-2 h-5 w-5 text-red-500" />
                      <span>{limitation}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <Button asChild>
            <Link href="/pricing">Ver otros planes</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/account/billing">Gestionar suscripción</Link>
          </Button>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Si tienes dudas sobre tu suscripción, contacta con nuestro equipo de
          soporte en{" "}
          <a
            href="mailto:info@aerotestulm.es"
            className="text-primary underline"
          >
            info@aerotestulm.es
          </a>
        </p>
      </div>
    </div>
  )
}

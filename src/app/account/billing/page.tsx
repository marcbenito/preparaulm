"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import {
  ArrowLeft,
  CreditCard,
  Clock,
  RefreshCcw,
  Loader2,
} from "@/components/ui/icons"
import { subscriptionPlans } from "@/app/data/subscription-plans"
import {
  Subscription,
  SubscriptionStatus,
} from "@/domain/entities/Subscription"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"

export default function BillingPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadUserSubscription() {
      try {
        // Uncomment this when the subscriptions table is available

        // For now, use mock data
        setSubscription({
          id: "mock-id",
          user_id: "mock-user-id",
          plan_id: "solo",
          status: SubscriptionStatus.ACTIVE,
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          cancel_at_period_end: false,
          created_at: new Date(
            Date.now() - 30 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          updated_at: new Date().toISOString(),
        })
      } catch (error) {
        console.error("Error loading subscription:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserSubscription()
  }, [])

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    )
  }

  const currentPlan = subscriptionPlans.find(
    (plan) => plan.id === subscription?.plan_id,
  )

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/profile">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Gestionar suscripción</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Información de facturación</CardTitle>
            <CardDescription>
              Detalles de tu plan actual y próxima facturación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {subscription ? (
              <>
                <div className="rounded-md bg-primary/10 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-medium">
                        Plan {currentPlan?.name || "Actual"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {currentPlan?.price}€ por mes
                      </p>
                    </div>
                    <Button asChild className="mt-3 sm:mt-0">
                      <Link href="/pricing">Cambiar plan</Link>
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start space-x-3 rounded-md border p-4">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Método de pago</p>
                      <p className="text-sm text-muted-foreground">
                        VISA terminada en 4242
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 rounded-md border p-4">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Próxima facturación</p>
                      <p className="text-sm text-muted-foreground">
                        {subscription.current_period_end
                          ? new Date(
                              subscription.current_period_end,
                            ).toLocaleDateString("es-ES", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : "No disponible"}
                      </p>
                    </div>
                  </div>
                </div>

                {subscription.cancel_at_period_end && (
                  <Alert className="bg-amber-50 text-amber-800 border-amber-200">
                    <RefreshCcw className="h-4 w-4" />
                    <AlertTitle>Cancelación programada</AlertTitle>
                    <AlertDescription>
                      Tu suscripción se cancelará al final del período actual.
                      Podrás disfrutar de todos los beneficios hasta el{" "}
                      {new Date(
                        subscription.current_period_end,
                      ).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                      .
                    </AlertDescription>
                  </Alert>
                )}
              </>
            ) : (
              <div className="text-center py-4">
                <p className="mb-4">No tienes ninguna suscripción activa.</p>
                <Button asChild>
                  <Link href="/pricing">Ver planes disponibles</Link>
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-start border-t px-6 py-4">
            <h3 className="mb-2 font-medium">¿Necesitas ayuda?</h3>
            <p className="text-sm text-muted-foreground">
              Si tienes alguna pregunta sobre tu facturación o suscripción,
              contacta con nuestro equipo de soporte en{" "}
              <a
                                  href="mailto:contacto@preparaulm.com"
                className="text-primary underline"
              >
                                  contacto@preparaulm.com
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, CreditCard, Loader2 } from "@/components/ui/icons"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Separator } from "@/components/ui/Separator"
import { subscriptionPlans } from "@/app/data/subscription-plans"

export default function ChangePlanPage() {
  const router = useRouter()
  const [planId, setPlanId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [cardName, setCardName] = useState("")

  const selectedPlan = planId
    ? subscriptionPlans.find((plan) => plan.id === planId)
    : null

  const handlePlanSelect = (id: string) => {
    setPlanId(id)
  }

  const handleChangePlan = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!planId) return

    setIsSubmitting(true)

    try {
      // In a real implementation, this would call a subscription API
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to billing page after successful change
      router.push("/account/billing?success=true")
    } catch (error) {
      console.error("Error changing plan:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/pricing">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Cambiar plan</h1>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Selecciona tu nuevo plan</CardTitle>
              <CardDescription>
                Elige el plan que mejor se adapte a tus necesidades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscriptionPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`cursor-pointer rounded-lg border p-4 transition-all ${
                      planId === plan.id
                        ? "border-2 border-primary bg-primary/5"
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {plan.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold">{plan.price}€</span>
                        <span className="text-sm text-muted-foreground">
                          {" "}
                          / mes
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {planId && (
            <Card>
              <CardHeader>
                <CardTitle>Datos de pago</CardTitle>
                <CardDescription>
                  Introduce tus datos de pago para actualizar tu suscripción
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePlan} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-name">Nombre en la tarjeta</Label>
                    <Input
                      id="card-name"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Nombre completo"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="card-number">Número de tarjeta</Label>
                    <div className="relative">
                      <Input
                        id="card-number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                      <CreditCard className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Fecha de caducidad</Label>
                      <Input
                        id="expiry"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/AA"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="rounded-lg bg-muted p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">Resumen</p>
                        <p className="text-sm text-muted-foreground">
                          Plan {selectedPlan?.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {selectedPlan?.price}€ / mes
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      "Confirmar cambio de plan"
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between border-t px-6 py-4">
                <p className="text-sm text-muted-foreground">
                  El cambio será efectivo inmediatamente.
                </p>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

import { Subscription } from "@/domain/entities/Subscription"
import { Button } from "@/components/ui/Button"
import {
  CreditCard,
  CheckCircle2,
  Crown,
  AlertCircle,
} from "@/components/ui/icons"

interface SubscriptionInfoProps {
  subscription: Subscription | null
}

export function SubscriptionInfo({ subscription }: SubscriptionInfoProps) {
  const isFree = !subscription || subscription.plan_id === "free"

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-green-400" />
          Suscripción
        </h2>
        <span
          className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
            isFree
              ? "bg-blue-500/20 text-blue-400"
              : "bg-green-500/20 text-green-400"
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          {isFree ? "Free" : "Premium"}
        </span>
      </div>

      <div
        className={`bg-gradient-to-br rounded-xl p-6 mb-6 ${
          isFree ? "from-blue-400 to-blue-600" : "from-blue-500 to-indigo-500"
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          {isFree ? (
            <AlertCircle className="h-6 w-6 text-white" />
          ) : (
            <Crown className="h-6 w-6 text-yellow-300" />
          )}
          <span className="text-lg font-semibold text-white">
            {isFree ? "Plan Free" : "Plan Premium"}
          </span>
        </div>

        {!isFree && (
          <p className="text-blue-100 text-sm mb-4">
            Próxima renovación:{" "}
            {new Date(
              subscription?.current_period_end || ""
            ).toLocaleDateString()}
          </p>
        )}

        <ul className="space-y-2">
          {isFree
            ? // Características del plan free
              [
                "Acceso básico",
                "Exámenes limitados",
                "Soporte comunitario",
              ].map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-blue-100"
                >
                  <CheckCircle2 className="h-4 w-4 text-white" />
                  {feature}
                </li>
              ))
            : // Características del plan premium
              [
                "Acceso ilimitado",
                "Exámenes premium",
                "Soporte prioritario",
              ].map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-blue-100"
                >
                  <CheckCircle2 className="h-4 w-4 text-green-300" />
                  {feature}
                </li>
              ))}
        </ul>
      </div>

      <Button
        className={`w-full ${
          isFree
            ? "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
            : "bg-white/10 text-white hover:bg-white/20"
        }`}
      >
        {isFree ? "Actualizar Plan" : "Gestionar Suscripción"}
      </Button>
    </div>
  )
}

import React from "react"
import { Check, Crown } from "@/components/ui/icons"
import { Button } from "@/components/ui/Button"

interface PlanType {
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  action: string
  popular: boolean
}

interface PricingCardProps {
  plan: PlanType
}

export default function PricingCard({ plan }: PricingCardProps) {
  return (
    <div
      className={`relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden ${
        plan.popular ? "ring-2 ring-blue-500" : ""
      }`}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-blue-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium flex items-center gap-1">
            <Crown className="h-4 w-4" />
            Más Popular
          </div>
        </div>
      )}

      <div className="p-8">
        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
        <div className="flex items-baseline mb-4">
          <span className="text-4xl font-bold text-white">{plan.price}</span>
          {plan.period && (
            <span className="text-blue-200 ml-1">{plan.period}</span>
          )}
        </div>
        <p className="text-blue-200 mb-6">{plan.description}</p>

        <Button
          className={`w-full mb-8 ${
            plan.popular
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-white/10 hover:bg-white/20 text-white"
          }`}
        >
          {plan.action}
        </Button>

        <ul className="space-y-4">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-blue-100">
              <Check className="h-5 w-5 text-blue-400 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export type SubscriptionPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  limitations: string[];
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "solo",
    name: "Solo",
    description: "Ideal para uso personal",
    price: 9.99,
    features: [
      "Acceso a tests básicos",
      "Seguimiento de progreso personal",
      "Material de estudio básico"
    ],
    limitations: [
      "Sin acceso a simulaciones de exámenes",
      "Sin soporte prioritario",
      "Sin material avanzado"
    ]
  },
  {
    id: "pro",
    name: "Profesional",
    description: "Para estudiantes serios",
    price: 19.99,
    features: [
      "Acceso completo a todos los tests",
      "Simulaciones de exámenes reales",
      "Seguimiento de progreso detallado",
      "Material de estudio avanzado",
      "Soporte prioritario por email"
    ],
    limitations: [
      "Sin acceso a clases en vivo",
      "Sin tutorías personalizadas"
    ]
  },
  {
    id: "elite",
    name: "Elite",
    description: "La experiencia completa",
    price: 39.99,
    features: [
      "Todo lo incluido en Profesional",
      "Clases en vivo semanales",
      "Tutorías personalizadas mensuales",
      "Acceso anticipado a nuevo contenido",
      "Soporte premium 24/7",
      "Diploma de certificación"
    ],
    limitations: []
  }
]; 
import { Metadata } from "next"
import { FaqAccordion } from "./_components/FaqAccordion"
import faqsData from "./faqs.json"

export const metadata: Metadata = {
  title: "Preguntas Frecuentes",
  description:
    "Encuentra respuestas a las preguntas más frecuentes sobre PreparaUlm, la plataforma de tests para licencia de piloto ULM. Información sobre funcionamiento, pagos, cuenta y soporte técnico.",
  keywords: [
    "FAQ",
    "preguntas frecuentes",
    "PreparaUlm",
    "piloto ULM",
    "tests",
    "soporte",
    "pagos",
    "Stripe",
    "ayuda usuarios",
    "dudas comunes"
  ],
  alternates: {
    canonical: "/faqs-preguntas-frecuentes",
  },
  openGraph: {
    title: "Preguntas Frecuentes | PreparaUlm",
    description:
      "Encuentra respuestas a las preguntas más frecuentes sobre PreparaUlm, la plataforma de tests para licencia de piloto ULM.",
    url: "https://www.preparaulm.com/faqs-preguntas-frecuentes",
    type: "website",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqsData.flatMap((category) =>
    category.questions.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  ),
}

export default function FaqsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-cosmic-night">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Preguntas Frecuentes
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Encuentra respuestas a las preguntas más comunes sobre PreparaUlm,
              nuestra plataforma de tests para la licencia de piloto ULM.
            </p>
          </div>

          <FaqAccordion data={faqsData} />
        </div>
      </div>
    </>
  )
}

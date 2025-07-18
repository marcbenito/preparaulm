import React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion"

const faqs = [
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Your billing will be adjusted accordingly.",
  },
  {
    question: "How do exam simulations work?",
    answer:
      "Our exam simulations mirror real test conditions, including timing, question format, and scoring. They help you prepare for the actual exam environment.",
  },
  {
    question: "What's included in instructor features?",
    answer:
      "Instructors can track student progress, view detailed performance analytics, and manage up to 5 students. Perfect for flight schools and independent instructors.",
  },
  {
    question: "Is there a minimum commitment period?",
    answer:
      "No, you can cancel your subscription at any time. You'll continue to have access to your plan features until the end of your current billing period.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer a 30-day money-back guarantee if you're not satisfied with your subscription.",
  },
  {
    question: "Can I share my account with others?",
    answer:
      "No, accounts are for individual use only. For group access, please consider our Instructor plan.",
  },
]

interface PricingFaqsProps {
  className?: string
}

export default function PricingFaqs({ className }: PricingFaqsProps) {
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold text-white mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden">
        <Accordion
          type="single"
          collapsible
          className="divide-y divide-white/10"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="px-6 text-white hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 text-blue-200">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion"
import { Input } from "@/components/ui/Input"
import { Search } from "@/components/ui/icons"

interface Question {
  question: string
  answer: string
}

interface FaqCategory {
  category: string
  questions: Question[]
}

interface FaqsSectionProps {
  data: FaqCategory[]
}

export function FaqsSection({ data }: FaqsSectionProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data

    const searchLower = searchTerm.toLowerCase()

    return data
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (q) =>
            q.question.toLowerCase().includes(searchLower) ||
            q.answer.toLowerCase().includes(searchLower),
        ),
      }))
      .filter((category) => category.questions.length > 0)
  }, [data, searchTerm])

  const totalQuestions = filteredData.reduce(
    (acc, category) => acc + category.questions.length,
    0,
  )

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
          <Input
            type="text"
            placeholder="Buscar en preguntas frecuentes..."
            aria-label="Buscar en preguntas frecuentes"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
          />
        </div>
        {searchTerm && (
          <p className="text-sm text-white/70 mt-2">
            {totalQuestions > 0
              ? `Se encontraron ${totalQuestions} pregunta${totalQuestions !== 1 ? "s" : ""}`
              : "No se encontraron preguntas que coincidan con tu búsqueda"}
          </p>
        )}
      </div>

      {filteredData.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white/70 text-lg">
            No se encontraron preguntas que coincidan con tu búsqueda.
          </p>
          <p className="text-white/50 text-sm mt-2">
            Intenta con otros términos o borra el filtro para ver todas las
            preguntas.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredData.map((category, categoryIndex) => (
            <div
              key={category.category}
              className="bg-white/5 rounded-lg p-6 backdrop-blur-sm"
            >
              <h2 className="text-2xl font-semibold text-white mb-6 border-b border-white/10 pb-3">
                {category.category}
              </h2>

              <Accordion type="multiple" className="w-full">
                {category.questions.map((faq, questionIndex) => (
                  <AccordionItem
                    key={`${categoryIndex}-${questionIndex}`}
                    value={`item-${categoryIndex}-${questionIndex}`}
                    className="border-white/10"
                  >
                    <AccordionTrigger className="text-left text-white hover:text-white/90">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

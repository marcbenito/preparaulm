import { 
    Accordion, 
    AccordionContent, 
    AccordionItem, 
    AccordionTrigger 
} from "@/components/ui/Accordion"

export interface FaqsProps {
    id: string
    title: string
    questions: {
        question: string
        answer: string
    }[]
}

export function Faqs({ id, title, questions }: FaqsProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    }
    
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm my-8">
                <h2 className="text-2xl font-semibold text-white mb-6 border-b border-white/10 pb-3">
                    {title}
                </h2>
                <Accordion type="multiple" className="w-full">
                    {questions.map((faq, questionIndex) => (
                        <AccordionItem
                            key={`${id}-${questionIndex}`}
                            value={`item-${id}-${questionIndex}`}
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
        </>
    )
} 
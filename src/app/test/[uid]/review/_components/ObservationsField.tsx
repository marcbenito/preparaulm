import React from "react"
import { Pencil } from "@/components/ui/icons"
import { Button } from "@/components/ui/Button"
import { Textarea } from "@/components/ui/Textarea"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion"

type ObservationsFieldProps = {
  observations: string
  onUpdateObservations: (observations: string) => void
  onSave: () => void
  isSaving: boolean
  isSaved?: boolean
}

export function ObservationsField({
  observations,
  onUpdateObservations,
  onSave,
  isSaving,
  isSaved,
}: ObservationsFieldProps) {
  return (
    <Accordion type="single" collapsible className="w-full ">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex flex-col items-start">
            <h4 className="text-lg font-semibold text-indigo-400 mb-1">
              Observaciones
            </h4>
            <p className="text-blue-200/80 text-sm">
              Añade notas o comentarios sobre esta pregunta
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-4 space-y-4">
          <Textarea
            value={observations}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              onUpdateObservations(e.target.value)
            }
            placeholder="Escribe tus observaciones aquí..."
            className="min-h-[100px] bg-indigo-950/50 border-indigo-500/30 text-blue-200 placeholder:text-blue-200/50"
          />

          <Button
            onClick={onSave}
            disabled={isSaving}
            className="bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            {isSaving ? "Guardando..." : "Guardar observaciones"}
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

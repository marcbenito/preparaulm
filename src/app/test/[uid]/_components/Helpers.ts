"use client"

// Tipos
type Question = {
  id: number
  text: string
  options: string[]
  correct_answer: string
  category_id: string
  explanation?: string
}

// Procesar las opciones si vienen como string JSON
export const processOptions = (options: any): string[] => {
  if (typeof options === "string") {
    try {
      const parsedOptions = JSON.parse(options)
      // Asegurarse de que todas las opciones sean strings
      return Array.isArray(parsedOptions)
        ? parsedOptions.map((opt: any) => {
            if (typeof opt === "object" && opt !== null) {
              // Si el objeto tiene una propiedad text, usar ese valor
              return opt.text || JSON.stringify(opt)
            }
            return String(opt)
          })
        : []
    } catch (e) {
      console.error("Error al procesar opciones:", e)
      return []
    }
  }

  // Si ya es un array, convertir cada elemento a string
  if (Array.isArray(options)) {
    return options.map((opt) => {
      if (typeof opt === "object" && opt !== null) {
        // Si el objeto tiene una propiedad text, usar ese valor
        return opt.text || JSON.stringify(opt)
      }
      return String(opt)
    })
  }

  return []
}

// Para obtener el texto de la pregunta
export const getQuestionText = (question: Question): string => {
  if (typeof question.text === "object" && question.text !== null) {
    // Si es un objeto JSON, intentar extraer la propiedad text
    // Usar casting para acceder a la propiedad text
    const textObj = question.text as any
    return textObj.text || JSON.stringify(question.text)
  }
  return question.text
}

// Para obtener el valor correcto de la respuesta
export const getCorrectAnswer = (answer: string): string => {
  try {
    const parsedAnswer = JSON.parse(answer)
    if (typeof parsedAnswer === "object" && parsedAnswer !== null) {
      return parsedAnswer.text || answer
    }
    return answer
  } catch {
    return answer
  }
} 
import { render, screen, fireEvent } from "@testing-library/react"
import { FaqAccordion } from "../FaqAccordion"

const mockData = [
  {
    category: "Funcionamiento",
    questions: [
      {
            question: "¿Qué es PreparaUlm?",
    answer: "PreparaUlm es una plataforma para tests de piloto ULM.",
      },
      {
        question: "¿Cómo funcionan los tests?",
        answer: "Los tests evalúan tu conocimiento actual.",
      },
    ],
  },
  {
    category: "Pagos",
    questions: [
      {
        question: "¿Qué métodos de pago aceptáis?",
        answer: "Aceptamos pagos con tarjeta a través de Stripe.",
      },
    ],
  },
]

describe("FaqAccordion", () => {
  it("renders all categories and questions", () => {
    render(<FaqAccordion data={mockData} />)

    expect(screen.getByText("Funcionamiento")).toBeInTheDocument()
    expect(screen.getByText("Pagos")).toBeInTheDocument()
    expect(screen.getByText("¿Qué es PreparaUlm?")).toBeInTheDocument()
    expect(screen.getByText("¿Cómo funcionan los tests?")).toBeInTheDocument()
    expect(
      screen.getByText("¿Qué métodos de pago aceptáis?"),
    ).toBeInTheDocument()
  })

  it("renders search input", () => {
    render(<FaqAccordion data={mockData} />)

    const searchInput = screen.getByPlaceholderText(
      "Buscar en preguntas frecuentes...",
    )
    expect(searchInput).toBeInTheDocument()
  })

  it("filters questions based on search term", () => {
    render(<FaqAccordion data={mockData} />)

    const searchInput = screen.getByPlaceholderText(
      "Buscar en preguntas frecuentes...",
    )

    fireEvent.change(searchInput, { target: { value: "Stripe" } })

    expect(
      screen.getByText("¿Qué métodos de pago aceptáis?"),
    ).toBeInTheDocument()
    expect(screen.queryByText("¿Qué es PreparaUlm?")).not.toBeInTheDocument()
    expect(screen.getByText("Se encontraron 1 pregunta")).toBeInTheDocument()
  })

  it("shows no results message when search has no matches", () => {
    render(<FaqAccordion data={mockData} />)

    const searchInput = screen.getByPlaceholderText(
      "Buscar en preguntas frecuentes...",
    )

    fireEvent.change(searchInput, { target: { value: "xyz123" } })

    expect(
      screen.getByText(
        "No se encontraron preguntas que coincidan con tu búsqueda.",
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "Intenta con otros términos o borra el filtro para ver todas las preguntas.",
      ),
    ).toBeInTheDocument()
  })

  it("filters questions by answer content", () => {
    render(<FaqAccordion data={mockData} />)

    const searchInput = screen.getByPlaceholderText(
      "Buscar en preguntas frecuentes...",
    )

    fireEvent.change(searchInput, { target: { value: "plataforma" } })

    expect(screen.getByText("¿Qué es PreparaUlm?")).toBeInTheDocument()
    expect(
      screen.queryByText("¿Qué métodos de pago aceptáis?"),
    ).not.toBeInTheDocument()
  })

  it("shows correct count for multiple results", () => {
    render(<FaqAccordion data={mockData} />)

    const searchInput = screen.getByPlaceholderText(
      "Buscar en preguntas frecuentes...",
    )

    fireEvent.change(searchInput, { target: { value: "test" } })

    expect(screen.getByText("Se encontraron 2 preguntas")).toBeInTheDocument()
  })

  it("clears search and shows all questions", () => {
    render(<FaqAccordion data={mockData} />)

    const searchInput = screen.getByPlaceholderText(
      "Buscar en preguntas frecuentes...",
    )

    fireEvent.change(searchInput, { target: { value: "Stripe" } })
    expect(screen.queryByText("¿Qué es PreparaUlm?")).not.toBeInTheDocument()

    fireEvent.change(searchInput, { target: { value: "" } })
    expect(screen.getByText("¿Qué es PreparaUlm?")).toBeInTheDocument()
    expect(
      screen.getByText("¿Qué métodos de pago aceptáis?"),
    ).toBeInTheDocument()
  })

  it("handles empty data gracefully", () => {
    render(<FaqAccordion data={[]} />)

    expect(
      screen.getByPlaceholderText("Buscar en preguntas frecuentes..."),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "No se encontraron preguntas que coincidan con tu búsqueda.",
      ),
    ).toBeInTheDocument()
  })
})

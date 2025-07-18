import React from "react"
import { render, screen } from "@testing-library/react"
import ComparisonTable from "../ComparisonTable"

// Mock de los iconos
jest.mock("@/components/ui/icons", () => ({
  Check: ({ className }: { className?: string }) => (
    <div data-testid="check-icon" className={className}>
      ✓
    </div>
  ),
  X: ({ className }: { className?: string }) => (
    <div data-testid="x-icon" className={className}>
      ✗
    </div>
  ),
}))

describe("ComparisonTable", () => {
  beforeEach(() => {
    render(<ComparisonTable />)
  })

  describe("Estructura básica", () => {
    it("renderiza el título principal", () => {
      expect(
        screen.getByText("Comparación de Características"),
      ).toBeInTheDocument()
    })

    it("renderiza la descripción", () => {
      expect(
        screen.getByText(
          "Compara todos los planes para encontrar el que mejor se adapte a tus necesidades",
        ),
      ).toBeInTheDocument()
    })

    it("renderiza las columnas de planes en desktop", () => {
      expect(screen.getByText("Característica")).toBeInTheDocument()
      expect(screen.getByText("Gratuito")).toBeInTheDocument()
      expect(screen.getByText("Solo")).toBeInTheDocument()
      expect(screen.getByText("Instructor")).toBeInTheDocument()
    })
  })

  describe("Categorías de características", () => {
    it("renderiza todas las categorías", () => {
      expect(screen.getByText("Acceso al Contenido")).toBeInTheDocument()
      expect(
        screen.getByText("Herramientas de Aprendizaje"),
      ).toBeInTheDocument()
      expect(screen.getByText("Funciones de Enseñanza")).toBeInTheDocument()
      expect(screen.getByText("Soporte")).toBeInTheDocument()
    })

    it("renderiza características específicas", () => {
      expect(screen.getByText("Preguntas de Práctica")).toBeInTheDocument()
      expect(screen.getByText("Simulaciones de Examen")).toBeInTheDocument()
      expect(screen.getByText("Acceso Sin Conexión")).toBeInTheDocument()
      expect(screen.getByText("Gestión de Estudiantes")).toBeInTheDocument()
    })
  })

  describe("Valores de características", () => {
    it("renderiza valores de texto correctamente", () => {
      expect(screen.getByText("500")).toBeInTheDocument()
      expect(screen.getAllByText("2000")).toHaveLength(2)
      expect(screen.getAllByText("Básico")).toHaveLength(2)
      expect(screen.getAllByText("Avanzado")).toHaveLength(4)
    })

    it("renderiza iconos Check para valores true", () => {
      const checkIcons = screen.getAllByTestId("check-icon")
      expect(checkIcons.length).toBeGreaterThan(0)
    })

    it("renderiza iconos X para valores false", () => {
      const xIcons = screen.getAllByTestId("x-icon")
      expect(xIcons.length).toBeGreaterThan(0)
    })
  })

  describe("Sticky header", () => {
    it("el header tiene clase sticky", () => {
      const thead = document.querySelector("thead")
      expect(thead).toHaveClass("sticky", "top-0")
    })

    it("el header tiene z-index correcto", () => {
      const thead = document.querySelector("thead")
      expect(thead).toHaveClass("z-10")
    })
  })

  describe("Estilos y clases CSS", () => {
    it("tiene el contenedor principal con estilos correctos", () => {
      const container = document.querySelector(
        ".bg-white\\/5.backdrop-blur-sm.rounded-2xl",
      )
      expect(container).toBeInTheDocument()
    })

    it("las filas tienen hover effect", () => {
      const rows = document.querySelectorAll("tr.hover\\:bg-white\\/5")
      expect(rows.length).toBeGreaterThan(0)
    })
  })

  describe("Accesibilidad", () => {
    it("usa elementos semánticos correctos", () => {
      expect(screen.getByRole("table")).toBeInTheDocument()
      expect(screen.getAllByRole("columnheader")).toHaveLength(4)
    })

    it("los iconos tienen las clases de color apropiadas", () => {
      const checkIcon = screen.getAllByTestId("check-icon")[0]
      const xIcon = screen.getAllByTestId("x-icon")[0]

      expect(checkIcon).toHaveClass("text-green-400")
      expect(xIcon).toHaveClass("text-red-400")
    })
  })
})

import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import PreparingTestScreen from "../PreparingTestScreen"

describe("PreparingTestScreen", () => {
  const mockOnRetry = jest.fn()

  beforeEach(() => {
    mockOnRetry.mockClear()
  })

  describe("Estado normal (sin error)", () => {
    it("renderiza el texto principal correctamente", () => {
      render(<PreparingTestScreen onRetry={mockOnRetry} testType="generic" />)

      expect(screen.getByText("Preparando tu test...")).toBeInTheDocument()
      expect(
        screen.getByText(
          /Estamos generando tu test con ayuda de inteligencia artificial/,
        ),
      ).toBeInTheDocument()
      expect(
        screen.getByText(/Las preguntas se seleccionan estratégicamente/),
      ).toBeInTheDocument()
      expect(screen.getByText(/Cuanto más usas PreparaUlm/)).toBeInTheDocument()
      expect(
        screen.getByText(/En unos segundos tendrás tu test listo/),
      ).toBeInTheDocument()
    })

    it("no muestra el botón de reintentar cuando no hay error", () => {
      render(<PreparingTestScreen onRetry={mockOnRetry} testType="generic" />)

      expect(
        screen.queryByRole("button", { name: /intentar de nuevo/i }),
      ).not.toBeInTheDocument()
    })

    it("tiene los atributos de accesibilidad correctos", () => {
      render(<PreparingTestScreen onRetry={mockOnRetry} testType="generic" />)

      const statusElement = screen.getByRole("status")
      expect(statusElement).toHaveAttribute("aria-live", "polite")
    })

    it("muestra el texto de beneficios organizados en lista", () => {
      render(<PreparingTestScreen onRetry={mockOnRetry} testType="generic" />)

      expect(screen.getByText(/información útil/)).toBeInTheDocument()
      expect(screen.getByText(/feedback más preciso/)).toBeInTheDocument()
      expect(screen.getByText(/progresar más rápido/)).toBeInTheDocument()
    })
  })

  describe("Estado de error", () => {
    const errorMessage = "Error al crear el test"

    it("muestra el mensaje de error cuando errorMessage está presente", () => {
      render(
        <PreparingTestScreen
          onRetry={mockOnRetry}
          testType="generic"
          errorMessage={errorMessage}
        />,
      )

      expect(screen.getByText(errorMessage)).toBeInTheDocument()
      expect(
        screen.getByText("No pudimos preparar tu test"),
      ).toBeInTheDocument()
    })

    it("muestra el botón de reintentar cuando hay error", () => {
      render(
        <PreparingTestScreen
          onRetry={mockOnRetry}
          testType="generic"
          errorMessage={errorMessage}
        />,
      )

      const retryButton = screen.getByRole("button", {
        name: /intentar de nuevo/i,
      })
      expect(retryButton).toBeInTheDocument()
    })

    it("ejecuta onRetry cuando se hace clic en el botón", () => {
      render(
        <PreparingTestScreen
          onRetry={mockOnRetry}
          testType="generic"
          errorMessage={errorMessage}
        />,
      )

      const retryButton = screen.getByRole("button", {
        name: /intentar de nuevo/i,
      })
      fireEvent.click(retryButton)

      expect(mockOnRetry).toHaveBeenCalledTimes(1)
    })

    it("no muestra el texto de preparación cuando hay error", () => {
      render(
        <PreparingTestScreen
          onRetry={mockOnRetry}
          testType="generic"
          errorMessage={errorMessage}
        />,
      )

      expect(
        screen.queryByText("Preparando tu test..."),
      ).not.toBeInTheDocument()
      expect(
        screen.queryByText(/inteligencia artificial/),
      ).not.toBeInTheDocument()
    })
  })

  describe("Props testType y categoryName", () => {
    it("funciona con testType generic", () => {
      render(<PreparingTestScreen onRetry={mockOnRetry} testType="generic" />)

      expect(screen.getByText("Preparando tu test...")).toBeInTheDocument()
    })

    it("funciona con testType category", () => {
      render(
        <PreparingTestScreen
          onRetry={mockOnRetry}
          testType="category"
          categoryName="Navegación"
        />,
      )

      expect(screen.getByText("Preparando tu test...")).toBeInTheDocument()
    })

    it("funciona sin categoryName cuando testType es category", () => {
      render(<PreparingTestScreen onRetry={mockOnRetry} testType="category" />)

      expect(screen.getByText("Preparando tu test...")).toBeInTheDocument()
    })
  })

  describe("Funcionalidad", () => {
    it("muestra estado correcto cuando no hay error", () => {
      render(<PreparingTestScreen onRetry={mockOnRetry} testType="generic" />)

      expect(screen.getByRole("status")).toBeInTheDocument()
      expect(screen.queryByRole("alert")).not.toBeInTheDocument()
    })

    it("muestra estado de error cuando errorMessage existe", () => {
      render(
        <PreparingTestScreen
          onRetry={mockOnRetry}
          testType="generic"
          errorMessage="Error test"
        />,
      )

      expect(screen.getByRole("alert")).toBeInTheDocument()
      expect(screen.queryByRole("status")).not.toBeInTheDocument()
    })
  })
})

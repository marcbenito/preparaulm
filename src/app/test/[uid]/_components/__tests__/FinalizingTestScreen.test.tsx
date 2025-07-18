import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import FinalizingTestScreen from "../FinalizingTestScreen"

describe("FinalizingTestScreen", () => {
  describe("Estado de carga normal", () => {
    it("renderiza el texto principal correctamente", () => {
      render(<FinalizingTestScreen isError={false} />)

      const heading = screen.getByRole("heading", { level: 1 })
      expect(heading).toHaveTextContent("Calculando tus resultados…")

      expect(
        screen.getByText(
          /Estamos analizando tu test con ayuda de inteligencia artificial/,
        ),
      ).toBeInTheDocument()

      expect(
        screen.getByText(/En unos segundos tendrás un informe detallado/),
      ).toBeInTheDocument()
    })

    it("muestra la barra de progreso animada", () => {
      render(<FinalizingTestScreen isError={false} />)

      const progressContainer = screen.getByRole("status")
      expect(progressContainer).toBeInTheDocument()
      expect(progressContainer).toHaveAttribute("aria-live", "polite")
    })

    it("muestra el análisis personalizado", () => {
      render(<FinalizingTestScreen isError={false} />)

      expect(screen.getByText("Tu análisis personalizado incluye:")).toBeInTheDocument()
      expect(screen.getByText(/corrección detallada de cada pregunta/)).toBeInTheDocument()
      expect(screen.getByText(/comparación con tu progreso anterior/)).toBeInTheDocument()
      expect(screen.getByText(/gráficos y estadísticas personalizadas/)).toBeInTheDocument()
    })

    it("no muestra el botón de reintentar en estado normal", () => {
      render(<FinalizingTestScreen isError={false} />)

      expect(
        screen.queryByRole("button", { name: /intentar de nuevo/i }),
      ).not.toBeInTheDocument()
    })
  })

  describe("Estado de error", () => {
    it("muestra el mensaje de error personalizado", () => {
      const errorMessage = "Error de conexión personalizado"
      render(
        <FinalizingTestScreen isError={true} errorMessage={errorMessage} />,
      )

      expect(screen.getByText(errorMessage)).toBeInTheDocument()
      expect(
        screen.getByText("No pudimos completar el análisis de tu test"),
      ).toBeInTheDocument()
    })

    it("muestra el mensaje de error por defecto cuando no se proporciona uno", () => {
      render(<FinalizingTestScreen isError={true} />)

      expect(
        screen.getByText("Ocurrió un error al finalizar el test"),
      ).toBeInTheDocument()
    })

    it("muestra el botón de reintentar cuando se proporciona onRetry", () => {
      const mockRetry = jest.fn()
      render(<FinalizingTestScreen isError={true} onRetry={mockRetry} />)

      const retryButton = screen.getByRole("button", {
        name: /intentar de nuevo/i,
      })
      expect(retryButton).toBeInTheDocument()
    })

    it("ejecuta onRetry cuando se hace clic en el botón", () => {
      const mockRetry = jest.fn()
      render(<FinalizingTestScreen isError={true} onRetry={mockRetry} />)

      const retryButton = screen.getByRole("button", {
        name: /intentar de nuevo/i,
      })
      fireEvent.click(retryButton)

      expect(mockRetry).toHaveBeenCalledTimes(1)
    })

    it("no muestra el botón de reintentar cuando no se proporciona onRetry", () => {
      render(<FinalizingTestScreen isError={true} />)

      expect(
        screen.queryByRole("button", { name: /intentar de nuevo/i }),
      ).not.toBeInTheDocument()
    })

    it("no muestra el texto de análisis en estado de error", () => {
      render(<FinalizingTestScreen isError={true} />)

      expect(
        screen.queryByRole("heading", { name: /calculando tus resultados/i }),
      ).not.toBeInTheDocument()
      expect(
        screen.queryByText(/Estamos analizando tu test/),
      ).not.toBeInTheDocument()
    })
  })

  describe("Accesibilidad", () => {
    it("tiene el aria-live correcto en estado de carga", () => {
      render(<FinalizingTestScreen isError={false} />)

      const statusElement = screen.getByRole("status")
      expect(statusElement).toHaveAttribute("aria-live", "polite")
    })

    it("mantiene estructura semántica con h1 para el título", () => {
      render(<FinalizingTestScreen isError={false} />)

      const title = screen.getByRole("heading", { level: 1 })
      expect(title).toHaveTextContent("Calculando tus resultados…")
    })
  })
})

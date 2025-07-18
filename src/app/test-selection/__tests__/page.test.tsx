import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"

// Mock hooks
const mockUseAuth = jest.fn()
const mockUseAuthModal = jest.fn()
const mockUseRouter = jest.fn()

jest.mock("@/context/auth-context", () => ({
  useAuth: () => mockUseAuth(),
}))

jest.mock("@/context/AuthModalContext", () => ({
  useAuthModal: () => mockUseAuthModal(),
}))

jest.mock("next/navigation", () => ({
  useRouter: () => mockUseRouter(),
}))

jest.mock("@/domain/use-cases/CreateTestUseCase", () => ({
  CreateTestUseCase: {
    create: jest.fn(),
  },
}))

jest.mock("@/utils/supabase/client", () => ({
  createClient: jest.fn(),
}))

// Simple component to test authentication logic
const AuthTestComponent = () => {
  const { user } = mockUseAuth()
  const { openLogin } = mockUseAuthModal()

  const handleStartTest = (categoryId?: string) => {
    if (!user) {
      openLogin(() => {
        console.log("Login callback executed for category:", categoryId)
      })
      return
    }
    console.log("User authenticated, starting test for category:", categoryId)
  }

  return (
    <div>
      <button onClick={() => handleStartTest()}>Comenzar Test Genérico</button>
      <button onClick={() => handleStartTest("cat-1")}>Test Categoría</button>
    </div>
  )
}

describe("Test Selection Authentication Logic", () => {
  const mockOpenLogin = jest.fn()
  const mockPush = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseRouter.mockReturnValue({ push: mockPush })
    mockUseAuthModal.mockReturnValue({ openLogin: mockOpenLogin })
  })

  describe("cuando el usuario está autenticado", () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        user: { id: "user-1", email: "test@test.com" },
      })
    })

    it("debe proceder directamente sin mostrar modal para test genérico", () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation()

      render(<AuthTestComponent />)

      fireEvent.click(screen.getByText("Comenzar Test Genérico"))

      expect(mockOpenLogin).not.toHaveBeenCalled()
      expect(consoleSpy).toHaveBeenCalledWith(
        "User authenticated, starting test for category:",
        undefined,
      )

      consoleSpy.mockRestore()
    })

    it("debe proceder directamente sin mostrar modal para test por categoría", () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation()

      render(<AuthTestComponent />)

      fireEvent.click(screen.getByText("Test Categoría"))

      expect(mockOpenLogin).not.toHaveBeenCalled()
      expect(consoleSpy).toHaveBeenCalledWith(
        "User authenticated, starting test for category:",
        "cat-1",
      )

      consoleSpy.mockRestore()
    })
  })

  describe("cuando el usuario no está autenticado", () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({ user: null })
    })

    it("debe mostrar modal de login para test genérico", () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation()

      render(<AuthTestComponent />)

      fireEvent.click(screen.getByText("Comenzar Test Genérico"))

      expect(mockOpenLogin).toHaveBeenCalledWith(expect.any(Function))
      expect(consoleSpy).not.toHaveBeenCalledWith(
        "User authenticated, starting test for category:",
        undefined,
      )

      consoleSpy.mockRestore()
    })

    it("debe mostrar modal de login para test por categoría", () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation()

      render(<AuthTestComponent />)

      fireEvent.click(screen.getByText("Test Categoría"))

      expect(mockOpenLogin).toHaveBeenCalledWith(expect.any(Function))
      expect(consoleSpy).not.toHaveBeenCalledWith(
        "User authenticated, starting test for category:",
        "cat-1",
      )

      consoleSpy.mockRestore()
    })

    it("debe ejecutar callback después de login exitoso", () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation()
      let capturedCallback: (() => void) | null = null

      mockOpenLogin.mockImplementation((callback: () => void) => {
        capturedCallback = callback
      })

      render(<AuthTestComponent />)

      fireEvent.click(screen.getByText("Comenzar Test Genérico"))

      expect(mockOpenLogin).toHaveBeenCalled()
      expect(capturedCallback).toBeTruthy()

      if (capturedCallback) {
        capturedCallback()
      }

      expect(consoleSpy).toHaveBeenCalledWith(
        "Login callback executed for category:",
        undefined,
      )

      consoleSpy.mockRestore()
    })
  })
})

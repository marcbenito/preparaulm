import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CookieBanner } from "../index"
import { CookieConsentProvider } from "@/context/CookieConsentContext"

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

const mockGtag = jest.fn()

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: mockLocalStorage,
    writable: true,
  })
  Object.defineProperty(window, "gtag", {
    value: mockGtag,
    writable: true,
  })
  jest.clearAllMocks()
})

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<CookieConsentProvider>{ui}</CookieConsentProvider>)
}

describe("CookieBanner", () => {
  it("renders the banner when no consent has been given", () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    renderWithProvider(<CookieBanner />)

    expect(screen.getByText("Respetamos tu privacidad")).toBeInTheDocument()
    expect(
      screen.getByText(/Utilizamos cookies para mejorar/),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /aceptar todas/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /rechazar/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /personalizar/i }),
    ).toBeInTheDocument()
  })

  it("does not render when consent has been given", () => {
    const consent = {
      analytics: true,
      functional: true,
      hasDecided: true,
      timestamp: Date.now(),
    }
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(consent))

    const { container } = renderWithProvider(<CookieBanner />)
    expect(container.firstChild).toBeNull()
  })

  it('hides banner when "Aceptar todas" button is clicked', async () => {
    mockLocalStorage.getItem.mockReturnValue(null)
    const user = userEvent.setup()

    renderWithProvider(<CookieBanner />)

    const acceptButton = screen.getByRole("button", { name: /aceptar todas/i })
    await user.click(acceptButton)

    await waitFor(() => {
      expect(
        screen.queryByText("Respetamos tu privacidad"),
      ).not.toBeInTheDocument()
    })

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "aerotest-cookie-consent",
      expect.stringContaining('"analytics":true'),
    )
    expect(mockGtag).toHaveBeenCalledWith("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "granted",
    })
  })

  it('hides banner when "Rechazar" button is clicked', async () => {
    mockLocalStorage.getItem.mockReturnValue(null)
    const user = userEvent.setup()

    renderWithProvider(<CookieBanner />)

    const rejectButton = screen.getByRole("button", { name: /rechazar/i })
    await user.click(rejectButton)

    await waitFor(() => {
      expect(
        screen.queryByText("Respetamos tu privacidad"),
      ).not.toBeInTheDocument()
    })

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "aerotest-cookie-consent",
      expect.stringContaining('"analytics":false'),
    )
    expect(mockGtag).toHaveBeenCalledWith("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
    })
  })

  it('opens settings modal when "Personalizar" button is clicked', async () => {
    mockLocalStorage.getItem.mockReturnValue(null)
    const user = userEvent.setup()

    renderWithProvider(<CookieBanner />)

    const customizeButton = screen.getByRole("button", {
      name: /personalizar/i,
    })
    await user.click(customizeButton)

    await waitFor(() => {
      expect(screen.getByText("Configuración de Cookies")).toBeInTheDocument()
    })
  })

  it("shows settings modal content correctly", async () => {
    mockLocalStorage.getItem.mockReturnValue(null)
    const user = userEvent.setup()

    renderWithProvider(<CookieBanner />)

    const customizeButton = screen.getByRole("button", {
      name: /personalizar/i,
    })
    await user.click(customizeButton)

    await waitFor(() => {
      expect(screen.getByText("Cookies Técnicas")).toBeInTheDocument()
      expect(screen.getByText("Cookies Analíticas")).toBeInTheDocument()
      expect(screen.getByText("Siempre activas")).toBeInTheDocument()
      expect(
        screen.getByRole("button", { name: /guardar preferencias/i }),
      ).toBeInTheDocument()
    })
  })

  it("toggles analytics setting in modal", async () => {
    mockLocalStorage.getItem.mockReturnValue(null)
    const user = userEvent.setup()

    renderWithProvider(<CookieBanner />)

    const customizeButton = screen.getByRole("button", {
      name: /personalizar/i,
    })
    await user.click(customizeButton)

    await waitFor(() => {
      const analyticsSwitch = screen.getByRole("switch")
      expect(analyticsSwitch).not.toBeChecked()
    })
  })

  it('saves settings and hides banner when "Guardar Preferencias" is clicked', async () => {
    mockLocalStorage.getItem.mockReturnValue(null)
    const user = userEvent.setup()

    renderWithProvider(<CookieBanner />)

    const customizeButton = screen.getByRole("button", {
      name: /personalizar/i,
    })
    await user.click(customizeButton)

    await waitFor(async () => {
      const analyticsSwitch = screen.getByRole("switch")
      await user.click(analyticsSwitch)

      const saveButton = screen.getByRole("button", {
        name: /guardar preferencias/i,
      })
      await user.click(saveButton)

      expect(
        screen.queryByText("Configuración de Cookies"),
      ).not.toBeInTheDocument()
      expect(
        screen.queryByText("Respetamos tu privacidad"),
      ).not.toBeInTheDocument()
    })

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "aerotest-cookie-consent",
      expect.stringContaining('"analytics":true'),
    )
  })

  it('closes modal when "Cancelar" is clicked', async () => {
    mockLocalStorage.getItem.mockReturnValue(null)
    const user = userEvent.setup()

    renderWithProvider(<CookieBanner />)

    const customizeButton = screen.getByRole("button", {
      name: /personalizar/i,
    })
    await user.click(customizeButton)

    await waitFor(async () => {
      const cancelButton = screen.getByRole("button", { name: /cancelar/i })
      await user.click(cancelButton)

      expect(
        screen.queryByText("Configuración de Cookies"),
      ).not.toBeInTheDocument()
    })
  })

  it("contains link to cookies page", () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    renderWithProvider(<CookieBanner />)

    const cookieLink = screen.getByRole("link", { name: /más información/i })
    expect(cookieLink).toHaveAttribute("href", "/cookies")
  })

  it("reflects stored analytics consent state in modal", async () => {
    const consent = {
      analytics: true,
      functional: true,
      hasDecided: false,
      timestamp: Date.now(),
    }
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(consent))

    const user = userEvent.setup()
    renderWithProvider(<CookieBanner />)

    const customizeButton = screen.getByRole("button", {
      name: /personalizar/i,
    })
    await user.click(customizeButton)

    await waitFor(() => {
      const analyticsSwitch = screen.getByRole("switch")
      expect(analyticsSwitch).toBeChecked()
    })
  })
})

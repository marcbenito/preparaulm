import { renderHook, act } from "@testing-library/react"
import { ReactNode } from "react"
import {
  CookieConsentProvider,
  useCookieConsent,
} from "../CookieConsentContext"

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

const wrapper = ({ children }: { children: ReactNode }) => (
  <CookieConsentProvider>{children}</CookieConsentProvider>
)

describe("CookieConsentContext", () => {
  xit("throws error when used outside provider", () => {
    expect(() => {
      renderHook(() => useCookieConsent())
    }).toThrow("useCookieConsent must be used within a CookieConsentProvider")
  })

  it("initializes with default values when no stored consent", () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    const { result } = renderHook(() => useCookieConsent(), { wrapper })

    expect(result.current.consent).toEqual({
      analytics: false,
      functional: true,
      hasDecided: false,
      timestamp: expect.any(Number),
    })
    expect(result.current.showBanner).toBe(true)
  })

  it("loads stored consent from localStorage", () => {
    const storedConsent = {
      analytics: true,
      functional: true,
      hasDecided: true,
      timestamp: Date.now(),
    }
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(storedConsent))

    const { result } = renderHook(() => useCookieConsent(), { wrapper })

    expect(result.current.consent).toEqual(storedConsent)
    expect(result.current.showBanner).toBe(false)
  })

  it("shows banner when stored consent is expired", () => {
    const expiredConsent = {
      analytics: true,
      functional: true,
      hasDecided: true,
      timestamp: Date.now() - 366 * 24 * 60 * 60 * 1000, // More than 1 year ago
    }
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(expiredConsent))

    const { result } = renderHook(() => useCookieConsent(), { wrapper })

    expect(result.current.showBanner).toBe(true)
  })

  it("handles corrupted localStorage data gracefully", () => {
    mockLocalStorage.getItem.mockReturnValue("invalid-json")
    const consoleSpy = jest.spyOn(console, "error").mockImplementation()

    const { result } = renderHook(() => useCookieConsent(), { wrapper })

    expect(result.current.showBanner).toBe(true)
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error loading cookie consent:",
      expect.any(Error),
    )

    consoleSpy.mockRestore()
  })

  it("accepts all cookies", () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    const { result } = renderHook(() => useCookieConsent(), { wrapper })

    act(() => {
      result.current.acceptAll()
    })

    expect(result.current.consent.analytics).toBe(true)
    expect(result.current.consent.functional).toBe(true)
    expect(result.current.consent.hasDecided).toBe(true)
    expect(result.current.showBanner).toBe(false)

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "aerotest-cookie-consent",
      expect.stringContaining('"analytics":true'),
    )
    expect(mockGtag).toHaveBeenCalledWith("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "granted",
    })
  })

  it("rejects all cookies", () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    const { result } = renderHook(() => useCookieConsent(), { wrapper })

    act(() => {
      result.current.rejectAll()
    })

    expect(result.current.consent.analytics).toBe(false)
    expect(result.current.consent.functional).toBe(true)
    expect(result.current.consent.hasDecided).toBe(true)
    expect(result.current.showBanner).toBe(false)

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "aerotest-cookie-consent",
      expect.stringContaining('"analytics":false'),
    )
    expect(mockGtag).toHaveBeenCalledWith("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
    })
  })

  it("updates consent with partial updates", () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    const { result } = renderHook(() => useCookieConsent(), { wrapper })

    act(() => {
      result.current.updateConsent({ analytics: true })
    })

    expect(result.current.consent.analytics).toBe(true)
    expect(result.current.consent.functional).toBe(true)
    expect(result.current.consent.hasDecided).toBe(true)
    expect(result.current.showBanner).toBe(false)
  })

  it("resets consent", () => {
    const storedConsent = {
      analytics: true,
      functional: true,
      hasDecided: true,
      timestamp: Date.now(),
    }
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(storedConsent))

    const { result } = renderHook(() => useCookieConsent(), { wrapper })

    act(() => {
      result.current.resetConsent()
    })

    expect(result.current.consent.analytics).toBe(false)
    expect(result.current.consent.hasDecided).toBe(false)
    expect(result.current.showBanner).toBe(true)

    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(
      "aerotest-cookie-consent",
    )
    expect(mockGtag).toHaveBeenCalledWith("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
    })
  })

  it("handles localStorage errors gracefully during save", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation()
    mockLocalStorage.getItem.mockReturnValue(null)

    mockLocalStorage.setItem.mockImplementation(() => {
      throw new Error("Storage quota exceeded")
    })

    const { result } = renderHook(() => useCookieConsent(), { wrapper })

    expect(() => {
      act(() => {
        result.current.acceptAll()
      })
    }).not.toThrow()

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error saving cookie consent:",
      expect.any(Error),
    )

    consoleSpy.mockRestore()
  })

  it("handles localStorage errors gracefully during reset", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation()
    mockLocalStorage.getItem.mockReturnValue(null)

    mockLocalStorage.removeItem.mockImplementation(() => {
      throw new Error("Storage error")
    })

    const { result } = renderHook(() => useCookieConsent(), { wrapper })

    expect(() => {
      act(() => {
        result.current.resetConsent()
      })
    }).not.toThrow()

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error resetting cookie consent:",
      expect.any(Error),
    )

    consoleSpy.mockRestore()
  })

  it("handles missing gtag gracefully", () => {
    Object.defineProperty(window, "gtag", {
      value: undefined,
      writable: true,
    })

    const { result } = renderHook(() => useCookieConsent(), { wrapper })

    expect(() => {
      act(() => {
        result.current.acceptAll()
      })
    }).not.toThrow()
  })
})

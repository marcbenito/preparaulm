import { DatadogRumProvider } from "../index"
import { render } from "@testing-library/react"
import { CookieConsentProvider } from "@/context/CookieConsentContext"

// Mock the entire module with inline mock
jest.mock("@datadog/browser-rum", () => ({
  datadogRum: {
    init: jest.fn(),
    getInternalContext: jest.fn(),
  },
}))

// Get the mocked module
const mockDatadogRum = require("@datadog/browser-rum").datadogRum

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

const originalEnv = process.env

beforeEach(() => {
  jest.clearAllMocks()
  mockDatadogRum.getInternalContext.mockReturnValue(null)
  Object.defineProperty(window, "localStorage", {
    value: mockLocalStorage,
    writable: true,
  })
  process.env = { ...originalEnv }
})

afterEach(() => {
  process.env = originalEnv
})

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<CookieConsentProvider>{ui}</CookieConsentProvider>)
}

describe("DatadogRumProvider", () => {
  it("does not initialize Datadog when analytics consent is false", () => {
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify({
        analytics: false,
        technical: true,
        timestamp: Date.now(),
      }),
    )

    renderWithProvider(
      <DatadogRumProvider>
        <div>Test content</div>
      </DatadogRumProvider>,
    )

    expect(mockDatadogRum.init).not.toHaveBeenCalled()
  })

  it("initializes Datadog when analytics consent is true and in production", () => {
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "production",
      configurable: true,
    })
    Object.defineProperty(process.env, "NEXT_PUBLIC_DATADOG_APPLICATION_ID", {
      value: "test-app-id",
      configurable: true,
    })
    Object.defineProperty(process.env, "NEXT_PUBLIC_DATADOG_CLIENT_TOKEN", {
      value: "test-client-token",
      configurable: true,
    })

    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify({
        analytics: true,
        technical: true,
        timestamp: Date.now(),
      }),
    )

    renderWithProvider(
      <DatadogRumProvider>
        <div>Test content</div>
      </DatadogRumProvider>,
    )

    expect(mockDatadogRum.init).toHaveBeenCalledWith({
      applicationId: "test-app-id",
      clientToken: "test-client-token",
      site: "datadoghq.eu",
      service: "web-app",
      env: "production",
      version: "0.0.1",
      sessionSampleRate: 100,
      sessionReplaySampleRate: 20,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: "mask-user-input",
    })
  })

  it("does not initialize Datadog in development environment", () => {
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "development",
      configurable: true,
    })
    Object.defineProperty(process.env, "NEXT_PUBLIC_DATADOG_APPLICATION_ID", {
      value: "test-app-id",
      configurable: true,
    })
    Object.defineProperty(process.env, "NEXT_PUBLIC_DATADOG_CLIENT_TOKEN", {
      value: "test-client-token",
      configurable: true,
    })

    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify({
        analytics: true,
        technical: true,
        timestamp: Date.now(),
      }),
    )

    renderWithProvider(
      <DatadogRumProvider>
        <div>Test content</div>
      </DatadogRumProvider>,
    )

    expect(mockDatadogRum.init).not.toHaveBeenCalled()
  })

  it("does not initialize Datadog when already initialized", () => {
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "production",
      configurable: true,
    })
    Object.defineProperty(process.env, "NEXT_PUBLIC_DATADOG_APPLICATION_ID", {
      value: "test-app-id",
      configurable: true,
    })
    Object.defineProperty(process.env, "NEXT_PUBLIC_DATADOG_CLIENT_TOKEN", {
      value: "test-client-token",
      configurable: true,
    })

    mockDatadogRum.getInternalContext.mockReturnValue({ some: "context" })

    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify({
        analytics: true,
        technical: true,
        timestamp: Date.now(),
      }),
    )

    renderWithProvider(
      <DatadogRumProvider>
        <div>Test content</div>
      </DatadogRumProvider>,
    )

    expect(mockDatadogRum.init).not.toHaveBeenCalled()
  })
})

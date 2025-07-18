"use client"

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react"
import { datadogRum } from "@datadog/browser-rum"

// Define the shape of the modal state
interface AuthModalState {
  loginOpen: boolean
  registerOpen: boolean
  forgotPasswordOpen: boolean
  onLoginSuccess?: () => void
}

// Define the actions available on the context
interface AuthModalActions {
  openLogin: (onSuccess?: () => void) => void
  closeLogin: () => void
  openRegister: () => void
  closeRegister: () => void
  openForgotPassword: () => void
  closeForgotPassword: () => void
  switchToRegister: () => void
  switchToLogin: () => void
}

// Combine state and actions for the context value
interface AuthModalContextValue extends AuthModalState, AuthModalActions {}

// Create the context with a default undefined value
const AuthModalContext = createContext<AuthModalContextValue | undefined>(
  undefined,
)

// Define props for the provider
interface AuthModalProviderProps {
  children: ReactNode
}

// Create the Provider component
export const AuthModalProvider: React.FC<AuthModalProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState<AuthModalState>({
    loginOpen: false,
    registerOpen: false,
    forgotPasswordOpen: false,
    onLoginSuccess: undefined,
  })

  const openLogin = useCallback(
    (onSuccess?: () => void) => {
      // Trackear click de login
      datadogRum.addAction('login_click', {})
      
      setState({
        loginOpen: true,
        registerOpen: false,
        forgotPasswordOpen: false,
        onLoginSuccess: onSuccess,
      })
    },
    [],
  )
  const closeLogin = useCallback(
    () =>
      setState((prev) => ({
        ...prev,
        loginOpen: false,
        onLoginSuccess: undefined,
      })),
    [],
  )

  const openRegister = useCallback(
    () =>
      setState({
        loginOpen: false,
        registerOpen: true,
        forgotPasswordOpen: false,
      }),
    [],
  )
  const closeRegister = useCallback(
    () => setState((prev) => ({ ...prev, registerOpen: false })),
    [],
  )

  const openForgotPassword = useCallback(
    () =>
      setState({
        loginOpen: false,
        registerOpen: false,
        forgotPasswordOpen: true,
      }),
    [],
  )
  const closeForgotPassword = useCallback(
    () => setState((prev) => ({ ...prev, forgotPasswordOpen: false })),
    [],
  )

  const switchToRegister = useCallback(() => {
    setState({
      loginOpen: false,
      registerOpen: true,
      forgotPasswordOpen: false,
    })
  }, [])

  const switchToLogin = useCallback(() => {
    setState({
      loginOpen: true,
      registerOpen: false,
      forgotPasswordOpen: false,
    })
  }, [])

  const value: AuthModalContextValue = {
    ...state,
    openLogin,
    closeLogin,
    openRegister,
    closeRegister,
    openForgotPassword,
    closeForgotPassword,
    switchToRegister,
    switchToLogin,
  }

  return (
    <AuthModalContext.Provider value={value}>
      {children}
    </AuthModalContext.Provider>
  )
}

// Create the custom hook for consuming the context
export const useAuthModal = (): AuthModalContextValue => {
  const context = useContext(AuthModalContext)
  if (context === undefined) {
    throw new Error("useAuthModal must be used within an AuthModalProvider")
  }
  return context
}

"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/Button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog"
import { Switch } from "@/components/ui/Switch"
import { Cookie, Settings, Shield, BarChart3 } from "@/components/ui/icons"
import { useCookieConsent } from "@/context/CookieConsentContext"
import Link from "next/link"

export function CookieBanner() {
  const { showBanner, acceptAll, rejectAll, consent, updateConsent } =
    useCookieConsent()
  const [showSettings, setShowSettings] = useState(false)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(consent.analytics)

  // Sync local state with context when consent changes
  useEffect(() => {
    setAnalyticsEnabled(consent.analytics)
  }, [consent.analytics])

  if (!showBanner) return null

  const handleSaveSettings = () => {
    updateConsent({ analytics: analyticsEnabled })
    setShowSettings(false)
  }

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-sm border-t border-white/20 shadow-2xl"
          >
            <div className="container mx-auto px-6 py-4">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/20 p-2 rounded-lg">
                    <Cookie className="h-5 w-5 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">
                      Respetamos tu privacidad
                    </h3>
                    <p className="text-blue-200 text-sm">
                      Utilizamos cookies para mejorar tu experiencia y analizar
                      el uso del sitio. Las cookies técnicas son necesarias para
                      el funcionamiento.{" "}
                      <Link
                        href="/cookies"
                        className="text-blue-300 hover:text-blue-100 underline"
                      >
                        Más información
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 lg:gap-3 w-full lg:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSettings(true)}
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Personalizar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={rejectAll}
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                  >
                    Rechazar
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={acceptAll}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                  >
                    Aceptar todas
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="bg-gradient-to-br from-blue-900 to-indigo-900 border border-white/20 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Settings className="h-6 w-6 text-blue-400" />
              Configuración de Cookies
            </DialogTitle>
            <DialogDescription className="text-blue-200">
              Personaliza qué tipos de cookies quieres permitir. Las cookies
              técnicas son necesarias para el funcionamiento del sitio.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/20 p-2 rounded-lg">
                      <Shield className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        Cookies Técnicas
                      </h4>
                      <p className="text-sm text-blue-200">
                        Necesarias para el funcionamiento, login y seguridad
                      </p>
                    </div>
                  </div>
                  <div className="bg-green-500/20 px-3 py-1 rounded-full">
                    <span className="text-green-300 text-sm font-medium">
                      Siempre activas
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500/20 p-2 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        Cookies Analíticas
                      </h4>
                      <p className="text-sm text-blue-200">
                        Google Analytics y Datadog para mejorar el sitio
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={analyticsEnabled}
                    onCheckedChange={setAnalyticsEnabled}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <Button
                variant="outline"
                onClick={() => setShowSettings(false)}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                Cancelar
              </Button>
              <Button
                variant="default"
                onClick={handleSaveSettings}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
              >
                Guardar Preferencias
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

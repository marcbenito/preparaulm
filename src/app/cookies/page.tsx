"use client"

import React from "react"

import { Cookie } from "@/components/ui/icons"
import { motion } from "framer-motion"

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-cosmic-night">
      <div className="container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <Cookie className="h-6 w-6 text-purple-400" />
            </div>
            <h1 className="text-4xl font-bold text-main">
              Política de Cookies de AeroTest
            </h1>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 space-y-8">
            <div className="space-y-2 mb-8">
              <p className="text-secondary text-sm">
                <strong>Última actualización:</strong> 04/06/2025
              </p>
            </div>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  1. ¿Qué son las cookies?
                </h2>
                <p className="text-secondary leading-relaxed">
                  Las cookies son pequeños archivos de texto que los sitios web
                  almacenan en el dispositivo del usuario al navegar por
                  Internet. Estas permiten recordar información sobre la visita,
                  como el idioma preferido y otras opciones, facilitando la
                  próxima visita y haciendo que el sitio resulte más útil.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  2. ¿Qué tipos de cookies utiliza este sitio?
                </h2>
                <p className="text-secondary leading-relaxed mb-4">
                  Este sitio web utiliza los siguientes tipos de cookies:
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-main mb-2">
                      a) Cookies técnicas o necesarias (exentas de
                      consentimiento)
                    </h3>
                    <p className="text-secondary leading-relaxed">
                      Son esenciales para el funcionamiento del sitio web y no
                      requieren el consentimiento del usuario. Permiten la
                      navegación a través del sitio y el uso de las diferentes
                      opciones o servicios que en él existen.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-main mb-2">
                      b) Cookies de análisis (requieren consentimiento)
                    </h3>
                    <p className="text-secondary leading-relaxed">
                      Permiten el seguimiento y análisis del comportamiento de
                      los usuarios en los sitios web a los que están vinculadas.
                      La información recogida se utiliza para medir la actividad
                      del sitio web y para elaborar perfiles de navegación de
                      los usuarios, con el fin de introducir mejoras en función
                      del análisis de los datos de uso.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  3. ¿Qué cookies utilizamos?
                </h2>
                <p className="text-secondary leading-relaxed mb-6">
                  A continuación, se detallan las cookies utilizadas en este
                  sitio web:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white/5 rounded-lg">
                    <thead>
                      <tr className="bg-white/10">
                        <th className="border border-white/20 px-4 py-3 text-left text-main font-semibold">
                          Nombre de la cookie
                        </th>
                        <th className="border border-white/20 px-4 py-3 text-left text-main font-semibold">
                          Tipo
                        </th>
                        <th className="border border-white/20 px-4 py-3 text-left text-main font-semibold">
                          Finalidad
                        </th>
                        <th className="border border-white/20 px-4 py-3 text-left text-main font-semibold">
                          Propietario
                        </th>
                        <th className="border border-white/20 px-4 py-3 text-left text-main font-semibold">
                          Duración aproximada
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/20 px-4 py-3 text-secondary font-mono">
                          auth-token
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          Técnica
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          Gestionar la sesión e inicio de sesión del usuario
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          AeroTest (propia)
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          Sesión
                        </td>
                      </tr>
                      <tr className="bg-white/5">
                        <td className="border border-white/20 px-4 py-3 text-secondary font-mono">
                          aerotest-cookie-consent
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          Técnica
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          Almacenar las preferencias de consentimiento de
                          cookies del usuario (almacenado en localStorage)
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          AeroTest (propia)
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          1 año
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-white/20 px-4 py-3 text-secondary font-mono">
                          _ga
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          Analítica
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          Distinguir a los usuarios para generar estadísticas de
                          uso
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          Google Analytics
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          2 años
                        </td>
                      </tr>
                      <tr className="bg-white/5">
                        <td className="border border-white/20 px-4 py-3 text-secondary font-mono">
                          _gid
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          Analítica
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          Distinguir a los usuarios para generar estadísticas de
                          uso
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          Google Analytics
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          24 horas
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-white/20 px-4 py-3 text-secondary font-mono">
                          _dd_s
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          Analítica
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          Agrupar eventos de una misma sesión de usuario
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          Datadog RUM
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          15 minutos
                        </td>
                      </tr>
                      <tr className="bg-white/5">
                        <td className="border border-white/20 px-4 py-3 text-secondary font-mono">
                          dd_cookie_test_*
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          Técnica
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          Verificar la compatibilidad del navegador con cookies
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          Datadog RUM
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          Instantánea
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-white/20 px-4 py-3 text-secondary font-mono">
                          dd_site_test_*
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          Técnica
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          Verificar la compatibilidad del navegador con cookies
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          Datadog RUM
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-secondary">
                          Instantánea
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-secondary leading-relaxed mt-4 text-sm italic">
                  <strong>Nota:</strong> Las cookies dd_cookie_test_* y
                  dd_site_test_* son cookies temporales utilizadas por Datadog
                  RUM para comprobar la compatibilidad del navegador con las
                  cookies y expiran inmediatamente después de su creación.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  4. Gestión de Consentimiento
                </h2>
                <p className="text-secondary leading-relaxed mb-4">
                  AeroTest implementa un sistema de gestión de consentimiento
                  que cumple con el RGPD:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary mb-4">
                  <li>
                    <strong>Consentimiento previo:</strong> Las cookies
                    analíticas solo se activan después de obtener su
                    consentimiento explícito.
                  </li>
                  <li>
                    <strong>Granularidad:</strong> Puede elegir qué tipos de
                    cookies acepta (técnicas siempre activas, analíticas
                    opcionales).
                  </li>
                  <li>
                    <strong>Fácil revocación:</strong> Puede cambiar sus
                    preferencias en cualquier momento.
                  </li>
                  <li>
                    <strong>Almacenamiento local:</strong> Sus preferencias se
                    guardan en localStorage, no en cookies.
                  </li>
                </ul>
                <p className="text-secondary leading-relaxed">
                  Su consentimiento se almacena durante 1 año. Pasado este
                  tiempo, se le volverá a solicitar su consentimiento.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  5. ¿Cómo se obtiene el consentimiento?
                </h2>
                <p className="text-secondary leading-relaxed mb-4">
                  Al acceder por primera vez a la plataforma, se muestra un
                  aviso de cookies que informa sobre su uso y permite al usuario
                  aceptar, rechazar o configurar el uso de cookies no
                  esenciales.
                </p>
                <p className="text-secondary leading-relaxed">
                  El consentimiento se considera otorgado si el usuario acepta
                  expresamente el uso de cookies mediante las opciones del
                  banner. Puede modificarse o revocarse en cualquier momento
                  desde el panel de configuración de cookies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  6. ¿Cómo se pueden eliminar o bloquear las cookies?
                </h2>
                <p className="text-secondary leading-relaxed mb-4">
                  El usuario puede configurar su navegador para permitir,
                  bloquear o eliminar las cookies instaladas. A continuación, se
                  indican enlaces con instrucciones para los navegadores más
                  comunes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary">
                  <li>
                    <a
                      href="https://support.google.com/chrome/answer/95647?hl=es"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 hover:text-blue-100 underline"
                    >
                      Google Chrome
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 hover:text-blue-100 underline"
                    >
                      Mozilla Firefox
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 hover:text-blue-100 underline"
                    >
                      Safari
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.microsoft.com/es-es/help/4027947/microsoft-edge-delete-cookies"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 hover:text-blue-100 underline"
                    >
                      Microsoft Edge
                    </a>
                  </li>
                </ul>
                <p className="text-secondary leading-relaxed mt-4">
                  Desactivar cookies puede afectar al correcto funcionamiento de
                  algunos servicios ofrecidos en la plataforma.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  7. Actualizaciones y cambios en la política de cookies
                </h2>
                <p className="text-secondary leading-relaxed">
                  La presente política puede modificarse en función de
                  exigencias legales o técnicas. Se recomienda revisar esta
                  política de forma periódica para estar informado de posibles
                  actualizaciones.
                </p>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

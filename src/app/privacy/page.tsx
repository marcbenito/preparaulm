"use client"

import React from "react"

import { Shield } from "@/components/ui/icons"
import { motion } from "framer-motion"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cosmic-night">
      <div className="container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-indigo-500/20 p-3 rounded-lg">
              <Shield className="h-6 w-6 text-indigo-400" />
            </div>
            <h1 className="text-4xl font-bold text-main">
              Política de Privacidad
            </h1>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 space-y-8">
            <div className="space-y-2 mb-8">
              <p className="text-secondary text-sm">
                <strong>Última actualización: </strong>04/06/2025
              </p>
            </div>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  1. Responsable del tratamiento
                </h2>
                <p className="text-secondary leading-relaxed mb-4">
                  El responsable del tratamiento de los datos personales
                  recabados a través de este sitio web y la plataforma AeroTest
                  es:
                </p>
                <div className="text-secondary leading-relaxed">
                  <p>
                    <strong>Marc Benito Pujante</strong>
                  </p>
                  <p>Correo electrónico de contacto: info@aerotestulm.com</p>
                  <p>Domicilio: Otero Pedrayo 51, 36340 Nigrán (Pontevedra)</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  2. Finalidades del tratamiento
                </h2>
                <p className="text-secondary leading-relaxed mb-4">
                  Los datos personales del usuario serán tratados con las
                  siguientes finalidades:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary">
                  <li>
                    Gestión del registro y cuenta de usuario en la Plataforma.
                  </li>
                  <li>
                    Prestación de los servicios contratados, incluyendo
                    generación de informes, seguimiento de rendimiento y acceso
                    a funcionalidades según el plan contratado.
                  </li>
                  <li>Gestión de pagos mediante la plataforma Stripe.</li>
                  <li>
                    Envío de comunicaciones relacionadas con el servicio,
                    incluyendo avisos técnicos, administrativos o de seguridad.
                  </li>
                  <li>
                    Atención de consultas o incidencias remitidas por el
                    usuario.
                  </li>
                  <li>
                    Análisis del uso de la plataforma con fines estadísticos y
                    de mejora del servicio (mediante cookies y herramientas de
                    analítica como Google Analytics y Datadog RUM).
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  3. Tipos de datos tratados
                </h2>
                <p className="text-secondary leading-relaxed mb-4">
                  Se recaban y tratan los siguientes tipos de datos:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary">
                  <li>
                    <strong>Datos identificativos y de contacto:</strong>{" "}
                    nombre, correo electrónico, contraseña (en formato cifrado),
                    y cualquier otro dato facilitado voluntariamente por el
                    usuario.
                  </li>
                  <li>
                    <strong>Datos de uso:</strong> actividad dentro de la
                    plataforma, resultados de test, evolución académica, datos
                    de navegación, dirección IP, tipo de dispositivo y
                    navegador.
                  </li>
                  <li>
                    <strong>Datos de terceros:</strong> en el caso de usuarios
                    gestionados por instructores, estos tendrán acceso a los
                    datos de rendimiento de sus alumnos.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  4. Base jurídica del tratamiento
                </h2>
                <p className="text-secondary leading-relaxed mb-4">
                  El tratamiento de los datos se basa en:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary">
                  <li>
                    La ejecución de un contrato o relación precontractual
                    (registro del usuario y prestación de servicios).
                  </li>
                  <li>
                    El interés legítimo del Titular para mejorar el servicio y
                    garantizar la seguridad de la plataforma.
                  </li>
                  <li>
                    El consentimiento del usuario en los casos en que sea
                    requerido, como el uso de cookies no técnicas.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  5. Conservación de los datos
                </h2>
                <p className="text-secondary leading-relaxed mb-4">
                  Los datos serán conservados mientras exista una relación
                  activa con el usuario y durante el plazo necesario para
                  cumplir con obligaciones legales, fiscales o contractuales.
                </p>
                <p className="text-secondary leading-relaxed">
                  En caso de inactividad prolongada, los datos podrán ser
                  eliminados o anonimizados.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  6. Encargados del tratamiento
                </h2>
                <p className="text-secondary leading-relaxed mb-4">
                  Los datos personales del usuario podrán ser tratados por
                  proveedores externos necesarios para la prestación del
                  servicio, que actúan como encargados del tratamiento, de
                  conformidad con el artículo 28 del RGPD. Estos incluyen:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary mb-4">
                  <li>
                    <strong>Stripe:</strong> para la gestión de pagos.
                  </li>
                  <li>
                    <strong>Google Analytics:</strong> para el análisis del uso
                    del sitio web.
                  </li>
                  <li>
                    <strong>Datadog RUM:</strong> para la supervisión del
                    rendimiento de la aplicación y la grabación de sesiones de
                    uso.
                  </li>
                </ul>
                <p className="text-secondary leading-relaxed">
                  Estos proveedores únicamente acceden a los datos estrictamente
                  necesarios para ofrecer sus servicios y lo hacen bajo
                  instrucciones del Titular, sin utilizarlos con fines propios.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  7. Derechos del usuario
                </h2>
                <p className="text-secondary leading-relaxed mb-4">
                  El usuario puede ejercer los siguientes derechos respecto a
                  sus datos personales:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary mb-4">
                  <li>Derecho de acceso</li>
                  <li>Derecho de rectificación</li>
                  <li>Derecho de supresión</li>
                  <li>Derecho de limitación del tratamiento</li>
                  <li>Derecho de oposición</li>
                  <li>Derecho a la portabilidad de los datos</li>
                  <li>
                    Derecho a retirar el consentimiento en cualquier momento
                  </li>
                </ul>
                <p className="text-secondary leading-relaxed mb-4">
                  Para ejercer estos derechos, el usuario puede enviar una
                  solicitud al correo info@aerotestulm.com, indicando su nombre
                  completo, el derecho que desea ejercer y adjuntando una copia
                  de su documento identificativo.
                </p>
                <p className="text-secondary leading-relaxed">
                  Asimismo, tiene derecho a presentar una reclamación ante la
                  Agencia Española de Protección de Datos (AEPD) si considera
                  que el tratamiento no se ajusta a la normativa vigente.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  8. Seguridad de los datos
                </h2>
                <p className="text-secondary leading-relaxed">
                  El Titular ha adoptado las medidas técnicas y organizativas
                  necesarias para garantizar la seguridad e integridad de los
                  datos personales y evitar su pérdida, alteración, tratamiento
                  o acceso no autorizado.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  9. Cambios en la política de privacidad
                </h2>
                <p className="text-secondary leading-relaxed">
                  El Titular se reserva el derecho a modificar la presente
                  política para adaptarla a novedades legislativas o
                  jurisprudenciales, así como a prácticas del sector. En dichos
                  casos, se anunciarán los cambios con antelación razonable a su
                  implementación.
                </p>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

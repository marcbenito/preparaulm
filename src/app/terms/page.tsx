"use client"

import React from "react"
import { motion } from "framer-motion"
import { ScrollText } from "@/components/ui/icons"

export default function TermsPage() {
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
              <ScrollText className="h-6 w-6 text-indigo-400" />
            </div>
            <h1 className="text-4xl font-bold text-main">
              Términos y Condiciones de Uso
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
                  1. Información del titular
                </h2>
                <p className="text-secondary leading-relaxed">
                  El presente sitio web y la plataforma PreparaUlm (en adelante,
                  &ldquo;la Plataforma&rdquo;) son titularidad de Marc Benito
                  Pujante, actuando en calidad de profesional autónomo, con NIF:
                  44421735H, con domicilio en Otero Pedrayo 51, 36340 Nigrán
                  (Pontevedra), y correo electrónico de contacto:
                  contacto@preparaulm.com.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  2. Objeto y ámbito de aplicación
                </h2>
                <p className="text-secondary leading-relaxed mb-4">
                  Las presentes condiciones regulan el acceso, navegación y uso
                                      de la Plataforma PreparaUlm, que ofrece servicios orientados a
                  la preparación de los exámenes para la obtención de la
                  licencia de piloto de ultraligero (ULM) en España.
                </p>
                <p className="text-secondary leading-relaxed">
                  El acceso y uso de la Plataforma atribuye la condición de
                  usuario e implica la aceptación plena y sin reservas de las
                  presentes condiciones, que podrán ser modificadas en cualquier
                  momento por el Titular.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  3. Condiciones de acceso y modalidades de servicio
                </h2>
                <p className="text-secondary leading-relaxed mb-4">
                  El acceso a la Plataforma está disponible en distintas
                  modalidades: una versión gratuita y dos planes de suscripción
                  de pago.
                </p>
                <p className="text-secondary leading-relaxed mb-4">
                  Las características y condiciones específicas de cada plan
                  están disponibles en la correspondiente página de precios
                  publicada en el sitio web. El uso de servicios de pago
                  implicará la aceptación de las condiciones particulares
                  asociadas a dichos planes.
                </p>
                <p className="text-secondary leading-relaxed">
                  El sistema de pago se gestiona a través de la pasarela segura
                  Stripe.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  4. Registro y acceso de usuarios
                </h2>
                <p className="text-secondary leading-relaxed mb-4">
                  Para acceder a determinadas funcionalidades de la Plataforma
                  es necesario registrarse como usuario, facilitando datos
                  veraces, exactos y actualizados.
                </p>
                <p className="text-secondary leading-relaxed mb-4">
                  En el caso de los usuarios registrados mediante invitación de
                  un instructor, se entenderá que estos consienten que su
                  actividad en la Plataforma, incluyendo resultados y evolución
                  académica, pueda ser consultada por dicho instructor.
                </p>
                <p className="text-secondary leading-relaxed">
                  El Titular se reserva el derecho a suspender o cancelar el
                  acceso a la Plataforma, de forma temporal o definitiva, en
                  caso de uso fraudulento, abusivo o contrario a los presentes
                  términos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  5. Obligaciones de los usuarios
                </h2>
                <p className="text-secondary leading-relaxed mb-4">
                  El usuario se compromete a hacer un uso adecuado de la
                  Plataforma, conforme a la ley, la moral, el orden público y
                  las presentes condiciones. En particular, se abstendrá de:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary">
                  <li>
                    Utilizar contenidos con fines ilícitos, contrarios a
                    derechos de terceros o que puedan dañar la reputación del
                    Titular o de otros usuarios.
                  </li>
                  <li>
                    Acceder sin autorización a servicios, cuentas u otras áreas
                    restringidas de la Plataforma.
                  </li>
                  <li>
                    Reproducir, distribuir o explotar comercialmente contenidos
                    sin la debida autorización.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  6. Propiedad intelectual e industrial
                </h2>
                <p className="text-secondary leading-relaxed mb-4">
                  Todos los contenidos de la Plataforma (incluyendo textos,
                  imágenes, diseños, código fuente, preguntas de test, informes,
                  funcionalidades, etc.) son titularidad exclusiva de Marc
                  Benito Pujante, o se encuentran debidamente licenciados.
                </p>
                <p className="text-secondary leading-relaxed">
                  Queda expresamente prohibido reproducir, distribuir, comunicar
                  públicamente, transformar o explotar de cualquier modo dichos
                  contenidos sin autorización previa y por escrito.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  7. Limitación de responsabilidad
                </h2>
                <p className="text-secondary leading-relaxed mb-4">
                  El Titular no garantiza la disponibilidad continua e
                  ininterrumpida de la Plataforma, si bien adoptará todas las
                  medidas razonables para asegurar su correcto funcionamiento.
                </p>
                <p className="text-secondary leading-relaxed mb-4">
                  El Titular no será responsable de:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary mb-4">
                  <li>Los errores u omisiones en los contenidos.</li>
                  <li>
                    Las interrupciones del servicio derivadas de causas
                    técnicas, mantenimiento, fuerza mayor o ataques
                    informáticos.
                  </li>
                  <li>
                    El uso que los usuarios hagan de los contenidos y servicios
                    ofrecidos.
                  </li>
                  <li>
                    Los resultados obtenidos por el usuario en exámenes
                    oficiales.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  8. Protección de datos personales
                </h2>
                <p className="text-secondary leading-relaxed">
                  El tratamiento de los datos personales de los usuarios se
                  regula conforme a lo dispuesto en la Política de Privacidad,
                  que forma parte integrante de estas condiciones.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  9. Modificaciones
                </h2>
                <p className="text-secondary leading-relaxed">
                  El Titular podrá modificar en cualquier momento las presentes
                  condiciones, así como las características y funcionalidades de
                  la Plataforma. Las modificaciones serán publicadas en el sitio
                  web, y su uso posterior por parte del usuario implicará la
                  aceptación de dichas modificaciones.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-main mb-4">
                  10. Legislación aplicable y jurisdicción
                </h2>
                <p className="text-secondary leading-relaxed">
                  Estas condiciones se rigen por la legislación española.
                  Cualquier controversia que pudiera derivarse del acceso o uso
                  de la Plataforma será sometida a los Juzgados y Tribunales del
                  domicilio del Titular, salvo que la normativa aplicable
                  establezca otro fuero.
                </p>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

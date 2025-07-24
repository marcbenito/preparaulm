import { Metadata } from "next"
import BlogPostLayout from "@/components/blog/BlogPostLayout"
import { Calendar, Clock, User, BookOpen } from "@/components/ui/icons"

export const metadata: Metadata = {
  title: "Qué Necesitas para Ser Piloto ULM - Guía Completa",
  description:
    "Descubre todos los requisitos, documentación y pasos necesarios para convertirte en piloto de ultraligero. Guía completa con requisitos médicos, formación y trámites.",
  keywords: [
    "requisitos piloto ULM",
    "ser piloto ultraligero",
    "documentación piloto aviación",
    "formación piloto ULM",
    "certificado médico aviación",
    "licencia piloto ultraligero",
    "requisitos AESA piloto"
  ],
  alternates: {
    canonical: "/blog/que-necesitas-para-ser-piloto",
  },
  openGraph: {
    title: "Qué Necesitas para Ser Piloto ULM - Guía Completa",
    description: "Descubre todos los requisitos y pasos necesarios para convertirte en piloto de ultraligero.",
    url: "https://www.preparaulm.com/blog/que-necesitas-para-ser-piloto",
    type: "article",
  },
}

export default function QueNecesitasParaSerPilotoPage() {
  return (
    <BlogPostLayout>
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 rounded-full">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-white" />
              <span className="text-white font-medium text-sm">Requisitos</span>
            </div>
          </div>
          <div className="bg-white/10 px-3 py-2 rounded-full">
            <div className="flex items-center gap-2 text-main">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">8 min</span>
            </div>
          </div>
          <div className="bg-white/10 px-3 py-2 rounded-full">
            <div className="flex items-center gap-2 text-main">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">15/3/2024</span>
            </div>
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-main mb-6 leading-tight">
          ¿Qué necesitas para ser piloto de ultraligero?
        </h1>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
                            <p className="text-main font-medium">Equipo PreparaUlm</p>
            <p className="text-secondary text-sm">Equipo de redacción</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-l-4 border-blue-500 rounded-r-lg p-6 mb-8">
          <p className="text-lg text-main leading-relaxed italic">
            Descubre todos los requisitos, documentación y pasos necesarios para
            convertirte en piloto de ultraligero en España.
          </p>
        </div>
      </div>

      <div
        className="prose prose-lg prose-invert max-w-none
          prose-headings:text-main prose-headings:font-bold
          prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8
          prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6
          prose-h4:text-lg prose-h4:mb-2 prose-h4:mt-4
          prose-p:text-secondary prose-p:leading-relaxed prose-p:mb-4
          prose-ul:text-secondary prose-li:mb-1
          prose-strong:text-main"
      >
        <h2>Requisitos básicos para ser piloto de ultraligero</h2>
        <p>
          Para obtener la licencia de piloto de ultraligero en España, necesitas
          cumplir con varios requisitos establecidos por AESA (Agencia Estatal
          de Seguridad Aérea).
        </p>

        <h3>Edad mínima</h3>
        <p>
          Debes tener al menos 16 años para obtener la licencia de piloto de
          ultraligero.
        </p>

        <h3>Certificado médico</h3>
        <p>
          Es necesario obtener un certificado médico aeronáutico de Clase 2 o
          una declaración médica del piloto (LAPL), dependiendo del tipo de
          ultraligero que quieras pilotar.
        </p>

        <h3>Formación teórica</h3>
        <p>
          Debes completar un curso de formación teórica que incluye materias
          como:
        </p>
        <ul>
          <li>Conocimiento general de aeronaves</li>
          <li>Meteorología</li>
          <li>Navegación</li>
          <li>Procedimientos operacionales</li>
          <li>Principios de vuelo</li>
          <li>Comunicaciones</li>
          <li>Factores humanos</li>
          <li>Legislación aeronáutica</li>
        </ul>

        <h3>Examen teórico</h3>
        <p>
          Superar el examen teórico oficial con una puntuación mínima del 75%.
        </p>

        <h3>Formación práctica</h3>
        <p>
          Completar un mínimo de horas de vuelo con instructor, que varía según
          el tipo de ultraligero.
        </p>

        <h3>Examen práctico</h3>
        <p>
          Realizar un examen práctico de vuelo con un examinador autorizado.
        </p>
      </div>
    </BlogPostLayout>
  )
}

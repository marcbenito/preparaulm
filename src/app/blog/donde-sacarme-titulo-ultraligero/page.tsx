import { Metadata } from "next"
import BlogPostLayout from "@/components/blog/BlogPostLayout"
import { Calendar, Clock, User, BookOpen } from "@/components/ui/icons"

export const metadata: Metadata = {
  title: "Dónde Sacarme el Título de Ultraligero - Escuelas y Centros",
  description:
    "Encuentra las mejores escuelas y centros de formación para obtener tu título de piloto ultraligero en España. Comparativa de precios, ubicaciones y modalidades.",
  keywords: [
    "escuelas piloto ultraligero",
    "donde estudiar ULM",
    "centros formación aviación",
    "escuelas vuelo España",
    "academias piloto ULM",
    "formación presencial ultraligero",
    "título piloto donde sacarlo"
  ],
  alternates: {
    canonical: "/blog/donde-sacarme-titulo-ultraligero",
  },
  openGraph: {
    title: "Dónde Sacarme el Título de Ultraligero - Escuelas y Centros",
    description: "Encuentra las mejores escuelas y centros de formación para obtener tu título de piloto ultraligero.",
    url: "https://www.preparaulm.com/blog/donde-sacarme-titulo-ultraligero",
    type: "article",
  },
}

export default function DondeSacarmetiTuloUltraligeroPage() {
  return (
    <BlogPostLayout 
      title="¿Dónde puedo sacarme el título de piloto de ultraligero?"
      description="Guía completa sobre las escuelas de vuelo autorizadas y centros de formación donde puedes obtener tu licencia."
    >
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-white" />
              <span className="text-white font-medium text-sm">Formación</span>
            </div>
          </div>
          <div className="bg-white/10 px-3 py-2 rounded-full">
            <div className="flex items-center gap-2 text-main">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">10 min</span>
            </div>
          </div>
          <div className="bg-white/10 px-3 py-2 rounded-full">
            <div className="flex items-center gap-2 text-main">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">10/3/2024</span>
            </div>
          </div>
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
        <h2>Escuelas de vuelo autorizadas en España</h2>
        <p>
          Para obtener tu licencia de piloto de ultraligero, debes formarte en
          una escuela de vuelo autorizada por AESA.
        </p>

        <h3>Tipos de centros de formación</h3>
        <h4>Organizaciones de Formación Aprobadas (ATO)</h4>
        <p>
          Son centros con la máxima certificación que pueden impartir formación
          completa para diferentes tipos de licencias.
        </p>

        <h4>Organizaciones de Formación Declaradas (DTO)</h4>
        <p>
          Centros especializados en formación para licencias LAPL y PPL,
          incluyendo ultraligeros.
        </p>

        <h3>Principales regiones con escuelas</h3>
        <h4>Madrid</h4>
        <ul>
          <li>Aeródromo de Cuatro Vientos</li>
          <li>Aeródromo de Casarrubios del Monte</li>
          <li>Aeródromo de Ocaña</li>
        </ul>

        <h4>Cataluña</h4>
        <ul>
          <li>Aeródromo de Sabadell</li>
          <li>Aeródromo de Igualada-Òdena</li>
          <li>Aeródromo de Empuriabrava</li>
        </ul>

        <h4>Andalucía</h4>
        <ul>
          <li>Aeródromo de Sevilla</li>
          <li>Aeródromo de Granada</li>
          <li>Aeródromo de Jerez</li>
        </ul>

        <h4>Valencia</h4>
        <ul>
          <li>Aeródromo de Castellón</li>
          <li>Aeródromo de Requena</li>
        </ul>

        <h3>Qué buscar en una escuela</h3>
        <ul>
          <li>Autorización oficial de AESA</li>
          <li>Instructores cualificados</li>
          <li>Flota de aeronaves en buen estado</li>
          <li>Instalaciones adecuadas</li>
          <li>Buenas referencias de antiguos alumnos</li>
          <li>Flexibilidad horaria</li>
          <li>Precios competitivos</li>
        </ul>

        <h3>Costes aproximados</h3>
        <p>
          El coste total de la formación puede variar entre 3.000€ y 6.000€,
          dependiendo de:
        </p>
        <ul>
          <li>Tipo de ultraligero</li>
          <li>Escuela elegida</li>
          <li>Horas de vuelo necesarias</li>
          <li>Ubicación geográfica</li>
        </ul>
      </div>
    </BlogPostLayout>
  )
}

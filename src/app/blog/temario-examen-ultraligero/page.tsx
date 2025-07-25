import { Metadata } from "next"
import BlogPostLayout from "@/components/blog/BlogPostLayout"
import { Calendar, Clock, User, BookOpen } from "@/components/ui/icons"

export const metadata: Metadata = {
  title: "Temario Examen Ultraligero - Guía Completa de Estudio",
  description:
    "Descubre el temario completo del examen de piloto ultraligero. Todas las materias, temas y contenidos que debes dominar para aprobar tu examen ULM.",
  keywords: [
    "temario examen ultraligero",
    "materias examen ULM",
    "contenido examen piloto",
    "temas examen AESA",
    "programa estudios ULM",
    "asignaturas piloto ultraligero",
    "syllabus examen aviación"
  ],
  alternates: {
    canonical: "/blog/temario-examen-ultraligero",
  },
  openGraph: {
    title: "Temario Examen Ultraligero - Guía Completa de Estudio",
    description: "Descubre el temario completo del examen de piloto ultraligero con todas las materias y temas.",
    url: "https://www.preparaulm.com/blog/temario-examen-ultraligero",
    type: "article",
  },
}

export default function TemarioExamenUltraligeroPage() {
  return (
    <BlogPostLayout 
      title="Temario Examen Ultraligero" 
      description="Descubre el temario completo del examen de piloto ultraligero con todas las materias y temas."
    >
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-full">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-white" />
              <span className="text-white font-medium text-sm">Temario</span>
            </div>
          </div>
          <div className="bg-white/10 px-3 py-2 rounded-full">
            <div className="flex items-center gap-2 text-main">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">12 min</span>
            </div>
          </div>
          <div className="bg-white/10 px-3 py-2 rounded-full">
            <div className="flex items-center gap-2 text-main">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Ult. Actualizacion: 25/07/2025</span>
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
        <h2>Temario oficial del examen de ultraligero</h2>
        <p>
          El examen teórico de piloto de ultraligero abarca 8 materias
          principales establecidas por AESA.
        </p>

        <h3>1. Conocimiento general de aeronaves (10-15%)</h3>
        <h4>Estructura y sistemas</h4>
        <ul>
          <li>Fuselaje, alas y superficies de control</li>
          <li>Tren de aterrizaje</li>
          <li>Sistemas de propulsión</li>
          <li>Sistemas eléctricos y de combustible</li>
          <li>Instrumentos de vuelo</li>
        </ul>

        <h3>2. Principios de vuelo (15-20%)</h3>
        <ul>
          <li>Aerodinámica básica</li>
          <li>Fuerzas que actúan en vuelo</li>
          <li>Sustentación y resistencia</li>
          <li>Estabilidad y control</li>
          <li>Pérdida y barrena</li>
          <li>Actuaciones de la aeronave</li>
        </ul>

        <h3>3. Procedimientos operacionales (15-20%)</h3>
        <ul>
          <li>Planificación del vuelo</li>
          <li>Procedimientos de despegue y aterrizaje</li>
          <li>Operaciones en aeródromos</li>
          <li>Emergencias y situaciones anormales</li>
          <li>Limitaciones operacionales</li>
        </ul>

        <h3>4. Meteorología (10-15%)</h3>
        <ul>
          <li>Atmósfera estándar</li>
          <li>Presión, temperatura y densidad</li>
          <li>Viento y turbulencias</li>
          <li>Nubes y precipitaciones</li>
          <li>Visibilidad y fenómenos meteorológicos</li>
          <li>Interpretación de informes meteorológicos</li>
        </ul>

        <h3>5. Navegación (10-15%)</h3>
        <ul>
          <li>Principios de navegación</li>
          <li>Cartas aeronáuticas</li>
          <li>Navegación a estima</li>
          <li>Uso de GPS y radioayudas</li>
          <li>Planificación de rutas</li>
        </ul>

        <h3>6. Comunicaciones (5-10%)</h3>
        <ul>
          <li>Procedimientos de comunicación</li>
          <li>Fraseología aeronáutica</li>
          <li>Uso de equipos de radio</li>
          <li>Comunicaciones de emergencia</li>
        </ul>

        <h3>7. Factores humanos (5-10%)</h3>
        <ul>
          <li>Fisiología del vuelo</li>
          <li>Efectos de la altitud</li>
          <li>Desorientación espacial</li>
          <li>Fatiga y estrés</li>
          <li>Toma de decisiones</li>
        </ul>

        <h3>8. Legislación aeronáutica (10-15%)</h3>
        <ul>
          <li>Reglamentación nacional e internacional</li>
          <li>Licencias y habilitaciones</li>
          <li>Reglas del aire</li>
          <li>Espacios aéreos</li>
          <li>Documentación de vuelo</li>
        </ul>

        <h3>Formato del examen</h3>
        <ul>
          <li>
            <strong>Número de preguntas:</strong> 80-100 preguntas
          </li>
          <li>
            <strong>Tipo:</strong> Test de opción múltiple
          </li>
          <li>
            <strong>Duración:</strong> 2 horas
          </li>
          <li>
            <strong>Puntuación mínima:</strong> 75%
          </li>
          <li>
            <strong>Idioma:</strong> Español
          </li>
        </ul>

        <h3>Consejos para el estudio</h3>
        <ul>
          <li>Estudia todas las materias de forma equilibrada</li>
          <li>Practica con tests similares al oficial</li>
          <li>Repasa los temas con mayor peso en el examen</li>
          <li>Utiliza material actualizado según normativa AESA</li>
          <li>Realiza simulacros de examen completos</li>
        </ul>
      </div>
    </BlogPostLayout>
  )
}

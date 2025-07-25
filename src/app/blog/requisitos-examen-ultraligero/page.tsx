import { Metadata } from "next"
import BlogPostLayout from "@/components/blog/BlogPostLayout"
import { Calendar, Clock, BookOpen } from "@/components/ui/icons"
import { Faqs } from "@/components/Faqs"
const faqsData = [
  {
    question: "¿Qué documentos necesito para presentarme al examen?",
    answer: "Debes tener un DNI o pasaporte en vigor, un certificado médico aeronáutico válido, un certificado de finalización del curso teórico, una solicitud oficial cumplimentada y un justificante de pago de las tasas."
  },
  {question:"¿ Es necesario tener el certificado medico?", answer:"Si, el certificado medico debe estar en vigor en el momento del examen"},
  {question:"Es necesario ser mayor de 18 años para poder presentarme al examen?", answer:"No, para el examen teorico no es necesario ser mayor de 18 años"},

]

export const metadata: Metadata = {
  title: "Requisitos Examen Ultraligero - Todo lo que Necesitas Saber",
  description:
    "Conoce todos los requisitos para presentarte al examen de piloto ultraligero. Documentación necesaria, condiciones médicas, edad mínima y proceso de inscripción.",
  keywords: [
    "requisitos examen ultraligero",
    "examen piloto ULM requisitos",
    "documentación examen aviación",
    "inscripción examen AESA",
    "condiciones examen piloto",
    "edad mínima piloto ULM",
    "certificado médico examen"
  ],
  alternates: {
    canonical: "/blog/requisitos-examen-ultraligero",
  },
  openGraph: {
    title: "Requisitos Examen Ultraligero - Todo lo que Necesitas Saber",
    description: "Conoce todos los requisitos para presentarte al examen de piloto ultraligero.",
    url: "https://www.preparaulm.com/blog/requisitos-examen-ultraligero",
    type: "article",
  },
}

export default function RequisitosExamenUltraligeroPage() {
  return (
    <>
    <BlogPostLayout 
      title="Requisitos Examen Ultraligero"
      description="Todo lo que debes saber sobre los requisitos específicos para poder presentarte al examen teórico oficial."
    >
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 rounded-full">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-white" />
              <span className="text-white font-medium text-sm">Exámenes</span>
            </div>
          </div>
          <div className="bg-white/10 px-3 py-2 rounded-full">
            <div className="flex items-center gap-2 text-main">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">6 min</span>
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
        className="prose  max-w-none
          prose-headings:text-white prose-headings:font-bold
          prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8
          prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6
          prose-h4:text-lg prose-h4:mb-2 prose-h4:mt-4
          prose-p:text-secondary prose-p:leading-relaxed prose-p:mb-4
          prose-ul:text-secondary prose-li:mb-1
          prose-strong:text-main"
      >
        <h2>Requisitos para el examen teórico de ultraligero</h2>
        <p>
          Antes de presentarte al examen teórico oficial, debes cumplir con
          ciertos requisitos previos establecidos por AESA.
        </p>

        <h3>Documentación necesaria</h3>
        <ul>
          <li>DNI o pasaporte en vigor</li>
          <li>Certificado médico aeronáutico válido</li>
          <li>Certificado de finalización del curso teórico</li>
          <li>Solicitud oficial cumplimentada</li>
          <li>Justificante de pago de las tasas</li>
        </ul>

        <h3>Formación previa obligatoria</h3>
        <p>
          Debes haber completado un curso de formación teórica en una escuela
          autorizada por AESA. Este curso debe incluir todas las materias del
          programa oficial.
        </p>

        <h3>Certificado médico</h3>
        <p>
          El certificado médico debe estar en vigor en el momento del examen.
          Dependiendo del tipo de ultraligero:
        </p>
        <ul>
          <li>
            <strong>ULM de hasta 472,5 kg:</strong> Declaración médica del
            piloto (LAPL)
          </li>
          <li>
            <strong>ULM de más de 472,5 kg:</strong> Certificado médico de Clase
            2
          </li>
        </ul>

        <h3>Proceso de inscripción</h3>
        <p>
          La inscripción al examen se realiza a través del portal oficial de
          AESA o en las oficinas territoriales correspondientes.
        </p>

        <h3>Tasas del examen</h3>
        <p>
          Es necesario abonar las tasas oficiales establecidas por AESA para
          poder realizar el examen.
        </p>

        <h3>Convocatorias</h3>
        <p>
          Los exámenes se realizan periódicamente en las fechas establecidas por
          AESA. Actualmente, se llevan a cabo en Madrid, en las instalaciones de Senasa.
          Es importante consultar el calendario oficial.
        </p>
        <p>
          Para inscribirte al examen, visita la <a href="https://www.aesa.gob.es/es/inscripcion-examen-ultraligero" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener">aplicación oficial de matrícula</a>.
        </p>
      </div>
      <Faqs id="requisitos-examen-ultraligero" title="Preguntas Frecuentes" questions={faqsData} />
    </BlogPostLayout>

     </>
  )
}

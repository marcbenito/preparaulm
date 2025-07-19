import BlogPostLayout from "@/components/blog/BlogPostLayout"
import { Calendar, Clock, User, BookOpen } from "@/components/ui/icons"

export default function RequisitosExamenUltraligeroPage() {
  return (
    <BlogPostLayout>
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
              <span className="text-sm">12/3/2024</span>
            </div>
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-main mb-6 leading-tight">
          Requisitos para presentarte al examen de ultraligero
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
            Todo lo que debes saber sobre los requisitos específicos para poder
            presentarte al examen teórico oficial.
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
          AESA. Es importante consultar el calendario oficial.
        </p>
      </div>
    </BlogPostLayout>
  )
}

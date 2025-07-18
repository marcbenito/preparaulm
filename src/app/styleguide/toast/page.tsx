"use client"

import { Button } from "@/components/ui/Button"
import { useToast } from "@/hooks/useToast"
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
} from "@/components/ui/icons"

export default function StyleGuideToastPage() {
  const { toast } = useToast()

  const showSuccessToast = () => {
    toast({
      title: "¡Éxito!",
      description: "La operación se completó correctamente.",
      className: "bg-green-500 text-white border-green-600",
    })
  }

  const showErrorToast = () => {
    toast({
      title: "Error",
      description: "Algo salió mal. Por favor, inténtalo de nuevo.",
      variant: "destructive",
    })
  }

  const showInfoToast = () => {
    toast({
      title: "Información",
      description: "Aquí tienes información útil.",
      className: "bg-blue-500 text-white border-blue-600",
    })
  }

  const showToastWithAction = () => {
    toast({
      title: "Test completado",
      description: "Tu test ha sido enviado correctamente.",
      action: (
        <Button
          variant="outline"
          size="sm"
          className="bg-white text-black hover:bg-gray-100"
        >
          Ver resultados
        </Button>
      ),
    })
  }

  const showLongDurationToast = () => {
    toast({
      title: "Notificación persistente",
      description:
        "Este toast permanecerá visible por más tiempo para que puedas leerlo.",
      className: "bg-purple-500 text-white border-purple-600",
      duration: 10000, // 10 segundos
    })
  }

  const showQuickToast = () => {
    toast({
      title: "¡Rápido!",
      description: "Este toast desaparece rápidamente.",
      className: "bg-cyan-500 text-white border-cyan-600",
      duration: 2000, // 2 segundos
    })
  }

  return (
    <div className="container py-10 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Toast Components
        </h1>
        <p className="text-muted-foreground">
          Ejemplos de componentes Toast usando las variantes disponibles.
        </p>
      </div>

      <section className="mb-16 p-8 bg-cosmic-night rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-white">
          Toast Examples
        </h2>

        <div className="space-y-8">
          {/* Basic Toast Types */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4 text-white">
              Basic Toast Types
            </h3>
            <p className="text-blue-200 mb-6">
              Diferentes tipos de toast para comunicar estados y mensajes al
              usuario.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-3">
                <Button
                  onClick={showSuccessToast}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Success Toast
                </Button>
                <p className="text-xs text-blue-200">className personalizado</p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={showErrorToast}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Error Toast
                </Button>
                <p className="text-xs text-blue-200">
                  variant=&quot;destructive&quot;
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={showInfoToast}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Info className="h-4 w-4 mr-2" />
                  Info Toast
                </Button>
                <p className="text-xs text-blue-200">className personalizado</p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={showToastWithAction}
                  variant="primary-gradient"
                  className="w-full"
                >
                  Toast with Action
                </Button>
                <p className="text-xs text-blue-200">Con botón de acción</p>
              </div>
            </div>
          </div>

          {/* Different Durations */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4 text-white">
              Different Durations
            </h3>
            <p className="text-blue-200 mb-6">
              Toast con diferentes duraciones de visualización.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Button
                  onClick={showQuickToast}
                  variant="outline"
                  className="w-full"
                >
                  Quick Toast (2s)
                </Button>
                <p className="text-xs text-blue-200">
                  Desaparece rápidamente para mensajes breves
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={showLongDurationToast}
                  variant="outline"
                  className="w-full"
                >
                  Long Duration Toast (10s)
                </Button>
                <p className="text-xs text-blue-200">
                  Permanece visible más tiempo para mensajes importantes
                </p>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4 text-white">
              Code Examples
            </h3>
            <p className="text-blue-200 mb-6">
              Ejemplos de código para implementar diferentes tipos de toast.
            </p>

            <div className="space-y-6">
              <div className="bg-black/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-white mb-2">
                  Success Toast
                </h4>
                <pre className="text-xs text-green-300 overflow-x-auto">
                  {`toast({
  title: "¡Éxito!",
  description: "La operación se completó correctamente.",
  className: "bg-green-500 text-white border-green-600",
})`}
                </pre>
              </div>

              <div className="bg-black/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-white mb-2">
                  Error Toast
                </h4>
                <pre className="text-xs text-red-300 overflow-x-auto">
                  {`toast({
  title: "Error",
  description: "Algo salió mal. Por favor, inténtalo de nuevo.",
  variant: "destructive",
})`}
                </pre>
              </div>

              <div className="bg-black/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-white mb-2">
                  Toast with Action
                </h4>
                <pre className="text-xs text-blue-300 overflow-x-auto">
                  {`toast({
  title: "Test completado",
  description: "Tu test ha sido enviado correctamente.",
  className: "bg-green-500 text-white border-green-600",
})`}
                </pre>
              </div>

              <div className="bg-black/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-white mb-2">
                  Custom Duration
                </h4>
                <pre className="text-xs text-purple-300 overflow-x-auto">
                  {`toast({
  title: "Notificación persistente",
  description: "Este toast permanecerá visible por más tiempo.",
  duration: 10000, // 10 segundos
  className: "bg-purple-500 text-white border-purple-600",
})`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-xl p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">Usage Guidelines</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Default Variant</h4>
              <p className="text-blue-200">
                Sin variant especificado usa el default. Añade className para
                colores personalizados.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">
                Variant: &quot;destructive&quot;
              </h4>
              <p className="text-blue-200">
                Usa variant=&quot;destructive&quot; para errores. No necesita
                className adicional.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Actions</h4>
              <p className="text-blue-200">
                Añade botones de acción para interacciones adicionales.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

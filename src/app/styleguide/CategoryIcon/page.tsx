import { CategoryIcon } from "@/components/ui/CategoryIcon"

export default function CategoryIconStyleguidePage() {
  const categories = [
    {
      name: "Meteorología",
      iconName: "Cloud",
      color: "from-sky-500 to-blue-500",
    },
    {
      name: "Performance",
      iconName: "Gauge",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Radio",
      iconName: "Radio",
      color: "from-purple-500 to-indigo-500",
    },
    {
      name: "Sistemas",
      iconName: "Plane",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Navegación",
      iconName: "NavigationIcon",
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "Planificación",
      iconName: "FileQuestion",
      color: "from-yellow-500 to-amber-500",
    },
    {
      name: "Factores Humanos",
      iconName: "Brain",
      color: "from-teal-500 to-cyan-500",
    },
    {
      name: "Legislación",
      iconName: "Waypoints",
      color: "from-violet-500 to-purple-500",
    },
    {
      name: "Procedimientos",
      iconName: "AlertTriangle",
      color: "from-fuchsia-500 to-pink-500",
    },
    { name: "Default", iconName: null, color: null },
  ]

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">CategoryIcon Component</h1>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Descripción</h2>
        <p className="text-gray-300 mb-4">
          El componente CategoryIcon muestra un icono y un color de fondo para
          representar una categoría. Acepta dos props principales: iconName y
          color.
        </p>
        <p className="text-gray-300">
          Si no se proporciona un iconName, se utilizará el icono FileQuestion
          como fallback. Si no se proporciona un color, se utilizará
          &quot;from-gray-500 to-gray-600&quot; como fallback.
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Variantes de Categoría</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex flex-col items-center p-4 bg-black/20 rounded-lg"
            >
              <CategoryIcon
                iconName={category.iconName}
                color={category.color}
              />
              <span className="mt-3 text-sm text-gray-300">
                {category.name}
              </span>
              <span className="mt-1 text-xs text-gray-400">
                {category.iconName || "null"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Tamaños personalizados</h2>
        <div className="flex items-end gap-6">
          <div className="flex flex-col items-center">
            <CategoryIcon
              iconName="Cloud"
              color="from-sky-500 to-blue-500"
              className="h-8 w-8"
            />
            <span className="mt-2 text-xs text-gray-400">Pequeño</span>
          </div>
          <div className="flex flex-col items-center">
            <CategoryIcon
              iconName="Plane"
              color="from-orange-500 to-red-500"
              className="h-12 w-12"
            />
            <span className="mt-2 text-xs text-gray-400">
              Mediano (por defecto)
            </span>
          </div>
          <div className="flex flex-col items-center">
            <CategoryIcon
              iconName="Brain"
              color="from-teal-500 to-cyan-500"
              className="h-16 w-16"
            />
            <span className="mt-2 text-xs text-gray-400">Grande</span>
          </div>
          <div className="flex flex-col items-center">
            <CategoryIcon
              iconName="Waypoints"
              color="from-violet-500 to-purple-500"
              className="h-24 w-24"
            />
            <span className="mt-2 text-xs text-gray-400">Extra grande</span>
          </div>
        </div>
      </div>
    </div>
  )
}

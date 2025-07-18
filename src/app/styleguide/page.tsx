import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion"
import { Progress } from "@/components/ui/Progress"
import { ThemeSwitch } from "../../components/ThemeSwitch"
import { Github, ArrowRight, UserPlus } from "@/components/ui/icons"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { InputErrorMessage } from "@/components/ui/Form"
import Link from "next/link"

// Import the new RadarChart component
import RadarChart from "@/components/ui/RadarChart"

export default function StyleGuidePage() {
  // Color palette from the design system
  const colors = [
    // Custom brand colors used in the app
    { name: "blue-900", value: "#1E3A8A", description: "Primary dark blue" },
    {
      name: "purple-900",
      value: "#581C87",
      description: "Primary dark purple",
    },
    {
      name: "indigo-900",
      value: "#312E81",
      description: "Primary dark indigo",
    },
    { name: "blue-400", value: "#60A5FA", description: "Accent blue" },
    { name: "cyan-400", value: "#22D3EE", description: "Accent cyan" },
    { name: "blue-200", value: "#BFDBFE", description: "Light blue text" },
    { name: "blue-100", value: "#DBEAFE", description: "Very light blue text" },
    { name: "blue-300", value: "#93C5FD", description: "Medium blue text" },
    { name: "yellow-400", value: "#FACC15", description: "Yellow accent" },
    { name: "yellow-200", value: "#FEF08A", description: "Light yellow text" },
    { name: "white", value: "#FFFFFF", description: "White" },
    {
      name: "purple-500",
      value: "#8B5CF6",
      description: "Medium purple accent",
    },
    { name: "pink-500", value: "#EC4899", description: "Pink accent" },
    { name: "green-500", value: "#10B981", description: "Green accent" },
    { name: "emerald-500", value: "#10B981", description: "Emerald accent" },
  ]

  // Common gradients used in the app
  const gradients = [
    {
      name: "cosmic-night",
      classes: "bg-cosmic-night",
      description: "Main background gradient for dark cosmic look",
    },
    {
      name: "azure-breeze",
      classes: "bg-gradient-to-r from-blue-400 to-cyan-400",
      description: "Accent gradient for buttons and highlights",
    },
    {
      name: "ocean-depths",
      classes: "bg-gradient-to-br from-blue-500 to-cyan-500",
      description: "Feature card accent for data-related content",
    },
    {
      name: "magenta-sunset",
      classes: "bg-gradient-to-br from-purple-500 to-pink-500",
      description: "Feature card accent for creative content",
    },
    {
      name: "emerald-forest",
      classes: "bg-gradient-to-br from-green-500 to-emerald-500",
      description: "Feature card accent for success and growth",
    },
  ]

  // Utility classes for overlays and transparencies
  const transparencies = [
    { name: "white/5", classes: "bg-white/5", description: "5% white overlay" },
    {
      name: "white/10",
      classes: "bg-white/10",
      description: "10% white overlay",
    },
    {
      name: "white/20",
      classes: "bg-white/20",
      description: "20% white overlay",
    },
  ]

  // Mock Data for Radar Chart example
  const radarChartData = [
    { subject: "Meteorology", score: 85, fullMark: 100 },
    { subject: "Air Law", score: 92, fullMark: 100 },
    { subject: "Navigation", score: 78, fullMark: 100 },
    { subject: "AGK", score: 88, fullMark: 100 },
    { subject: "Human Perf.", score: 95, fullMark: 100 },
    { subject: "Op. Proc.", score: 81, fullMark: 100 },
  ]

  return (
    <div className="container py-10 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-foreground">Style Guide</h1>
        <ThemeSwitch />
      </div>
      <p className="text-muted-foreground mb-10">
        This page showcases the design system and UI components used throughout
        the application.
      </p>

      {/* Typography Custom Classes */}
      <section className="mb-16 p-8 bg-cosmic-night rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-white">
          Typography Custom Classes
        </h2>
        <div className="space-y-8">
          <div>
            <p className="text-main text-2xl">Texto Principal</p>
            <p className="text-blue-200 text-sm mt-1">
              text-main (Blanco, #FFFFFF)
            </p>
            <p className="text-blue-200 text-xs mt-1">
              Uso: Textos principales, títulos y contenido destacado sobre
              fondos oscuros
            </p>
          </div>

          <div>
            <p className="text-secondary text-2xl">Texto Secundario</p>
            <p className="text-blue-200 text-sm mt-1">
              text-secondary (Azul claro, #BFDBFE)
            </p>
            <p className="text-blue-200 text-xs mt-1">
              Uso: Descripciones, párrafos y contenido secundario
            </p>
          </div>

          <div>
            <p className="text-tertiary text-2xl">Texto Terciario</p>
            <p className="text-blue-200 text-sm mt-1">
              text-tertiary (Azul medio, #93C5FD)
            </p>
            <p className="text-blue-200 text-xs mt-1">
              Uso: Elementos de lista, etiquetas y texto menos prominente
            </p>
          </div>

          <div>
            <p className="text-subtle text-2xl">Texto Sutil</p>
            <p className="text-blue-200 text-sm mt-1">
              text-subtle (Azul muy claro, #DBEAFE)
            </p>
            <p className="text-blue-200 text-xs mt-1">
              Uso: Descripciones de elementos, texto de ayuda y contenido muy
              secundario
            </p>
          </div>

          <div>
            <p className="text-highlight text-2xl">Texto Destacado</p>
            <p className="text-blue-200 text-sm mt-1">
              text-highlight (Amarillo claro, #FEF08A)
            </p>
            <p className="text-blue-200 text-xs mt-1">
              Uso: Estadísticas, logros, porcentajes y texto que debe destacar
            </p>
          </div>

          <div>
            <p className="text-accent text-2xl">Texto Acento</p>
            <p className="text-blue-200 text-sm mt-1">
              text-accent (Amarillo, #FACC15)
            </p>
            <p className="text-blue-200 text-xs mt-1">
              Uso: Etiquetas de acento, iconos de texto y elementos de énfasis
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <p className="text-action text-2xl">Texto Acción</p>
            <p className="text-gray-500 text-sm mt-1">
              text-action (Azul oscuro, #1E3A8A)
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Uso: Texto sobre botones de acción primaria con fondo claro
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-white text-xl mb-4">
              Ejemplos de uso combinado
            </h3>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mt-4">
              <h4 className="text-main text-2xl font-bold mb-2">
                Título de sección
              </h4>
              <p className="text-secondary text-lg mb-4">
                Esta es una descripción más larga que explica el propósito de
                esta sección. Utiliza el color secundario para mejor
                legibilidad.
              </p>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-yellow-400 rounded-full"></div>
                  <span className="text-tertiary">
                    Elemento de lista con texto terciario
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-yellow-400 rounded-full"></div>
                  <span className="text-tertiary">Otro elemento de lista</span>
                </li>
              </ul>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 bg-yellow-400 rounded-full"></div>
                  <span className="text-highlight">95%</span>
                </div>
                <p className="text-subtle text-sm">Tasa de aprobación</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Colors */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {colors.map((color) => (
            <div key={color.name} className="flex flex-col">
              <div
                className="h-24 rounded-md"
                style={{ backgroundColor: color.value }}
              />
              <div className="mt-2">
                <p className="font-medium capitalize">{color.name}</p>
                <p className="text-sm text-muted-foreground">{color.value}</p>
                <p className="text-xs text-muted-foreground">
                  {color.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gradients */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Gradients
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gradients.map((gradient) => (
            <div key={gradient.name} className="flex flex-col">
              <div className={`h-24 rounded-md ${gradient.classes}`} />
              <div className="mt-2">
                <p className="font-medium capitalize">{gradient.name}</p>
                <p className="text-sm text-muted-foreground">
                  {gradient.classes}
                </p>
                <p className="text-xs text-muted-foreground">
                  {gradient.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Gradient Utilities */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Custom Gradient Utilities
        </h2>
        <p className="mb-4 text-muted-foreground">
          Estos gradientes están disponibles como clases de utilidad y se pueden
          usar directamente como <code>bg-cosmic-night</code>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <div className="h-24 rounded-md bg-cosmic-night" />
            <div className="mt-2">
              <p className="font-medium capitalize">cosmic-night</p>
              <p className="text-sm text-muted-foreground">.bg-cosmic-night</p>
              <p className="text-xs text-muted-foreground">
                Fondo principal para el tema oscuro con efecto cósmico
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="h-24 rounded-md bg-azure-breeze" />
            <div className="mt-2">
              <p className="font-medium capitalize">azure-breeze</p>
              <p className="text-sm text-muted-foreground">.bg-azure-breeze</p>
              <p className="text-xs text-muted-foreground">
                Gradiente para botones y elementos destacados
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="h-24 rounded-md bg-ocean-depths" />
            <div className="mt-2">
              <p className="font-medium capitalize">ocean-depths</p>
              <p className="text-sm text-muted-foreground">.bg-ocean-depths</p>
              <p className="text-xs text-muted-foreground">
                Gradiente para tarjetas y contenido relacionado con datos
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="h-24 rounded-md bg-magenta-sunset" />
            <div className="mt-2">
              <p className="font-medium capitalize">magenta-sunset</p>
              <p className="text-sm text-muted-foreground">
                .bg-magenta-sunset
              </p>
              <p className="text-xs text-muted-foreground">
                Gradiente para contenido creativo y artístico
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="h-24 rounded-md bg-emerald-forest" />
            <div className="mt-2">
              <p className="font-medium capitalize">emerald-forest</p>
              <p className="text-sm text-muted-foreground">
                .bg-emerald-forest
              </p>
              <p className="text-xs text-muted-foreground">
                Gradiente para éxito, crecimiento y elementos positivos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparencies */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Transparencies & Overlays
        </h2>
        <div className="bg-cosmic-night p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {transparencies.map((transparency) => (
              <div key={transparency.name} className="flex flex-col">
                <div className={`h-24 rounded-md ${transparency.classes}`} />
                <div className="mt-2">
                  <p className="font-medium capitalize text-white">
                    {transparency.name}
                  </p>
                  <p className="text-sm text-blue-200">
                    {transparency.classes}
                  </p>
                  <p className="text-xs text-blue-200">
                    {transparency.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buttons */}
      {/* Removed Buttons Section */}
      {/* <section className="mb-16">
        ... entire buttons section ...
      </section> */}

      {/* Components */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Components
        </h2>

        {/* Buttons */}
        {/* Removed Button examples from within Components section */}
        {/* <div className="mb-8">
          ... button examples ...
        </div> */}

        {/* Input Component */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4 text-foreground">Input</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card p-6 rounded-lg border">
            {/* Standard Input */}
            <div className="space-y-2">
              <Label htmlFor="input-standard">Standard Input</Label>
              <Input id="input-standard" placeholder="Placeholder..." />
              <p className="text-sm text-muted-foreground">Default variant.</p>
            </div>

            {/* Themed Input */}
            <div className="space-y-2 bg-cosmic-night p-4 rounded-md">
              <Label htmlFor="input-themed" className="text-blue-200">
                Themed Input (Dark BG)
              </Label>
              <Input
                id="input-themed"
                variant="themed"
                placeholder="Placeholder..."
              />
              <p className="text-sm text-blue-300">
                <code>variant=&quot;themed&quot;</code> for dark backgrounds.
              </p>
            </div>

            {/* Standard Input with Error */}
            <div className="space-y-2">
              <Label htmlFor="input-standard-error">
                Standard Input (Error)
              </Label>
              <Input
                id="input-standard-error"
                placeholder="Placeholder..."
                error={true}
              />
              <InputErrorMessage message="This is an error message." />
              <p className="text-sm text-muted-foreground">
                <code>error={true}</code> prop.
              </p>
            </div>

            {/* Themed Input with Error */}
            <div className="space-y-2 bg-cosmic-night p-4 rounded-md">
              <Label htmlFor="input-themed-error" className="text-blue-200">
                Themed Input (Error)
              </Label>
              <Input
                id="input-themed-error"
                variant="themed"
                placeholder="Placeholder..."
                error={true}
              />
              <InputErrorMessage message="This themed input has an error." />
              <p className="text-sm text-blue-300">
                <code>variant=&quot;themed&quot;</code> and{" "}
                <code>error=&#123;true&#125;</code>.
              </p>
            </div>
          </div>
        </div>

        {/* Cards */}
        {/* Removed Cards Section */}
        {/* <div className="mb-8">
          ... entire cards section ...
        </div> */}

        {/* Avatar */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4 text-foreground">Avatars</h3>
          <div className="flex flex-wrap gap-6">
            <div>
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-sm text-muted-foreground mt-2">Large</p>
            </div>
            <div>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-sm text-muted-foreground mt-2">Default</p>
            </div>
            <div>
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-sm text-muted-foreground mt-2">Small</p>
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4 text-foreground">
            Accordions
          </h3>
          <Accordion type="single" collapsible className="w-full max-w-md">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that match the other
                components.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s animated by default, but you can disable it if
                you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4 text-foreground">Progress</h3>
          <div className="space-y-4 max-w-md">
            <div>
              <Progress value={25} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">25%</p>
            </div>
            <div>
              <Progress value={50} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">50%</p>
            </div>
            <div>
              <Progress value={75} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">75%</p>
            </div>
            <div>
              <Progress value={100} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">100%</p>
            </div>
          </div>
        </div>

        {/* Component Navigation */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4 text-foreground">
            Component Pages
          </h3>
          <p className="text-muted-foreground mb-6">
            Explore detailed examples and documentation for specific UI
            components.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/styleguide/button" className="group">
              <Card className="bg-white/20 border-white/10 backdrop-blur-sm text-white hover:bg-white/30 transition-colors">
                <CardHeader>
                  <CardTitle className="group-hover:text-blue-200 transition-colors">
                    Buttons
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    Different button variants and sizes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button size="sm" variant="primary-gradient">
                      Primary
                    </Button>
                    <Button size="sm" variant="outline">
                      Outline
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <ArrowRight className="h-4 w-4 text-blue-300 group-hover:translate-x-1 transition-transform" />
                </CardFooter>
              </Card>
            </Link>

            <Link href="/styleguide/card" className="group">
              <Card className="bg-white/20 border-white/10 backdrop-blur-sm text-white hover:bg-white/30 transition-colors">
                <CardHeader>
                  <CardTitle className="group-hover:text-blue-200 transition-colors">
                    Cards
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    Card layouts and content organization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-12 bg-white/10 rounded border border-white/20"></div>
                </CardContent>
                <CardFooter>
                  <ArrowRight className="h-4 w-4 text-blue-300 group-hover:translate-x-1 transition-transform" />
                </CardFooter>
              </Card>
            </Link>

            <Link href="/styleguide/dialog" className="group">
              <Card className="bg-white/20 border-white/10 backdrop-blur-sm text-white hover:bg-white/30 transition-colors">
                <CardHeader>
                  <CardTitle className="group-hover:text-blue-200 transition-colors">
                    Dialogs
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    Modal dialogs and overlays
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-white/20 rounded w-3/4"></div>
                    <div className="h-3 bg-white/10 rounded w-1/2"></div>
                  </div>
                </CardContent>
                <CardFooter>
                  <ArrowRight className="h-4 w-4 text-blue-300 group-hover:translate-x-1 transition-transform" />
                </CardFooter>
              </Card>
            </Link>

            <Link href="/styleguide/toast" className="group">
              <Card className="bg-white/20 border-white/10 backdrop-blur-sm text-white hover:bg-white/30 transition-colors">
                <CardHeader>
                  <CardTitle className="group-hover:text-blue-200 transition-colors">
                    Toasts
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    Notification toasts and alerts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-1">
                    <div className="h-6 w-6 bg-green-500 rounded-full"></div>
                    <div className="h-6 w-6 bg-red-500 rounded-full"></div>
                    <div className="h-6 w-6 bg-amber-500 rounded-full"></div>
                    <div className="h-6 w-6 bg-blue-500 rounded-full"></div>
                  </div>
                </CardContent>
                <CardFooter>
                  <ArrowRight className="h-4 w-4 text-blue-300 group-hover:translate-x-1 transition-transform" />
                </CardFooter>
              </Card>
            </Link>

            <Link href="/styleguide/tooltip" className="group">
              <Card className="bg-white/20 border-white/10 backdrop-blur-sm text-white hover:bg-white/30 transition-colors">
                <CardHeader>
                  <CardTitle className="group-hover:text-blue-200 transition-colors">
                    Tooltips
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    Hover tooltips and help text
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="h-8 w-16 bg-white/20 rounded border border-white/30"></div>
                    <div className="absolute -top-1 -right-1 h-4 w-8 bg-black/50 rounded text-xs flex items-center justify-center">
                      tip
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <ArrowRight className="h-4 w-4 text-blue-300 group-hover:translate-x-1 transition-transform" />
                </CardFooter>
              </Card>
            </Link>

            <Link href="/styleguide/score" className="group">
              <Card className="bg-white/20 border-white/10 backdrop-blur-sm text-white hover:bg-white/30 transition-colors">
                <CardHeader>
                  <CardTitle className="group-hover:text-blue-200 transition-colors">
                    Score
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    Score displays and progress indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold">
                      85
                    </div>
                    <div className="h-2 bg-white/20 rounded-full flex-1">
                      <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-4/5"></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <ArrowRight className="h-4 w-4 text-blue-300 group-hover:translate-x-1 transition-transform" />
                </CardFooter>
              </Card>
            </Link>
          </div>
        </div>

        {/* Tooltip */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4 text-foreground">Tooltips</h3>
          <div className="flex flex-col gap-8">
            <div>
              <h4 className="text-lg font-medium mb-4">Basic Tooltip</h4>
              <div className="flex items-center gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This is a basic tooltip</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">
                Profile Update Tooltip
              </h4>
              <div className="flex items-center gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                        Perfil actualizado
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tu información ha sido actualizada correctamente</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Icon with Tooltip</h4>
              <div className="flex items-center gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="p-2 bg-blue-500 text-white rounded-full cursor-pointer">
                        <UserPlus className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Añadir nuevo usuario</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Tooltip Positions</h4>
              <div className="flex flex-wrap items-center gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Top</Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>Tooltip on top</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Right</Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Tooltip on right</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Bottom</Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Tooltip on bottom</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Left</Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Tooltip on left</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>

        {/* New Radar Chart Component Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">
            Radar Chart
          </h2>
          <p className="text-muted-foreground mb-8">
            Used to display multivariate data in the form of a two-dimensional
            chart of three or more quantitative variables represented on axes
            starting from the same point.
          </p>
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                {" "}
                {/* Give the container a specific height */}
                <RadarChart data={radarChartData} />
              </div>
            </CardContent>
            <CardFooter>
              <CardDescription>
                Example of the RadarChart component showing average scores
                across different test categories.
              </CardDescription>
            </CardFooter>
          </Card>
        </section>
      </section>
    </div>
  )
}

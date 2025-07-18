import { Button } from "@/components/ui/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Trash2, AlertTriangle } from "@/components/ui/icons"

export default function StyleGuideDialogPage() {
  return (
    <div className="container py-10 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Dialog Components
        </h1>
        <p className="text-muted-foreground">
          Ejemplos de componentes Dialog con diferentes tamaños, contenidos y
          casos de uso.
        </p>
      </div>

      <section className="mb-16 p-8 bg-cosmic-night rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-white">
          Dialog Examples
        </h2>

        <div className="space-y-8">
          {/* Basic Dialog */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4 text-white">
              Basic Dialog
            </h3>
            <p className="text-blue-200 mb-4">
              Dialog básico con formulario de suscripción.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="primary-gradient">
                  Open Newsletter Dialog
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Subscribe to our newsletter</DialogTitle>
                  <DialogDescription>
                    Get notified about new features and updates.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      className="col-span-3"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className="col-span-3"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" variant="primary-gradient">
                    Subscribe
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Large Dialog with Complex Content */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4 text-white">
              Large Dialog with Complex Content
            </h3>
            <p className="text-blue-200 mb-4">
              Dialog más grande con contenido complejo y múltiples secciones.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open Test Settings</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Test Configuration</DialogTitle>
                  <DialogDescription>
                    Configure your test settings and preferences.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">General Settings</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="testName">Test Name</Label>
                        <Input id="testName" placeholder="Enter test name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration (minutes)</Label>
                        <Input id="duration" type="number" placeholder="60" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Question Settings</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="questionCount">
                          Number of Questions
                        </Label>
                        <Input
                          id="questionCount"
                          type="number"
                          placeholder="30"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="difficulty">Difficulty Level</Label>
                        <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option>Easy</option>
                          <option>Medium</option>
                          <option>Hard</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Categories</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        "Meteorology",
                        "Air Law",
                        "Navigation",
                        "AGK",
                        "Human Performance",
                        "Operations",
                      ].map((category) => (
                        <label
                          key={category}
                          className="flex items-center space-x-2"
                        >
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter className="gap-2">
                  <Button variant="ghost">Cancel</Button>
                  <Button variant="primary-gradient">Save Configuration</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Destructive Confirmation Dialog */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4 text-white">
              Destructive Confirmation Dialog
            </h3>
            <p className="text-blue-200 mb-4">
              Dialog de confirmación para acciones destructivas con advertencias
              visuales.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Test
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <DialogTitle className="text-red-900">
                        Delete Test
                      </DialogTitle>
                      <DialogDescription className="text-red-700">
                        This action cannot be undone.
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    Are you sure you want to delete this test? This will
                    permanently remove the test and all associated data. This
                    action cannot be undone.
                  </p>
                  <div className="mt-4 p-3 bg-red-50 rounded-md border border-red-200">
                    <p className="text-sm font-medium text-red-800">
                      Test: &quot;PPL Navigation Exam&quot;
                    </p>
                    <p className="text-xs text-red-600 mt-1">
                      Created: March 15, 2024 • 45 questions
                    </p>
                  </div>
                </div>
                <DialogFooter className="gap-2">
                  <Button variant="ghost">Cancel</Button>
                  <Button
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Test
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Small Dialog */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4 text-white">
              Small Dialog
            </h3>
            <p className="text-blue-200 mb-4">
              Dialog compacto para acciones rápidas o confirmaciones simples.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Quick Action
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm">
                <DialogHeader>
                  <DialogTitle>Quick Confirmation</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to proceed?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2">
                  <Button variant="ghost" size="sm">
                    No
                  </Button>
                  <Button variant="primary-gradient" size="sm">
                    Yes, Continue
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-xl p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">Usage Guidelines</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Basic Dialog</h4>
              <p className="text-blue-200">
                Use for simple forms, confirmations, or information display.
                Keep content focused and actionable.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Large Dialog</h4>
              <p className="text-blue-200">
                Use for complex forms or multi-step processes. Organize content
                in logical sections.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Destructive Dialog</h4>
              <p className="text-blue-200">
                Always include clear warnings and confirmation steps. Use red
                color scheme to indicate danger.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Small Dialog</h4>
              <p className="text-blue-200">
                Use for quick confirmations or simple yes/no questions. Keep
                text minimal and buttons clear.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

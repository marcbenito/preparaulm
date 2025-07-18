import { Button } from "@/components/ui/Button"
import { Github, ArrowRight, UserPlus } from "@/components/ui/icons"

export default function StyleGuideButtonPage() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-semibold mb-6 text-foreground">Buttons</h2>

      <div className="space-y-8">
        {/* Button Variants */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Variants</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default (White)</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="primary-gradient">Primary Gradient</Button>
          </div>
        </div>

        {/* Button Sizes */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Sizes</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Github className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Buttons with Icons */}
        <div>
          <h3 className="text-xl font-semibold mb-4">With Icons</h3>
          <div className="flex flex-wrap gap-4">
            <Button leftIcon={<Github className="h-4 w-4" />}>Left Icon</Button>
            <Button rightIcon={<ArrowRight className="h-4 w-4" />}>
              Right Icon
            </Button>
            <Button
              variant="primary-gradient"
              leftIcon={<Github className="h-4 w-4" />}
            >
              Gradient with Icon
            </Button>
          </div>
        </div>

        {/* Icon Only Buttons */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Icon Only</h3>
          <div className="flex flex-wrap gap-4">
            <Button size="icon">
              <Github className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary">
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline">
              <UserPlus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* States */}
        <div>
          <h3 className="text-xl font-semibold mb-4">States</h3>
          <div className="flex flex-wrap gap-4">
            <Button disabled>Disabled</Button>
            <Button variant="primary-gradient" disabled>
              Disabled Gradient
            </Button>
            <Button variant="outline" disabled>
              Disabled Outline
            </Button>
          </div>
        </div>

        {/* Common Use Cases */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Common Use Cases</h3>
          <div className="flex flex-wrap gap-4 p-8 bg-cosmic-night rounded-lg">
            <Button variant="default" size="lg">
              Comenzar Ahora
            </Button>
            <Button variant="outline" size="lg">
              Ver Demo
            </Button>
            <Button
              variant="primary-gradient"
              size="lg"
              leftIcon={<UserPlus className="h-5 w-5" />}
            >
              Solicitar Acceso
            </Button>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">Usage Guidelines</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Default (White)</h4>
              <p className="text-blue-200">
                Use for primary actions on dark backgrounds. High contrast and
                visibility.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Primary Gradient</h4>
              <p className="text-blue-200">
                Use for main call-to-action buttons. Creates visual hierarchy
                and emphasis.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Outline</h4>
              <p className="text-blue-200">
                Secondary actions on dark backgrounds. Maintains visibility
                while being less prominent.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Ghost</h4>
              <p className="text-blue-200">
                Subtle actions that don&apos;t require immediate attention.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Size Usage</h4>
              <p className="text-blue-200">
                - Large (lg): Main CTAs and important actions
                <br />
                - Default: General purpose buttons
                <br />
                - Small (sm): Compact UI areas
                <br />- Icon: Toolbar actions and compact controls
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

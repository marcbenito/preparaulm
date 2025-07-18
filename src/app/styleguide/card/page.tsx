import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

export default function StyleGuideCardPage() {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-medium mb-4 text-foreground">Cards</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white/20 border-white/10 backdrop-blur-sm text-white">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription className="text-blue-200">
              Card description
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-blue-200">
              Card content goes here. This is where the main content of the card
              is displayed.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary-gradient">Submit</Button>
          </CardFooter>
        </Card>

        <Card className="bg-white/20 border-white/10 backdrop-blur-sm text-white">
          <CardHeader>
            <CardTitle>Test Details</CardTitle>
            <CardDescription className="text-blue-200">
              Information about the test
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-blue-200">Questions:</span>
              <span className="text-sm font-medium text-white">30</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-blue-200">Time limit:</span>
              <span className="text-sm font-medium text-white">60 minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-blue-200">Difficulty:</span>
              <span className="text-sm font-medium text-white">Medium</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="primary-gradient" size="lg">
              Start Test
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

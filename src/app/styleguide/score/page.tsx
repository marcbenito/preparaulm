import React from "react"
import { Score } from "@/components/Score"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"

export default function ScorePage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-4">Score Component</h1>
        <p className="text-muted-foreground mb-6">
          The Score component provides a consistent way to display score values
          with color-coded indicators across the application.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Example</CardTitle>
          <CardDescription>
            Examples of the Score component with different values
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">High Score (≥75%)</p>
            <Score value={95} />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Medium Score (55-74%)
            </p>
            <Score value={65} />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Low Score (&lt;55%)</p>
            <Score value={45} />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">No Score</p>
            <Score value={null} />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Sizes</CardTitle>
          <CardDescription>
            The Score component comes in different sizes
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-6 items-center">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Small</p>
            <Score value={85} size="sm" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Medium (Default)</p>
            <Score value={85} size="md" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Large</p>
            <Score value={85} size="lg" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
          <CardDescription>
            How to use the Score component in your code
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Basic Usage</h3>
            <pre className="bg-secondary p-4 rounded-md overflow-x-auto">
              <code>{`import { Score } from "@/components/Score"

// Basic usage
<Score value={85} />

// Without percentage sign
<Score value={85} showPercent={false} />

// Custom size
<Score value={85} size="lg" />

// With custom class name
<Score value={85} className="my-custom-class" />`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Color Thresholds</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Green: Score ≥ 75%</li>
              <li>Yellow: Score ≥ 55% and &lt; 75%</li>
              <li>Red: Score &lt; 55%</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

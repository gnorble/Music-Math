import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { HelpCircle, History } from "lucide-react"
import { UnitCircleVisualization } from "@/components/unit-circle-visualization"

interface TrigUnitCircleProps {
  angle: number[]
  onAngleChange: (value: number[]) => void
}

export function TrigUnitCircle({ angle, onAngleChange }: TrigUnitCircleProps) {
  return (
    <div className="space-y-6">
      <Alert>
        <HelpCircle className="h-4 w-4" />
        <AlertTitle>How to Approach This Chapter</AlertTitle>
        <AlertDescription>
          We'll start with the unit circle—a circle with radius 1. This simple shape is the key to understanding all of
          trigonometry. Don't worry about memorizing everything at first; focus on understanding the patterns.
        </AlertDescription>
      </Alert>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
          <History className="w-4 h-4 mr-2" />
          Historical Context
        </h3>
        <p className="text-blue-800">
          The concept of measuring angles dates back to ancient Babylon (c. 1800 BCE), where they divided circles into
          360 degrees. The radian, a more natural unit for mathematics, was introduced much later. In music,
          understanding circular motion helps us comprehend how oscillators and rotary speakers work.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>The Unit Circle: Foundation of Trigonometry</CardTitle>
          <CardDescription>
            A circle with radius 1 centered at the origin - the key to understanding all trigonometric functions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">What is the Unit Circle?</h4>
            <p className="text-green-800 text-sm mb-2">
              The unit circle is simply a circle with radius 1, centered at the point (0,0) on a coordinate plane. It's
              called "unit" because the radius is 1 unit long.
            </p>
            <p className="text-green-800 text-sm">
              <strong>Why is this important?</strong> Every point on this circle can be described using trigonometric
              functions, and every trigonometric function can be understood by looking at this circle.
            </p>
          </div>

          <UnitCircleVisualization angle={angle} onAngleChange={onAngleChange} />

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-900 mb-2">Understanding Radians vs Degrees</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-yellow-800 mb-1">Degrees</h5>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>• 360° = full circle</li>
                  <li>• 90° = quarter circle</li>
                  <li>• Based on ancient Babylonian system</li>
                  <li>• More intuitive for everyday use</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-yellow-800 mb-1">Radians</h5>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>• 2π ≈ 6.28 = full circle</li>
                  <li>• π/2 ≈ 1.57 = quarter circle</li>
                  <li>• Based on the circle's circumference</li>
                  <li>• More natural for mathematics</li>
                </ul>
              </div>
            </div>
            <div className="mt-3 p-2 bg-white rounded">
              <p className="text-sm text-yellow-800">
                <strong>Conversion:</strong> degrees × (π/180) = radians, or radians × (180/π) = degrees
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exercise 1: Angle Conversions</CardTitle>
          <CardDescription>Practice converting between degrees and radians</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <HelpCircle className="h-4 w-4" />
            <AlertTitle>How to Approach These Problems</AlertTitle>
            <AlertDescription>
              For conversions: multiply degrees by π/180 to get radians, or multiply radians by 180/π to get degrees.
              For special angles, try to recognize common patterns (30°, 45°, 60°, 90°).
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <p>Convert between degrees and radians:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 border rounded">
                <p className="text-sm mb-2">Convert 90° to radians:</p>
                <Input placeholder="Enter answer (use π if needed)" className="mb-2" />
                <p className="text-xs text-gray-600">Hint: 90° × (π/180) = ?</p>
                <p className="text-xs text-blue-600">Think: 90 is 1/4 of 360, so the answer should be 1/4 of 2π</p>
              </div>
              <div className="p-3 border rounded">
                <p className="text-sm mb-2">Convert π/3 radians to degrees:</p>
                <Input placeholder="Enter answer" className="mb-2" />
                <p className="text-xs text-gray-600">Hint: (π/3) × (180/π) = ?</p>
                <p className="text-xs text-blue-600">The π's cancel out, leaving you with 180/3</p>
              </div>
            </div>
            <Button variant="outline" className="bg-white text-black">
              Check Answers
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

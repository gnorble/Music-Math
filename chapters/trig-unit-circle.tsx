"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Circle, RotateCcw, Calculator, Lightbulb } from "lucide-react"
import { UnitCircleVisualization } from "@/components/unit-circle-visualization"
import { ExerciseCard } from "@/components/exercise-card"

interface TrigUnitCircleProps {
  onComplete: () => void
}

export default function TrigUnitCircle({ onComplete }: TrigUnitCircleProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [completedSections, setCompletedSections] = useState<number[]>([])
  const [angle, setAngle] = useState([0])
  const [degreeInput, setDegreeInput] = useState("0")

  const markSectionComplete = (sectionIndex: number) => {
    if (!completedSections.includes(sectionIndex)) {
      setCompletedSections([...completedSections, sectionIndex])
    }
    if (sectionIndex === 3) {
      // Last section
      onComplete()
    }
  }

  const handleAngleChange = (degrees: string) => {
    setDegreeInput(degrees)
    const deg = Number.parseFloat(degrees) || 0
    setAngle([deg])
  }

  const exercises = [
    {
      id: "degree-radian-conversion",
      question: "Convert 90° to radians:",
      type: "multiple-choice" as const,
      options: ["π/4 radians", "π/2 radians", "π radians", "2π radians"],
      correctAnswer: 1,
      explanation: "90° = π/2 radians. Since 180° = π radians, 90° is half of that: π/2 radians.",
      hint: "Remember that 180° = π radians. What's half of 180°?",
      musicalContext:
        "In audio synthesis, LFO rates are often specified in radians per second. A quarter-cycle vibrato would use π/2 radians.",
    },
    {
      id: "special-angle-coordinates",
      question: "What are the coordinates of the point at 45° on the unit circle?",
      type: "multiple-choice" as const,
      options: ["(1, 0)", "(0, 1)", "(√2/2, √2/2)", "(1/2, 1/2)"],
      correctAnswer: 2,
      explanation:
        "At 45°, both x and y coordinates are equal and equal to √2/2 ≈ 0.707. This creates the distinctive 45° angle where sine and cosine are equal.",
      hint: "At 45°, we're exactly halfway between the x and y axes. The coordinates should be equal.",
      musicalContext:
        "45° phase relationships create interesting stereo effects. When two identical signals are 45° out of phase, they create a subtle widening effect.",
    },
    {
      id: "complete-circle",
      question: "How many degrees are in a complete circle?",
      type: "multiple-choice" as const,
      options: ["180°", "270°", "360°", "450°"],
      correctAnswer: 2,
      explanation:
        "A complete circle is 360°, which equals 2π radians. This represents one full cycle of any periodic motion.",
      hint: "Think about how many degrees you turn when you make a complete rotation.",
      musicalContext:
        "In audio, one complete cycle of a sine wave represents 360° of phase. The frequency tells us how many complete cycles occur per second.",
    },
    {
      id: "lfo-cycle",
      question: "If an LFO (Low Frequency Oscillator) completes one full cycle in 2 seconds, what's its frequency?",
      type: "multiple-choice" as const,
      options: ["0.5 Hz", "1 Hz", "2 Hz", "4 Hz"],
      correctAnswer: 0,
      explanation:
        "Frequency = 1/period. If one cycle takes 2 seconds, then frequency = 1/2 = 0.5 Hz. This LFO would create a slow vibrato or tremolo effect.",
      hint: "Frequency is the reciprocal of period. If period = 2 seconds, what's 1/2?",
      musicalContext:
        "LFOs in synthesizers often run at very low frequencies (0.1 to 10 Hz) to create vibrato, tremolo, and filter sweeps that enhance musical expression.",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Introduction */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Circle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-2xl">The Unit Circle</CardTitle>
              <CardDescription className="text-lg">
                The foundation of all trigonometry and the key to understanding sound waves
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={currentSection.toString()} onValueChange={(value) => setCurrentSection(Number.parseInt(value))}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="0" className="text-xs">
            Unit Circle Basics
          </TabsTrigger>
          <TabsTrigger value="1" className="text-xs">
            Degrees vs Radians
          </TabsTrigger>
          <TabsTrigger value="2" className="text-xs">
            Interactive Explorer
          </TabsTrigger>
          <TabsTrigger value="3" className="text-xs">
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="0" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Circle className="w-5 h-5 mr-2" />
                What is the Unit Circle?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                The unit circle is a circle with radius 1, centered at the origin (0,0) of a coordinate system. It's the
                most important tool for understanding trigonometric functions and their relationship to music.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Key Properties:</h4>
                    <ul className="text-blue-800 space-y-1">
                      <li>• Radius = 1 unit</li>
                      <li>• Center at (0, 0)</li>
                      <li>• Circumference = 2π units</li>
                      <li>• Every point satisfies: x² + y² = 1</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Musical Connection:</h4>
                    <p className="text-green-800">
                      The unit circle represents one complete cycle of a sound wave. As we move around the circle, we
                      trace out the sine and cosine functions that create all the sounds we hear.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Coordinate System:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Right (0°):</span>
                      <span className="font-mono">(1, 0)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Top (90°):</span>
                      <span className="font-mono">(0, 1)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Left (180°):</span>
                      <span className="font-mono">(-1, 0)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bottom (270°):</span>
                      <span className="font-mono">(0, -1)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Why It Matters for Music:</h4>
                <p className="text-purple-800">
                  Every point on the unit circle corresponds to a moment in time in a sound wave. The x-coordinate gives
                  us the cosine value, the y-coordinate gives us the sine value, and together they describe the
                  amplitude and phase of any audio signal.
                </p>
              </div>

              <Button
                onClick={() => markSectionComplete(0)}
                className="w-full"
                disabled={completedSections.includes(0)}
              >
                {completedSections.includes(0) ? "✓ Section Complete" : "Mark Section Complete"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="1" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RotateCcw className="w-5 h-5 mr-2" />
                Degrees vs Radians
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                There are two main ways to measure angles: degrees and radians. Both are important in music technology.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3">Degrees</h4>
                  <ul className="text-blue-800 space-y-2">
                    <li>• Full circle = 360°</li>
                    <li>• Quarter circle = 90°</li>
                    <li>• Half circle = 180°</li>
                    <li>• Easy to visualize and understand</li>
                    <li>• Common in everyday use</li>
                  </ul>
                  <div className="mt-3 p-2 bg-white rounded border">
                    <strong>Musical Example:</strong> A stereo pan from left to right might sweep through 180°
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3">Radians</h4>
                  <ul className="text-green-800 space-y-2">
                    <li>• Full circle = 2π radians</li>
                    <li>• Quarter circle = π/2 radians</li>
                    <li>• Half circle = π radians</li>
                    <li>• Natural for mathematical calculations</li>
                    <li>• Used in programming and DSP</li>
                  </ul>
                  <div className="mt-3 p-2 bg-white rounded border">
                    <strong>Musical Example:</strong> LFO frequencies are often calculated in radians per second
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Conversion Formulas:</h4>
                <div className="space-y-2 font-mono text-sm">
                  <div>
                    Degrees to Radians: <strong>radians = degrees × (π/180)</strong>
                  </div>
                  <div>
                    Radians to Degrees: <strong>degrees = radians × (180/π)</strong>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">Common Angles:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold mb-2">Degrees → Radians</div>
                    <div>0° → 0</div>
                    <div>30° → π/6</div>
                    <div>45° → π/4</div>
                    <div>60° → π/3</div>
                    <div>90° → π/2</div>
                    <div>180° → π</div>
                    <div>360° → 2π</div>
                  </div>
                  <div>
                    <div className="font-semibold mb-2">Musical Context</div>
                    <div>Start of cycle</div>
                    <div>1/12 of cycle</div>
                    <div>1/8 of cycle</div>
                    <div>1/6 of cycle</div>
                    <div>1/4 of cycle</div>
                    <div>1/2 of cycle</div>
                    <div>Full cycle</div>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => markSectionComplete(1)}
                className="w-full"
                disabled={completedSections.includes(1)}
              >
                {completedSections.includes(1) ? "✓ Section Complete" : "Mark Section Complete"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="2" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="w-5 h-5 mr-2" />
                Interactive Unit Circle Explorer
              </CardTitle>
              <CardDescription>Explore how angles relate to coordinates and sound waves</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="angle-input">Angle (degrees)</Label>
                    <Input
                      id="angle-input"
                      type="number"
                      value={degreeInput}
                      onChange={(e) => handleAngleChange(e.target.value)}
                      placeholder="Enter angle in degrees"
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button onClick={() => handleAngleChange("0")} variant="outline" size="sm">
                      0°
                    </Button>
                    <Button onClick={() => handleAngleChange("30")} variant="outline" size="sm">
                      30°
                    </Button>
                    <Button onClick={() => handleAngleChange("45")} variant="outline" size="sm">
                      45°
                    </Button>
                    <Button onClick={() => handleAngleChange("60")} variant="outline" size="sm">
                      60°
                    </Button>
                    <Button onClick={() => handleAngleChange("90")} variant="outline" size="sm">
                      90°
                    </Button>
                    <Button onClick={() => handleAngleChange("180")} variant="outline" size="sm">
                      180°
                    </Button>
                    <Button onClick={() => handleAngleChange("270")} variant="outline" size="sm">
                      270°
                    </Button>
                    <Button onClick={() => handleAngleChange("360")} variant="outline" size="sm">
                      360°
                    </Button>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Current Values:</h4>
                    <div className="space-y-1 text-sm font-mono">
                      <div>Angle: {angle[0]}°</div>
                      <div>Radians: {((angle[0] * Math.PI) / 180).toFixed(3)}</div>
                      <div>
                        cos({angle[0]}°) = {Math.cos((angle[0] * Math.PI) / 180).toFixed(3)}
                      </div>
                      <div>
                        sin({angle[0]}°) = {Math.sin((angle[0] * Math.PI) / 180).toFixed(3)}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <UnitCircleVisualization angle={angle} />
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">What You're Seeing:</h4>
                <ul className="text-blue-800 space-y-1">
                  <li>• The red dot shows your current angle position</li>
                  <li>• The x-coordinate equals cos(angle)</li>
                  <li>• The y-coordinate equals sin(angle)</li>
                  <li>• As the angle increases, you trace out a sine wave</li>
                  <li>• One complete rotation (360°) = one complete sound wave cycle</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Musical Insight:</h4>
                <p className="text-green-800">
                  Imagine the red dot as a speaker cone moving back and forth. As it rotates around the circle, the
                  y-coordinate (sine value) represents the cone's position over time. This creates the air pressure
                  waves that we hear as sound!
                </p>
              </div>

              <Button
                onClick={() => markSectionComplete(2)}
                className="w-full"
                disabled={completedSections.includes(2)}
              >
                {completedSections.includes(2) ? "✓ Section Complete" : "Mark Section Complete"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="3" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Practice Exercises
              </CardTitle>
              <CardDescription>Test your understanding of the unit circle and angle measurements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {exercises.map((exercise, index) => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    onComplete={() => {
                      if (index === exercises.length - 1) {
                        markSectionComplete(3)
                      }
                    }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Progress indicator */}
      <div className="flex justify-center space-x-2">
        {[0, 1, 2, 3].map((section) => (
          <div
            key={section}
            className={`w-3 h-3 rounded-full ${completedSections.includes(section) ? "bg-green-500" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  )
}

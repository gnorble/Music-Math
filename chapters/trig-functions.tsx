"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TrendingUp, Waves, Calculator, Lightbulb, BookOpen, Target } from "lucide-react"
import { ExerciseCard } from "@/components/exercise-card"
import { TopicResourcesBar } from "@/components/topic-resources-bar"

interface TrigFunctionsProps {
  onComplete: () => void
}

export default function TrigFunctions({ onComplete }: TrigFunctionsProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [completedSections, setCompletedSections] = useState<number[]>([])

  const markSectionComplete = (sectionIndex: number) => {
    if (!completedSections.includes(sectionIndex)) {
      setCompletedSections([...completedSections, sectionIndex])
    }
    if (sectionIndex === 4) {
      // Last section
      onComplete()
    }
  }

  const exercises = [
    {
      id: "special-angles-1",
      question: "What is sin(30°)?",
      type: "multiple-choice" as const,
      options: ["1/2", "√2/2", "√3/2", "1"],
      correctAnswer: "1/2",
      explanation:
        "sin(30°) = 1/2. This is one of the fundamental special angle values. In a 30-60-90 triangle, the side opposite to 30° is half the length of the hypotenuse.",
      hint: "Think about the 30-60-90 triangle. The side opposite to 30° is half the hypotenuse.",
      musicalContext:
        "30° phase shifts are sometimes used in stereo widening effects to create subtle spatial enhancement without causing phase cancellation.",
      difficulty: "easy" as const,
    },
    {
      id: "pythagorean-identity-1",
      question: "If sin(θ) = 3/5, what is cos(θ)? (assuming θ is in the first quadrant)",
      type: "multiple-choice" as const,
      options: ["3/5", "4/5", "5/3", "5/4"],
      correctAnswer: "4/5",
      explanation:
        "Using the Pythagorean identity: sin²(θ) + cos²(θ) = 1. If sin(θ) = 3/5, then cos²(θ) = 1 - (3/5)² = 1 - 9/25 = 16/25, so cos(θ) = 4/5 (positive in first quadrant).",
      hint: "Use the fundamental identity: sin²(θ) + cos²(θ) = 1",
      musicalContext:
        "This relationship ensures that the total 'energy' of a sine wave remains constant as it oscillates, which is crucial for maintaining consistent audio levels.",
      difficulty: "medium" as const,
    },
    {
      id: "tangent-calculation-1",
      question: "What is tan(45°)?",
      type: "multiple-choice" as const,
      options: ["0", "1/2", "1", "√2"],
      correctAnswer: "1",
      explanation:
        "tan(45°) = 1. At 45°, sine and cosine are equal (both √2/2), so tan(45°) = sin(45°)/cos(45°) = (√2/2)/(√2/2) = 1.",
      hint: "At 45°, we're exactly halfway between horizontal and vertical. What's the slope of a 45° line?",
      musicalContext:
        "A 45° angle represents equal horizontal and vertical components, often used in stereo panning algorithms for balanced left-right distribution.",
      difficulty: "easy" as const,
    },
    {
      id: "reciprocal-function-1",
      question: "What is csc(60°)?",
      type: "multiple-choice" as const,
      options: ["1/2", "√3/2", "2/√3", "2"],
      correctAnswer: "2/√3",
      explanation:
        "csc(60°) = 1/sin(60°). Since sin(60°) = √3/2, we have csc(60°) = 1/(√3/2) = 2/√3. We can rationalize this as 2√3/3.",
      hint: "Remember that csc(θ) = 1/sin(θ). First find sin(60°), then take its reciprocal.",
      musicalContext:
        "Reciprocal functions appear in advanced audio filter design, particularly in calculating response curves.",
      difficulty: "medium" as const,
    },
    {
      id: "sum-identity-1",
      question: "Using the sum identity, what is sin(75°)?",
      type: "multiple-choice" as const,
      options: ["(√6 + √2)/4", "(√6 - √2)/4", "(√3 + 1)/2", "(√3 - 1)/2"],
      correctAnswer: "(√6 + √2)/4",
      explanation:
        "sin(75°) = sin(45° + 30°) = sin(45°)cos(30°) + cos(45°)sin(30°) = (√2/2)(√3/2) + (√2/2)(1/2) = √6/4 + √2/4 = (√6 + √2)/4.",
      hint: "Use sin(A + B) = sin(A)cos(B) + cos(A)sin(B). Try 75° = 45° + 30°.",
      musicalContext:
        "Sum identities are used in frequency modulation synthesis to calculate the spectrum of complex waveforms.",
      difficulty: "hard" as const,
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Topic Resources Bar */}
      <TopicResourcesBar chapterId="trig-functions" />

      {/* Introduction */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Waves className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-2xl">Trigonometric Functions</CardTitle>
              <CardDescription className="text-lg">
                Sine, cosine, and tangent - the building blocks of all sound
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={currentSection.toString()} onValueChange={(value) => setCurrentSection(Number.parseInt(value))}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="0" className="text-xs">
            The Big Three
          </TabsTrigger>
          <TabsTrigger value="1" className="text-xs">
            Special Angles
          </TabsTrigger>
          <TabsTrigger value="2" className="text-xs">
            Identities
          </TabsTrigger>
          <TabsTrigger value="3" className="text-xs">
            Musical Applications
          </TabsTrigger>
          <TabsTrigger value="4" className="text-xs">
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="0" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                The Three Primary Functions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                There are three fundamental trigonometric functions that form the basis of all audio and music
                mathematics: sine, cosine, and tangent.
              </p>

              <div className="grid gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-xl text-blue-900">Sine (sin)</h4>
                    <Badge variant="secondary">Most Important for Audio</Badge>
                  </div>
                  <p className="text-blue-800 mb-3">
                    The sine function represents the y-coordinate of a point moving around the unit circle. It creates
                    the smooth, wave-like pattern that is the foundation of all sound.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">sin(θ) = opposite / hypotenuse = y-coordinate on unit circle</code>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <strong>Musical Application:</strong> Pure tones are sine waves. A 440Hz A note is literally sin(2π
                    × 440 × time).
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-xl text-green-900">Cosine (cos)</h4>
                    <Badge variant="secondary">Phase Relationships</Badge>
                  </div>
                  <p className="text-green-800 mb-3">
                    The cosine function represents the x-coordinate of a point moving around the unit circle. It's
                    identical to sine, but shifted by 90° (π/2 radians).
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">cos(θ) = adjacent / hypotenuse = x-coordinate on unit circle</code>
                  </div>
                  <div className="bg-green-100 p-3 rounded">
                    <strong>Musical Application:</strong> Used in stereo panning, phase relationships, and creating
                    complex waveforms when combined with sine.
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-xl text-purple-900">Tangent (tan)</h4>
                    <Badge variant="secondary">Slopes & Ratios</Badge>
                  </div>
                  <p className="text-purple-800 mb-3">
                    The tangent function represents the slope of the line from the origin to a point on the unit circle.
                    It's the ratio of sine to cosine.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">tan(θ) = opposite / adjacent = sin(θ) / cos(θ)</code>
                  </div>
                  <div className="bg-purple-100 p-3 rounded">
                    <strong>Musical Application:</strong> Used in filter design, distortion algorithms, and calculating
                    frequency ratios.
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Key Relationships:</h4>
                <ul className="text-yellow-800 space-y-1">
                  <li>• cos(θ) = sin(θ + 90°) - Cosine is sine shifted by 90°</li>
                  <li>• sin²(θ) + cos²(θ) = 1 - The Pythagorean identity</li>
                  <li>• tan(θ) = sin(θ) / cos(θ) - Tangent is the ratio of sine to cosine</li>
                  <li>• All three functions repeat every 360° (2π radians)</li>
                </ul>
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
                <Calculator className="w-5 h-5 mr-2" />
                Special Angles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Certain angles have exact trigonometric values that appear frequently in music and audio processing.
                These "special angles" are worth memorizing.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 p-3 text-left">Angle (Degrees)</th>
                      <th className="border border-gray-300 p-3 text-left">Angle (Radians)</th>
                      <th className="border border-gray-300 p-3 text-left">sin(θ)</th>
                      <th className="border border-gray-300 p-3 text-left">cos(θ)</th>
                      <th className="border border-gray-300 p-3 text-left">tan(θ)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3">0°</td>
                      <td className="border border-gray-300 p-3">0</td>
                      <td className="border border-gray-300 p-3">0</td>
                      <td className="border border-gray-300 p-3">1</td>
                      <td className="border border-gray-300 p-3">0</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-3">30°</td>
                      <td className="border border-gray-300 p-3">π/6</td>
                      <td className="border border-gray-300 p-3">1/2</td>
                      <td className="border border-gray-300 p-3">√3/2</td>
                      <td className="border border-gray-300 p-3">1/√3</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">45°</td>
                      <td className="border border-gray-300 p-3">π/4</td>
                      <td className="border border-gray-300 p-3">√2/2</td>
                      <td className="border border-gray-300 p-3">√2/2</td>
                      <td className="border border-gray-300 p-3">1</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-3">60°</td>
                      <td className="border border-gray-300 p-3">π/3</td>
                      <td className="border border-gray-300 p-3">√3/2</td>
                      <td className="border border-gray-300 p-3">1/2</td>
                      <td className="border border-gray-300 p-3">√3</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">90°</td>
                      <td className="border border-gray-300 p-3">π/2</td>
                      <td className="border border-gray-300 p-3">1</td>
                      <td className="border border-gray-300 p-3">0</td>
                      <td className="border border-gray-300 p-3">undefined</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Memory Tips:</h4>
                  <ul className="text-blue-800 space-y-1 text-sm">
                    <li>• 0°: Everything starts at zero (sin=0, cos=1)</li>
                    <li>• 30°: sin = 1/2 (half), cos = √3/2 (most)</li>
                    <li>• 45°: sin = cos = √2/2 (equal)</li>
                    <li>• 60°: sin = √3/2 (most), cos = 1/2 (half)</li>
                    <li>• 90°: sin = 1 (max), cos = 0 (zero)</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Musical Contexts:</h4>
                  <ul className="text-green-800 space-y-1 text-sm">
                    <li>• 0°: Start of waveform cycle</li>
                    <li>• 30°: Subtle phase shifts in effects</li>
                    <li>• 45°: Balanced stereo panning</li>
                    <li>• 60°: Harmonic relationships</li>
                    <li>• 90°: Quadrature (I/Q) signals</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Pattern Recognition:</h4>
                <p className="text-purple-800 text-sm">
                  Notice that sin(30°) = cos(60°) and sin(60°) = cos(30°). This is because these angles are
                  complementary (they add up to 90°). In general: sin(θ) = cos(90° - θ). This relationship is
                  fundamental in audio processing where we often work with quadrature signals.
                </p>
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
              <CardTitle>Fundamental Identities</CardTitle>
              <CardDescription>
                Essential relationships that are always true - the mathematical tools for simplifying and solving
                trigonometric problems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Trigonometric identities are equations that are always true, regardless of the angle value. They're like
                mathematical shortcuts that help us solve complex problems and understand deeper relationships.
              </p>

              <div className="space-y-8">
                {/* Pythagorean Identity */}
                <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-400">
                  <h4 className="font-semibold text-xl text-red-900 mb-3">1. Pythagorean Identity</h4>
                  <div className="bg-white p-4 rounded border mb-4 text-center">
                    <code className="text-lg font-bold">sin²(θ) + cos²(θ) = 1</code>
                  </div>
                  <p className="text-red-800 mb-3">
                    This comes directly from the Pythagorean theorem applied to the unit circle. Since any point on the
                    unit circle satisfies x² + y² = 1, and sin(θ) = y and cos(θ) = x, we get this fundamental
                    relationship.
                  </p>
                  <div className="bg-red-100 p-3 rounded mb-3">
                    <strong>How to use it:</strong> If you know sin(θ), you can find cos(θ) by rearranging: cos²(θ) = 1
                    - sin²(θ), so cos(θ) = ±√(1 - sin²(θ))
                  </div>
                  <div className="bg-red-100 p-3 rounded">
                    <strong>Musical Application:</strong> Ensures constant power in audio panning - the total "energy"
                    remains the same as sound moves across the stereo field.
                  </div>
                </div>

                {/* Reciprocal Identities */}
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-semibold text-xl text-blue-900 mb-3">2. Reciprocal Identities</h4>

                  {/* Definition Box */}
                  <div className="bg-blue-100 p-4 rounded-lg mb-4 border border-blue-300">
                    <h5 className="font-semibold text-blue-900 mb-2">📚 What are Reciprocal Functions?</h5>
                    <p className="text-blue-800 text-sm mb-3">
                      Reciprocal functions are "flipped" versions of the basic trig functions - just like 1/2 is the
                      reciprocal of 2:
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="bg-white p-2 rounded">
                        <strong>Cosecant (csc):</strong> "co-secant" - the reciprocal of sine
                      </div>
                      <div className="bg-white p-2 rounded">
                        <strong>Secant (sec):</strong> From Latin "secare" (to cut) - the reciprocal of cosine
                      </div>
                      <div className="bg-white p-2 rounded">
                        <strong>Cotangent (cot):</strong> "co-tangent" - the reciprocal of tangent
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded border mb-4">
                    <div className="space-y-2 text-center">
                      <div>
                        <code className="text-lg">csc(θ) = 1/sin(θ)</code>{" "}
                        <span className="text-sm text-gray-600">(cosecant)</span>
                      </div>
                      <div>
                        <code className="text-lg">sec(θ) = 1/cos(θ)</code>{" "}
                        <span className="text-sm text-gray-600">(secant)</span>
                      </div>
                      <div>
                        <code className="text-lg">cot(θ) = 1/tan(θ)</code>{" "}
                        <span className="text-sm text-gray-600">(cotangent)</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-blue-800 mb-3">
                    <strong>Important:</strong> These functions are undefined when their corresponding basic function
                    equals zero. For example, csc(0°) is undefined because sin(0°) = 0, and you can't divide by zero.
                  </p>
                  <div className="bg-blue-100 p-3 rounded">
                    <strong>Musical Application:</strong> Used in advanced filter design and reverb algorithms where
                    extreme response curves are needed.
                  </div>
                </div>

                {/* Quotient Identities */}
                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
                  <h4 className="font-semibold text-xl text-green-900 mb-3">3. Quotient Identities</h4>
                  <div className="bg-white p-4 rounded border mb-4">
                    <div className="space-y-2 text-center">
                      <div>
                        <code className="text-lg">tan(θ) = sin(θ)/cos(θ)</code>
                      </div>
                      <div>
                        <code className="text-lg">cot(θ) = cos(θ)/sin(θ)</code>
                      </div>
                    </div>
                  </div>
                  <p className="text-green-800 mb-3">
                    These show that tangent and cotangent are just ratios of the basic functions. This is why tan(45°) =
                    1 - because sin(45°) = cos(45°), so their ratio equals 1.
                  </p>
                  <div className="bg-green-100 p-3 rounded mb-3">
                    <strong>How to use it:</strong> If you know sin(θ) and cos(θ), you can immediately find tan(θ) by
                    dividing. No need to memorize separate values!
                  </div>
                  <div className="bg-green-100 p-3 rounded">
                    <strong>Musical Application:</strong> Used for calculating frequency ratios, filter slopes, and in
                    waveshaping distortion algorithms.
                  </div>
                </div>

                {/* Sum and Difference Identities */}
                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
                  <h4 className="font-semibold text-xl text-purple-900 mb-3">4. Sum and Difference Identities</h4>
                  <div className="bg-white p-4 rounded border mb-4">
                    <div className="space-y-2 text-center text-sm">
                      <div>
                        <code>sin(A + B) = sin(A)cos(B) + cos(A)sin(B)</code>
                      </div>
                      <div>
                        <code>sin(A - B) = sin(A)cos(B) - cos(A)sin(B)</code>
                      </div>
                      <div>
                        <code>cos(A + B) = cos(A)cos(B) - sin(A)sin(B)</code>
                      </div>
                      <div>
                        <code>cos(A - B) = cos(A)cos(B) + sin(A)sin(B)</code>
                      </div>
                    </div>
                  </div>
                  <p className="text-purple-800 mb-3">
                    These let you find exact values for "non-standard" angles. For example, sin(75°) = sin(45° + 30°),
                    which you can calculate using the special angles you already know.
                  </p>
                  <div className="bg-purple-100 p-3 rounded mb-3">
                    <strong>Memory tip:</strong> For sine, the signs are the same (+ becomes +, - becomes -). For
                    cosine, the signs flip (+ becomes -, - becomes +).
                  </div>
                  <div className="bg-purple-100 p-3 rounded">
                    <strong>Musical Application:</strong> Essential for frequency modulation (FM) synthesis, where
                    complex waveforms are created by adding and subtracting sine waves at different frequencies.
                  </div>
                </div>

                {/* Co-function Identities */}
                <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400">
                  <h4 className="font-semibold text-xl text-orange-900 mb-3">5. Co-function Identities</h4>
                  <div className="bg-white p-4 rounded border mb-4">
                    <div className="space-y-2 text-center">
                      <div>
                        <code>sin(θ) = cos(90° - θ)</code>
                      </div>
                      <div>
                        <code>cos(θ) = sin(90° - θ)</code>
                      </div>
                      <div>
                        <code>tan(θ) = cot(90° - θ)</code>
                      </div>
                    </div>
                  </div>
                  <p className="text-orange-800 mb-3">
                    These show that sine and cosine are related by a 90° shift. Any function equals its "co-function" of
                    the complementary angle (angles that add to 90°).
                  </p>
                  <div className="bg-orange-100 p-3 rounded">
                    <strong>Musical Application:</strong> Fundamental to quadrature signals in digital audio, where I
                    and Q components are 90° out of phase for complex signal processing.
                  </div>
                </div>
              </div>

              <Alert>
                <BookOpen className="h-4 w-4" />
                <AlertDescription>
                  <strong>Study Strategy:</strong> Don't try to memorize all these at once! Start with the Pythagorean
                  identity and quotient identities. Once those feel natural, add the sum/difference identities. The
                  reciprocal and co-function identities will make sense as you see them used in problems.
                </AlertDescription>
              </Alert>

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
                <Waves className="w-5 h-5 mr-2" />
                Musical Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Let's explore how sine, cosine, and tangent functions are used in real musical applications.
              </p>

              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-blue-900 mb-4">🎵 Sound Wave Generation</h4>
                  <p className="text-blue-800 mb-3">
                    Every pure tone is a sine wave. When you press a key on a digital piano or synthesizer, the computer
                    generates a sine wave at the corresponding frequency.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      A440 = sin(2π × 440 × time)
                      <br />
                      C261 = sin(2π × 261.63 × time)
                    </code>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <strong>Real Example:</strong> In software like Ableton Live or Logic Pro, the built-in sine wave
                    oscillator literally calculates sin(2πft) thousands of times per second to create audio.
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-green-900 mb-4">🎛️ Stereo Panning</h4>
                  <p className="text-green-800 mb-3">
                    Professional audio uses trigonometric functions for smooth, constant-power panning that maintains
                    perceived loudness as sound moves across the stereo field.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      Left Channel = cos(pan_angle) × audio_signal
                      <br />
                      Right Channel = sin(pan_angle) × audio_signal
                    </code>
                  </div>
                  <div className="bg-green-100 p-3 rounded">
                    <strong>Real Example:</strong> When you turn a pan knob in your DAW, it's calculating these
                    trigonometric values to determine how much signal goes to each speaker.
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-purple-900 mb-4">🌊 LFO Modulation</h4>
                  <p className="text-purple-800 mb-3">
                    Low Frequency Oscillators (LFOs) use sine and cosine waves to create vibrato, tremolo, and other
                    modulation effects that add expression to music.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      Vibrato = base_frequency + sin(lfo_rate × time) × vibrato_depth
                      <br />
                      Tremolo = amplitude × (1 + sin(lfo_rate × time) × tremolo_depth)
                    </code>
                  </div>
                  <div className="bg-purple-100 p-3 rounded">
                    <strong>Real Example:</strong> The vibrato on a guitar amp or the tremolo on a Rhodes piano uses
                    these exact mathematical relationships.
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-red-900 mb-4">🎚️ Filter Design</h4>
                  <p className="text-red-800 mb-3">
                    Audio filters (EQ, high-pass, low-pass) use trigonometric functions to determine which frequencies
                    to boost, cut, or leave unchanged.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">Filter Response = 1 / (1 + tan²(π × frequency / sample_rate))</code>
                  </div>
                  <div className="bg-red-100 p-3 rounded">
                    <strong>Real Example:</strong> Every EQ band in your mixing console uses these calculations to shape
                    the frequency response of your audio.
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-orange-900 mb-4">🎼 Harmonic Analysis</h4>
                  <p className="text-orange-800 mb-3">
                    Complex musical sounds can be broken down into their component sine waves using Fourier analysis,
                    which is built entirely on trigonometric functions.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">Complex_Sound = Σ [A_n × sin(n × fundamental_freq × time + φ_n)]</code>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <strong>Real Example:</strong> Spectrum analyzers in your DAW show this breakdown visually,
                    displaying how much of each frequency (sine wave) is present in your audio.
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">The Big Picture:</h4>
                <p className="text-yellow-800">
                  Every aspect of modern music production - from the initial sound generation to the final mastering -
                  relies on trigonometric functions. Understanding these concepts helps you make more informed decisions
                  about sound design, mixing, and audio processing.
                </p>
              </div>

              <Button
                onClick={() => markSectionComplete(3)}
                className="w-full"
                disabled={completedSections.includes(3)}
              >
                {completedSections.includes(3) ? "✓ Section Complete" : "Mark Section Complete"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="4" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Practice Exercises
              </CardTitle>
              <CardDescription>
                Test your understanding of trigonometric functions and their musical applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Problem-Solving Guide */}
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-3">
                    <h4 className="font-semibold">🎯 Step-by-Step Problem Solving Guide</h4>
                    <p className="text-sm">Since you're new to trigonometry, here's how to approach these problems:</p>

                    <div className="space-y-2 text-sm">
                      <div className="bg-blue-50 p-2 rounded">
                        <strong>Step 1: Identify what you're looking for</strong> - What function? What angle?
                      </div>
                      <div className="bg-green-50 p-2 rounded">
                        <strong>Step 2: Check if it's a special angle</strong> - Is it 0°, 30°, 45°, 60°, or 90°?
                      </div>
                      <div className="bg-yellow-50 p-2 rounded">
                        <strong>Step 3: Use identities if needed</strong> - Can you use sin²+cos²=1 or tan=sin/cos?
                      </div>
                      <div className="bg-purple-50 p-2 rounded">
                        <strong>Step 4: Check your answer</strong> - Does it make sense? Is it in the right range?
                      </div>
                    </div>

                    <p className="text-sm font-medium">💡 Remember: sin and cos are always between -1 and 1!</p>
                  </div>
                </AlertDescription>
              </Alert>

              <div className="space-y-6">
                {exercises.map((exercise, index) => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    onComplete={() => {
                      if (index === exercises.length - 1) {
                        markSectionComplete(4)
                      }
                    }}
                  />
                ))}
              </div>

              {/* Additional Practice Tips */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="text-lg">🚀 Next Steps for Practice</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>
                      • <strong>Master the special angles</strong> - They appear in 80% of problems
                    </p>
                    <p>
                      • <strong>Practice the Pythagorean identity</strong> - Use it to find missing values
                    </p>
                    <p>
                      • <strong>Draw pictures</strong> - Sketch triangles or the unit circle to visualize
                    </p>
                    <p>
                      • <strong>Check your calculator</strong> - Make sure it's in the right mode (degrees vs radians)
                    </p>
                    <p>
                      • <strong>Connect to music</strong> - Think about how each concept relates to sound and audio
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Progress indicator */}
      <div className="flex justify-center space-x-2">
        {[0, 1, 2, 3, 4].map((section) => (
          <div
            key={section}
            className={`w-3 h-3 rounded-full ${completedSections.includes(section) ? "bg-green-500" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  )
}

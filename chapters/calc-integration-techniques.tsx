"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExerciseCard } from "@/components/exercise-card"
import { Calculator, Music, Zap, Settings } from "lucide-react"

interface CalcIntegrationTechniquesProps {
  onComplete: () => void
}

export default function CalcIntegrationTechniques({ onComplete }: CalcIntegrationTechniquesProps) {
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set())

  const handleExerciseComplete = (exerciseId: number) => {
    setCompletedExercises((prev) => new Set([...prev, exerciseId]))
  }

  const allExercisesCompleted = completedExercises.size >= 4

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <Badge variant="secondary" className="mb-2">
          <Calculator className="w-4 h-4 mr-2" />
          Calculus Chapter 7
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900">Integration Techniques</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Master advanced integration methods including integration by parts, trigonometric substitution, and partial
          fractions to solve complex audio processing integrals.
        </p>
      </div>

      <Tabs defaultValue="by-parts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="by-parts">Integration by Parts</TabsTrigger>
          <TabsTrigger value="trig-sub">Trigonometric Substitution</TabsTrigger>
          <TabsTrigger value="partial-fractions">Partial Fractions</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
        </TabsList>

        <TabsContent value="by-parts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-500" />
                Integration by Parts
              </CardTitle>
              <CardDescription>The product rule in reverse for integration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Integration by Parts Formula</h4>
                <p className="text-blue-800 mb-2 font-mono">∫u dv = uv - ∫v du</p>
                <p className="text-blue-700 text-sm">
                  Choose u and dv such that ∫v du is easier to integrate than the original integral.
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">LIATE Rule for Choosing u</h4>
                <p className="text-yellow-800 mb-2">Priority order for selecting u:</p>
                <ol className="text-yellow-800 text-sm space-y-1">
                  <li>
                    <strong>L</strong>ogarithmic functions (ln x, log x)
                  </li>
                  <li>
                    <strong>I</strong>nverse trig functions (arcsin x, arctan x)
                  </li>
                  <li>
                    <strong>A</strong>lgebraic functions (x², x³, polynomials)
                  </li>
                  <li>
                    <strong>T</strong>rigonometric functions (sin x, cos x)
                  </li>
                  <li>
                    <strong>E</strong>xponential functions (eˣ, aˣ)
                  </li>
                </ol>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Example 1: ∫x eˣ dx</h4>
                  <div className="text-green-800 text-sm space-y-1">
                    <p>Let u = x, dv = eˣ dx</p>
                    <p>Then du = dx, v = eˣ</p>
                    <p>∫x eˣ dx = x eˣ - ∫eˣ dx</p>
                    <p>= x eˣ - eˣ + C = eˣ(x - 1) + C</p>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Example 2: ∫ln x dx</h4>
                  <div className="text-purple-800 text-sm space-y-1">
                    <p>Let u = ln x, dv = dx</p>
                    <p>Then du = (1/x) dx, v = x</p>
                    <p>∫ln x dx = x ln x - ∫x · (1/x) dx</p>
                    <p>= x ln x - ∫1 dx = x ln x - x + C</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">Audio Application: Envelope with Exponential Decay</h4>
                <p className="text-red-800 mb-2">
                  For an envelope function e(t) = t·e^(-t/τ), the total envelope area is:
                </p>
                <p className="text-red-800 font-mono text-sm mb-2">∫[0 to ∞] t·e^(-t/τ) dt</p>
                <p className="text-red-700 text-sm">
                  Using integration by parts: u = t, dv = e^(-t/τ) dt gives us τ² as the result.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Repeated Integration by Parts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-900 mb-2">When to Use Multiple Times</h4>
                <p className="text-indigo-800 mb-2">
                  Some integrals require integration by parts multiple times, especially with polynomials times
                  exponentials or trig functions.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Example: ∫x² eˣ dx</h4>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>First application:</strong> u = x², dv = eˣ dx
                  </p>
                  <p>∫x² eˣ dx = x² eˣ - ∫2x eˣ dx</p>
                  <p>
                    <strong>Second application:</strong> u = 2x, dv = eˣ dx
                  </p>
                  <p>∫2x eˣ dx = 2x eˣ - ∫2 eˣ dx = 2x eˣ - 2eˣ</p>
                  <p>
                    <strong>Final result:</strong> x² eˣ - 2x eˣ + 2eˣ + C = eˣ(x² - 2x + 2) + C
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trig-sub" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-500" />
                Trigonometric Substitution
              </CardTitle>
              <CardDescription>Using trig identities to simplify radical expressions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Three Main Cases</h4>
                <div className="grid md:grid-cols-3 gap-4 mt-3">
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-semibold text-sm mb-1">√(a² - x²)</h5>
                    <p className="text-xs">x = a sin θ</p>
                    <p className="text-xs">dx = a cos θ dθ</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-semibold text-sm mb-1">√(a² + x²)</h5>
                    <p className="text-xs">x = a tan θ</p>
                    <p className="text-xs">dx = a sec² θ dθ</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-semibold text-sm mb-1">√(x² - a²)</h5>
                    <p className="text-xs">x = a sec θ</p>
                    <p className="text-xs">dx = a sec θ tan θ dθ</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Example: ∫√(4 - x²) dx</h4>
                <div className="text-blue-800 text-sm space-y-1">
                  <p>Since we have √(4 - x²) = √(2² - x²), use x = 2 sin θ</p>
                  <p>dx = 2 cos θ dθ, and √(4 - x²) = √(4 - 4sin²θ) = 2 cos θ</p>
                  <p>∫√(4 - x²) dx = ∫2 cos θ · 2 cos θ dθ = 4∫cos² θ dθ</p>
                  <p>= 4∫(1 + cos 2θ)/2 dθ = 2θ + sin 2θ + C</p>
                  <p>= 2 arcsin(x/2) + x√(4 - x²)/2 + C</p>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Audio Application: Circular Motion</h4>
                <p className="text-purple-800 mb-2">
                  In audio synthesis, circular motion creates sinusoidal oscillations. The arc length integral:
                </p>
                <p className="text-purple-800 font-mono text-sm">s = ∫√(1 + (dy/dx)²) dx</p>
                <p className="text-purple-700 text-sm mt-2">
                  For a circle x² + y² = r², this becomes ∫√(r² - x²) dx, solved using trig substitution.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Completing the Square</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">When Expressions Don't Match Standard Forms</h4>
                <p className="text-orange-800 mb-2">
                  Sometimes we need to complete the square first to get a standard form for trig substitution.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Example: ∫1/√(x² + 4x + 8) dx</h4>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Step 1:</strong> Complete the square: x² + 4x + 8 = (x + 2)² + 4
                  </p>
                  <p>
                    <strong>Step 2:</strong> Let u = x + 2, then du = dx
                  </p>
                  <p>
                    <strong>Step 3:</strong> ∫1/√(u² + 4) du
                  </p>
                  <p>
                    <strong>Step 4:</strong> Use u = 2 tan θ substitution
                  </p>
                  <p>
                    <strong>Result:</strong> ln|u + √(u² + 4)| + C = ln|(x + 2) + √(x² + 4x + 8)| + C
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partial-fractions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="w-5 h-5 text-purple-500" />
                Partial Fraction Decomposition
              </CardTitle>
              <CardDescription>Breaking rational functions into simpler fractions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">When to Use Partial Fractions</h4>
                <p className="text-purple-800 mb-2">Use when integrating rational functions P(x)/Q(x) where:</p>
                <ul className="text-purple-800 text-sm space-y-1 list-disc list-inside">
                  <li>Degree of P(x) {"<"} Degree of Q(x)</li>
                  <li>Q(x) can be factored into linear and/or quadratic factors</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Linear Factors</h4>
                  <p className="text-blue-800 text-sm mb-2">For (x - a)(x - b):</p>
                  <p className="text-blue-800 font-mono text-sm">A/(x - a) + B/(x - b)</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibent text-green-900 mb-2">Repeated Linear Factors</h4>
                  <p className="text-green-800 text-sm mb-2">For (x - a)²:</p>
                  <p className="text-green-800 font-mono text-sm">A/(x - a) + B/(x - a)²</p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">Quadratic Factors</h4>
                  <p className="text-orange-800 text-sm mb-2">For (ax² + bx + c):</p>
                  <p className="text-orange-800 font-mono text-sm">(Ax + B)/(ax² + bx + c)</p>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">Repeated Quadratic</h4>
                  <p className="text-red-800 text-sm mb-2">For (ax² + bx + c)²:</p>
                  <p className="text-red-800 font-mono text-sm">(Ax + B)/(ax² + bx + c) + (Cx + D)/(ax² + bx + c)²</p>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Example: ∫(2x + 1)/((x - 1)(x + 2)) dx</h4>
                <div className="text-yellow-800 text-sm space-y-1">
                  <p>
                    <strong>Step 1:</strong> (2x + 1)/((x - 1)(x + 2)) = A/(x - 1) + B/(x + 2)
                  </p>
                  <p>
                    <strong>Step 2:</strong> 2x + 1 = A(x + 2) + B(x - 1)
                  </p>
                  <p>
                    <strong>Step 3:</strong> Solve: A = 1, B = 1
                  </p>
                  <p>
                    <strong>Step 4:</strong> ∫[1/(x - 1) + 1/(x + 2)] dx = ln|x - 1| + ln|x + 2| + C
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 p-4 rounded-lg">
                <h4 className="font-semibold text-teal-900 mb-2">Audio Application: Filter Transfer Functions</h4>
                <p className="text-teal-800 mb-2">
                  Audio filter transfer functions are often rational functions. For a second-order filter:
                </p>
                <p className="text-teal-800 font-mono text-sm mb-2">H(s) = K/((s - p₁)(s - p₂))</p>
                <p className="text-teal-700 text-sm">
                  Partial fractions help analyze the time-domain response by inverse Laplace transform.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Techniques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-900 mb-2">Improper Degree</h4>
                <p className="text-indigo-800 mb-2">
                  If degree of numerator ≥ degree of denominator, use polynomial long division first.
                </p>
                <p className="text-indigo-800 font-mono text-sm">P(x)/Q(x) = S(x) + R(x)/Q(x)</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Heaviside Cover-Up Method</h4>
                <p className="text-sm mb-2">Quick method for finding coefficients in simple linear factor cases:</p>
                <p className="text-sm">For A/(x - a), multiply both sides by (x - a) and substitute x = a.</p>
              </div>

              <Button onClick={() => window.open("/calculator.html", "_blank")} className="w-full" variant="outline">
                <Calculator className="w-4 h-4 mr-2" />
                Practice Integration Techniques
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exercises" className="space-y-6">
          <div className="grid gap-6">
            <ExerciseCard
              id={1}
              title="Integration by Parts"
              difficulty="Medium"
              problem="Find: ∫x cos(x) dx"
              solution="Let u = x, dv = cos(x) dx. Then du = dx, v = sin(x). ∫x cos(x) dx = x sin(x) - ∫sin(x) dx = x sin(x) - (-cos(x)) + C = x sin(x) + cos(x) + C"
              hint="Use LIATE rule: choose u = x (algebraic) and dv = cos(x) dx"
              onComplete={() => handleExerciseComplete(1)}
            />

            <ExerciseCard
              id={2}
              title="Trigonometric Substitution"
              difficulty="Hard"
              problem="Evaluate: ∫1/(x²√(x² + 9)) dx"
              solution="Use x = 3 tan θ, dx = 3 sec² θ dθ. Then √(x² + 9) = 3 sec θ. The integral becomes ∫1/(9 tan² θ · 3 sec θ) · 3 sec² θ dθ = ∫sec θ/(9 tan² θ) dθ = (1/9)∫cos θ/sin² θ dθ = -(1/9) · 1/sin θ + C = -√(x² + 9)/(9x) + C"
              hint="For √(x² + a²), use x = a tan θ substitution"
              onComplete={() => handleExerciseComplete(2)}
            />

            <ExerciseCard
              id={3}
              title="Partial Fractions"
              difficulty="Medium"
              problem="Find: ∫(3x - 2)/((x - 1)(x - 2)) dx"
              solution="(3x - 2)/((x - 1)(x - 2)) = A/(x - 1) + B/(x - 2). Solving: 3x - 2 = A(x - 2) + B(x - 1). Setting x = 1: 1 = -A, so A = -1. Setting x = 2: 4 = B. Therefore: ∫[-1/(x - 1) + 4/(x - 2)] dx = -ln|x - 1| + 4ln|x - 2| + C"
              hint="Set up partial fractions and solve for coefficients A and B"
              onComplete={() => handleExerciseComplete(3)}
            />

            <ExerciseCard
              id={4}
              title="Audio Filter Analysis"
              difficulty="Hard"
              problem="A second-order audio filter has transfer function H(s) = 10/((s + 2)(s + 5)). Find the inverse Laplace transform using partial fractions to determine the impulse response h(t)."
              solution="H(s) = 10/((s + 2)(s + 5)) = A/(s + 2) + B/(s + 5). Solving: 10 = A(s + 5) + B(s + 2). Setting s = -2: 10 = 3A, so A = 10/3. Setting s = -5: 10 = -3B, so B = -10/3. Therefore H(s) = (10/3)/(s + 2) - (10/3)/(s + 5). Taking inverse Laplace: h(t) = (10/3)e^(-2t) - (10/3)e^(-5t) for t ≥ 0"
              hint="Use partial fractions, then apply inverse Laplace transform tables"
              onComplete={() => handleExerciseComplete(4)}
            />
          </div>

          {allExercisesCompleted && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="text-green-600">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-green-800">Chapter Complete!</h3>
                  <p className="text-green-700">
                    Outstanding! You've mastered advanced integration techniques essential for complex audio signal
                    analysis.
                  </p>
                  <Button onClick={onComplete} className="bg-green-600 hover:bg-green-700">
                    Continue to Applications of Integration
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

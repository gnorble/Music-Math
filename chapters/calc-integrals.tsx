"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExerciseCard } from "@/components/exercise-card"
import { Calculator, Music, Volume2, Zap } from "lucide-react"

interface CalcIntegralsProps {
  onComplete: () => void
}

export default function CalcIntegrals({ onComplete }: CalcIntegralsProps) {
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
          Calculus Chapter 6
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900">Introduction to Integrals</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover integration as the reverse of differentiation and explore its applications in audio signal
          processing, from calculating total energy to analyzing waveform areas.
        </p>
      </div>

      <Tabs defaultValue="theory" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="theory">Theory</TabsTrigger>
          <TabsTrigger value="techniques">Basic Techniques</TabsTrigger>
          <TabsTrigger value="audio">Audio Applications</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
        </TabsList>

        <TabsContent value="theory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                Understanding Integration
              </CardTitle>
              <CardDescription>Integration as the fundamental theorem of calculus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">The Integral Concept</h4>
                <p className="text-blue-800">
                  Integration is the process of finding the area under a curve. If f'(x) = g(x), then ∫g(x)dx = f(x) +
                  C. This "undoes" differentiation and helps us find original functions from their rates of change.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Indefinite Integrals</h4>
                  <p className="text-sm text-gray-700 mb-2">∫f(x)dx = F(x) + C</p>
                  <p className="text-sm">
                    The antiderivative plus a constant of integration. Represents a family of functions.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Definite Integrals</h4>
                  <p className="text-sm text-gray-700 mb-2">∫[a to b]f(x)dx = F(b) - F(a)</p>
                  <p className="text-sm">Calculates the exact area between the curve and x-axis from x=a to x=b.</p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Fundamental Theorem of Calculus</h4>
                <p className="text-green-800 mb-2">
                  <strong>Part 1:</strong> If F(x) = ∫[a to x]f(t)dt, then F'(x) = f(x)
                </p>
                <p className="text-green-800">
                  <strong>Part 2:</strong> If f is continuous on [a,b] and F is an antiderivative of f, then ∫[a to
                  b]f(x)dx = F(b) - F(a)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Riemann Sums and Area Approximation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Before we can integrate, we need to understand how integration approximates area using rectangles:</p>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Riemann Sum Formula</h4>
                <p className="text-yellow-800 mb-2">∫[a to b]f(x)dx ≈ Σ[i=1 to n] f(xi)Δx</p>
                <p className="text-yellow-800">Where Δx = (b-a)/n and xi = a + iΔx</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <h5 className="font-semibold text-sm">Left Riemann Sum</h5>
                  <p className="text-xs">Uses left endpoint of each interval</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <h5 className="font-semibold text-sm">Right Riemann Sum</h5>
                  <p className="text-xs">Uses right endpoint of each interval</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <h5 className="font-semibold text-sm">Midpoint Rule</h5>
                  <p className="text-xs">Uses midpoint of each interval</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="techniques" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-green-500" />
                Basic Integration Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3">Power Rule</h4>
                  <p className="text-blue-800 mb-2">∫x^n dx = (x^(n+1))/(n+1) + C</p>
                  <p className="text-sm text-blue-700">where n ≠ -1</p>
                  <div className="mt-2 text-sm">
                    <p>
                      <strong>Example:</strong> ∫x³ dx = x⁴/4 + C
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3">Exponential Rule</h4>
                  <p className="text-green-800 mb-2">∫e^x dx = e^x + C</p>
                  <p className="text-green-800 mb-2">∫a^x dx = a^x/ln(a) + C</p>
                  <div className="mt-2 text-sm">
                    <p>
                      <strong>Example:</strong> ∫2^x dx = 2^x/ln(2) + C
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-3">Trigonometric Integrals</h4>
                  <p className="text-purple-800 mb-1">∫sin(x) dx = -cos(x) + C</p>
                  <p className="text-purple-800 mb-1">∫cos(x) dx = sin(x) + C</p>
                  <p className="text-purple-800">∫sec²(x) dx = tan(x) + C</p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-3">Logarithmic Rule</h4>
                  <p className="text-orange-800 mb-2">∫(1/x) dx = ln|x| + C</p>
                  <p className="text-orange-800">∫ln(x) dx = x·ln(x) - x + C</p>
                  <div className="mt-2 text-sm">
                    <p>
                      <strong>Note:</strong> This requires integration by parts
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Linear Combinations</h4>
                <p className="mb-2">∫[af(x) + bg(x)] dx = a∫f(x) dx + b∫g(x) dx</p>
                <p className="text-sm text-gray-600">
                  The integral of a sum is the sum of integrals, and constants can be factored out.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Substitution Method (u-substitution)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-900 mb-2">When to Use Substitution</h4>
                <p className="text-indigo-800">
                  Use when you have a composite function where the derivative of the inner function appears as a factor.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Substitution Steps</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Identify u = inner function</li>
                  <li>Find du = u' dx</li>
                  <li>Substitute to get ∫f(u) du</li>
                  <li>Integrate with respect to u</li>
                  <li>Substitute back to get answer in terms of x</li>
                </ol>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Example: ∫2x·e^(x²) dx</h4>
                <div className="text-yellow-800 space-y-1 text-sm">
                  <p>Let u = x², then du = 2x dx</p>
                  <p>∫2x·e^(x²) dx = ∫e^u du = e^u + C = e^(x²) + C</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audio" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="w-5 h-5 text-purple-500" />
                Integration in Audio Processing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Signal Energy Calculation</h4>
                <p className="text-purple-800 mb-2">
                  The total energy of an audio signal x(t) over time interval [0,T]:
                </p>
                <p className="text-purple-800 font-mono text-sm">E = ∫[0 to T] |x(t)|² dt</p>
                <p className="text-purple-700 text-sm mt-2">
                  This integral gives us the total energy content of the audio signal.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">RMS Calculation</h4>
                  <p className="text-blue-800 text-sm mb-2">Root Mean Square (RMS) value:</p>
                  <p className="text-blue-800 font-mono text-sm">RMS = √(1/T ∫[0 to T] x(t)² dt)</p>
                  <p className="text-blue-700 text-xs mt-2">Measures the effective amplitude of an AC signal</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Average Value</h4>
                  <p className="text-green-800 text-sm mb-2">Average value of a periodic signal:</p>
                  <p className="text-green-800 font-mono text-sm">x̄ = 1/T ∫[0 to T] x(t) dt</p>
                  <p className="text-green-700 text-xs mt-2">DC component of the signal</p>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">Impulse Response Integration</h4>
                <p className="text-orange-800 mb-2">The output of a linear system is the convolution integral:</p>
                <p className="text-orange-800 font-mono text-sm mb-2">y(t) = ∫[-∞ to ∞] x(τ)h(t-τ) dτ</p>
                <p className="text-orange-700 text-sm">
                  Where x(t) is input, h(t) is impulse response, and y(t) is output.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-red-500" />
                Practical Audio Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">Envelope Integration</h4>
                <p className="text-red-800 mb-2">
                  For an ADSR envelope e(t), the total "envelope area" affects perceived loudness:
                </p>
                <p className="text-red-800 font-mono text-sm">Total_Envelope = ∫[0 to note_duration] e(t) dt</p>
              </div>

              <div className="bg-teal-50 p-4 rounded-lg">
                <h4 className="font-semibold text-teal-900 mb-2">Frequency Spectrum Analysis</h4>
                <p className="text-teal-800 mb-2">
                  The Fourier transform uses integration to convert time domain to frequency domain:
                </p>
                <p className="text-teal-800 font-mono text-sm">X(f) = ∫[-∞ to ∞] x(t)e^(-j2πft) dt</p>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-900 mb-2">Filter Response</h4>
                <p className="text-indigo-800 mb-2">
                  A simple RC low-pass filter's step response involves integration:
                </p>
                <p className="text-indigo-800 font-mono text-sm">v_out(t) = (1/RC) ∫[0 to t] v_in(τ)e^(-(t-τ)/RC) dτ</p>
              </div>

              <Button onClick={() => window.open("/calculator.html", "_blank")} className="w-full" variant="outline">
                <Calculator className="w-4 h-4 mr-2" />
                Open Calculator for Integration Practice
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exercises" className="space-y-6">
          <div className="grid gap-6">
            <ExerciseCard
              id={1}
              title="Basic Integration"
              difficulty="Easy"
              problem="Find the indefinite integral: ∫(3x² + 2x - 5) dx"
              solution="∫(3x² + 2x - 5) dx = 3∫x² dx + 2∫x dx - 5∫1 dx = 3(x³/3) + 2(x²/2) - 5x + C = x³ + x² - 5x + C"
              hint="Use the power rule and linearity of integration"
              onComplete={() => handleExerciseComplete(1)}
            />

            <ExerciseCard
              id={2}
              title="Definite Integral"
              difficulty="Medium"
              problem="Evaluate: ∫[0 to 2] (x² + 1) dx"
              solution="∫[0 to 2] (x² + 1) dx = [x³/3 + x] from 0 to 2 = (8/3 + 2) - (0 + 0) = 8/3 + 2 = 14/3"
              hint="Find the antiderivative first, then apply the fundamental theorem"
              onComplete={() => handleExerciseComplete(2)}
            />

            <ExerciseCard
              id={3}
              title="Substitution Method"
              difficulty="Medium"
              problem="Find: ∫ 6x(x² + 1)⁵ dx using substitution"
              solution="Let u = x² + 1, then du = 2x dx, so 6x dx = 3 du. ∫ 6x(x² + 1)⁵ dx = ∫ 3u⁵ du = 3(u⁶/6) + C = u⁶/2 + C = (x² + 1)⁶/2 + C"
              hint="Look for a function and its derivative as factors"
              onComplete={() => handleExerciseComplete(3)}
            />

            <ExerciseCard
              id={4}
              title="Audio Signal Energy"
              difficulty="Hard"
              problem="A sine wave signal x(t) = A sin(2πft) has amplitude A = 2V and frequency f = 440Hz. Calculate the energy over one complete period T = 1/f."
              solution="E = ∫[0 to T] |A sin(2πft)|² dt = A² ∫[0 to T] sin²(2πft) dt. Using sin²(u) = (1 - cos(2u))/2: E = A²/2 ∫[0 to T] (1 - cos(4πft)) dt = A²/2 [t - sin(4πft)/(4πf)] from 0 to T = A²T/2 = 4 × (1/440)/2 = 1/220 ≈ 0.0045 J"
              hint="Use the identity sin²(x) = (1 - cos(2x))/2"
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
                    Excellent work! You've mastered the fundamentals of integration and its applications in audio
                    processing.
                  </p>
                  <Button onClick={onComplete} className="bg-green-600 hover:bg-green-700">
                    Continue to Integration Techniques
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

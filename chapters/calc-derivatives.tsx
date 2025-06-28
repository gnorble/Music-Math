"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Calculator, Lightbulb } from "lucide-react"
import { ExerciseCard } from "@/components/exercise-card"

interface CalcDerivativesProps {
  onComplete: () => void
}

export default function CalcDerivatives({ onComplete }: CalcDerivativesProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [completedSections, setCompletedSections] = useState<number[]>([])

  const markSectionComplete = (sectionIndex: number) => {
    if (!completedSections.includes(sectionIndex)) {
      setCompletedSections([...completedSections, sectionIndex])
    }
    if (sectionIndex === 3) {
      onComplete()
    }
  }

  const exercises = [
    {
      id: "derivative-definition",
      question: "What is the derivative of f(x) = x² using the definition?",
      type: "multiple-choice" as const,
      options: ["x", "2x", "x²", "2"],
      correctAnswer: 1,
      explanation:
        "Using the limit definition: f'(x) = lim[h→0] [(x+h)² - x²]/h = lim[h→0] [2xh + h²]/h = lim[h→0] (2x + h) = 2x",
      hint: "Use the limit definition: f'(x) = lim[h→0] [f(x+h) - f(x)]/h",
      musicalContext:
        "If x represents time and f(x) = x² represents the square of amplitude, then f'(x) = 2x tells us how quickly the squared amplitude is changing.",
    },
    {
      id: "power-rule",
      question: "What is the derivative of f(x) = x⁵?",
      type: "multiple-choice" as const,
      options: ["5x⁴", "x⁴", "5x⁵", "x⁵/5"],
      correctAnswer: 0,
      explanation: "Using the power rule: if f(x) = xⁿ, then f'(x) = n·xⁿ⁻¹. So for x⁵, we get 5·x⁴ = 5x⁴.",
      hint: "Power rule: bring down the exponent and reduce the power by 1.",
      musicalContext:
        "In audio, higher-order polynomials often describe complex envelope shapes. Their derivatives tell us the rate of change at any point in the envelope.",
    },
    {
      id: "envelope-derivative",
      question: "If volume V(t) = e^(-t/2), what does V'(t) represent?",
      type: "multiple-choice" as const,
      options: ["The volume at time t", "The rate at which volume is changing", "The total energy", "The frequency"],
      correctAnswer: 1,
      explanation:
        "V'(t) is the derivative of volume with respect to time, which represents the rate of change of volume. For V(t) = e^(-t/2), we get V'(t) = -½e^(-t/2), showing the volume is decreasing exponentially.",
      hint: "Remember that derivatives measure rates of change.",
      musicalContext:
        "This exponential decay is common in ADSR envelopes. The derivative tells us how quickly the volume is fading, which affects the perceived attack and release characteristics.",
    },
    {
      id: "sine-derivative",
      question: "What is the derivative of sin(x)?",
      type: "multiple-choice" as const,
      options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
      correctAnswer: 0,
      explanation:
        "The derivative of sin(x) is cos(x). This relationship is fundamental to understanding oscillations and wave behavior in audio processing.",
      hint: "This is one of the basic trigonometric derivatives you should memorize.",
      musicalContext:
        "Since audio signals are often sinusoidal, knowing that d/dx[sin(x)] = cos(x) helps us understand how the rate of change of a sine wave relates to a cosine wave - they're 90° out of phase.",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-2xl">Introduction to Derivatives</CardTitle>
              <CardDescription className="text-lg">
                Understanding rates of change and slopes in audio processing
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={currentSection.toString()} onValueChange={(value) => setCurrentSection(Number.parseInt(value))}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="0" className="text-xs">
            What Are Derivatives?
          </TabsTrigger>
          <TabsTrigger value="1" className="text-xs">
            Basic Rules
          </TabsTrigger>
          <TabsTrigger value="2" className="text-xs">
            Audio Applications
          </TabsTrigger>
          <TabsTrigger value="3" className="text-xs">
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="0" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Understanding Derivatives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                A derivative measures how fast a function is changing at any given point. It's the instantaneous rate of
                change - like the speedometer reading in your car at a specific moment.
              </p>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Musical Analogy:</h4>
                <p className="text-green-800">
                  If you're slowly turning up a volume fader, the derivative tells you how fast the volume is increasing
                  at each moment. A large derivative means rapid change, a small derivative means slow change, and zero
                  means no change at all.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Formal Definition:</h4>
                  <p className="text-blue-800 mb-2">
                    The derivative of f(x) at point x is the limit of the average rate of change as the interval
                    approaches zero:
                  </p>
                  <div className="bg-white p-3 rounded border">
                    <code className="text-sm">f'(x) = lim[h→0] [f(x+h) - f(x)] / h</code>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Geometric Interpretation:</h4>
                  <ul className="text-purple-800 space-y-1">
                    <li>• The derivative is the slope of the tangent line to the curve</li>
                    <li>• Positive derivative = function is increasing</li>
                    <li>• Negative derivative = function is decreasing</li>
                    <li>• Zero derivative = function has a horizontal tangent (local max/min)</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Notation:</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <strong>Leibniz notation:</strong>
                      <br />
                      <code>dy/dx, df/dx</code>
                    </div>
                    <div>
                      <strong>Prime notation:</strong>
                      <br />
                      <code>f'(x), y'</code>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">Audio Example - ADSR Envelope:</h4>
                  <p className="text-red-800 text-sm">
                    In an ADSR envelope, the derivative tells us the rate of volume change during each phase:
                  </p>
                  <ul className="text-red-700 text-sm space-y-1 mt-2">
                    <li>
                      • <strong>Attack:</strong> Large positive derivative (volume increasing rapidly)
                    </li>
                    <li>
                      • <strong>Decay:</strong> Negative derivative (volume decreasing)
                    </li>
                    <li>
                      • <strong>Sustain:</strong> Zero derivative (volume constant)
                    </li>
                    <li>
                      • <strong>Release:</strong> Negative derivative (volume decreasing to zero)
                    </li>
                  </ul>
                </div>
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
                Basic Differentiation Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Instead of using the limit definition every time, we have rules that make finding derivatives much
                easier.
              </p>

              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-blue-900 mb-4">🔢 Power Rule</h4>
                  <p className="text-blue-800 mb-3">The most fundamental rule for polynomial functions:</p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      If f(x) = x^n, then f'(x) = n·x^(n-1)
                      <br />
                      Example: f(x) = x³ → f'(x) = 3x²
                    </code>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <strong>Audio Application:</strong> Polynomial waveshaping functions use this rule. If you have a
                    waveshaper f(x) = x³, its derivative 3x² tells you how the gain changes with input level.
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-green-900 mb-4">➕ Sum and Difference Rules</h4>
                  <p className="text-green-800 mb-3">Derivatives distribute over addition and subtraction:</p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      [f(x) + g(x)]' = f'(x) + g'(x)
                      <br />
                      [f(x) - g(x)]' = f'(x) - g'(x)
                    </code>
                  </div>
                  <div className="bg-green-100 p-3 rounded">
                    <strong>Audio Application:</strong> When mixing multiple signals, the rate of change of the mix is
                    the sum of the rates of change of individual signals.
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-purple-900 mb-4">✖️ Constant Multiple Rule</h4>
                  <p className="text-purple-800 mb-3">Constants factor out of derivatives:</p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      [c·f(x)]' = c·f'(x)
                      <br />
                      Example: [5x²]' = 5·[x²]' = 5·2x = 10x
                    </code>
                  </div>
                  <div className="bg-purple-100 p-3 rounded">
                    <strong>Audio Application:</strong> Scaling a signal by a constant (like adjusting volume) scales
                    its rate of change by the same constant.
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-orange-900 mb-4">📈 Common Function Derivatives</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="bg-white p-3 rounded border">
                        <code>d/dx[sin(x)] = cos(x)</code>
                      </div>
                      <div className="bg-white p-3 rounded border">
                        <code>d/dx[cos(x)] = -sin(x)</code>
                      </div>
                      <div className="bg-white p-3 rounded border">
                        <code>d/dx[e^x] = e^x</code>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-white p-3 rounded border">
                        <code>d/dx[ln(x)] = 1/x</code>
                      </div>
                      <div className="bg-white p-3 rounded border">
                        <code>d/dx[tan(x)] = sec²(x)</code>
                      </div>
                      <div className="bg-white p-3 rounded border">
                        <code>d/dx[c] = 0</code> (constant)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">Step-by-Step Example:</h4>
                  <p className="text-red-800 text-sm mb-2">Find the derivative of f(x) = 3x⁴ - 2x² + 5x - 7</p>
                  <div className="bg-white p-3 rounded border">
                    <code className="text-sm">
                      f'(x) = 3·4x³ - 2·2x + 5·1 - 0
                      <br />
                      f'(x) = 12x³ - 4x + 5
                    </code>
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
              <CardTitle>Derivatives in Audio Processing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Derivatives are everywhere in audio processing, from envelope generators to filter design to dynamic
                range processing.
              </p>

              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-blue-900 mb-4">🎛️ Envelope Generators</h4>
                  <p className="text-blue-800 mb-3">
                    ADSR envelopes use exponential functions, and their derivatives control the perceived attack and
                    release characteristics.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      Attack: V(t) = 1 - e^(-t/τ) → V'(t) = (1/τ)e^(-t/τ)
                      <br />
                      Release: V(t) = e^(-t/τ) → V'(t) = -(1/τ)e^(-t/τ)
                    </code>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <strong>Key Insight:</strong> The time constant τ controls both the curve shape and its derivative.
                    Smaller τ means faster changes (larger derivative magnitude), creating sharper attacks and releases.
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-green-900 mb-4">🔊 Dynamic Range Processing</h4>
                  <p className="text-green-800 mb-3">
                    Compressors and limiters use derivatives to detect how quickly signal levels are changing.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      If input level L(t) changes rapidly (large |L'(t)|),
                      <br />
                      the compressor applies faster attack/release times
                    </code>
                  </div>
                  <div className="bg-green-100 p-3 rounded">
                    <strong>Application:</strong> Adaptive compressors analyze the derivative of the input signal to
                    automatically adjust their response characteristics for different types of audio material.
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-purple-900 mb-4">🎚️ Filter Parameter Automation</h4>
                  <p className="text-purple-800 mb-3">
                    Smooth filter sweeps require careful control of parameter change rates to avoid audible artifacts.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      Cutoff frequency: f_c(t) = f_start × (f_end/f_start)^(t/T)
                      <br />
                      Rate of change: f_c'(t) = f_c(t) × ln(f_end/f_start) / T
                    </code>
                  </div>
                  <div className="bg-purple-100 p-3 rounded">
                    <strong>Why This Matters:</strong> The derivative tells us how fast the filter frequency is
                    changing. Too fast creates audible artifacts; too slow sounds unnatural.
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-red-900 mb-4">📊 Spectral Analysis</h4>
                  <p className="text-red-800 mb-3">
                    The derivative of a signal in the time domain relates to its frequency content.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      For a sine wave: x(t) = A sin(2πft)
                      <br />
                      Derivative: x'(t) = 2πfA cos(2πft)
                    </code>
                  </div>
                  <div className="bg-red-100 p-3 rounded">
                    <strong>Key Insight:</strong> Higher frequencies have larger derivatives. This is why high-frequency
                    content is more sensitive to timing errors and why anti-aliasing filters are necessary in digital
                    systems.
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-yellow-900 mb-4">🎵 Waveshaping and Distortion</h4>
                  <p className="text-yellow-800 mb-3">
                    The derivative of a waveshaping function determines the harmonic content it produces.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      Soft clipping: f(x) = tanh(kx) → f'(x) = k·sech²(kx)
                      <br />
                      Hard clipping: f(x) = sign(x)·min(|x|, 1) → f'(x) = 0 or undefined
                    </code>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <strong>Application:</strong> Smooth waveshaping functions (continuous derivatives) produce pleasant
                    harmonic distortion, while functions with discontinuous derivatives create harsh, aliasing-prone
                    distortion.
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">The Big Picture:</h4>
                <p className="text-orange-800">
                  Understanding derivatives helps you predict and control how audio effects will behave. Whether you're
                  designing envelope curves, setting compressor parameters, or creating custom waveshaping functions,
                  the derivative tells you how sensitive the output will be to changes in the input.
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
              <CardDescription>
                Test your understanding of derivatives and their applications in audio processing
              </CardDescription>
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

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Zap, Calculator, Lightbulb } from "lucide-react"
import { ExerciseCard } from "@/components/exercise-card"

interface CalcDerivativeRulesProps {
  onComplete: () => void
}

export default function CalcDerivativeRules({ onComplete }: CalcDerivativeRulesProps) {
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
      id: "product-rule",
      question: "What is the derivative of f(x) = x² · sin(x)?",
      type: "multiple-choice" as const,
      options: ["2x · cos(x)", "x² · cos(x) + 2x · sin(x)", "2x · sin(x) + x² · cos(x)", "x² · cos(x)"],
      correctAnswer: 2,
      explanation:
        "Using the product rule: (uv)' = u'v + uv'. Here u = x², u' = 2x, v = sin(x), v' = cos(x). So f'(x) = 2x·sin(x) + x²·cos(x).",
      hint: "Product rule: (fg)' = f'g + fg'. Don't forget both terms!",
      musicalContext:
        "This type of function might represent amplitude modulation where the carrier (sine wave) is modulated by a time-varying envelope (x²).",
    },
    {
      id: "quotient-rule",
      question: "What is the derivative of f(x) = sin(x)/x?",
      type: "multiple-choice" as const,
      options: ["cos(x)/1", "(x·cos(x) - sin(x))/x²", "(cos(x)·x - sin(x)·1)/x²", "Both B and C are correct"],
      correctAnswer: 3,
      explanation:
        "Using the quotient rule: (u/v)' = (u'v - uv')/v². Here u = sin(x), u' = cos(x), v = x, v' = 1. So f'(x) = (cos(x)·x - sin(x)·1)/x² = (x·cos(x) - sin(x))/x².",
      hint: "Quotient rule: (f/g)' = (f'g - fg')/g². Watch the order in the numerator!",
      musicalContext:
        "The function sin(x)/x appears in digital signal processing as the sinc function, which is fundamental to sampling theory and anti-aliasing filters.",
    },
    {
      id: "chain-rule",
      question: "What is the derivative of f(x) = sin(3x²)?",
      type: "multiple-choice" as const,
      options: ["cos(3x²)", "3cos(3x²)", "6x·cos(3x²)", "cos(6x)"],
      correctAnswer: 2,
      explanation:
        "Using the chain rule: if f(x) = g(h(x)), then f'(x) = g'(h(x))·h'(x). Here g(u) = sin(u), h(x) = 3x². So f'(x) = cos(3x²)·6x = 6x·cos(3x²).",
      hint: "Chain rule: derivative of outside function times derivative of inside function.",
      musicalContext:
        "Functions like sin(3x²) create frequency-modulated signals where the frequency changes quadratically over time, common in FM synthesis.",
    },
    {
      id: "implicit-differentiation",
      question: "If x² + y² = 25, what is dy/dx?",
      type: "multiple-choice" as const,
      options: ["-x/y", "x/y", "-y/x", "2x + 2y"],
      correctAnswer: 0,
      explanation:
        "Using implicit differentiation: d/dx[x² + y²] = d/dx[25]. This gives 2x + 2y(dy/dx) = 0. Solving for dy/dx: 2y(dy/dx) = -2x, so dy/dx = -x/y.",
      hint: "Treat y as a function of x and use the chain rule when differentiating terms with y.",
      musicalContext:
        "This represents a circle in the x-y plane. In audio, such relationships might describe the phase relationship between two oscillators or the trajectory in a 2D audio effect space.",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Settings className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-2xl">Derivative Rules and Techniques</CardTitle>
              <CardDescription className="text-lg">
                Advanced methods for finding derivatives of complex functions
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={currentSection.toString()} onValueChange={(value) => setCurrentSection(Number.parseInt(value))}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="0" className="text-xs">
            Product & Quotient
          </TabsTrigger>
          <TabsTrigger value="1" className="text-xs">
            Chain Rule
          </TabsTrigger>
          <TabsTrigger value="2" className="text-xs">
            Advanced Techniques
          </TabsTrigger>
          <TabsTrigger value="3" className="text-xs">
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="0" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="w-5 h-5 mr-2" />
                Product and Quotient Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                When functions are multiplied or divided, we need special rules to find their derivatives. These rules
                are essential for complex audio processing functions.
              </p>

              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-blue-900 mb-4">✖️ Product Rule</h4>
                  <p className="text-blue-800 mb-3">
                    When you have two functions multiplied together, the derivative is NOT just the product of their
                    derivatives.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      If f(x) = u(x) · v(x), then f'(x) = u'(x) · v(x) + u(x) · v'(x)
                      <br />
                      In words: "first times derivative of second, plus second times derivative of first"
                    </code>
                  </div>
                  <div className="bg-blue-100 p-3 rounded mb-3">
                    <strong>Memory Device:</strong> "First D-second plus Second D-first" where D means derivative.
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <strong>Audio Example:</strong> If you have a signal that's both amplitude modulated and frequency
                    modulated: f(t) = A(t) · sin(ω(t)·t), the product rule helps you find how the overall signal changes
                    over time.
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-green-900 mb-4">➗ Quotient Rule</h4>
                  <p className="text-green-800 mb-3">
                    When you have one function divided by another, use the quotient rule.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      If f(x) = u(x) / v(x), then f'(x) = [u'(x) · v(x) - u(x) · v'(x)] / [v(x)]²
                      <br />
                      In words: "bottom times derivative of top, minus top times derivative of bottom, all over bottom
                      squared"
                    </code>
                  </div>
                  <div className="bg-green-100 p-3 rounded mb-3">
                    <strong>Memory Device:</strong> "Lo D-Hi minus Hi D-Lo over Lo-Lo" (Lo = bottom, Hi = top, D =
                    derivative)
                  </div>
                  <div className="bg-green-100 p-3 rounded">
                    <strong>Audio Example:</strong> Transfer functions of filters often involve ratios of polynomials.
                    The quotient rule helps analyze how the filter response changes with frequency.
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-purple-900 mb-4">🎵 Worked Examples</h4>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border">
                      <h5 className="font-semibold text-purple-800 mb-2">Product Rule Example:</h5>
                      <p className="text-purple-700 text-sm mb-2">Find the derivative of f(x) = x³ · e^x</p>
                      <div className="bg-gray-50 p-2 rounded">
                        <code className="text-xs">
                          u = x³, u' = 3x²
                          <br />v = e^x, v' = e^x
                          <br />
                          f'(x) = 3x² · e^x + x³ · e^x = e^x(3x² + x³) = x²e^x(3 + x)
                        </code>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <h5 className="font-semibold text-purple-800 mb-2">Quotient Rule Example:</h5>
                      <p className="text-purple-700 text-sm mb-2">Find the derivative of f(x) = (x² + 1)/(x - 2)</p>
                      <div className="bg-gray-50 p-2 rounded">
                        <code className="text-xs">
                          u = x² + 1, u' = 2x
                          <br />v = x - 2, v' = 1
                          <br />
                          f'(x) = [2x(x-2) - (x²+1)(1)] / (x-2)² = [2x²-4x-x²-1] / (x-2)² = (x²-4x-1) / (x-2)²
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Audio Processing Applications:</h4>
                  <ul className="text-yellow-800 text-sm space-y-1">
                    <li>
                      • <strong>Amplitude Modulation:</strong> Product rule for carrier × modulator signals
                    </li>
                    <li>
                      • <strong>Filter Design:</strong> Quotient rule for analyzing transfer function derivatives
                    </li>
                    <li>
                      • <strong>Envelope Shaping:</strong> Product of time-varying gain and audio signal
                    </li>
                    <li>
                      • <strong>Cross-fading:</strong> Weighted sum of signals using product rule
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
                <Zap className="w-5 h-5 mr-2" />
                The Chain Rule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                The chain rule is used when you have a function inside another function (composition of functions). It's
                one of the most important rules in calculus and appears constantly in audio processing.
              </p>

              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-blue-900 mb-4">🔗 Chain Rule Formula</h4>
                  <p className="text-blue-800 mb-3">
                    When you have a composite function f(g(x)), the derivative is the derivative of the outside function
                    times the derivative of the inside function.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      If y = f(g(x)), then dy/dx = f'(g(x)) · g'(x)
                      <br />
                      Or in Leibniz notation: dy/dx = (dy/du) · (du/dx) where u = g(x)
                    </code>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <strong>Memory Device:</strong> "Derivative of outside times derivative of inside" or think of it as
                    a chain: the rate of change passes through each link.
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-green-900 mb-4">🎵 Audio Examples</h4>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border">
                      <h5 className="font-semibold text-green-800 mb-2">FM Synthesis:</h5>
                      <p className="text-green-700 text-sm mb-2">
                        A frequency-modulated sine wave: f(t) = sin(ωt + β·sin(ωₘt))
                      </p>
                      <div className="bg-gray-50 p-2 rounded">
                        <code className="text-xs">
                          Outside function: sin(u) where u = ωt + β·sin(ωₘt)
                          <br />
                          f'(t) = cos(ωt + β·sin(ωₘt)) · [ω + β·ωₘ·cos(ωₘt)]
                        </code>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <h5 className="font-semibold text-green-800 mb-2">Exponential Envelope:</h5>
                      <p className="text-green-700 text-sm mb-2">
                        An envelope with time-varying decay: f(t) = e^(-at²)
                      </p>
                      <div className="bg-gray-50 p-2 rounded">
                        <code className="text-xs">
                          Outside function: e^u where u = -at²
                          <br />
                          f'(t) = e^(-at²) · (-2at) = -2at·e^(-at²)
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-purple-900 mb-4">🔄 Multiple Chain Rule</h4>
                  <p className="text-purple-800 mb-3">
                    Sometimes you have functions nested multiple levels deep. Apply the chain rule repeatedly.
                  </p>
                  <div className="bg-white p-4 rounded border">
                    <h5 className="font-semibold text-purple-800 mb-2">Example: f(x) = sin(cos(x²))</h5>
                    <div className="bg-gray-50 p-2 rounded">
                      <code className="text-xs">
                        Outermost: sin(u) where u = cos(x²)
                        <br />
                        Middle: cos(v) where v = x²
                        <br />
                        Innermost: x²
                        <br />
                        <br />
                        f'(x) = cos(cos(x²)) · (-sin(x²)) · (2x)
                        <br />
                        f'(x) = -2x · sin(x²) · cos(cos(x²))
                      </code>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-orange-900 mb-4">🎛️ Audio Processing Applications</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border">
                      <strong>Waveshaping:</strong> Distortion functions like f(x) = tanh(k·g(x)) where g(x) is a
                      pre-processing function
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <strong>Modulation:</strong> Complex modulation schemes with nested oscillators
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <strong>Filter Automation:</strong> Parameters that change according to complex time functions
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <strong>Granular Synthesis:</strong> Envelope functions applied to windowed segments
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">Step-by-Step Strategy:</h4>
                  <ol className="text-red-800 text-sm space-y-1">
                    <li>1. Identify the outermost function</li>
                    <li>2. Identify what's inside that function</li>
                    <li>3. Take the derivative of the outside function</li>
                    <li>4. Multiply by the derivative of the inside function</li>
                    <li>5. If the inside function is also composite, apply chain rule again</li>
                  </ol>
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
              <CardTitle>Advanced Differentiation Techniques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Beyond the basic rules, there are specialized techniques for handling complex functions that appear in
                advanced audio processing and synthesis.
              </p>

              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-blue-900 mb-4">🔄 Implicit Differentiation</h4>
                  <p className="text-blue-800 mb-3">
                    Used when y is not explicitly solved for in terms of x, but both variables are related by an
                    equation.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      For equations like F(x,y) = 0, differentiate both sides with respect to x,
                      <br />
                      treating y as a function of x (so dy/dx appears in your result)
                    </code>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <strong>Audio Application:</strong> Phase relationships between oscillators often satisfy implicit
                    equations. For example, if two oscillators maintain a constant phase difference, their frequency
                    relationship can be found using implicit differentiation.
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-green-900 mb-4">📊 Logarithmic Differentiation</h4>
                  <p className="text-green-800 mb-3">
                    Useful for functions with variables in both the base and exponent, or products/quotients of many
                    terms.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      For y = f(x)^g(x), take ln of both sides: ln(y) = g(x)·ln(f(x))
                      <br />
                      Then differentiate: (1/y)·(dy/dx) = g'(x)·ln(f(x)) + g(x)·f'(x)/f(x)
                      <br />
                      Solve for dy/dx: dy/dx = y·[g'(x)·ln(f(x)) + g(x)·f'(x)/f(x)]
                    </code>
                  </div>
                  <div className="bg-green-100 p-3 rounded">
                    <strong>Audio Application:</strong> Exponential frequency sweeps where both the base frequency and
                    the sweep rate change over time, common in complex filter automation.
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-purple-900 mb-4">🎯 Parametric Differentiation</h4>
                  <p className="text-purple-800 mb-3">
                    When both x and y are expressed in terms of a parameter t, we can find dy/dx using the chain rule.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      If x = f(t) and y = g(t), then dy/dx = (dy/dt)/(dx/dt) = g'(t)/f'(t)
                    </code>
                  </div>
                  <div className="bg-purple-100 p-3 rounded">
                    <strong>Audio Application:</strong> In 2D audio effects (like stereo panning or spatial audio), the
                    left and right channel levels might both be functions of time, and you want to know how the stereo
                    balance changes.
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-orange-900 mb-4">🔢 Higher-Order Derivatives</h4>
                  <p className="text-orange-800 mb-3">
                    The derivative of a derivative gives information about curvature and acceleration.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      f'(x) = first derivative (rate of change)
                      <br />
                      f''(x) = second derivative (rate of change of the rate of change)
                      <br />
                      f'''(x) = third derivative, and so on...
                    </code>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-orange-100 p-3 rounded">
                      <strong>Audio Applications:</strong>
                      <ul className="text-orange-800 text-sm mt-1 space-y-1">
                        <li>• Second derivative of position gives acceleration in physical modeling synthesis</li>
                        <li>• Second derivative of filter frequency gives "jerk" in parameter automation</li>
                        <li>• Higher derivatives help analyze the smoothness of envelope curves</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-red-900 mb-4">🎵 Complex Audio Example</h4>
                  <p className="text-red-800 mb-3">
                    Let's analyze a complex modulation scheme used in advanced synthesis:
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      Signal: s(t) = A(t) · sin(ω₁t + β(t) · sin(ω₂t))
                      <br />
                      where A(t) = e^(-t/τ) and β(t) = β₀ · (1 - e^(-t/τ₂))
                    </code>
                  </div>
                  <p className="text-red-800 text-sm mb-2">
                    This represents an FM-synthesized tone with exponentially decaying amplitude and time-varying
                    modulation depth. Finding ds/dt requires:
                  </p>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• Product rule for A(t) · [FM part]</li>
                    <li>• Chain rule for the FM sine function</li>
                    <li>• Product rule again for β(t) · sin(ω₂t)</li>
                    <li>• Basic derivatives for the exponential functions</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Why These Techniques Matter:</h4>
                <p className="text-yellow-800">
                  Modern audio synthesis and processing often involves complex, nested functions. Understanding these
                  advanced differentiation techniques helps you analyze and optimize audio algorithms, predict their
                  behavior, and design better parameter control schemes.
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
              <CardDescription>Test your understanding of advanced derivative rules and techniques</CardDescription>
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

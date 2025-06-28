"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, Zap, Lightbulb } from "lucide-react"
import { ExerciseCard } from "@/components/exercise-card"

interface CalcDerivativeAppsProps {
  onComplete: () => void
}

export default function CalcDerivativeApps({ onComplete }: CalcDerivativeAppsProps) {
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
      id: "optimization-problem",
      question:
        "To minimize distortion in an amplifier, you need to find where the derivative of the distortion function equals:",
      type: "multiple-choice" as const,
      options: ["1", "0", "-1", "∞"],
      correctAnswer: 1,
      explanation:
        "At minimum points, the derivative equals zero. This is because the tangent line is horizontal at local minima and maxima, indicating no instantaneous change.",
      hint: "Think about what the slope of a curve looks like at its lowest point.",
      musicalContext:
        "In audio engineering, we often optimize parameters to minimize distortion, noise, or other unwanted artifacts. The minimum occurs where the derivative is zero.",
    },
    {
      id: "related-rates",
      question:
        "If the volume of a speaker cone is changing at 2 cm³/s, and the volume V = (4/3)πr³, how fast is the radius changing when r = 3 cm?",
      type: "multiple-choice" as const,
      options: ["2/(36π) cm/s", "1/(18π) cm/s", "2/(18π) cm/s", "1/(36π) cm/s"],
      correctAnswer: 1,
      explanation:
        "Using related rates: dV/dt = 4πr² · dr/dt. Given dV/dt = 2 and r = 3: 2 = 4π(9) · dr/dt, so dr/dt = 2/(36π) = 1/(18π) cm/s.",
      hint: "Use the chain rule: dV/dt = (dV/dr) · (dr/dt), then solve for dr/dt.",
      musicalContext:
        "This type of problem appears in speaker design and acoustic modeling, where we need to understand how different physical parameters change in relation to each other.",
    },
    {
      id: "curve-sketching",
      question: "For a function f(x), if f'(x) > 0 and f''(x) < 0, the function is:",
      type: "multiple-choice" as const,
      options: [
        "Increasing and concave up",
        "Increasing and concave down",
        "Decreasing and concave up",
        "Decreasing and concave down",
      ],
      correctAnswer: 1,
      explanation:
        "f'(x) > 0 means the function is increasing (positive slope). f''(x) < 0 means the function is concave down (the rate of increase is slowing down).",
      hint: "First derivative tells you if the function is increasing or decreasing. Second derivative tells you about concavity.",
      musicalContext:
        "This describes the attack phase of many musical envelopes - volume is increasing (f' > 0) but the rate of increase slows down (f'' < 0), creating a smooth, natural-sounding attack.",
    },
    {
      id: "optimization-audio",
      question: "In a compressor, the gain reduction function G(x) = -kx² + bx has maximum gain reduction when:",
      type: "multiple-choice" as const,
      options: ["x = 0", "x = b/(2k)", "x = k/(2b)", "x = b/k"],
      correctAnswer: 1,
      explanation:
        "To find the maximum, set G'(x) = 0. G'(x) = -2kx + b = 0, so x = b/(2k). Since G''(x) = -2k < 0, this is indeed a maximum.",
      hint: "Find where the derivative equals zero, then check the second derivative to confirm it's a maximum.",
      musicalContext:
        "Compressor design often involves optimizing gain reduction curves to achieve the desired dynamic response while minimizing artifacts.",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <CardTitle className="text-2xl">Applications of Derivatives</CardTitle>
              <CardDescription className="text-lg">
                Using derivatives to solve real-world audio processing problems
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={currentSection.toString()} onValueChange={(value) => setCurrentSection(Number.parseInt(value))}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="0" className="text-xs">
            Optimization
          </TabsTrigger>
          <TabsTrigger value="1" className="text-xs">
            Related Rates
          </TabsTrigger>
          <TabsTrigger value="2" className="text-xs">
            Curve Analysis
          </TabsTrigger>
          <TabsTrigger value="3" className="text-xs">
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="0" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Optimization Problems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Optimization is about finding the best solution - maximum efficiency, minimum distortion, optimal
                parameter settings. Derivatives help us find these optimal points.
              </p>

              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-blue-900 mb-4">🎯 Finding Extrema</h4>
                  <p className="text-blue-800 mb-3">
                    To find maximum and minimum values of a function, we look for critical points where the derivative
                    equals zero or doesn't exist.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      Step 1: Find f'(x)
                      <br />
                      Step 2: Solve f'(x) = 0 for critical points
                      <br />
                      Step 3: Use second derivative test: f''(x) &lt; 0 → maximum, f''(x) &gt; 0 → minimum
                      <br />
                      Step 4: Check endpoints if dealing with a closed interval
                    </code>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <strong>Audio Example:</strong> Finding the optimal Q factor for a filter that maximizes resonance
                    while minimizing unwanted artifacts.
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-green-900 mb-4">🎛️ Audio Processing Optimization</h4>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border">
                      <h5 className="font-semibold text-green-800 mb-2">Compressor Knee Optimization:</h5>
                      <p className="text-green-700 text-sm mb-2">
                        Find the knee point that minimizes audible artifacts while maintaining effective compression.
                      </p>
                      <div className="bg-gray-50 p-2 rounded">
                        <code className="text-xs">
                          Objective function: Minimize |output_level - target_level|² + λ·|artifacts|²
                          <br />
                          Take derivative with respect to knee position and set equal to zero
                        </code>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <h5 className="font-semibold text-green-800 mb-2">EQ Band Optimization:</h5>
                      <p className="text-green-700 text-sm mb-2">
                        Optimize the frequency, gain, and Q of EQ bands to achieve target frequency response.
                      </p>
                      <div className="bg-gray-50 p-2 rounded">
                        <code className="text-xs">
                          Error function: E = ∫ |H(ω) - H_target(ω)|² dω
                          <br />
                          Minimize by taking partial derivatives with respect to each parameter
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-purple-900 mb-4">🔊 Loudspeaker Design Example</h4>
                  <p className="text-purple-800 mb-3">
                    Design a speaker enclosure to maximize bass response while minimizing size.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      Volume: V = length × width × height = l × w × h
                      <br />
                      Bass response: B(V) = k√V (simplified model)
                      <br />
                      Constraint: Surface area = 2(lw + lh + wh) ≤ A_max
                    </code>
                  </div>
                  <div className="bg-purple-100 p-3 rounded">
                    <strong>Solution Method:</strong> Use Lagrange multipliers or substitute constraints to create a
                    single-variable optimization problem, then use derivatives to find the optimal dimensions.
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-orange-900 mb-4">⚡ Real-Time Optimization</h4>
                  <p className="text-orange-800 mb-3">
                    Many audio systems perform optimization in real-time using gradient-based methods.
                  </p>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border">
                      <strong>Adaptive Filters:</strong> Use the derivative of the error function to continuously adjust
                      filter coefficients for optimal performance.
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <strong>Automatic Gain Control:</strong> Optimize gain settings based on the derivative of the
                      signal level to maintain consistent output.
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <strong>Feedback Suppression:</strong> Minimize feedback by finding the optimal notch filter
                      settings using derivative-based optimization.
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">Optimization Strategy:</h4>
                  <ol className="text-red-800 text-sm space-y-1">
                    <li>1. Define the objective function (what you want to optimize)</li>
                    <li>2. Identify constraints (limitations on your variables)</li>
                    <li>3. Take derivatives and set them equal to zero</li>
                    <li>4. Solve for critical points</li>
                    <li>5. Test critical points and boundaries to find the global optimum</li>
                    <li>6. Verify the solution makes physical/musical sense</li>
                  </ol>
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
                Related Rates Problems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Related rates problems involve finding how fast one quantity changes when we know how fast a related
                quantity is changing. These are common in audio systems where multiple parameters are interconnected.
              </p>

              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-blue-900 mb-4">🔗 The Chain Rule Connection</h4>
                  <p className="text-blue-800 mb-3">
                    Related rates problems use the chain rule to connect the rates of change of different variables.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      If y depends on x, and x depends on t, then:
                      <br />
                      dy/dt = (dy/dx) · (dx/dt)
                      <br />
                      <br />
                      General strategy:
                      <br />
                      1. Write an equation relating the variables
                      <br />
                      2. Differentiate both sides with respect to time
                      <br />
                      3. Substitute known values and solve for the unknown rate
                    </code>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-green-900 mb-4">🎵 Audio Examples</h4>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border">
                      <h5 className="font-semibold text-green-800 mb-2">Doppler Effect:</h5>
                      <p className="text-green-700 text-sm mb-2">
                        A sound source moves toward a listener. How fast is the perceived frequency changing?
                      </p>
                      <div className="bg-gray-50 p-2 rounded">
                        <code className="text-xs">
                          f_perceived = f_source · (v_sound)/(v_sound - v_source)
                          <br />
                          df_perceived/dt = f_source · v_sound · (dv_source/dt)/(v_sound - v_source)²
                        </code>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <h5 className="font-semibold text-green-800 mb-2">Speaker Cone Motion:</h5>
                      <p className="text-green-700 text-sm mb-2">
                        The cone displacement affects both volume and frequency response. How are these rates related?
                      </p>
                      <div className="bg-gray-50 p-2 rounded">
                        <code className="text-xs">
                          Volume ∝ displacement²
                          <br />
                          dV/dt = 2 · displacement · (d_displacement/dt)
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-purple-900 mb-4">🎛️ Filter Parameter Relationships</h4>
                  <p className="text-purple-800 mb-3">
                    In many filters, changing one parameter affects others. Related rates help us understand these
                    interactions.
                  </p>
                  <div className="bg-white p-4 rounded border mb-3">
                    <h5 className="font-semibold text-purple-800 mb-2">Resonant Filter Example:</h5>
                    <div className="bg-gray-50 p-2 rounded">
                      <code className="text-xs">
                        Cutoff frequency: f_c = 1/(2π√(LC))
                        <br />
                        If L is changing: df_c/dt = -1/(4π√(LC)³) · (dL/dt)
                        <br />
                        If C is changing: df_c/dt = -1/(4π√(L³C)) · (dC/dt)
                      </code>
                    </div>
                  </div>
                  <div className="bg-purple-100 p-3 rounded">
                    <strong>Application:</strong> When designing voltage-controlled filters, understanding how component
                    tolerances affect frequency stability over time and temperature.
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-orange-900 mb-4">📊 Mixing Console Example</h4>
                  <p className="text-orange-800 mb-3">
                    On a mixing console, fader positions control both individual channel levels and the overall mix
                    level.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      Total level: L_total = √(L₁² + L₂² + ... + Lₙ²)
                      <br />
                      Rate of change: dL_total/dt = (L₁·dL₁/dt + L₂·dL₂/dt + ... + Lₙ·dLₙ/dt)/L_total
                    </code>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <strong>Practical Use:</strong> Understanding how moving one fader affects the overall mix level
                    helps in designing automatic gain control systems and mix automation.
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-red-900 mb-4">🎚️ Automation Systems</h4>
                  <p className="text-red-800 mb-3">
                    Modern DAWs use related rates to create smooth parameter automation.
                  </p>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border">
                      <strong>Crossfading:</strong> As one track fades out, another fades in. The rates must be
                      coordinated to maintain constant total level.
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <strong>Tempo Changes:</strong> When tempo changes, all time-based effects (delays, LFOs) must
                      adjust their rates proportionally.
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <strong>Key Changes:</strong> Pitch shifters must adjust all harmonics simultaneously while
                      maintaining their relative relationships.
                    </div>
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
              <CardTitle>Curve Sketching and Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Understanding the shape and behavior of functions is crucial for designing audio effects and analyzing
                system responses. Derivatives provide the tools for complete curve analysis.
              </p>

              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-blue-900 mb-4">📈 First Derivative Analysis</h4>
                  <p className="text-blue-800 mb-3">
                    The first derivative tells us where a function is increasing, decreasing, and has local extrema.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      f'(x) &gt; 0: function is increasing
                      <br />
                      f'(x) &lt; 0: function is decreasing
                      <br />
                      f'(x) = 0: critical points (potential max/min)
                      <br />
                      f'(x) undefined: also critical points
                    </code>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <strong>Audio Application:</strong> Analyzing envelope shapes to ensure smooth attack and release
                    phases without unwanted plateaus or reversals.
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-green-900 mb-4">📊 Second Derivative Analysis</h4>
                  <p className="text-green-800 mb-3">
                    The second derivative reveals concavity and helps distinguish between maxima and minima.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      f''(x) &gt; 0: concave up (curve opens upward)
                      <br />
                      f''(x) &lt; 0: concave down (curve opens downward)
                      <br />
                      f''(x) = 0: potential inflection point
                      <br />
                      <br />
                      Second Derivative Test:
                      <br />
                      f'(c) = 0 and f''(c) &gt; 0 → local minimum at x = c
                      <br />
                      f'(c) = 0 and f''(c) &lt; 0 → local maximum at x = c
                    </code>
                  </div>
                  <div className="bg-green-100 p-3 rounded">
                    <strong>Audio Application:</strong> Designing waveshaping functions where the second derivative
                    controls the harmonic content and distortion character.
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-purple-900 mb-4">🎵 Frequency Response Analysis</h4>
                  <p className="text-purple-800 mb-3">
                    Filter frequency responses can be analyzed using curve sketching techniques.
                  </p>
                  <div className="bg-white p-4 rounded border mb-3">
                    <h5 className="font-semibold text-purple-800 mb-2">Low-Pass Filter Response:</h5>
                    <div className="bg-gray-50 p-2 rounded">
                      <code className="text-xs">
                        H(ω) = 1/√(1 + (ω/ω_c)²)
                        <br />
                        H'(ω) = -(ω/ω_c²)/[1 + (ω/ω_c)²]^(3/2)
                        <br />
                        <br />
                        Analysis: H'(ω) &lt; 0 for all ω &gt; 0 (always decreasing)
                        <br />
                        H''(ω) changes sign, creating the characteristic filter curve
                      </code>
                    </div>
                  </div>
                  <div className="bg-purple-100 p-3 rounded">
                    <strong>Insight:</strong> The inflection point in the frequency response corresponds to the filter's
                    cutoff frequency, where the rolloff rate is steepest.
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-orange-900 mb-4">🎛️ Envelope Shape Design</h4>
                  <p className="text-orange-800 mb-3">
                    Different envelope shapes create different musical characteristics. Curve analysis helps design
                    optimal envelopes.
                  </p>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border">
                      <strong>Linear Envelope:</strong> f(t) = mt + b → f'(t) = m (constant rate), f''(t) = 0 (no
                      curvature)
                      <br />
                      <span className="text-sm text-orange-700">Sounds mechanical, often used for special effects</span>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <strong>Exponential Envelope:</strong> f(t) = e^(-t/τ) → f'(t) &lt; 0, f''(t) &gt; 0 (concave up)
                      <br />
                      <span className="text-sm text-orange-700">Natural decay, sounds organic</span>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <strong>S-Curve Envelope:</strong> f(t) = 1/(1 + e^(-t)) → Has inflection point
                      <br />
                      <span className="text-sm text-orange-700">
                        Smooth attack with natural acceleration/deceleration
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-red-900 mb-4">🔍 Complete Curve Analysis Process</h4>
                  <ol className="text-red-800 text-sm space-y-1">
                    <li>1. Find the domain and any discontinuities</li>
                    <li>2. Find x and y intercepts</li>
                    <li>3. Determine asymptotes (horizontal, vertical, oblique)</li>
                    <li>4. Find critical points by solving f'(x) = 0</li>
                    <li>5. Use first derivative test to classify critical points</li>
                    <li>6. Find inflection points by solving f''(x) = 0</li>
                    <li>7. Determine concavity using second derivative</li>
                    <li>8. Sketch the curve using all this information</li>
                  </ol>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Why This Matters in Audio:</h4>
                  <p className="text-yellow-800">
                    Understanding curve behavior helps you predict how audio effects will sound, design better parameter
                    control curves, and troubleshoot unexpected behavior in audio systems. The mathematical analysis
                    directly translates to audible characteristics.
                  </p>
                </div>
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
              <CardDescription>Apply derivative concepts to solve real-world audio processing problems</CardDescription>
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

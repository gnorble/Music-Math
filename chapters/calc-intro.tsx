"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Zap, Calculator, Lightbulb } from "lucide-react"
import { ExerciseCard } from "@/components/exercise-card"

interface CalcIntroProps {
  onComplete: () => void
}

export default function CalcIntro({ onComplete }: CalcIntroProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [completedSections, setCompletedSections] = useState<number[]>([])

  const markSectionComplete = (sectionIndex: number) => {
    if (!completedSections.includes(sectionIndex)) {
      setCompletedSections([...completedSections, sectionIndex])
    }
    if (sectionIndex === 3) {
      // Last section
      onComplete()
    }
  }

  const exercises = [
    {
      id: "derivative-concept",
      question: "What does a derivative represent?",
      type: "multiple-choice" as const,
      options: [
        "The area under a curve",
        "The rate of change at a point",
        "The average value of a function",
        "The maximum value of a function",
      ],
      correctAnswer: 1,
      explanation:
        "A derivative represents the instantaneous rate of change at a specific point. In audio, this could be how quickly volume is changing, or how fast frequency is shifting.",
      hint: "Think about what 'rate of change' means - how fast something is changing at a particular moment.",
      musicalContext:
        "In audio, derivatives help us understand how quickly parameters like volume, pitch, or filter cutoff are changing over time.",
    },
    {
      id: "integral-concept",
      question: "What does an integral represent?",
      type: "multiple-choice" as const,
      options: [
        "The slope of a curve",
        "The rate of change",
        "The area under a curve or total accumulation",
        "The peak value",
      ],
      correctAnswer: 2,
      explanation:
        "An integral represents the area under a curve, which corresponds to total accumulation over time. In audio, this could be total energy in a signal or the cumulative effect of a process.",
      hint: "Think about 'accumulation' - adding up all the little pieces over time.",
      musicalContext:
        "In audio processing, integrals help calculate total signal energy, cumulative distortion, or the overall effect of time-varying processes.",
    },
    {
      id: "notation-recognition",
      question: "What does the notation dy/dx represent?",
      type: "multiple-choice" as const,
      options: ["y divided by x", "The derivative of y with respect to x", "y multiplied by x", "The integral of y"],
      correctAnswer: 1,
      explanation:
        "dy/dx is derivative notation, read as 'the derivative of y with respect to x' or 'how y changes as x changes'. It's not regular division.",
      hint: "This is special mathematical notation, not regular arithmetic division.",
      musicalContext:
        "In audio, you might see dV/dt (how volume changes over time) or df/dt (how frequency changes over time).",
    },
    {
      id: "audio-application",
      question: "In audio processing, what would d(volume)/dt represent?",
      type: "multiple-choice" as const,
      options: ["The total volume", "The average volume", "How quickly the volume is changing", "The maximum volume"],
      correctAnswer: 2,
      explanation:
        "d(volume)/dt is the derivative of volume with respect to time, which tells us the rate at which volume is changing. This is crucial for envelope generators and dynamic processing.",
      hint: "Remember that derivatives measure rates of change. What is 'volume' changing with respect to?",
      musicalContext:
        "This concept is fundamental to ADSR envelopes, compressors, and any effect that changes volume over time. Fast changes create clicks, slow changes create smooth fades.",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Introduction */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <CardTitle className="text-2xl">Introduction to Calculus</CardTitle>
              <CardDescription className="text-lg">
                The mathematics of change and accumulation in audio processing
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={currentSection.toString()} onValueChange={(value) => setCurrentSection(Number.parseInt(value))}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="0" className="text-xs">
            What is Calculus?
          </TabsTrigger>
          <TabsTrigger value="1" className="text-xs">
            Two Main Branches
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
                <Calculator className="w-5 h-5 mr-2" />
                What is Calculus?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Calculus is the mathematical study of continuous change and accumulation. While trigonometry deals with
                periodic patterns, calculus helps us understand how things change over time and how effects accumulate.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Key Insight for Musicians:</h4>
                <p className="text-blue-800">
                  Every time you hear a sound fade in or out, every time you use a filter sweep, every time you apply
                  compression - you're experiencing calculus in action. Calculus describes how audio parameters change
                  over time and how these changes accumulate to create the sounds we hear.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">What Calculus Studies:</h4>
                  <ul className="text-green-800 space-y-1">
                    <li>• Rates of change (how fast things change)</li>
                    <li>• Accumulation over time</li>
                    <li>• Optimization (finding maximum/minimum values)</li>
                    <li>• Areas and volumes</li>
                    <li>• Continuous motion and flow</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Musical Applications:</h4>
                  <ul className="text-purple-800 space-y-1">
                    <li>• Envelope generators (ADSR)</li>
                    <li>• Dynamic range processing</li>
                    <li>• Filter parameter automation</li>
                    <li>• Signal energy calculations</li>
                    <li>• Optimization of audio algorithms</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Real-World Example:</h4>
                <p className="text-yellow-800">
                  When you slowly turn up a volume fader, calculus describes: (1) how fast the volume is changing
                  (derivative), and (2) the total amount of sound energy that has been produced over time (integral).
                  Audio engineers use these concepts to create smooth, natural-sounding changes in music.
                </p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">Why It Matters:</h4>
                <p className="text-red-800">
                  Modern audio processing relies heavily on calculus. Every digital audio workstation, every plugin,
                  every synthesizer uses calculus-based algorithms to process sound. Understanding these concepts helps
                  you make better creative and technical decisions in music production.
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
                <Zap className="w-5 h-5 mr-2" />
                The Two Main Branches
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Calculus has two main branches that are intimately connected: Differential Calculus and Integral
                Calculus. They're like two sides of the same coin.
              </p>

              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-blue-900 mb-4">📈 Differential Calculus (Derivatives)</h4>
                  <p className="text-blue-800 mb-3">
                    Differential calculus studies rates of change - how fast something is changing at any given moment.
                    The main tool is the derivative.
                  </p>

                  <div className="bg-white p-3 rounded border mb-3">
                    <strong>Notation:</strong> <code>dy/dx</code> or <code>f'(x)</code>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-blue-900 mb-2">What it tells us:</h5>
                      <ul className="text-blue-800 text-sm space-y-1">
                        <li>• How steep a curve is at any point</li>
                        <li>• Whether something is increasing or decreasing</li>
                        <li>• How fast parameters are changing</li>
                        <li>• Where maximum and minimum values occur</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-blue-900 mb-2">Musical examples:</h5>
                      <ul className="text-blue-800 text-sm space-y-1">
                        <li>• How quickly volume is fading</li>
                        <li>• Rate of filter cutoff changes</li>
                        <li>• Speed of vibrato oscillation</li>
                        <li>• Attack time in synthesizers</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-green-900 mb-4">📊 Integral Calculus (Integrals)</h4>
                  <p className="text-green-800 mb-3">
                    Integral calculus studies accumulation - adding up all the little changes over time to find the
                    total effect. The main tool is the integral.
                  </p>

                  <div className="bg-white p-3 rounded border mb-3">
                    <strong>Notation:</strong> <code>∫ f(x) dx</code>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-green-900 mb-2">What it tells us:</h5>
                      <ul className="text-green-800 text-sm space-y-1">
                        <li>• Area under curves</li>
                        <li>• Total accumulation over time</li>
                        <li>• Average values over intervals</li>
                        <li>• Total energy or work done</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-green-900 mb-2">Musical examples:</h5>
                      <ul className="text-green-800 text-sm space-y-1">
                        <li>• Total energy in an audio signal</li>
                        <li>• Cumulative effect of compression</li>
                        <li>• Average loudness over time</li>
                        <li>• Total harmonic distortion</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">The Fundamental Theorem of Calculus:</h4>
                <p className="text-purple-800 text-sm">
                  Derivatives and integrals are inverse operations - they "undo" each other. If you take the derivative
                  of an integral, you get back to the original function. This relationship is crucial in audio
                  processing, where we often need to convert between rate-based and accumulation-based representations
                  of signals.
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">Practical Example:</h4>
                <p className="text-orange-800 text-sm">
                  Imagine a volume fader moving up over time. The <strong>position</strong> of the fader is the original
                  function. The <strong>speed</strong> at which it's moving is the derivative. The{" "}
                  <strong>total distance</strong> it has traveled is the integral. All three concepts are related and
                  useful for different aspects of audio control.
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
              <CardTitle>Audio Processing Applications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Let's explore specific ways calculus is used in modern audio processing and music production.
              </p>

              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-blue-900 mb-4">🎛️ ADSR Envelopes</h4>
                  <p className="text-blue-800 mb-3">
                    Attack, Decay, Sustain, Release envelopes use calculus to create smooth volume changes over time.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      Attack: Volume(t) = (1 - e^(-t/τ))
                      <br />
                      Decay: Volume(t) = e^(-t/τ)
                    </code>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <strong>Why Calculus Matters:</strong> The derivative tells us how fast the volume is changing,
                    ensuring smooth transitions without clicks or pops. The integral gives us the total energy delivered
                    during each phase.
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-green-900 mb-4">🔊 Dynamic Range Processing</h4>
                  <p className="text-green-800 mb-3">
                    Compressors and limiters use derivatives to detect how quickly signal levels are changing, then
                    apply gain reduction accordingly.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      Attack Time = how fast the compressor responds to level increases
                      <br />
                      Release Time = how fast it returns to normal after level decreases
                    </code>
                  </div>
                  <div className="bg-green-100 p-3 rounded">
                    <strong>Why Calculus Matters:</strong> The compressor calculates the rate of change of the input
                    signal to determine when and how much to compress. Too fast = distortion, too slow = ineffective.
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-purple-900 mb-4">🎚️ Filter Parameter Automation</h4>
                  <p className="text-purple-800 mb-3">
                    When you automate a filter cutoff frequency, calculus ensures the changes sound smooth and musical.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      Smooth Automation: f(t) = start_freq + (end_freq - start_freq) × curve(t)
                      <br />
                      Where curve(t) uses exponential or logarithmic functions
                    </code>
                  </div>
                  <div className="bg-purple-100 p-3 rounded">
                    <strong>Why Calculus Matters:</strong> Linear changes often sound unnatural. Calculus helps create
                    exponential and logarithmic curves that match how we perceive pitch and frequency changes.
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-red-900 mb-4">📊 Signal Analysis</h4>
                  <p className="text-red-800 mb-3">
                    Spectrum analyzers and metering systems use integrals to calculate total energy, RMS levels, and
                    other important audio measurements.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      RMS Level = √(∫ signal²(t) dt / time_period)
                      <br />
                      Total Energy = ∫ |signal(t)|² dt
                    </code>
                  </div>
                  <div className="bg-red-100 p-3 rounded">
                    <strong>Why Calculus Matters:</strong> These measurements help us understand the true power and
                    impact of audio signals, which is crucial for mixing, mastering, and broadcast compliance.
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-orange-900 mb-4">🎵 Synthesis Algorithms</h4>
                  <p className="text-orange-800 mb-3">
                    Advanced synthesis techniques like FM synthesis and waveshaping use calculus to generate complex
                    timbres from simple mathematical functions.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      FM Synthesis: sin(2πf₁t + β×sin(2πf₂t))
                      <br />
                      Waveshaping: output = tanh(gain × input)
                    </code>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <strong>Why Calculus Matters:</strong> The derivative of the waveshaping function determines the
                    harmonic content. Different curves create different timbres and distortion characteristics.
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">The Big Picture:</h4>
                <p className="text-yellow-800">
                  Every modern audio effect, from simple EQ to complex reverb algorithms, uses calculus to process sound
                  in real-time. Understanding these concepts helps you make more informed decisions about parameter
                  settings and gives you insight into why certain techniques work better than others.
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
                Test your understanding of calculus concepts and their applications in audio
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

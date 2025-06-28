"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Target, Lightbulb } from "lucide-react"
import { ExerciseCard } from "@/components/exercise-card"

interface CalcLimitsProps {
  onComplete: () => void
}

export default function CalcLimits({ onComplete }: CalcLimitsProps) {
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
      id: "limit-concept",
      question: "What does lim[x→2] f(x) = 5 mean?",
      type: "multiple-choice" as const,
      options: ["f(2) = 5", "As x gets close to 2, f(x) gets close to 5", "x = 2 and f(x) = 5", "f(x) is always 5"],
      correctAnswer: 1,
      explanation:
        "A limit describes the behavior of a function as the input approaches a value, not necessarily what happens at that exact value. The function might not even be defined at x = 2.",
      hint: "Think about 'approaching' rather than 'reaching' the value.",
      musicalContext:
        "In digital audio, this is like how we approach perfect sampling - we can get arbitrarily close to continuous audio, but never truly reach it.",
    },
    {
      id: "continuity-audio",
      question: "In digital audio sampling, what does continuity represent?",
      type: "multiple-choice" as const,
      options: [
        "The audio file size",
        "Smooth transitions without gaps or jumps",
        "The bit depth of the audio",
        "The sample rate",
      ],
      correctAnswer: 1,
      explanation:
        "Continuity in audio means smooth, uninterrupted sound without clicks, pops, or sudden jumps. Mathematically, this means the waveform has no breaks or discontinuities.",
      hint: "Think about what makes audio sound smooth versus choppy.",
      musicalContext:
        "Discontinuous audio creates audible artifacts like clicks and pops. Continuous functions help us create smooth fades, filters, and effects.",
    },
    {
      id: "limit-calculation",
      question: "What is lim[x→0] (sin(x)/x)?",
      type: "multiple-choice" as const,
      options: ["0", "1", "∞", "undefined"],
      correctAnswer: 1,
      explanation:
        "This is a famous limit that equals 1. Even though sin(0)/0 is undefined, the limit as x approaches 0 is 1. This limit is fundamental to calculus and appears in many audio processing algorithms.",
      hint: "This is a special limit that you'll see often in calculus. Try graphing sin(x)/x to see what happens near x = 0.",
      musicalContext:
        "This limit appears in the mathematical derivation of many audio effects, particularly in the analysis of sinusoidal signals and their derivatives.",
    },
    {
      id: "sampling-theorem",
      question: "The Nyquist sampling theorem relates to which mathematical concept?",
      type: "multiple-choice" as const,
      options: ["Derivatives", "Integrals", "Limits and continuity", "Trigonometric identities"],
      correctAnswer: 2,
      explanation:
        "The Nyquist theorem deals with the limit of how well we can reconstruct a continuous signal from discrete samples. It's fundamentally about the relationship between discrete and continuous representations.",
      hint: "Think about the relationship between discrete samples and continuous audio signals.",
      musicalContext:
        "Nyquist frequency (half the sample rate) is the theoretical limit for the highest frequency we can accurately represent in digital audio.",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-2xl">Limits and Continuity</CardTitle>
              <CardDescription className="text-lg">
                The foundation of calculus and digital audio processing
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={currentSection.toString()} onValueChange={(value) => setCurrentSection(Number.parseInt(value))}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="0" className="text-xs">
            Understanding Limits
          </TabsTrigger>
          <TabsTrigger value="1" className="text-xs">
            Continuity
          </TabsTrigger>
          <TabsTrigger value="2" className="text-xs">
            Digital Audio
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
                What Are Limits?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                A limit describes what happens to a function as its input gets arbitrarily close to a particular value.
                It's about the behavior near a point, not necessarily at the point itself.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Musical Analogy:</h4>
                <p className="text-blue-800">
                  Imagine slowly turning a volume knob toward zero. The limit describes how the volume behaves as you
                  approach silence, even if you never quite reach perfect silence due to background noise or digital
                  quantization.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Formal Definition:</h4>
                  <p className="text-green-800 mb-2">
                    lim[x→a] f(x) = L means: "As x gets arbitrarily close to a, f(x) gets arbitrarily close to L"
                  </p>
                  <div className="bg-white p-3 rounded border">
                    <code className="text-sm">
                      For any small distance ε from L, there exists a small distance δ from a such that if |x - a| &lt;
                      δ, then |f(x) - L| &lt; ε
                    </code>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Types of Limits:</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <h5 className="font-semibold text-purple-800">One-sided limits:</h5>
                      <ul className="text-purple-700 text-sm space-y-1">
                        <li>• Left limit: lim[x→a⁻] f(x)</li>
                        <li>• Right limit: lim[x→a⁺] f(x)</li>
                        <li>• Must be equal for limit to exist</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-purple-800">Infinite limits:</h5>
                      <ul className="text-purple-700 text-sm space-y-1">
                        <li>• lim[x→a] f(x) = ∞</li>
                        <li>• Function grows without bound</li>
                        <li>• Common in resonant filters</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Audio Example - Filter Resonance:</h4>
                  <p className="text-yellow-800 text-sm">
                    As you increase the resonance (Q factor) of a filter, the gain at the cutoff frequency approaches
                    infinity. In practice, the filter will self-oscillate before reaching true infinity, but the limit
                    concept helps us understand and predict this behavior.
                  </p>
                  <div className="bg-white p-3 rounded border mt-2">
                    <code className="text-sm">lim[Q→∞] Gain(f_cutoff) = ∞</code>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">Common Limit Techniques:</h4>
                  <div className="space-y-2">
                    <div>
                      <strong>1. Direct Substitution:</strong> If f(x) is continuous at x = a, then lim[x→a] f(x) = f(a)
                    </div>
                    <div>
                      <strong>2. Factoring:</strong> Cancel common factors to resolve 0/0 forms
                    </div>
                    <div>
                      <strong>3. L'Hôpital's Rule:</strong> For 0/0 or ∞/∞ forms, take derivatives of numerator and
                      denominator
                    </div>
                    <div>
                      <strong>4. Squeeze Theorem:</strong> Trap the function between two others with known limits
                    </div>
                  </div>
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
                <TrendingUp className="w-5 h-5 mr-2" />
                Continuity in Functions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                A function is continuous at a point if there are no breaks, jumps, or holes in the graph at that point.
                Continuity is essential for smooth audio processing.
              </p>

              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-blue-900 mb-4">Three Conditions for Continuity</h4>
                  <p className="text-blue-800 mb-3">
                    For f(x) to be continuous at x = a, all three conditions must be met:
                  </p>

                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border">
                      <strong>1. f(a) exists</strong> - The function is defined at the point
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <strong>2. lim[x→a] f(x) exists</strong> - The limit exists (left and right limits are equal)
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <strong>3. lim[x→a] f(x) = f(a)</strong> - The limit equals the function value
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-green-900 mb-4">Types of Discontinuities</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded border">
                      <h5 className="font-semibold text-green-800 mb-2">Removable</h5>
                      <p className="text-green-700 text-sm">
                        A "hole" in the graph. Can be "fixed" by redefining the function at one point.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <h5 className="font-semibold text-green-800 mb-2">Jump</h5>
                      <p className="text-green-700 text-sm">
                        Left and right limits exist but are different. Creates a sudden "jump" in the graph.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <h5 className="font-semibold text-green-800 mb-2">Infinite</h5>
                      <p className="text-green-700 text-sm">
                        Function approaches ±∞. Creates a vertical asymptote in the graph.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-purple-900 mb-4">Audio Applications</h4>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border">
                      <h5 className="font-semibold text-purple-800 mb-2">Smooth Parameter Changes</h5>
                      <p className="text-purple-700 text-sm">
                        Continuous functions ensure smooth volume fades, filter sweeps, and effect parameter changes
                        without audible artifacts.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <h5 className="font-semibold text-purple-800 mb-2">Anti-Aliasing</h5>
                      <p className="text-purple-700 text-sm">
                        Continuous band-limited signals prevent aliasing in digital audio systems. Discontinuities in
                        the frequency domain create unwanted artifacts.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <h5 className="font-semibold text-purple-800 mb-2">Envelope Generators</h5>
                      <p className="text-purple-700 text-sm">
                        ADSR envelopes use continuous functions to create smooth attack and release curves, preventing
                        clicks and pops.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">Real-World Example:</h4>
                  <p className="text-orange-800 text-sm">
                    When you move a fader on a mixing console, the volume change must be continuous. A jump
                    discontinuity would create an audible pop. Digital audio workstations use continuous interpolation
                    functions to ensure smooth automation curves.
                  </p>
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
              <CardTitle>Digital Audio and Sampling Theory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Limits and continuity are fundamental to understanding how digital audio systems work and why certain
                artifacts occur.
              </p>

              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-blue-900 mb-4">🎵 The Sampling Process</h4>
                  <p className="text-blue-800 mb-3">
                    Digital audio converts continuous analog signals into discrete digital samples. This process
                    involves limits and approximations.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      Continuous Signal → Sampling → Discrete Samples → Reconstruction → Continuous Output
                    </code>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <strong>Key Insight:</strong> The reconstruction process uses limits to approximate the original
                    continuous signal from discrete samples. Perfect reconstruction is the limit of increasingly fine
                    sampling.
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-green-900 mb-4">📊 Nyquist-Shannon Theorem</h4>
                  <p className="text-green-800 mb-3">
                    This fundamental theorem uses limits to define the relationship between sampling rate and signal
                    bandwidth.
                  </p>
                  <div className="bg-white p-3 rounded border mb-3">
                    <code className="text-sm">
                      f_sample ≥ 2 × f_max
                      <br />
                      (Sample rate must be at least twice the highest frequency)
                    </code>
                  </div>
                  <div className="bg-green-100 p-3 rounded">
                    <strong>Limit Interpretation:</strong> As the sampling rate approaches infinity, the digital
                    representation approaches perfect fidelity to the original analog signal.
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-purple-900 mb-4">🔧 Interpolation and Oversampling</h4>
                  <p className="text-purple-800 mb-3">
                    Audio processing often uses interpolation to create smooth transitions between discrete samples.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded border">
                      <h5 className="font-semibold text-purple-800 mb-2">Linear Interpolation:</h5>
                      <p className="text-purple-700 text-sm">
                        Creates straight lines between samples. Simple but can introduce high-frequency artifacts.
                      </p>
                      <code className="text-xs">y = y₁ + (x-x₁)×(y₂-y₁)/(x₂-x₁)</code>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <h5 className="font-semibold text-purple-800 mb-2">Cubic Interpolation:</h5>
                      <p className="text-purple-700 text-sm">
                        Uses smooth curves between samples. Better approximation of continuous signals.
                      </p>
                      <code className="text-xs">Higher-order polynomial fitting</code>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-red-900 mb-4">⚠️ Discontinuities and Artifacts</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border">
                      <strong>Aliasing:</strong> Occurs when the sampling rate is too low, causing high frequencies to
                      "fold back" into the audible range.
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <strong>Quantization Noise:</strong> Results from rounding continuous amplitude values to discrete
                      levels.
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <strong>Clicks and Pops:</strong> Caused by discontinuities in the audio signal, often from sudden
                      parameter changes.
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-yellow-900 mb-4">🎛️ Practical Applications</h4>
                  <div className="space-y-3">
                    <div>
                      <strong>Sample Rate Conversion:</strong> Uses limits and interpolation to convert between
                      different sampling rates (e.g., 44.1kHz to 48kHz).
                    </div>
                    <div>
                      <strong>Time Stretching:</strong> Algorithms use continuous functions to stretch or compress audio
                      without changing pitch.
                    </div>
                    <div>
                      <strong>Digital Filters:</strong> Implement continuous filter responses using discrete mathematics
                      and limits.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">The Big Picture:</h4>
                <p className="text-orange-800">
                  Every aspect of digital audio processing relies on the mathematical concepts of limits and continuity.
                  Understanding these concepts helps explain why certain sample rates, bit depths, and processing
                  techniques work better than others, and how to avoid common digital audio artifacts.
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
                Test your understanding of limits, continuity, and their applications in digital audio
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

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExerciseCard } from "@/components/exercise-card"
import { ExerciseHelp } from "@/components/exercise-help"
import { CheckCircle, Music, Volume2, Waves, Target, Zap, ExternalLink } from "lucide-react"

interface TrigEquationsProps {
  onComplete: () => void
}

export function TrigEquations({ onComplete }: TrigEquationsProps) {
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())
  const [showHelp, setShowHelp] = useState(false)

  const handleExerciseComplete = (exerciseId: string) => {
    setCompletedExercises((prev) => new Set([...prev, exerciseId]))
  }

  const allExercisesComplete = completedExercises.size >= 6

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          Trigonometric Equations
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Learn to solve trigonometric equations and apply them to audio synthesis, frequency modulation, and musical
          timing systems.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => window.open("/calculator.html", "_blank")} variant="outline">
            <ExternalLink className="w-4 h-4 mr-2" />
            Calculator
          </Button>
          <Button onClick={() => setShowHelp(true)} variant="outline">
            Help
          </Button>
        </div>
      </div>

      {/* Progress Indicator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Progress: {completedExercises.size}/6 exercises completed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedExercises.size / 6) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Types of Trigonometric Equations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Types of Trigonometric Equations
          </CardTitle>
          <CardDescription>Understanding different categories and solution strategies</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="quadratic">Quadratic</TabsTrigger>
              <TabsTrigger value="multiple">Multiple Angle</TabsTrigger>
              <TabsTrigger value="systems">Systems</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Trigonometric Equations</h3>
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <p className="font-mono">sin θ = k</p>
                <p className="font-mono">cos θ = k</p>
                <p className="font-mono">tan θ = k</p>
              </div>
              <Alert>
                <Music className="h-4 w-4" />
                <AlertDescription>
                  <strong>Audio Example:</strong> Finding when a sine wave oscillator reaches specific amplitude values,
                  crucial for envelope timing and modulation.
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="quadratic" className="space-y-4">
              <h3 className="text-lg font-semibold">Quadratic in Trigonometric Functions</h3>
              <div className="bg-green-50 p-4 rounded-lg space-y-2">
                <p className="font-mono">2sin²θ - 3sin θ + 1 = 0</p>
                <p className="font-mono">cos²θ - cos θ - 2 = 0</p>
              </div>
              <Alert>
                <Volume2 className="h-4 w-4" />
                <AlertDescription>
                  <strong>Synthesis Application:</strong> These equations model complex waveform behaviors in FM
                  synthesis and waveshaping algorithms.
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="multiple" className="space-y-4">
              <h3 className="text-lg font-semibold">Multiple Angle Equations</h3>
              <div className="bg-purple-50 p-4 rounded-lg space-y-2">
                <p className="font-mono">sin(2θ) = sin θ</p>
                <p className="font-mono">cos(3θ) = cos θ</p>
              </div>
              <Alert>
                <Waves className="h-4 w-4" />
                <AlertDescription>
                  <strong>Harmonic Analysis:</strong> Essential for understanding when harmonics align with the
                  fundamental frequency in musical instruments.
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="systems" className="space-y-4">
              <h3 className="text-lg font-semibold">Systems of Trigonometric Equations</h3>
              <div className="bg-orange-50 p-4 rounded-lg space-y-2">
                <p className="font-mono">sin θ + cos θ = 1</p>
                <p className="font-mono">sin θ - cos θ = 0</p>
              </div>
              <Alert>
                <Zap className="h-4 w-4" />
                <AlertDescription>
                  <strong>Phase Relationships:</strong> Used in stereo processing and quadrature modulation in audio
                  effects.
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Solution Strategies */}
      <Card>
        <CardHeader>
          <CardTitle>Solution Strategies</CardTitle>
          <CardDescription>Systematic approaches to solving trigonometric equations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">General Solution Method</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Isolate the trigonometric function</li>
                <li>Find the reference angle</li>
                <li>Determine all angles in [0, 2π)</li>
                <li>Write the general solution</li>
                <li>Apply any given restrictions</li>
              </ol>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Special Techniques</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Factoring trigonometric expressions</li>
                <li>Using trigonometric identities</li>
                <li>Substitution methods</li>
                <li>Graphical interpretation</li>
                <li>Numerical approximation</li>
              </ul>
            </div>
          </div>

          <Separator />

          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="font-semibold text-indigo-800 mb-2">Musical Timing Example</h3>
            <p className="text-sm text-indigo-700">
              In music, if a metronome oscillates according to sin(ωt) = 0.5, we need to solve for when the click
              occurs. This gives us t = (1/ω)[arcsin(0.5) + 2πn] or t = (1/ω)[π - arcsin(0.5) + 2πn], where n is any
              integer.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Exercises */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Practice Exercises</h2>

        <ExerciseCard
          id="basic-equation"
          title="Basic Sine Equation"
          description="Solve a fundamental sine equation with musical context"
          difficulty="Easy"
          onComplete={() => handleExerciseComplete("basic-equation")}
          isCompleted={completedExercises.has("basic-equation")}
        >
          <div className="space-y-4">
            <p>An audio oscillator follows the equation sin(θ) = 0.5. Find all solutions in the interval [0, 2π].</p>
            <div className="space-y-2">
              <Label htmlFor="sine-solutions">Solutions: θ = </Label>
              <Input id="sine-solutions" placeholder="Enter all solutions separated by commas" />
            </div>
            <Alert>
              <AlertDescription>
                <strong>Hint:</strong> sin(θ) = 0.5 when θ = π/6 and θ = 5π/6. These represent the points where the
                oscillator reaches half amplitude.
              </AlertDescription>
            </Alert>
          </div>
        </ExerciseCard>

        <ExerciseCard
          id="quadratic-trig"
          title="Quadratic Trigonometric Equation"
          description="Solve equations quadratic in trigonometric functions"
          difficulty="Medium"
          onComplete={() => handleExerciseComplete("quadratic-trig")}
          isCompleted={completedExercises.has("quadratic-trig")}
        >
          <div className="space-y-4">
            <p>In FM synthesis, a modulator follows: 2cos²θ - cos θ - 1 = 0. Solve for θ in [0, 2π].</p>
            <div className="space-y-2">
              <Label htmlFor="quadratic-solutions">Solutions: θ = </Label>
              <Input id="quadratic-solutions" placeholder="Treat as quadratic in cos θ" />
            </div>
            <Alert>
              <AlertDescription>
                <strong>FM Synthesis:</strong> These solutions determine the modulation points that create specific
                harmonic content in the synthesized sound.
              </AlertDescription>
            </Alert>
          </div>
        </ExerciseCard>

        <ExerciseCard
          id="double-angle-equation"
          title="Double Angle Equation"
          description="Solve equations involving double angles"
          difficulty="Medium"
          onComplete={() => handleExerciseComplete("double-angle-equation")}
          isCompleted={completedExercises.has("double-angle-equation")}
        >
          <div className="space-y-4">
            <p>A harmonic analyzer detects: sin(2θ) = sin(θ). Find all solutions in [0, 2π].</p>
            <div className="space-y-2">
              <Label htmlFor="double-angle-solutions">Solutions: θ = </Label>
              <Input id="double-angle-solutions" placeholder="Use double angle identity" />
            </div>
            <Alert>
              <AlertDescription>
                <strong>Harmonic Analysis:</strong> This equation identifies when the second harmonic aligns with the
                fundamental frequency.
              </AlertDescription>
            </Alert>
          </div>
        </ExerciseCard>

        <ExerciseCard
          id="system-equations"
          title="System of Trigonometric Equations"
          description="Solve simultaneous trigonometric equations"
          difficulty="Hard"
          onComplete={() => handleExerciseComplete("system-equations")}
          isCompleted={completedExercises.has("system-equations")}
        >
          <div className="space-y-4">
            <p>In stereo processing: sin θ + cos θ = √2 and sin θ - cos θ = 0. Find θ.</p>
            <div className="space-y-2">
              <Label htmlFor="system-solution">Solution: θ = </Label>
              <Input id="system-solution" placeholder="Solve the system simultaneously" />
            </div>
            <Alert>
              <AlertDescription>
                <strong>Stereo Processing:</strong> This system determines the phase relationship for optimal stereo
                imaging.
              </AlertDescription>
            </Alert>
          </div>
        </ExerciseCard>

        <ExerciseCard
          id="frequency-modulation"
          title="Frequency Modulation Equation"
          description="Apply trigonometric equations to FM synthesis"
          difficulty="Hard"
          onComplete={() => handleExerciseComplete("frequency-modulation")}
          isCompleted={completedExercises.has("frequency-modulation")}
        >
          <div className="space-y-4">
            <p>An FM synthesizer uses: sin(ωt + β sin(ωₘt)) = 0.707. If β = 1 and ωₘt = π/4, find ωt.</p>
            <div className="space-y-2">
              <Label htmlFor="fm-solution">Solution: ωt = </Label>
              <Input id="fm-solution" placeholder="Substitute and solve" />
            </div>
            <Alert>
              <AlertDescription>
                <strong>FM Synthesis:</strong> This determines the carrier frequency timing for specific amplitude
                targets in frequency modulation.
              </AlertDescription>
            </Alert>
          </div>
        </ExerciseCard>

        <ExerciseCard
          id="beat-frequency"
          title="Beat Frequency Analysis"
          description="Use trigonometric equations to analyze beat frequencies"
          difficulty="Hard"
          onComplete={() => handleExerciseComplete("beat-frequency")}
          isCompleted={completedExercises.has("beat-frequency")}
        >
          <div className="space-y-4">
            <p>Two oscillators create beats: cos(440t) + cos(442t) = 0. Find when destructive interference occurs.</p>
            <div className="space-y-2">
              <Label htmlFor="beat-solution">First occurrence: t = </Label>
              <Input id="beat-solution" placeholder="Use sum-to-product identities" />
            </div>
            <Alert>
              <AlertDescription>
                <strong>Beat Analysis:</strong> This calculation is essential for tuning instruments and understanding
                acoustic interference patterns.
              </AlertDescription>
            </Alert>
          </div>
        </ExerciseCard>
      </div>

      {/* Applications in Audio Technology */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Advanced Applications in Audio Technology
          </CardTitle>
          <CardDescription>Real-world applications of trigonometric equations in music technology</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold">Digital Audio Workstations (DAWs)</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Crossfade curve calculations</li>
                <li>• Automation curve interpolation</li>
                <li>• Phase alignment in multi-track recording</li>
                <li>• Time-stretching algorithms</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Live Sound Engineering</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Speaker array delay calculations</li>
                <li>• Room acoustics modeling</li>
                <li>• Feedback elimination</li>
                <li>• Crossover network design</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Completion Section */}
      {allExercisesComplete && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Chapter Complete!
            </CardTitle>
            <CardDescription className="text-green-700">
              You've mastered trigonometric equations and their applications in audio synthesis and analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Basic Equations</Badge>
                <Badge variant="secondary">Quadratic Forms</Badge>
                <Badge variant="secondary">Multiple Angles</Badge>
                <Badge variant="secondary">Systems</Badge>
                <Badge variant="secondary">FM Synthesis</Badge>
                <Badge variant="secondary">Beat Analysis</Badge>
              </div>
              <Button onClick={onComplete} className="w-full" size="lg">
                I Understand - Continue to Music Theory Applications
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Modal */}
      {showHelp && <ExerciseHelp onClose={() => setShowHelp(false)} />}
    </div>
  )
}

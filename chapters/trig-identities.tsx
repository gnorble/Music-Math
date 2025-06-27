"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ExerciseCard } from "@/components/exercise-card"
import { ExerciseHelp } from "@/components/exercise-help"
import { CheckCircle, Music, Volume2, Waves, ExternalLink } from "lucide-react"

interface TrigIdentitiesProps {
  onComplete: () => void
}

export function TrigIdentities({ onComplete }: TrigIdentitiesProps) {
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())
  const [showHelp, setShowHelp] = useState(false)

  const handleExerciseComplete = (exerciseId: string) => {
    setCompletedExercises((prev) => new Set([...prev, exerciseId]))
  }

  const allExercisesComplete = completedExercises.size >= 5

  const openCalculator = () => {
    window.open("/calculator.html", "_blank", "width=400,height=600")
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Trigonometric Identities
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Master the fundamental relationships between trigonometric functions and their applications in music synthesis
          and audio processing.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={openCalculator} variant="outline">
            <ExternalLink className="w-4 h-4 mr-2" />
            Calculator
          </Button>
          <Button onClick={() => setShowHelp(true)} variant="outline">
            <ExerciseHelp />
          </Button>
        </div>
      </div>

      {/* Progress Indicator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Progress: {completedExercises.size}/5 exercises completed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedExercises.size / 5) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Fundamental Identities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="w-5 h-5" />
            Fundamental Trigonometric Identities
          </CardTitle>
          <CardDescription>
            Essential relationships that form the foundation of trigonometric manipulation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Pythagorean Identities</h3>
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <p className="font-mono text-lg">sin²θ + cos²θ = 1</p>
                <p className="font-mono text-lg">1 + tan²θ = sec²θ</p>
                <p className="font-mono text-lg">1 + cot²θ = csc²θ</p>
              </div>
              <p className="text-sm text-muted-foreground">
                These identities are crucial for audio signal processing, where sine and cosine waves represent the
                fundamental components of sound.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Reciprocal Identities</h3>
              <div className="bg-green-50 p-4 rounded-lg space-y-2">
                <p className="font-mono text-lg">csc θ = 1/sin θ</p>
                <p className="font-mono text-lg">sec θ = 1/cos θ</p>
                <p className="font-mono text-lg">cot θ = 1/tan θ</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Used in audio compression algorithms and digital filter design.
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quotient Identities</h3>
            <div className="bg-purple-50 p-4 rounded-lg space-y-2">
              <p className="font-mono text-lg">tan θ = sin θ / cos θ</p>
              <p className="font-mono text-lg">cot θ = cos θ / sin θ</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Essential for phase relationships in stereo audio and spatial audio processing.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Sum and Difference Identities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Waves className="w-5 h-5" />
            Sum and Difference Identities
          </CardTitle>
          <CardDescription>Critical for understanding frequency modulation and harmonic analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-orange-50 p-4 rounded-lg space-y-2">
              <h4 className="font-semibold">Sine Identities</h4>
              <p className="font-mono">sin(A ± B) = sin A cos B ± cos A sin B</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg space-y-2">
              <h4 className="font-semibold">Cosine Identities</h4>
              <p className="font-mono">cos(A ± B) = cos A cos B ∓ sin A sin B</p>
            </div>
          </div>

          <Alert>
            <Volume2 className="h-4 w-4" />
            <AlertDescription>
              <strong>Musical Application:</strong> These identities explain how two sine waves of different frequencies
              combine to create beat frequencies and modulation effects in synthesizers.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Double Angle Identities */}
      <Card>
        <CardHeader>
          <CardTitle>Double Angle Identities</CardTitle>
          <CardDescription>Used in harmonic generation and frequency doubling circuits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-indigo-50 p-4 rounded-lg space-y-2">
            <p className="font-mono text-lg">sin(2θ) = 2 sin θ cos θ</p>
            <p className="font-mono text-lg">cos(2θ) = cos²θ - sin²θ = 2cos²θ - 1 = 1 - 2sin²θ</p>
            <p className="font-mono text-lg">tan(2θ) = 2tan θ / (1 - tan²θ)</p>
          </div>
          <p className="text-sm text-muted-foreground">
            These identities are fundamental in understanding how harmonics are generated in musical instruments and
            audio distortion effects.
          </p>
        </CardContent>
      </Card>

      {/* Interactive Exercises */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Practice Exercises</h2>

        <ExerciseCard
          id="pythagorean-identity"
          title="Pythagorean Identity Application"
          description="Use the fundamental Pythagorean identity to solve audio processing problems"
          difficulty="Medium"
          onComplete={() => handleExerciseComplete("pythagorean-identity")}
          isCompleted={completedExercises.has("pythagorean-identity")}
        >
          <div className="space-y-4">
            <p>If sin θ = 0.6 in an audio signal, what is cos θ? (Assume θ is in the first quadrant)</p>
            <div className="space-y-2">
              <Label htmlFor="cos-value">cos θ = </Label>
              <Input id="cos-value" placeholder="Enter your answer" />
            </div>
            <Alert>
              <AlertDescription>
                <strong>Hint:</strong> Use sin²θ + cos²θ = 1. Since sin θ = 0.6, find cos θ by solving 0.36 + cos²θ = 1.
              </AlertDescription>
            </Alert>
          </div>
        </ExerciseCard>

        <ExerciseCard
          id="sum-identity"
          title="Sum Identity for Frequency Modulation"
          description="Apply sum identities to understand how two audio frequencies combine"
          difficulty="Hard"
          onComplete={() => handleExerciseComplete("sum-identity")}
          isCompleted={completedExercises.has("sum-identity")}
        >
          <div className="space-y-4">
            <p>
              Two audio oscillators generate sin(440t) and sin(880t). Using sum identities, express sin(440t + 880t) in
              terms of products.
            </p>
            <div className="space-y-2">
              <Label htmlFor="sum-result">sin(1320t) = </Label>
              <Input id="sum-result" placeholder="Express using sum identity" />
            </div>
            <Alert>
              <AlertDescription>
                <strong>Musical Context:</strong> This represents combining a 440Hz tone (A4) with its octave (880Hz) to
                create a 1320Hz component.
              </AlertDescription>
            </Alert>
          </div>
        </ExerciseCard>

        <ExerciseCard
          id="double-angle"
          title="Double Angle in Harmonic Generation"
          description="Use double angle identities to understand harmonic distortion"
          difficulty="Medium"
          onComplete={() => handleExerciseComplete("double-angle")}
          isCompleted={completedExercises.has("double-angle")}
        >
          <div className="space-y-4">
            <p>
              If an audio signal has amplitude cos(πt/4), what is the amplitude of its second harmonic using the double
              angle formula?
            </p>
            <div className="space-y-2">
              <Label htmlFor="harmonic-amp">Second harmonic amplitude = </Label>
              <Input id="harmonic-amp" placeholder="Use cos(2θ) identity" />
            </div>
            <Alert>
              <AlertDescription>
                <strong>Audio Application:</strong> This models how tube amplifiers and analog distortion create
                harmonic content.
              </AlertDescription>
            </Alert>
          </div>
        </ExerciseCard>

        <ExerciseCard
          id="identity-verification"
          title="Identity Verification"
          description="Prove trigonometric identities using algebraic manipulation"
          difficulty="Hard"
          onComplete={() => handleExerciseComplete("identity-verification")}
          isCompleted={completedExercises.has("identity-verification")}
        >
          <div className="space-y-4">
            <p>Prove that: (sin θ + cos θ)² = 1 + 2sin θ cos θ</p>
            <div className="space-y-2">
              <Label htmlFor="proof-steps">Show your work step by step:</Label>
              <textarea
                id="proof-steps"
                className="w-full p-2 border rounded"
                rows={4}
                placeholder="Expand the left side and simplify..."
              />
            </div>
            <Alert>
              <AlertDescription>
                <strong>Hint:</strong> Expand (sin θ + cos θ)² and use the Pythagorean identity.
              </AlertDescription>
            </Alert>
          </div>
        </ExerciseCard>

        <ExerciseCard
          id="audio-phase"
          title="Phase Relationships in Audio"
          description="Apply identities to understand phase relationships in stereo audio"
          difficulty="Medium"
          onComplete={() => handleExerciseComplete("audio-phase")}
          isCompleted={completedExercises.has("audio-phase")}
        >
          <div className="space-y-4">
            <p>
              In stereo audio, the left channel is sin(ωt) and the right channel is cos(ωt). Express the right channel
              in terms of sine using identities.
            </p>
            <div className="space-y-2">
              <Label htmlFor="phase-conversion">cos(ωt) = sin(?)</Label>
              <Input id="phase-conversion" placeholder="Express cos in terms of sin" />
            </div>
            <Alert>
              <AlertDescription>
                <strong>Stereo Imaging:</strong> This phase relationship creates the stereo width and spatial
                positioning in audio mixing.
              </AlertDescription>
            </Alert>
          </div>
        </ExerciseCard>
      </div>

      {/* Completion Section */}
      {allExercisesComplete && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Chapter Complete!
            </CardTitle>
            <CardDescription className="text-green-700">
              You've mastered trigonometric identities and their applications in music technology.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Pythagorean Identities</Badge>
                <Badge variant="secondary">Sum/Difference Formulas</Badge>
                <Badge variant="secondary">Double Angle Identities</Badge>
                <Badge variant="secondary">Audio Applications</Badge>
                <Badge variant="secondary">Phase Relationships</Badge>
              </div>
              <Button onClick={onComplete} className="w-full" size="lg">
                I Understand - Continue to Inverse Functions
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

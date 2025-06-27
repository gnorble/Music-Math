"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { ExerciseCard } from "@/components/exercise-card"
import { ExerciseHelp } from "@/components/exercise-help"
import { CheckCircle, Music, Volume2, Waves, RotateCcw, ExternalLink } from "lucide-react"

interface TrigInverseProps {
  onComplete: () => void
}

export function TrigInverse({ onComplete }: TrigInverseProps) {
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())
  const [showHelp, setShowHelp] = useState(false)
  const [inputValue, setInputValue] = useState([0.5])
  const [selectedFunction, setSelectedFunction] = useState("arcsin")

  const handleExerciseComplete = (exerciseId: string) => {
    setCompletedExercises((prev) => new Set([...prev, exerciseId]))
  }

  const allExercisesComplete = completedExercises.size >= 5

  const calculateInverse = (func: string, value: number) => {
    switch (func) {
      case "arcsin":
        return Math.asin(value) * (180 / Math.PI)
      case "arccos":
        return Math.acos(value) * (180 / Math.PI)
      case "arctan":
        return Math.atan(value) * (180 / Math.PI)
      default:
        return 0
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Inverse Trigonometric Functions
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover how to work backwards from ratios to angles, essential for audio analysis and musical tuning systems.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => window.open("/calculator.html", "_blank")} variant="outline">
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
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedExercises.size / 5) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Introduction to Inverse Functions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5" />
            Understanding Inverse Trigonometric Functions
          </CardTitle>
          <CardDescription>The reverse process: finding angles when you know the ratios</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-blue-800">Arcsine (sin⁻¹)</h3>
              <p className="font-mono text-lg">sin⁻¹(x) = θ</p>
              <p className="text-sm text-muted-foreground">Domain: [-1, 1]</p>
              <p className="text-sm text-muted-foreground">Range: [-π/2, π/2]</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-green-800">Arccosine (cos⁻¹)</h3>
              <p className="font-mono text-lg">cos⁻¹(x) = θ</p>
              <p className="text-sm text-muted-foreground">Domain: [-1, 1]</p>
              <p className="text-sm text-muted-foreground">Range: [0, π]</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-orange-800">Arctangent (tan⁻¹)</h3>
              <p className="font-mono text-lg">tan⁻¹(x) = θ</p>
              <p className="text-sm text-muted-foreground">Domain: (-∞, ∞)</p>
              <p className="text-sm text-muted-foreground">Range: (-π/2, π/2)</p>
            </div>
          </div>

          <Alert>
            <Music className="h-4 w-4" />
            <AlertDescription>
              <strong>Musical Application:</strong> Inverse trig functions are used in audio analysis to determine the
              phase angle of complex audio signals and in pitch detection algorithms.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Interactive Inverse Function Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Waves className="w-5 h-5" />
            Interactive Inverse Function Explorer
          </CardTitle>
          <CardDescription>Experiment with inverse trigonometric functions and see their results</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Function:</Label>
                <div className="flex gap-2">
                  {["arcsin", "arccos", "arctan"].map((func) => (
                    <Button
                      key={func}
                      variant={selectedFunction === func ? "default" : "outline"}
                      onClick={() => setSelectedFunction(func)}
                      size="sm"
                    >
                      {func}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Input Value: {inputValue[0].toFixed(3)}</Label>
                <Slider
                  value={inputValue}
                  onValueChange={setInputValue}
                  min={selectedFunction === "arctan" ? -5 : -1}
                  max={selectedFunction === "arctan" ? 5 : 1}
                  step={0.001}
                  className="w-full"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Result:</h3>
              <p className="text-2xl font-mono">
                {selectedFunction}({inputValue[0].toFixed(3)}) ={" "}
                {calculateInverse(selectedFunction, inputValue[0]).toFixed(2)}°
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Radians: {((calculateInverse(selectedFunction, inputValue[0]) * Math.PI) / 180).toFixed(4)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications in Music Technology */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            Applications in Music Technology
          </CardTitle>
          <CardDescription>How inverse trig functions are used in audio processing and music analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Phase Detection</h3>
              <p className="text-sm text-muted-foreground">
                In audio analysis, we often need to find the phase angle of a complex signal. If we have the real and
                imaginary components, we use:
              </p>
              <div className="bg-blue-50 p-3 rounded font-mono">phase = arctan(imaginary / real)</div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Pitch Detection</h3>
              <p className="text-sm text-muted-foreground">
                Auto-correlation functions in pitch detection algorithms use inverse trigonometric functions to
                determine fundamental frequencies.
              </p>
              <div className="bg-green-50 p-3 rounded font-mono">correlation_angle = arccos(correlation_value)</div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stereo Imaging and Panning</h3>
            <p className="text-sm text-muted-foreground">
              In stereo audio processing, inverse trig functions help calculate pan positions and stereo width:
            </p>
            <div className="bg-purple-50 p-3 rounded font-mono">pan_angle = arctan(right_channel / left_channel)</div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Exercises */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Practice Exercises</h2>

        <ExerciseCard
          id="basic-inverse"
          title="Basic Inverse Calculations"
          description="Calculate inverse trigonometric values for audio signal analysis"
          difficulty="Easy"
          onComplete={() => handleExerciseComplete("basic-inverse")}
          isCompleted={completedExercises.has("basic-inverse")}
        >
          <div className="space-y-4">
            <p>
              An audio signal has a sine component with amplitude 0.707. What is the corresponding angle in degrees?
            </p>
            <div className="space-y-2">
              <Label htmlFor="angle-result">arcsin(0.707) = </Label>
              <Input id="angle-result" placeholder="Enter angle in degrees" />
            </div>
            <Alert>
              <AlertDescription>
                <strong>Audio Context:</strong> This represents a signal at 45° phase, commonly found in balanced audio
                systems.
              </AlertDescription>
            </Alert>
          </div>
        </ExerciseCard>

        <ExerciseCard
          id="phase-calculation"
          title="Phase Angle Calculation"
          description="Determine phase angles from complex audio signals"
          difficulty="Medium"
          onComplete={() => handleExerciseComplete("phase-calculation")}
          isCompleted={completedExercises.has("phase-calculation")}
        >
          <div className="space-y-4">
            <p>A complex audio signal has real component 3 and imaginary component 4. Calculate the phase angle.</p>
            <div className="space-y-2">
              <Label htmlFor="phase-angle">Phase angle = arctan(4/3) = </Label>
              <Input id="phase-angle" placeholder="Enter phase angle in degrees" />
            </div>
            <Alert>
              <AlertDescription>
                <strong>Signal Processing:</strong> This calculation is fundamental in FFT analysis and digital audio
                effects.
              </AlertDescription>
            </Alert>
          </div>
        </ExerciseCard>

        <ExerciseCard
          id="stereo-panning"
          title="Stereo Pan Position"
          description="Calculate stereo pan positions using inverse trigonometric functions"
          difficulty="Medium"
          onComplete={() => handleExerciseComplete("stereo-panning")}
          isCompleted={completedExercises.has("stereo-panning")}
        >
          <div className="space-y-4">
            <p>In a stereo mix, the left channel amplitude is 0.6 and right channel is 0.8. Calculate the pan angle.</p>
            <div className="space-y-2">
              <Label htmlFor="pan-angle">Pan angle = arctan(0.8/0.6) = </Label>
              <Input id="pan-angle" placeholder="Enter pan angle in degrees" />
            </div>
            <Alert>
              <AlertDescription>
                <strong>Mixing Application:</strong> This determines how far right the sound source appears in the
                stereo field.
              </AlertDescription>
            </Alert>
          </div>
        </ExerciseCard>

        <ExerciseCard
          id="frequency-analysis"
          title="Frequency Domain Analysis"
          description="Use inverse functions in spectral analysis of musical signals"
          difficulty="Hard"
          onComplete={() => handleExerciseComplete("frequency-analysis")}
          isCompleted={completedExercises.has("frequency-analysis")}
        >
          <div className="space-y-4">
            <p>In FFT analysis, a frequency bin has magnitude 10 and phase component 6. What is the phase angle?</p>
            <div className="space-y-2">
              <Label htmlFor="fft-phase">Phase angle = </Label>
              <Input id="fft-phase" placeholder="Calculate using appropriate inverse function" />
            </div>
            <Alert>
              <AlertDescription>
                <strong>Spectral Analysis:</strong> This type of calculation is essential for understanding harmonic
                content in musical instruments.
              </AlertDescription>
            </Alert>
          </div>
        </ExerciseCard>

        <ExerciseCard
          id="pitch-detection"
          title="Pitch Detection Algorithm"
          description="Apply inverse functions in autocorrelation-based pitch detection"
          difficulty="Hard"
          onComplete={() => handleExerciseComplete("pitch-detection")}
          isCompleted={completedExercises.has("pitch-detection")}
        >
          <div className="space-y-4">
            <p>
              An autocorrelation function returns a maximum correlation value of 0.866. What is the corresponding angle
              that indicates pitch strength?
            </p>
            <div className="space-y-2">
              <Label htmlFor="pitch-strength">Correlation angle = arccos(0.866) = </Label>
              <Input id="pitch-strength" placeholder="Enter angle in degrees" />
            </div>
            <Alert>
              <AlertDescription>
                <strong>Pitch Detection:</strong> Lower angles indicate stronger pitch detection confidence in audio
                analysis algorithms.
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
              You've mastered inverse trigonometric functions and their applications in audio analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Inverse Functions</Badge>
                <Badge variant="secondary">Phase Detection</Badge>
                <Badge variant="secondary">Pitch Analysis</Badge>
                <Badge variant="secondary">Stereo Processing</Badge>
                <Badge variant="secondary">FFT Analysis</Badge>
              </div>
              <Button onClick={onComplete} className="w-full" size="lg">
                I Understand - Continue to Trigonometric Equations
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

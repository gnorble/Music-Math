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
import { Slider } from "@/components/ui/slider"
import { ExerciseCard } from "@/components/exercise-card"
import { ExerciseHelp } from "@/components/exercise-help"
import { CheckCircle, Music, Volume2, Waves, Piano, Mic, Radio, ExternalLink } from "lucide-react"

interface MusicTheoryApplicationsProps {
  onComplete: () => void
}

export function MusicTheoryApplications({ onComplete }: MusicTheoryApplicationsProps) {
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())
  const [showHelp, setShowHelp] = useState(false)
  const [frequency, setFrequency] = useState([440])
  const [harmonicNumber, setHarmonicNumber] = useState([2])

  const handleExerciseComplete = (exerciseId: string) => {
    setCompletedExercises((prev) => new Set([...prev, exerciseId]))
  }

  const allExercisesComplete = completedExercises.size >= 6

  const calculateHarmonic = (fundamental: number, harmonic: number) => {
    return fundamental * harmonic
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Applications in Music Theory
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore how trigonometry forms the mathematical foundation of music theory, from harmonic series to
          temperament systems and acoustic phenomena.
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
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedExercises.size / 6) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Harmonic Series and Overtones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Waves className="w-5 h-5" />
            The Harmonic Series
          </CardTitle>
          <CardDescription>
            Understanding how trigonometry explains the natural harmonic series in musical instruments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              The harmonic series is a fundamental concept in music theory, where each harmonic is a sine wave at
              integer multiples of the fundamental frequency.
            </p>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Harmonic Series Formula</h3>
              <p className="font-mono text-lg">f_n = n × f_0</p>
              <p className="text-sm text-muted-foreground">
                where f_n is the nth harmonic and f_0 is the fundamental frequency
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fundamental Frequency: {frequency[0]} Hz</Label>
                <Slider
                  value={frequency}
                  onValueChange={setFrequency}
                  min={100}
                  max={1000}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Harmonic Number: {harmonicNumber[0]}</Label>
                <Slider
                  value={harmonicNumber}
                  onValueChange={setHarmonicNumber}
                  min={1}
                  max={16}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Harmonic Calculation:</h3>
              <p className="text-xl font-mono">
                {harmonicNumber[0]}th harmonic = {calculateHarmonic(frequency[0], harmonicNumber[0])} Hz
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Trigonometric Representation</h3>
            <p className="text-sm text-muted-foreground">
              A complex musical tone can be represented as a sum of sine waves:
            </p>
            <div className="bg-green-50 p-4 rounded-lg font-mono">
              y(t) = A₁sin(2πf₀t) + A₂sin(4πf₀t) + A₃sin(6πf₀t) + ...
            </div>
            <Alert>
              <Music className="h-4 w-4" />
              <AlertDescription>
                Each term represents a harmonic, with the amplitude A_n determining the timbre of the instrument.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Temperament Systems */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Piano className="w-5 h-5" />
            Temperament Systems and Tuning
          </CardTitle>
          <CardDescription>How trigonometry is used in different tuning systems and temperaments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="equal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="equal">Equal Temperament</TabsTrigger>
              <TabsTrigger value="just">Just Intonation</TabsTrigger>
              <TabsTrigger value="pythagorean">Pythagorean</TabsTrigger>
            </TabsList>

            <TabsContent value="equal" className="space-y-4">
              <h3 className="text-lg font-semibold">Equal Temperament</h3>
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <p className="font-mono">f_n = f_0 × 2^(n/12)</p>
                <p className="text-sm">where n is the number of semitones from the reference frequency</p>
              </div>
              <Alert>
                <AlertDescription>
                  <strong>Modern Standard:</strong> This system divides the octave into 12 equal parts, making all keys
                  sound equally in tune.
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="just" className="space-y-4">
              <h3 className="text-lg font-semibold">Just Intonation</h3>
              <div className="bg-green-50 p-4 rounded-lg space-y-2">
                <p>Based on simple integer ratios:</p>
                <p className="font-mono">Perfect Fifth: 3:2 ratio</p>
                <p className="font-mono">Major Third: 5:4 ratio</p>
                <p className="font-mono">Perfect Fourth: 4:3 ratio</p>
              </div>
              <Alert>
                <AlertDescription>
                  <strong>Pure Harmonics:</strong> This system produces the most consonant intervals but limits
                  modulation between keys.
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="pythagorean" className="space-y-4">
              <h3 className="text-lg font-semibold">Pythagorean Tuning</h3>
              <div className="bg-purple-50 p-4 rounded-lg space-y-2">
                <p>Based on perfect fifths (3:2 ratio):</p>
                <p className="font-mono">f_n = f_0 × (3/2)^n × 2^(-⌊n×log₂(3/2)⌋)</p>
              </div>
              <Alert>
                <AlertDescription>
                  <strong>Historical System:</strong> Creates pure fifths but results in a very dissonant major third
                  (81:64 ratio).
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Beat Frequencies and Interference */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            Beat Frequencies and Acoustic Interference
          </CardTitle>
          <CardDescription>
            Understanding how trigonometry explains beats and interference patterns in music
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-lg space-y-2">
            <h3 className="font-semibold">Beat Frequency Formula</h3>
            <p className="font-mono">cos(2πf₁t) + cos(2πf₂t) = 2cos(2π((f₁+f₂)/2)t)cos(2π((f₁-f₂)/2)t)</p>
            <p className="text-sm">Beat frequency = |f₁ - f₂|</p>
          </div>

          <Alert>
            <Mic className="h-4 w-4" />
            <AlertDescription>
              <strong>Tuning Application:</strong> Musicians use beats to tune instruments by listening for the beating
              to slow down and disappear as frequencies match.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Interactive Exercises */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Practice Exercises</h2>

        <ExerciseCard
          id="harmonic-calculation"
          title="Harmonic Series Calculation"
          description="Calculate harmonics for musical instruments"
          difficulty="Easy"
          onComplete={() => handleExerciseComplete("harmonic-calculation")}
          isCompleted={completedExercises.has("harmonic-calculation")}
        >
          <div className="space-y-4">
            <p>
              A violin string has a fundamental frequency of 196 Hz (G3). Calculate the frequency of the 5th harmonic.
            </p>
            <div className="space-y-2">
              <Label htmlFor="harmonic-freq">5th harmonic frequency = </Label>
              <Input id="harmonic-freq" placeholder="Enter frequency in Hz" />
            </div>
            <Alert>
              <AlertDescription>
                <strong>Musical Context:</strong> The 5th harmonic contributes to the bright, brilliant sound
                characteristic of string instruments.
              </AlertDescription>
            </Alert>
          </div>
        </ExerciseCard>

        <ExerciseCard
          id="equal-temperament"
          title="Equal Temperament Calculation"
          description="Calculate frequencies in equal temperament system"
          difficulty="Medium"
          onComplete={() => handleExerciseComplete("equal-temperament")}
          isCompleted={completedExercises.has("equal-temperament")}
        >
          <div className="space-y-4">
            <p>If A4 = 440 Hz, calculate the frequency of C5 (4 semitones higher) using equal temperament.</p>
            <div className="space-y-2">
              <Label htmlFor="c5-freq">C5 frequency = </Label>
              <Input id="c5-freq" placeholder="Use f = 440 × 2^(n/12)" />
            </div>
            <Alert>
              <AlertDescription>
                <strong>Piano Tuning:</strong> This calculation is fundamental to piano tuning and electronic keyboard
                programming.
              </AlertDescription>
            </Alert>
          </div>
        </ExerciseCard>

        <ExerciseCard
          id="beat-frequency"
          title="Beat Frequency Analysis"
          description="Calculate beat frequencies for tuning applications"
          difficulty="Medium"
          onComplete={() => handleExerciseComplete("beat-frequency")}
          isCompleted={completedExercises.has("beat-frequency")}
        >
          <div className="space-y-4">
            <p>
              Two tuning forks vibrate at 440 Hz and 444 Hz. Calculate the beat frequency heard when both sound
              together.
            </p>
            <div className="space-y-2">
              <Label htmlFor="beat-freq">Beat frequency = </Label>
              <Input id="beat-freq" placeholder="Enter beat frequency in Hz" />
            </div>
            <Alert>
              <AlertDescription>
                <strong>Tuning Application:</strong> Piano tuners use this principle to achieve precise tuning by
                eliminating beats.
              </AlertDescription>
            </Alert>
          </div>
        </ExerciseCard>

        <ExerciseCard
          id="just-intonation"
          title="Just Intonation Ratios"
          description="Calculate frequencies using just intonation ratios"
          difficulty="Medium"
          onComplete={() => handleExerciseComplete("just-intonation")}
          isCompleted={completedExercises.has("just-intonation")}
        >
          <div className="space-y-4">
            <p>In just intonation, if C = 264 Hz, calculate the frequency of E (major third, 5:4 ratio).</p>
            <div className="space-y-2">
              <Label htmlFor="just-e">E frequency = </Label>
              <Input id="just-e" placeholder="Use 5:4 ratio" />
            </div>
            <Alert>
              <AlertDescription>
                <strong>Choir Tuning:</strong> A cappella choirs often naturally sing in just intonation for maximum
                consonance.
              </AlertDescription>
            </Alert>
          </div>
        </ExerciseCard>

        <ExerciseCard
          id="cent-deviation"
          title="Cent Deviation Calculation"
          description="Calculate the difference between temperament systems in cents"
          difficulty="Hard"
          onComplete={() => handleExerciseComplete("cent-deviation")}
          isCompleted={completedExercises.has("cent-deviation")}
        >
          <div className="space-y-4">
            <p>
              Compare the major third in equal temperament (400 cents) with just intonation (5:4 ratio). Calculate the
              difference in cents.
            </p>
            <div className="space-y-2">
              <Label htmlFor="cent-diff">Difference = </Label>
              <Input id="cent-diff" placeholder="Use 1200 × log₂(ratio) formula" />
            </div>
            <Alert>
              <AlertDescription>
                <strong>Temperament Analysis:</strong> This calculation shows why some intervals sound more consonant in
                different tuning systems.
              </AlertDescription>
            </Alert>
          </div>
        </ExerciseCard>

        <ExerciseCard
          id="complex-waveform"
          title="Complex Waveform Analysis"
          description="Analyze a complex musical waveform using trigonometric series"
          difficulty="Hard"
          onComplete={() => handleExerciseComplete("complex-waveform")}
          isCompleted={completedExercises.has("complex-waveform")}
        >
          <div className="space-y-4">
            <p>
              A clarinet produces a waveform: y(t) = sin(2π×220t) + 0.3sin(6π×220t) + 0.1sin(10π×220t). Identify the
              fundamental and harmonic frequencies.
            </p>
            <div className="space-y-2">
              <Label htmlFor="fundamental">Fundamental frequency = </Label>
              <Input id="fundamental" placeholder="Enter fundamental frequency" />
              <Label htmlFor="harmonics">Present harmonics = </Label>
              <Input id="harmonics" placeholder="List harmonic numbers" />
            </div>
            <Alert>
              <AlertDescription>
                <strong>Timbre Analysis:</strong> This type of analysis explains why different instruments playing the
                same note sound different.
              </AlertDescription>
            </Alert>
          </div>
        </ExerciseCard>
      </div>

      {/* Advanced Applications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="w-5 h-5" />
            Advanced Applications in Music Technology
          </CardTitle>
          <CardDescription>Cutting-edge applications of trigonometry in modern music technology</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold">Digital Audio Processing</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Fourier Transform analysis</li>
                <li>• Digital filter design</li>
                <li>• Audio compression algorithms</li>
                <li>• Spatial audio processing</li>
                <li>• Noise reduction techniques</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Music Information Retrieval</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Automatic chord recognition</li>
                <li>• Beat tracking algorithms</li>
                <li>• Music similarity analysis</li>
                <li>• Genre classification</li>
                <li>• Audio fingerprinting</li>
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
              You've mastered the applications of trigonometry in music theory and audio technology.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Harmonic Series</Badge>
                <Badge variant="secondary">Temperament Systems</Badge>
                <Badge variant="secondary">Beat Frequencies</Badge>
                <Badge variant="secondary">Just Intonation</Badge>
                <Badge variant="secondary">Equal Temperament</Badge>
                <Badge variant="secondary">Waveform Analysis</Badge>
              </div>
              <Button onClick={onComplete} className="w-full" size="lg">
                I Understand - Continue to Calculus Introduction
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

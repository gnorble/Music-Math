"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExerciseCard } from "@/components/exercise-card"
import { Calculator, Music, Volume2, Zap, BarChart3, Target } from "lucide-react"

interface CalcApplicationsProps {
  onComplete: () => void
}

export default function CalcApplications({ onComplete }: CalcApplicationsProps) {
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
          Calculus Chapter 8
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900">Applications of Integration</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Apply integration to solve real-world problems in audio engineering: calculating areas, volumes, work, fluid
          flow, and advanced signal processing applications.
        </p>
      </div>

      <Tabs defaultValue="area-volume" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="area-volume">Area & Volume</TabsTrigger>
          <TabsTrigger value="physics">Physics Applications</TabsTrigger>
          <TabsTrigger value="audio-advanced">Advanced Audio</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
        </TabsList>

        <TabsContent value="area-volume" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                Area Between Curves
              </CardTitle>
              <CardDescription>Finding areas bounded by multiple functions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Area Between Two Curves</h4>
                <p className="text-blue-800 mb-2 font-mono">A = ∫[a to b] |f(x) - g(x)| dx</p>
                <p className="text-blue-700 text-sm">
                  Where f(x) ≥ g(x) on the interval [a, b]. Find intersection points to determine limits.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Vertical Strips</h4>
                  <p className="text-green-800 text-sm mb-2">When integrating with respect to x:</p>
                  <p className="text-green-800 font-mono text-sm">A = ∫[a to b] (f(x) - g(x)) dx</p>
                  <p className="text-green-700 text-xs mt-2">Use when functions are easily expressed as y = f(x)</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Horizontal Strips</h4>
                  <p className="text-purple-800 text-sm mb-2">When integrating with respect to y:</p>
                  <p className="text-purple-800 font-mono text-sm">A = ∫[c to d] (f(y) - g(y)) dy</p>
                  <p className="text-purple-700 text-xs mt-2">
                    Use when functions are more easily expressed as x = f(y)
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">Audio Application: Waveform Analysis</h4>
                <p className="text-orange-800 mb-2">
                  The area between two audio waveforms represents the difference in their energy content:
                </p>
                <p className="text-orange-800 font-mono text-sm mb-2">
                  Energy_Difference = ∫[0 to T] |x₁(t) - x₂(t)|² dt
                </p>
                <p className="text-orange-700 text-sm">
                  This is used in audio comparison algorithms and noise reduction techniques.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-500" />
                Volumes of Revolution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Disk Method</h4>
                <p className="text-green-800 mb-2">Rotating around the x-axis:</p>
                <p className="text-green-800 font-mono text-sm mb-2">V = π ∫[a to b] [f(x)]² dx</p>
                <p className="text-green-700 text-sm">Each cross-section is a disk with radius f(x).</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Washer Method</h4>
                <p className="text-blue-800 mb-2">When there's a hole (rotating between two curves):</p>
                <p className="text-blue-800 font-mono text-sm mb-2">V = π ∫[a to b] ([f(x)]² - [g(x)]²) dx</p>
                <p className="text-blue-700 text-sm">Outer radius f(x), inner radius g(x).</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Shell Method</h4>
                <p className="text-purple-800 mb-2">Rotating around a vertical line:</p>
                <p className="text-purple-800 font-mono text-sm mb-2">V = 2π ∫[a to b] x · f(x) dx</p>
                <p className="text-purple-700 text-sm">Each shell has radius x and height f(x).</p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">Audio Application: Speaker Cone Design</h4>
                <p className="text-red-800 mb-2">
                  Speaker cone volumes affect acoustic properties. For a cone described by y = f(x):
                </p>
                <p className="text-red-800 font-mono text-sm">Volume = π ∫[0 to L] [f(x)]² dx</p>
                <p className="text-red-700 text-sm mt-2">
                  This helps optimize cone shape for desired frequency response.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="physics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Work and Energy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Work Done by Variable Force</h4>
                <p className="text-yellow-800 mb-2 font-mono">W = ∫[a to b] F(x) dx</p>
                <p className="text-yellow-700 text-sm">
                  When force F varies with position x, work is the integral of force over distance.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Spring Work</h4>
                  <p className="text-blue-800 text-sm mb-2">Hooke's Law: F = kx</p>
                  <p className="text-blue-800 font-mono text-sm mb-2">W = ∫[0 to d] kx dx = ½kd²</p>
                  <p className="text-blue-700 text-xs">Work to compress/stretch spring distance d</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Pumping Liquids</h4>
                  <p className="text-green-800 text-sm mb-2">Work to pump liquid from tank:</p>
                  <p className="text-green-800 font-mono text-sm">W = ∫ ρg · h(y) · A(y) dy</p>
                  <p className="text-green-700 text-xs mt-1">ρ = density, g = gravity, h = height, A = area</p>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Audio Application: Speaker Magnet Work</h4>
                <p className="text-purple-800 mb-2">Work done by magnetic force on speaker voice coil:</p>
                <p className="text-purple-800 font-mono text-sm mb-2">W = ∫[0 to x] B(x) · I · L dx</p>
                <p className="text-purple-700 text-sm">
                  Where B(x) is magnetic field strength, I is current, L is coil length.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fluid Pressure and Force</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-teal-50 p-4 rounded-lg">
                <h4 className="font-semibold text-teal-900 mb-2">Hydrostatic Pressure</h4>
                <p className="text-teal-800 mb-2">Pressure at depth h in fluid:</p>
                <p className="text-teal-800 font-mono text-sm mb-2">P = ρgh</p>
                <p className="text-teal-700 text-sm">ρ = fluid density, g = gravitational acceleration, h = depth</p>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-900 mb-2">Force on Submerged Surface</h4>
                <p className="text-indigo-800 mb-2">Total force on a vertical surface:</p>
                <p className="text-indigo-800 font-mono text-sm mb-2">F = ∫[a to b] ρg · h(y) · w(y) dy</p>
                <p className="text-indigo-700 text-sm">h(y) = depth at height y, w(y) = width at height y</p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">Audio Application: Microphone Diaphragm</h4>
                <p className="text-orange-800 mb-2">
                  Air pressure variations on microphone diaphragm create electrical signals:
                </p>
                <p className="text-orange-800 font-mono text-sm">F(t) = ∫∫ P(x,y,t) dA</p>
                <p className="text-orange-700 text-sm mt-2">
                  Pressure integrated over diaphragm area gives total force causing vibration.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Center of Mass and Moments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Center of Mass Formula</h4>
                <p className="text-sm mb-2">For a region with density ρ(x,y):</p>
                <div className="font-mono text-sm space-y-1">
                  <p>x̄ = (1/m) ∫∫ x · ρ(x,y) dA</p>
                  <p>ȳ = (1/m) ∫∫ y · ρ(x,y) dA</p>
                  <p>m = ∫∫ ρ(x,y) dA</p>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">Audio Application: Speaker Balance</h4>
                <p className="text-red-800 text-sm">
                  Center of mass calculations help design balanced speaker drivers and optimize cabinet weight
                  distribution for minimal vibration.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audio-advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="w-5 h-5 text-purple-500" />
                Advanced Signal Processing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Convolution Integral</h4>
                <p className="text-purple-800 mb-2">The output of a linear time-invariant system:</p>
                <p className="text-purple-800 font-mono text-sm mb-2">y(t) = ∫[-∞ to ∞] x(τ)h(t-τ) dτ = x(t) * h(t)</p>
                <p className="text-purple-700 text-sm">
                  Fundamental operation in digital signal processing for filters and effects.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Autocorrelation Function</h4>
                <p className="text-blue-800 mb-2">Measures similarity of signal with delayed version of itself:</p>
                <p className="text-blue-800 font-mono text-sm mb-2">R_xx(τ) = ∫[-∞ to ∞] x(t)x(t-τ) dt</p>
                <p className="text-blue-700 text-sm">Used in pitch detection and echo analysis.</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Cross-Correlation</h4>
                <p className="text-green-800 mb-2">Measures similarity between two different signals:</p>
                <p className="text-green-800 font-mono text-sm mb-2">R_xy(τ) = ∫[-∞ to ∞] x(t)y(t-τ) dt</p>
                <p className="text-green-700 text-sm">Essential for audio alignment and pattern matching.</p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Power Spectral Density</h4>
                <p className="text-yellow-800 mb-2">Frequency domain representation of signal power:</p>
                <p className="text-yellow-800 font-mono text-sm mb-2">S_xx(f) = ∫[-∞ to ∞] R_xx(τ)e^(-j2πfτ) dτ</p>
                <p className="text-yellow-700 text-sm">Shows how signal power is distributed across frequencies.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-red-500" />
                Acoustic Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">Room Impulse Response</h4>
                <p className="text-red-800 mb-2">The acoustic response of a room to an impulse:</p>
                <p className="text-red-800 font-mono text-sm mb-2">h_room(t) = Σ α_i δ(t - t_i)</p>
                <p className="text-red-700 text-sm">
                  Integration over time gives total acoustic energy and reverberation characteristics.
                </p>
              </div>

              <div className="bg-teal-50 p-4 rounded-lg">
                <h4 className="font-semibold text-teal-900 mb-2">Sound Intensity</h4>
                <p className="text-teal-800 mb-2">Average intensity over time period T:</p>
                <p className="text-teal-800 font-mono text-sm mb-2">I = (1/T) ∫[0 to T] p(t)v(t) dt</p>
                <p className="text-teal-700 text-sm">Where p(t) is pressure and v(t) is particle velocity.</p>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-900 mb-2">Doppler Effect Integration</h4>
                <p className="text-indigo-800 mb-2">For continuously varying velocity:</p>
                <p className="text-indigo-800 font-mono text-sm mb-2">
                  f_observed = f_source / (1 + (1/c)∫[0 to t] v(τ) dτ)
                </p>
                <p className="text-indigo-700 text-sm">Used in audio effects and spatial audio processing.</p>
              </div>

              <Button onClick={() => window.open("/calculator.html", "_blank")} className="w-full" variant="outline">
                <Calculator className="w-4 h-4 mr-2" />
                Advanced Integration Calculator
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exercises" className="space-y-6">
          <div className="grid gap-6">
            <ExerciseCard
              id={1}
              title="Area Between Curves"
              difficulty="Medium"
              problem="Find the area between y = x² and y = 2x from x = 0 to x = 2"
              solution="First find intersection: x² = 2x → x² - 2x = 0 → x(x-2) = 0, so x = 0, 2. Since 2x ≥ x² on [0,2]: Area = ∫[0 to 2] (2x - x²) dx = [x² - x³/3] from 0 to 2 = (4 - 8/3) - 0 = 12/3 - 8/3 = 4/3"
              hint="Determine which function is on top by testing a point in the interval"
              onComplete={() => handleExerciseComplete(1)}
            />

            <ExerciseCard
              id={2}
              title="Volume of Revolution"
              difficulty="Medium"
              problem="Find the volume when y = √x is rotated about the x-axis from x = 0 to x = 4"
              solution="Using disk method: V = π ∫[0 to 4] (√x)² dx = π ∫[0 to 4] x dx = π [x²/2] from 0 to 4 = π(16/2 - 0) = 8π cubic units"
              hint="Use the disk method: V = π ∫[a to b] [f(x)]² dx"
              onComplete={() => handleExerciseComplete(2)}
            />

            <ExerciseCard
              id={3}
              title="Work Problem"
              difficulty="Hard"
              problem="A spring has natural length 10 cm. A force of 20 N is required to compress it to 8 cm. How much work is done compressing it from 10 cm to 6 cm?"
              solution="First find k: F = kx, so 20 = k(2), thus k = 10 N/cm. Work = ∫[0 to 4] 10x dx = 10[x²/2] from 0 to 4 = 10(16/2) = 80 J. Note: x represents compression distance from natural length."
              hint="Use Hooke's law F = kx to find the spring constant first"
              onComplete={() => handleExerciseComplete(3)}
            />

            <ExerciseCard
              id={4}
              title="Audio Signal Analysis"
              difficulty="Hard"
              problem="An audio signal x(t) = e^(-t)cos(10πt) for t ≥ 0 represents a damped oscillation. Calculate the total energy E = ∫[0 to ∞] |x(t)|² dt."
              solution="E = ∫[0 to ∞] |e^(-t)cos(10πt)|² dt = ∫[0 to ∞] e^(-2t)cos²(10πt) dt. Using cos²(u) = (1 + cos(2u))/2: E = ∫[0 to ∞] e^(-2t)(1 + cos(20πt))/2 dt = (1/2)[∫[0 to ∞] e^(-2t) dt + ∫[0 to ∞] e^(-2t)cos(20πt) dt]. First integral = 1/4. Second integral = 2/(4 + 400π²). Total: E = (1/2)[1/4 + 2/(4 + 400π²)] ≈ 0.125"
              hint="Use the identity cos²(x) = (1 + cos(2x))/2 and integration by parts for the cosine term"
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
                  <h3 className="text-xl font-bold text-green-800">Calculus Course Complete!</h3>
                  <p className="text-green-700">
                    Congratulations! You've completed the entire calculus section and mastered integration applications
                    in audio engineering. You're now ready to apply these mathematical tools to advanced audio
                    processing and signal analysis.
                  </p>
                  <Button onClick={onComplete} className="bg-green-600 hover:bg-green-700">
                    Course Complete - Return to Main Menu
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

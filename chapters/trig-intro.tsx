"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Music, AudioWaveformIcon as Waveform, Calculator, Lightbulb, BookOpen, Play } from "lucide-react"
import { ExerciseCard } from "@/components/exercise-card"

interface TrigIntroProps {
  onComplete: () => void
}

export default function TrigIntro({ onComplete }: TrigIntroProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [completedSections, setCompletedSections] = useState<number[]>([])

  const markSectionComplete = (sectionIndex: number) => {
    if (!completedSections.includes(sectionIndex)) {
      setCompletedSections([...completedSections, sectionIndex])
    }
    if (sectionIndex === 4) {
      // Last section
      onComplete()
    }
  }

  const exercises = [
    {
      id: "etymology",
      question: "What does the word 'trigonometry' literally mean?",
      type: "multiple-choice" as const,
      options: ["Triangle measurement", "Circle calculation", "Wave analysis", "Sound mathematics"],
      correctAnswer: 0,
      explanation:
        "Trigonometry comes from Greek: 'trigonon' (triangle) + 'metron' (measure). It literally means 'triangle measurement', though it has expanded far beyond just triangles.",
      hint: "Think about the Greek roots of the word.",
      musicalContext:
        "Just like how musical terms often have Latin or Italian origins (forte, piano, allegro), mathematical terms often come from Greek or Latin roots.",
    },
    {
      id: "periodic-motion",
      question: "Which musical phenomenon is the best example of periodic motion?",
      type: "multiple-choice" as const,
      options: ["A single drum hit", "A sustained violin note", "Applause from an audience", "A guitar being tuned"],
      correctAnswer: 1,
      explanation:
        "A sustained violin note creates a repeating wave pattern - the string vibrates back and forth in a regular, periodic motion. This creates the consistent pitch we hear.",
      hint: "Think about which option involves regular, repeating motion.",
      musicalContext:
        "Periodic motion in music creates pitch. The faster the vibration (higher frequency), the higher the pitch we perceive.",
    },
    {
      id: "modern-applications",
      question: "Which modern music technology relies heavily on trigonometry?",
      type: "multiple-choice" as const,
      options: ["Acoustic guitars", "Digital audio workstations (DAWs)", "Drum sticks", "Music stands"],
      correctAnswer: 1,
      explanation:
        "Digital Audio Workstations use trigonometry extensively for audio processing, effects, synthesis, and analysis. Every digital effect you hear uses mathematical functions.",
      hint: "Consider which option involves digital processing and computer calculations.",
      musicalContext:
        "Modern music production is deeply mathematical. Every reverb, delay, EQ, and synthesizer uses trigonometric functions to process sound.",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Introduction */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Music className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-2xl">Welcome to Trigonometry for Musicians</CardTitle>
              <CardDescription className="text-lg">
                Discover the mathematical language that describes all sound and music
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={currentSection.toString()} onValueChange={(value) => setCurrentSection(Number.parseInt(value))}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="0" className="text-xs">
            What is Trig?
          </TabsTrigger>
          <TabsTrigger value="1" className="text-xs">
            History
          </TabsTrigger>
          <TabsTrigger value="2" className="text-xs">
            Music Connection
          </TabsTrigger>
          <TabsTrigger value="3" className="text-xs">
            Modern Uses
          </TabsTrigger>
          <TabsTrigger value="4" className="text-xs">
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="0" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="w-5 h-5 mr-2" />
                What is Trigonometry?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Trigonometry is the branch of mathematics that studies the relationships between angles and sides in
                triangles, and more broadly, the mathematics of periodic phenomena - things that repeat in regular
                patterns.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Key Insight for Musicians:</h4>
                <p className="text-blue-800">
                  Every sound you hear - from a simple sine wave to complex orchestral music - can be described using
                  trigonometric functions. Sound waves are periodic (they repeat), and trigonometry is the mathematics
                  of periodic motion.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">What Trigonometry Studies:</h4>
                  <ul className="text-green-800 space-y-1">
                    <li>• Angles and their relationships</li>
                    <li>• Circular motion and rotation</li>
                    <li>• Wave patterns and oscillations</li>
                    <li>• Periodic (repeating) phenomena</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Musical Applications:</h4>
                  <ul className="text-purple-800 space-y-1">
                    <li>• Sound wave analysis</li>
                    <li>• Audio synthesis</li>
                    <li>• Digital effects processing</li>
                    <li>• Harmonic analysis</li>
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
                <BookOpen className="w-5 h-5 mr-2" />A Brief History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Trigonometry has ancient roots, developed by civilizations who needed to understand cycles, navigation,
                and construction.
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-lg">Ancient Babylonians (2000 BCE)</h4>
                  <p className="text-gray-700">
                    Created the first trigonometric tables to track celestial movements and seasonal cycles - the same
                    periodic patterns we see in music.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-lg">Ancient Greeks (300 BCE)</h4>
                  <p className="text-gray-700">
                    Hipparchus and Ptolemy formalized trigonometry for astronomy. They understood that circular motion
                    could be described mathematically - just like sound waves.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-lg">Islamic Golden Age (800-1200 CE)</h4>
                  <p className="text-gray-700">
                    Mathematicians like Al-Battani refined trigonometric functions and introduced the concept of sine
                    and cosine - the fundamental building blocks of all sound.
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-lg">Modern Era (1600s-present)</h4>
                  <p className="text-gray-700">
                    With the development of calculus and digital computers, trigonometry became essential for audio
                    processing, synthesis, and all modern music technology.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Musical Connection:</h4>
                <p className="text-yellow-800">
                  Just as ancient astronomers used trigonometry to understand the "music of the spheres" (the
                  mathematical harmony they believed governed planetary motion), we now use the same mathematics to
                  understand actual music and sound.
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
              <CardTitle className="flex items-center">
                <Waveform className="w-5 h-5 mr-2" />
                The Music Connection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Music and trigonometry are intimately connected because sound itself is trigonometric in nature.
              </p>

              <div className="grid gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-blue-900 mb-3">Sound Waves = Sine Waves</h4>
                  <p className="text-blue-800 mb-3">
                    Every pure tone you hear is literally a sine wave - one of the fundamental trigonometric functions.
                    When you play an A440 note, you're creating 440 sine wave cycles per second.
                  </p>
                  <div className="bg-white p-3 rounded border">
                    <code className="text-sm">A440 = sin(2π × 440 × time)</code>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-green-900 mb-3">Complex Sounds = Multiple Sine Waves</h4>
                  <p className="text-green-800 mb-3">
                    Every complex sound - a violin, a voice, a guitar chord - is actually a combination of multiple sine
                    waves at different frequencies and amplitudes. This is called Fourier analysis.
                  </p>
                  <div className="bg-white p-3 rounded border">
                    <code className="text-sm">Complex Sound = sin(f₁) + sin(f₂) + sin(f₃) + ...</code>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-purple-900 mb-3">
                    Musical Intervals = Mathematical Ratios
                  </h4>
                  <p className="text-purple-800 mb-3">
                    The intervals that sound harmonious to us (octaves, fifths, fourths) correspond to simple
                    mathematical ratios that create constructive interference patterns between sine waves.
                  </p>
                  <div className="bg-white p-3 rounded border space-y-1">
                    <div>
                      <code className="text-sm">Octave = 2:1 frequency ratio</code>
                    </div>
                    <div>
                      <code className="text-sm">Perfect Fifth = 3:2 frequency ratio</code>
                    </div>
                    <div>
                      <code className="text-sm">Perfect Fourth = 4:3 frequency ratio</code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">Try This:</h4>
                <p className="text-orange-800">
                  Next time you hear music, remember: your ear is essentially doing trigonometric analysis in real-time,
                  separating complex waveforms into their component frequencies so your brain can perceive melody,
                  harmony, and rhythm.
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
                <Play className="w-5 h-5 mr-2" />
                Modern Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Today's music technology is built on trigonometric foundations. Here's where you encounter it:
              </p>

              <div className="grid gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">🎛️ Digital Audio Workstations (DAWs)</h4>
                  <ul className="text-blue-800 space-y-1">
                    <li>• EQ filters use trigonometric functions to boost/cut frequencies</li>
                    <li>• Reverb algorithms simulate acoustic spaces using wave mathematics</li>
                    <li>• Compression uses trigonometric curves to control dynamics</li>
                    <li>• Spectral analysis shows frequency content using Fourier transforms</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">🎹 Synthesizers</h4>
                  <ul className="text-green-800 space-y-1">
                    <li>• Oscillators generate sine, square, triangle, and sawtooth waves</li>
                    <li>• LFOs (Low Frequency Oscillators) create vibrato and tremolo effects</li>
                    <li>• Filters shape harmonic content using resonant curves</li>
                    <li>• Envelopes control amplitude over time using exponential curves</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">🎧 Audio Effects</h4>
                  <ul className="text-purple-800 space-y-1">
                    <li>• Chorus and flangers use delayed sine wave modulation</li>
                    <li>• Phasers shift the phase relationships between frequencies</li>
                    <li>• Distortion uses trigonometric waveshaping functions</li>
                    <li>• Auto-tune analyzes and corrects pitch using frequency detection</li>
                  </ul>
                </div>

                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">📱 Streaming & Compression</h4>
                  <ul className="text-red-800 space-y-1">
                    <li>• MP3 compression uses trigonometric transforms to reduce file size</li>
                    <li>• Spotify's algorithms analyze harmonic content for recommendations</li>
                    <li>• Noise reduction uses spectral analysis to identify and remove unwanted sounds</li>
                    <li>• Spatial audio creates 3D soundscapes using phase and amplitude relationships</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">The Big Picture:</h4>
                <p className="text-yellow-800">
                  Every time you stream music, use Auto-Tune, apply reverb, or even just play a digital piano, you're
                  using technology that depends on trigonometric mathematics. Understanding these foundations will make
                  you a more informed musician and producer.
                </p>
              </div>

              <Button
                onClick={() => markSectionComplete(3)}
                className="w-full"
                disabled={completedSections.includes(3)}
              >
                {completedSections.includes(3) ? "✓ Section Complete" : "Mark Section Complete"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="4" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Practice Exercises
              </CardTitle>
              <CardDescription>Test your understanding of trigonometry's role in music</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {exercises.map((exercise, index) => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    onComplete={() => {
                      if (index === exercises.length - 1) {
                        markSectionComplete(4)
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
        {[0, 1, 2, 3, 4].map((section) => (
          <div
            key={section}
            className={`w-3 h-3 rounded-full ${completedSections.includes(section) ? "bg-green-500" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  )
}

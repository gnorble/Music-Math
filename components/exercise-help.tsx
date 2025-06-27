"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, HelpCircle, BookOpen, Calculator, Music } from "lucide-react"

interface ExerciseHelpProps {
  onClose?: () => void
}

export function ExerciseHelp({ onClose }: ExerciseHelpProps) {
  if (!onClose) {
    return (
      <Button variant="outline" size="sm" className="flex items-center space-x-1 bg-transparent">
        <HelpCircle className="w-4 h-4" />
        <span>Help</span>
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Exercise Help
            </CardTitle>
            <CardDescription>Tips and strategies for solving mathematical problems</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">General Tips</TabsTrigger>
              <TabsTrigger value="trig">Trigonometry</TabsTrigger>
              <TabsTrigger value="music">Music Context</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Read Carefully</h3>
                    <p className="text-sm text-gray-600">
                      Take time to understand what the question is asking. Identify the given information and what you
                      need to find.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calculator className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Use the Calculator</h3>
                    <p className="text-sm text-gray-600">
                      Don't hesitate to use the built-in calculator for complex calculations. It supports both degrees
                      and radians.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Problem-Solving Steps:</h4>
                  <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
                    <li>Identify what type of problem it is</li>
                    <li>Write down what you know</li>
                    <li>Choose the appropriate formula or method</li>
                    <li>Substitute values and calculate</li>
                    <li>Check if your answer makes sense</li>
                  </ol>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="trig" className="space-y-4">
              <div className="space-y-4">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Special Angles to Remember:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-purple-700">
                    <div>sin(30°) = 1/2</div>
                    <div>cos(30°) = √3/2</div>
                    <div>sin(45°) = √2/2</div>
                    <div>cos(45°) = √2/2</div>
                    <div>sin(60°) = √3/2</div>
                    <div>cos(60°) = 1/2</div>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Key Identities:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <div>sin²θ + cos²θ = 1</div>
                    <div>tan θ = sin θ / cos θ</div>
                    <div>sin(90° - θ) = cos θ</div>
                  </div>
                </div>

                <div className="bg-orange-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Unit Circle Tips:</h4>
                  <ul className="list-disc list-inside text-sm text-orange-700 space-y-1">
                    <li>Coordinates are (cos θ, sin θ)</li>
                    <li>Positive angles go counterclockwise</li>
                    <li>One full rotation = 360° = 2π radians</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="music" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Music className="w-5 h-5 text-purple-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Think in Musical Terms</h3>
                    <p className="text-sm text-gray-600">
                      Many problems relate to real musical concepts. Try to visualize the audio or musical scenario
                      being described.
                    </p>
                  </div>
                </div>

                <div className="bg-indigo-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 mb-2">Common Musical Applications:</h4>
                  <ul className="list-disc list-inside text-sm text-indigo-700 space-y-1">
                    <li>Sine waves represent pure tones</li>
                    <li>Frequency determines pitch (440 Hz = A4)</li>
                    <li>Phase relationships affect stereo imaging</li>
                    <li>Harmonics are integer multiples of fundamental frequency</li>
                    <li>Beat frequencies = |f₁ - f₂|</li>
                  </ul>
                </div>

                <div className="bg-pink-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-pink-800 mb-2">Audio Processing Context:</h4>
                  <ul className="list-disc list-inside text-sm text-pink-700 space-y-1">
                    <li>LFOs create vibrato and tremolo effects</li>
                    <li>Filters use trigonometry to shape frequency response</li>
                    <li>Panning uses cos/sin for stereo positioning</li>
                    <li>FFT analysis breaks complex sounds into sine waves</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

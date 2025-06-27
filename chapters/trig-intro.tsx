"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Brain, History, Music } from "lucide-react"

interface TrigIntroProps {
  onNextChapter: () => void
}

export function TrigIntro({ onNextChapter }: TrigIntroProps) {
  return (
    <div className="space-y-6">
      <Alert>
        <Brain className="h-4 w-4" />
        <AlertTitle>For Humanities Learners</AlertTitle>
        <AlertDescription>
          This introduction is designed specifically for those coming from non-mathematical backgrounds. We'll build
          understanding step by step, connecting abstract concepts to familiar musical ideas.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">What is Trigonometry?</CardTitle>
          <CardDescription>Understanding the study of triangles and circular motion</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3 text-lg">The Simple Definition</h3>
            <p className="text-blue-800 mb-4">
              <strong>Trigonometry</strong> is the study of triangles and circles. The word comes from Greek: "trigon"
              (triangle) + "metry" (measurement). But it's much more than just measuring triangles— it's the mathematics
              of <em>periodic motion</em> and <em>waves</em>.
            </p>
            <p className="text-blue-800">
              Think of it as the mathematical language that describes anything that repeats in a regular pattern: ocean
              waves, pendulum swings, seasonal changes, and most importantly for us—
              <strong>sound waves</strong>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                <History className="w-4 h-4 mr-2" />
                Historical Context
              </h4>
              <p className="text-green-800 text-sm mb-2">Ancient civilizations used trigonometry for:</p>
              <ul className="text-green-800 text-sm space-y-1 list-disc list-inside">
                <li>Navigation (finding direction by stars)</li>
                <li>Architecture (building pyramids and temples)</li>
                <li>Astronomy (predicting celestial events)</li>
                <li>Music (understanding string vibrations)</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2 flex items-center">
                <Music className="w-4 h-4 mr-2" />
                Why Musicians Need Trigonometry
              </h4>
              <ul className="text-purple-800 text-sm space-y-1 list-disc list-inside">
                <li>Sound waves are trigonometric functions</li>
                <li>Harmony relationships follow trig patterns</li>
                <li>Digital audio processing uses trig extensively</li>
                <li>Synthesizer oscillators are trig functions</li>
                <li>Acoustic analysis requires trig understanding</li>
              </ul>
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h3 className="font-semibold text-red-900 mb-3 text-lg">Musical Connection: The Sine Wave</h3>
            <p className="text-red-800 mb-3">
              Every sound you hear—whether from a violin, piano, or human voice—can be broken down into
              <strong> sine waves</strong>. A sine wave is the purest form of sound, and it's described by a
              trigonometric function.
            </p>
            <div className="bg-white p-4 rounded border">
              <p className="text-sm font-mono text-center mb-2">y = A × sin(2πft + φ)</p>
              <p className="text-red-700 text-sm text-center">This equation describes every pure tone in music!</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ready to Begin?</CardTitle>
          <CardDescription>Your journey into mathematical music starts here</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Don't worry if mathematics feels intimidating—we'll take it step by step, always connecting abstract
            concepts to concrete musical examples. Remember, you already understand many of these concepts intuitively
            through your musical experience!
          </p>
          <Button onClick={onNextChapter} className="w-full">
            Start with Angles and the Unit Circle →
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

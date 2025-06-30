"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calculator, Music, BookOpen, Play, Video } from "lucide-react"

interface Resource {
  title: string
  description: string
  url: string
  type: "math" | "music" | "humanities" | "interactive" | "video"
}

interface TopicResourcesBarProps {
  chapterId: string
}

const resourceDatabase: Record<string, Resource[]> = {
  "trig-intro": [
    {
      title: "History of Trigonometry",
      description: "Ancient origins and cultural development",
      url: "https://en.wikipedia.org/wiki/History_of_trigonometry",
      type: "humanities",
    },
    {
      title: "Music and Mathematics",
      description: "The mathematical basis of musical harmony",
      url: "https://en.wikipedia.org/wiki/Music_and_mathematics",
      type: "music",
    },
    {
      title: "Interactive Unit Circle",
      description: "Explore trigonometric functions visually",
      url: "https://www.geogebra.org/m/cF7RbKms",
      type: "interactive",
    },
    {
      title: "Pythagoras and Music",
      description: "How ancient Greeks connected math and music",
      url: "https://en.wikipedia.org/wiki/Pythagorean_tuning",
      type: "humanities",
    },
  ],
  "trig-functions": [
    {
      title: "Sine Wave Generator",
      description: "Create and hear sine waves at different frequencies",
      url: "https://www.szynalski.com/tone-generator/",
      type: "interactive",
    },
    {
      title: "Trigonometry in Music Production",
      description: "How DAWs use trig functions for audio processing",
      url: "https://en.wikipedia.org/wiki/Digital_audio_workstation",
      type: "music",
    },
    {
      title: "Special Angles Calculator",
      description: "Calculate exact values for common angles",
      url: "https://www.calculator.net/triangle-calculator.html",
      type: "math",
    },
    {
      title: "The Science of Sound",
      description: "Physics and mathematics of sound waves",
      url: "https://en.wikipedia.org/wiki/Acoustics",
      type: "humanities",
    },
  ],
  "unit-circle": [
    {
      title: "Unit Circle Trainer",
      description: "Practice memorizing unit circle values",
      url: "https://www.khanacademy.org/math/trigonometry",
      type: "interactive",
    },
    {
      title: "Circular Motion in Music",
      description: "How rotation creates musical patterns",
      url: "https://en.wikipedia.org/wiki/Circle_of_fifths",
      type: "music",
    },
    {
      title: "Ancient Circle Geometry",
      description: "Historical development of circular mathematics",
      url: "https://en.wikipedia.org/wiki/History_of_geometry",
      type: "humanities",
    },
    {
      title: "Radian vs Degree Converter",
      description: "Convert between angle measurements",
      url: "https://www.rapidtables.com/convert/number/radians-to-degrees.html",
      type: "math",
    },
  ],
  "trig-identities": [
    {
      title: "Identity Proof Visualizer",
      description: "See geometric proofs of trig identities",
      url: "https://www.geogebra.org/m/qzjqzjqz",
      type: "interactive",
    },
    {
      title: "Audio Phase Relationships",
      description: "How trig identities affect audio signals",
      url: "https://en.wikipedia.org/wiki/Audio_signal_processing",
      type: "music",
    },
    {
      title: "Euler's Identity",
      description: "The most beautiful equation in mathematics",
      url: "https://en.wikipedia.org/wiki/Euler%27s_identity",
      type: "humanities",
    },
    {
      title: "Trig Identity Calculator",
      description: "Verify and simplify trigonometric expressions",
      url: "https://www.symbolab.com/solver/trigonometric-identity-calculator",
      type: "math",
    },
  ],
  "calc-intro": [
    {
      title: "History of Calculus",
      description: "Newton vs Leibniz and the development of calculus",
      url: "https://en.wikipedia.org/wiki/History_of_calculus",
      type: "humanities",
    },
    {
      title: "Calculus in Audio Processing",
      description: "How derivatives and integrals shape sound",
      url: "https://en.wikipedia.org/wiki/Digital_signal_processing",
      type: "music",
    },
    {
      title: "Interactive Limits",
      description: "Explore limits with dynamic graphs",
      url: "https://www.desmos.com/calculator",
      type: "interactive",
    },
    {
      title: "Calculus Fundamentals",
      description: "Core concepts and applications",
      url: "https://www.khanacademy.org/math/calculus-1",
      type: "math",
    },
  ],
  "calc-limits": [
    {
      title: "Limit Calculator",
      description: "Calculate limits step by step",
      url: "https://www.symbolab.com/solver/limit-calculator",
      type: "math",
    },
    {
      title: "Continuous vs Discrete Audio",
      description: "How limits relate to digital audio sampling",
      url: "https://en.wikipedia.org/wiki/Sampling_(signal_processing)",
      type: "music",
    },
    {
      title: "Zeno's Paradoxes",
      description: "Ancient philosophical problems solved by limits",
      url: "https://en.wikipedia.org/wiki/Zeno%27s_paradoxes",
      type: "humanities",
    },
    {
      title: "Interactive Limit Explorer",
      description: "Visualize approaching limits dynamically",
      url: "https://www.geogebra.org/m/limit-explorer",
      type: "interactive",
    },
  ],
  "calc-derivatives": [
    {
      title: "Derivative Calculator",
      description: "Find derivatives with step-by-step solutions",
      url: "https://www.derivative-calculator.net/",
      type: "math",
    },
    {
      title: "Audio Envelope Shaping",
      description: "How derivatives control attack, decay, sustain, release",
      url: "https://en.wikipedia.org/wiki/Envelope_(music)",
      type: "music",
    },
    {
      title: "Newton's Method Visualizer",
      description: "See how derivatives find roots",
      url: "https://www.geogebra.org/m/newtons-method",
      type: "interactive",
    },
    {
      title: "The Calculus Wars",
      description: "Historical controversy over calculus invention",
      url: "https://en.wikipedia.org/wiki/Leibniz%E2%80%93Newton_calculus_controversy",
      type: "humanities",
    },
  ],
  "calc-applications": [
    {
      title: "Volume Calculator",
      description: "Calculate volumes using integration",
      url: "https://www.calculator.net/volume-calculator.html",
      type: "interactive",
    },
    {
      title: "Spectral Analysis Tools",
      description: "Fourier transforms in music analysis",
      url: "https://en.wikipedia.org/wiki/Fourier_transform",
      type: "music",
    },
    {
      title: "Work and Energy Physics",
      description: "Calculus applications in physics",
      url: "https://www.khanacademy.org/science/physics",
      type: "interactive",
    },
    {
      title: "Renaissance Engineering",
      description: "How calculus revolutionized engineering",
      url: "https://en.wikipedia.org/wiki/History_of_engineering",
      type: "humanities",
    },
  ],
}

const getResourceIcon = (type: Resource["type"]) => {
  switch (type) {
    case "math":
      return <Calculator className="w-4 h-4" />
    case "music":
      return <Music className="w-4 h-4" />
    case "humanities":
      return <BookOpen className="w-4 h-4" />
    case "interactive":
      return <Play className="w-4 h-4" />
    case "video":
      return <Video className="w-4 h-4" />
    default:
      return <ExternalLink className="w-4 h-4" />
  }
}

const getResourceColor = (type: Resource["type"]) => {
  switch (type) {
    case "math":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "music":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "humanities":
      return "bg-green-100 text-green-800 border-green-200"
    case "interactive":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "video":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function TopicResourcesBar({ chapterId }: TopicResourcesBarProps) {
  const resources = resourceDatabase[chapterId] || []

  if (resources.length === 0) {
    return null
  }

  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 border-2 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <ExternalLink className="w-5 h-5 mr-2 text-blue-600" />
          <h3 className="font-semibold text-lg text-blue-900">Topic Resources</h3>
          <Badge variant="outline" className="ml-2 text-xs">
            Explore & Learn
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-transform hover:scale-105"
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getResourceIcon(resource.type)}
                      <Badge variant="outline" className={`text-xs ${getResourceColor(resource.type)}`}>
                        {resource.type}
                      </Badge>
                    </div>
                    <ExternalLink className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  </div>
                  <h4 className="font-medium text-sm mb-1 line-clamp-2">{resource.title}</h4>
                  <p className="text-xs text-gray-600 line-clamp-2">{resource.description}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calculator, Music, BookOpen, Play, Globe } from "lucide-react"

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
      description: "Ancient origins from Babylon to modern applications",
      url: "https://mathshistory.st-andrews.ac.uk/HistTopics/Trigonometry/",
      type: "humanities",
    },
    {
      title: "Music and Mathematics",
      description: "The deep connection between trigonometry and sound",
      url: "https://plus.maths.org/content/music-mathematics",
      type: "music",
    },
    {
      title: "Interactive Unit Circle",
      description: "Explore angles and coordinates dynamically",
      url: "https://www.desmos.com/calculator/ur8f9hlnpd",
      type: "interactive",
    },
    {
      title: "Pythagoras and Music",
      description: "How ancient Greeks connected math to harmony",
      url: "https://www.britannica.com/science/Pythagorean-tuning",
      type: "humanities",
    },
  ],
  "trig-functions": [
    {
      title: "Trigonometry Calculator",
      description: "Calculate sine, cosine, and tangent values",
      url: "https://www.calculator.net/triangle-calculator.html",
      type: "math",
    },
    {
      title: "Sound Wave Synthesis",
      description: "How sine waves create all musical sounds",
      url: "https://www.soundonsound.com/techniques/introduction-sound-synthesis",
      type: "music",
    },
    {
      title: "Visual Trigonometry",
      description: "Interactive demonstrations of trig functions",
      url: "https://www.geogebra.org/m/cF7RbKAh",
      type: "interactive",
    },
    {
      title: "Renaissance Mathematics",
      description: "How trigonometry shaped navigation and art",
      url: "https://www.britannica.com/science/trigonometry/History",
      type: "humanities",
    },
  ],
  "unit-circle": [
    {
      title: "Unit Circle Memorization",
      description: "Techniques for remembering special angles",
      url: "https://www.khanacademy.org/math/trigonometry/trig-function-graphs",
      type: "math",
    },
    {
      title: "Phase Relationships in Audio",
      description: "Understanding stereo imaging and effects",
      url: "https://www.prosoundnetwork.com/mixing/understanding-phase-relationships",
      type: "music",
    },
    {
      title: "Circular Motion Simulator",
      description: "Visualize how circles create waves",
      url: "https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string_en.html",
      type: "interactive",
    },
    {
      title: "3Blue1Brown: Essence of Trigonometry",
      description: "Beautiful visual explanation of trig concepts",
      url: "https://www.youtube.com/watch?v=yBw67Fb31Cs",
      type: "video",
    },
  ],
  "trig-identities": [
    {
      title: "Trigonometric Identity Solver",
      description: "Tool for verifying and solving identities",
      url: "https://www.symbolab.com/solver/trigonometric-identity-calculator",
      type: "math",
    },
    {
      title: "Audio Processing Identities",
      description: "How trig identities are used in DSP",
      url: "https://www.dspguide.com/ch8.htm",
      type: "music",
    },
    {
      title: "Identity Proof Explorer",
      description: "Interactive proofs of fundamental identities",
      url: "https://www.geogebra.org/m/QNJdW8Av",
      type: "interactive",
    },
    {
      title: "Islamic Golden Age Mathematics",
      description: "How medieval scholars developed trigonometry",
      url: "https://www.britannica.com/science/mathematics/Mathematics-in-the-Islamic-world-8th-15th-century",
      type: "humanities",
    },
  ],
  "calc-limits": [
    {
      title: "Limit Calculator",
      description: "Compute limits step by step",
      url: "https://www.wolframalpha.com/calculators/limit-calculator",
      type: "math",
    },
    {
      title: "Continuous vs Discrete Audio",
      description: "How calculus relates to digital audio",
      url: "https://www.dspguide.com/ch3.htm",
      type: "music",
    },
    {
      title: "Limit Visualization Tool",
      description: "See limits graphically",
      url: "https://www.desmos.com/calculator/qlpeh3vkva",
      type: "interactive",
    },
    {
      title: "Newton and Leibniz",
      description: "The invention of calculus",
      url: "https://www.britannica.com/science/calculus/History",
      type: "humanities",
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
      title: "Envelope Shaping in Synthesis",
      description: "How derivatives control sound evolution",
      url: "https://www.soundonsound.com/techniques/adsr-envelopes",
      type: "music",
    },
    {
      title: "Derivative Grapher",
      description: "Visualize functions and their derivatives",
      url: "https://www.desmos.com/calculator/2rvtz8pfgm",
      type: "interactive",
    },
    {
      title: "The Calculus Wars",
      description: "Historical development of differential calculus",
      url: "https://www.smithsonianmag.com/science-nature/greatest-mathematical-feud-ever-leibniz-vs-newton-1684-117909/",
      type: "humanities",
    },
  ],
  "calc-integrals": [
    {
      title: "Integral Calculator",
      description: "Solve integrals with detailed steps",
      url: "https://www.integral-calculator.com/",
      type: "math",
    },
    {
      title: "Area Under Waveforms",
      description: "RMS and power calculations in audio",
      url: "https://www.prosoundnetwork.com/mixing/understanding-rms-peak-and-lufs",
      type: "music",
    },
    {
      title: "Riemann Sum Visualizer",
      description: "See how integration works geometrically",
      url: "https://www.geogebra.org/m/qX75pp8n",
      type: "interactive",
    },
    {
      title: "Archimedes Method of Exhaustion",
      description: "Ancient roots of integration",
      url: "https://www.britannica.com/biography/Archimedes/Mathematics",
      type: "humanities",
    },
  ],
}

const typeConfig = {
  math: { icon: Calculator, color: "bg-blue-100 text-blue-800", label: "Math" },
  music: { icon: Music, color: "bg-purple-100 text-purple-800", label: "Music" },
  humanities: { icon: BookOpen, color: "bg-amber-100 text-amber-800", label: "Humanities" },
  interactive: { icon: Globe, color: "bg-green-100 text-green-800", label: "Interactive" },
  video: { icon: Play, color: "bg-red-100 text-red-800", label: "Video" },
}

export function TopicResourcesBar({ chapterId }: TopicResourcesBarProps) {
  const resources = resourceDatabase[chapterId] || []

  if (resources.length === 0) {
    return null
  }

  return (
    <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border-slate-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <ExternalLink className="w-4 h-4 text-slate-600" />
          <h3 className="font-semibold text-slate-800">Topic Resources</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {resources.map((resource, index) => {
            const config = typeConfig[resource.type]
            const Icon = config.icon

            return (
              <a key={index} href={resource.url} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="bg-white p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-200 hover:scale-[1.02] h-full">
                  <div className="flex items-start gap-2 mb-2">
                    <Icon className="w-4 h-4 mt-0.5 text-slate-500 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-sm text-slate-800 group-hover:text-slate-900 line-clamp-1">
                        {resource.title}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mb-2 line-clamp-2">{resource.description}</p>

                  <Badge variant="secondary" className={`text-xs ${config.color}`}>
                    {config.label}
                  </Badge>
                </div>
              </a>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

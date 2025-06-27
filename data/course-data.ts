export const mathSymbols = {
  "π (Pi)":
    "Approximately 3.14159, represents the ratio of a circle's circumference to its diameter. In music: fundamental to wave calculations and frequency relationships.",
  "sin(x)":
    "Sine function - creates smooth wave patterns. In music: represents pure tones and is the basis of all sound waves.",
  "cos(x)":
    "Cosine function - similar to sine but shifted by 90°. In music: used for phase relationships between waves.",
  "tan(x)": "Tangent function - ratio of sine to cosine. In music: used in filter calculations and resonance.",
  "f(x)":
    "Function notation - 'f of x' means the output when x is the input. In music: frequency as a function of time.",
  Hz: "Hertz - cycles per second. In music: the unit for measuring pitch frequency (A4 = 440 Hz).",
  "∆ (Delta)": "Greek letter representing change or difference. In music: change in pitch, volume, or time.",
  "d/dx": "Derivative notation - rate of change. In music: how quickly frequency or amplitude changes.",
  "∫": "Integral symbol - represents area under a curve or accumulation. In music: total energy in a signal over time.",
  e: "Euler's number (≈2.718) - base of natural logarithm. In music: appears in exponential decay of notes.",
  log: "Logarithm - inverse of exponential. In music: decibel scale, octave relationships.",
  lim: "Limit - the value a function approaches. In music: theoretical perfect tuning or infinite resolution.",
  "θ (Theta)":
    "Greek letter for angle measure in radians. In music: phase relationships and circular motion in oscillators.",
  "ω (Omega)": "Greek letter for angular frequency (2πf). In music: rotational speed of oscillators and phasors.",
  "≈": "Approximately equal to. Used when we have a close estimate rather than an exact value.",
  "∞": "Infinity symbol. Represents something without bound or limit.",
  "√": "Square root symbol. In music: appears in calculations involving power and energy relationships.",
}

export const problemSolvingGuide = {
  "Reading Mathematical Expressions": {
    description: "How to interpret the symbols and notation you'll encounter",
    steps: [
      "Start from left to right, but respect order of operations (PEMDAS)",
      "Parentheses first, then exponents, then multiplication/division, then addition/subtraction",
      "Function notation like sin(x) means 'apply the sine function to x'",
      "Fractions represent division - the top divided by the bottom",
      "Variables (letters) represent unknown numbers we're trying to find",
    ],
    example: "sin(π/4) means 'find the sine of π divided by 4' = sin(45°) = √2/2",
  },
  "Solving Trigonometric Problems": {
    description: "Step-by-step approach to trig problems",
    steps: [
      "Identify what you're looking for (angle or function value)",
      "Determine which quadrant the angle is in (affects sign)",
      "Use reference angles for angles larger than 90°",
      "Apply the appropriate trigonometric identity if needed",
      "Check your answer makes sense (sine and cosine are always between -1 and 1)",
    ],
    example:
      "To find sin(150°): 150° is in quadrant II, reference angle is 30°, sin is positive in quadrant II, so sin(150°) = sin(30°) = 1/2",
  },
  "Working with Derivatives": {
    description: "How to find and interpret rates of change",
    steps: [
      "Identify the function you need to differentiate",
      "Apply the appropriate rule (power rule, product rule, etc.)",
      "Simplify your result",
      "Interpret the result in context (what does this rate of change mean?)",
      "Check units - derivatives change the units of the original function",
    ],
    example: "If position s(t) = t², then velocity v(t) = ds/dt = 2t. At t=3, velocity = 6 units per second.",
  },
  "Understanding Limits": {
    description: "How to evaluate what happens as we approach a value",
    steps: [
      "Identify what value x is approaching",
      "Try direct substitution first",
      "If you get 0/0 or ∞/∞, use algebraic manipulation",
      "Factor, cancel, or use L'Hôpital's rule if needed",
      "Interpret the result - what does this limit tell us?",
    ],
    example: "lim[x→2] (x²-4)/(x-2) = lim[x→2] (x+2)(x-2)/(x-2) = lim[x→2] (x+2) = 4",
  },
}

export const trigChapters = [
  {
    id: "trig-intro",
    title: "What is Trigonometry?",
    description: "Understanding the big picture and why it matters for music",
    difficulty: "Introduction",
    topics: ["Definition", "Historical context", "Musical applications", "Why study trig?"],
    color: "bg-sky-50 border-sky-200",
  },
  {
    id: "trig-1",
    title: "Angles and the Unit Circle",
    description: "Foundation of trigonometry and circular motion",
    difficulty: "Beginner",
    topics: ["Radians vs Degrees", "Unit Circle", "Reference Angles"],
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: "trig-2",
    title: "Basic Trigonometric Functions",
    description: "Sine, cosine, and tangent functions",
    difficulty: "Beginner",
    topics: ["sin, cos, tan", "Function values", "Special angles"],
    color: "bg-green-50 border-green-200",
  },
  {
    id: "trig-3",
    title: "Graphing Trigonometric Functions",
    description: "Visualizing trig functions and their properties",
    difficulty: "Intermediate",
    topics: ["Amplitude", "Period", "Phase shift", "Vertical shift"],
    color: "bg-purple-50 border-purple-200",
  },
]

export const calcChapters = [
  {
    id: "calc-intro",
    title: "What is Calculus?",
    description: "Understanding calculus and its role in describing change",
    difficulty: "Introduction",
    topics: ["Definition", "Two main branches", "Musical applications", "Why study calculus?"],
    color: "bg-amber-50 border-amber-200",
  },
  {
    id: "calc-1",
    title: "Limits and Continuity",
    description: "The foundation of calculus",
    difficulty: "Beginner",
    topics: ["Limit definition", "Continuity", "Limit laws"],
    color: "bg-cyan-50 border-cyan-200",
  },
  {
    id: "calc-2",
    title: "Introduction to Derivatives",
    description: "Rates of change and slopes",
    difficulty: "Beginner",
    topics: ["Derivative definition", "Power rule", "Basic rules"],
    color: "bg-emerald-50 border-emerald-200",
  },
]

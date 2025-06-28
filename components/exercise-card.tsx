"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Calculator, HelpCircle, Lightbulb } from "lucide-react"

interface Exercise {
  id: string
  type: "multiple-choice" | "short-answer" | "true-false" | "calculation"
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
  hint?: string
  difficulty: "easy" | "medium" | "hard"
  musicalContext?: string
}

interface ExerciseCardProps {
  // New format
  exercise?: Exercise
  // Legacy format support
  id?: string
  type?: "multiple-choice" | "short-answer" | "true-false" | "calculation"
  question?: string
  options?: string[]
  correctAnswer?: string | number
  explanation?: string
  hint?: string
  difficulty?: "easy" | "medium" | "hard"
  musicalContext?: string
  onComplete?: (exerciseId: string, correct: boolean) => void
}

export function ExerciseCard({
  exercise,
  id,
  type,
  question,
  options,
  correctAnswer,
  explanation,
  hint,
  difficulty,
  musicalContext,
  onComplete,
}: ExerciseCardProps) {
  // Handle both new and legacy formats
  const exerciseData = exercise || {
    id: id || "unknown",
    type: type || "multiple-choice",
    question: question || "No question provided",
    options: options || [],
    correctAnswer: correctAnswer || "",
    explanation: explanation || "No explanation provided",
    hint: hint,
    difficulty: difficulty || "medium",
    musicalContext: musicalContext,
  }

  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [showResult, setShowResult] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSubmit = () => {
    const correct = selectedAnswer.toString().toLowerCase() === exerciseData.correctAnswer.toString().toLowerCase()
    setIsCorrect(correct)
    setShowResult(true)
    onComplete?.(exerciseData.id, correct)
  }

  const handleReset = () => {
    setSelectedAnswer("")
    setShowResult(false)
    setShowHint(false)
    setIsCorrect(false)
  }

  const openCalculator = () => {
    window.open("/calculator.html", "_blank", "width=400,height=600")
  }

  const renderQuestionInput = () => {
    switch (exerciseData.type) {
      case "multiple-choice":
        return (
          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
            {exerciseData.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )

      case "true-false":
        return (
          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="true" />
              <Label htmlFor="true" className="cursor-pointer">
                True
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="false" />
              <Label htmlFor="false" className="cursor-pointer">
                False
              </Label>
            </div>
          </RadioGroup>
        )

      case "short-answer":
        return (
          <Input
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            placeholder="Enter your answer..."
            className="w-full"
          />
        )

      case "calculation":
        return (
          <div className="space-y-3">
            <Textarea
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              placeholder="Show your work and final answer..."
              className="w-full min-h-[100px]"
            />
            <Button
              onClick={openCalculator}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent"
            >
              <Calculator className="w-4 h-4" />
              Open Calculator
            </Button>
          </div>
        )

      default:
        return (
          <Input
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            placeholder="Enter your answer..."
            className="w-full"
          />
        )
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{exerciseData.question}</CardTitle>
          <Badge className={getDifficultyColor(exerciseData.difficulty)} variant="secondary">
            {exerciseData.difficulty}
          </Badge>
        </div>
        {exerciseData.musicalContext && (
          <CardDescription className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
            <strong>Musical Context:</strong> {exerciseData.musicalContext}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {!showResult && (
          <>
            {renderQuestionInput()}

            <div className="flex items-center justify-between pt-4">
              <div className="flex gap-2">
                {exerciseData.hint && (
                  <Button
                    onClick={() => setShowHint(!showHint)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <HelpCircle className="w-4 h-4" />
                    {showHint ? "Hide Hint" : "Show Hint"}
                  </Button>
                )}
              </div>
              <Button onClick={handleSubmit} disabled={!selectedAnswer.trim()} className="flex items-center gap-2">
                Submit Answer
              </Button>
            </div>

            {showHint && exerciseData.hint && (
              <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div>
                    <strong className="text-yellow-800">Hint:</strong>
                    <p className="text-yellow-700 mt-1">{exerciseData.hint}</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {showResult && (
          <div className="space-y-4">
            <div
              className={`p-4 rounded-lg border-l-4 ${
                isCorrect ? "bg-green-50 border-green-400" : "bg-red-50 border-red-400"
              }`}
            >
              <div className="flex items-start gap-2">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                )}
                <div>
                  <h4 className={`font-semibold ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                    {isCorrect ? "Correct!" : "Incorrect"}
                  </h4>
                  <p className={`mt-1 ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                    {isCorrect ? "Well done!" : `The correct answer is: ${exerciseData.correctAnswer}`}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
              <p className="text-blue-700">{exerciseData.explanation}</p>
            </div>

            <div className="flex justify-between">
              <Button onClick={handleReset} variant="outline">
                Try Again
              </Button>
              <Button onClick={openCalculator} variant="outline" className="flex items-center gap-2 bg-transparent">
                <Calculator className="w-4 h-4" />
                Calculator
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

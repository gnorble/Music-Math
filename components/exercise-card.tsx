"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Calculator, Music, HelpCircle } from "lucide-react"

interface Exercise {
  id: string
  question: string
  type: "multiple-choice" | "short-answer" | "true-false"
  options?: string[]
  correctAnswer: string | number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
  musicalContext?: string
  hint?: string
}

interface ExerciseCardProps {
  // New format
  exercise?: Exercise
  // Legacy format support
  question?: string
  type?: "multiple-choice" | "short-answer" | "true-false"
  options?: string[]
  correctAnswer?: string | number
  explanation?: string
  difficulty?: "easy" | "medium" | "hard"
  musicalContext?: string
  hint?: string
  onComplete?: (correct: boolean) => void
}

export function ExerciseCard({
  exercise,
  question,
  type = "multiple-choice",
  options = [],
  correctAnswer,
  explanation,
  difficulty = "medium",
  musicalContext,
  hint,
  onComplete,
}: ExerciseCardProps) {
  // Use exercise object if provided, otherwise use individual props
  const exerciseData = exercise || {
    id: Math.random().toString(),
    question: question || "Sample question",
    type,
    options,
    correctAnswer: correctAnswer || "",
    explanation: explanation || "No explanation provided",
    difficulty,
    musicalContext,
    hint,
  }

  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [userAnswer, setUserAnswer] = useState<string>("")
  const [showResult, setShowResult] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleSubmit = () => {
    const answer = exerciseData.type === "short-answer" ? userAnswer : selectedAnswer
    const correct = answer.toString().toLowerCase() === exerciseData.correctAnswer.toString().toLowerCase()

    setIsCorrect(correct)
    setShowResult(true)
    onComplete?.(correct)
  }

  const handleReset = () => {
    setSelectedAnswer("")
    setUserAnswer("")
    setShowResult(false)
    setShowHint(false)
    setIsCorrect(false)
  }

  const openCalculator = () => {
    window.open("/calculator.html", "_blank", "width=400,height=600")
  }

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

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{exerciseData.question}</CardTitle>
            {exerciseData.musicalContext && (
              <CardDescription className="mt-2 flex items-center">
                <Music className="w-4 h-4 mr-1" />
                {exerciseData.musicalContext}
              </CardDescription>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getDifficultyColor(exerciseData.difficulty)}>{exerciseData.difficulty}</Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={openCalculator}
              className="flex items-center gap-1 bg-transparent"
            >
              <Calculator className="w-4 h-4" />
              Calculator
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!showResult && (
          <>
            {exerciseData.type === "multiple-choice" && (
              <div className="space-y-2">
                {exerciseData.options?.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={(e) => setSelectedAnswer(e.target.value)}
                      className="text-blue-600"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )}

            {exerciseData.type === "short-answer" && (
              <div className="space-y-2">
                <Input
                  placeholder="Enter your answer..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full"
                />
              </div>
            )}

            {exerciseData.type === "true-false" && (
              <div className="flex gap-4">
                <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="answer"
                    value="true"
                    checked={selectedAnswer === "true"}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    className="text-blue-600"
                  />
                  <span>True</span>
                </label>
                <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="answer"
                    value="false"
                    checked={selectedAnswer === "false"}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    className="text-blue-600"
                  />
                  <span>False</span>
                </label>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Button
                onClick={handleSubmit}
                disabled={
                  (exerciseData.type === "short-answer" && !userAnswer.trim()) ||
                  (exerciseData.type !== "short-answer" && !selectedAnswer)
                }
              >
                Submit Answer
              </Button>

              {exerciseData.hint && (
                <Button variant="outline" onClick={() => setShowHint(!showHint)} className="flex items-center gap-1">
                  <HelpCircle className="w-4 h-4" />
                  {showHint ? "Hide Hint" : "Show Hint"}
                </Button>
              )}
            </div>

            {showHint && exerciseData.hint && (
              <Alert>
                <HelpCircle className="h-4 w-4" />
                <AlertDescription>{exerciseData.hint}</AlertDescription>
              </Alert>
            )}
          </>
        )}

        {showResult && (
          <div className="space-y-4">
            <Alert className={isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              <div className="flex items-center">
                {isCorrect ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription className="ml-2">{isCorrect ? "Correct!" : "Incorrect"}</AlertDescription>
              </div>
            </Alert>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
              <p className="text-blue-800">{exerciseData.explanation}</p>
              {!isCorrect && (
                <p className="text-blue-700 mt-2">
                  <strong>Correct answer:</strong> {exerciseData.correctAnswer}
                </p>
              )}
            </div>

            <Button onClick={handleReset} variant="outline">
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

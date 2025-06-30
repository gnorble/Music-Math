"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Calculator, Lightbulb, Music, HelpCircle } from "lucide-react"

interface Exercise {
  id: string
  question: string
  type: "multiple-choice" | "short-answer" | "true-false" | "calculation"
  options?: string[]
  correctAnswer: string | number
  explanation: string
  hint?: string
  musicalContext?: string
  difficulty: "easy" | "medium" | "hard"
}

interface ExerciseCardProps {
  // New exercise object format
  exercise?: Exercise
  // Legacy individual props format (for backward compatibility)
  id?: string
  question?: string
  type?: "multiple-choice" | "short-answer" | "true-false" | "calculation"
  options?: string[]
  correctAnswer?: string | number
  explanation?: string
  hint?: string
  musicalContext?: string
  difficulty?: "easy" | "medium" | "hard"
  onComplete?: () => void
}

export function ExerciseCard({
  exercise,
  id,
  question,
  type,
  options,
  correctAnswer,
  explanation,
  hint,
  musicalContext,
  difficulty,
  onComplete,
}: ExerciseCardProps) {
  // Use exercise object if provided, otherwise fall back to individual props
  const exerciseData = exercise || {
    id: id || `exercise-${Math.random()}`,
    question: question || "Sample question",
    type: type || "multiple-choice",
    options: options || [],
    correctAnswer: correctAnswer || "",
    explanation: explanation || "No explanation provided",
    hint,
    musicalContext,
    difficulty: difficulty || "medium",
  }

  const [userAnswer, setUserAnswer] = useState<string>("")
  const [showResult, setShowResult] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleSubmit = () => {
    const correct = userAnswer.toLowerCase().trim() === String(exerciseData.correctAnswer).toLowerCase().trim()
    setIsCorrect(correct)
    setShowResult(true)
    if (correct && onComplete) {
      onComplete()
    }
  }

  const handleReset = () => {
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

  const renderQuestionInput = () => {
    switch (exerciseData.type) {
      case "multiple-choice":
        return (
          <RadioGroup value={userAnswer} onValueChange={setUserAnswer} className="space-y-2">
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
          <RadioGroup value={userAnswer} onValueChange={setUserAnswer} className="space-y-2">
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

      case "calculation":
        return (
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Enter your answer..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="font-mono"
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

      case "short-answer":
      default:
        return (
          <Textarea
            placeholder="Type your answer here..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            rows={3}
          />
        )
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mb-6">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getDifficultyColor(exerciseData.difficulty)} variant="secondary">
                {exerciseData.difficulty}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {exerciseData.type.replace("-", " ")}
              </Badge>
            </div>
            <CardTitle className="text-lg">{exerciseData.question}</CardTitle>
          </div>
        </div>

        {exerciseData.musicalContext && (
          <Alert className="mt-3">
            <Music className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Musical Context:</strong> {exerciseData.musicalContext}
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {!showResult && (
          <>
            {renderQuestionInput()}

            <div className="flex items-center gap-2">
              <Button onClick={handleSubmit} disabled={!userAnswer.trim()} className="flex-1">
                Submit Answer
              </Button>

              {exerciseData.hint && (
                <Button
                  onClick={() => setShowHint(!showHint)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <HelpCircle className="w-4 h-4" />
                  Hint
                </Button>
              )}
            </div>

            {showHint && exerciseData.hint && (
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>{exerciseData.hint}</AlertDescription>
              </Alert>
            )}
          </>
        )}

        {showResult && (
          <div className="space-y-4">
            <Alert className={isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription className={isCorrect ? "text-green-800" : "text-red-800"}>
                  <strong>{isCorrect ? "Correct!" : "Incorrect"}</strong>
                  {!isCorrect && (
                    <span className="block mt-1">
                      The correct answer is: <strong>{String(exerciseData.correctAnswer)}</strong>
                    </span>
                  )}
                </AlertDescription>
              </div>
            </Alert>

            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertDescription>
                <strong>Explanation:</strong> {exerciseData.explanation}
              </AlertDescription>
            </Alert>

            <Button onClick={handleReset} variant="outline" className="w-full bg-transparent">
              Try Another Question
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

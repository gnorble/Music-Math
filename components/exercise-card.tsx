"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, HelpCircle, Lightbulb } from "lucide-react"

interface Exercise {
  id: string
  question: string
  type: "multiple-choice" | "text-input" | "numeric"
  options?: string[]
  correctAnswer?: number | string
  acceptableAnswers?: string[]
  tolerance?: number
  explanation?: string
  hint?: string
  musicalContext?: string
}

interface ExerciseCardProps {
  id?: string
  title?: string
  description?: string
  difficulty?: string
  exercise?: Exercise
  children?: React.ReactNode
  onComplete?: () => void
  isCompleted?: boolean
}

export function ExerciseCard({
  id,
  title,
  description,
  difficulty,
  exercise,
  children,
  onComplete,
  isCompleted = false,
}: ExerciseCardProps) {
  const [userAnswer, setUserAnswer] = useState("")
  const [showHint, setShowHint] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [hasAttempted, setHasAttempted] = useState(false)

  const checkAnswer = () => {
    if (!exercise) return

    setHasAttempted(true)
    let correct = false

    if (exercise.type === "multiple-choice" && exercise.options) {
      correct = Number.parseInt(userAnswer) === exercise.correctAnswer
    } else if (exercise.type === "text-input" || exercise.type === "numeric") {
      if (exercise.acceptableAnswers) {
        correct = exercise.acceptableAnswers.some((answer) =>
          userAnswer.toLowerCase().trim().includes(answer.toLowerCase().trim()),
        )
      } else if (exercise.tolerance && typeof exercise.correctAnswer === "number") {
        const numericAnswer = Number.parseFloat(userAnswer)
        correct = Math.abs(numericAnswer - exercise.correctAnswer) <= exercise.tolerance
      } else {
        correct = userAnswer.toLowerCase().trim() === String(exercise.correctAnswer).toLowerCase().trim()
      }
    }

    setIsCorrect(correct)
    setShowExplanation(true)

    if (correct && onComplete) {
      setTimeout(() => {
        onComplete()
      }, 1500)
    }
  }

  const getDifficultyColor = (diff?: string) => {
    switch (diff?.toLowerCase()) {
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

  // If using the new exercise prop format
  if (exercise) {
    return (
      <Card className={`${isCompleted ? "border-green-200 bg-green-50" : ""}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{exercise.question}</CardTitle>
              {exercise.musicalContext && (
                <CardDescription className="mt-2 text-blue-600">🎵 {exercise.musicalContext}</CardDescription>
              )}
            </div>
            {isCompleted && <CheckCircle className="w-6 h-6 text-green-600" />}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {exercise.type === "multiple-choice" && exercise.options && (
            <RadioGroup value={userAnswer} onValueChange={setUserAnswer}>
              {exercise.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {(exercise.type === "text-input" || exercise.type === "numeric") && (
            <div className="space-y-2">
              <Label htmlFor="answer-input">Your Answer:</Label>
              <Input
                id="answer-input"
                type={exercise.type === "numeric" ? "number" : "text"}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer"
                disabled={isCompleted}
              />
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={checkAnswer} disabled={!userAnswer || isCompleted}>
              Check Answer
            </Button>
            {exercise.hint && (
              <Button variant="outline" onClick={() => setShowHint(!showHint)}>
                <HelpCircle className="w-4 h-4 mr-1" />
                Hint
              </Button>
            )}
          </div>

          {showHint && exercise.hint && (
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertDescription>{exercise.hint}</AlertDescription>
            </Alert>
          )}

          {hasAttempted && isCorrect !== null && (
            <Alert className={isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              {isCorrect ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={isCorrect ? "text-green-800" : "text-red-800"}>
                {isCorrect ? "Correct! Well done." : "Not quite right. Try again or check the hint."}
              </AlertDescription>
            </Alert>
          )}

          {showExplanation && exercise.explanation && (
            <Alert className="border-blue-200 bg-blue-50">
              <AlertDescription className="text-blue-800">{exercise.explanation}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    )
  }

  // Legacy format with children
  return (
    <Card className={`${isCompleted ? "border-green-200 bg-green-50" : ""}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="flex items-center gap-2">
            {difficulty && <Badge className={getDifficultyColor(difficulty)}>{difficulty}</Badge>}
            {isCompleted && <CheckCircle className="w-6 h-6 text-green-600" />}
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Music, Calculator, BookOpen, Play, Clock, Users, Star } from "lucide-react"
import { TableOfContents } from "@/components/table-of-contents"
import { ChapterContent } from "@/components/chapter-content"
import { courseData } from "@/data/course-data"

export default function MathMusicCourse() {
  const [currentView, setCurrentView] = useState("toc")
  const [currentChapter, setCurrentChapter] = useState("")
  const [completedChapters, setCompletedChapters] = useState<string[]>([])

  const handleChapterSelect = (chapterId: string) => {
    setCurrentChapter(chapterId)
    setCurrentView("chapter")
  }

  const handleBackToTOC = () => {
    setCurrentView("toc")
    setCurrentChapter("")
  }

  const handleNavigateToChapter = (chapterId: string) => {
    setCurrentChapter(chapterId)
    setCurrentView("chapter")
  }

  const markChapterComplete = (chapterId: string) => {
    if (!completedChapters.includes(chapterId)) {
      setCompletedChapters([...completedChapters, chapterId])
    }
  }

  const totalChapters = courseData.trigonometry.chapters.length + courseData.calculus.chapters.length
  const progressPercentage = (completedChapters.length / totalChapters) * 100

  if (currentView === "chapter") {
    return (
      <ChapterContent
        chapterId={currentChapter}
        onBack={handleBackToTOC}
        onNavigate={handleNavigateToChapter}
        onComplete={() => markChapterComplete(currentChapter)}
        isCompleted={completedChapters.includes(currentChapter)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-3">
            <Music className="w-10 h-10 text-blue-600 mr-3" />
            <Calculator className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Mathematics for Musicians</h1>
          <p className="text-lg text-gray-600 mb-4 max-w-3xl mx-auto">
            An interactive journey through trigonometry and calculus, designed specifically for musicians and audio
            enthusiasts. Discover the mathematical foundations behind sound, harmony, and digital audio processing.
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Course Progress</span>
              <span className="text-sm text-gray-500">
                {completedChapters.length}/{totalChapters} chapters
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Course Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-6">
            <Card className="text-center">
              <CardContent className="pt-4 pb-4">
                <BookOpen className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <div className="text-xl font-bold text-gray-900">{totalChapters}</div>
                <div className="text-xs text-gray-600">Chapters</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 pb-4">
                <Clock className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <div className="text-xl font-bold text-gray-900">~8</div>
                <div className="text-xs text-gray-600">Hours</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 pb-4">
                <Users className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                <div className="text-xl font-bold text-gray-900">All</div>
                <div className="text-xs text-gray-600">Levels</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 pb-4">
                <Star className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                <div className="text-xl font-bold text-gray-900">4.9</div>
                <div className="text-xs text-gray-600">Rating</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Table of Contents */}
        <TableOfContents
          courseData={courseData}
          onChapterSelect={handleChapterSelect}
          completedChapters={completedChapters}
        />

        {/* Quick Start Guide */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Play className="w-5 h-5 mr-2" />
              Quick Start Guide
            </CardTitle>
            <CardDescription className="text-sm">
              New to mathematics? Start here for the best learning experience.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold mb-1 text-sm">Start with Foundations</h3>
                <p className="text-xs text-gray-600 mb-2">
                  Begin with "What is Trigonometry?" to understand the big picture and why math matters for music.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-transparent text-xs"
                  onClick={() => handleChapterSelect("trig-intro")}
                >
                  Start Here
                </Button>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg font-bold text-purple-600">2</span>
                </div>
                <h3 className="font-semibold mb-1 text-sm">Practice Interactively</h3>
                <p className="text-xs text-gray-600">
                  Use the interactive tools and exercises in each chapter to reinforce your understanding.
                </p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg font-bold text-green-600">3</span>
                </div>
                <h3 className="font-semibold mb-1 text-sm">Apply to Music</h3>
                <p className="text-xs text-gray-600">
                  Connect each mathematical concept to real musical applications and audio processing.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, BookOpen, Play, Calculator, Music } from "lucide-react"

interface Chapter {
  id: string
  title: string
  description: string
  difficulty: string
  duration: string
  topics: string[]
  prerequisites?: string[]
}

interface CourseSection {
  title: string
  description: string
  chapters: Chapter[]
}

interface CourseData {
  trigonometry: CourseSection
  calculus: CourseSection
}

interface TableOfContentsProps {
  courseData: CourseData
  onChapterSelect: (chapterId: string) => void
  completedChapters: string[]
}

export function TableOfContents({ courseData, onChapterSelect, completedChapters }: TableOfContentsProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "introduction":
        return "bg-blue-100 text-blue-800"
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const trigCompletedCount = courseData.trigonometry.chapters.filter((ch) => completedChapters.includes(ch.id)).length
  const calcCompletedCount = courseData.calculus.chapters.filter((ch) => completedChapters.includes(ch.id)).length

  const trigProgress = (trigCompletedCount / courseData.trigonometry.chapters.length) * 100
  const calcProgress = (calcCompletedCount / courseData.calculus.chapters.length) * 100

  return (
    <div className="space-y-8">
      {/* Course Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Calculator className="w-6 h-6" />
              {courseData.trigonometry.title}
            </CardTitle>
            <CardDescription className="text-blue-700">{courseData.trigonometry.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-800">Progress</span>
                <span className="text-blue-600">
                  {trigCompletedCount}/{courseData.trigonometry.chapters.length} chapters
                </span>
              </div>
              <Progress value={trigProgress} className="h-2" />
              <div className="flex items-center gap-4 text-xs text-blue-700">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  ~6 hours
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />7 chapters
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <Music className="w-6 h-6" />
              {courseData.calculus.title}
            </CardTitle>
            <CardDescription className="text-orange-700">{courseData.calculus.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-orange-800">Progress</span>
                <span className="text-orange-600">
                  {calcCompletedCount}/{courseData.calculus.chapters.length} chapters
                </span>
              </div>
              <Progress value={calcProgress} className="h-2" />
              <div className="flex items-center gap-4 text-xs text-orange-700">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  ~6 hours
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />8 chapters
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trigonometry Chapters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            Trigonometry for Musicians
          </CardTitle>
          <CardDescription>
            Master the mathematical foundations of waves, oscillations, and periodic motion in music
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {courseData.trigonometry.chapters.map((chapter, index) => {
              const isCompleted = completedChapters.includes(chapter.id)

              return (
                <div
                  key={chapter.id}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    isCompleted
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50"
                  }`}
                  onClick={() => onChapterSelect(chapter.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-500">Chapter {index + 1}</span>
                          {isCompleted && <CheckCircle className="w-4 h-4 text-green-600" />}
                        </div>
                        <Badge className={getDifficultyColor(chapter.difficulty)}>{chapter.difficulty}</Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {chapter.duration}
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{chapter.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{chapter.description}</p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {chapter.topics.map((topic, topicIndex) => (
                          <Badge key={topicIndex} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>

                      {chapter.prerequisites && chapter.prerequisites.length > 0 && (
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">Recommended prerequisites:</span>{" "}
                          {chapter.prerequisites
                            .map((prereq) => {
                              const prereqChapter = [
                                ...courseData.trigonometry.chapters,
                                ...courseData.calculus.chapters,
                              ].find((ch) => ch.id === prereq)
                              return prereqChapter?.title || prereq
                            })
                            .join(", ")}
                        </div>
                      )}
                    </div>

                    <div className="ml-4">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          onChapterSelect(chapter.id)
                        }}
                        variant={isCompleted ? "secondary" : "default"}
                        size="sm"
                      >
                        {isCompleted ? (
                          "Review"
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-1" />
                            Start
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Calculus Chapters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="w-5 h-5 text-orange-600" />
            Calculus for Audio Processing
          </CardTitle>
          <CardDescription>Master the mathematics of change and accumulation in musical contexts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {courseData.calculus.chapters.map((chapter, index) => {
              const isCompleted = completedChapters.includes(chapter.id)
              const chapterNumber = courseData.trigonometry.chapters.length + index + 1

              return (
                <div
                  key={chapter.id}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    isCompleted
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50"
                  }`}
                  onClick={() => onChapterSelect(chapter.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-500">Chapter {chapterNumber}</span>
                          {isCompleted && <CheckCircle className="w-4 h-4 text-green-600" />}
                        </div>
                        <Badge className={getDifficultyColor(chapter.difficulty)}>{chapter.difficulty}</Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {chapter.duration}
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{chapter.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{chapter.description}</p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {chapter.topics.map((topic, topicIndex) => (
                          <Badge key={topicIndex} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>

                      {chapter.prerequisites && chapter.prerequisites.length > 0 && (
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">Recommended prerequisites:</span>{" "}
                          {chapter.prerequisites
                            .map((prereq) => {
                              const prereqChapter = [
                                ...courseData.trigonometry.chapters,
                                ...courseData.calculus.chapters,
                              ].find((ch) => ch.id === prereq)
                              return prereqChapter?.title || prereq
                            })
                            .join(", ")}
                        </div>
                      )}
                    </div>

                    <div className="ml-4">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          onChapterSelect(chapter.id)
                        }}
                        variant={isCompleted ? "secondary" : "default"}
                        size="sm"
                      >
                        {isCompleted ? (
                          "Review"
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-1" />
                            Start
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Course Statistics */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center text-green-900">
            <BookOpen className="w-6 h-6 mr-2" />
            Course Progress Overview
          </CardTitle>
          <CardDescription>Track your learning journey through mathematics and music</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-900">
                {completedChapters.length}/
                {courseData.trigonometry.chapters.length + courseData.calculus.chapters.length}
              </div>
              <div className="text-sm text-green-700">Total Chapters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-900">
                {Math.round(
                  (completedChapters.length /
                    (courseData.trigonometry.chapters.length + courseData.calculus.chapters.length)) *
                    100,
                )}
                %
              </div>
              <div className="text-sm text-green-700">Course Complete</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-900">
                {courseData.trigonometry.chapters.filter((ch) => completedChapters.includes(ch.id)).length}/
                {courseData.trigonometry.chapters.length}
              </div>
              <div className="text-sm text-green-700">Trigonometry</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-900">
                {courseData.calculus.chapters.filter((ch) => completedChapters.includes(ch.id)).length}/
                {courseData.calculus.chapters.length}
              </div>
              <div className="text-sm text-green-700">Calculus</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

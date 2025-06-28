"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, BookOpen, CheckCircle, Play } from "lucide-react"

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

  const getCompletionPercentage = (chapters: Chapter[]) => {
    const completed = chapters.filter((ch) => completedChapters.includes(ch.id)).length
    return (completed / chapters.length) * 100
  }

  const ChapterCard = ({
    chapter,
    index,
    sectionOffset = 0,
  }: { chapter: Chapter; index: number; sectionOffset?: number }) => {
    const isCompleted = completedChapters.includes(chapter.id)
    const chapterNumber = sectionOffset + index + 1

    return (
      <Card
        className="cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] group"
        onClick={() => onChapterSelect(chapter.id)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">
                {chapterNumber}
              </div>
              {isCompleted && <CheckCircle className="w-5 h-5 text-green-600" />}
            </div>
            <Badge className={getDifficultyColor(chapter.difficulty)} variant="secondary">
              {chapter.difficulty}
            </Badge>
          </div>
          <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{chapter.title}</CardTitle>
          <CardDescription className="text-sm">{chapter.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Duration */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{chapter.duration}</span>
            </div>

            {/* Topics */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700">Topics covered:</div>
              <div className="flex flex-wrap gap-1">
                {chapter.topics.map((topic, topicIndex) => (
                  <Badge key={topicIndex} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Prerequisites (if any) */}
            {chapter.prerequisites && chapter.prerequisites.length > 0 && (
              <div className="text-xs text-gray-500">
                <span className="font-medium">Recommended prerequisites:</span> {chapter.prerequisites.join(", ")}
              </div>
            )}

            {/* Action button */}
            <div className="pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Play className="w-4 h-4" />
                  <span>{isCompleted ? "Review Chapter" : "Start Chapter"}</span>
                </div>
                {isCompleted && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Completed
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {/* Trigonometry Section */}
      <div>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              {courseData.trigonometry.title}
            </h2>
            <div className="text-sm text-gray-600">
              {courseData.trigonometry.chapters.filter((ch) => completedChapters.includes(ch.id)).length}/
              {courseData.trigonometry.chapters.length} completed
            </div>
          </div>
          <p className="text-gray-600 mb-4">{courseData.trigonometry.description}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Section Progress</span>
              <span>{Math.round(getCompletionPercentage(courseData.trigonometry.chapters))}%</span>
            </div>
            <Progress value={getCompletionPercentage(courseData.trigonometry.chapters)} className="h-2" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courseData.trigonometry.chapters.map((chapter, index) => (
            <ChapterCard key={chapter.id} chapter={chapter} index={index} />
          ))}
        </div>
      </div>

      {/* Calculus Section */}
      <div>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-orange-600" />
              {courseData.calculus.title}
            </h2>
            <div className="text-sm text-gray-600">
              {courseData.calculus.chapters.filter((ch) => completedChapters.includes(ch.id)).length}/
              {courseData.calculus.chapters.length} completed
            </div>
          </div>
          <p className="text-gray-600 mb-4">{courseData.calculus.description}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Section Progress</span>
              <span>{Math.round(getCompletionPercentage(courseData.calculus.chapters))}%</span>
            </div>
            <Progress value={getCompletionPercentage(courseData.calculus.chapters)} className="h-2" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courseData.calculus.chapters.map((chapter, index) => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              index={index}
              sectionOffset={courseData.trigonometry.chapters.length}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

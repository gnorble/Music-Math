"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Calculator,
  Music,
  Clock,
  CheckCircle,
  BookOpen,
  Headphones,
  Settings,
  ArrowRight,
  Star,
  Trophy,
  Target,
} from "lucide-react"
import { courseData } from "@/data/course-data"

interface TableOfContentsProps {
  onChapterSelect: (chapterId: string) => void
  completedChapters: string[]
}

export function TableOfContents({ onChapterSelect, completedChapters }: TableOfContentsProps) {
  const [selectedSection, setSelectedSection] = useState<"trigonometry" | "calculus" | "resources">("trigonometry")

  const trigCompletedCount = courseData.trigonometry.chapters.filter((ch) => completedChapters.includes(ch.id)).length

  const calcCompletedCount = courseData.calculus.chapters.filter((ch) => completedChapters.includes(ch.id)).length

  const totalChapters = courseData.trigonometry.chapters.length + courseData.calculus.chapters.length
  const totalCompleted = completedChapters.length
  const overallProgress = (totalCompleted / totalChapters) * 100

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

  const ChapterCard = ({ chapter, index, sectionLength }: { chapter: any; index: number; sectionLength: number }) => {
    const isCompleted = completedChapters.includes(chapter.id)

    return (
      <Card
        className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
          isCompleted ? "ring-2 ring-green-200 bg-green-50" : "hover:bg-gray-50"
        }`}
        onClick={() => onChapterSelect(chapter.id)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  Chapter {index + 1}
                </Badge>
                <Badge className={getDifficultyColor(chapter.difficulty)} variant="secondary">
                  {chapter.difficulty}
                </Badge>
                {isCompleted && <CheckCircle className="w-4 h-4 text-green-600" />}
              </div>
              <CardTitle className="text-lg leading-tight">{chapter.title}</CardTitle>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
          </div>
          <CardDescription className="text-sm">{chapter.description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{chapter.duration}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {chapter.topics.slice(0, 3).map((topic: string, topicIndex: number) => (
                <Badge key={topicIndex} variant="outline" className="text-xs">
                  {topic}
                </Badge>
              ))}
              {chapter.topics.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{chapter.topics.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const ResourceCard = ({ resource }: { resource: any }) => {
    const getResourceIcon = (type: string) => {
      switch (type.toLowerCase()) {
        case "reference":
          return BookOpen
        case "guide":
          return Target
        case "interactive":
          return Headphones
        case "tool":
          return Settings
        case "calculator":
          return Calculator
        case "exercises":
          return Trophy
        default:
          return BookOpen
      }
    }

    const IconComponent = getResourceIcon(resource.type)

    return (
      <Card className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:bg-gray-50">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <IconComponent className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <Badge variant="secondary" className="mt-1">
                  {resource.type}
                </Badge>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription>{resource.description}</CardDescription>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Interactive Mathematics for Musicians</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master trigonometry and calculus through the lens of music and audio engineering
          </p>

          {/* Overall Progress */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium">Overall Progress</span>
              <span className="text-gray-600">
                {totalCompleted}/{totalChapters} chapters
              </span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <div className="text-xs text-gray-500 mt-1 text-center">{Math.round(overallProgress)}% complete</div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-lg p-1 shadow-sm border">
            <Button
              variant={selectedSection === "trigonometry" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedSection("trigonometry")}
              className="flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              Trigonometry
              <Badge variant="secondary" className="ml-1">
                {trigCompletedCount}/{courseData.trigonometry.chapters.length}
              </Badge>
            </Button>
            <Button
              variant={selectedSection === "calculus" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedSection("calculus")}
              className="flex items-center gap-2"
            >
              <Music className="w-4 h-4" />
              Calculus
              <Badge variant="secondary" className="ml-1">
                {calcCompletedCount}/{courseData.calculus.chapters.length}
              </Badge>
            </Button>
            <Button
              variant={selectedSection === "resources" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedSection("resources")}
              className="flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Resources
            </Button>
          </div>
        </div>

        {/* Content Sections */}
        {selectedSection === "trigonometry" && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">{courseData.trigonometry.title}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{courseData.trigonometry.description}</p>
              <div className="mt-4">
                <Progress
                  value={(trigCompletedCount / courseData.trigonometry.chapters.length) * 100}
                  className="h-2 max-w-md mx-auto"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {trigCompletedCount} of {courseData.trigonometry.chapters.length} chapters completed
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseData.trigonometry.chapters.map((chapter, index) => (
                <ChapterCard
                  key={chapter.id}
                  chapter={chapter}
                  index={index}
                  sectionLength={courseData.trigonometry.chapters.length}
                />
              ))}
            </div>
          </div>
        )}

        {selectedSection === "calculus" && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-orange-900 mb-2">{courseData.calculus.title}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{courseData.calculus.description}</p>
              <div className="mt-4">
                <Progress
                  value={(calcCompletedCount / courseData.calculus.chapters.length) * 100}
                  className="h-2 max-w-md mx-auto"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {calcCompletedCount} of {courseData.calculus.chapters.length} chapters completed
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseData.calculus.chapters.map((chapter, index) => (
                <ChapterCard
                  key={chapter.id}
                  chapter={chapter}
                  index={courseData.trigonometry.chapters.length + index}
                  sectionLength={courseData.calculus.chapters.length}
                />
              ))}
            </div>
          </div>
        )}

        {selectedSection === "resources" && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{courseData.resources.title}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Additional tools, references, and interactive content to enhance your learning
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseData.resources.items.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        )}

        {/* Achievement Section */}
        {totalCompleted > 0 && (
          <div className="mt-12 text-center">
            <Separator className="mb-6" />
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Your Progress</h3>
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{trigCompletedCount}</div>
                <div className="text-sm text-gray-600">Trigonometry</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{calcCompletedCount}</div>
                <div className="text-sm text-gray-600">Calculus</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{totalCompleted}</div>
                <div className="text-sm text-gray-600">Total Chapters</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

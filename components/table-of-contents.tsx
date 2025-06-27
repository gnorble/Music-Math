"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Music,
  Calculator,
  CheckCircle,
  Circle,
  Clock,
  BookOpen,
  Headphones,
  AudioWaveformIcon as Waveform,
  Settings,
  HelpCircle,
  ChevronRight,
} from "lucide-react"

interface CourseData {
  trigonometry: {
    title: string
    description: string
    chapters: Array<{
      id: string
      title: string
      description: string
      difficulty: string
      duration: string
      topics: string[]
      prerequisites?: string[]
    }>
  }
  calculus: {
    title: string
    description: string
    chapters: Array<{
      id: string
      title: string
      description: string
      difficulty: string
      duration: string
      topics: string[]
      prerequisites?: string[]
    }>
  }
  resources: {
    title: string
    items: Array<{
      id: string
      title: string
      description: string
      type: string
      icon: string
    }>
  }
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
        return "bg-green-100 text-green-800"
      case "beginner":
        return "bg-blue-100 text-blue-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getIcon = (iconName: string) => {
    const icons = {
      book: BookOpen,
      headphones: Headphones,
      waveform: Waveform,
      settings: Settings,
      help: HelpCircle,
    }
    const IconComponent = icons[iconName as keyof typeof icons] || BookOpen
    return <IconComponent className="w-5 h-5" />
  }

  const trigCompleted = courseData.trigonometry.chapters.filter((ch) => completedChapters.includes(ch.id)).length
  const calcCompleted = courseData.calculus.chapters.filter((ch) => completedChapters.includes(ch.id)).length

  return (
    <div className="space-y-8">
      {/* Trigonometry Section */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Music className="w-6 h-6 text-blue-600 mr-2" />
              <div>
                <CardTitle className="text-xl text-blue-900">{courseData.trigonometry.title}</CardTitle>
                <p className="text-blue-700 text-sm">{courseData.trigonometry.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-blue-600 font-medium">
                {trigCompleted}/{courseData.trigonometry.chapters.length} completed
              </div>
              <Progress
                value={(trigCompleted / courseData.trigonometry.chapters.length) * 100}
                className="w-20 h-1.5 mt-1"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {courseData.trigonometry.chapters.map((chapter, index) => (
              <Card
                key={chapter.id}
                className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-blue-400 hover:bg-blue-50"
                onClick={() => onChapterSelect(chapter.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="flex items-center">
                        {completedChapters.includes(chapter.id) ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400" />
                        )}
                        <span className="ml-2 text-xs font-medium text-gray-500 w-12">Ch {index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{chapter.title}</h3>
                        <p className="text-xs text-gray-600 line-clamp-1">{chapter.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={`${getDifficultyColor(chapter.difficulty)} text-xs px-1 py-0`} size="sm">
                            {chapter.difficulty}
                          </Badge>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {chapter.duration}
                          </div>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Calculus Section */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calculator className="w-6 h-6 text-purple-600 mr-2" />
              <div>
                <CardTitle className="text-xl text-purple-900">{courseData.calculus.title}</CardTitle>
                <p className="text-purple-700 text-sm">{courseData.calculus.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-purple-600 font-medium">
                {calcCompleted}/{courseData.calculus.chapters.length} completed
              </div>
              <Progress
                value={(calcCompleted / courseData.calculus.chapters.length) * 100}
                className="w-20 h-1.5 mt-1"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {courseData.calculus.chapters.map((chapter, index) => (
              <Card
                key={chapter.id}
                className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-purple-400 hover:bg-purple-50"
                onClick={() => onChapterSelect(chapter.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="flex items-center">
                        {completedChapters.includes(chapter.id) ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400" />
                        )}
                        <span className="ml-2 text-xs font-medium text-gray-500 w-12">
                          Ch {courseData.trigonometry.chapters.length + index + 1}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{chapter.title}</h3>
                        <p className="text-xs text-gray-600 line-clamp-1">{chapter.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={`${getDifficultyColor(chapter.difficulty)} text-xs px-1 py-0`} size="sm">
                            {chapter.difficulty}
                          </Badge>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {chapter.duration}
                          </div>
                          {chapter.prerequisites && (
                            <div className="text-xs text-orange-600 truncate">
                              Req: {chapter.prerequisites.slice(0, 1).join(", ")}
                              {chapter.prerequisites.length > 1 && "..."}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Resources Section */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-green-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl text-green-900 flex items-center">
            <BookOpen className="w-6 h-6 text-green-600 mr-2" />
            {courseData.resources.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {courseData.resources.items.map((resource) => (
              <Card
                key={resource.id}
                className="hover:shadow-md transition-shadow cursor-pointer hover:bg-green-50"
                onClick={() => onChapterSelect(resource.id)}
              >
                <CardContent className="p-3 text-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    {getIcon(resource.icon)}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">{resource.title}</h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{resource.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {resource.type}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

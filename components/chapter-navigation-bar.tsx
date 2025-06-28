"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ChevronLeft, ChevronRight, Menu, Home, BookOpen, Calculator, Music, CheckCircle } from "lucide-react"

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

interface ChapterNavigationBarProps {
  currentChapterId: string
  courseData: CourseData
  completedChapters: string[]
  onChapterSelect: (chapterId: string) => void
  onHome: () => void
}

export function ChapterNavigationBar({
  currentChapterId,
  courseData,
  completedChapters,
  onChapterSelect,
  onHome,
}: ChapterNavigationBarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const allChapters = [...courseData.trigonometry.chapters, ...courseData.calculus.chapters]
  const currentIndex = allChapters.findIndex((ch) => ch.id === currentChapterId)
  const currentChapter = allChapters[currentIndex]
  const previousChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null

  const totalChapters = allChapters.length
  const completedCount = completedChapters.length
  const progressPercentage = (completedCount / totalChapters) * 100

  const isTrigChapter = courseData.trigonometry.chapters.some((ch) => ch.id === currentChapterId)
  const sectionColor = isTrigChapter ? "blue" : "orange"

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

  const NavigationContent = () => (
    <div className="space-y-6">
      {/* Course Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Course Progress</span>
          <span className="text-gray-600">
            {completedCount}/{totalChapters} chapters
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
        <div className="text-xs text-gray-500 text-center">{Math.round(progressPercentage)}% complete</div>
      </div>

      {/* Trigonometry Chapters */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="w-4 h-4 text-blue-600" />
          <h3 className="font-semibold text-blue-900">Trigonometry</h3>
        </div>
        <div className="space-y-1">
          {courseData.trigonometry.chapters.map((chapter, index) => (
            <button
              key={chapter.id}
              onClick={() => {
                onChapterSelect(chapter.id)
                setIsOpen(false)
              }}
              className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${
                chapter.id === currentChapterId
                  ? "bg-blue-100 text-blue-900 border border-blue-200"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-8">Ch {index + 1}</span>
                  {completedChapters.includes(chapter.id) && <CheckCircle className="w-3 h-3 text-green-600" />}
                  <span className="truncate">{chapter.title}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Calculus Chapters */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Music className="w-4 h-4 text-orange-600" />
          <h3 className="font-semibold text-orange-900">Calculus</h3>
        </div>
        <div className="space-y-1">
          {courseData.calculus.chapters.map((chapter, index) => (
            <button
              key={chapter.id}
              onClick={() => {
                onChapterSelect(chapter.id)
                setIsOpen(false)
              }}
              className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${
                chapter.id === currentChapterId
                  ? "bg-orange-100 text-orange-900 border border-orange-200"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-8">
                    Ch {courseData.trigonometry.chapters.length + index + 1}
                  </span>
                  {completedChapters.includes(chapter.id) && <CheckCircle className="w-3 h-3 text-green-600" />}
                  <span className="truncate">{chapter.title}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className={`sticky top-0 z-50 bg-white border-b shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Home and navigation */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onHome} className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="py-4">
                  <NavigationContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop chapter dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Chapters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto">
                <div className="p-2">
                  <NavigationContent />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Center - Current chapter info */}
          {currentChapter && (
            <div className="flex-1 mx-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <Badge className={getDifficultyColor(currentChapter.difficulty)} variant="secondary">
                  {currentChapter.difficulty}
                </Badge>
                <span className="text-sm font-medium truncate max-w-xs">{currentChapter.title}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Chapter {currentIndex + 1} of {totalChapters}
              </div>
            </div>
          )}

          {/* Right side - Navigation buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => previousChapter && onChapterSelect(previousChapter.id)}
              disabled={!previousChapter}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => nextChapter && onChapterSelect(nextChapter.id)}
              disabled={!nextChapter}
              className="flex items-center gap-1"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronLeft, ChevronRight, Home, ExternalLink, BookOpen } from "lucide-react"
import { courseData, chapterSources } from "@/data/course-data"

interface ChapterNavigationBarProps {
  currentChapterId: string
  onNavigate: (chapterId: string) => void
  onBackToTOC: () => void
}

export function ChapterNavigationBar({ currentChapterId, onNavigate, onBackToTOC }: ChapterNavigationBarProps) {
  // Get all chapters in order
  const allChapters = [...courseData.trigonometry.chapters, ...courseData.calculus.chapters]
  const currentIndex = allChapters.findIndex((chapter) => chapter.id === currentChapterId)
  const currentChapter = allChapters[currentIndex]

  const previousChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null

  const sources = chapterSources[currentChapterId as keyof typeof chapterSources] || []

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Previous Button */}
          <div className="flex items-center space-x-2">
            {previousChapter ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate(previousChapter.id)}
                className="flex items-center space-x-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
            ) : (
              <div className="w-20" /> // Spacer
            )}
          </div>

          {/* Center: Chapter Title and TOC Button */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBackToTOC} className="flex items-center space-x-1">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Table of Contents</span>
            </Button>
            <div className="text-center">
              <h1 className="text-lg font-semibold text-gray-900 truncate max-w-xs sm:max-w-md">
                {currentChapter?.title || "Chapter"}
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">{currentChapter?.difficulty}</p>
            </div>
          </div>

          {/* Right: Next Button and Sources */}
          <div className="flex items-center space-x-2">
            {/* Sources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-1 bg-transparent">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Sources</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Additional Resources
                </div>
                {sources.map((source, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full"
                    >
                      <span className="truncate">{source.name}</span>
                      <ExternalLink className="w-3 h-3 ml-2 flex-shrink-0" />
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {nextChapter ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate(nextChapter.id)}
                className="flex items-center space-x-1"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <div className="w-20" /> // Spacer
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

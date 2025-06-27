"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, TrendingUp } from "lucide-react"

interface Chapter {
  id: string
  title: string
  description: string
  difficulty: string
  topics: string[]
  color: string
}

interface ChapterNavigationProps {
  trigChapters: Chapter[]
  calcChapters: Chapter[]
  currentChapter: string
  onChapterChange: (chapterId: string) => void
}

export function ChapterNavigation({
  trigChapters,
  calcChapters,
  currentChapter,
  onChapterChange,
}: ChapterNavigationProps) {
  return (
    <div className="sticky top-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Music className="w-5 h-5 mr-2" />
            Trigonometry
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {trigChapters.map((chapter) => (
            <Button
              key={chapter.id}
              variant={currentChapter === chapter.id ? "default" : "ghost"}
              className="w-full justify-start text-left h-auto p-3"
              onClick={() => onChapterChange(chapter.id)}
            >
              <div>
                <div className="font-medium text-sm">{chapter.title}</div>
                <div className="text-xs text-gray-500">{chapter.difficulty}</div>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Calculus
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {calcChapters.map((chapter) => (
            <Button
              key={chapter.id}
              variant={currentChapter === chapter.id ? "default" : "ghost"}
              className="w-full justify-start text-left h-auto p-3"
              onClick={() => onChapterChange(chapter.id)}
            >
              <div>
                <div className="font-medium text-sm">{chapter.title}</div>
                <div className="text-xs text-gray-500">{chapter.difficulty}</div>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

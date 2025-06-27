"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChapterNavigation } from "@/components/chapter-navigation"
import { ReferenceModals } from "@/components/reference-modals"
import { TrigIntro } from "@/chapters/trig-intro"
import { TrigUnitCircle } from "@/chapters/trig-unit-circle"
import { mathSymbols, problemSolvingGuide, trigChapters, calcChapters } from "@/data/course-data"

export default function MathMusicCourse() {
  const [currentChapter, setCurrentChapter] = useState("trig-intro")
  const [referenceOpen, setReferenceOpen] = useState(false)
  const [problemSolvingOpen, setProblemSolvingOpen] = useState(false)
  const [angle, setAngle] = useState([45])

  const getCurrentChapterInfo = () => {
    const allChapters = [...trigChapters, ...calcChapters]
    return allChapters.find((ch) => ch.id === currentChapter)
  }

  const renderChapterContent = () => {
    switch (currentChapter) {
      case "trig-intro":
        return <TrigIntro onNextChapter={() => setCurrentChapter("trig-1")} />
      case "trig-1":
        return <TrigUnitCircle angle={angle} onAngleChange={setAngle} />
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Chapter Coming Soon</h2>
            <p className="text-gray-600">This chapter is currently being developed. Please check back later!</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mathematics for Musicians</h1>
          <p className="text-xl text-gray-600">An Interactive Course in Trigonometry and Calculus</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ChapterNavigation
              trigChapters={trigChapters}
              calcChapters={calcChapters}
              currentChapter={currentChapter}
              onChapterChange={setCurrentChapter}
            />

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full mb-2 bg-transparent"
                  onClick={() => setReferenceOpen(!referenceOpen)}
                >
                  Math Symbols
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => setProblemSolvingOpen(!problemSolvingOpen)}
                >
                  Problem Solving
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-6">
              {getCurrentChapterInfo() && (
                <Card className={getCurrentChapterInfo().color}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">{getCurrentChapterInfo().title}</CardTitle>
                        <CardDescription className="text-lg mt-1">
                          {getCurrentChapterInfo().description}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{getCurrentChapterInfo().difficulty}</div>
                        <div className="text-xs text-gray-600">{getCurrentChapterInfo().topics.join(" • ")}</div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )}

              {renderChapterContent()}
            </div>
          </div>
        </div>

        <ReferenceModals
          referenceOpen={referenceOpen}
          problemSolvingOpen={problemSolvingOpen}
          onReferenceClose={() => setReferenceOpen(false)}
          onProblemSolvingClose={() => setProblemSolvingOpen(false)}
          mathSymbols={mathSymbols}
          problemSolvingGuide={problemSolvingGuide}
        />
      </div>
    </div>
  )
}

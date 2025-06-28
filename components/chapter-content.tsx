"use client"

import { useState, useEffect } from "react"
import { ChapterNavigationBar } from "@/components/chapter-navigation-bar"
import TrigIntro from "@/chapters/trig-intro"
import TrigUnitCircle from "@/chapters/trig-unit-circle"
import TrigFunctions from "@/chapters/trig-functions"
import { TrigIdentities } from "@/chapters/trig-identities"
import { TrigInverse } from "@/chapters/trig-inverse"
import { TrigEquations } from "@/chapters/trig-equations"
import { MusicTheoryApplications } from "@/chapters/music-theory-applications"
import CalcIntro from "@/chapters/calc-intro"
import CalcLimits from "@/chapters/calc-limits"
import CalcDerivatives from "@/chapters/calc-derivatives"
import CalcDerivativeRules from "@/chapters/calc-derivative-rules"
import CalcDerivativeApps from "@/chapters/calc-derivative-apps"
import CalcIntegrals from "@/chapters/calc-integrals"
import CalcIntegrationTechniques from "@/chapters/calc-integration-techniques"
import CalcApplications from "@/chapters/calc-applications"
import { courseData } from "@/data/course-data"

interface ChapterContentProps {
  chapterId: string
  onBack: () => void
  onNavigate: (chapterId: string) => void
  onComplete: () => void
  isCompleted: boolean
}

export function ChapterContent({ chapterId, onBack, onNavigate, onComplete, isCompleted }: ChapterContentProps) {
  const [showCompletionDelay, setShowCompletionDelay] = useState(false)

  // Get all chapters in order for navigation
  const allChapters = [...courseData.trigonometry.chapters, ...courseData.calculus.chapters]
  const currentIndex = allChapters.findIndex((chapter) => chapter.id === chapterId)
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null

  const handleChapterComplete = () => {
    onComplete()
    setShowCompletionDelay(true)

    // Auto-navigate to next chapter after 1 second
    if (nextChapter) {
      setTimeout(() => {
        onNavigate(nextChapter.id)
        setShowCompletionDelay(false)
      }, 1000)
    }
  }

  // Reset completion delay when chapter changes
  useEffect(() => {
    setShowCompletionDelay(false)
  }, [chapterId])

  const renderChapterContent = () => {
    switch (chapterId) {
      case "trig-intro":
        return <TrigIntro onComplete={handleChapterComplete} />
      case "trig-unit-circle":
        return <TrigUnitCircle onComplete={handleChapterComplete} />
      case "trig-functions":
        return <TrigFunctions onComplete={handleChapterComplete} />
      case "trig-identities":
        return <TrigIdentities onComplete={handleChapterComplete} />
      case "trig-inverse":
        return <TrigInverse onComplete={handleChapterComplete} />
      case "trig-equations":
        return <TrigEquations onComplete={handleChapterComplete} />
      case "music-theory-applications":
        return <MusicTheoryApplications onComplete={handleChapterComplete} />
      case "calc-intro":
        return <CalcIntro onComplete={handleChapterComplete} />
      case "calc-limits":
        return <CalcLimits onComplete={handleChapterComplete} />
      case "calc-derivatives":
        return <CalcDerivatives onComplete={handleChapterComplete} />
      case "calc-derivative-rules":
        return <CalcDerivativeRules onComplete={handleChapterComplete} />
      case "calc-derivative-apps":
        return <CalcDerivativeApps onComplete={handleChapterComplete} />
      case "calc-integrals":
        return <CalcIntegrals onComplete={handleChapterComplete} />
      case "calc-integration-techniques":
        return <CalcIntegrationTechniques onComplete={handleChapterComplete} />
      case "calc-applications":
        return <CalcApplications onComplete={handleChapterComplete} />
      default:
        return (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Chapter Not Found</h2>
              <p className="text-gray-600 mb-4">The requested chapter could not be loaded.</p>
              <button onClick={onBack} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Return to Table of Contents
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ChapterNavigationBar currentChapterId={chapterId} onNavigate={onNavigate} onBackToTOC={onBack} />

      <div className="max-w-6xl mx-auto">
        {showCompletionDelay && nextChapter && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm">
                  Chapter completed! Proceeding to <strong>{nextChapter.title}</strong> in a moment...
                </p>
              </div>
            </div>
          </div>
        )}

        <main className="py-8">{renderChapterContent()}</main>
      </div>
    </div>
  )
}

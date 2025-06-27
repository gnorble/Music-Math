"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ReferenceModalsProps {
  referenceOpen: boolean
  problemSolvingOpen: boolean
  onReferenceClose: () => void
  onProblemSolvingClose: () => void
  mathSymbols: Record<string, string>
  problemSolvingGuide: Record<string, any>
}

export function ReferenceModals({
  referenceOpen,
  problemSolvingOpen,
  onReferenceClose,
  onProblemSolvingClose,
  mathSymbols,
  problemSolvingGuide,
}: ReferenceModalsProps) {
  return (
    <>
      {referenceOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Mathematical Symbols Reference</CardTitle>
                <Button variant="ghost" onClick={onReferenceClose}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {Object.entries(mathSymbols).map(([symbol, description]) => (
                  <div key={symbol} className="border-b pb-3">
                    <h4 className="font-semibold text-lg mb-1">{symbol}</h4>
                    <p className="text-sm text-gray-700">{description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {problemSolvingOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Problem Solving Guide</CardTitle>
                <Button variant="ghost" onClick={onProblemSolvingClose}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(problemSolvingGuide).map(([topic, guide]) => (
                  <div key={topic} className="border-b pb-4">
                    <h3 className="font-semibold text-xl mb-2">{topic}</h3>
                    <p className="text-gray-700 mb-3">{guide.description}</p>
                    <div className="mb-3">
                      <h4 className="font-medium mb-2">Steps:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm">
                        {guide.steps.map((step: string, index: number) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <h4 className="font-medium mb-1">Example:</h4>
                      <p className="text-sm">{guide.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

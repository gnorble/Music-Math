"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { problemSolvingGuide } from "@/data/course-data"

export function ProblemSolvingGuide() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Problem Solving Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(problemSolvingGuide).map(([topic, guide]) => (
              <div key={topic} className="border-b pb-4 last:border-b-0">
                <h3 className="font-semibold text-xl mb-2 text-purple-900">{topic}</h3>
                <p className="text-gray-700 mb-3">{guide.description}</p>
                <div className="mb-3">
                  <h4 className="font-medium mb-2">Steps:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    {guide.steps.map((step, index) => (
                      <li key={index} className="text-gray-600">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <h4 className="font-medium mb-1">Example:</h4>
                  <p className="text-sm text-blue-800">{guide.example}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Slider } from "@/components/ui/slider"

interface UnitCircleVisualizationProps {
  angle: number[]
  onAngleChange: (value: number[]) => void
}

export function UnitCircleVisualization({ angle, onAngleChange }: UnitCircleVisualizationProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h4 className="font-semibold mb-3">Angle Conversion</h4>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Angle (degrees): {angle[0]}°</label>
            <Slider value={angle} onValueChange={onAngleChange} max={360} min={0} step={15} className="mt-2" />
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-sm">
              <strong>In radians:</strong> {((angle[0] * Math.PI) / 180).toFixed(3)} rad
            </p>
            <p className="text-sm">
              <strong>sin({angle[0]}°):</strong> {Math.sin((angle[0] * Math.PI) / 180).toFixed(3)}
            </p>
            <p className="text-sm">
              <strong>cos({angle[0]}°):</strong> {Math.cos((angle[0] * Math.PI) / 180).toFixed(3)}
            </p>
            <p className="text-sm">
              <strong>tan({angle[0]}°):</strong> {Math.tan((angle[0] * Math.PI) / 180).toFixed(3)}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Unit Circle Visualization</h4>
        <div className="h-64 w-full flex items-center justify-center">
          <div className="relative w-48 h-48 border-2 border-gray-300 rounded-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            </div>
            <div
              className="absolute top-1/2 left-1/2 w-24 h-0.5 bg-red-500 origin-left transform -translate-y-0.5"
              style={{ transform: `translate(-50%, -50%) rotate(${-angle[0]}deg) translateX(50%)` }}
            ></div>
            <div
              className="absolute w-3 h-3 bg-red-600 rounded-full transform -translate-x-1.5 -translate-y-1.5"
              style={{
                left: `${50 + 47 * Math.cos((angle[0] * Math.PI) / 180)}%`,
                top: `${50 - 47 * Math.sin((angle[0] * Math.PI) / 180)}%`,
              }}
            ></div>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs">90°</div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs">270°</div>
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs">180°</div>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs">0°</div>
          </div>
        </div>
      </div>
    </div>
  )
}

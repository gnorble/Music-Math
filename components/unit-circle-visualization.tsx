"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { Slider } from "@/components/ui/slider"

interface UnitCircleVisualizationProps {
  angle: number[]
  onAngleChange?: (angle: number[]) => void
}

export function UnitCircleVisualization({ angle, onAngleChange }: UnitCircleVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const size = 300
    canvas.width = size
    canvas.height = size

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Set up coordinate system (center of canvas)
    const centerX = size / 2
    const centerY = size / 2
    const radius = 120

    // Draw coordinate axes
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1
    ctx.beginPath()
    // X-axis
    ctx.moveTo(20, centerY)
    ctx.lineTo(size - 20, centerY)
    // Y-axis
    ctx.moveTo(centerX, 20)
    ctx.lineTo(centerX, size - 20)
    ctx.stroke()

    // Draw unit circle
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.stroke()

    // Convert angle to radians
    const angleRad = (angle[0] * Math.PI) / 180

    // Calculate point on circle
    const x = Math.cos(angleRad)
    const y = Math.sin(angleRad)
    const pointX = centerX + x * radius
    const pointY = centerY - y * radius // Subtract because canvas Y increases downward

    // Draw radius line
    ctx.strokeStyle = "#ef4444"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(pointX, pointY)
    ctx.stroke()

    // Draw point on circle
    ctx.fillStyle = "#ef4444"
    ctx.beginPath()
    ctx.arc(pointX, pointY, 6, 0, 2 * Math.PI)
    ctx.fill()

    // Draw coordinate lines
    ctx.strokeStyle = "#6b7280"
    ctx.lineWidth = 1
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    // Vertical line to x-axis
    ctx.moveTo(pointX, pointY)
    ctx.lineTo(pointX, centerY)
    // Horizontal line to y-axis
    ctx.moveTo(pointX, pointY)
    ctx.lineTo(centerX, pointY)
    ctx.stroke()
    ctx.setLineDash([])

    // Add labels
    ctx.fillStyle = "#374151"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"

    // Angle label
    ctx.fillText(`${angle[0]}°`, centerX + 30, centerY - 30)

    // Coordinate labels
    ctx.fillText(`(${x.toFixed(3)}, ${y.toFixed(3)})`, pointX, pointY - 15)

    // Axis labels
    ctx.fillText("cos θ", pointX, centerY + 15)
    ctx.fillText("sin θ", centerX - 15, pointY)

    // Cardinal direction labels
    ctx.fillText("0°", centerX + radius + 15, centerY + 5)
    ctx.fillText("90°", centerX, 35)
    ctx.fillText("180°", centerX - radius - 20, centerY + 5)
    ctx.fillText("270°", centerX, size - 20)
  }, [angle])

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onAngleChange) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left - canvas.width / 2
    const y = -(event.clientY - rect.top - canvas.height / 2) // Flip Y coordinate

    // Calculate angle from click position
    let clickAngle = (Math.atan2(y, x) * 180) / Math.PI
    if (clickAngle < 0) clickAngle += 360

    onAngleChange([Math.round(clickAngle)])
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <canvas
        ref={canvasRef}
        className="border border-gray-300 rounded-lg cursor-pointer"
        onClick={handleCanvasClick}
        title="Click to set angle"
      />
      <div className="text-sm text-gray-600 text-center max-w-md">
        <p>
          <strong>Interactive Unit Circle:</strong> Click anywhere on the circle to set the angle, or use the controls
          above.
        </p>
        <p className="mt-1">Red dot shows the current position. Dashed lines show the cos(θ) and sin(θ) values.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mt-8">
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
      </div>
    </div>
  )
}

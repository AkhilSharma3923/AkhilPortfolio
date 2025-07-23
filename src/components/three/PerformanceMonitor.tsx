"use client"

import type React from "react"
import { useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"

interface PerformanceStats {
  fps: number
  memory: number
  drawCalls: number
}

const PerformanceMonitor: React.FC<{ onPerformanceChange?: (stats: PerformanceStats) => void }> = ({
  onPerformanceChange,
}) => {
  const { gl } = useThree()
  const [stats, setStats] = useState<PerformanceStats>({ fps: 60, memory: 0, drawCalls: 0 })

  let frameCount = 0
  let lastTime = performance.now()

  useFrame(() => {
    frameCount++
    const currentTime = performance.now()

    if (currentTime - lastTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
      const memory = (performance as any).memory ? (performance as any).memory.usedJSHeapSize / 1048576 : 0
      const drawCalls = gl.info.render.calls

      const newStats = { fps, memory, drawCalls }
      setStats(newStats)
      onPerformanceChange?.(newStats)

      frameCount = 0
      lastTime = currentTime
    }
  })

  return (
    <div className="fixed top-4 left-4 bg-black/50 text-white p-2 rounded text-xs font-mono z-50">
      <div>FPS: {stats.fps}</div>
      <div>Memory: {stats.memory.toFixed(1)}MB</div>
      <div>Draw Calls: {stats.drawCalls}</div>
    </div>
  )
}

export default PerformanceMonitor

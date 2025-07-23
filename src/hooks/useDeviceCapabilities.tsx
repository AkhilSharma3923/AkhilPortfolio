"use client"

import { useState, useEffect } from "react"

interface DeviceCapabilities {
  isMobile: boolean
  isLowEnd: boolean
  supportsWebGL2: boolean
  maxTextureSize: number
  devicePixelRatio: number
}

export const useDeviceCapabilities = (): DeviceCapabilities => {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isMobile: false,
    isLowEnd: false,
    supportsWebGL2: false,
    maxTextureSize: 0,
    devicePixelRatio: 1,
  })

  useEffect(() => {
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl")

    if (gl) {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const supportsWebGL2 = !!canvas.getContext("webgl2")
      const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
      const devicePixelRatio = window.devicePixelRatio || 1

      // Detect low-end devices
      const isLowEnd = isMobile && (maxTextureSize < 4096 || devicePixelRatio < 2 || navigator.hardwareConcurrency < 4)

      setCapabilities({
        isMobile,
        isLowEnd,
        supportsWebGL2,
        maxTextureSize,
        devicePixelRatio,
      })
    }

    canvas.remove()
  }, [])

  return capabilities
}

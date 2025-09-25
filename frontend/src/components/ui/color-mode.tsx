import type { ReactNode } from "react"
import { createContext, useContext, useEffect, useState } from "react"

type ColorMode = "light" | "dark"

interface ColorModeContextType {
  colorMode: ColorMode
  toggleColorMode: () => void
  setColorMode: (mode: ColorMode) => void
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined)

export interface ColorModeProviderProps {
  children: ReactNode
  defaultValue?: ColorMode
}

export function ColorModeProvider({ 
  children, 
  defaultValue = "light" 
}: ColorModeProviderProps) {
  const [colorMode, setColorModeState] = useState<ColorMode>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("chakra-ui-color-mode")
      return (stored as ColorMode) || defaultValue
    }
    return defaultValue
  })

  useEffect(() => {
    const root = document.documentElement
    root.style.colorScheme = colorMode
    root.setAttribute("data-theme", colorMode)
  }, [colorMode])

  const setColorMode = (mode: ColorMode) => {
    setColorModeState(mode)
    localStorage.setItem("chakra-ui-color-mode", mode)
  }

  const toggleColorMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light")
  }

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode, setColorMode }}>
      {children}
    </ColorModeContext.Provider>
  )
}

export function useColorMode() {
  const context = useContext(ColorModeContext)
  if (!context) {
    throw new Error("useColorMode must be used within ColorModeProvider")
  }
  return context
}
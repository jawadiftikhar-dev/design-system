import { createContext, useCallback, useEffect, useState } from 'react'

export const ThemeContext = createContext(null)

const STORAGE_KEY = 'mehfil-theme'

function getInitialTheme() {
  if (typeof document !== 'undefined') {
    const attrTheme = document.documentElement.getAttribute('data-theme')
    if (attrTheme === 'light' || attrTheme === 'dark') {
      return attrTheme
    }
  }
  return 'light'
}

export function ThemeProvider({ children }) {
  // Read the theme already resolved on <html> by the no-flash inline script
  const [theme, setThemeState] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Keep in sync with OS preference only if the user has not saved a manual choice yet
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleSystemChange = (event) => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (!saved) {
          setThemeState(event.matches ? 'dark' : 'light')
        }
      } catch {
        // Ignore storage errors in restricted environments
      }
    }

    mediaQuery.addEventListener('change', handleSystemChange)
    return () => mediaQuery.removeEventListener('change', handleSystemChange)
  }, [])

  const setTheme = useCallback((nextTheme) => {
    if (nextTheme !== 'light' && nextTheme !== 'dark') return
    setThemeState(nextTheme)
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme)
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Ignore storage errors in restricted environments
      }
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
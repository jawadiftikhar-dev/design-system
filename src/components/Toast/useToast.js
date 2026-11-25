import { useCallback, useEffect, useRef, useState } from 'react'

export default function useToast() {
  const [toasts, setToasts] = useState([])
  // Keep timer IDs in a ref keyed by toast id so timer updates never trigger re-renders
  const timersRef = useRef({})
  const toastsRef = useRef([])

  const removeToast = useCallback((id) => {
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id])
      delete timersRef.current[id]
    }
    toastsRef.current = toastsRef.current.filter((item) => item.id !== id)
    setToasts((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const addToast = useCallback(
    ({ message, title = '', variant = 'info', duration = 4000 }) => {
      // Deduplicate by message text and variant: reset timer instead of stacking duplicates
      const existing = toastsRef.current.find(
        (item) => item.message === message && item.variant === variant
      )

      if (existing) {
        if (timersRef.current[existing.id]) {
          clearTimeout(timersRef.current[existing.id])
        }
        if (duration > 0) {
          timersRef.current[existing.id] = setTimeout(() => {
            removeToast(existing.id)
          }, duration)
        }
        return existing.id
      }

      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      const nextToast = { id, message, title, variant }

      toastsRef.current = [...toastsRef.current, nextToast]
      setToasts((prev) => [...prev, nextToast])

      if (duration > 0) {
        timersRef.current[id] = setTimeout(() => {
          removeToast(id)
        }, duration)
      }

      return id
    },
    [removeToast]
  )

  const clearAllToasts = useCallback(() => {
    Object.values(timersRef.current).forEach((timerId) => clearTimeout(timerId))
    timersRef.current = {}
    toastsRef.current = []
    setToasts([])
  }, [])

  // Clear all pending timers when the host unmounts to prevent state updates on unmounted components
  useEffect(() => {
    const timers = timersRef.current
    return () => {
      Object.values(timers).forEach((timerId) => clearTimeout(timerId))
    }
  }, [])

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
  }
}
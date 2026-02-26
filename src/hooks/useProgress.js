import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'go-tutorial-progress'

export function useProgress(totalLessons) {
  const [completed, setCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed))
  }, [completed])

  const toggleLesson = useCallback((id) => {
    setCompleted(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }, [])

  const isCompleted = useCallback((id) => completed.includes(id), [completed])

  const percentage = totalLessons > 0
    ? Math.round((completed.length / totalLessons) * 100)
    : 0

  const resetProgress = useCallback(() => {
    setCompleted([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return { completed, toggleLesson, isCompleted, percentage, resetProgress }
}

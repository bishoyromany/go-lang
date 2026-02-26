import { ChevronDown, ChevronRight, CheckCircle2, Circle, BookOpen } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const difficultyColors = {
  beginner: '#10b981',
  intermediate: '#f59e0b',
  advanced: '#ef4444',
}

export default function Sidebar({ tutorials, onSelect, isCompleted, sidebarOpen }) {
  const { slug: activeSlug } = useParams()
  const modules = [...new Set(tutorials.map(t => t.module))]
  const [expanded, setExpanded] = useState(
    Object.fromEntries(modules.map(m => [m, true]))
  )

  const toggleModule = (mod) => {
    setExpanded(prev => ({ ...prev, [mod]: !prev[mod] }))
  }

  const getModuleProgress = (mod) => {
    const lessons = tutorials.filter(t => t.module === mod)
    const done = lessons.filter(t => isCompleted(t.id)).length
    return { done, total: lessons.length }
  }

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`} role="navigation" aria-label="Tutorial navigation">
      <div className="sidebar-header">
        <BookOpen size={22} aria-hidden="true" />
        <h2>Go Tutorial</h2>
      </div>

      <nav className="sidebar-nav" aria-label="Lessons">
        {modules.map(mod => {
          const { done, total } = getModuleProgress(mod)
          return (
            <div key={mod} className="module-group">
              <button
                className="module-header"
                onClick={() => toggleModule(mod)}
                aria-expanded={expanded[mod]}
                aria-controls={`module-${mod.replace(/\s+/g, '-')}`}
              >
                <span className="module-toggle" aria-hidden="true">
                  {expanded[mod] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
                <span className="module-name">{mod}</span>
                <span className="module-badge" aria-label={`${done} of ${total} completed`}>{done}/{total}</span>
              </button>

              {expanded[mod] && (
                <ul className="lesson-list" id={`module-${mod.replace(/\s+/g, '-')}`}>
                  {tutorials.filter(t => t.module === mod).map(lesson => (
                    <li key={lesson.id}>
                      <button
                        className={`lesson-item ${activeSlug === lesson.slug ? 'active' : ''}`}
                        onClick={() => onSelect(lesson.slug)}
                        aria-current={activeSlug === lesson.slug ? 'page' : undefined}
                      >
                        <span className="lesson-check" aria-hidden="true">
                          {isCompleted(lesson.id)
                            ? <CheckCircle2 size={16} className="check-done" />
                            : <Circle size={16} className="check-pending" />
                          }
                        </span>
                        <span className="lesson-info">
                          <span className="lesson-title">{lesson.title}</span>
                          <span className="lesson-meta">
                            <span
                              className="difficulty-dot"
                              style={{ background: difficultyColors[lesson.difficulty] }}
                              aria-hidden="true"
                            />
                            {lesson.duration}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

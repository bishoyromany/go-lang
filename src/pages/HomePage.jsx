import { useNavigate } from 'react-router-dom'
import {
  BookOpen, Clock, BarChart3, ChevronRight, Zap,
  Server, Terminal, TestTubes, Database, Rocket,
  Layers, Cpu, Package, FileCode
} from 'lucide-react'
import { useSEO } from '../hooks/useSEO'
import tutorials, { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '../data/tutorials'
import { useEffect } from 'react'

const moduleIcons = {
  'Foundations': BookOpen,
  'Data Structures': Layers,
  'Interfaces & Generics': Cpu,
  'Concurrency': Zap,
  'Error Handling': Terminal,
  'Packages & Modules': Package,
  'Standard Library': FileCode,
  'Testing': TestTubes,
  'Database': Database,
  'Advanced Patterns': Server,
  'Production': Rocket,
}

const difficultyColors = {
  beginner: 'var(--green)',
  intermediate: 'var(--amber)',
  advanced: 'var(--rose)',
}

export default function HomePage({ isCompleted }) {
  const navigate = useNavigate()
  const modules = [...new Set(tutorials.map(t => t.module))]

  useSEO({
    title: null,
    description: SITE_DESCRIPTION,
    path: '/',
    type: 'home',
  })

  useEffect(() => {
    const script = document.createElement('script')
    script.id = 'ld-course'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      provider: { '@type': 'Organization', name: 'GoTutor', url: SITE_URL },
      inLanguage: 'en',
      isAccessibleForFree: true,
      numberOfLessons: tutorials.length,
      hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: 'PT10H' },
      teaches: [
        'Go programming language', 'Golang concurrency', 'Go interfaces',
        'Go generics', 'Go testing', 'Go error handling', 'Go REST APIs',
        'Go database access', 'Go design patterns', 'Go deployment',
      ],
    })
    document.head.appendChild(script)

    const listScript = document.createElement('script')
    listScript.id = 'ld-itemlist'
    listScript.type = 'application/ld+json'
    listScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Go Tutorial Lessons',
      numberOfItems: tutorials.length,
      itemListElement: tutorials.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: t.title,
        url: `${SITE_URL}/lesson/${t.slug}`,
      })),
    })
    document.head.appendChild(listScript)

    return () => {
      document.getElementById('ld-course')?.remove()
      document.getElementById('ld-itemlist')?.remove()
    }
  }, [])

  const totalDuration = tutorials.reduce((sum, t) => sum + parseInt(t.duration), 0)
  const completedCount = tutorials.filter(t => isCompleted(t.id)).length

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-badge">Free &middot; 25 Lessons &middot; Beginner to Advanced</div>
        <h1 className="hero-title">
          Learn <span className="hero-accent">Go</span> Programming<br />
          from A to Z
        </h1>
        <p className="hero-subtitle">
          A comprehensive, hands-on tutorial covering everything from variables and functions
          to concurrency, generics, testing, database access, design patterns, and deploying
          production-grade Go services.
        </p>
        <div className="hero-stats">
          <div className="hero-stat">
            <BookOpen size={17} />
            <span><strong>25</strong> Lessons</span>
          </div>
          <div className="hero-stat">
            <Clock size={17} />
            <span><strong>{totalDuration}</strong> Minutes</span>
          </div>
          <div className="hero-stat">
            <BarChart3 size={17} />
            <span><strong>11</strong> Modules</span>
          </div>
        </div>
        <button className="hero-cta" onClick={() => {
          const first = tutorials.find(t => !isCompleted(t.id)) || tutorials[0]
          navigate(`/lesson/${first.slug}`)
        }}>
          {completedCount > 0 ? 'Continue Learning' : 'Start Learning'}
          <ChevronRight size={17} />
        </button>
        {completedCount > 0 && (
          <p className="hero-progress">{completedCount} of 25 lessons completed</p>
        )}
      </section>

      <section className="modules-section">
        <h2 className="section-title">Course Modules</h2>
        <div className="modules-grid">
          {modules.map(mod => {
            const lessons = tutorials.filter(t => t.module === mod)
            const done = lessons.filter(t => isCompleted(t.id)).length
            const Icon = moduleIcons[mod] || BookOpen
            return (
              <div key={mod} className="module-card">
                <div className="module-card-header">
                  <div className="module-card-icon">
                    <Icon size={19} />
                  </div>
                  <div>
                    <h3 className="module-card-title">{mod}</h3>
                    <span className="module-card-count">
                      {lessons.length} lesson{lessons.length > 1 ? 's' : ''} &middot; {done}/{lessons.length} done
                    </span>
                  </div>
                </div>
                <ul className="module-card-lessons">
                  {lessons.map(lesson => (
                    <li key={lesson.id}>
                      <button
                        className={`module-card-lesson ${isCompleted(lesson.id) ? 'done' : ''}`}
                        onClick={() => navigate(`/lesson/${lesson.slug}`)}
                      >
                        <span className="mcl-dot" style={{ background: difficultyColors[lesson.difficulty] }} />
                        <span className="mcl-title">{lesson.title}</span>
                        <span className="mcl-duration">{lesson.duration}</span>
                        <ChevronRight size={14} className="mcl-arrow" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Why This Tutorial?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Production-Grade Code</h3>
            <p>Every example follows real-world patterns used in companies running Go at scale. No toy examples.</p>
          </div>
          <div className="feature-card">
            <h3>Copy-Paste Ready</h3>
            <p>All code blocks have one-click copy. Take patterns directly into your projects.</p>
          </div>
          <div className="feature-card">
            <h3>Track Your Progress</h3>
            <p>Mark lessons complete as you go. Your progress is saved locally and persists across sessions.</p>
          </div>
          <div className="feature-card">
            <h3>Beginner to Expert</h3>
            <p>Start with variables and build up to concurrency patterns, generics, and deploying production APIs.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import HomePage from './pages/HomePage'
import LessonPage from './pages/LessonPage'
import { useProgress } from './hooks/useProgress'
import tutorials from './data/tutorials'
import './App.css'

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { completed, toggleLesson, isCompleted, percentage, resetProgress } = useProgress(tutorials.length)
  const navigate = useNavigate()

  const handleSelect = (slug) => {
    navigate(`/lesson/${slug}`)
    setSidebarOpen(false)
  }

  return (
    <div className="app">
      <header className="topbar">
        <button
          className="menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'}
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <a href="/" className="topbar-brand" onClick={(e) => { e.preventDefault(); navigate('/') }}>
          <span className="go-logo" aria-hidden="true">Go</span>
          <span className="topbar-title">The Complete Go Tutorial</span>
        </a>
        <div className="topbar-progress">
          <span className="topbar-pct" aria-label={`${percentage}% complete`}>{percentage}%</span>
        </div>
      </header>

      <a href="#main-content" className="skip-link">Skip to main content</a>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      <div className="layout">
        <Sidebar
          tutorials={tutorials}
          onSelect={handleSelect}
          isCompleted={isCompleted}
          sidebarOpen={sidebarOpen}
        />
        <main id="main-content" className="main-content" role="main">
          <Routes>
            <Route path="/" element={
              <HomePage isCompleted={isCompleted} />
            } />
            <Route path="/lesson/:slug" element={
              <LessonPage
                isCompleted={isCompleted}
                toggleLesson={toggleLesson}
                completed={completed}
                percentage={percentage}
                resetProgress={resetProgress}
              />
            } />
            <Route path="*" element={
              <div className="not-found">
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
                <button className="nav-btn" onClick={() => navigate('/')}>
                  Back to Home
                </button>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App

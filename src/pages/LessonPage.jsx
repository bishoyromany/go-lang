import { useParams, useNavigate } from 'react-router-dom'
import LessonContent from '../components/LessonContent'
import ProgressBar from '../components/ProgressBar'
import { useSEO } from '../hooks/useSEO'
import tutorials, { tutorialsBySlug } from '../data/tutorials'

export default function LessonPage({ isCompleted, toggleLesson, completed, percentage, resetProgress }) {
  const { slug } = useParams()
  const navigate = useNavigate()

  const lesson = tutorialsBySlug[slug]
  const currentIndex = lesson ? tutorials.findIndex(t => t.id === lesson.id) : -1

  useSEO({
    title: lesson ? `${lesson.title} - Go Tutorial` : 'Lesson Not Found',
    description: lesson?.description || 'Go programming tutorial lesson.',
    path: `/lesson/${slug}`,
    lesson,
  })

  if (!lesson) {
    return (
      <div className="not-found">
        <h1>Lesson Not Found</h1>
        <p>The lesson you're looking for doesn't exist.</p>
        <button className="nav-btn" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    )
  }

  const handlePrev = () => {
    if (currentIndex > 0) navigate(`/lesson/${tutorials[currentIndex - 1].slug}`)
  }

  const handleNext = () => {
    if (currentIndex < tutorials.length - 1) navigate(`/lesson/${tutorials[currentIndex + 1].slug}`)
  }

  return (
    <>
      <ProgressBar
        percentage={percentage}
        completed={completed.length}
        total={tutorials.length}
        onReset={resetProgress}
      />
      <LessonContent
        lesson={lesson}
        isCompleted={isCompleted(lesson.id)}
        onToggle={() => toggleLesson(lesson.id)}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={currentIndex > 0}
        hasNext={currentIndex < tutorials.length - 1}
      />
    </>
  )
}

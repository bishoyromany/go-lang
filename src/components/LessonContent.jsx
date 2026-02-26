import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import {
  CheckCircle2, Circle, ChevronLeft, ChevronRight,
  Clock, BarChart3, Copy, Check
} from 'lucide-react'

const difficultyLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

const difficultyColors = {
  beginner: 'var(--green)',
  intermediate: 'var(--amber)',
  advanced: 'var(--rose)',
}

const difficultyBg = {
  beginner: 'var(--green-subtle)',
  intermediate: 'var(--amber-subtle)',
  advanced: 'var(--rose-subtle)',
}

function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="code-block" data-lang={language}>
      <div className="code-header">
        <span className="code-lang">{language}</span>
        <button className="copy-btn" onClick={handleCopy}>
          {copied
            ? <><Check size={13} /> Copied</>
            : <><Copy size={13} /> Copy</>
          }
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: '0 0 10px 10px',
          fontSize: '0.84rem',
          lineHeight: '1.65',
          padding: '16px 18px 16px 22px',
          background: '#131720',
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  )
}

function parseMarkdown(text) {
  const elements = []
  const lines = text.split('\n')
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]

    // Code blocks
    if (line.trim().startsWith('```')) {
      const lang = line.trim().slice(3) || 'text'
      const codeLines = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      i++
      elements.push(
        <CodeBlock key={key++} language={lang} code={codeLines.join('\n')} />
      )
      continue
    }

    // Headers
    if (line.startsWith('### ')) {
      elements.push(<h3 key={key++} className="md-h3">{parseInline(line.slice(4))}</h3>)
      i++
      continue
    }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} className="md-h2">{parseInline(line.slice(3))}</h2>)
      i++
      continue
    }

    // Blockquote
    if (line.startsWith('> ')) {
      const quoteLines = []
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <blockquote key={key++} className="md-blockquote">
          {parseInline(quoteLines.join(' '))}
        </blockquote>
      )
      continue
    }

    // Table
    if (line.includes('|') && i + 1 < lines.length && lines[i + 1]?.includes('---')) {
      const tableLines = []
      while (i < lines.length && lines[i].includes('|')) {
        tableLines.push(lines[i])
        i++
      }
      const headers = tableLines[0].split('|').filter(c => c.trim()).map(c => c.trim())
      const rows = tableLines.slice(2).map(row =>
        row.split('|').filter(c => c.trim()).map(c => c.trim())
      )
      elements.push(
        <div key={key++} className="md-table-wrap">
          <table className="md-table">
            <thead>
              <tr>{headers.map((h, j) => <th key={j}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    }

    // Unordered list
    if (line.match(/^- /)) {
      const items = []
      while (i < lines.length && lines[i].match(/^- /)) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={key++} className="md-ul">
          {items.map((item, j) => <li key={j}>{parseInline(item)}</li>)}
        </ul>
      )
      continue
    }

    // Empty line
    if (line.trim() === '') {
      i++
      continue
    }

    // Paragraph
    const paraLines = []
    while (i < lines.length && lines[i].trim() !== '' && !lines[i].startsWith('#') &&
           !lines[i].startsWith('```') && !lines[i].startsWith('> ') &&
           !lines[i].startsWith('- ') && !lines[i].includes('|')) {
      paraLines.push(lines[i])
      i++
    }
    if (paraLines.length > 0) {
      elements.push(<p key={key++} className="md-p">{parseInline(paraLines.join(' '))}</p>)
    }
  }

  return elements
}

function parseInline(text) {
  if (!text) return text
  const parts = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/)
    const italicMatch = remaining.match(/\*(.+?)\*/)
    const codeMatch = remaining.match(/`([^`]+)`/)

    const matches = [
      boldMatch && { type: 'bold', match: boldMatch, index: boldMatch.index },
      italicMatch && !boldMatch?.index?.toString().startsWith(String(italicMatch?.index)) && { type: 'italic', match: italicMatch, index: italicMatch.index },
      codeMatch && { type: 'code', match: codeMatch, index: codeMatch.index },
    ].filter(Boolean).sort((a, b) => a.index - b.index)

    if (matches.length === 0) {
      parts.push(remaining)
      break
    }

    const first = matches[0]
    if (first.index > 0) {
      parts.push(remaining.slice(0, first.index))
    }

    if (first.type === 'bold') {
      parts.push(<strong key={key++}>{first.match[1]}</strong>)
    } else if (first.type === 'italic') {
      parts.push(<em key={key++}>{first.match[1]}</em>)
    } else if (first.type === 'code') {
      parts.push(<code key={key++} className="md-inline-code">{first.match[1]}</code>)
    }

    remaining = remaining.slice(first.index + first.match[0].length)
  }

  return parts
}

export default function LessonContent({ lesson, isCompleted, onToggle, onPrev, onNext, hasPrev, hasNext }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [lesson.id])

  return (
    <article className="lesson-content">
      <header className="lesson-header">
        <div className="lesson-header-top">
          <span
            className="difficulty-badge"
            style={{
              background: difficultyBg[lesson.difficulty],
              color: difficultyColors[lesson.difficulty],
            }}
          >
            <BarChart3 size={13} />
            {difficultyLabels[lesson.difficulty]}
          </span>
          <span className="duration-badge">
            <Clock size={13} />
            {lesson.duration}
          </span>
        </div>
        <h1 className="lesson-h1">{lesson.title}</h1>
        <p className="lesson-module">{lesson.module}</p>
      </header>

      <div className="lesson-body">
        {parseMarkdown(lesson.content)}
      </div>

      <footer className="lesson-footer">
        <button
          className={`complete-btn ${isCompleted ? 'completed' : ''}`}
          onClick={onToggle}
        >
          {isCompleted
            ? <><CheckCircle2 size={17} /> Completed</>
            : <><Circle size={17} /> Mark as Complete</>
          }
        </button>

        <div className="nav-buttons">
          <button className="nav-btn" disabled={!hasPrev} onClick={onPrev}>
            <ChevronLeft size={17} /> Previous
          </button>
          <button className="nav-btn" disabled={!hasNext} onClick={onNext}>
            Next <ChevronRight size={17} />
          </button>
        </div>
      </footer>
    </article>
  )
}

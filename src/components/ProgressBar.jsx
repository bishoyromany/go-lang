import { Trophy, RotateCcw } from 'lucide-react'

export default function ProgressBar({ percentage, completed, total, onReset }) {
  return (
    <div className="progress-bar-container">
      <div className="progress-header">
        <div className="progress-label">
          <Trophy size={15} />
          <span>{completed} of {total} lessons</span>
        </div>
        <div className="progress-right">
          <span className="progress-pct">{percentage}%</span>
          {completed > 0 && (
            <button className="reset-btn" onClick={onReset} title="Reset progress">
              <RotateCcw size={13} />
            </button>
          )}
        </div>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

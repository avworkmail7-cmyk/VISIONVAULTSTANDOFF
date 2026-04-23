import { useMemo, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { mockHighlights, HIGHLIGHT_TYPES, EVENT_TYPE_LABELS } from '../../data/mockAppData'
import { isGroqConfigured, groqChat } from '../../lib/groq'
import './Dashboard.css'

const typeLabels = {
  [HIGHLIGHT_TYPES.ALTERCATION]: 'Altercation',
  [HIGHLIGHT_TYPES.FUNNY]: 'Funny',
  [HIGHLIGHT_TYPES.CONVERSATION]: 'Conversation',
  [HIGHLIGHT_TYPES.IMPORTANT]: 'Important',
  [HIGHLIGHT_TYPES.OTHER]: 'Other',
}

const typeClass = {
  [HIGHLIGHT_TYPES.ALTERCATION]: 'highlight--altercation',
  [HIGHLIGHT_TYPES.FUNNY]: 'highlight--funny',
  [HIGHLIGHT_TYPES.CONVERSATION]: 'highlight--conversation',
  [HIGHLIGHT_TYPES.IMPORTANT]: 'highlight--important',
  [HIGHLIGHT_TYPES.OTHER]: 'highlight--other',
}

export default function Dashboard() {
  const { user, goldBalance, addGold, removeGold } = useAuth()
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiReply, setAiReply] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [goldSaving, setGoldSaving] = useState(false)
  const [goldError, setGoldError] = useState('')

  const handleCarouselSwipe = (direction) => {
    setCarouselIndex((i) => {
      const next = i + direction
      return Math.max(0, Math.min(mockHighlights.length - 1, next))
    })
  }

  const eventCounts = useMemo(() => {
    const counts = {}
    for (const h of mockHighlights) {
      const t = h.type || HIGHLIGHT_TYPES.OTHER
      counts[t] = (counts[t] || 0) + 1
    }
    return Object.entries(counts).map(([type, count]) => ({
      type,
      label: EVENT_TYPE_LABELS[type] || EVENT_TYPE_LABELS[HIGHLIGHT_TYPES.OTHER],
      count,
    }))
  }, [])

  const maxCount = eventCounts.length ? Math.max(...eventCounts.map((e) => e.count)) : 1

  const handleAskAi = async (e) => {
    e.preventDefault()
    if (!aiPrompt.trim() || !isGroqConfigured()) return
    setAiError('')
    setAiLoading(true)
    try {
      const content = await groqChat([
        { role: 'system', content: 'You are a helpful assistant for the Life Proof app. Be concise.' },
        { role: 'user', content: aiPrompt.trim() },
      ])
      setAiReply(content)
    } catch (err) {
      setAiError(err.message || 'Request failed')
    } finally {
      setAiLoading(false)
    }
  }

  const handleGoldChange = async (delta) => {
    setGoldError('')
    setGoldSaving(true)
    try {
      if (delta > 0) await addGold(delta)
      else await removeGold(Math.abs(delta))
    } catch (err) {
      setGoldError(err?.message || 'Could not update gold right now.')
    } finally {
      setGoldSaving(false)
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard__welcome">
        <p className="dashboard__welcome-label">DASHBOARD</p>
        <h2 className="dashboard__welcome-title">Welcome{user?.name ? `, ${user.name}` : ''}</h2>
        <p className="dashboard__welcome-sub">Hope you had a great day. Let's recap what happened.</p>
      </div>
      <div className="dashboard__ai">
        <p className="dashboard__ai-label">ACCOUNT GOLD</p>
        <p className="dashboard__ai-reply">{goldBalance} gold</p>
        <form
          className="dashboard__ai-form"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Manual gold controls"
        >
          <button
            type="button"
            className="dashboard__ai-btn"
            onClick={() => handleGoldChange(10)}
            disabled={goldSaving}
          >
            +10 Win
          </button>
          <button
            type="button"
            className="dashboard__ai-btn"
            onClick={() => handleGoldChange(-10)}
            disabled={goldSaving}
          >
            -10 Loss
          </button>
        </form>
        {goldError && <p className="dashboard__ai-error">{goldError}</p>}
      </div>
      {isGroqConfigured() && (
        <div className="dashboard__ai">
          <p className="dashboard__ai-label">ASK AI</p>
          <form className="dashboard__ai-form" onSubmit={handleAskAi}>
            <input
              type="text"
              className="dashboard__ai-input"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Ask anything..."
              disabled={aiLoading}
            />
            <button type="submit" className="dashboard__ai-btn" disabled={aiLoading}>
              {aiLoading ? '…' : 'Ask'}
            </button>
          </form>
          {aiError && <p className="dashboard__ai-error">{aiError}</p>}
          {aiReply && <p className="dashboard__ai-reply">{aiReply}</p>}
        </div>
      )}

      <div className="dashboard__carousel-section">
        <div
          className="dashboard__carousel"
          onTouchStart={(e) => setTouchStart(e.touches[0]?.clientX)}
          onTouchEnd={(e) => {
            const end = e.changedTouches[0]?.clientX
            if (touchStart != null && end != null) {
              const diff = touchStart - end
              if (Math.abs(diff) > 40) handleCarouselSwipe(diff > 0 ? 1 : -1)
            }
            setTouchStart(null)
          }}
        >
          {mockHighlights.map((h, idx) => {
            const offset = idx - carouselIndex
            const isCenter = offset === 0
            const absOffset = Math.abs(offset)
            return (
              <button
                key={h.id}
                type="button"
                className={`dashboard__carousel-card dashboard__carousel-card--${absOffset > 1 ? 'far' : absOffset} ${typeClass[h.type] || ''}`}
                onClick={() => setCarouselIndex(idx)}
                style={{
                  '--offset': offset,
                }}
              >
                <div className="dashboard__carousel-thumb">
                  {isCenter && (
                    <span className="dashboard__carousel-time">{h.time}</span>
                  )}
                </div>
                {isCenter && (
                  <div className="dashboard__carousel-meta">
                    <span className="dashboard__carousel-label">{typeLabels[h.type] || h.label}</span>
                    <span className="dashboard__carousel-duration">{h.duration}</span>
                  </div>
                )}
              </button>
            )
          })}
        </div>
        <div className="dashboard__carousel-dots">
          {mockHighlights.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`dashboard__carousel-dot ${idx === carouselIndex ? 'dashboard__carousel-dot--active' : ''}`}
              onClick={() => setCarouselIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="dashboard__events-summary">
          <p className="dashboard__events-label">Today’s events</p>
          <p className="dashboard__events-sub">AI-detected moments</p>
          <div className="dashboard__events-chart">
            {eventCounts.map(({ type, label, count }) => (
              <div key={type} className="dashboard__events-row">
                <span className="dashboard__events-name">{label}</span>
                <div className="dashboard__events-bar-wrap">
                  <div
                    className={`dashboard__events-bar dashboard__events-bar--${type}`}
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="dashboard__events-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="dashboard__label">TODAY</p>
      <h2 className="dashboard__title">Highlights</h2>
      <p className="dashboard__sub">AI-tagged moments from your feed</p>

      <ul className="dashboard__list">
        {mockHighlights.map((h) => (
          <li key={h.id} className={`dashboard__card ${typeClass[h.type] || ''}`}>
            <div className="dashboard__card-time">{h.time}</div>
            <div className="dashboard__card-meta">
              <span className="dashboard__card-label">{typeLabels[h.type] || h.label}</span>
              <span className="dashboard__card-duration">{h.duration}</span>
            </div>
            <div className="dashboard__card-placeholder" />
          </li>
        ))}
      </ul>
    </div>
  )
}


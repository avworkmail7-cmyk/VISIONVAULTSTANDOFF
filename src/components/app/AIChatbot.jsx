import { useState, useRef, useEffect } from 'react'
import { isGroqConfigured, groqChat } from '../../lib/groq'
import './AIChatbot.css'

const SYSTEM_PROMPT = `You are the Life Proof AI assistant. You help users with their recordings and highlights—reviewing moments, finding clips, discussing what happened. You can also answer general questions. Be concise and helpful.`

export default function AIChatbot({ open, onClose }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    if (open && listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [open, messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || !isGroqConfigured() || loading) return
    setInput('')
    const userMsg = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)
    try {
      const chatHistory = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }))
      const reply = await groqChat([
        { role: 'system', content: SYSTEM_PROMPT },
        ...chatHistory,
      ])
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `Error: ${err.message || 'Something went wrong.'}` },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className={`ai-chatbot-panel ${open ? 'ai-chatbot-panel--open' : ''}`}>
        <div className="ai-chatbot-panel__head">
          <span className="ai-chatbot-panel__title">AI Assistant</span>
          <button type="button" className="ai-chatbot-panel__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <p className="ai-chatbot-panel__hint">Ask about your recordings, highlights, or anything else.</p>
        {!isGroqConfigured() && (
          <p className="ai-chatbot-panel__setup">Add VITE_GROQ_API_KEY to your .env file and restart the dev server to enable the AI.</p>
        )}
        <div className="ai-chatbot-panel__list" ref={listRef}>
          {messages.length === 0 && isGroqConfigured() && (
            <p className="ai-chatbot-panel__empty">Send a message to start.</p>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`ai-chatbot-panel__msg ai-chatbot-panel__msg--${m.role}`}>
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="ai-chatbot-panel__msg ai-chatbot-panel__msg--assistant">
              …
            </div>
          )}
        </div>
        <form className="ai-chatbot-panel__form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="ai-chatbot-panel__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message..."
            disabled={loading || !isGroqConfigured()}
          />
          <button type="submit" className="ai-chatbot-panel__send" disabled={loading || !isGroqConfigured()}>
            Send
          </button>
        </form>
      </div>
      {open && <div className="ai-chatbot-backdrop" onClick={onClose} aria-hidden />}
    </>
  )
}

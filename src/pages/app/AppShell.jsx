import { useState } from 'react'
import AIChatbot from '../../components/app/AIChatbot'
import './AppShell.css'

const TABS = [
  { route: 'library', href: '#/app/library', label: 'Library', icon: '▷' },
  { route: 'lpai', href: '#/app/lpai', label: '$LPAI', icon: '$' },
  { route: 'dashboard', href: '#/app', label: 'Dashboard', icon: '◇' },
  { route: 'profile', href: '#/app/profile', label: 'Profile', icon: '◎' },
  { route: 'vault', href: '#/app/vault', label: 'Vault', icon: '⌂' },
]

export default function AppShell({ currentRoute, children }) {
  const [chatOpen, setChatOpen] = useState(false)
  return (
    <div className="app-shell">
      <AIChatbot open={chatOpen} onClose={() => setChatOpen(false)} />
      <header className="app-shell__header">
        <div className="app-shell__header-spacer app-shell__header-spacer--left">
          <button
            type="button"
            className="app-shell__ai-btn"
            onClick={() => setChatOpen(true)}
            aria-label="Open AI assistant"
          >
            <svg className="app-shell__ai-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
              <rect x="4" y="8" width="16" height="12" rx="2" />
              <circle cx="9" cy="13" r="1.5" fill="currentColor" />
              <circle cx="15" cy="13" r="1.5" fill="currentColor" />
              <path d="M9 17h6" />
              <path d="M12 8V5" />
              <path d="M8 5h8" />
            </svg>
          </button>
        </div>
        <div className="app-shell__brand">
          <span className="app-shell__logo">◇</span>
          <h1 className="app-shell__title">Life Proof</h1>
        </div>
        <div className="app-shell__header-spacer app-shell__header-spacer--right">
          <a href="#funds" className="app-shell__lpai">$LPAI</a>
        </div>
      </header>
      <main className="app-shell__main">
        {children}
      </main>
      <nav className="app-shell__nav">
        {TABS.map(({ route, href, label, icon }) => (
          <a
            key={route}
            href={href}
            className={`app-shell__nav-link ${currentRoute === route ? 'app-shell__nav-link--active' : ''}`}
            onClick={() => {
              if (currentRoute === route && window) {
                window.dispatchEvent(new CustomEvent('lifeproof-nav-repeat', { detail: { route } }))
              }
            }}
          >
            <span className="app-shell__nav-icon">{icon}</span>
            <span>{label}</span>
          </a>
        ))}
      </nav>
    </div>
  )
}

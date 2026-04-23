import { useState } from 'react'
import './Nav.css'

export default function Nav({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '#vision', label: 'Archive' },
    { href: '#product', label: 'Prototype' },
    { href: '#roadmap', label: 'Sequence' },
    { href: '#token', label: 'Token' },
  ]

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a href="#" className="nav__logo">
        <span className="nav__logo-icon">◇</span>
        <span className="nav__logo-text">Life Proof AI</span>
      </a>

      <nav className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="nav__link"
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
        <a href="#app" className="nav__link" onClick={() => setMenuOpen(false)}>
          App
        </a>
      </nav>

      <a href="#funds" className="nav__cta">
        $LPAI
      </a>

      <button
        type="button"
        className="nav__menu"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={menuOpen ? 'nav__menu-open' : ''} />
        <span className={menuOpen ? 'nav__menu-open' : ''} />
        <span className={menuOpen ? 'nav__menu-open' : ''} />
      </button>
    </header>
  )
}

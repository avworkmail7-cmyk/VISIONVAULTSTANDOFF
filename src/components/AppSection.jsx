import { useState, useEffect } from 'react'
import './AppSection.css'

export default function AppSection({ onContinueToApp }) {
  const [platform, setPlatform] = useState(null) // 'ios' | 'android' | null
  const [installPrompt, setInstallPrompt] = useState(null)
  const [installAvailable, setInstallAvailable] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setInstallPrompt(e)
      setInstallAvailable(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!installPrompt) return
    installPrompt.prompt()
    const { outcome } = await installPrompt.userChoice
    if (outcome === 'accepted') setInstallAvailable(false)
  }

  const handlePlatformSelect = (p) => {
    setPlatform(p)
  }

  const handleContinueToApp = () => {
    onContinueToApp?.()
    window.location.hash = '#/login'
  }

  return (
    <section className="app-section" id="app">
      <div className="app-section__inner">
        <span className="section-label app-section__label">PWA • ADD TO HOME SCREEN</span>
        <h2 className="section-title app-section__title">
          The Life Proof app
        </h2>
        <p className="section-desc app-section__desc">
          This is a PWA application. Use it by adding the app to your home screen.
          When you open it from your home screen, you get the full app experience—dashboard, library, feed, profile, and vault—with login first.
        </p>

        <p className="app-section__step">Choose your device, then continue to register or log in. We’ll prompt you to add the app to your home screen when possible.</p>

        <div className="app-section__platforms">
          <button
            type="button"
            className={`app-section__platform ${platform === 'ios' ? 'app-section__platform--active' : ''}`}
            onClick={() => handlePlatformSelect('ios')}
            aria-label="iOS"
          >
            <span className="app-section__platform-icon" aria-hidden></span>
            <span>iOS</span>
          </button>
          <button
            type="button"
            className={`app-section__platform ${platform === 'android' ? 'app-section__platform--active' : ''}`}
            onClick={() => handlePlatformSelect('android')}
            aria-label="Android"
          >
            <svg className="app-section__platform-icon app-section__platform-icon--svg" viewBox="0 0 24 24" aria-hidden>
              <path fill="currentColor" d="M17.523 2.047a1.5 1.5 0 0 0-1.047.398L14.156 4.5a9.454 9.454 0 0 0-4.312 0L7.523 2.445a1.5 1.5 0 0 0-1.047-.398A1.5 1.5 0 0 0 6 3.5v17a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5v-17a1.5 1.5 0 0 0-.477-1.453ZM9 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm6 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM6 19v-6h12v6H6Zm12-8H6V5h2v2h1V5h2v2h1V5h2v2h1V5h2v6Z"/>
            </svg>
            <span>Android</span>
          </button>
        </div>

        {(platform === 'ios' || platform === 'android') && (
          <div className="app-section__instructions">
            {platform === 'ios' && (
              <p className="app-section__instruction-text">
                In Safari: tap <strong>Share</strong> → <strong>Add to Home Screen</strong>. Then open the app from your home screen.
              </p>
            )}
            {platform === 'android' && installAvailable && (
              <p className="app-section__instruction-text">
                Tap below to add Life Proof to your home screen (or use the browser menu: Add to Home screen).
              </p>
            )}
          </div>
        )}

        <div className="app-section__actions">
          {platform === 'android' && installAvailable && (
            <button type="button" className="app-section__btn app-section__btn--primary" onClick={handleInstall}>
              Add to Home Screen
            </button>
          )}
          <button
            type="button"
            className="app-section__btn app-section__btn--secondary"
            onClick={handleContinueToApp}
          >
            Continue to app → Register / Log in
          </button>
        </div>
      </div>
    </section>
  )
}

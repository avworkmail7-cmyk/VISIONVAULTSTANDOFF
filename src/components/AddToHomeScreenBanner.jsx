import { useState, useEffect } from 'react'
import './AddToHomeScreenBanner.css'

const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true

export default function AddToHomeScreenBanner() {
  const [hidden, setHidden] = useState(false)
  const [installPrompt, setInstallPrompt] = useState(null)
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem('lifeproof_install_dismissed') === '1' } catch { return false }
  })

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setInstallPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!installPrompt) return
    installPrompt.prompt()
    await installPrompt.userChoice
  }

  const handleDismiss = () => {
    setHidden(true)
    try { sessionStorage.setItem('lifeproof_install_dismissed', '1') } catch (_) {}
    setDismissed(true)
  }

  if (isStandalone() || dismissed || hidden) return null

  return (
    <div className="ath-banner">
      <div className="ath-banner__inner">
        <p className="ath-banner__text">
          Add Life Proof to your home screen for the full app experience.
        </p>
        {installPrompt && (
          <button type="button" className="ath-banner__btn" onClick={handleInstall}>
            Add to Home Screen
          </button>
        )}
        {isIOS() && !installPrompt && (
          <p className="ath-banner__ios">Safari: Share → Add to Home Screen</p>
        )}
        <button type="button" className="ath-banner__dismiss" onClick={handleDismiss} aria-label="Dismiss">
          ×
        </button>
      </div>
    </div>
  )
}

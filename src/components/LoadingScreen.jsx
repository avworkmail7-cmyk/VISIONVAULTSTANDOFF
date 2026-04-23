import { useState, useEffect, useRef } from 'react'
import './LoadingScreen.css'

const steps = [
  'ACCESSING VAULT',
  'CLASSIFIED DATA STREAM',
  'ACCESS GRANTED',
]

export default function LoadingScreen({ onComplete }) {
  const [step, setStep] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)
  const finishedRef = useRef(false)

  useEffect(() => {
    if (step < steps.length) {
      const t = setTimeout(() => setStep((s) => s + 1), 500)
      return () => clearTimeout(t)
    }

    const finish = () => {
      if (finishedRef.current) return
      finishedRef.current = true
      setFadeOut(true)
      setTimeout(() => onComplete?.(), 500)
    }

    const onLoad = () => finish()

    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', onLoad)
    }

    return () => window.removeEventListener('load', onLoad)
  }, [step, onComplete])

  return (
    <div className={`loading ${fadeOut ? 'loading--out' : ''}`}>
      <div className="loading__scan" aria-hidden="true" />
      <div className="loading__grid" aria-hidden="true" />
      <div className="loading__vignette" aria-hidden="true" />

      <div className="loading__content">
        <div className="loading__lock">
          <div className="loading__lock-ring" />
          <div className="loading__lock-core" />
        </div>
        <p className="loading__text" key={step}>
          {steps[step]}
        </p>
        <div className="loading__bar">
          <div
            className="loading__bar-fill"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <p className="loading__footer">LIFE PROOF AI • RESTRICTED ACCESS</p>
    </div>
  )
}

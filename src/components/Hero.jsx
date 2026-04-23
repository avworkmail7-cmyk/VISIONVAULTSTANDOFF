import { useEffect, useRef } from 'react'
import './Hero.css'

export default function Hero() {
  const lineRef = useRef(null)
  const subtitleRef = useRef(null)

  useEffect(() => {
    const line = lineRef.current
    const subtitle = subtitleRef.current
    if (!line || !subtitle) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            line.classList.add('hero__line--visible')
            subtitle.classList.add('hero__subtitle--visible')
          }
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(line)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__content">
        <p className="hero__label">
          <span className="hero__label-glitch">TRANSMISSION</span> 047.2
        </p>
        <h1 className="hero__title">
          <span className="hero__title-line">Preserve.</span>
          <span className="hero__title-line">Replay.</span>
          <span className="hero__title-line hero__title-line--accent">Relive.</span>
        </h1>
        <div ref={lineRef} className="hero__line" />
        <p ref={subtitleRef} className="hero__subtitle">
          What you forget, we don’t. The rest is <span className="hero__redact">[REDACTED]</span> until you’re in.
        </p>
        <div className="hero__actions">
          <a href="#product" className="hero__btn hero__btn--primary">
            The prototype
          </a>
          <button
            type="button"
            className="hero__btn hero__btn--secondary"
            onClick={() => window.dispatchEvent(new Event('open-pricing-modal'))}
          >
            Pricing
          </button>
        </div>
      </div>
      <div className="hero__scan" aria-hidden="true" />
      <div className="hero__vignette" aria-hidden="true" />
    </section>
  )
}

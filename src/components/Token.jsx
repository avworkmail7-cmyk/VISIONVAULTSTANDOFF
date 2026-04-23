import { useState } from 'react'
import './Token.css'

export default function Token() {
  const [showEntryPage, setShowEntryPage] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ username: '', password: '', confirm: '', tokenId: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <section className="token" id="token">
        <div className="token__inner">
          <span className="section-label token__label">ASSET • RESTRICTED</span>
          <h2 className="section-title token__title">
            $LPAI
          </h2>
          <p className="section-desc token__desc">
            The token that funds the work. Research, hardware, app, and operations—proceeds go back into getting the bundle and the first contacts out. 
            See the <a href="#funds" className="token__inline-btn">$LPAI allocation</a> section for how funds are used and where we are with the first contact.
          </p>

          <div className="token__card">
            <div className="token__symbol">
              <span className="token__symbol-icon">◇</span>
              <span className="token__symbol-name">$LPAI</span>
            </div>
            <ul className="token__list">
              <li>Funds research and product development</li>
              <li>App and hardware bundle development</li>
              <li>Contact program and solar R&D</li>
              <li>Operational costs to ship</li>
            </ul>
            <div className="token__cta-wrap">
              <a href="#funds" className="token__cta">Where the funds go</a>
              <p className="token__note">Transmission Q4 2025. Stay tuned.</p>
            </div>
          </div>

          <div className="token__backing">
            <span className="section-label token__backing-label">BACKING</span>
            <p className="token__backing-desc">
              10% of the company’s overall valuation is allocated to $LPAI. As we grow, we continue to buy the coin—so the value of your position grows with the company, not only when others buy.
            </p>
          </div>

          <div className="token__loop" id="loop">
            <span className="section-label token__loop-label">OPERATION • RESTRICTED</span>
            <h3 className="token__loop-title">Operation Loop Eternal</h3>
            <p className="token__loop-desc">
              The first 500 investors who invest $15,000 get access to Operation Loop Eternal. 
              Before you invest, you must create an account on this site and link your token ID—so we can verify your position and track the first 500. 
              What that means—early hardware, closed channels, and the next layer before anyone else. Hold. Wait. Get in.
            </p>
            <button
              type="button"
              className="token__initiate"
              onClick={() => setShowEntryPage(true)}
            >
              <span className="token__initiate-text">INITIATE</span>
            </button>
          </div>

          <div className="token__grid" aria-hidden="true" />
        </div>
      </section>

      {showEntryPage && (
        <div className="entry-page">
          <div className="entry-page__backdrop" />
          <div className="entry-page__panel">
            <button
              type="button"
              className="entry-page__return"
              onClick={() => setShowEntryPage(false)}
              aria-label="Return"
            >
              ← RETURN
            </button>
            <div className="entry-page__content">
              <span className="section-label entry-page__label">SECURE ENTRY • PROTOCOL</span>
              <h2 className="entry-page__title">Create account</h2>
              <p className="entry-page__desc">
                Username, key, and token ID. We use your token ID to verify qualifying positions.
              </p>
              {submitted ? (
                <div className="token__entry-success">
                  <div className="token__entry-success-row">
                    <span className="token__entry-success-icon">◇</span>
                    <p>Transmission received. Access request logged.</p>
                  </div>
                  <button
                    type="button"
                    className="entry-page__return-btn"
                    onClick={() => { setShowEntryPage(false); setSubmitted(false) }}
                  >
                    Return
                  </button>
                </div>
              ) : (
                <form className="token__form" onSubmit={handleSubmit}>
                  <label className="token__field">
                    <span className="token__field-label">IDENT</span>
                    <input
                      type="text"
                      className="token__input"
                      placeholder="username"
                      value={form.username}
                      onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                      required
                    />
                  </label>
                  <label className="token__field">
                    <span className="token__field-label">KEY</span>
                    <input
                      type="password"
                      className="token__input"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                      required
                    />
                  </label>
                  <label className="token__field">
                    <span className="token__field-label">CONFIRM KEY</span>
                    <input
                      type="password"
                      className="token__input"
                      placeholder="••••••••"
                      value={form.confirm}
                      onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
                      required
                    />
                  </label>
                  <label className="token__field">
                    <span className="token__field-label token__field-label--row">
                      TOKEN ID
                      <span className="token__field-hint" title="Used to verify who qualifies among the first 500.">
                        <span className="token__field-hint-icon" aria-hidden="true">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </span>
                        <span className="token__field-hint-popup">Used to verify who qualifies among the first 500.</span>
                      </span>
                    </span>
                    <input
                      type="text"
                      className="token__input"
                      placeholder="wallet or token identifier"
                      value={form.tokenId}
                      onChange={(e) => setForm((f) => ({ ...f, tokenId: e.target.value }))}
                      required
                    />
                  </label>
                  <button type="submit" className="token__submit">
                    <span className="token__submit-text">SUBMIT</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <a href="#" className="footer__logo" title="Laid Labs">
          <span className="footer__logo-icon">◇</span>
          Life Proof AI
        </a>
        <p className="footer__tagline">
          Preserve. Replay. Relive.
        </p>
        <div className="footer__links">
          <a href="#vision">Archive</a>
          <a href="#product">Prototype</a>
          <a href="#roadmap">Sequence</a>
          <a href="#token">Token</a>
          <a href="#funds">$LPAI</a>
        </div>
        <div className="footer__contact">
          <a href="https://x.com/lifeproofai" target="_blank" rel="noopener noreferrer" className="footer__contact-link footer__contact-icon" aria-label="X">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <span className="footer__contact-sep">·</span>
          <a
            href="mailto:lifeproofai7@gmail.com"
            className="footer__contact-link footer__contact-icon"
            aria-label="Email"
            onClick={(e) => {
              try {
                navigator.clipboard.writeText('lifeproofai7@gmail.com');
              } catch (_) {}
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </a>
        </div>
        <p className="footer__legal">
          Life Proof AI. Transmission {new Date().getFullYear()}. All access restricted.
        </p>
        <p className="footer__egg" title="Laid Labs" aria-hidden="true">
          L.L.
        </p>
      </div>
    </footer>
  )
}

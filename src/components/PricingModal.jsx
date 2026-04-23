import { useState, useEffect } from 'react'
import './PricingModal.css'

const INITIAL_FEATURES = 4

const tiers = [
  {
    name: 'Witness',
    tagline: 'First layer. Get in.',
    monthly: 14.99,
    features: [
      '720p',
      '30-day cloud storage',
      'Auto-tagging moments',
      'Unlimited replays on phone/app',
      'Starter bundle',
      'Download files you want to own',
    ],
  },
  {
    name: 'Archive',
    tagline: 'Full access. No limits.',
    monthly: 29.99,
    features: [
      'Full access',
      '1080p streaming',
      'Unlimited cloud storage',
      'AI edited highlights',
      'Export to VR/AR',
      'Rechargeable battery kit included',
      'Own it forever',
    ],
  },
  {
    name: 'Eternal',
    tagline: 'The complete record. Unrestricted.',
    monthly: 44.99,
    badge: 'Includes upgraded hardware',
    featured: true,
    features: [
      'All Archive perks',
      'First dibs on solar access & prescription lenses',
      '1080p, 1440p, or 4K recording',
      '4K camera with 144 FPS — upgraded hardware',
      'Gifts and goodies',
      'Exclusive Discord community — your space, we listen. Part of the club.',
    ],
  },
]

function yearlyPrice(monthly) {
  const yearly = monthly * 12
  return (yearly * 0.89).toFixed(2)
}

export default function PricingModal({ open, onClose }) {
  const [expanded, setExpanded] = useState({})

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) setExpanded({})
  }, [open])

  const toggle = (name) => setExpanded((e) => ({ ...e, [name]: !e[name] }))

  if (!open) return null

  return (
    <div className="pricing-modal" role="dialog" aria-label="Pricing">
      <div className="pricing-modal__backdrop" onClick={onClose} aria-hidden="true" />
      <div className="pricing-modal__panel">
        <button
          type="button"
          className="pricing-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <span className="pricing-modal__label">APP • SUBSCRIPTION</span>
        <h2 className="pricing-modal__title">Pricing</h2>
        <p className="pricing-modal__yearly">Save when you buy 12 months upfront.</p>

        <div className="pricing-modal__hardware">
          <h3 className="pricing-modal__hardware-title">Hardware</h3>
          <p className="pricing-modal__hardware-item">Rechargeable battery camera — $99.99</p>
          <p className="pricing-modal__hardware-item">Solar-panel charging camera — $149.99</p>
        </div>

        <div className="pricing-modal__grid">
          {tiers.map((tier) => (
            <div key={tier.name} className={`pricing-modal__col ${tier.featured ? 'pricing-modal__col--featured' : ''}`}>
              <h3 className="pricing-modal__tier">{tier.name}</h3>
              <p className="pricing-modal__tagline">{tier.tagline}</p>
              {tier.badge && (
                <p className="pricing-modal__badge">{tier.badge}</p>
              )}
              <p className="pricing-modal__price">
                ${tier.monthly.toFixed(2)}<span className="pricing-modal__period">/mo</span>
              </p>
              <p className="pricing-modal__year">
                or ${yearlyPrice(tier.monthly)}/yr
              </p>
              <div className="pricing-modal__features-wrap">
                <ul className="pricing-modal__features">
                  {(expanded[tier.name] ? tier.features : tier.features.slice(0, INITIAL_FEATURES)).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
                {tier.features.length > INITIAL_FEATURES && (
                  <button
                    type="button"
                    className="pricing-modal__more"
                    onClick={() => toggle(tier.name)}
                  >
                    {expanded[tier.name] ? 'See less' : 'See more'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import './Roadmap.css'

const milestones = [
  { title: 'Bundle drop', desc: 'App + hardware as a bundle. Rechargeable battery unit: $99.99. Solar-panel charging unit: $149.99. App subscription tiers available—', link: 'view pricing', linkSuffix: ' for details. Coming soon.' },
  { title: 'Ongoing investment', desc: 'We keep putting capital into the contact program. Research, prototypes, and the path to the first wearable contact.', link: null },
  { title: 'First contact', desc: 'Charging dock. Small 1080p camera in the contact. First generation—we go up from here.', link: null },
  { title: 'Next levels', desc: 'Each iteration gets smaller, longer-lasting, closer to always-on. We move toward solar charging in the contact itself.', link: null },
  { title: 'End state', desc: 'Leave-in contact. Solar charging. Prescription options. Full capture. That’s the target. We’ll continue after the update.', link: null },
]

export default function Roadmap() {
  return (
    <section className="roadmap" id="roadmap">
      <div className="roadmap__inner">
        <span className="section-label roadmap__label">SEQUENCE • UNCLASSIFIED</span>
        <h2 className="section-title roadmap__title">
          We don’t announce. We transmit.
        </h2>
        <p className="section-desc roadmap__desc">
          App and hardware bundle first. Then first contact, then the road to solar, leave-in, and prescriptions. 
          That’s it for now. We’ll continue after the update.
        </p>

        <div className="roadmap__timeline">
          {milestones.map(({ title, desc, link, linkSuffix }, i) => (
            <div key={title} className="roadmap__item">
              <div className="roadmap__item-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="roadmap__item-content">
                <h3>{title}</h3>
                <p>
                  {desc}
                  {link ? (
                    <>
                      <button type="button" className="roadmap__link" onClick={() => window.dispatchEvent(new Event('open-pricing-modal'))}>{link}</button>
                      {linkSuffix}
                    </>
                  ) : null}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

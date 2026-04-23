import './Product.css'

export default function Product() {
  const features = [
    {
      title: 'App',
      desc: 'In development. Timeline, sync, replay. Event-driven capture so it only rolls when something’s worth keeping.',
      icon: '◈',
    },
    {
      title: 'Hardware',
      desc: 'Small wearable camera. Prototypes nearing completion. We’ve started the process of getting consumer units built: one with rechargeable battery, one with solar-panel charging.',
      icon: '◇',
    },
    {
      title: 'Research',
      desc: 'Teams are working on the contact. Solar in the lens. Leave-in. Prescription-ready. That’s the end state we’re funding.',
      icon: '⬡',
    },
  ]

  return (
    <section className="product" id="product">
      <div className="product__inner">
        <span className="section-label product__label">PROTOTYPE • RESTRICTED</span>
        <h2 className="section-title product__title">
          App. Camera. Then the contact.
        </h2>
        <p className="section-desc product__desc">
          We have the app in development and a small hardware camera—prototypes are nearing completion. 
          We’ve started the process of getting consumer units built: rechargeable battery version and solar-panel charging version. 
          Separate teams are pushing toward contacts that charge in the sun and sit in your eye. First layer is the bundle. Next layers are the contacts.
        </p>
        <button
          type="button"
          className="product__pricing-btn"
          onClick={() => window.dispatchEvent(new Event('open-pricing-modal'))}
        >
          View pricing
        </button>

        <div className="product__showcase">
          <div className="product__device">
            <div className="product__device-screen">
              <div className="product__device-ui">
                <span className="product__device-status">REC • 00:12:04</span>
                <div className="product__device-waveform" />
                <span className="product__device-label">SIGNAL ACTIVE • [ENCRYPTED]</span>
              </div>
            </div>
            <div className="product__device-body" />
          </div>
        </div>

        <ul className="product__features">
          {features.map(({ title, desc, icon }) => (
            <li key={title} className="product__feature">
              <span className="product__feature-icon">{icon}</span>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

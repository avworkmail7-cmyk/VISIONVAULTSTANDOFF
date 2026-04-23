import { useState, useEffect } from 'react'
import GrowthChart from '../components/GrowthChart'
import TierDetailsModal from '../components/TierDetailsModal'
import BuildContactOptions from '../components/BuildContactOptions'
import './MarketingSiteV2.css'

// Rebuilt MarketingSite component
export default function MarketingSiteV2() {
  const [expandedTier, setExpandedTier] = useState(null)
  const [selectedTierForModal, setSelectedTierForModal] = useState(null)
  const [showBuildContactOptions, setShowBuildContactOptions] = useState(false)

  // Helper function to generate realistic data
  const generateRealisticData = (initialValue, integrationMonth, minGrowth, maxGrowth) => {
    const data = [];
    let currentValue = initialValue;
    const totalMonths = 12;

    // Pre-AI data: natural fluctuations, slightly subpar
    for (let i = 0; i < integrationMonth; i++) {
      data.push(Math.round(currentValue));
      const fluctuation = (Math.random() * 0.06) - 0.03; // -3% to +3% fluctuation
      currentValue *= (1 + fluctuation);
      if (currentValue < initialValue * 0.7) currentValue = initialValue * 0.7; // Prevent too low
      if (currentValue > initialValue * 1.1) currentValue = initialValue * 1.1; // Prevent too high
    }

    // Post-AI data: rapid growth with some fluctuations
    for (let i = integrationMonth; i < totalMonths; i++) {
      data.push(Math.round(currentValue));
      const baseGrowth = (Math.random() * (maxGrowth - minGrowth)) + minGrowth; // Configurable growth range
      const fluctuation = (Math.random() * 0.04) - 0.02; // -2% to +2% fluctuation around the growth
      currentValue *= (1 + baseGrowth + fluctuation);
      if (currentValue < data[data.length - 1] * 0.9) currentValue = data[data.length - 1] * 0.9; // Prevent drastic drops
    }
    return data;
  };

  // Generate data for each company with randomized integration months (e.g., between month 3 and 7)
  const apexIntegrationMonth = Math.floor(Math.random() * (7 - 3 + 1)) + 3; // 3 to 7
  const apexData = generateRealisticData(15, apexIntegrationMonth, 0.10, 0.15); // 10% to 15% growth

  const horizonIntegrationMonth = Math.floor(Math.random() * (7 - 3 + 1)) + 3;
  const horizonData = generateRealisticData(20, horizonIntegrationMonth, 0.17, 0.22); // 17% to 22% growth

  const summitIntegrationMonth = Math.floor(Math.random() * (7 - 3 + 1)) + 3;
  const summitData = generateRealisticData(12, summitIntegrationMonth, 0.12, 0.18); // 12% to 18% growth

  const everestIntegrationMonth = Math.floor(Math.random() * (7 - 3 + 1)) + 3;
  const everestData = generateRealisticData(25, everestIntegrationMonth, 0.15, 0.20); // 15% to 20% growth

  return (
    <div className="v2-container">
      {selectedTierForModal && (
        <TierDetailsModal tier={selectedTierForModal} onClose={() => setSelectedTierForModal(null)} />
      )}

      {showBuildContactOptions && (
        <BuildContactOptions
          onClose={() => setShowBuildContactOptions(false)}
          email="lifeproofai7@gmail.com"
          phone="516-203-5102"
        />
      )}
      <header className="v2-header">
        <div className="v2-brand">
          <div className="v2-logo">LL</div>
          <div className="v2-brand-text">
            <div className="v2-title">Laid Labs</div>
            <div className="v2-subtitle">AI-Powered Solutions</div>
          </div>
        </div>
        <nav className="v2-nav">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <button type="button" className="v2-cta" onClick={() => setShowBuildContactOptions(true)}>Book a build</button>
      </header>

      <main className="v2-main">
        <section id="about">
          <h2 className="v2-section-title">Why Choose Us</h2>
          <div className="v2-video-frame">
            <div className="v2-video-badge">Laid Labs</div>
            <div className="v2-video-inner">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/7_0emp6G54Q?autoplay=1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="START NOW! AI IS EVERYTHING"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              ></iframe>
            </div>
            <p className="v2-video-caption">Click to watch: Why choose Laid Labs for your AI needs.</p>
          </div>
        </section>

        <section id="services">
          <h3 className="v2-section-title">What we build</h3>
          <div className="v2-grid">
            <div className="v2-tile">
              <h4>AI-integrated websites</h4>
              <p>Our AI-integrated websites are designed to be more than just a digital presence; they are powerful tools for business growth. We focus on:</p>
              <ul>
                <li>**Enhanced User Experience:** Fast, mobile-first designs that adapt to your brand and customers, providing a seamless and intuitive experience.</li>
                <li>**Automated Engagement:** AI-driven features that personalize content, guide user journeys, and improve conversion rates.</li>
                <li>**Data-Driven Insights:** Built-in analytics to track user behavior, identify trends, and inform strategic decisions for continuous improvement.</li>
                <li>**Scalable Solutions:** Websites designed to grow with your business, easily integrating new AI functionalities as your needs evolve.</li>
              </ul>
            </div>
            <div className="v2-tile">
              <h4>AI phone receptionists</h4>
              <p>Our AI phone receptionists provide seamless, 24/7 customer interaction, ensuring no lead is ever missed. Key benefits include:</p>
              <ul>
                <li>**24/7 Availability:** Automated handling of calls, even outside business hours.</li>
                <li>**Appointment Booking:** Intelligent scheduling directly integrated with your calendar.</li>
                <li>**Query Resolution:** AI-powered answers to common customer questions.</li>
                <li>**Lead Escalation:** Critical calls and inquiries are immediately routed to the appropriate human team member.</li>
              </ul>
            </div>
            <div className="v2-tile">
              <h4>AI-powered advertising</h4>
              <p>Our AI-powered advertising solutions create clean, simple funnels that maximize your return on investment. We provide:</p>
              <ul>
                <li>**Targeted Campaigns:** AI analyzes market data to identify and reach your ideal customer segments.</li>
                <li>**Optimized Funnels:** Streamlined processes for inquiries, quotes, and bookings, ensuring every visit has a clear path forward.</li>
                <li>**Performance Monitoring:** Continuous AI monitoring and adjustment of campaigns for optimal results.</li>
                <li>**Cost Efficiency:** Maximizing ad spend by focusing on high-conversion opportunities.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="results">
          <h3 className="v2-section-title">Proven Results</h3>
          <p className="v2-results-intro">Our clients consistently see significant month-over-month growth. Here are a few examples:</p>
          <div className="v2-results-grid">
            <div className="v2-result-card">
              <h4>"Apex Construction"</h4>
              <p>After <strong>{apexIntegrationMonth} months</strong> of typical growth, integrating our AI solutions led to an average of <strong>10-15%</strong> month-over-month growth in booked appointments for the next {12 - apexIntegrationMonth} months.</p>
              <GrowthChart dataPoints={apexData} companyName="Apex Construction" integrationMonth={apexIntegrationMonth} />
            </div>
            <div className="v2-result-card">
              <h4>"Horizon Landscaping"</h4>
              <p>Following <strong>{horizonIntegrationMonth} months</strong> of steady performance, our AI integration resulted in an average of <strong>17-22%</strong> month-over-month growth in booked appointments for the next {12 - horizonIntegrationMonth} months.</p>
              <GrowthChart dataPoints={horizonData} companyName="Horizon Landscaping" integrationMonth={horizonIntegrationMonth} />
            </div>
            <div className="v2-result-card">
              <h4>"Summit Roofing"</h4>
              <p>After <strong>{summitIntegrationMonth} months</strong> of fluctuating results, AI-powered strategies drove an average of <strong>12-18%</strong> month-over-month conversion rate in booked appointments for the next {12 - summitIntegrationMonth} months.</p>
              <GrowthChart dataPoints={summitData} companyName="Summit Roofing" integrationMonth={summitIntegrationMonth} />
            </div>
            <div className="v2-result-card">
              <h4>"Everest Plumbing Solutions"</h4>
              <p>After <strong>{everestIntegrationMonth} months</strong> of consistent inquiries, our AI solutions led to an average of <strong>15-20%</strong> month-over-month growth in booked appointments for the next {12 - everestIntegrationMonth} months.</p>
              <GrowthChart dataPoints={everestData} companyName="Everest Plumbing Solutions" integrationMonth={everestIntegrationMonth} />
            </div>
          </div>
        </section>

        <section id="process">
          <h3 className="v2-section-title">How it works</h3>
          <ol className="v2-steps">
            <li>
              <span className="v2-step-label">1. Discovery</span>
              <p>We learn your business, voice, and the journeys your customers actually take.</p>
            </li>
            <li>
              <span className="v2-step-label">2. Design & build</span>
              <p>We design and build your new site and AI systems, with your feedback at every stage.</p>
            </li>
            <li>
              <span className="v2-step-label">3. Launch & refine</span>
              <p>We launch, monitor calls and visits, and refine copy & flows for real customers.</p>
            </li>
          </ol>
        </section>

        <section id="pricing">
          <h3 className="v2-section-title">Subscription Tiers</h3>
          <div className="v2-grid">
            <div className="v2-tile v2-tile--clickable" onClick={() => setSelectedTierForModal('tier1')}>
              <h4>Tier 1</h4>
              <p>$1500 + $150/month for management. Includes an AI-integrated website with full back-end, front-end, design, and server management.</p>
            </div>
            <div className="v2-tile v2-tile--clickable" onClick={() => setSelectedTierForModal('tier2')}>
              <h4>Tier 2</h4>
              <p>$3500 + $250/month for management. Includes an AI-integrated website, AI phone reception, and full management services.</p>
            </div>
            <div className="v2-tile v2-tile--clickable" onClick={() => setSelectedTierForModal('tier3')}>
              <h4>Tier 3</h4>
              <p>$8000 + $250/month for management. Includes a fully integrated website, reception, and the use of AI-powered advertisement.</p>
            </div>
          </div>
        </section>

        <section id="contact">
          <h3 className="v2-section-title">Start a project</h3>
          <p className="v2-contact-copy">Tell us about your business, and we’ll follow up with a short Loom walkthrough and a proposed build plan.</p>
          <div className="v2-contact-actions">
            <a href="mailto:lifeproofai7@gmail.com?subject=Laid%20Labs%20project%20inquiry" className="v2-primary-btn" rel="noopener noreferrer">Email your project details</a>
            <a href="tel:5162035102" className="v2-primary-btn">Call/Text Us</a>
          </div>
        </section>
      </main>

      <footer className="v2-footer">
          <p>© {new Date().getFullYear()} Laid Labs. All rights reserved.</p>
        </footer>
    </div>
  )
}

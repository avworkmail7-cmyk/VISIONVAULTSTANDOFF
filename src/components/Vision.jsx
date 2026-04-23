import './Vision.css'

export default function Vision() {
  return (
    <section className="vision" id="vision">
      <div className="vision__inner">
        <span className="section-label vision__label">ARCHIVE • DECLASSIFIED</span>
        <h2 className="section-title vision__title">
          The end state isn’t a device. It’s you. Reloaded.
        </h2>
        <p className="section-desc vision__desc">
          App and solar camera first. Then research into contacts—solar charging, leave-in wear, prescriptions. 
          We’re funding the path from wearable to in-eye. The rest you know from the sequence.
        </p>

        <div className="vision__timeline">
          <div className="vision__phase vision__phase--current">
            <div className="vision__phase-marker" />
            <div className="vision__phase-content">
              <h3>APP + HARDWARE — Active</h3>
              <p>App in development. Small camera—prototypes nearing completion. Process started for consumer units: rechargeable battery and solar-panel charging. Bundle drop soon.</p>
            </div>
          </div>
          <div className="vision__phase">
            <div className="vision__phase-marker" />
            <div className="vision__phase-content">
              <h3>CONTACT RESEARCH — In development</h3>
              <p>Teams on solar-in-contact, leave-in wear, prescription options. Funded by $LPAI. Details as we ship.</p>
            </div>
          </div>
          <div className="vision__phase vision__phase--end">
            <div className="vision__phase-marker" />
            <div className="vision__phase-content">
              <h3>OPERATION LOOP ETERNAL — Classified</h3>
              <p>Contact in eye. Solar charge. Full replay. No wearable. Operation Loop Eternal is the program that gets the first wave there—early access, closed channels, the next layer before anyone else. The rest is need-to-know.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import './Funds.css'

export default function Funds() {
  return (
    <section className="funds" id="funds">
      <div className="funds__inner">
        <span className="section-label funds__label">$LPAI • ALLOCATION</span>
        <h2 className="section-title funds__title">Where the funds go</h2>

        <p className="section-desc funds__text">
          Proceeds from $LPAI are directed into research, product development, and operations. 
          That means: more R&D for the contact program, hardware and app builds, and whatever it takes 
          to ship the next layer. We don’t sit on the capital—we put it back into getting the products 
          and the app to the people who are in.
        </p>

        <div className="funds__block">
          <span className="section-label funds__label funds__label--sec">EARLY HARDWARE • RESTRICTED</span>
          <h3 className="funds__subtitle">First contact</h3>
          <p className="section-desc funds__text">
            We already have an early version in the pipeline. It’s a contact that carries a small camera. 
            It’s not where we want it yet—performance is limited—but it works well enough to be worn and to capture. 
            We’re not sharing specs or timelines beyond that. The next iterations are what we’re building toward.
          </p>
        </div>
      </div>
    </section>
  )
}

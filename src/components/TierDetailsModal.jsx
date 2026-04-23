import React from 'react';
import './TierDetailsModal.css'; // Will create this CSS file next

export default function TierDetailsModal({ tier, onClose }) {
  const tierDetails = {
    tier1: {
      title: 'Tier 1: Foundational AI Integration',
      description: (
        <>
          <p>This tier provides a foundational AI-integrated website, perfect for businesses looking to establish a strong online presence with smart automation. You gain:</p>
          <ul>
            <li>**AI-integrated website:** A modern, responsive website enhanced with AI capabilities for better user interaction.</li>
            <li>**Full back-end & front-end development:** Complete development from server to user interface, ensuring a robust and seamless experience.</li>
            <li>**Custom design & branding:** A unique design tailored to your brand identity, making you stand out.</li>
            <li>**Ongoing server management:** Worry-free hosting and maintenance, keeping your site fast and secure.</li>
            <li>**Basic analytics & reporting:** Essential insights into your website's performance to track growth and user engagement.</li>
          </ul>
          <p>Choosing Tier 1 means you're not just getting a website; you're investing in a smart digital asset that works for you 24/7, automating tasks and providing valuable data to help your business grow more efficiently than traditional websites.</p>
        </>
      ),
    },
    tier2: {
      title: 'Tier 2: Advanced AI Reception & Optimization',
      description: (
        <>
          <p>Building on Tier 1, this package introduces advanced AI phone reception, transforming how you handle customer inquiries and appointments. This is ideal for businesses with high call volumes or those needing to optimize their customer service. You gain:</p>
          <ul>
            <li>**All Tier 1 features:** Everything from the foundational package.</li>
            <li>**Advanced AI phone reception:** An intelligent virtual receptionist that handles calls, answers FAQs, and routes inquiries.</li>
            <li>**Enhanced lead qualification:** AI screens and qualifies leads, ensuring your team only engages with high-potential prospects.</li>
            <li>**Priority support:** Faster response times and dedicated assistance for any technical needs.</li>
            <li>**Custom integrations:** Seamless connection with your existing CRM, scheduling software, and other business tools.</li>
          </ul>
          <p>With Tier 2, you significantly reduce operational costs and improve customer satisfaction by automating routine communications, allowing your human staff to focus on more complex tasks and sales opportunities. This leads to higher efficiency and a better customer experience compared to relying solely on human receptionists.</p>
        </>
      ),
    },
    tier3: {
      title: 'Tier 3: Comprehensive AI Marketing & Growth',
      description: (
        <>
          <p>Our most comprehensive offering, Tier 3 integrates cutting-edge AI-powered advertising to drive targeted traffic and maximize conversions. This is for businesses ready to dominate their market and achieve exponential growth. You gain:</p>
          <ul>
            <li>**All Tier 2 features:** The complete AI-integrated website and advanced reception system.</li>
            <li>**AI-powered advertisement campaigns:** AI optimizes ad spend and targeting across platforms for maximum ROI.</li>
            <li>**Advanced market analysis:** Deep insights into market trends and competitor strategies to inform your business decisions.</li>
            <li>**Dedicated account manager:** A personal point of contact for strategic guidance and support.</li>
            <li>**Strategic growth consulting:** Expert advice to scale your business using AI-driven strategies.</li>
          </ul>
          <p>Tier 3 provides an unparalleled competitive advantage. By leveraging AI for both customer interaction and targeted advertising, your business operates with peak efficiency, attracting more qualified leads and converting them at a higher rate than any traditional marketing approach could achieve. This holistic AI strategy ensures sustained, aggressive growth.</p>
        </>
      ),
    },
  };

  const currentTier = tierDetails[tier];

  if (!currentTier) return null;

  return (
    <div className="v2-modal-overlay">
      <div className="v2-modal-content">
        <button className="v2-modal-close" onClick={onClose}>×</button>
        <h3>{currentTier.title}</h3>
        {currentTier.description}
      </div>
    </div>
  );
}

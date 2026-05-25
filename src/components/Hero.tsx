export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-badge">AI Prompt Engineering</div>
      <h1>
        Craft Prompts That
        <br />
        <span className="hero-gradient">Actually Work</span>
      </h1>
      <p className="hero-desc">
        Learn the 8 rules of elite prompt engineering, then submit your prompt to be enhanced, rated, and routed to the right AI.
      </p>
      <div className="hero-cta">
        <a href="#lab" className="btn-primary">
          Try the Prompt Lab
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
        <a href="#rules" className="btn-secondary">
          Learn the Rules
        </a>
      </div>
      <div className="hero-stats">
        <div className="stat">
          <span className="stat-num">8</span>
          <span className="stat-label">Core Rules</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-num">6</span>
          <span className="stat-label">AI Models</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-num">10x</span>
          <span className="stat-label">Better Results</span>
        </div>
      </div>
    </section>
  );
}

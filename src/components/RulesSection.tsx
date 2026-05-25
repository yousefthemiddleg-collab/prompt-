const rules = [
  {
    number: '01',
    title: 'Assign a Role',
    desc: 'Start with "You are a [expert]..." to prime the model with domain expertise and perspective.',
    icon: '🎭',
  },
  {
    number: '02',
    title: 'State the Goal Clearly',
    desc: 'Define exactly what you want — a summary, a plan, code, analysis. Ambiguity kills quality.',
    icon: '🎯',
  },
  {
    number: '03',
    title: 'Provide Context',
    desc: 'Include relevant background: audience, use case, constraints. More context = better output.',
    icon: '📋',
  },
  {
    number: '04',
    title: 'Specify Output Format',
    desc: 'Ask for bullets, tables, JSON, paragraphs, step-by-step. Structured requests get structured answers.',
    icon: '📐',
  },
  {
    number: '05',
    title: 'Set Tone & Style',
    desc: 'Mention the desired voice: professional, casual, concise, technical, beginner-friendly.',
    icon: '🎨',
  },
  {
    number: '06',
    title: 'Add Constraints',
    desc: 'Use "avoid X", "only include Y", "limit to Z words" to narrow the scope and prevent drift.',
    icon: '🔒',
  },
  {
    number: '07',
    title: 'Give Examples',
    desc: 'Few-shot examples dramatically improve output quality. Show the model what "good" looks like.',
    icon: '💡',
  },
  {
    number: '08',
    title: 'Define the Audience',
    desc: 'Specify who will read this — a CEO, a developer, a 10-year-old. It shapes vocabulary and depth.',
    icon: '👥',
  },
];

export default function RulesSection() {
  return (
    <section id="rules" className="rules-section">
      <div className="section-header">
        <span className="section-label">THE FRAMEWORK</span>
        <h2>8 Rules for Exceptional Prompts</h2>
        <p>Master these principles to get consistently outstanding results from any AI model.</p>
      </div>
      <div className="rules-grid">
        {rules.map((rule) => (
          <div key={rule.number} className="rule-card">
            <div className="rule-number">{rule.number}</div>
            <div className="rule-icon">{rule.icon}</div>
            <h3>{rule.title}</h3>
            <p>{rule.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

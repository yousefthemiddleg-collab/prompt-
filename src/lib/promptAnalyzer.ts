export interface PromptAnalysis {
  enhanced_prompt: string;
  rating: number;
  target_ai: string;
  feedback: string;
}

const AI_MODELS = {
  'Claude': { strengths: ['reasoning', 'coding', 'analysis', 'writing', 'research'], color: '#d97706', url: 'https://claude.ai' },
  'ChatGPT': { strengths: ['conversation', 'creative writing', 'brainstorming', 'general'], color: '#10a37f', url: 'https://chatgpt.com' },
  'Gemini': { strengths: ['multimodal', 'google', 'search', 'data', 'summarization'], color: '#4285f4', url: 'https://gemini.google.com' },
  'Grok': { strengths: ['real-time', 'news', 'twitter', 'current events', 'humor'], color: '#1a1a1a', url: 'https://grok.x.ai' },
  'Perplexity': { strengths: ['research', 'citations', 'web search', 'factual', 'sources'], color: '#20b2aa', url: 'https://perplexity.ai' },
  'Mistral': { strengths: ['code', 'technical', 'math', 'multilingual', 'efficiency'], color: '#ff6b35', url: 'https://mistral.ai' },
};

function scorePrompt(prompt: string): number {
  let score = 0;
  const p = prompt.trim();

  if (p.length > 20) score += 1;
  if (p.length > 80) score += 1;
  if (p.length > 200) score += 1;

  // Has context/role
  if (/\b(you are|act as|as a|role of|imagine you|context:)\b/i.test(p)) score += 1;
  // Has specific goal
  if (/\b(please|help me|i need|create|write|explain|analyze|generate|provide)\b/i.test(p)) score += 1;
  // Has format instruction
  if (/\b(format|list|bullet|step|markdown|table|json|paragraph|sections)\b/i.test(p)) score += 1;
  // Has examples
  if (/\b(example|for instance|such as|like|e\.g\.|sample)\b/i.test(p)) score += 1;
  // Has constraints
  if (/\b(avoid|don't|must|should|only|limit|without|focus|keep|include)\b/i.test(p)) score += 1;
  // Has tone/style
  if (/\b(professional|casual|formal|concise|detailed|tone|style|friendly)\b/i.test(p)) score += 1;
  // Has audience
  if (/\b(beginner|expert|audience|level|for|aimed at|suitable)\b/i.test(p)) score += 1;

  return Math.min(10, Math.max(1, score));
}

function routeToAI(prompt: string): string {
  const p = prompt.toLowerCase();

  if (/\b(code|program|debug|function|api|bug|script|developer|programming|software)\b/.test(p)) return 'Claude';
  if (/\b(research|sources|cite|factual|statistics|study|evidence|reference)\b/.test(p)) return 'Perplexity';
  if (/\b(image|photo|video|multimodal|visual|google|youtube|map)\b/.test(p)) return 'Gemini';
  if (/\b(news|trending|twitter|x\.com|current|today|latest|real-time)\b/.test(p)) return 'Grok';
  if (/\b(math|equation|formula|calculate|technical|algorithm|logic)\b/.test(p)) return 'Mistral';
  if (/\b(story|creative|poem|brainstorm|idea|imagine|fiction|narrative)\b/.test(p)) return 'ChatGPT';
  if (/\b(analyze|reason|explain|complex|philosophy|ethics|deep)\b/.test(p)) return 'Claude';

  return 'ChatGPT';
}

function enhancePrompt(original: string): string {
  const p = original.trim();
  let enhanced = p;

  const hasRole = /\b(you are|act as|as a)\b/i.test(p);
  const hasFormat = /\b(format|list|bullet|table|json|markdown)\b/i.test(p);
  const hasContext = p.length > 100;
  const hasTone = /\b(professional|casual|formal|concise|detailed)\b/i.test(p);

  let prefix = '';
  let suffix = '';

  if (!hasRole) {
    const ai = routeToAI(p);
    if (ai === 'Claude' && /\b(code|program|debug)\b/i.test(p)) {
      prefix = 'You are an expert software engineer. ';
    } else if (/\b(research|analyze)\b/i.test(p)) {
      prefix = 'You are a thorough research analyst. ';
    } else if (/\b(write|story|creative)\b/i.test(p)) {
      prefix = 'You are a skilled creative writer. ';
    } else {
      prefix = 'You are a knowledgeable and helpful AI assistant. ';
    }
  }

  if (!hasTone && !hasContext) {
    suffix += ' Provide a clear, well-structured response.';
  }

  if (!hasFormat && p.length > 30) {
    suffix += ' Use organized formatting where appropriate.';
  }

  enhanced = prefix + enhanced + suffix;
  return enhanced;
}

function generateFeedback(original: string, score: number): string {
  const issues: string[] = [];
  const p = original.trim();

  if (p.length < 20) issues.push('Too brief — add more context about your goal');
  if (!/\b(you are|act as|as a|role)\b/i.test(p)) issues.push('No role assigned — specifying an expert persona improves results');
  if (!/\b(format|list|bullet|table|json|structure)\b/i.test(p)) issues.push('No output format specified — add formatting instructions');
  if (!/\b(avoid|must|should|only|focus|limit)\b/i.test(p)) issues.push('No constraints — define what to include/exclude');
  if (!/\b(tone|style|formal|casual|professional|concise)\b/i.test(p)) issues.push('No tone guidance — specify the desired style');
  if (!/\b(audience|beginner|expert|level)\b/i.test(p)) issues.push('Audience unclear — mention who this is for');

  if (score >= 8) return 'Strong prompt. Minor refinements applied for clarity and structure.';
  if (score >= 6) return `Good foundation. Improvements: ${issues.slice(0, 2).join('; ')}.`;
  if (score >= 4) return `Average prompt. Key gaps: ${issues.slice(0, 3).join('; ')}.`;
  return `Needs work. Critical issues: ${issues.join('; ')}.`;
}

export function analyzePrompt(original: string): PromptAnalysis {
  const rating = scorePrompt(original);
  const target_ai = routeToAI(original);
  const enhanced_prompt = enhancePrompt(original);
  const feedback = generateFeedback(original, rating);

  return { enhanced_prompt, rating, target_ai, feedback };
}

export { AI_MODELS };

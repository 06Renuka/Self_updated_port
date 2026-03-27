// src/data/blogStore.js
// Central data store for blog posts, using localStorage for persistence

export const INITIAL_POSTS = [
  {
    id: '1',
    title: 'Prompt Engineering Patterns That Actually Work in Production',
    slug: 'prompt-engineering-patterns-production',
    excerpt: 'After months of designing, testing, and refining prompts for LLM systems at scale, here are the patterns I keep coming back to — from few-shot templates to chain-of-thought techniques.',
    content: `Working with LLMs every day as part of my role at Innodata, I've developed strong opinions about what makes prompts work reliably in production versus what looks good in a demo but falls apart under edge cases.

## Start With Clear Output Contracts

The single most impactful thing you can do is define exactly what format you expect the model to return. Don't say "extract the skills from this resume" — say "Return a JSON array of strings containing only technical skills. Return an empty array if none are found. Return nothing else."

\`\`\`
BAD: "Summarize this customer complaint"

GOOD: "Summarize this customer complaint in exactly 2 sentences.
Sentence 1: The core issue. Sentence 2: What the customer wants.
If the text is not a complaint, return: NOT_A_COMPLAINT"
\`\`\`

## Few-Shot Examples Are Not Optional for Classification

Zero-shot classification works fine for simple binary tasks. The moment you have 3+ classes or nuanced distinctions, include examples. I typically use 2-3 examples per class minimum.

## Chain-of-Thought for Complex Reasoning

For tasks that require multi-step reasoning, ask the model to think step by step before giving the final answer. The quality improvement is dramatic. The tradeoff is latency and token cost — worth it for accuracy-critical tasks.

## Handle Edge Cases Explicitly

In production, you will encounter inputs your prompt wasn't designed for. Build in explicit handling:

\`\`\`
"If the input is empty, return: EMPTY_INPUT
If the input is not in English, return: NON_ENGLISH
If the input contains no relevant information, return: NO_DATA"
\`\`\`

This prevents the model from hallucinating a response when it shouldn't.

## Iterate With Metrics, Not Intuition

Every prompt change should be evaluated against a test set with ground truth labels. Track precision and recall per class. Gut feeling about whether a prompt "seems better" is almost always wrong.`,
    tags: ['Prompt Engineering', 'LLM', 'AI', 'Production'],
    status: 'published',
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-01-10T10:00:00Z',
    readTime: 6,
  },
  {
    id: '2',
    title: 'Building LLM-Powered Features in a React + Spring Boot App',
    slug: 'llm-features-react-spring-boot',
    excerpt: 'How I integrated LLM-powered chatbot workflows into a production full-stack application — the architecture decisions, API design, and lessons learned from real usage.',
    content: `When we decided to integrate LLM-powered features into our application at HerKey, the biggest question wasn't which model to use — it was how to design the integration so it was maintainable, testable, and didn't couple our entire backend to a specific AI provider.

## The Architecture We Settled On

We created a dedicated AI service layer in Spring Boot that handled all communication with the LLM API. This service was injected into controllers via dependency injection, making it straightforward to mock in tests and swap providers if needed.

\`\`\`java
@Service
public class LLMService {
    private final RestTemplate restTemplate;
    private final PromptBuilder promptBuilder;

    public String generateResponse(String userInput, ConversationContext ctx) {
        String prompt = promptBuilder.build(userInput, ctx);
        // Call LLM API, handle errors, return structured response
    }
}
\`\`\`

## Managing Conversation Context

Multi-turn conversations require sending history with each request. We stored conversation context in the user's session and trimmed it to the last N turns to stay within token limits. The key insight: summarize older context rather than just dropping it.

## The React Frontend

On the frontend, we used a custom React hook to manage chat state:

\`\`\`javascript
function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(text) {
    setLoading(true);
    const response = await chatAPI.send(text);
    setMessages(prev => [...prev, { role: 'user', text }, { role: 'ai', text: response }]);
    setLoading(false);
  }

  return { messages, sendMessage, loading };
}
\`\`\`

## What I'd Do Differently

Streaming responses from the start. Users hate waiting 3-5 seconds for a response to appear all at once. Server-sent events make this straightforward.`,
    tags: ['React.js', 'Spring Boot', 'LLM', 'Full Stack'],
    status: 'published',
    createdAt: '2025-02-05T09:00:00Z',
    updatedAt: '2025-02-05T09:00:00Z',
    readTime: 7,
  },
  {
    id: '3',
    title: 'React Performance Optimization: Lessons From Production',
    slug: 'react-performance-optimization-production',
    excerpt: 'Practical techniques for diagnosing and fixing React performance issues I encountered building the CRM dashboard at HerKey — memo, useMemo, virtualization, and more.',
    content: `Performance problems in React almost always come from the same few root causes. Here's what I've actually used in production to fix them.

## The First Step: Measure, Don't Guess

Use React DevTools Profiler to identify which components are re-rendering and why. I've been surprised many times — the bottleneck is never where I expect it to be.

## Unnecessary Re-renders

In our CRM dashboard, we had a data table component re-rendering on every keystroke in a search field because the filter function was being recreated each render.

\`\`\`javascript
// Before - creates new function on every render
const filtered = data.filter(item => item.name.includes(query));

// After - memoized
const filtered = useMemo(
  () => data.filter(item => item.name.includes(query)),
  [data, query]
);
\`\`\`

## Virtualization for Long Lists

If you're rendering more than 50-100 rows in a table or list, virtualize it. Only render what's visible in the viewport. React Window makes this straightforward and the performance difference is dramatic — we went from 800ms render time to under 50ms.

## Code Splitting

Split your bundle by route. Users shouldn't download code for pages they haven't visited.

\`\`\`javascript
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Reports = lazy(() => import('./pages/Reports'));
\`\`\`

The biggest lesson: most React performance problems are architectural, not algorithmic. Fix the data flow first.`,
    tags: ['React.js', 'Performance', 'JavaScript', 'Frontend'],
    status: 'published',
    createdAt: '2025-03-01T11:00:00Z',
    updatedAt: '2025-03-01T11:00:00Z',
    readTime: 5,
  },
  {
    id: '4',
    title: 'RAG Architecture: A Practical Introduction',
    slug: 'rag-architecture-practical-introduction',
    excerpt: 'Retrieval-Augmented Generation explained from a practitioner perspective — what it is, when to use it, and the implementation patterns that matter.',
    content: `Draft — coming soon.`,
    tags: ['RAG', 'LLM', 'AI Architecture', 'NLP'],
    status: 'draft',
    createdAt: '2025-03-15T08:00:00Z',
    updatedAt: '2025-03-15T08:00:00Z',
    readTime: 8,
  },
];

const STORAGE_KEY = 'portfolio_blog_posts';

export function getPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  // Seed initial data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
  return INITIAL_POSTS;
}

export function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

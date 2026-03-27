// src/pages/Projects.jsx
import { Github, ExternalLink } from 'lucide-react';
import './Projects.css';

const PROJECTS = [
  {
    id: 1,
    name: 'LLM-Based Chatbot Application',
    tagline: 'AI-powered multi-turn conversational chatbot',
    description:
      'Designed and built a full-stack chatbot application using React.js, Java, and Spring Boot. Engineered and optimized prompts for multi-turn conversations using few-shot and structured prompting techniques. Improved response quality through iterative prompt refinement for edge cases, ambiguity handling, and context retention. Deployed on AWS EC2 with REST API integration.',
    tech: ['React.js', 'Java', 'Spring Boot', 'REST API', 'AWS EC2', 'Prompt Engineering'],
    status: 'Production',
    github: 'https://github.com/06Renuka',
    demo: 'https://github.com/06Renuka',
    year: 2024,
    highlights: [
      'Few-shot & structured prompting techniques',
      'Multi-turn conversation context retention',
      'LLM output evaluation & iterative refinement',
      'Deployed on AWS EC2 with CI/CD pipeline',
    ],
  },
  {
    id: 2,
    name: 'AI-Powered Resume Parsing System',
    tagline: 'LLM-based document intelligence pipeline',
    description:
      'Built an intelligent document parsing system using Node.js and NLP pipelines to extract structured data from unstructured resumes. Leveraged LLM APIs with custom prompt engineering to accurately identify candidate information, skills, experience, and education. Designed for high accuracy and consistency across diverse resume formats.',
    tech: ['Node.js', 'NLP', 'LLM APIs', 'Prompt Engineering', 'REST API', 'MongoDB'],
    status: 'Production',
    github: 'https://github.com/06Renuka',
    demo: 'https://github.com/06Renuka',
    year: 2024,
    highlights: [
      'LLM-based structured data extraction from PDFs',
      'Custom NLP pipeline for resume parsing',
      'Handles diverse resume formats consistently',
      'High-accuracy field extraction with prompt tuning',
    ],
  },
  {
    id: 3,
    name: 'Frontend CRM Dashboard',
    tagline: 'Full-featured CRM with auth and API integration',
    description:
      'Developed a responsive CRM dashboard using React.js and Redux for state management. Implemented JWT-based authentication, role-based access control, and seamless REST API integration. Built reusable UI components with clean UX, data tables, filters, and real-time updates — following Agile/Scrum practices throughout.',
    tech: ['React.js', 'Redux', 'REST APIs', 'JWT', 'JavaScript', 'CSS3', 'Tailwind CSS'],
    status: 'Open Source',
    github: 'https://github.com/06Renuka',
    demo: 'https://github.com/06Renuka',
    year: 2023,
    highlights: [
      'JWT authentication & role-based access',
      'Redux state management for complex UI',
      'Reusable component library',
      'Responsive design across all devices',
    ],
  },
];

export default function Projects() {
  return (
    <main className="page projects">
      <div className="container">
        <header className="projects__header">
          <p className="section-label">What I've Built</p>
          <h1 className="section-title">Projects</h1>
          <p className="projects__subtitle">
            A selection of projects I've built — spanning AI-powered applications,
            full-stack web apps, and LLM-integrated systems.
          </p>
        </header>

        <div className="projects__list">
          {PROJECTS.map((project, i) => (
            <article key={project.id} className="project-card fade-up" style={{ animationDelay: `${i * 0.12}s` }}>
              <div className="project-card__meta">
                <span className="tag">{project.year}</span>
                <span className={`tag ${project.status === 'Production' ? 'tag-green' : project.status === 'Open Source' ? 'tag-accent' : ''}`}>
                  {project.status}
                </span>
              </div>
              <div className="project-card__inner">
                <div className="project-card__main">
                  <h2 className="project-card__name">{project.name}</h2>
                  <p className="project-card__tagline">{project.tagline}</p>
                  <p className="project-card__desc">{project.description}</p>
                  <ul className="project-card__highlights">
                    {project.highlights.map(h => (
                      <li key={h}><span className="highlight-bullet">→</span> {h}</li>
                    ))}
                  </ul>
                  <div className="project-card__tech">
                    {project.tech.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
                <div className="project-card__actions">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                    <Github size={13} /> GitHub
                  </a>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                    <ExternalLink size={13} /> View
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Renuka Kanade · All projects are my own work</p>
      </footer>
    </main>
  );
}

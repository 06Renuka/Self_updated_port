// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Mail, Download } from 'lucide-react';
import './Home.css';

const SKILLS = [
  { category: 'Frontend', items: ['React.js', 'Next.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Redux', 'Vue.js', 'HTML5', 'CSS3', 'Bootstrap'] },
  { category: 'Backend', items: ['Node.js', 'Express.js', 'Java', 'Spring Boot', 'REST APIs', 'JWT Authentication'] },
  { category: 'Databases', items: ['MySQL', 'MongoDB', 'PostgreSQL'] },
  { category: 'DevOps & Cloud', items: ['Docker', 'Jenkins', 'AWS EC2', 'AWS S3', 'CI/CD Pipelines', 'Git', 'GitHub'] },
  { category: 'AI / LLM', items: ['Prompt Engineering', 'LLM Evaluation', 'Few-shot Learning', 'Chain-of-Thought', 'RAG Architecture', 'NLP', 'Data Annotation'] },
  { category: 'Tools', items: ['Postman', 'IntelliJ IDEA', 'Linux', 'Agile', 'Scrum'] },
];

export default function Home() {
  return (
    <main className="page home">
      {/* Hero */}
      <section className="hero container">
        <div className="hero__content">
          <p className="section-label fade-up" style={{ animationDelay: '0.1s' }}>
            Full Stack Software Engineer · AI & LLM
          </p>
          <h1 className="hero__title fade-up" style={{ animationDelay: '0.2s' }}>
            I build things<br />
            <span className="hero__title-em">for the web & AI.</span>
          </h1>
          <p className="hero__bio fade-up" style={{ animationDelay: '0.3s' }}>
            Hi, I'm <strong>Renuka Kanade</strong> — a Full Stack Software Engineer with 2 years of experience
            and hands-on exposure to Prompt Engineering, LLM evaluation, and AI data workflows.
            Skilled in React.js, Node.js, Spring Boot, and scalable backend systems.
          </p>
          <div className="hero__actions fade-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/projects" className="btn btn-primary">
              View My Work <ArrowRight size={14} />
            </Link>
            <a href="mailto:renukakanade2001@gmail.com" className="btn btn-ghost">
              <Mail size={14} /> Get In Touch
            </a>
          </div>
          <div className="hero__social fade-up" style={{ animationDelay: '0.5s' }}>
            <a href="https://github.com/06Renuka" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/renuka-kanade-ba1853215/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="mailto:renukakanade2001@gmail.com" className="social-link" aria-label="Email me">
              <Mail size={18} />
            </a>
          </div>
        </div>
        <div className="hero__photo-wrap fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="hero__photo">
            <div className="hero__photo-inner">
              <span>RK</span>
            </div>
          </div>
          <div className="hero__status">
            <span className="hero__status-dot"></span>
            <span>Open to opportunities</span>
          </div>
        </div>
      </section>

      <hr className="divider container" />

      {/* Skills */}
      <section className="skills container">
        <p className="section-label">What I Work With</p>
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="skills__grid">
          {SKILLS.map(({ category, items }) => (
            <div key={category} className="skills__group card">
              <h3 className="skills__category">{category}</h3>
              <div className="skills__items">
                {items.map(skill => (
                  <span key={skill} className="tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider container" />

      {/* About strip */}
      <section className="about container">
        <div className="about__inner">
          <div>
            <p className="section-label">About Me</p>
            <h2 className="about__title">A little more about<br />who I am</h2>
          </div>
          <div className="about__text">
            <p>
              I graduated with a B.E. in Computer Science from Savitribai Phule Pune University in 2023.
              Since then I've worked as an Associate Software Engineer at HerKey in Bengaluru, a Freelance
              Engineer at Sparklin.AI, and currently as an AI Data Annotator at Innodata Inc.
            </p>
            <p>
              I specialize in full-stack development with React.js, Node.js, and Spring Boot, and I bring
              a unique edge through my hands-on experience with LLM prompt engineering, evaluation, and
              AI-powered product features. I love building things that are fast, accessible, and useful.
            </p>
            <Link to="/projects" className="btn btn-ghost" style={{ marginTop: '1.5rem' }}>
              See My Projects <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Renuka Kanade · Built with React &amp; Vite · Deployed on Vercel</p>
      </footer>
    </main>
  );
}

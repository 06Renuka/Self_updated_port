// src/pages/BlogPost.jsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import './BlogPost.css';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Minimal markdown-like renderer (handles code blocks, headings, paragraphs)
function renderContent(content) {
  if (!content) return null;
  const lines = content.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={i} className="post-code">
          {lang && <span className="post-code__lang">{lang}</span>}
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="post-h2">{line.slice(3)}</h2>);
    } else if (line.startsWith('# ')) {
      elements.push(<h1 key={i} className="post-h1">{line.slice(2)}</h1>);
    } else if (line.trim() === '') {
      // skip blank lines between block elements
    } else {
      elements.push(<p key={i} className="post-p">{line}</p>);
    }
    i++;
  }
  return elements;
}

export default function BlogPost() {
  const { slug } = useParams();
  const { getPostBySlug } = useBlog();
  const navigate = useNavigate();
  const post = getPostBySlug(slug);

  if (!post || post.status !== 'published') {
    return (
      <main className="page">
        <div className="container post-notfound">
          <p>Post not found.</p>
          <Link to="/blog" className="btn btn-ghost" style={{ marginTop: '1rem' }}>
            <ArrowLeft size={14} /> Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page blog-post-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="post-back btn btn-ghost btn-sm">
          <ArrowLeft size={13} /> Back
        </button>

        <article className="post">
          <header className="post-header">
            <div className="post-header__tags">
              {post.tags?.map(tag => <span key={tag} className="tag tag-accent">{tag}</span>)}
            </div>
            <h1 className="post-title">{post.title}</h1>
            <p className="post-excerpt">{post.excerpt}</p>
            <div className="post-meta">
              <span><Calendar size={12} /> {formatDate(post.createdAt)}</span>
              <span><Clock size={12} /> {post.readTime} min read</span>
            </div>
          </header>

          <hr className="post-divider" />

          <div className="post-body">
            {renderContent(post.content)}
          </div>
        </article>
      </div>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Renuka Kanade</p>
      </footer>
    </main>
  );
}

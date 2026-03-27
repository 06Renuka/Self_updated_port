// src/pages/Blog.jsx
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import './Blog.css';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function Blog() {
  const { getPublishedPosts } = useBlog();
  const posts = getPublishedPosts();

  return (
    <main className="page blog-page">
      <div className="container">
        <header className="blog-header">
          <p className="section-label">Writing</p>
          <h1 className="section-title">Blog</h1>
          <p className="blog-subtitle">
            Thoughts on software engineering, architecture, and the tools I use day to day.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="blog-empty">
            <p>No posts published yet. Check back soon.</p>
          </div>
        ) : (
          <div className="blog-list">
            {posts.map((post, i) => (
              <article key={post.id} className="blog-item fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="blog-item__left">
                  <time className="blog-item__date">{formatDate(post.createdAt)}</time>
                </div>
                <div className="blog-item__main">
                  <div className="blog-item__tags">
                    {post.tags?.slice(0, 3).map(tag => (
                      <span key={tag} className="tag tag-accent">{tag}</span>
                    ))}
                  </div>
                  <Link to={`/blog/${post.slug}`} className="blog-item__title-link">
                    <h2 className="blog-item__title">{post.title}</h2>
                  </Link>
                  <p className="blog-item__excerpt">{post.excerpt}</p>
                  <div className="blog-item__footer">
                    <span className="blog-item__read-time">
                      <Clock size={12} /> {post.readTime} min read
                    </span>
                    <Link to={`/blog/${post.slug}`} className="blog-item__read-more">
                      Read post <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Renuka Kanade · {posts.length} post{posts.length !== 1 ? 's' : ''} published</p>
      </footer>
    </main>
  );
}

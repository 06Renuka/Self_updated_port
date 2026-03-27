// src/pages/Admin.jsx
import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, LogOut, Save, X, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';
import './Admin.css';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const EMPTY_FORM = { title: '', excerpt: '', content: '', tags: '', status: 'draft' };

export default function Admin() {
  const { posts, createPost, updatePost, deletePost } = useBlog();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [view, setView] = useState('list'); // 'list' | 'edit'
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [filter, setFilter] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saved, setSaved] = useState(false);

  function handleNew() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setView('edit');
  }

  function handleEdit(post) {
    setEditingId(post.id);
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      tags: post.tags?.join(', ') || '',
      status: post.status,
    });
    setView('edit');
  }

  function handleSave() {
    if (!form.title.trim()) return;
    const data = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    if (editingId) {
      updatePost(editingId, data);
    } else {
      createPost(data);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setView('list');
  }

  function handleDelete(id) {
    deletePost(id);
    setDeleteConfirm(null);
  }

  function toggleStatus(post) {
    updatePost(post.id, { ...post, tags: post.tags, status: post.status === 'published' ? 'draft' : 'published' });
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  const filtered = posts.filter(p => filter === 'all' || p.status === filter);
  const publishedCount = posts.filter(p => p.status === 'published').length;
  const draftCount = posts.filter(p => p.status === 'draft').length;

  return (
    <main className="page admin-page">
      <div className="container">
        {/* Admin Header */}
        <div className="admin-header">
          <div>
            <p className="section-label">Admin Portal</p>
            <h1 className="admin-title">Blog Management</h1>
          </div>
          <button onClick={handleLogout} className="btn btn-ghost btn-sm">
            <LogOut size={13} /> Sign Out
          </button>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          <div className="stat-card">
            <span className="stat-value">{posts.length}</span>
            <span className="stat-label">Total Posts</span>
          </div>
          <div className="stat-card">
            <span className="stat-value stat-value--green">{publishedCount}</span>
            <span className="stat-label">Published</span>
          </div>
          <div className="stat-card">
            <span className="stat-value stat-value--muted">{draftCount}</span>
            <span className="stat-label">Drafts</span>
          </div>
        </div>

        {view === 'list' ? (
          <>
            {/* Toolbar */}
            <div className="admin-toolbar">
              <div className="admin-filters">
                {['all', 'published', 'draft'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`filter-btn ${filter === f ? 'active' : ''}`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
              <button onClick={handleNew} className="btn btn-primary btn-sm">
                <Plus size={14} /> New Post
              </button>
            </div>

            {/* Posts Table */}
            <div className="posts-table">
              {filtered.length === 0 ? (
                <div className="posts-empty">
                  <FileText size={32} />
                  <p>No {filter !== 'all' ? filter : ''} posts found.</p>
                  <button onClick={handleNew} className="btn btn-ghost btn-sm" style={{ marginTop: '0.75rem' }}>
                    <Plus size={13} /> Create one
                  </button>
                </div>
              ) : (
                filtered.map(post => (
                  <div key={post.id} className="post-row">
                    <div className="post-row__main">
                      <div className="post-row__title-wrap">
                        <span className={`post-row__status-dot ${post.status}`} title={post.status}></span>
                        <h3 className="post-row__title">{post.title}</h3>
                      </div>
                      <p className="post-row__excerpt">{post.excerpt?.slice(0, 100)}…</p>
                      <div className="post-row__meta">
                        <span className={`tag ${post.status === 'published' ? 'tag-green' : ''}`}>{post.status}</span>
                        <span className="post-row__date">{formatDate(post.updatedAt)}</span>
                        {post.tags?.slice(0, 2).map(t => <span key={t} className="tag">{t}</span>)}
                      </div>
                    </div>
                    <div className="post-row__actions">
                      <button
                        onClick={() => toggleStatus(post)}
                        className="icon-btn"
                        title={post.status === 'published' ? 'Set to Draft' : 'Publish'}
                      >
                        {post.status === 'published' ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                      <button onClick={() => handleEdit(post)} className="icon-btn" title="Edit">
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(post.id)}
                        className="icon-btn icon-btn--danger"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          /* Edit / Create Form */
          <div className="post-editor">
            <div className="editor-header">
              <h2 className="editor-title">{editingId ? 'Edit Post' : 'New Post'}</h2>
              <div className="editor-header__actions">
                <button onClick={() => setView('list')} className="btn btn-ghost btn-sm">
                  <X size={13} /> Cancel
                </button>
                <button onClick={handleSave} className="btn btn-primary btn-sm" disabled={!form.title.trim()}>
                  <Save size={13} /> {saved ? 'Saved!' : 'Save Post'}
                </button>
              </div>
            </div>

            <div className="editor-form">
              <div className="form-row">
                <div className="form-field">
                  <label>Title *</label>
                  <input
                    type="text"
                    placeholder="Post title…"
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  />
                </div>
                <div className="form-field form-field--sm">
                  <label>Status</label>
                  <select
                    value={form.status}
                    onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    className="admin-select"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label>Excerpt</label>
                <textarea
                  rows={3}
                  placeholder="Short description of the post…"
                  value={form.excerpt}
                  onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                />
              </div>

              <div className="form-field">
                <label>Tags <span className="label-hint">(comma separated)</span></label>
                <input
                  type="text"
                  placeholder="React, Node.js, Performance"
                  value={form.tags}
                  onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                />
              </div>

              <div className="form-field">
                <label>Content <span className="label-hint">(supports ## headings and ```code blocks)</span></label>
                <textarea
                  rows={22}
                  className="content-textarea"
                  placeholder="Write your post content here…"
                  value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Delete Post?</h3>
            <p>This action cannot be undone. The post will be permanently deleted.</p>
            <div className="modal-actions">
              <button onClick={() => setDeleteConfirm(null)} className="btn btn-ghost">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>Admin Portal · © {new Date().getFullYear()} Renuka Kanade</p>
      </footer>
    </main>
  );
}

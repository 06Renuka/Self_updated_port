// src/context/BlogContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';
import { getPosts, savePosts, generateId, generateSlug } from '../data/blogStore';

const BlogContext = createContext(null);

export function BlogProvider({ children }) {
  const [posts, setPosts] = useState(() => getPosts());

  const sync = useCallback((updated) => {
    setPosts(updated);
    savePosts(updated);
  }, []);

  function createPost(data) {
    const newPost = {
      id: generateId(),
      slug: generateSlug(data.title),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readTime: Math.ceil((data.content?.split(' ').length || 0) / 200) || 1,
      ...data,
    };
    sync([newPost, ...posts]);
    return newPost;
  }

  function updatePost(id, data) {
    const updated = posts.map(p =>
      p.id === id
        ? { ...p, ...data, slug: generateSlug(data.title || p.title), updatedAt: new Date().toISOString(), readTime: Math.ceil((data.content?.split(' ').length || p.content?.split(' ').length || 0) / 200) || 1 }
        : p
    );
    sync(updated);
  }

  function deletePost(id) {
    sync(posts.filter(p => p.id !== id));
  }

  function getPostBySlug(slug) {
    return posts.find(p => p.slug === slug);
  }

  function getPublishedPosts() {
    return posts.filter(p => p.status === 'published').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return (
    <BlogContext.Provider value={{ posts, createPost, updatePost, deletePost, getPostBySlug, getPublishedPosts }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  return useContext(BlogContext);
}

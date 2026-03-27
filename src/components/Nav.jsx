// src/components/Nav.jsx
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Nav() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="nav">
      <div className="container nav__inner">
        <NavLink to="/" className="nav__logo">
          Renuka<span>.</span>Kanade
        </NavLink>
        <div className="nav__links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''}>Projects</NavLink>
          <NavLink to="/blog" className={({ isActive }) => isActive ? 'active' : ''}>Blog</NavLink>
          {isAuthenticated
            ? <NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>Admin</NavLink>
            : <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Admin</NavLink>
          }
        </div>
      </div>
    </nav>
  );
}

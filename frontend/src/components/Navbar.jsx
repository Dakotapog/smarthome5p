import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const styles = {
  nav: {
    background: 'var(--bg-secondary)',
    borderBottom: '1px solid var(--border)',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: 700,
    fontSize: '18px',
    color: 'var(--accent)',
  },
  links: {
    display: 'flex',
    gap: '8px',
  },
  link: (active) => ({
    padding: '8px 16px',
    borderRadius: '6px',
    color: active ? 'var(--accent)' : 'var(--text-muted)',
    background: active ? 'rgba(0,188,212,0.1)' : 'transparent',
    border: active ? '1px solid var(--border)' : '1px solid transparent',
    fontSize: '14px',
    fontWeight: active ? 600 : 400,
    transition: 'all 0.2s',
    textDecoration: 'none',
  }),
  user: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '13px',
  },
  roleTag: (role) => ({
    background: role === 'Admin' ? 'rgba(0,188,212,0.2)' : 'rgba(76,175,80,0.2)',
    color: role === 'Admin' ? 'var(--accent)' : 'var(--green)',
    padding: '2px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 600,
  }),
  logoutBtn: {
    background: 'transparent',
    border: '1px solid rgba(244,67,54,0.4)',
    color: 'var(--red)',
    padding: '6px 14px',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
  },
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  const links = [
    { to: '/dashboard', label: '🏢 Dashboard' },
    { to: '/alerts', label: '🚨 Alertas' },
    ...(user?.role === 'Admin' ? [{ to: '/residents', label: '👥 Residentes' }] : []),
    { to: '/water', label: '💧 Hídrico' },
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <span>🏢</span>
        <span>SmartHome 5P</span>
      </div>

      <div style={styles.links}>
        {links.map(l => (
          <Link key={l.to} to={l.to} style={styles.link(location.pathname === l.to)}>
            {l.label}
          </Link>
        ))}
      </div>

      {user && (
        <div style={styles.user}>
          <span style={{ color: 'var(--text-muted)' }}>{user.username}</span>
          <span style={styles.roleTag(user.role)}>{user.role}</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>Salir</button>
        </div>
      )}
    </nav>
  );
}

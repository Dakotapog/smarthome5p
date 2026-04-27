import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(username, password);
    if (result.ok) navigate('/dashboard');
    else setError(result.error);
  };

  const fillDemo = (role) => {
    if (role === 'admin') { setUsername('admin@smarthome5p.co'); setPassword('password'); }
    else { setUsername('residente@smarthome5p.co'); setPassword('password'); }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-primary)',
    }}>
      <div style={{
        background: 'var(--bg-secondary)', border: '1px solid var(--border)',
        borderRadius: '16px', padding: '48px 40px', width: '100%', maxWidth: '420px',
        boxShadow: 'var(--shadow)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🏢</div>
          <h1 style={{ color: 'var(--accent)', fontSize: '24px', fontWeight: 700 }}>SmartHome 5P</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Sistema de Gestión Edificio Inteligente
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '6px' }}>
              Usuario
            </label>
            <input
              type="text" value={username} onChange={e => setUsername(e.target.value)}
              placeholder="usuario@smarthome5p.co" required
              style={{
                width: '100%', padding: '12px 14px', background: 'var(--bg-card)',
                border: '1px solid var(--border)', borderRadius: '8px',
                color: 'var(--text-primary)', fontSize: '14px', outline: 'none',
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '6px' }}>
              Contraseña
            </label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" required
              style={{
                width: '100%', padding: '12px 14px', background: 'var(--bg-card)',
                border: '1px solid var(--border)', borderRadius: '8px',
                color: 'var(--text-primary)', fontSize: '14px', outline: 'none',
              }}
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(244,67,54,0.1)', border: '1px solid rgba(244,67,54,0.3)',
              borderRadius: '8px', padding: '10px 14px', color: 'var(--red)',
              fontSize: '13px', marginBottom: '16px',
            }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '13px', background: 'var(--accent)',
            border: 'none', borderRadius: '8px', color: '#fff',
            fontWeight: 700, fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s',
          }}>
            {loading ? 'Ingresando...' : 'Ingresar al Sistema'}
          </button>
        </form>

        {/* Credenciales de demo */}
        <div style={{
          marginTop: '24px', padding: '16px', background: 'rgba(0,188,212,0.05)',
          border: '1px solid var(--border)', borderRadius: '8px',
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '10px', fontWeight: 600 }}>
            ACCESO DEMO
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => fillDemo('admin')} style={{
              flex: 1, padding: '8px', background: 'rgba(0,188,212,0.15)',
              border: '1px solid var(--border)', borderRadius: '6px',
              color: 'var(--accent)', fontSize: '12px', cursor: 'pointer',
            }}>
              👤 Admin
            </button>
            <button onClick={() => fillDemo('resident')} style={{
              flex: 1, padding: '8px', background: 'rgba(76,175,80,0.15)',
              border: '1px solid rgba(76,175,80,0.3)', borderRadius: '6px',
              color: 'var(--green)', fontSize: '12px', cursor: 'pointer',
            }}>
              🏠 Residente
            </button>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '8px', textAlign: 'center' }}>
            Contraseña demo: <code style={{ color: 'var(--accent)' }}>password</code>
          </p>
        </div>
      </div>
    </div>
  );
}

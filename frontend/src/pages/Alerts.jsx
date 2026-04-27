import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const levelColor = { CRITICAL: 'var(--red)', WARNING: 'var(--yellow)', INFO: 'var(--accent)' };
const typeIcon = { SMOKE: '🔥', SEISMIC: '📳', INTRUSION: '🚪', WATER_LEAK: '💧' };

function AlertCard({ alert, onResolve, isAdmin }) {
  const ts = new Date(alert.triggeredAt).toLocaleString('es-CO');
  return (
    <div style={{
      background: 'var(--bg-card)', border: `1px solid ${alert.isResolved ? 'var(--border)' : 'rgba(244,67,54,0.4)'}`,
      borderRadius: '10px', padding: '18px', marginBottom: '12px',
      opacity: alert.isResolved ? 0.65 : 1,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>{typeIcon[alert.type] || '⚠️'}</span>
          <div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{
                background: `${levelColor[alert.level]}22`, color: levelColor[alert.level],
                padding: '2px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700,
              }}>
                {alert.level}
              </span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '14px' }}>
                {alert.type} — Piso {alert.floor}
              </span>
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{ts}</span>
            {alert.isResolved && (
              <span style={{ color: 'var(--green)', fontSize: '11px', marginLeft: '10px' }}>
                ✓ Resuelta por {alert.resolvedByName || 'Admin'}
              </span>
            )}
          </div>
        </div>
        {isAdmin && !alert.isResolved && (
          <button onClick={() => onResolve(alert.alertId)} style={{
            background: 'rgba(76,175,80,0.15)', border: '1px solid rgba(76,175,80,0.4)',
            color: 'var(--green)', padding: '8px 16px', borderRadius: '6px', fontSize: '13px',
          }}>
            ✓ Marcar resuelta
          </button>
        )}
      </div>
    </div>
  );
}

export default function Alerts() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [simFloor, setSimFloor] = useState(1);
  const [simType, setSimType] = useState('SMOKE');
  const [simMsg, setSimMsg] = useState('');

  const fetchAlerts = async () => {
    try {
      const res = await api.get('/alerts');
      setAlerts(res.data.alerts);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAlerts(); }, []);

  const handleResolve = async (id) => {
    try {
      await api.put(`/alerts/${id}/resolve`);
      fetchAlerts();
    } catch (err) { alert('Error al resolver alerta'); }
  };

  const handleSimulate = async () => {
    try {
      const res = await api.post('/alerts/simulate', { type: simType, floor: simFloor, level: 'CRITICAL' });
      setSimMsg(`✓ Alerta creada. Latencia: ${res.data.latencyMs}ms — ${res.data.compliantRNF001 ? '✅ Cumple RNF-001 (≤5s)' : '❌ Supera 5s'}`);
      fetchAlerts();
    } catch (err) { setSimMsg('Error al simular'); }
  };

  const filtered = filter === 'all' ? alerts
    : filter === 'active' ? alerts.filter(a => !a.isResolved)
    : alerts.filter(a => a.isResolved);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 700 }}>🚨 Alertas del Edificio</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
          RF-001 (humo ≤5s) · RF-002 (sismo ≤5s) · RF-007 (push por piso)
        </p>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {[['all', 'Todas'], ['active', 'Activas'], ['resolved', 'Resueltas']].map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)} style={{
            padding: '8px 16px', borderRadius: '6px', fontSize: '13px', border: '1px solid var(--border)',
            background: filter === val ? 'rgba(0,188,212,0.15)' : 'transparent',
            color: filter === val ? 'var(--accent)' : 'var(--text-muted)',
          }}>
            {label} ({val === 'all' ? alerts.length : val === 'active' ? alerts.filter(a => !a.isResolved).length : alerts.filter(a => a.isResolved).length})
          </button>
        ))}
      </div>

      {/* Simulador (para demo al cliente) */}
      <div style={{
        background: 'var(--bg-secondary)', border: '1px solid var(--border)',
        borderRadius: '10px', padding: '18px', marginBottom: '24px',
      }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: 'var(--accent)' }}>
          🧪 Simulador de Alertas (demo)
        </h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Tipo</label>
            <select value={simType} onChange={e => setSimType(e.target.value)} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              color: 'var(--text-primary)', padding: '8px 12px', borderRadius: '6px', fontSize: '13px',
            }}>
              <option value="SMOKE">🔥 Humo (RF-001)</option>
              <option value="SEISMIC">📳 Sísmica (RF-002)</option>
              <option value="WATER_LEAK">💧 Fuga agua</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Piso</label>
            <select value={simFloor} onChange={e => setSimFloor(parseInt(e.target.value))} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              color: 'var(--text-primary)', padding: '8px 12px', borderRadius: '6px', fontSize: '13px',
            }}>
              {[1,2,3,4,5].map(f => <option key={f} value={f}>Piso {f}</option>)}
            </select>
          </div>
          <button onClick={handleSimulate} style={{
            background: 'var(--red)', border: 'none', color: '#fff',
            padding: '8px 20px', borderRadius: '6px', fontSize: '13px', fontWeight: 600,
          }}>
            Disparar Alerta
          </button>
        </div>
        {simMsg && <p style={{ marginTop: '10px', fontSize: '13px', color: 'var(--green)' }}>{simMsg}</p>}
      </div>

      {/* Lista */}
      {loading ? (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>Cargando...</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>No hay alertas.</p>
      ) : (
        filtered.map(a => (
          <AlertCard key={a.alertId} alert={a} onResolve={handleResolve} isAdmin={user.role === 'Admin'} />
        ))
      )}
    </div>
  );
}

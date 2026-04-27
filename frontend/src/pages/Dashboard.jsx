import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const statusColor = { normal: 'var(--green)', alert: 'var(--red)', warning: 'var(--yellow)', unknown: 'var(--gray)' };
const statusLabel = { normal: 'Normal', alert: 'ALERTA', warning: 'Atención', unknown: 'Sin datos' };

function StatusDot({ status, size = 12 }) {
  return (
    <span style={{
      display: 'inline-block', width: size, height: size, borderRadius: '50%',
      background: statusColor[status] || 'var(--gray)',
      boxShadow: status === 'alert' ? `0 0 8px ${statusColor.alert}` : 'none',
    }} />
  );
}

function SensorRow({ icon, label, value, unit, status }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{icon} {label}</span>
      <span style={{ color: statusColor[status] || 'var(--text-primary)', fontSize: '13px', fontWeight: 600 }}>
        {value} {unit}
      </span>
    </div>
  );
}

function FloorCard({ floorData, isAdmin }) {
  const { floor, status, sensors, activeAlerts, apartments, gatewayMode, lastUpdate } = floorData;
  const isAlert = status === 'alert';

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: `1px solid ${isAlert ? 'rgba(244,67,54,0.5)' : 'var(--border)'}`,
      borderRadius: '12px', padding: '20px',
      boxShadow: isAlert ? '0 0 20px rgba(244,67,54,0.2)' : 'var(--shadow)',
      position: 'relative', overflow: 'hidden',
    }}>
      {isAlert && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: 'var(--red)',
        }} />
      )}

      {/* Header del piso */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Piso {floor}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
            {apartments.occupied}/{apartments.total} aptos ocupados
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <StatusDot status={status} size={10} />
            <span style={{ color: statusColor[status], fontSize: '12px', fontWeight: 600 }}>
              {statusLabel[status]}
            </span>
          </div>
          <span style={{
            fontSize: '10px', padding: '2px 8px', borderRadius: '10px',
            background: gatewayMode === 'CLOUD' ? 'rgba(0,188,212,0.15)' : 'rgba(255,152,0,0.15)',
            color: gatewayMode === 'CLOUD' ? 'var(--accent)' : 'var(--yellow)',
          }}>
            {gatewayMode}
          </span>
        </div>
      </div>

      {/* Sensores */}
      <SensorRow icon="🔥" label="Humo (Ecolite SE14)" value={sensors.smoke.value.toFixed(2)} unit="PPM" status={sensors.smoke.status} />
      <SensorRow icon="📳" label="Sísmica (ADXL345)" value={sensors.seismic.value.toFixed(3)} unit="g" status={sensors.seismic.status} />
      <SensorRow icon="💡" label="Iluminación (PIR)" value={sensors.light.value} unit="" status="normal" />

      {/* Alertas activas */}
      {activeAlerts > 0 && (
        <div style={{
          marginTop: '12px', padding: '8px 12px',
          background: 'rgba(244,67,54,0.1)', border: '1px solid rgba(244,67,54,0.3)',
          borderRadius: '6px', color: 'var(--red)', fontSize: '12px', fontWeight: 600,
        }}>
          ⚠️ {activeAlerts} alerta{activeAlerts > 1 ? 's' : ''} activa{activeAlerts > 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const [building, setBuilding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [gatewayMode, setGatewayMode] = useState('CLOUD');

  const fetchData = async () => {
    try {
      const [bRes, gRes] = await Promise.all([
        api.get('/dashboard'),
        api.get('/dashboard/gateway-mode'),
      ]);
      setBuilding(bRes.data);
      setGatewayMode(gRes.data.gatewayMode);
      setLastRefresh(new Date());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // RF-004: actualización ≤10s
    const interval = setInterval(fetchData, 8000);
    return () => clearInterval(interval);
  }, []);

  const floors = user.role === 'Admin'
    ? building?.floors || []
    : (building?.floors || []).filter(f => f.floor === 1);

  const totalAlerts = building?.floors?.reduce((s, f) => s + f.activeAlerts, 0) || 0;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text-primary)' }}>
          🏢 Dashboard — SmartHome 5P
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
          {user.role === 'Admin' ? 'Vista completa del edificio (5 pisos)' : `Vista Residente — Piso 1`}
        </p>
      </div>

      {/* Stats bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { icon: '🚨', label: 'Alertas Activas', value: totalAlerts, color: totalAlerts > 0 ? 'var(--red)' : 'var(--green)' },
          { icon: '📡', label: 'Gateway Mode', value: gatewayMode, color: gatewayMode === 'CLOUD' ? 'var(--accent)' : 'var(--yellow)' },
          { icon: '🏗️', label: 'Pisos Monitoreados', value: 5, color: 'var(--accent)' },
          { icon: '🕐', label: 'Última Actualización', value: lastRefresh ? lastRefresh.toLocaleTimeString('es-CO') : '—', color: 'var(--text-muted)' },
        ].map(stat => (
          <div key={stat.label} style={{
            background: 'var(--bg-secondary)', border: '1px solid var(--border)',
            borderRadius: '10px', padding: '16px',
          }}>
            <div style={{ fontSize: '24px', marginBottom: '6px' }}>{stat.icon}</div>
            <div style={{ color: stat.color, fontSize: '20px', fontWeight: 700 }}>{stat.value}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '2px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Grid de pisos */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
          Cargando estado del edificio...
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {floors.map(f => <FloorCard key={f.floor} floorData={f} isAdmin={user.role === 'Admin'} />)}
        </div>
      )}

      {/* Indicador Edge Resiliente (RF-003) */}
      <div style={{
        marginTop: '24px', padding: '14px 20px',
        background: gatewayMode === 'EDGE' ? 'rgba(255,152,0,0.1)' : 'rgba(0,188,212,0.05)',
        border: `1px solid ${gatewayMode === 'EDGE' ? 'rgba(255,152,0,0.3)' : 'var(--border)'}`,
        borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <span style={{ fontSize: '20px' }}>{gatewayMode === 'EDGE' ? '⚡' : '☁️'}</span>
        <div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: gatewayMode === 'EDGE' ? 'var(--yellow)' : 'var(--accent)' }}>
            Modo {gatewayMode} — Dragino LG308 (RHW-007)
          </span>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '2px' }}>
            {gatewayMode === 'EDGE'
              ? 'RF-003: Operando en modo edge local ≥30 min sin conectividad cloud'
              : 'Sistema conectado a nube. Latencia alertas ≤5s (RF-001/RF-002)'}
          </p>
        </div>
      </div>
    </div>
  );
}

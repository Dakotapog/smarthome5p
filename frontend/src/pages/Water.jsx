import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import api from '../services/api';

export default function Water() {
  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/water').then(res => setFloors(res.data.floors)).finally(() => setLoading(false));
  }, []);

  const chartData = floors.map(f => ({
    name: `Piso ${f.floor}`,
    'L/min': parseFloat(f.flowLpm),
    'Acum. (L)': parseFloat(f.cumulativeLiters || 0),
  }));

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 700 }}>💧 Consumo Hídrico</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
          RF-011 · Caudalímetro RHW-006 · Ley 373/1997
        </p>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Cargando...</p>
      ) : (
        <>
          {/* Tarjetas por piso */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {floors.map(f => (
              <div key={f.floor} style={{
                background: 'var(--bg-card)',
                border: `1px solid ${f.anomalyDetected ? 'rgba(244,67,54,0.5)' : 'var(--border)'}`,
                borderRadius: '10px', padding: '18px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Piso {f.floor}</h3>
                  {f.anomalyDetected && (
                    <span style={{
                      background: 'rgba(244,67,54,0.15)', color: 'var(--red)',
                      padding: '2px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700,
                    }}>
                      ⚠️ FUGA
                    </span>
                  )}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Caudal actual</span>
                  <div style={{ color: f.anomalyDetected ? 'var(--red)' : 'var(--accent)', fontSize: '24px', fontWeight: 700 }}>
                    {parseFloat(f.flowLpm).toFixed(1)} <span style={{ fontSize: '14px' }}>L/min</span>
                  </div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Acumulado</span>
                  <div style={{ color: 'var(--text-primary)', fontSize: '16px', fontWeight: 600 }}>
                    {parseFloat(f.cumulativeLiters || 0).toLocaleString('es-CO')} L
                  </div>
                </div>
                <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--text-muted)' }}>
                  Sensor: {f.sensorId}
                </div>
              </div>
            ))}
          </div>

          {/* Gráfica */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>
              Caudal por Piso (L/min)
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }}
                  labelStyle={{ color: 'var(--accent)' }}
                />
                <Bar dataKey="L/min" fill="var(--accent)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Resumen */}
          <div style={{
            marginTop: '20px', padding: '16px 20px',
            background: 'rgba(0,188,212,0.05)', border: '1px solid var(--border)',
            borderRadius: '10px', display: 'flex', gap: '32px', flexWrap: 'wrap',
          }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Total edificio</div>
              <div style={{ color: 'var(--accent)', fontSize: '22px', fontWeight: 700 }}>
                {floors.reduce((s, f) => s + parseFloat(f.flowLpm), 0).toFixed(1)} L/min
              </div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Anomalías detectadas</div>
              <div style={{ color: floors.some(f => f.anomalyDetected) ? 'var(--red)' : 'var(--green)', fontSize: '22px', fontWeight: 700 }}>
                {floors.filter(f => f.anomalyDetected).length} piso(s)
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

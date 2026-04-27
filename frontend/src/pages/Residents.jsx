import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function Residents() {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ fullName: '', phone: '', documentId: '', email: '', floor: 1 });
  const [msg, setMsg] = useState('');

  const fetchResidents = async () => {
    try {
      const res = await api.get('/residents');
      setResidents(res.data.residents);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchResidents(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/residents', form);
      setMsg('✅ Residente creado correctamente');
      setShowForm(false);
      setForm({ fullName: '', phone: '', documentId: '', email: '', floor: 1 });
      fetchResidents();
    } catch (err) {
      setMsg(`❌ ${err.response?.data?.error || 'Error al crear residente'}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este residente?')) return;
    try {
      await api.delete(`/residents/${id}`);
      setMsg('✅ Residente eliminado');
      fetchResidents();
    } catch { setMsg('❌ Error al eliminar'); }
  };

  const inputStyle = {
    width: '100%', padding: '10px 12px', background: 'var(--bg-card)',
    border: '1px solid var(--border)', borderRadius: '6px',
    color: 'var(--text-primary)', fontSize: '13px',
  };
  const labelStyle = { fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700 }}>👥 Gestión de Residentes</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            RF-008 · Solo Admin · Ley 1581/2012
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{
          background: 'var(--accent)', border: 'none', color: '#fff',
          padding: '10px 20px', borderRadius: '8px', fontWeight: 600, fontSize: '14px',
        }}>
          + Nuevo Residente
        </button>
      </div>

      {msg && (
        <div style={{
          padding: '10px 16px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px',
          background: msg.includes('✅') ? 'rgba(76,175,80,0.1)' : 'rgba(244,67,54,0.1)',
          color: msg.includes('✅') ? 'var(--green)' : 'var(--red)',
          border: `1px solid ${msg.includes('✅') ? 'rgba(76,175,80,0.3)' : 'rgba(244,67,54,0.3)'}`,
        }}>
          {msg}
        </div>
      )}

      {/* Formulario */}
      {showForm && (
        <form onSubmit={handleCreate} style={{
          background: 'var(--bg-secondary)', border: '1px solid var(--border)',
          borderRadius: '12px', padding: '24px', marginBottom: '24px',
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Nuevo Residente</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { key: 'fullName', label: 'Nombre completo', type: 'text', required: true },
              { key: 'documentId', label: 'Número de documento', type: 'text', required: true },
              { key: 'email', label: 'Correo electrónico', type: 'email', required: true },
              { key: 'phone', label: 'Teléfono', type: 'text', required: false },
            ].map(f => (
              <div key={f.key}>
                <label style={labelStyle}>{f.label} {f.required && '*'}</label>
                <input
                  type={f.type} required={f.required}
                  value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  style={inputStyle}
                />
              </div>
            ))}
            <div>
              <label style={labelStyle}>Piso asignado</label>
              <select value={form.floor} onChange={e => setForm({ ...form, floor: parseInt(e.target.value) })} style={inputStyle}>
                {[1,2,3,4,5].map(f => <option key={f} value={f}>Piso {f}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button type="submit" style={{
              background: 'var(--accent)', border: 'none', color: '#fff',
              padding: '10px 24px', borderRadius: '6px', fontWeight: 600, fontSize: '14px',
            }}>Guardar</button>
            <button type="button" onClick={() => setShowForm(false)} style={{
              background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)',
              padding: '10px 24px', borderRadius: '6px', fontSize: '14px',
            }}>Cancelar</button>
          </div>
        </form>
      )}

      {/* Tabla */}
      {loading ? (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>Cargando...</p>
      ) : (
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Nombre', 'Documento', 'Email', 'Teléfono', 'Piso', 'Apto', 'Acciones'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--text-muted)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {residents.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No hay residentes registrados</td></tr>
              ) : residents.map(r => (
                <tr key={r.residentId} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>{r.fullName}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-muted)' }}>{r.documentId}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-muted)' }}>{r.email}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-muted)' }}>{r.phone || '—'}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px' }}>{r.floor ? `Piso ${r.floor}` : '—'}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px' }}>{r.apartmentNumber || '—'}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <button onClick={() => handleDelete(r.residentId)} style={{
                      background: 'rgba(244,67,54,0.1)', border: '1px solid rgba(244,67,54,0.3)',
                      color: 'var(--red)', padding: '5px 12px', borderRadius: '4px', fontSize: '12px',
                    }}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

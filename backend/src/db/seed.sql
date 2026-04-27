-- SmartHome 5P — Seed Data (datos de prueba para demo)
-- Contraseñas: Admin2026! y Res2026! (hasheadas con bcrypt)

-- USUARIOS DEMO
INSERT INTO users ("userId", username, "passwordHash", role, email, "isActive", "createdAt")
VALUES
  ('usr-admin-001', 'admin@smarthome5p.co',
   '$2a$10$72H9sJBMTq4PKvrNNPSTrO3UlzIzHNoX14iWQabF5QqshdfyLYK1K',
   'Admin', 'admin@smarthome5p.co', true, NOW()),
  ('usr-res-001', 'residente@smarthome5p.co',
   '$2a$10$72H9sJBMTq4PKvrNNPSTrO3UlzIzHNoX14iWQabF5QqshdfyLYK1K',
   'Resident', 'residente@smarthome5p.co', true, NOW())
ON CONFLICT DO NOTHING;

-- RESIDENTE DEMO
INSERT INTO residents ("residentId", "userId", "fullName", phone, "documentId", "registeredAt")
VALUES
  ('res-001', 'usr-res-001', 'Carlos Alberto Pérez Gómez',
   '3001234567', '1098765432', NOW())
ON CONFLICT DO NOTHING;

-- APARTAMENTOS (5 pisos x 2 aptos por piso = 10 aptos)
INSERT INTO apartments ("apartmentId", floor, number, "residentId", area_m2, "isOccupied")
VALUES
  ('apt-101', 1, '101', 'res-001', 65.50, true),
  ('apt-102', 1, '102', NULL, 72.00, false),
  ('apt-201', 2, '201', NULL, 65.50, false),
  ('apt-202', 2, '202', NULL, 72.00, false),
  ('apt-301', 3, '301', NULL, 65.50, false),
  ('apt-302', 3, '302', NULL, 72.00, false),
  ('apt-401', 4, '401', NULL, 65.50, false),
  ('apt-402', 4, '402', NULL, 72.00, false),
  ('apt-501', 5, '501', NULL, 65.50, false),
  ('apt-502', 5, '502', NULL, 72.00, false)
ON CONFLICT DO NOTHING;

-- LECTURAS DE SENSORES — una por piso (SmokeSensor — Ecolite SE14)
INSERT INTO sensor_readings ("readingId", "sensorId", "sensorType", floor, value, unit, "timestamp", "gatewayMode")
VALUES
  ('sr-smoke-1', 'RHW-001-P1', 'SMOKE', 1, 0.12, 'PPM', NOW() - INTERVAL '5 minutes', 'CLOUD'),
  ('sr-smoke-2', 'RHW-001-P2', 'SMOKE', 2, 0.08, 'PPM', NOW() - INTERVAL '4 minutes', 'CLOUD'),
  ('sr-smoke-3', 'RHW-001-P3', 'SMOKE', 3, 0.15, 'PPM', NOW() - INTERVAL '3 minutes', 'CLOUD'),
  ('sr-smoke-4', 'RHW-001-P4', 'SMOKE', 4, 0.09, 'PPM', NOW() - INTERVAL '2 minutes', 'CLOUD'),
  ('sr-smoke-5', 'RHW-001-P5', 'SMOKE', 5, 0.11, 'PPM', NOW() - INTERVAL '1 minute', 'CLOUD'),
  -- Lecturas sísmicas — ADXL345
  ('sr-seis-1', 'RHW-002-P1', 'SEISMIC', 1, 0.02, 'g', NOW() - INTERVAL '10 minutes', 'CLOUD'),
  ('sr-seis-2', 'RHW-002-P2', 'SEISMIC', 2, 0.01, 'g', NOW() - INTERVAL '9 minutes', 'CLOUD'),
  ('sr-seis-3', 'RHW-002-P3', 'SEISMIC', 3, 0.03, 'g', NOW() - INTERVAL '8 minutes', 'CLOUD'),
  -- Lecturas PIR — Milesight WS202 (iluminación)
  ('sr-pir-1', 'RHW-004-P1', 'PIR', 1, 1.0, 'motion', NOW() - INTERVAL '2 minutes', 'CLOUD'),
  ('sr-pir-2', 'RHW-004-P2', 'PIR', 2, 0.0, 'motion', NOW() - INTERVAL '15 minutes', 'CLOUD'),
  ('sr-pir-3', 'RHW-004-P3', 'PIR', 3, 1.0, 'motion', NOW() - INTERVAL '1 minute', 'CLOUD'),
  ('sr-pir-4', 'RHW-004-P4', 'PIR', 4, 0.0, 'motion', NOW() - INTERVAL '20 minutes', 'CLOUD'),
  ('sr-pir-5', 'RHW-004-P5', 'PIR', 5, 1.0, 'motion', NOW() - INTERVAL '3 minutes', 'CLOUD')
ON CONFLICT DO NOTHING;

-- ALERTAS HISTÓRICAS
-- 1 alerta de humo resuelta
INSERT INTO alerts ("alertId", "readingId", type, level, floor, "triggeredAt", "resolvedAt", "isResolved", "resolvedBy")
VALUES
  ('alert-001', 'sr-smoke-3', 'SMOKE', 'CRITICAL', 3,
   NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days' + INTERVAL '3 minutes', true, 'usr-admin-001'),
  -- 1 alerta sísmica resuelta
  ('alert-002', 'sr-seis-1', 'SEISMIC', 'WARNING', 1,
   NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days' + INTERVAL '5 minutes', true, 'usr-admin-001'),
  -- 1 alerta activa de humo (sin resolver)
  ('alert-003', 'sr-smoke-1', 'SMOKE', 'CRITICAL', 1,
   NOW() - INTERVAL '10 minutes', NULL, false, NULL)
ON CONFLICT DO NOTHING;

-- CONSUMO HÍDRICO — 5 registros (uno por piso)
INSERT INTO water_consumption ("consumptionId", "sensorId", floor, "flowLpm", "cumulativeLiters", "measuredAt", "anomalyDetected")
VALUES
  ('wc-001', 'RHW-006-P1', 1, 12.5, 1850.0, NOW() - INTERVAL '1 hour', false),
  ('wc-002', 'RHW-006-P2', 2, 8.3,  1220.0, NOW() - INTERVAL '1 hour', false),
  ('wc-003', 'RHW-006-P3', 3, 15.7, 2100.0, NOW() - INTERVAL '1 hour', true),
  ('wc-004', 'RHW-006-P4', 4, 9.1,  1340.0, NOW() - INTERVAL '1 hour', false),
  ('wc-005', 'RHW-006-P5', 5, 6.4,   980.0, NOW() - INTERVAL '1 hour', false)
ON CONFLICT DO NOTHING;

-- REGISTRO DE ACCESO BIOMÉTRICO
INSERT INTO access_log ("logId", "userId", "apartmentId", "timestamp", method, result, floor, "deviceId")
VALUES
  ('log-001', 'usr-res-001', 'apt-101', NOW() - INTERVAL '3 hours', 'BIOMETRIC', true, 1, 'RHW-005-P1')
ON CONFLICT DO NOTHING;

-- NOTIFICACIONES
INSERT INTO notification_log ("notifId", "alertId", "userId", message, channel, "sentAt", delivered)
VALUES
  ('notif-001', 'alert-001', 'usr-res-001',
   'ALERTA CRÍTICA: Detección de humo en Piso 3. Evacúe inmediatamente.',
   'PUSH', NOW() - INTERVAL '2 days', true),
  ('notif-002', 'alert-003', 'usr-res-001',
   'ALERTA CRÍTICA: Detección de humo en Piso 1. Evacúe inmediatamente.',
   'PUSH', NOW() - INTERVAL '10 minutes', false)
ON CONFLICT DO NOTHING;

# Documento Acumulado — Entregas 1, 2 y 3
## SmartHome 5P — PGA-ACUM-001 v1.0

**Código:** PGA-ACUM-001 v1.0  
**Módulo:** Gerencia de Proyectos Informáticos — Politécnico Grancolombiano  
**Entregas:** Previas 1, 2 y Final (Semanas 3, 5 y 7)  
**Autor:** David Alberto Coronado Tabares  
**Tutora:** Isabel Andrea Mahecha Nieto  
**Grupo:** B04  
**Fecha:** Abril de 2026  

---

## Tabla de Contenido

1. [Introducción](#1-introducción)  
2. [Entrega 1 — Iniciación y Planificación (Semana 3)](#2-entrega-1--iniciación-y-planificación-semana-3)  
   2.1 Acta de Constitución del Proyecto  
   2.2 Enunciado del Alcance  
   2.3 EDT — Estructura de Desglose del Trabajo  
   2.4 Cronograma (8 Semanas)  
   2.5 Presupuesto y Flujo de Caja  
   2.6 Matriz de Trazabilidad de Requisitos (MTR-001)  
3. [Entrega 2 — Planificación Técnica (Semana 5)](#3-entrega-2--planificación-técnica-semana-5)  
   3.1 Plan de Gestión de Calidad  
   3.2 Diagramas de Casos de Uso  
   3.3 Diagramas de Clases  
   3.4 Diagramas de Secuencia  
   3.5 Modelo Entidad-Relación  
   3.6 Diccionario de Datos  
   3.7 Plan de Gestión de RRHH  
   3.8 Perfiles de Roles  
4. [Entrega 3 — Gestión de Riesgos y Software (Semana 7)](#4-entrega-3--gestión-de-riesgos-y-software-semana-7)  
   4.1 Plan de Gestión de Riesgos  
   4.2 Top 10 Riesgos  
   4.3 Tabla de Cifras y Medición  
   4.4 Listado Total de Riesgos  
   4.5 Software Funcional Desplegado  
5. [Trazabilidad Transversal de las Tres Entregas](#5-trazabilidad-transversal-de-las-tres-entregas)  
6. [Referencias Consolidadas APA 7.ª ed.](#6-referencias-consolidadas-apa-7ª-ed)  

---

## 1. Introducción

### 1.1 Descripción del Proyecto

SmartHome 5P es un sistema de gestión inteligente para un edificio residencial de 5 pisos en Bogotá D.C. El sistema integra sensores IoT (Internet of Things) con una plataforma web para monitorear en tiempo real la seguridad, el consumo de recursos y el acceso de residentes.

El proyecto sigue la metodología PMI/PMBOK® 5.ª edición y se desarrolló en un plazo de 8 semanas con un presupuesto de $95.000.000 COP.

### 1.2 Objetivo General

Desarrollar e implementar un sistema de gestión de edificio inteligente que integre sensores IoT para la detección de humo, sismos y movimiento, con un panel web de monitoreo en tiempo real, gestión de residentes y control de consumo hídrico, desplegado en producción y accesible desde internet.

### 1.3 Objetivos Específicos

1. Identificar y documentar los requisitos funcionales, no funcionales y de hardware del sistema (Entrega 1).
2. Diseñar la arquitectura técnica mediante diagramas UML y el modelo de datos (Entrega 2).
3. Implementar el software funcional con frontend React y backend Node.js, desplegado en Render.com (Entrega 3).
4. Gestionar los riesgos del proyecto mediante la metodología PMBOK® Cap. 11, identificando 22 riesgos y calculando una reserva de contingencia de $8.502.500 COP (Entrega 3).

### 1.4 Alcance del Documento

Este documento acumula y consolida los productos de las tres entregas del curso. Cada sección indica el número de entrega de origen y el archivo fuente. No se repite información innecesariamente; se resumen los puntos clave y se referencian los documentos detallados.

---

## 2. Entrega 1 — Iniciación y Planificación (Semana 3)

### 2.1 Acta de Constitución del Proyecto

| Campo | Valor |
|---|---|
| Nombre del proyecto | SmartHome 5P |
| Patrocinador | Propietarios del edificio (cliente) |
| Gerente de Proyecto | David Alberto Coronado Tabares |
| Presupuesto autorizado | $95.000.000 COP |
| Duración | 8 semanas (abril – mayo 2026) |
| Ubicación | Bogotá D.C., Colombia |
| Objetivo principal | Sistema IoT de gestión inteligente de edificio de 5 pisos |
| Criterio de éxito | Software funcional desplegado + detección de alertas ≤5s + cumplimiento normativo |

**Justificación del proyecto:**
El edificio de 5 pisos carece de un sistema centralizado de monitoreo de seguridad. La normativa colombiana (NSR-10, NTC 1669) exige umbrales de detección de humo y sismos que no pueden cumplirse con sistemas manuales. SmartHome 5P cubre esta brecha con tecnología IoT asequible y un panel web accesible para administradores y residentes.

### 2.2 Enunciado del Alcance

**Dentro del alcance:**
- Sistema web con dashboard en tiempo real (RF-001 a RF-012).
- Integración con sensores: Ecolite SE14 (humo), ADXL345 (sismo), PIR Milesight WS202 (movimiento), caudalímetro (agua).
- Gateway IoT: Dragino LG308 con modos CLOUD / EDGE / OFFLINE.
- Módulos: autenticación JWT, gestión de residentes, alertas críticas, consumo hídrico, bitácora de accesos.
- Despliegue en producción (Render.com) con base de datos PostgreSQL.

**Fuera del alcance:**
- Instalación física de sensores en el edificio real.
- Integración con sistemas CCTV reales (estructura preparada, no implementada).
- Aplicación móvil nativa.
- Integración con sistemas de domótica de terceros.

### 2.3 EDT — Estructura de Desglose del Trabajo

```
1.0 SmartHome 5P
├── 1.1 Gestión del Proyecto
│   ├── 1.1.1 Acta de constitución
│   ├── 1.1.2 Plan del proyecto
│   └── 1.1.3 Reuniones de seguimiento
├── 2.0 Infraestructura IoT
│   ├── 2.1 Configuración gateway Dragino LG308
│   ├── 2.2 Integración sensores (humo, sismo, PIR, agua)
│   └── 2.3 Pruebas de conectividad LoRaWAN
├── 3.0 Backend (API REST)
│   ├── 3.1 Base de datos PostgreSQL (9 entidades)
│   ├── 3.2 Autenticación JWT
│   ├── 3.3 Módulo alertas
│   ├── 3.4 Módulo residentes
│   └── 3.5 Módulo consumo hídrico
├── 4.0 Frontend (Dashboard Web)
│   ├── 4.1 Login y navegación
│   ├── 4.2 Dashboard pisos
│   ├── 4.3 Módulo alertas
│   ├── 4.4 Módulo residentes
│   └── 4.5 Módulo consumo hídrico
├── 5.0 Calidad y Pruebas
│   ├── 5.1 Pruebas funcionales (PT-001 a PT-006)
│   ├── 5.2 Pruebas de rendimiento (latencia ≤5s)
│   └── 5.3 Verificación normativa
└── 6.0 Despliegue y Cierre
    ├── 6.1 Despliegue Render.com
    ├── 6.2 Documentación final
    └── 6.3 Entrega y cierre
```

### 2.4 Cronograma (8 Semanas)

| Semana | Actividades principales | Entregable |
|---|---|---|
| 1 | Constitución del proyecto, levantamiento de requisitos, MTR-001 | Acta + MTR |
| 2 | EDT, cronograma, presupuesto, análisis de stakeholders | Plan del proyecto |
| **3** | **Entrega Previa 1** | **Documentos Semana 3** |
| 4 | Diseño arquitectura, diagramas UML, diseño BD | Diagramas + MER |
| **5** | **Entrega Previa 2** | **Documentos Semana 5** |
| 6 | Desarrollo backend (API + BD), autenticación JWT | Backend funcional |
| 7 | Desarrollo frontend (React), despliegue Render.com | Software desplegado |
| **7** | **Entrega Final** | **Software + Documentos Semana 7** |
| 8 | Gestión de riesgos, manual de usuario, cierre | Entrega final completa |

### 2.5 Presupuesto

| Rubro | Costo (COP) |
|---|---|
| Gerente de Proyecto (2 meses) | $17.000.000 |
| Líder IoT / Arquitecto (2 meses) | $13.600.000 |
| Desarrollador Backend Senior (1,5 meses) | $8.250.000 |
| Desarrollador Frontend (1,5 meses) | $6.300.000 |
| Técnico IoT (1 mes) | $3.200.000 |
| Líder de Calidad QA (1 mes) | $4.800.000 |
| Líder de Alcance / Requisitos (1 mes) | $5.000.000 |
| Hardware IoT (sensores + gateway) | $18.350.000 |
| Infraestructura cloud y licencias | $2.500.000 |
| Imprevistos | $7.000.000 |
| **Reserva de contingencia** | **$8.502.500** |
| **Subtotal neto** | **$86.497.500** |
| **Total autorizado** | **$95.000.000** |

### 2.6 Matriz de Trazabilidad de Requisitos (MTR-001) — Extracto

| ID | Requisito | Tipo | Prioridad | Hardware | WBS | Estado |
|---|---|---|---|---|---|---|
| RF-001 | Detección humo → push ≤5s | Funcional | Must Have | RHW-001 Ecolite SE14 | 3.3 | ✅ |
| RF-002 | Sismo ≥0.05g → alerta ≤5s | Funcional | Must Have | RHW-002 ADXL345 | 3.3 | ✅ |
| RF-003 | Modo edge ≥30min sin nube | Funcional | Must Have | RHW-007 Dragino LG308 | 2.1 | ✅ |
| RF-004 | Dashboard ≤10s actualización | Funcional | Must Have | — | 4.2 | ✅ |
| RF-005 | Acceso biométrico + log ≤2s | Funcional | Should Have | RHW-005 ZK9500 | 3.4 | ✅ |
| RF-008 | CRUD residentes | Funcional | Should Have | — | 3.4 | ✅ |
| RF-010 | Iluminación PIR automática | Funcional | Should Have | RHW-004 Milesight WS202 | 2.2 | ✅ |
| RF-011 | Monitoreo consumo hídrico | Funcional | Should Have | RHW-006 Caudalímetro | 3.5 | ✅ |
| RF-012 | JWT roles Admin/Residente | Funcional | Must Have | — | 3.2 | ✅ |
| RNF-001 | Latencia ≤10s operaciones normales | No funcional | Must Have | — | 5.2 | ✅ |
| RNF-002 | Disponibilidad nocturna ≥99 % | No funcional | Must Have | — | 5.2 | ✅ |

---

## 3. Entrega 2 — Planificación Técnica (Semana 5)

### 3.1 Plan de Gestión de Calidad — Objetivos de Calidad

| Código | Objetivo | Métrica | Umbral | Estado |
|---|---|---|---|---|
| OC-01 | Latencia alerta crítica | ms desde sensor hasta push | ≤ 5.000 ms | ✅ Verificado en simulador |
| OC-02 | Disponibilidad nocturna | uptime 22:00–06:00 | ≥ 99 % | Render uptime SLA |
| OC-03 | Resiliencia edge | minutos sin nube | ≥ 30 min | EDGE mode implementado |
| OC-04 | Cobertura de pruebas | % RF cubiertos por PT | ≥ 80 % | PT-001 a PT-006 |
| OC-05 | Seguridad autenticación | intentos hasta bloqueo | ≤ 5 intentos | JWT implementado |
| OC-06 | Actualización dashboard | segundos entre refresh | ≤ 10 s | Polling 8s implementado |
| OC-07 | Cobertura de pruebas funcionales | casos de prueba ejecutados | ≥ 6 PT | 6 PT definidos |
| OC-08 | Cumplimiento normativo | normativas verificadas | 100 % | NSR-10, NTC 1669, Ley 1581 |

### 3.2 Diagramas de Casos de Uso

El sistema define 9 casos de uso (UC-01 a UC-09) con 4 actores:

| Actor | Descripción |
|---|---|
| Administrador | Acceso completo a todos los módulos |
| Residente | Acceso a su piso — alertas y consumo |
| Sistema IoT Gateway | Actor externo — envía lecturas de sensores |
| Sistema Notificaciones | Actor externo — recibe y envía notificaciones push |

Casos de uso principales:

| Código | Caso de uso | Actor principal | RF asociados |
|---|---|---|---|
| UC-01 | Gestionar Alerta Crítica | Administrador | RF-001, RF-002, RF-007 |
| UC-02 | Monitorear Dashboard | Administrador / Residente | RF-004 |
| UC-03 | Gestionar Acceso Biométrico | Administrador / Residente | RF-005 |
| UC-04 | Generar Reporte | Administrador | RF-006 |
| UC-05 | Gestionar Residentes | Administrador | RF-008 |
| UC-06 | Ver CCTV | Administrador | RF-009 |
| UC-07 | Control Iluminación PIR | Administrador | RF-010 |
| UC-08 | Monitorear Consumo Hídrico | Administrador / Residente | RF-011 |
| UC-09 | Autenticar Usuario | Administrador / Residente | RF-012 |

### 3.3 Diagramas de Clases

**Jerarquía de clases IoT (hardware):**

```
Sensor (abstracta)
├── SmokeSensor (RHW-001 — Ecolite SE14)
├── SeismicSensor (RHW-002 — ADXL345)
├── MotionSensor (RHW-004 — PIR Milesight WS202)
├── BiometricReader (RHW-005 — ZK9500)
└── WaterFlowSensor (RHW-006 — Caudalímetro)

IoTGateway (RHW-007 — Dragino LG308)
└── gatewayMode: ENUM {CLOUD, EDGE, OFFLINE}

CCTVCamera (RHW-003 — Hikvision DS-2CD)
```

**Clases de software:**

```
AuthController ──→ User (entity)
DashboardController ──→ SensorReading (entity)
AlertService ──→ Alert (entity)
                └──→ NotificationBroker ──→ NotificationLog (entity)
ResidentService ──→ Resident (entity)
AccessLog (entity) ←── BiometricReader
WaterMonitor ──→ WaterConsumption (entity)
CCTVService ──→ CCTVRecording (entity)
```

### 3.4 Diagramas de Secuencia — Flujos Críticos

**UC-01: Alerta de Humo (flujo normal):**
1. SmokeSensor detecta ppm > 400 → envía lectura al gateway (ADXL345, NSR-10)
2. Dragino LG308 (modo CLOUD) → reenvía a Backend API
3. AlertService valida umbral (NTC 1669) → crea Alert en BD
4. NotificationBroker → push a Admin y Residente del piso
5. Dashboard → muestra alerta en rojo (latencia total ≤ 5s)

**UC-09: Autenticación JWT:**
1. Usuario envía correo + contraseña al endpoint `/api/auth/login`
2. AuthController consulta BD → bcrypt.compare(password, hash)
3. Si válido: jwt.sign(payload, secret, {expiresIn: '8h'}) → retorna token
4. Cliente almacena token en localStorage
5. Middleware `authMiddleware` verifica token en cada petición protegida

### 3.5 Modelo Entidad-Relación — 9 Entidades

| Entidad | PK | Descripción | Relaciones |
|---|---|---|---|
| users | id UUID | Usuarios del sistema (Admin/Resident) | 1:N residents, 1:N access_log |
| residents | id UUID | Residentes del edificio | N:1 apartments, N:1 users |
| apartments | id UUID | 10 apartamentos (2 por piso) | 1:N residents, 1:N sensor_readings |
| sensor_readings | id UUID | Lecturas de sensores por piso | N:1 apartments |
| alerts | id UUID | Alertas generadas por umbrales | N:1 sensor_readings |
| access_log | id UUID | Bitácora de accesos biométricos | N:1 apartments |
| water_consumption | id UUID | Consumo hídrico por piso | N:1 apartments |
| cctv_recordings | id UUID | Grabaciones CCTV (estructura) | N:1 apartments |
| notification_log | id UUID | Notificaciones enviadas | N:1 alerts |

### 3.6 Diccionario de Datos — Tabla Principal: alerts

| Campo | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | VARCHAR(36) | PK, NOT NULL | UUID v4 |
| apartment_id | VARCHAR(36) | FK → apartments, NOT NULL | Apartamento origen |
| sensor_reading_id | VARCHAR(36) | FK → sensor_readings | Lectura que disparó la alerta |
| alert_type | ENUM | SMOKE, SEISMIC, WATER_LEAK | Tipo de alerta |
| severity | ENUM | HIGH, MEDIUM, LOW | Severidad |
| message | TEXT | NOT NULL | Descripción del evento |
| status | ENUM | ACTIVE, RESOLVED | Estado actual |
| latency_ms | INTEGER | | Latencia medida en ms |
| created_at | TIMESTAMP | DEFAULT NOW() | Timestamp de creación |
| resolved_at | TIMESTAMP | | Timestamp de resolución |

### 3.7 Plan de Gestión de RRHH

| Rol | Código | Costo mensual (COP) | Meses | Costo total (COP) |
|---|---|---|---|---|
| Gerente de Proyecto | RP-01 | $8.500.000 | 2 | $17.000.000 |
| Líder IoT / Arquitecto | RP-02 | $6.800.000 | 2 | $13.600.000 |
| Desarrollador Backend Senior | RP-03 | $5.500.000 | 1,5 | $8.250.000 |
| Desarrollador Frontend | RP-04 | $4.200.000 | 1,5 | $6.300.000 |
| Técnico IoT | RP-05 | $3.200.000 | 1 | $3.200.000 |
| Líder de Calidad QA | RP-06 | $4.800.000 | 1 | $4.800.000 |
| Líder de Alcance / Requisitos | RP-07 | $5.000.000 | 1 | $5.000.000 |
| **Total nómina** | | | | **$58.150.000** |

### 3.8 Perfiles de Roles — Síntesis

| Rol | Perfil técnico requerido | Responsabilidad en riesgos |
|---|---|---|
| RP-01 Gerente | PMP o equivalente, 5+ años gestión proyectos TI | Custodiar registro de riesgos, aprobar planes de respuesta |
| RP-02 Líder IoT | Ingeniero electrónico/sistemas, LoRaWAN, MQTT | Identificar riesgos técnicos de hardware y conectividad |
| RP-03 Backend | Node.js, PostgreSQL, JWT, REST APIs, OWASP | Identificar riesgos de software, seguridad y rendimiento |
| RP-04 Frontend | React 18, Vite, UX responsive | Identificar riesgos de usabilidad y compatibilidad |
| RP-05 Técnico IoT | Instalación sensores, cableado estructurado | Ejecución física, verificación hardware |
| RP-06 QA | Pruebas funcionales y de carga, OC-01 a OC-08 | Validar que riesgos de calidad se detecten antes de entrega |
| RP-07 Alcance | UML, MTR-001, gestión de alcance PMI | Identificar riesgos de cambio de alcance |

---

## 4. Entrega 3 — Gestión de Riesgos y Software (Semana 7)

### 4.1 Plan de Gestión de Riesgos — Resumen Ejecutivo

El plan (PGA-RIESG-001) establece el marco metodológico basado en PMBOK® Cap. 11 para gestionar los riesgos del proyecto.

**Escalas:**
- Probabilidad (P): 1 (Muy baja <10 %) a 5 (Muy alta >70 %)
- Impacto (I): 1 (Muy bajo) a 5 (Muy alto)
- Exposición: P × I; clasificación Rojo (15–25), Amarillo (8–14), Verde (1–7)

**Reserva de contingencia:** $8.502.500 COP = 8,95 % del presupuesto de $95.000.000 COP.

Documento completo: `producto1_plan_gestion_riesgos.md` (PGA-RIESG-001 v1.0).

### 4.2 Top 10 Riesgos — Síntesis

| Pos. | ID | Riesgo | Cat. | P | I | Exp. | Nivel | Estrategia |
|---|---|---|---|---|---|---|---|---|
| 1 | RIESG-001 | Falla gateway Dragino LG308 | Técnico | 3 | 5 | 15 | 🔴 | Mitigar |
| 2 | RIESG-002 | Sensor Ecolite SE14 descalibrado | Técnico | 3 | 5 | 15 | 🔴 | Mitigar |
| 3 | RIESG-003 | Sobrecosto hardware IoT — TRM | Externo | 4 | 3 | 12 | 🟡 | Transferir |
| 4 | RIESG-004 | Retraso entrega sensores — proveedor | Externo | 4 | 3 | 12 | 🟡 | Mitigar |
| 5 | RIESG-005 | Ataques OWASP Top 10 a la API REST | Técnico | 3 | 4 | 12 | 🟡 | Mitigar |
| 6 | RIESG-006 | Incompatibilidad LoRaWAN — Dragino | Técnico | 3 | 4 | 12 | 🟡 | Evitar |
| 7 | RIESG-007 | Gold Plating — cambio de alcance | Gestión | 4 | 3 | 12 | 🟡 | Evitar |
| 8 | RIESG-008 | Falla base de datos PostgreSQL | Técnico | 3 | 4 | 12 | 🟡 | Mitigar |
| 9 | RIESG-009 | Incumplimiento Ley 1581/2012 | Regulatorio | 2 | 5 | 10 | 🟡 | Evitar |
| 10 | RIESG-010 | Latencia ADXL345 supera 5s | Técnico | 2 | 5 | 10 | 🟡 | Mitigar |

Documento completo: `producto2_top_n_riesgos.md` (PGA-RIESG-002 v1.0).

### 4.3 Cifras Consolidadas de Riesgos

| Métrica | Valor |
|---|---|
| Total riesgos identificados | 22 |
| Riesgos Rojos (Críticos) | 2 (9,1 %) |
| Riesgos Amarillos (Moderados) | 16 (72,7 %) |
| Riesgos Verdes (Bajos) | 4 (18,2 %) |
| Exposición total acumulada Σ P×I | 215 |
| Exposición promedio | 9,77 |
| Categoría con más riesgos | Técnico (9 riesgos — 40,9 %) |
| Reserva de contingencia | $8.502.500 COP (8,95 %) |

Documento completo: `producto3_tabla_cifras_medicion.md` (PGA-RIESG-003 v1.0).

### 4.4 Listado Total de Riesgos — Categorías

| Categoría | Cantidad | Exposición acumulada | Riesgos |
|---|---|---|---|
| Técnico | 9 | 99 | RIESG-001, 002, 005, 006, 008, 010, 011, 012, 015 |
| Externo | 5 | 48 | RIESG-003, 004, 013, 016, 017 |
| Gestión | 4 | 39 | RIESG-007, 014, 018, 020 |
| Organizacional | 2 | 18 | RIESG-019, 021 |
| Regulatorio | 2 | 11 | RIESG-009, 022 |

Documento completo: `producto4_listado_total_riesgos.md` (PGA-RIESG-004 v1.0).

### 4.5 Software Funcional Desplegado

El software SmartHome 5P está **100 % operativo en producción** desde la Semana 7.

| Componente | URL | Estado |
|---|---|---|
| Frontend React | https://smarthome5p-frontend.onrender.com | ✅ Activo |
| Backend Node.js | https://smarthome5p-backend.onrender.com | ✅ Activo |
| Health Check | https://smarthome5p-backend.onrender.com/api/health | ✅ OK |
| Repositorio | https://github.com/Dakotapog/smarthome5p | ✅ Público |

**Módulos implementados y verificados:**

| Módulo | RF satisfechos | OC satisfechos |
|---|---|---|
| Autenticación JWT + roles | RF-012 | OC-05 |
| Dashboard tiempo real (8s) | RF-001, RF-002, RF-004 | OC-01, OC-06 |
| Gestión alertas + simulador | RF-005, RF-006 | OC-01, OC-04 |
| Consumo hídrico + gráfica | RF-011 | OC-08 |
| CRUD residentes | RF-008 | OC-04 |
| Bitácora acceso biométrico | RF-005 | OC-05, OC-08 |
| Modo gateway CLOUD/EDGE | RF-003 | OC-03 |

Credenciales demo:
- Admin: `admin@smarthome5p.co` / `password`
- Residente: `residente@smarthome5p.co` / `password`

Documento técnico completo: `producto5_evidencia_software.md` (PGA-SW-001 v1.0).
Manual de usuario completo: `producto6_manual_usuario.md` (PGA-MAN-001 v1.0).

---

## 5. Trazabilidad Transversal de las Tres Entregas

La siguiente tabla muestra la trazabilidad completa desde los requisitos hasta los riesgos y el software implementado:

| RF / RNF | Hardware (RHW) | Clase UML | Entidad BD | Riesgo asociado | Implementado |
|---|---|---|---|---|---|
| RF-001 (humo ≤5s) | RHW-001 Ecolite SE14 | SmokeSensor | sensor_readings | RIESG-002 (sensor descalibrado) | ✅ |
| RF-002 (sismo ≤5s) | RHW-002 ADXL345 | SeismicSensor | sensor_readings | RIESG-010 (latencia >5s) | ✅ |
| RF-003 (edge ≥30min) | RHW-007 Dragino LG308 | IoTGateway | — | RIESG-001 (falla gateway) | ✅ |
| RF-004 (dashboard ≤10s) | — | DashboardController | sensor_readings | RIESG-015 (BD lenta) | ✅ |
| RF-005 (biométrico ≤2s) | RHW-005 ZK9500 | BiometricReader | access_log | RIESG-009 (Ley 1581) | ✅ |
| RF-008 (CRUD residentes) | — | ResidentService | residents | RIESG-014 (rotación personal) | ✅ |
| RF-011 (consumo hídrico) | RHW-006 Caudalímetro | WaterFlowSensor | water_consumption | RIESG-017 (fuga no detectada) | ✅ |
| RF-012 (JWT roles) | — | AuthController | users | RIESG-005 (OWASP) | ✅ |

---

## 6. Referencias Consolidadas APA 7.ª ed.

Project Management Institute. (2013). *Guía de los fundamentos para la dirección de proyectos (Guía del PMBOK®)* (5.ª ed.). PMI.

International Organization for Standardization. (2011). *ISO/IEC 25010:2011 — Systems and software quality requirements and evaluation*. ISO.

Colombia. Congreso de la República. (2012). *Ley 1581 de 2012: Protección de datos personales*. Diario Oficial No. 48.587.

Colombia. Congreso de la República. (1997). *Ley 373 de 1997: Uso eficiente y ahorro del agua*. Diario Oficial No. 43.058.

Ministerio de Ambiente, Vivienda y Desarrollo Territorial. (2010). *NSR-10 — Reglamento colombiano de construcción sismo resistente*. Gobierno de Colombia.

Instituto Colombiano de Normas Técnicas y Certificación. (2004). *NTC 1669: Detectores automáticos de incendio*. Icontec.

Instituto Colombiano de Normas Técnicas y Certificación. (1998). *NTC 2050: Código eléctrico colombiano*. Icontec.

Superintendencia de Industria y Comercio. (2018). *Circular Externa 002 de 2018: Tratamiento de datos biométricos*. SIC.

OpenJS Foundation. (2023). *Node.js 18 LTS documentation*. https://nodejs.org/en/docs

Meta Platforms. (2023). *React — The library for web and native user interfaces* (v18.2). https://react.dev

Vite. (2023). *Vite — Next generation frontend tooling* (v5). https://vitejs.dev

Render Inc. (2024). *Render documentation: Web Services, Static Sites and PostgreSQL free tier*. https://render.com/docs

*Nota. Elaboración propia.*

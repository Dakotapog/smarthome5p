# Evidencia de Software Funcional Desplegado
## SmartHome 5P — PGA-SW-001 v1.0

**Código:** PGA-SW-001 v1.0  
**Módulo:** Gerencia de Proyectos Informáticos — Politécnico Grancolombiano  
**Entrega:** Final — Semana 7 (Escenario 7)  
**Autor:** David Alberto Coronado Tabares  
**Tutora:** Isabel Andrea Mahecha Nieto  
**Grupo:** B04  
**Fecha:** Abril de 2026  

---

## 1. Información del Despliegue

| Componente | URL pública |
|---|---|
| **Frontend (React)** | https://smarthome5p-frontend.onrender.com |
| **Backend (Node.js + Express)** | https://smarthome5p-backend.onrender.com |
| **Health check API** | https://smarthome5p-backend.onrender.com/api/health |
| **Repositorio GitHub** | https://github.com/Dakotapog/smarthome5p |

> **El sistema está 100 % operativo en producción.** Puede ser accedido desde cualquier navegador moderno sin instalación de software adicional. El código fuente completo es público en GitHub.

---

## 2. Credenciales de Demostración

| Perfil | Correo | Contraseña |
|---|---|---|
| Administrador | admin@smarthome5p.co | password |
| Residente | residente@smarthome5p.co | password |

---

## 3. Stack Tecnológico

### 3.1 Frontend

| Tecnología | Versión | Rol |
|---|---|---|
| React | 18.2.0 | Biblioteca de interfaz de usuario |
| Vite | 5.x | Bundler y servidor de desarrollo |
| React Router DOM | 6.x | Enrutamiento SPA con rutas protegidas |
| Axios | 1.x | Cliente HTTP con interceptor JWT |
| Recharts | 2.x | Gráficas de consumo hídrico (BarChart) |
| CSS Variables | — | Design system: --bg-primary #1a1a2e, --accent #00bcd4 |

### 3.2 Backend

| Tecnología | Versión | Rol |
|---|---|---|
| Node.js | 18 LTS | Entorno de ejecución |
| Express | 4.x | Framework REST API |
| jsonwebtoken | 9.x | Autenticación JWT (expiración 8h) |
| bcryptjs | 2.x | Hash de contraseñas (salt rounds: 10) |
| pg (node-postgres) | 8.x | Driver PostgreSQL con pool de conexiones |
| dotenv | 16.x | Variables de entorno |
| cors | 2.x | Control de origen cruzado |
| uuid | 9.x | Generación de IDs tipo UUID v4 |

### 3.3 Base de Datos

| Aspecto | Detalle |
|---|---|
| Motor | PostgreSQL 15 |
| Proveedor | Render.com (Free Tier — 1 GB, 90 días) |
| Región | Oregon (us-west-2) |
| SSL | Activado (`rejectUnauthorized: false`) |
| Conexión | `DATABASE_URL` via variable de entorno |
| Inicialización | Auto-init en arranque del servidor (schema.sql + seed.sql) |

### 3.4 Infraestructura de Despliegue

| Servicio | Proveedor | Plan | URL |
|---|---|---|---|
| Frontend (Static Site) | Render.com | Free | https://smarthome5p-frontend.onrender.com |
| Backend (Web Service) | Render.com | Free (512 MB RAM) | https://smarthome5p-backend.onrender.com |
| Base de datos | Render.com | PostgreSQL Free | Interno (acceso por DATABASE_URL) |
| Repositorio | GitHub | Public | https://github.com/Dakotapog/smarthome5p |

---

## 4. Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENTE (Navegador)                   │
│         React 18 + Vite — Static Site (Render)          │
│   https://smarthome5p-frontend.onrender.com             │
└──────────────────────┬──────────────────────────────────┘
                       │  HTTPS / REST API + JWT
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  BACKEND (Web Service)                   │
│         Node.js 18 + Express 4 — Render.com             │
│   https://smarthome5p-backend.onrender.com              │
│                                                         │
│  Rutas: /api/auth  /api/dashboard  /api/alerts          │
│          /api/residents  /api/water  /api/health         │
└──────────────────────┬──────────────────────────────────┘
                       │  node-postgres (SSL)
                       ▼
┌─────────────────────────────────────────────────────────┐
│               BASE DE DATOS (PostgreSQL 15)              │
│              Render.com — Free Tier                      │
│                                                         │
│  Tablas: users, residents, apartments,                  │
│           sensor_readings, alerts, access_log,          │
│           water_consumption, cctv_recordings,           │
│           notification_log                               │
└─────────────────────────────────────────────────────────┘
```

---

## 5. Módulos Funcionales Implementados

### 5.1 Autenticación (RF-012)

- Login con validación de credenciales bcrypt + emisión de JWT (8 horas).
- Roles: ADMIN y RESIDENT con acceso diferenciado a módulos.
- Registro de cada inicio de sesión en la tabla `access_log`.
- Middleware de protección de rutas: `authMiddleware` + `adminOnly`.

### 5.2 Dashboard en Tiempo Real (RF-001, RF-004, RNF-001)

- Visualización de los 5 pisos del edificio con lecturas de sensores.
- Sensores integrados: Ecolite SE14 (humo), ADXL345 (sísmico), PIR.
- Actualización automática cada **8 segundos** (cumple latencia ≤ 10s de RNF-001).
- Indicador de modo del gateway: CLOUD / EDGE / OFFLINE (RF-003).
- Vista filtrada por piso para usuarios Residente.

### 5.3 Gestión de Alertas (RF-005, RF-006, OC-01)

- Listado completo de alertas con filtros por estado, tipo y severidad.
- Resolución de alertas activas (solo Administrador).
- Simulador de alertas: genera lecturas de sensor y mide latencia en ms.
- Indicador visual de cumplimiento OC-01 (latencia ≤ 5.000 ms).
- Notificación automática registrada en `notification_log` al crear alerta.

### 5.4 Consumo Hídrico (RF-008, Ley 373/1997)

- Tarjetas por piso con flujo actual, consumo diario y mensual.
- Indicador de eficiencia: verde/amarillo/rojo por umbral de consumo.
- Gráfica histórica de 7 días con Recharts BarChart.
- Base de datos: tabla `water_consumption` con 5 registros demo.

### 5.5 Gestión de Residentes (RF-010, RF-011)

- CRUD completo: crear, leer, actualizar, eliminar residentes.
- Asociación con apartamentos (tabla `apartments` — 10 unidades precargadas).
- Bitácora de accesos biométricos con timestamp (tabla `access_log`).
- Restricción de acceso: solo Administrador.

---

## 6. Estructura del Repositorio

```
smarthome5p/
├── smarthome5p-app/
│   ├── backend/
│   │   ├── app.js                    # Entrypoint Express + auto-initDB
│   │   ├── package.json
│   │   ├── .env.example
│   │   └── src/
│   │       ├── db/
│   │       │   ├── index.js          # Pool PostgreSQL con SSL
│   │       │   ├── schema.sql        # 9 tablas + ENUMs
│   │       │   └── seed.sql          # Datos demo
│   │       ├── middleware/
│   │       │   └── auth.js           # JWT + adminOnly
│   │       ├── controllers/
│   │       │   ├── authController.js
│   │       │   ├── dashboardController.js
│   │       │   ├── alertController.js
│   │       │   ├── residentController.js
│   │       │   └── waterController.js
│   │       └── routes/
│   │           ├── auth.js
│   │           ├── dashboard.js
│   │           ├── alerts.js
│   │           ├── residents.js
│   │           └── water.js
│   └── frontend/
│       ├── package.json
│       ├── vite.config.js
│       └── src/
│           ├── App.jsx               # Rutas + PrivateRoute
│           ├── index.css             # Design system
│           ├── services/api.js       # Axios + JWT interceptor
│           ├── context/AuthContext.jsx
│           ├── components/Navbar.jsx
│           └── pages/
│               ├── Login.jsx
│               ├── Dashboard.jsx
│               ├── Alerts.jsx
│               ├── Residents.jsx
│               └── Water.jsx
└── SmartHome5P_Entrega3/
    └── docs/                         # Productos 1–6 (documentos entrega)
```

---

## 7. Variables de Entorno (Configuración de Producción)

Las siguientes variables de entorno están configuradas en el panel de Render.com para el Web Service del backend:

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | URL de conexión PostgreSQL proporcionada por Render |
| `JWT_SECRET` | Clave secreta para firmar tokens JWT |
| `PORT` | Puerto del servidor (Render asigna automáticamente) |
| `FRONTEND_URL` | `https://smarthome5p-frontend.onrender.com` (CORS) |
| `NODE_ENV` | `production` |

La variable de entorno del frontend:

| Variable | Valor |
|---|---|
| `VITE_API_URL` | `https://smarthome5p-backend.onrender.com/api` |

---

## 8. Evidencia de Funcionamiento

### 8.1 Health Check del Backend

Respuesta esperada al acceder a `https://smarthome5p-backend.onrender.com/api/health`:

```json
{
  "status": "ok",
  "timestamp": "2026-04-27T...",
  "database": "connected"
}
```

### 8.2 Log de Inicialización del Backend (Render.com)

Secuencia registrada en los logs de Render tras el primer despliegue:

```
DATABASE_URL definida: true
Conexión exitosa a PostgreSQL.
Tablas no encontradas.
Ejecutando schema.sql...
Schema creado.
Ejecutando seed.sql...
Base de datos inicializada con datos demo.
Servidor corriendo en puerto 10000
```

### 8.3 Datos Precargados en la Base de Datos

| Tabla | Registros | Descripción |
|---|---|---|
| users | 2 | admin@smarthome5p.co y residente@smarthome5p.co |
| apartments | 10 | 2 por piso (pisos 1 al 5) |
| residents | 2 | Un residente admin y uno regular |
| sensor_readings | 13 | Lecturas de humo, sismo y PIR para los 5 pisos |
| alerts | 3 | 2 activas (humo piso 3, fuga piso 2) + 1 resuelta |
| water_consumption | 5 | Una lectura por piso |
| access_log | 1 | Registro de entrada biométrica |
| notification_log | 2 | Notificaciones generadas por alertas |
| cctv_recordings | 0 | Tabla disponible para expansión futura |

### 8.4 Capturas de Pantalla Esperadas

Las capturas de pantalla del sistema en producción deben mostrar:

1. **Pantalla de Login** — Formulario con botones de acceso rápido Admin/Residente, diseño oscuro (#1a1a2e).
2. **Dashboard Admin** — 5 tarjetas de piso con indicadores de sensores y badge de modo CLOUD del gateway.
3. **Dashboard Residente** — Vista de un único piso (Piso 1, Apartamento 101).
4. **Módulo Alertas** — Tabla con 3 alertas (2 ACTIVE en rojo, 1 RESOLVED en gris) + simulador activo.
5. **Consumo Hídrico** — 5 tarjetas + BarChart de 7 días con datos de los 5 pisos.
6. **Gestión Residentes** — Tabla de residentes con botones Editar/Eliminar + pestaña Bitácora.

---

## 9. Requisitos Funcionales Trazados

| RF | Descripción | Estado | Evidencia |
|---|---|---|---|
| RF-001 | Monitoreo sensores en tiempo real (≤ 10s) | ✅ Implementado | Dashboard polling 8s |
| RF-002 | Dashboard por pisos con alertas visuales | ✅ Implementado | Tarjetas color-coded |
| RF-003 | Resiliencia edge (CLOUD/EDGE/OFFLINE) | ✅ Implementado | Indicador gateway mode |
| RF-004 | Latencia alerta ≤ 5s desde sensor | ✅ Implementado | Simulador muestra ms |
| RF-005 | Gestión alertas críticas CRUD | ✅ Implementado | Módulo Alertas |
| RF-006 | Notificaciones automáticas en alerta | ✅ Implementado | notification_log |
| RF-008 | Monitoreo consumo hídrico por piso | ✅ Implementado | Módulo Water |
| RF-010 | CRUD residentes (Admin) | ✅ Implementado | Módulo Residentes |
| RF-011 | Bitácora de accesos biométricos | ✅ Implementado | access_log |
| RF-012 | Autenticación JWT con roles | ✅ Implementado | authController + middleware |

---

## 10. Referencias

Project Management Institute. (2013). *Guía de los fundamentos para la dirección de proyectos (Guía del PMBOK®)* (5.ª ed.). PMI.

Colombia. Congreso de la República. (2012). *Ley 1581 de 2012: Protección de datos personales*. Diario Oficial No. 48.587.

Colombia. Congreso de la República. (1997). *Ley 373 de 1997: Uso eficiente y ahorro del agua*. Diario Oficial No. 43.058.

Render Inc. (2024). *Render documentation: Web Services, Static Sites and PostgreSQL free tier*. Render.com.

OpenJS Foundation. (2023). *Node.js 18 LTS documentation*. Node.js.

*Nota. Elaboración propia.*

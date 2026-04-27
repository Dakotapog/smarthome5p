# SmartHome 5P — Sistema de Gestión Edificio Inteligente

**Proyecto:** SmartHome 5P | **Entrega Final Semana 7** | **Politécnico Grancolombiano — Grupo B04**  
**Autor:** David Alberto Coronado Tabares | **Tutora:** Isabel Andrea Mahecha Nieto

---

## Credenciales de demo

| Rol | Usuario | Contraseña |
|---|---|---|
| Admin | admin@smarthome5p.co | password |
| Residente | residente@smarthome5p.co | password |

---

## Stack tecnológico

- **Frontend:** React 18 + Vite + React Router 6 + Recharts
- **Backend:** Node.js 18 + Express 4 + JWT
- **Base de datos:** PostgreSQL (Render.com)
- **Deploy:** Render.com (Web Service + Static Site + PostgreSQL)

---

## Despliegue en Render.com (paso a paso)

### 1. Subir a GitHub

```bash
cd smarthome5p-app
git init
git add .
git commit -m "SmartHome 5P v1.0 - Entrega Final"
git remote add origin https://github.com/TU_USUARIO/smarthome5p.git
git push -u origin main
```

### 2. Crear base de datos en Render

1. Ir a https://render.com → New → PostgreSQL
2. Nombre: `smarthome5p-db`
3. Plan: **Free**
4. Copiar el **Internal Database URL**

### 3. Crear Web Service (backend)

1. New → Web Service → Connect your GitHub repo
2. **Root Directory:** `backend`
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. **Environment Variables:**
   - `DATABASE_URL` = (pegar el Internal Database URL)
   - `JWT_SECRET` = `smarthome5p_secret_2026`
   - `NODE_ENV` = `production`
   - `FRONTEND_URL` = (URL del Static Site — se llena después)
6. Plan: **Free**

### 4. Inicializar base de datos

Una vez desplegado el backend, en Render > Shell:
```bash
npm run setup
```

### 5. Crear Static Site (frontend)

1. New → Static Site → Connect mismo repo
2. **Root Directory:** `frontend`
3. **Build Command:** `npm install && npm run build`
4. **Publish Directory:** `dist`
5. **Environment Variables:**
   - `VITE_API_URL` = `https://TU-BACKEND.onrender.com/api`
6. Plan: **Free**

### 6. Actualizar CORS del backend

En Render > Backend > Environment:
- `FRONTEND_URL` = `https://TU-FRONTEND.onrender.com`

---

## Desarrollo local

```bash
# Backend
cd backend
cp .env.example .env
# Editar .env con tu DATABASE_URL local
npm install
npm run setup   # Crea tablas y seed
npm run dev

# Frontend (en otra terminal)
cd frontend
npm install
npm run dev
# Abre http://localhost:5173
```

---

## Módulos implementados

| Módulo | RF | Estado |
|---|---|---|
| Autenticación JWT (Admin/Residente) | RF-012 | ✅ |
| Dashboard mapa 5 pisos | RF-004 | ✅ |
| Alertas humo/sismo + simulador | RF-001, RF-002, RF-007 | ✅ |
| Gestión Residentes CRUD | RF-008 | ✅ |
| Consumo Hídrico | RF-011 | ✅ |
| Gateway Mode (CLOUD/EDGE/OFFLINE) | RF-003 | ✅ |

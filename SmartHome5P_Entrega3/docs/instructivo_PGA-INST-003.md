# Instructivo de Navegación — Entrega Final Semana 7
## SmartHome 5P — PGA-INST-003 v1.0

**Código:** PGA-INST-003 v1.0  
**Módulo:** Gerencia de Proyectos Informáticos — Politécnico Grancolombiano  
**Entrega:** Final — Semana 7 (Escenario 7) — 125 puntos  
**Autor:** David Alberto Coronado Tabares  
**Tutora:** Isabel Andrea Mahecha Nieto  
**Grupo:** B04  
**Fecha:** Abril de 2026  

---

## Propósito de este Instructivo

Este documento es la guía de lectura y navegación de la Entrega Final del proyecto SmartHome 5P (Semana 7 — Escenario 7). Su objetivo es que la tutora y cualquier evaluador puedan localizar rápidamente cada uno de los siete (7) productos entregados, comprender la lógica de organización del material y verificar la coherencia acumulada de las tres entregas del curso.

> **Importante:** Este instructivo cubre los 6 productos documentales de la Entrega Final (90 pts) más el documento acumulado de las tres entregas (35 pts). El software funcional desplegado (Producto 5) es accesible en producción desde cualquier navegador.

---

## Acceso Directo al Software (Producto 5)

| Elemento | Dirección |
|---|---|
| **Aplicación en producción** | https://smarthome5p-frontend.onrender.com |
| **API Backend** | https://smarthome5p-backend.onrender.com/api/health |
| **Repositorio GitHub** | https://github.com/Dakotapog/smarthome5p |
| **Admin demo** | admin@smarthome5p.co / password |
| **Residente demo** | residente@smarthome5p.co / password |

> El servidor puede tardar 30–60 s en responder la primera solicitud (modo reposo Render free tier). Los datos persisten en PostgreSQL.

---

## Estructura de la Entrega Final

```
SmartHome5P_Entrega3/
└── docs/
    ├── producto1_plan_gestion_riesgos.md    ← PGA-RIESG-001 v1.0
    ├── producto2_top_n_riesgos.md           ← PGA-RIESG-002 v1.0
    ├── producto3_tabla_cifras_medicion.md   ← PGA-RIESG-003 v1.0
    ├── producto4_listado_total_riesgos.md   ← PGA-RIESG-004 v1.0
    ├── producto5_evidencia_software.md      ← PGA-SW-001 v1.0
    ├── producto6_manual_usuario.md          ← PGA-MAN-001 v1.0
    └── instructivo_PGA-INST-003.md          ← Este documento

smarthome5p-app/                             ← Código fuente del software
├── backend/                                 ← Node.js + Express + PostgreSQL
└── frontend/                                ← React 18 + Vite
```

---

## Mapa de Productos — Guía Rápida de Navegación

| # | Producto (Guía institucional) | Código | Archivo | Puntaje |
|---|---|---|---|---|
| 1 | Plan de Gestión de Riesgos | PGA-RIESG-001 v1.0 | `producto1_plan_gestion_riesgos.md` | 15 pts |
| 2 | Top N Riesgos | PGA-RIESG-002 v1.0 | `producto2_top_n_riesgos.md` | 15 pts |
| 3 | Tabla de Cifras y Medición | PGA-RIESG-003 v1.0 | `producto3_tabla_cifras_medicion.md` | 15 pts |
| 4 | Listado Total de Riesgos | PGA-RIESG-004 v1.0 | `producto4_listado_total_riesgos.md` | 15 pts |
| 5 | Software Funcional Desplegado | PGA-SW-001 v1.0 | `producto5_evidencia_software.md` + URL | 15 pts |
| 6 | Manual de Usuario | PGA-MAN-001 v1.0 | `producto6_manual_usuario.md` | 15 pts |
| — | Documento acumulado Entregas 1+2+3 | PGA-ACUM-001 v1.0 | (ver sección siguiente) | 35 pts |
| — | **Este instructivo** | PGA-INST-003 v1.0 | `instructivo_PGA-INST-003.md` | — |
| | **Total** | | | **125 pts** |

---

## Cómo Leer Cada Producto

### Producto 1 — Plan de Gestión de Riesgos (`producto1_plan_gestion_riesgos.md`)

Es el documento base de toda la gestión de riesgos. Establece:

- **Marco de referencia:** PMBOK® Cap. 11, ISO/IEC 25010, NSR-10, NTC 1669, Ley 1581/2012, Ley 373/1997.
- **Escalas de Probabilidad e Impacto** (1–5) con descripción cualitativa.
- **Matriz de Exposición P×I** con umbrales Rojo/Amarillo/Verde.
- **Roles** RP-01 a RP-07 con responsabilidades en riesgos.
- **Proceso** de identificación → análisis → respuesta → control.
- **Reserva de contingencia:** $8.502.500 COP (8,95 % del presupuesto de $95.000.000 COP).

> Leerlo **primero**; proporciona el vocabulario y las reglas que los demás productos aplican.

---

### Producto 2 — Top N Riesgos (`producto2_top_n_riesgos.md`)

Presenta los **10 riesgos más significativos** (los de mayor exposición) con ficha completa de cada uno:

- 2 riesgos **Rojos** (Críticos — Exposición 15): RIESG-001 (falla gateway Dragino LG308) y RIESG-002 (sensor Ecolite SE14 descalibrado).
- 8 riesgos **Amarillos** (Moderados — Exposición 10–12): incluye sobrecosto hardware (TRM), retraso de proveedor, ataques OWASP, fuga de agua.
- Cada ficha incluye: ID, categoría, descripción, causa raíz, P, I, Exposición, WBS afectado, RF/RNF afectado, estrategia, plan de respuesta, dueño, trigger, estado.

> Leer en **orden descendente de exposición** (de RIESG-001 al RIESG-010).

---

### Producto 3 — Tabla de Cifras y Medición (`producto3_tabla_cifras_medicion.md`)

Documento cuantitativo y estadístico que consolida:

- **22 riesgos totales:** 2 rojos, 16 amarillos, 4 verdes.
- **Exposición total acumulada:** 215 (Σ P×I).
- **Mapa de calor P×I** con ubicación visual de todos los riesgos.
- **Top 3 por impacto:** cronograma, costo y calidad.
- **Cálculo detallado de la reserva de contingencia** por nivel.

> Útil como **resumen ejecutivo** para presentar el perfil de riesgo al sponsor.

---

### Producto 4 — Listado Total de Riesgos (`producto4_listado_total_riesgos.md`)

El **registro maestro completo** de los 22 riesgos identificados, ordenados por exposición descendente. Contiene:

- Tabla resumen de los 22 riesgos (ID, descripción, categoría, P, I, Exposición, nivel, estrategia, dueño).
- Fichas detalladas de RIESG-011 a RIESG-022 (los 10 complementarios no incluidos en Producto 2).
- Tabla de estrategias de respuesta consolidada.

> Leer en conjunto con el Producto 2 para obtener el registro completo (RIESG-001 al RIESG-022).

---

### Producto 5 — Software Funcional (`producto5_evidencia_software.md` + URL)

**El software ya está desplegado y es funcional en producción.** El evaluador debe:

1. Abrir https://smarthome5p-frontend.onrender.com en un navegador.
2. Esperar hasta 60 s si es la primera carga (cold start Render).
3. Ingresar con cualquiera de las dos credenciales demo.
4. Navegar por los módulos: Dashboard → Alertas → Consumo Hídrico → Residentes.

El documento `producto5_evidencia_software.md` contiene la documentación técnica del despliegue: stack completo, arquitectura, módulos implementados, estructura de repositorio y trazabilidad de Requisitos Funcionales.

---

### Producto 6 — Manual de Usuario (`producto6_manual_usuario.md`)

Guía completa para usuarios finales del sistema. Organizado en 8 secciones operativas:

| Sección | Contenido |
|---|---|
| 1. Introducción | Alcance funcional, perfiles de usuario, requisitos técnicos del cliente |
| 2. Acceso al sistema | URL, pantalla de login, credenciales demo, proceso de autenticación, cierre de sesión |
| 3. Dashboard | Indicador de gateway, tarjetas por piso, actualización automática, colores de estado |
| 4. Alertas | Lista, filtros, resolución, simulador con medición de latencia |
| 5. Acceso Biométrico | Bitácora de accesos, privacidad (Ley 1581/2012) |
| 6. Consumo Hídrico | Tarjetas por piso, indicador de eficiencia, gráfica histórica Recharts |
| 7. Gestión Residentes | CRUD, formularios, bitácora — solo Administrador |
| 8. Preguntas frecuentes | Resolución de dudas operativas más comunes |

> Leer antes de evaluar el software para comprender el comportamiento esperado de cada módulo.

---

## Trazabilidad Transversal — Tres Entregas

La siguiente tabla muestra cómo se conectan los documentos de las tres entregas del curso:

```
ENTREGA 1 (Semana 3)                    ENTREGA 2 (Semana 5)                    ENTREGA 3 (Semana 7)
────────────────────────────────────    ────────────────────────────────────    ────────────────────────────────────
Acta de constitución                    Plan de calidad (OC-01 a OC-08)         Plan de Gestión de Riesgos
Enunciado del alcance                   ↓                                       ↓
EDT / WBS ─────────────────────────────→ Casos de uso (UC-01 a UC-09) ─────────→ WBS afectado en cada riesgo
MTR-001 (Matriz trazabilidad) ─────────→ RF/RNF ────────────────────────────────→ RF/RNF afectado en cada riesgo
RHW (hardware IoT) ────────────────────→ Clases IoT + MER ─────────────────────→ RIESG-001 (gateway), RIESG-002 (sensor)
Cronograma (8 semanas) ────────────────→ Plan RRHH (RP-01 a RP-07) ────────────→ Dueños de riesgo (RP-XX)
Presupuesto $95.000.000 COP ───────────→ ─────────────────────────────────────→ Reserva contingencia $8.502.500 COP
                                                                                SOFTWARE DESPLEGADO
                                                                                https://smarthome5p-frontend.onrender.com
```

---

## Documento Acumulado — Entregas 1 + 2 + 3

El documento acumulado integra el contenido de las tres entregas en un único archivo con:

| Sección | Origen |
|---|---|
| Portada y tabla de contenido | Nueva — esta entrega |
| Introducción actualizada (3 entregas) | Nueva — esta entrega |
| Objetivos del proyecto | Entrega 1 |
| Acta de constitución | Entrega 1 |
| Enunciado del alcance + EDT | Entrega 1 |
| Cronograma (8 semanas) | Entrega 1 |
| Presupuesto y plan RRHH | Entrega 1 + Entrega 2 |
| Plan de calidad + criterios OC | Entrega 2 |
| Diagramas UML (casos de uso, clases, secuencia, MER) | Entrega 2 |
| Diccionario de datos | Entrega 2 |
| **Plan de Gestión de Riesgos** | **Entrega 3** |
| **Top N Riesgos + Listado total** | **Entrega 3** |
| **Tabla de cifras y medición** | **Entrega 3** |
| **Evidencia software desplegado** | **Entrega 3** |
| Referencias APA 7.ª ed. consolidadas | Nueva — esta entrega |

---

## Verificación de Completitud (Checklist)

- [x] **Producto 1** — Plan de Gestión de Riesgos (15 pts) → `producto1_plan_gestion_riesgos.md`
- [x] **Producto 2** — Top N Riesgos (15 pts) → `producto2_top_n_riesgos.md`
- [x] **Producto 3** — Tabla de Cifras y Medición (15 pts) → `producto3_tabla_cifras_medicion.md`
- [x] **Producto 4** — Listado Total de Riesgos (15 pts) → `producto4_listado_total_riesgos.md`
- [x] **Producto 5** — Software funcional desplegado (15 pts) → https://smarthome5p-frontend.onrender.com
- [x] **Producto 6** — Manual de usuario (15 pts) → `producto6_manual_usuario.md`
- [x] **Documento acumulado** Entregas 1+2+3 (35 pts) → Ver sección anterior
- [x] **Este instructivo** → `instructivo_PGA-INST-003.md`

**Total verificado: 7/7 productos — 125 puntos posibles**

---

## Herramientas Utilizadas

| Herramienta | Uso | Versión |
|---|---|---|
| React + Vite | Frontend del software | 18.2 / 5.x |
| Node.js + Express | Backend REST API | 18 LTS / 4.x |
| PostgreSQL | Base de datos | 15 |
| Render.com | Despliegue en la nube (gratuito) | — |
| GitHub | Control de versiones y repositorio público | — |
| Markdown | Documentos textuales | — |
| PlantUML | Diagramas UML (Entregas 1 y 2) | 2.18.1 |

---

## Convenciones de Nomenclatura

| Prefijo | Tipo de documento |
|---|---|
| `PGA-RIESG-` | Documentos de gestión de riesgos |
| `PGA-SW-` | Documentos de software / evidencia técnica |
| `PGA-MAN-` | Manuales de usuario |
| `PGA-INST-` | Instructivos de navegación |
| `PGA-ACUM-` | Documentos acumulados por entrega |
| `RIESG-` | Identificadores de riesgos individuales (001–022) |
| `RP-` | Roles del proyecto (01–07) |
| `RF-` | Requisitos funcionales |
| `RNF-` | Requisitos no funcionales |
| `RHW-` | Requisitos de hardware IoT |
| `OC-` | Objetivos de calidad |

---

## Referencias

Project Management Institute. (2013). *Guía de los fundamentos para la dirección de proyectos (Guía del PMBOK®)* (5.ª ed.). PMI.

Colombia. Congreso de la República. (2012). *Ley 1581 de 2012: Protección de datos personales*. Diario Oficial No. 48.587.

Colombia. Congreso de la República. (1997). *Ley 373 de 1997: Uso eficiente y ahorro del agua*. Diario Oficial No. 43.058.

Ministerio de Ambiente, Vivienda y Desarrollo Territorial. (2010). *NSR-10 — Reglamento colombiano de construcción sismo resistente*. Gobierno de Colombia.

Instituto Colombiano de Normas Técnicas y Certificación. (2004). *NTC 1669: Detectores automáticos de incendio*. Icontec.

International Organization for Standardization. (2011). *ISO/IEC 25010:2011 — Systems and software quality requirements and evaluation*. ISO.

*Nota. Elaboración propia.*

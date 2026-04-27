# Plan de Gestión de Riesgos
## SmartHome 5P — PGA-RIESG-001 v1.0

**Código:** PGA-RIESG-001 v1.0  
**Módulo:** Gerencia de Proyectos Informáticos — Politécnico Grancolombiano  
**Entrega:** Final — Semana 7 (Escenario 7)  
**Autor:** David Alberto Coronado Tabares  
**Tutora:** Isabel Andrea Mahecha Nieto  
**Grupo:** B04  
**Fecha:** Abril de 2026  

---

## 1. Propósito

El presente plan establece el marco metodológico, los procesos y las responsabilidades para identificar, analizar, planificar respuestas y controlar los riesgos del proyecto SmartHome 5P, con el fin de minimizar el impacto de eventos negativos sobre el alcance, el cronograma, el presupuesto de $95.000.000 COP y la calidad del sistema de gestión de edificio inteligente de 5 pisos.

---

## 2. Marco de Referencia

| Referencia | Aplicación |
|---|---|
| PMBOK® 5.ª ed. — Cap. 11 (PMI, 2013) | Proceso de gestión de riesgos del proyecto |
| ISO/IEC 25010:2011 | Criterios de calidad y disponibilidad del software |
| NSR-10 Título A | Umbrales sísmicos — riesgos físicos del sistema |
| NTC 1669 | Detectores de humo — riesgos de sensores |
| Ley 1581/2012 | Riesgos regulatorios en datos biométricos |
| Ley 373/1997 | Riesgos de incumplimiento uso eficiente del agua |

---

## 3. Definiciones y Escalas

### 3.1 Escala de Probabilidad

| Valor | Nivel | Rango | Descripción |
|---|---|---|---|
| 1 | Muy baja | < 10 % | Ocurrencia excepcional, casi imposible en el proyecto |
| 2 | Baja | 10 – 30 % | Poco probable; requiere condiciones específicas |
| 3 | Media | 30 – 50 % | Probabilidad moderada; puede presentarse |
| 4 | Alta | 50 – 70 % | Probable; condiciones frecuentes en el proyecto |
| 5 | Muy alta | > 70 % | Casi certeza de ocurrencia |

### 3.2 Escala de Impacto

| Valor | Nivel | Descripción |
|---|---|---|
| 1 | Muy bajo | Impacto mínimo; sin efecto perceptible en alcance, tiempo o costo |
| 2 | Bajo | Impacto menor; ajustes internos sin afectar la línea base |
| 3 | Moderado | Impacto perceptible; requiere plan de respuesta activo |
| 4 | Alto | Afecta significativamente el cronograma, costo o calidad |
| 5 | Muy alto | Compromete la entrega del proyecto o genera incumplimiento normativo grave |

### 3.3 Matriz de Exposición (Probabilidad × Impacto)

| | **I=1** | **I=2** | **I=3** | **I=4** | **I=5** |
|---|---|---|---|---|---|
| **P=5** | 5 🟢 | 10 🟡 | 15 🔴 | 20 🔴 | 25 🔴 |
| **P=4** | 4 🟢 | 8 🟡 | 12 🟡 | 16 🔴 | 20 🔴 |
| **P=3** | 3 🟢 | 6 🟢 | 9 🟡 | 12 🟡 | 15 🔴 |
| **P=2** | 2 🟢 | 4 🟢 | 6 🟢 | 8 🟡 | 10 🟡 |
| **P=1** | 1 🟢 | 2 🟢 | 3 🟢 | 4 🟢 | 5 🟢 |

**Clasificación:**
- 🔴 **Rojo (Crítico):** Exposición 15 – 25 → Acción inmediata requerida
- 🟡 **Amarillo (Moderado):** Exposición 8 – 14 → Monitoreo activo y plan de respuesta
- 🟢 **Verde (Bajo):** Exposición 1 – 7 → Aceptar con monitoreo periódico

---

## 4. Categorías de Riesgo

| Categoría | Descripción | Ejemplos en SmartHome 5P |
|---|---|---|
| **Técnico** | Fallas en hardware, software, integración o rendimiento | Gateway IoT, sensores, API REST, base de datos |
| **Externo** | Factores fuera del control del equipo | TRM, proveedores, normativa, cortes eléctricos |
| **Organizacional** | Relacionados con el equipo, recursos humanos o comunicación | Rotación de personal, conflictos, disponibilidad |
| **Gestión** | Problemas en planificación, estimación o control del proyecto | Gold plating, desviación presupuestal, entregables incompletos |
| **Regulatorio** | Incumplimientos normativos con consecuencias legales | Ley 1581/2012, NSR-10, NTC 1669 |

---

## 5. Roles en la Gestión de Riesgos

| Rol | Código | Responsabilidad |
|---|---|---|
| Gerente de Proyecto | RP-01 | Custodiar el registro de riesgos, aprobar planes de respuesta, reportar al cliente |
| Líder IoT / Arquitecto | RP-02 | Identificar y monitorear riesgos técnicos de hardware y conectividad |
| Desarrollador Backend Senior | RP-03 | Identificar riesgos de software, seguridad y rendimiento de la API |
| Desarrollador Frontend | RP-04 | Identificar riesgos de usabilidad y compatibilidad del dashboard |
| Líder de Calidad QA | RP-06 | Validar que los riesgos de calidad se detecten antes de la entrega |
| Líder de Alcance / Requisitos | RP-07 | Identificar riesgos de cambio de alcance y trazabilidad MTR-001 |

---

## 6. Proceso de Gestión de Riesgos

### 6.1 Identificación
- **Técnica:** Tormenta de ideas del equipo + revisión de la MTR-001 y la EDT
- **Insumos:** Lecciones aprendidas, normativas aplicables, experiencia del Líder IoT
- **Salida:** Registro inicial de riesgos con categoría y descripción

### 6.2 Análisis Cualitativo
- Asignación de valores P (1–5) e I (1–5) por consenso del equipo
- Cálculo de Exposición = P × I
- Clasificación en Rojo/Amarillo/Verde según la matriz del numeral 3.3

### 6.3 Planificación de Respuestas

| Estrategia | Cuándo aplicar |
|---|---|
| **Evitar** | Eliminar la causa raíz del riesgo — riesgos Rojo con alta probabilidad |
| **Mitigar** | Reducir probabilidad o impacto — riesgos Rojo y Amarillo |
| **Transferir** | Trasladar el riesgo a un tercero (seguros, contratos) — riesgos externos |
| **Aceptar** | Tolerar el riesgo — riesgos Verde o de muy bajo costo de respuesta |

### 6.4 Monitoreo y Control
- Revisión semanal del registro de riesgos en la reunión de seguimiento
- Actualización del estado (Activo / Cerrado) según evolución
- Disparadores (triggers) documentados por riesgo
- Escalamiento al Gerente de Proyecto si la exposición aumenta

---

## 7. Reserva de Contingencia

La reserva de contingencia se calcula sobre el presupuesto total del proyecto ($95.000.000 COP) en función del perfil de riesgo identificado:

| Nivel | Cantidad de riesgos | Factor aplicado | Aporte estimado (COP) |
|---|---|---|---|
| Rojo (crítico) | 2 | 5 % del presupuesto | $ 4.750.000 |
| Amarillo (moderado) | 16 | 2,5 % del presupuesto | $ 3.562.500 |
| Verde (bajo) | 4 | 0,5 % del presupuesto | $ 190.000 |
| **Total reserva recomendada** | **22** | **~8 %** | **$ 8.502.500** |

> **Nota:** La reserva de contingencia de $8.502.500 COP representa el 8,95 % del presupuesto total, valor razonable para proyectos de tecnología IoT con 2 riesgos críticos identificados (PMI, 2013, Cap. 11).

---

## 8. Herramientas y Formato del Registro

Cada riesgo se documenta con los siguientes campos (ver Producto 2 y Producto 4):

| Campo | Descripción |
|---|---|
| ID | RIESG-001 a RIESG-022 |
| Categoría | Técnico / Externo / Organizacional / Gestión / Regulatorio |
| Descripción | Qué puede pasar, cuándo y cómo |
| Causa raíz | Por qué ocurriría |
| Probabilidad | 1–5 con justificación |
| Impacto | 1–5 con justificación |
| Exposición | P × I |
| Nivel | 🔴 Rojo / 🟡 Amarillo / 🟢 Verde |
| WBS afectado | Código(s) EDT |
| RF/RNF afectado | Si aplica |
| Estrategia | Evitar / Mitigar / Transferir / Aceptar |
| Plan de respuesta | Acciones concretas |
| Dueño | Rol responsable (RP-XX) |
| Trigger | Señal de activación |
| Estado | Activo / Cerrado |

---

## 9. Referencias

Project Management Institute. (2013). *Guía de los fundamentos para la dirección de proyectos (Guía del PMBOK®)* (5.ª ed.). PMI.

International Organization for Standardization. (2011). *ISO/IEC 25010:2011 — Systems and software quality requirements and evaluation*. ISO.

Colombia. Congreso de la República. (2012). *Ley 1581 de 2012: Protección de datos personales*. Diario Oficial No. 48.587.

Ministerio de Ambiente, Vivienda y Desarrollo Territorial. (2010). *NSR-10 — Reglamento colombiano de construcción sismo resistente*. Gobierno de Colombia.

Instituto Colombiano de Normas Técnicas y Certificación. (2004). *NTC 1669: Detectores automáticos de incendio*. Icontec.

*Nota. Elaboración propia.*

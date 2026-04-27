# Tabla de Cifras y Medición de Riesgos
## SmartHome 5P — PGA-RIESG-003 v1.0

**Código:** PGA-RIESG-003 v1.0  
**Módulo:** Gerencia de Proyectos Informáticos — Politécnico Grancolombiano  
**Entrega:** Final — Semana 7 (Escenario 7)  
**Autor:** David Alberto Coronado Tabares  
**Tutora:** Isabel Andrea Mahecha Nieto  
**Grupo:** B04  
**Fecha:** Abril de 2026  

---

## 1. Métricas Cuantitativas Consolidadas

| Métrica | Valor |
|---|---|
| Total de riesgos identificados | 22 |
| Riesgos Rojos — Críticos (Exposición 15–25) | 2 |
| Riesgos Amarillos — Moderados (Exposición 8–14) | 16 |
| Riesgos Verdes — Bajos (Exposición 1–7) | 4 |
| Exposición total acumulada (Σ P×I) | 215 |
| Exposición promedio por riesgo | 9,77 |
| Exposición máxima registrada | 15 (RIESG-001, RIESG-002) |
| Exposición mínima registrada | 3 (RIESG-019) |
| Reserva de contingencia recomendada | $8.502.500 COP (8,95 % del presupuesto) |
| Presupuesto total del proyecto | $95.000.000 COP |

*Nota. Elaboración propia.*

---

## 2. Distribución por Categoría

| Categoría | Cantidad | % del total | Exposición acumulada |
|---|---|---|---|
| Técnico | 9 | 40,9 % | 99 |
| Externo | 5 | 22,7 % | 48 |
| Gestión | 4 | 18,2 % | 39 |
| Organizacional | 2 | 9,1 % | 18 |
| Regulatorio | 2 | 9,1 % | 11 |
| **Total** | **22** | **100 %** | **215** |

*Nota. Elaboración propia.*

---

## 3. Distribución por Nivel de Riesgo

| Nivel | Exposición | Cantidad | % | IDs |
|---|---|---|---|---|
| 🔴 Rojo — Crítico | 15 – 25 | 2 | 9,1 % | RIESG-001, RIESG-002 |
| 🟡 Amarillo — Moderado | 8 – 14 | 16 | 72,7 % | RIESG-003 al RIESG-018 |
| 🟢 Verde — Bajo | 1 – 7 | 4 | 18,2 % | RIESG-019 al RIESG-022 |

*Nota. Elaboración propia.*

---

## 4. Mapa de Calor — Matriz P × I

La siguiente tabla representa visualmente la ubicación de los 22 riesgos en la matriz de probabilidad e impacto. Las celdas coloreadas indican la concentración de riesgos por zona.

| Probabilidad \ Impacto | **I=1 Muy bajo** | **I=2 Bajo** | **I=3 Moderado** | **I=4 Alto** | **I=5 Muy alto** |
|---|---|---|---|---|---|
| **P=5 Muy alta** | 🟢 — | 🟡 — | 🔴 — | 🔴 — | 🔴 — |
| **P=4 Alta** | 🟢 — | 🟡 — | 🟡 **R-003, R-007** | 🔴 — | 🔴 — |
| **P=3 Media** | 🟢 — | 🟢 — | 🟡 **R-016, R-018, R-020** | 🟡 **R-004, R-005, R-006, R-008** | 🔴 **R-001, R-002** |
| **P=2 Baja** | 🟢 — | 🟢 **R-021** | 🟢 **R-011** | 🟡 **R-019, R-022** | 🟡 **R-009, R-010, R-013, R-017** |
| **P=1 Muy baja** | 🟢 — | 🟢 — | 🟢 **R-011** | 🟢 **R-008** | 🟢 — |

> **Lectura del mapa:** Las celdas sombreadas en rojo contienen los riesgos críticos que requieren atención inmediata. La concentración en la columna I=4/I=5 indica que SmartHome 5P enfrenta riesgos de alto impacto moderadamente probables, típico de proyectos IoT con dependencias de hardware externo.

*Nota. Elaboración propia con base en PMI (2013).*

---

## 5. Top 3 Riesgos por Impacto en Cronograma

| Posición | ID | Riesgo | Impacto en cronograma |
|---|---|---|---|
| 1 | RIESG-004 | Retraso entrega sensores IoT por proveedor | Bloquea ruta crítica WBS 2.2 y 3.x; retraso estimado de 2 semanas |
| 2 | RIESG-007 | Gold Plating — cambio de alcance no controlado | Desvío de 1–2 semanas del cronograma base |
| 3 | RIESG-014 | Rotación de personal técnico en fase crítica | Curva de aprendizaje estimada en 5–7 días de retraso |

*Nota. Elaboración propia.*

---

## 6. Top 3 Riesgos por Impacto en Costo

| Posición | ID | Riesgo | Impacto estimado en costo (COP) |
|---|---|---|---|
| 1 | RIESG-003 | Sobrecosto hardware IoT por variación TRM | Hasta $9.500.000 (10 % del presupuesto) |
| 2 | RIESG-009 | Incumplimiento Ley 1581/2012 datos biométricos | Sanción SIC hasta $2.000.000.000 COP |
| 3 | RIESG-001 | Falla gateway Dragino LG308 — adquisición de repuesto | Costo de reemplazo: $3.200.000 – $4.800.000 COP |

*Nota. Elaboración propia.*

---

## 7. Top 3 Riesgos por Impacto en Calidad

| Posición | ID | Riesgo | Impacto en calidad |
|---|---|---|---|
| 1 | RIESG-002 | Sensor Ecolite SE14 descalibrado | Incumple OC-01 (latencia ≤5s) y NTC 1669; falla PT-001 |
| 2 | RIESG-010 | Latencia ADXL345 supera 5s | Incumple OC-01 y RNF-001; falla PT-002 |
| 3 | RIESG-005 | Ataques OWASP Top 10 a la API REST | Compromete OC-07 (cobertura pruebas) y confidencialidad datos |

*Nota. Elaboración propia.*

---

## 8. Cálculo de la Reserva de Contingencia

La reserva de contingencia se calcula aplicando un factor diferencial por nivel de riesgo sobre el presupuesto total del proyecto ($95.000.000 COP), siguiendo la metodología del PMBOK® Cap. 11 (PMI, 2013):

| Nivel | Riesgos | Factor | Base de cálculo | Aporte (COP) |
|---|---|---|---|---|
| 🔴 Rojo | 2 | 5,00 % | $95.000.000 | $ 4.750.000 |
| 🟡 Amarillo | 16 | 2,50 % | $95.000.000 | $ 3.562.500 |
| 🟢 Verde | 4 | 0,50 % | $95.000.000 | $ 190.000 |
| **Total** | **22** | **~8,95 %** | | **$ 8.502.500** |

> **Justificación:** El porcentaje de 8,95 % es coherente con el perfil de riesgo del proyecto: 2 riesgos críticos relacionados con seguridad de vidas (humo y sismo), alta dependencia de hardware importado y presión de cronograma de 8 semanas. El PMBOK® recomienda reservas de contingencia entre el 5 % y el 15 % para proyectos tecnológicos de mediana complejidad (PMI, 2013, p. 309).

*Nota. Elaboración propia.*

---

## 9. Referencias

Project Management Institute. (2013). *Guía de los fundamentos para la dirección de proyectos (Guía del PMBOK®)* (5.ª ed.). PMI.

Colombia. Congreso de la República. (2012). *Ley 1581 de 2012: Protección de datos personales*. Diario Oficial No. 48.587.

Superintendencia de Industria y Comercio. (2018). *Circular Externa 002 de 2018: Tratamiento de datos biométricos*. SIC.

*Nota. Elaboración propia.*

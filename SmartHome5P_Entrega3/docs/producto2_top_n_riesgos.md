# Top N de Riesgos — Mayor Exposición
## SmartHome 5P — PGA-RIESG-002 v1.0

**Código:** PGA-RIESG-002 v1.0  
**Módulo:** Gerencia de Proyectos Informáticos — Politécnico Grancolombiano  
**Entrega:** Final — Semana 7 (Escenario 7)  
**Autor:** David Alberto Coronado Tabares  
**Tutora:** Isabel Andrea Mahecha Nieto  
**Grupo:** B04  
**Fecha:** Abril de 2026  

> Los riesgos se presentan ordenados de mayor a menor exposición (P × I). Se incluyen los 10 riesgos con mayor nivel de exposición identificados en el proyecto SmartHome 5P.

---

## RIESG-001 — Falla del gateway Dragino LG308 en modo edge

| Campo | Detalle |
|---|---|
| **ID** | RIESG-001 |
| **Categoría** | Técnico |
| **Descripción** | Falla del gateway Dragino LG308 durante operación en modo edge sin conectividad cloud, provocando pérdida total de alertas críticas de humo y sismo durante más de 30 minutos. |
| **Causa raíz** | Hardware IoT con única unidad de gateway sin redundancia; falla de firmware o corte de energía en zona de instalación. |
| **Probabilidad** | 3 — Media (30–50 %): el gateway opera en condiciones de baja temperatura y alta humedad propias de sótanos de edificios en Bogotá. |
| **Impacto** | 5 — Muy alto: incumple RF-003 (modo edge ≥30 min) y RNF-001 (latencia ≤5s), poniendo en riesgo vidas humanas. |
| **Exposición** | **15 🔴 Rojo** |
| **WBS afectado** | WBS 3.2 (Instalación gateway), WBS 4.3 (Módulo alertas) |
| **RF/RNF afectado** | RF-003, RF-001, RF-002, RNF-001, RNF-004 |
| **Estrategia** | Mitigar |
| **Plan de respuesta** | 1) Adquirir gateway de respaldo (hot standby). 2) Implementar buffer local de 48 h en el gateway primario. 3) Prueba mensual de failover. 4) Alarma de estado del gateway en el dashboard (módulo Edge/Cloud). |
| **Dueño** | RP-02 — Líder IoT / Arquitecto |
| **Trigger** | Dashboard muestra estado OFFLINE por más de 2 minutos en horario operativo. |
| **Estado** | Activo |

---

## RIESG-002 — Sensor Ecolite SE14 descalibrado → falsos negativos en detección de humo

| Campo | Detalle |
|---|---|
| **ID** | RIESG-002 |
| **Categoría** | Técnico |
| **Descripción** | El sensor de humo Ecolite SE14 pierde calibración, generando falsos negativos: no detecta concentraciones de humo por encima del umbral NTC 1669, dejando al edificio sin alerta de incendio. |
| **Causa raíz** | Falta de mantenimiento preventivo periódico; acumulación de polvo en la cámara iónica del sensor; vida útil del componente superada. |
| **Probabilidad** | 3 — Media (30–50 %): sensores instalados en ambientes con partículas de polvo comunes en edificios en construcción. |
| **Impacto** | 5 — Muy alto: incumple RF-001 y NTC 1669; riesgo directo a la vida de los residentes. |
| **Exposición** | **15 🔴 Rojo** |
| **WBS afectado** | WBS 3.1 (Sensores humo), WBS 5.1 (Pruebas PT-001) |
| **RF/RNF afectado** | RF-001, RNF-001 |
| **Estrategia** | Mitigar |
| **Plan de respuesta** | 1) Programa de calibración semestral documentado. 2) Prueba PT-001 mensual con aerosol de prueba certificado. 3) Sensor de respaldo en piso 3 (piso de mayor tráfico). 4) Alerta automática si el sensor no reporta lectura en 15 min (gatewayMode = OFFLINE). |
| **Dueño** | RP-02 — Líder IoT / Arquitecto |
| **Trigger** | Sensor no reporta lectura por más de 15 minutos consecutivos en `sensor_readings`. |
| **Estado** | Activo |

---

## RIESG-003 — Sobrecosto hardware IoT por variación de la TRM (dólar)

| Campo | Detalle |
|---|---|
| **ID** | RIESG-003 |
| **Categoría** | Externo |
| **Descripción** | El presupuesto de hardware IoT (sensores ADXL345, Ecolite SE14, cámaras Hikvision DS-2CD, gateway Dragino LG308) se calcula en dólares USD. Una variación adversa de la TRM puede superar el presupuesto aprobado de $95.000.000 COP. |
| **Causa raíz** | Alta dependencia de importaciones de hardware IoT; presupuesto fijo en COP sin cobertura cambiaria. |
| **Probabilidad** | 4 — Alta (50–70 %): el mercado cambiario colombiano presenta alta volatilidad histórica, especialmente en períodos electorales o de crisis económica global. |
| **Impacto** | 3 — Moderado: puede requerir reducir alcance del hardware o solicitar presupuesto adicional. |
| **Exposición** | **12 🟡 Amarillo** |
| **WBS afectado** | WBS 2.x (Infraestructura física), WBS 3.x (Hardware IoT) |
| **RF/RNF afectado** | RHW-001 a RHW-007 |
| **Estrategia** | Mitigar / Transferir |
| **Plan de respuesta** | 1) Cotizar hardware con precio fijo en COP al momento de la compra. 2) Reserva de contingencia de $4.750.000 COP destinada parcialmente a variación TRM. 3) Identificar proveedores locales como alternativa a importación directa. |
| **Dueño** | RP-01 — Gerente de Proyecto |
| **Trigger** | TRM supera $4.600 COP/USD durante la fase de adquisición (WBS 2.x). |
| **Estado** | Activo |

---

## RIESG-004 — Retraso en entrega de sensores IoT por proveedor

| Campo | Detalle |
|---|---|
| **ID** | RIESG-004 |
| **Categoría** | Externo |
| **Descripción** | El proveedor de hardware IoT (sensores, gateway Dragino LG308, lector biométrico) no entrega los dispositivos en las fechas comprometidas, bloqueando las actividades de la ruta crítica WBS 2.2 y WBS 3.x. |
| **Causa raíz** | Cadena de suministro internacional con demoras en aduana; proveedor único sin alternativa local. |
| **Probabilidad** | 3 — Media (30–50 %): los proveedores de hardware IoT especializado en Colombia tienen tiempos de entrega variables de 2 a 6 semanas. |
| **Impacto** | 4 — Alto: bloquea la instalación física y las pruebas PT-001 a PT-005, impactando directamente el cronograma de 8 semanas. |
| **Exposición** | **12 🟡 Amarillo** |
| **WBS afectado** | WBS 2.2, WBS 3.1, WBS 3.2, WBS 3.3 |
| **RF/RNF afectado** | RHW-001, RHW-002, RHW-005, RHW-007 |
| **Estrategia** | Mitigar |
| **Plan de respuesta** | 1) Solicitar cotización a mínimo 2 proveedores antes de la compra. 2) Iniciar proceso de adquisición en Semana 1. 3) Identificar proveedores locales de reemplazo en Bogotá (zona industrial Puente Aranda). 4) Simulación en software mientras llega el hardware físico. |
| **Dueño** | RP-02 — Líder IoT / Arquitecto |
| **Trigger** | Hardware no recibido en la fecha comprometida con el proveedor + 3 días de tolerancia. |
| **Estado** | Activo |

---

## RIESG-005 — Ataques OWASP Top 10 a la API REST → compromiso de datos de residentes

| Campo | Detalle |
|---|---|
| **ID** | RIESG-005 |
| **Categoría** | Técnico |
| **Descripción** | Vulnerabilidades de seguridad en la API REST del sistema (inyección SQL, autenticación débil, exposición de datos sensibles) permiten a un atacante acceder a datos personales y biométricos de los residentes. |
| **Causa raíz** | Implementación sin revisión de seguridad formal; uso de tokens JWT con secretos débiles; falta de validación de entradas en endpoints. |
| **Probabilidad** | 3 — Media (30–50 %): sistemas web sin pentesting previo presentan vulnerabilidades OWASP en el 60 % de los casos (OWASP, 2021). |
| **Impacto** | 4 — Alto: violación de Ley 1581/2012 con sanción de la SIC de hasta 2.000 SMMLV; pérdida de confianza del cliente. |
| **Exposición** | **12 🟡 Amarillo** |
| **WBS afectado** | WBS 4.1 (Auth), WBS 4.7 (Deploy) |
| **RF/RNF afectado** | RF-012, RF-005 |
| **Estrategia** | Mitigar |
| **Plan de respuesta** | 1) Implementar validación de entradas en todos los endpoints. 2) JWT con expiración de 8 horas y secret de 32+ caracteres. 3) HTTPS obligatorio en producción (Render provee SSL automático). 4) Revisión de seguridad por el Líder QA antes del despliegue. |
| **Dueño** | RP-03 — Desarrollador Backend Senior |
| **Trigger** | Detección de error HTTP 500 recurrente en logs del servidor o acceso no autorizado a endpoints protegidos. |
| **Estado** | Activo |

---

## RIESG-006 — Fallo en servidor cloud Render → incumplimiento disponibilidad nocturna

| Campo | Detalle |
|---|---|
| **ID** | RIESG-006 |
| **Categoría** | Técnico |
| **Descripción** | El servidor de despliegue cloud (Render.com) presenta caída durante el horario nocturno (22:00–06:00), incumpliendo el requisito de disponibilidad ≥99 % (RNF-003). |
| **Causa raíz** | Plan gratuito de Render.com con SLA inferior al 99 %; sin redundancia geográfica ni failover automático. |
| **Probabilidad** | 3 — Media (30–50 %): el plan Free de Render.com entra en modo sleep tras 15 minutos de inactividad, afectando la disponibilidad. |
| **Impacto** | 4 — Alto: incumple RNF-003 y compromete alertas críticas de humo y sismo durante la noche, cuando los residentes están en sus apartamentos. |
| **Exposición** | **12 🟡 Amarillo** |
| **WBS afectado** | WBS 4.7 (Deploy), WBS 5.3 (Pruebas disponibilidad) |
| **RF/RNF afectado** | RNF-003, RF-001, RF-002 |
| **Estrategia** | Mitigar |
| **Plan de respuesta** | 1) Configurar ping automático cada 14 minutos para evitar el sleep del servidor (servicio UptimeRobot gratuito). 2) RF-003 como respaldo: modo edge en Dragino LG308 opera ≥30 min sin nube. 3) Para producción real, migrar a plan Starter de Render ($7 USD/mes). |
| **Dueño** | RP-03 — Desarrollador Backend Senior |
| **Trigger** | Monitor de disponibilidad reporta caída por más de 3 minutos entre 22:00 y 06:00. |
| **Estado** | Activo |

---

## RIESG-007 — Cambio de alcance no controlado (Gold Plating)

| Campo | Detalle |
|---|---|
| **ID** | RIESG-007 |
| **Categoría** | Gestión |
| **Descripción** | El equipo agrega funcionalidades no contempladas en la MTR-001 (ej. app móvil, CCTV en tiempo real, notificaciones WhatsApp), desviando el cronograma y superando el presupuesto de $95.000.000 COP. |
| **Causa raíz** | Falta de control de cambios formal; presión del cliente por más funcionalidades; subestimación del impacto de los cambios. |
| **Probabilidad** | 4 — Alta (50–70 %): en proyectos de software el gold plating se presenta en más del 50 % de los casos sin control formal de cambios. |
| **Impacto** | 3 — Moderado: desvío de hasta 2 semanas del cronograma; funcionalidades comprometidas del Must Have. |
| **Exposición** | **12 🟡 Amarillo** |
| **WBS afectado** | Toda la EDT |
| **RF/RNF afectado** | Todos los RF Must Have |
| **Estrategia** | Evitar |
| **Plan de respuesta** | 1) Proceso formal de control de cambios con Formato FSC aprobado por el Gerente de Proyecto. 2) Congelar alcance en Semana 4. 3) Cualquier nueva funcionalidad entra a backlog para versión 2.0. |
| **Dueño** | RP-07 — Líder de Alcance / Requisitos |
| **Trigger** | Solicitud de funcionalidad no listada en MTR-001 recibida en cualquier fase del proyecto. |
| **Estado** | Activo |

---

## RIESG-008 — Pérdida de conectividad nocturna → incumplimiento RNF-003

| Campo | Detalle |
|---|---|
| **ID** | RIESG-008 |
| **Categoría** | Externo |
| **Descripción** | Pérdida de conectividad a internet en el edificio durante el horario nocturno (22:00–06:00) por fallas del ISP, impidiendo la sincronización cloud y el monitoreo remoto del dashboard. |
| **Causa raíz** | Dependencia de proveedor único de internet; infraestructura de red del edificio sin redundancia. |
| **Probabilidad** | 3 — Media (30–50 %): cortes de servicio ISP en Bogotá tienen frecuencia mensual promedio de 1–2 eventos. |
| **Impacto** | 4 — Alto: incumple RNF-003 (disponibilidad ≥99 %); sin monitoreo cloud durante el horario de mayor riesgo. |
| **Exposición** | **12 🟡 Amarillo** |
| **WBS afectado** | WBS 2.1 (Infraestructura red), WBS 4.7 |
| **RF/RNF afectado** | RNF-003, RNF-004, RF-003 |
| **Estrategia** | Mitigar |
| **Plan de respuesta** | 1) RF-003 como primera línea de defensa: modo edge del Dragino LG308 opera ≥30 min autónomo. 2) Contrato con ISP secundario (backup 4G LTE) para continuidad. 3) Configurar alertas locales en el gateway que no dependan de conectividad cloud. |
| **Dueño** | RP-02 — Líder IoT / Arquitecto |
| **Trigger** | Gateway reporta estado OFFLINE en el dashboard por más de 5 minutos consecutivos. |
| **Estado** | Activo |

---

## RIESG-009 — Incumplimiento Ley 1581/2012 en manejo de datos biométricos

| Campo | Detalle |
|---|---|
| **ID** | RIESG-009 |
| **Categoría** | Regulatorio |
| **Descripción** | El sistema almacena y procesa datos biométricos (huellas dactilares en `biometricHash`) sin cumplir íntegramente los requisitos de la Ley 1581/2012 y la Circular SIC 002/2018, exponiendo al proyecto a sanciones de la Superintendencia de Industria y Comercio. |
| **Causa raíz** | Falta de política de tratamiento de datos biométricos documentada; almacenamiento sin cifrado end-to-end verificado; ausencia de consentimiento informado formalizado. |
| **Probabilidad** | 2 — Baja (10–30 %): el sistema usa hash de la huella (no la huella en bruto), lo que reduce el riesgo, pero aún requiere cumplimiento formal. |
| **Impacto** | 5 — Muy alto: sanción de la SIC de hasta 2.000 SMMLV (~$2.000.000.000 COP en 2026); paralización del proyecto. |
| **Exposición** | **10 🟡 Amarillo** |
| **WBS afectado** | WBS 4.1 (Auth), WBS 3.5 (Lector biométrico) |
| **RF/RNF afectado** | RF-005, RF-012 |
| **Estrategia** | Mitigar |
| **Plan de respuesta** | 1) Documentar política de tratamiento de datos biométricos firmada por residentes. 2) Verificar cifrado bcrypt del `biometricHash` en la BD. 3) Restringir acceso a `access_log` solo a Admin. 4) Revisión legal antes del despliegue en producción real. |
| **Dueño** | RP-07 — Líder de Alcance / Requisitos |
| **Trigger** | Solicitud de acceso a datos biométricos por parte de un actor no autorizado o queja formal de residente. |
| **Estado** | Activo |

---

## RIESG-010 — Latencia del sensor ADXL345 supera 5s → incumplimiento RNF-001

| Campo | Detalle |
|---|---|
| **ID** | RIESG-010 |
| **Categoría** | Técnico |
| **Descripción** | El tiempo entre la detección de actividad sísmica ≥0.05g por el acelerómetro ADXL345 y el envío del push al residente supera los 5 segundos, incumpliendo el criterio crítico de aceptación RNF-001. |
| **Causa raíz** | Latencia de red entre el gateway y el backend cloud; procesamiento lento del AlertService bajo carga concurrente; cola de alertas saturada. |
| **Probabilidad** | 2 — Baja (10–30 %): en condiciones normales la latencia medida es <1s, pero picos de tráfico pueden superarla. |
| **Impacto** | 5 — Muy alto: en evento sísmico real, 5+ segundos adicionales pueden costar vidas; incumple NSR-10 y criterio de aceptación formal. |
| **Exposición** | **10 🟡 Amarillo** |
| **WBS afectado** | WBS 3.2 (Gateway), WBS 4.3 (Alertas), WBS 5.1 (Pruebas) |
| **RF/RNF afectado** | RF-002, RNF-001 |
| **Estrategia** | Mitigar |
| **Plan de respuesta** | 1) Prueba PT-002 obligatoria antes de la entrega con medición de latencia real. 2) Cola de alertas críticas con prioridad máxima en el AlertService. 3) El simulador en el dashboard mide y muestra la latencia en cada prueba. 4) Modo edge como fallback si la nube introduce latencia. |
| **Dueño** | RP-06 — Líder de Calidad QA |
| **Trigger** | Prueba PT-002 muestra latencia >4.000 ms (margen del 20 % antes del límite de 5.000 ms). |
| **Estado** | Activo |

---

## Resumen del Top 10

| Posición | ID | Descripción resumida | P | I | Exposición | Nivel |
|---|---|---|---|---|---|---|
| 1 | RIESG-001 | Falla gateway Dragino LG308 en modo edge | 3 | 5 | 15 | 🔴 Rojo |
| 2 | RIESG-002 | Sensor Ecolite SE14 descalibrado — falsos negativos | 3 | 5 | 15 | 🔴 Rojo |
| 3 | RIESG-003 | Sobrecosto hardware IoT por variación TRM | 4 | 3 | 12 | 🟡 Amarillo |
| 4 | RIESG-004 | Retraso entrega sensores por proveedor | 3 | 4 | 12 | 🟡 Amarillo |
| 5 | RIESG-005 | Ataques OWASP Top 10 a la API REST | 3 | 4 | 12 | 🟡 Amarillo |
| 6 | RIESG-006 | Fallo servidor cloud — incumple disponibilidad nocturna | 3 | 4 | 12 | 🟡 Amarillo |
| 7 | RIESG-007 | Gold Plating — cambio de alcance no controlado | 4 | 3 | 12 | 🟡 Amarillo |
| 8 | RIESG-008 | Pérdida conectividad nocturna — incumple RNF-003 | 3 | 4 | 12 | 🟡 Amarillo |
| 9 | RIESG-009 | Incumplimiento Ley 1581/2012 datos biométricos | 2 | 5 | 10 | 🟡 Amarillo |
| 10 | RIESG-010 | Latencia ADXL345 supera 5s — incumple RNF-001 | 2 | 5 | 10 | 🟡 Amarillo |

*Nota. Elaboración propia con base en PMI (2013) y análisis del contexto del proyecto SmartHome 5P.*

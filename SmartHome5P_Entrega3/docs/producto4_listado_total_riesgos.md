# Listado Total de Riesgos
## SmartHome 5P — PGA-RIESG-004 v1.0

**Código:** PGA-RIESG-004 v1.0  
**Módulo:** Gerencia de Proyectos Informáticos — Politécnico Grancolombiano  
**Entrega:** Final — Semana 7 (Escenario 7)  
**Autor:** David Alberto Coronado Tabares  
**Tutora:** Isabel Andrea Mahecha Nieto  
**Grupo:** B04  
**Fecha:** Abril de 2026  

> Registro completo de los 22 riesgos identificados, ordenados por exposición descendente. Incluye los 10 riesgos del Top N más 12 riesgos adicionales de menor exposición. Formato consistente con PGA-RIESG-002.

---

## Tabla Maestra de Riesgos (22 riesgos — orden descendente por exposición)

| ID | Categoría | Descripción | P | I | Exp. | Nivel | WBS | RF/RNF | Estrategia | Dueño | Estado |
|---|---|---|---|---|---|---|---|---|---|---|---|
| RIESG-001 | Técnico | Falla gateway Dragino LG308 en modo edge → pérdida alertas críticas | 3 | 5 | **15** | 🔴 | 3.2, 4.3 | RF-003, RNF-001 | Mitigar | RP-02 | Activo |
| RIESG-002 | Técnico | Sensor Ecolite SE14 descalibrado → falsos negativos humo | 3 | 5 | **15** | 🔴 | 3.1, 5.1 | RF-001, RNF-001 | Mitigar | RP-02 | Activo |
| RIESG-003 | Externo | Sobrecosto hardware IoT por variación TRM (dólares) | 4 | 3 | **12** | 🟡 | 2.x, 3.x | RHW-001 a 007 | Mitigar/Transferir | RP-01 | Activo |
| RIESG-004 | Externo | Retraso entrega sensores IoT por proveedor → bloqueo ruta crítica | 3 | 4 | **12** | 🟡 | 2.2, 3.1, 3.2 | RHW-001, RHW-007 | Mitigar | RP-02 | Activo |
| RIESG-005 | Técnico | Ataques OWASP Top 10 a API REST → compromiso datos residentes | 3 | 4 | **12** | 🟡 | 4.1, 4.7 | RF-012, RF-005 | Mitigar | RP-03 | Activo |
| RIESG-006 | Técnico | Fallo servidor cloud Render → incumple disponibilidad nocturna RNF-003 | 3 | 4 | **12** | 🟡 | 4.7, 5.3 | RNF-003, RF-001 | Mitigar | RP-03 | Activo |
| RIESG-007 | Gestión | Gold Plating — cambio alcance no controlado → desviación cronograma | 4 | 3 | **12** | 🟡 | Toda la EDT | Todos RF Must Have | Evitar | RP-07 | Activo |
| RIESG-008 | Externo | Pérdida conectividad nocturna → incumplimiento RNF-003 (≥99 %) | 3 | 4 | **12** | 🟡 | 2.1, 4.7 | RNF-003, RNF-004 | Mitigar | RP-02 | Activo |
| RIESG-009 | Regulatorio | Incumplimiento Ley 1581/2012 en datos biométricos → sanción SIC | 2 | 5 | **10** | 🟡 | 4.1, 3.5 | RF-005, RF-012 | Mitigar | RP-07 | Activo |
| RIESG-010 | Técnico | Latencia ADXL345 supera 5s → incumplimiento RNF-001 | 2 | 5 | **10** | 🟡 | 3.2, 4.3, 5.1 | RF-002, RNF-001 | Mitigar | RP-06 | Activo |
| RIESG-011 | Gestión | Falla pruebas PT-001→PT-006 antes de la entrega → no conformidades | 2 | 5 | **10** | 🟡 | 5.x | OC-01 a OC-07 | Mitigar | RP-06 | Activo |
| RIESG-012 | Organizacional | Rotación de personal técnico en fase de desarrollo crítica | 2 | 5 | **10** | 🟡 | 1.x (RRHH) | Cronograma | Mitigar | RP-01 | Activo |
| RIESG-013 | Gestión | Desviación presupuestal >10 % por compras no planificadas | 3 | 3 | **9** | 🟡 | Toda la EDT | Presupuesto | Mitigar | RP-01 | Activo |
| RIESG-014 | Organizacional | Comunicación deficiente entre subequipos IoT y Software | 3 | 3 | **9** | 🟡 | 3.x, 4.x | RF-003, RF-004 | Mitigar | RP-01 | Activo |
| RIESG-015 | Gestión | Documentación incompleta o inconsistente con el código entregado | 3 | 3 | **9** | 🟡 | 4.8 (Manual) | OC-08 | Mitigar | RP-07 | Activo |
| RIESG-016 | Técnico | Vulnerabilidad JWT — token sin expiración → sesiones indefinidas | 2 | 4 | **8** | 🟡 | 4.1 | RF-012 | Mitigar | RP-03 | Activo |
| RIESG-017 | Técnico | Incompatibilidad LoRaWAN con infraestructura eléctrica del edificio | 2 | 4 | **8** | 🟡 | 3.2, 2.3 | RHW-007, RF-003 | Mitigar | RP-02 | Activo |
| RIESG-018 | Regulatorio | Cambio normativo NSR-10 durante ejecución → revisión de umbrales sísmicos | 2 | 4 | **8** | 🟡 | 3.1, 5.1 | RF-002, RNF-001 | Aceptar | RP-02 | Activo |
| RIESG-019 | Externo | Falla de suministro eléctrico en edificio durante instalación IoT | 2 | 3 | **6** | 🟢 | 2.x, 3.x | RHW-001 a 007 | Aceptar | RP-05 | Activo |
| RIESG-020 | Técnico | Corrupción de datos en tabla `sensor_readings` → lecturas incorrectas | 1 | 5 | **5** | 🟢 | 4.6 (Modelo datos) | RF-004, RF-001 | Mitigar | RP-03 | Activo |
| RIESG-021 | Gestión | Entrega incompleta por falta de tiempo → pérdida de puntos evaluación | 2 | 2 | **4** | 🟢 | Toda la EDT | Entrega Semana 7 | Mitigar | RP-01 | Activo |
| RIESG-022 | Externo | Cambio en política de precios de Render.com → costo de hosting inesperado | 1 | 3 | **3** | 🟢 | 4.7 | RF-003 | Aceptar | RP-01 | Activo |

*Nota. Elaboración propia con base en PMI (2013) y análisis del proyecto SmartHome 5P.*

---

## Detalle de Riesgos Adicionales (RIESG-011 a RIESG-022)

### RIESG-011 — Falla en pruebas PT-001 a PT-006 antes de la entrega

| Campo | Detalle |
|---|---|
| **Descripción** | Los resultados de las pruebas de sistema (PT-001 latencia humo, PT-002 sismo, PT-003 edge, PT-004 dashboard, PT-005 biométrico, PT-006 disponibilidad) muestran incumplimiento de los umbrales definidos en el Plan de Calidad PGA-CAL-001 justo antes de la entrega final. |
| **Causa raíz** | Falta de tiempo para pruebas exhaustivas; defectos detectados tarde en el ciclo de desarrollo. |
| **Plan de respuesta** | Reservar Semana 7 exclusivamente para pruebas. Automatizar PT-001 y PT-002 con el simulador del dashboard. Documentar resultados en el informe de calidad. |
| **Trigger** | Cualquier prueba PT-XXX arroja resultado FALLO en la semana anterior a la entrega. |

---

### RIESG-012 — Rotación de personal técnico en fase crítica

| Campo | Detalle |
|---|---|
| **Descripción** | Un miembro clave del equipo (especialmente el Líder IoT RP-02 o el Desarrollador Backend RP-03) abandona el proyecto durante las semanas 4–7, fase de mayor intensidad técnica. |
| **Causa raíz** | Contratos de corto plazo; mejores ofertas salariales del mercado; conflictos internos del equipo. |
| **Plan de respuesta** | Documentación continua del código (README, comentarios). Código fuente en GitHub desde el inicio. Estrategia de conciliación PGA-CONC-001 activa. |
| **Trigger** | Renuncia o ausencia no justificada por más de 3 días de un miembro del equipo técnico. |

---

### RIESG-013 — Desviación presupuestal >10 % por compras no planificadas

| Campo | Detalle |
|---|---|
| **Descripción** | Adquisiciones de hardware o servicios no contemplados en el plan de costos superan en más del 10 % el presupuesto aprobado de $95.000.000 COP. |
| **Causa raíz** | Estimación optimista de costos en la Entrega 1; cambios en el alcance aprobados sin análisis de costo. |
| **Plan de respuesta** | Control semanal del gasto real vs. planificado en el flujo de efectivo. Reserva de contingencia de $8.502.500 COP activa. Ninguna compra >$500.000 sin aprobación del GP. |
| **Trigger** | Gasto acumulado supera el 90 % del presupuesto antes de la Semana 6. |

---

### RIESG-014 — Comunicación deficiente entre subequipos IoT y Software

| Campo | Detalle |
|---|---|
| **Descripción** | Los equipos de hardware IoT y desarrollo de software trabajan sin sincronización, generando interfaces incompatibles entre el gateway Dragino LG308 y el backend Node.js, o datos del sensor en formato no esperado por la API. |
| **Causa raíz** | Falta de reuniones de integración técnica; supuestos no validados sobre el protocolo de mensajes MQTT. |
| **Plan de respuesta** | Reunión de integración técnica semanal (Semanas 3–6). Definir contrato de API (formato JSON de sensor_readings) en Semana 2. Stand-up diario de 15 minutos entre Líder IoT y Backend. |
| **Trigger** | Error de integración detectado en prueba PT-004 (dashboard sin datos) o PT-001/PT-002 (alertas no recibidas). |

---

### RIESG-015 — Documentación incompleta o inconsistente con el código

| Campo | Detalle |
|---|---|
| **Descripción** | El Manual de Usuario, el instructivo PGA-INST-003 o los documentos de riesgos no reflejan correctamente el software desplegado, generando inconsistencias detectables por la tutora. |
| **Causa raíz** | Desarrollo del software y documentación en paralelo sin sincronización final; capturas de pantalla desactualizadas. |
| **Plan de respuesta** | Generar capturas del software real desplegado en producción. Revisar cruzadamente código ↔ documento antes de la entrega. Principio de atomicidad: nombres de entidades iguales en MER, diccionario y código. |
| **Trigger** | Tutora detecta discrepancia entre el manual y el software durante la evaluación. |

---

### RIESG-016 — Vulnerabilidad JWT — token sin expiración adecuada

| Campo | Detalle |
|---|---|
| **Descripción** | Los tokens JWT del sistema no expiran en el tiempo definido o el secreto es débil, permitiendo el acceso no autorizado a la plataforma después de que el usuario ha cerrado sesión. |
| **Causa raíz** | Configuración incorrecta del parámetro `expiresIn` en el AuthController; uso de secreto corto o predecible. |
| **Plan de respuesta** | JWT configurado con `expiresIn: '8h'`. JWT_SECRET de 32+ caracteres aleatorios en variable de entorno. Prueba de seguridad: verificar que token expirado retorna HTTP 401. |
| **Trigger** | Prueba de seguridad detecta que un token expirado sigue siendo aceptado por la API. |

---

### RIESG-017 — Incompatibilidad LoRaWAN con infraestructura del edificio

| Campo | Detalle |
|---|---|
| **Descripción** | El gateway Dragino LG308 con protocolo LoRaWAN presenta interferencias o atenuación excesiva de señal en la estructura de concreto reforzado del edificio de 5 pisos, impidiendo la recepción de datos de sensores en pisos intermedios. |
| **Causa raíz** | Paredes y losas de concreto reforzado atenúan la señal LoRaWAN; antena del gateway mal posicionada. |
| **Plan de respuesta** | Prueba de cobertura en sitio antes de la instalación definitiva. Posicionar gateway en zona de mayor cobertura (piso 3). Evaluar antena externa de mayor ganancia si la señal es insuficiente. |
| **Trigger** | Más del 20 % de lecturas de sensor_readings muestran `gatewayMode = OFFLINE` en pisos 1 o 5. |

---

### RIESG-018 — Cambio normativo NSR-10 durante ejecución

| Campo | Detalle |
|---|---|
| **Descripción** | El Ministerio de Vivienda publica una actualización de la NSR-10 que modifica el umbral sísmico de 0.05g, requiriendo recalibración del sensor ADXL345 y actualización del criterio de aceptación RF-002. |
| **Causa raíz** | Política exterior al control del proyecto; ciclos de actualización normativa del Gobierno de Colombia. |
| **Plan de respuesta** | Monitorear el Diario Oficial mensualmente. El umbral actual (0.05g) está parametrizado en el código — un cambio solo requiere actualizar una constante en el AlertService. Estrategia: Aceptar con monitoreo. |
| **Trigger** | Publicación oficial de actualización NSR-10 en el Diario Oficial de Colombia durante el período marzo–mayo 2026. |

---

### RIESG-019 — Falla de suministro eléctrico durante instalación IoT

| Campo | Detalle |
|---|---|
| **Descripción** | Un corte de energía eléctrica en el edificio durante la instalación física de los sensores IoT (RHW-001 a RHW-006) daña los dispositivos o interrumpe el proceso de configuración. |
| **Causa raíz** | Red eléctrica del edificio en construcción sin estabilizadores; trabajos simultáneos de otras cuadrillas. |
| **Plan de respuesta** | Programar instalación en horarios de baja actividad. UPS portátil para proteger equipos de configuración. Coordinación previa con el administrador del edificio. |
| **Trigger** | Corte eléctrico de más de 5 minutos durante una sesión de instalación activa. |

---

### RIESG-020 — Corrupción de datos en tabla `sensor_readings`

| Campo | Detalle |
|---|---|
| **Descripción** | Datos incorrectos o corruptos en la tabla `sensor_readings` de PostgreSQL (valores nulos, tipos incorrectos, timestamps futuros) generan lecturas erróneas en el dashboard y alertas falsas. |
| **Causa raíz** | Falta de validación de datos en la capa de inserción; simulaciones de prueba que no se limpian; error en el proceso de seed. |
| **Plan de respuesta** | Validación de tipos en el backend antes de insertar en la BD. Constraints de CHECK en el schema SQL (ya implementados). Script de limpieza de datos de prueba después del seed. |
| **Trigger** | Dashboard muestra valores negativos o mayores a 1000 PPM en lecturas de humo. |

---

### RIESG-021 — Entrega incompleta por falta de tiempo

| Campo | Detalle |
|---|---|
| **Descripción** | El equipo no logra completar todos los 6 productos de la Entrega Final en el plazo de la Semana 7, entregando un documento parcial que no alcanza los 125 puntos. |
| **Causa raíz** | Subestimación del esfuerzo de documentación; problemas técnicos de última hora en el despliegue. |
| **Plan de respuesta** | Secuencia de trabajo: software primero (Semana 6), documentos después (Semana 7). Lista de chequeo final verificada antes de la entrega. Priorizar los 6 productos en orden de mayor valor. |
| **Trigger** | A 48 horas del cierre, más de 2 productos aún no completados. |

---

### RIESG-022 — Cambio en política de precios de Render.com

| Campo | Detalle |
|---|---|
| **Descripción** | Render.com modifica su plan gratuito durante el período de evaluación, eliminando el tier Free o limitando las horas de ejecución, haciendo inaccesible el software desplegado al momento de la revisión de la tutora. |
| **Causa raíz** | Dependencia de servicio de terceros con políticas de precio variables; Render.com ya modificó sus planes Free en 2024. |
| **Plan de respuesta** | Documentar capturas de pantalla del sistema funcionando antes de la entrega. Exportar backup de la BD. Plan B: Railway.app o Fly.io como alternativa gratuita. Costo del plan Starter: $7 USD/mes como último recurso. |
| **Trigger** | Render.com notifica cambio de plan o el sistema muestra error 503 al acceder a la URL de producción. |

---

## Resumen Final por Estrategia

| Estrategia | Cantidad | IDs |
|---|---|---|
| Mitigar | 16 | RIESG-001 al 018 (excepto 007 y 018) |
| Evitar | 1 | RIESG-007 |
| Transferir (combinada) | 1 | RIESG-003 |
| Aceptar | 4 | RIESG-018, RIESG-019, RIESG-021 parcial, RIESG-022 |

*Nota. Elaboración propia con base en PMI (2013) y análisis del contexto del proyecto SmartHome 5P.*

---

## Referencias

Project Management Institute. (2013). *Guía de los fundamentos para la dirección de proyectos (Guía del PMBOK®)* (5.ª ed.). PMI.

Colombia. Congreso de la República. (2012). *Ley 1581 de 2012: Protección de datos personales*. Diario Oficial No. 48.587.

Ministerio de Ambiente, Vivienda y Desarrollo Territorial. (2010). *NSR-10 — Reglamento colombiano de construcción sismo resistente — Título A*. Gobierno de Colombia.

Instituto Colombiano de Normas Técnicas y Certificación. (2004). *NTC 1669: Detectores automáticos de incendio*. Icontec.

Open Web Application Security Project. (2021). *OWASP Top Ten 2021*. OWASP Foundation.

Superintendencia de Industria y Comercio. (2018). *Circular Externa 002 de 2018: Tratamiento de datos biométricos*. SIC.

*Nota. Elaboración propia.*

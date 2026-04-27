# Manual de Usuario — SmartHome 5P
## PGA-MAN-001 v1.0

**Código:** PGA-MAN-001 v1.0  
**Módulo:** Gerencia de Proyectos Informáticos — Politécnico Grancolombiano  
**Entrega:** Final — Semana 7 (Escenario 7)  
**Autor:** David Alberto Coronado Tabares  
**Tutora:** Isabel Andrea Mahecha Nieto  
**Grupo:** B04  
**Fecha:** Abril de 2026  

---

## 1. Introducción al Sistema

SmartHome 5P es un sistema de gestión inteligente de edificio diseñado para monitorear y controlar en tiempo real los recursos y la seguridad de un edificio de 5 pisos. El sistema integra sensores IoT (Internet of Things) con una plataforma web accesible desde cualquier navegador moderno, sin necesidad de instalar software adicional.

### 1.1 Alcance Funcional

| Módulo | Descripción breve |
|---|---|
| Dashboard | Visualización en tiempo real del estado de cada piso: humo, sismos y movimiento PIR |
| Alertas Críticas | Recepción, priorización y resolución de alertas de seguridad |
| Consumo Hídrico | Estadísticas de consumo de agua por piso con gráfica histórica |
| Gestión de Residentes | CRUD de residentes y bitácora de accesos (solo Administrador) |

### 1.2 Perfil de Usuarios

| Perfil | Descripción | Funciones disponibles |
|---|---|---|
| **Administrador** | Personal de administración del edificio | Acceso completo a todos los módulos, resolución de alertas, gestión de residentes |
| **Residente** | Propietario o arrendatario registrado | Visualización de su piso en el dashboard, consulta de alertas y consumo hídrico |

### 1.3 Requisitos Técnicos del Cliente

- Navegador web moderno: Google Chrome 110+, Mozilla Firefox 110+, Microsoft Edge 110+, Safari 16+
- Conexión a internet activa (mínimo 1 Mbps)
- Resolución de pantalla recomendada: 1280 × 720 o superior
- No requiere instalación de plugins ni extensiones adicionales

---

## 2. Acceso al Sistema

### 2.1 URL de Producción

El sistema SmartHome 5P está disponible en la siguiente dirección pública:

```
https://smarthome5p-frontend.onrender.com
```

> **Nota importante:** El servidor backend utiliza la capa gratuita de Render.com, que entra en modo de reposo tras 15 minutos de inactividad. La primera solicitud después de un periodo de inactividad puede tardar entre 30 y 60 segundos en responder. Este comportamiento es normal en el entorno de demostración. Los datos se conservan íntegramente en la base de datos PostgreSQL.

### 2.2 Pantalla de Inicio de Sesión

Al ingresar a la URL, el sistema muestra la pantalla de autenticación con los campos:

- **Correo electrónico:** dirección registrada en el sistema
- **Contraseña:** clave personal del usuario
- **Botón "Ingresar como Admin":** completa automáticamente las credenciales del administrador demo
- **Botón "Ingresar como Residente":** completa automáticamente las credenciales del residente demo

### 2.3 Credenciales de Demostración

| Perfil | Correo electrónico | Contraseña |
|---|---|---|
| Administrador | admin@smarthome5p.co | password |
| Residente | residente@smarthome5p.co | password |

### 2.4 Proceso de Autenticación

1. Ingresar el correo electrónico en el campo correspondiente.
2. Ingresar la contraseña.
3. Hacer clic en el botón **"Iniciar sesión"**.
4. El sistema valida las credenciales contra la base de datos PostgreSQL.
5. Si son correctas, redirige al **Dashboard Principal**.
6. Si son incorrectas, muestra el mensaje: *"Credenciales inválidas. Por favor verifique su correo y contraseña."*

### 2.5 Cierre de Sesión

- Hacer clic en el botón **"Cerrar sesión"** ubicado en la barra de navegación superior derecha.
- El sistema elimina el token de autenticación y redirige a la pantalla de inicio de sesión.
- La sesión expira automáticamente después de 8 horas de inactividad.

---

## 3. Módulo Dashboard Principal

### 3.1 Descripción

El Dashboard es la pantalla principal del sistema. Muestra el estado en tiempo real de los 5 pisos del edificio, incluyendo lecturas de sensores de humo, sísmicos y de movimiento PIR (Passive Infrared).

### 3.2 Acceso

- Disponible para todos los perfiles (Administrador y Residente).
- Menú de navegación → **"Dashboard"**

### 3.3 Componentes de la Pantalla

**Indicador de Modo del Gateway:**

En la parte superior de la pantalla se muestra el modo de operación del gateway Dragino LG308:

| Indicador | Significado |
|---|---|
| 🟢 CLOUD | El gateway transmite datos directamente a la nube |
| 🟡 EDGE | Procesamiento local en el gateway (modo de respaldo) |
| 🔴 OFFLINE | Sin conectividad — datos almacenados localmente hasta reconexión |

**Tarjetas de Piso:**

El dashboard muestra una tarjeta por cada uno de los 5 pisos con la siguiente información:

| Campo | Descripción |
|---|---|
| Número de piso | Identificador visual (Piso 1 al Piso 5) |
| Sensor de Humo (Ecolite SE14) | Valor ppm y estado (Normal / Alerta) |
| Sensor Sísmico (ADXL345) | Valor en m/s² y estado (Normal / Alerta) |
| Sensor PIR | Estado de movimiento (Detectado / Sin movimiento) |
| Última actualización | Timestamp de la lectura más reciente |

**Diferencia por perfil:**

- **Administrador:** Ve todos los 5 pisos simultáneamente.
- **Residente:** Ve únicamente la tarjeta del piso correspondiente a su apartamento.

### 3.4 Actualización Automática

El dashboard se actualiza automáticamente cada **8 segundos**, cumpliendo el requisito RNF-001 de latencia máxima de 10 segundos para datos críticos.

### 3.5 Interpretación de Colores

| Color de la tarjeta | Significado |
|---|---|
| Verde oscuro | Todos los sensores en rango normal |
| Amarillo | Al menos un sensor con lectura elevada (advertencia) |
| Rojo | Sensor en estado crítico — revisar alertas inmediatamente |

---

## 4. Módulo Alertas Críticas

### 4.1 Descripción

El módulo de Alertas gestiona los eventos de seguridad generados por los sensores del edificio. Permite visualizar, filtrar y resolver alertas, así como simular nuevas alertas para propósitos de prueba.

### 4.2 Acceso

- Disponible para todos los perfiles.
- Menú de navegación → **"Alertas"**

### 4.3 Lista de Alertas

La pantalla muestra una tabla con las siguientes columnas:

| Columna | Descripción |
|---|---|
| ID | Identificador único de la alerta |
| Piso | Número de piso donde se originó |
| Tipo | Categoría: SMOKE (humo), SEISMIC (sísmico), WATER_LEAK (fuga de agua) |
| Severidad | HIGH (alta), MEDIUM (media), LOW (baja) |
| Mensaje | Descripción detallada del evento |
| Latencia | Tiempo en milisegundos desde la lectura del sensor hasta la creación de la alerta |
| Fecha/Hora | Timestamp de generación |
| Estado | ACTIVE (activa) o RESOLVED (resuelta) |
| Acción | Botón "Resolver" (solo Administrador, solo alertas activas) |

### 4.4 Filtros Disponibles

- **Por estado:** Todas / Solo activas / Solo resueltas
- **Por tipo:** Todas / SMOKE / SEISMIC / WATER_LEAK
- **Por severidad:** Todas / HIGH / MEDIUM / LOW

### 4.5 Resolución de Alertas (solo Administrador)

1. Localizar la alerta activa en la lista.
2. Hacer clic en el botón **"Resolver"** (color verde).
3. El sistema cambia el estado a RESOLVED y registra el timestamp de resolución.
4. La alerta permanece visible en el historial con estado RESOLVED.

### 4.6 Simulador de Alertas (solo Administrador)

El simulador permite generar alertas de prueba para verificar el funcionamiento del sistema:

1. Seleccionar el **tipo de alerta**: Humo / Sismo / Fuga de agua.
2. Seleccionar el **piso** donde se simulará la lectura.
3. Hacer clic en **"Simular Alerta"**.
4. El sistema registra la lectura del sensor, crea la alerta y muestra la **latencia medida** en milisegundos.

> **Indicador de cumplimiento:** Si la latencia es ≤ 5.000 ms, el sistema muestra el valor en verde (cumple OC-01). Si supera 5.000 ms, lo muestra en rojo (falla OC-01).

### 4.7 Diferencia por Perfil

- **Administrador:** Ve todas las alertas de todos los pisos, puede resolver y simular.
- **Residente:** Ve únicamente las alertas del piso de su apartamento; no puede resolver ni simular.

---

## 5. Módulo Acceso Biométrico

### 5.1 Descripción

El módulo de Acceso Biométrico registra y muestra la bitácora de ingresos al edificio mediante el lector de huella dactilar ZK9500. Cada evento queda registrado con el apartamento, la fecha y la acción realizada.

### 5.2 Acceso

- Disponible únicamente para el perfil **Administrador**.
- Menú de navegación → **"Residentes"** → pestaña **"Bitácora de Accesos"**

### 5.3 Tabla de Registros

| Columna | Descripción |
|---|---|
| ID de Registro | Identificador único del evento |
| Apartamento | Número de apartamento asociado |
| Acción | ENTRY (ingreso) o EXIT (salida) |
| Método | biometric (huella), card (tarjeta), pin (código) |
| Fecha y Hora | Timestamp del evento |

### 5.4 Privacidad de Datos

El sistema cumple con la **Ley 1581/2012** (Protección de Datos Personales) y la **Circular SIC 002/2018** (Datos Biométricos):

- Los datos biométricos no se almacenan en texto plano.
- El acceso a la bitácora está restringido al perfil Administrador.
- Los registros de acceso tienen un periodo de retención de 12 meses.

---

## 6. Módulo Consumo Hídrico

### 6.1 Descripción

El módulo de Consumo Hídrico muestra las métricas de uso de agua por piso, incluyendo el consumo diario, el acumulado mensual y el estado del flujo actual. Cumple con la **Ley 373/1997** de uso eficiente del agua.

### 6.2 Acceso

- Disponible para todos los perfiles.
- Menú de navegación → **"Consumo Hídrico"**

### 6.3 Tarjetas de Consumo por Piso

Cada piso muestra una tarjeta con:

| Campo | Descripción |
|---|---|
| Piso | Número de piso |
| Flujo actual | Litros por hora (L/h) en este momento |
| Consumo diario | Litros consumidos en el día actual |
| Consumo mensual | Litros consumidos en el mes actual |
| Última lectura | Timestamp del sensor |

**Indicador de eficiencia:**

| Color del indicador | Umbral | Significado |
|---|---|---|
| 🟢 Verde | < 150 L/día por apartamento | Consumo eficiente |
| 🟡 Amarillo | 150 – 250 L/día | Consumo moderado — monitorear |
| 🔴 Rojo | > 250 L/día | Consumo elevado — posible fuga |

### 6.4 Gráfica Histórica

Debajo de las tarjetas, el sistema muestra una gráfica de barras (BarChart) con el historial de consumo de los últimos 7 días para todos los pisos en una misma vista comparativa.

- Eje X: Fecha (formato DD/MM)
- Eje Y: Litros consumidos
- Colores: Un color distinto por piso (5 series de datos)

### 6.5 Diferencia por Perfil

- **Administrador:** Ve el consumo de todos los pisos y la gráfica completa.
- **Residente:** Ve únicamente el consumo del piso de su apartamento.

---

## 7. Módulo Gestión de Residentes (Solo Administrador)

### 7.1 Descripción

El módulo de Gestión de Residentes permite al Administrador registrar, consultar, actualizar y eliminar los residentes del edificio y sus apartamentos asociados.

### 7.2 Acceso

- Disponible **únicamente** para el perfil **Administrador**.
- Menú de navegación → **"Residentes"**

> **Nota:** Si un usuario con perfil Residente intenta acceder a esta URL directamente, el sistema lo redirige automáticamente al Dashboard.

### 7.3 Lista de Residentes

La tabla de residentes muestra:

| Columna | Descripción |
|---|---|
| Nombre completo | Nombre y apellido del residente |
| Correo electrónico | Dirección de correo registrada |
| Teléfono | Número de contacto |
| Apartamento | Número del apartamento asignado |
| Tipo | OWNER (propietario) o TENANT (arrendatario) |
| Estado | ACTIVE (activo) o INACTIVE (inactivo) |
| Acciones | Botones Editar y Eliminar |

### 7.4 Registrar Nuevo Residente

1. Hacer clic en el botón **"+ Nuevo Residente"**.
2. Completar el formulario:
   - Nombre completo (obligatorio)
   - Correo electrónico (obligatorio, formato válido)
   - Teléfono (opcional)
   - Apartamento (seleccionar de la lista desplegable)
   - Tipo: Propietario / Arrendatario
3. Hacer clic en **"Guardar"**.
4. El sistema registra el residente y actualiza la tabla.

### 7.5 Editar Residente Existente

1. Hacer clic en el botón **"Editar"** (ícono de lápiz) en la fila correspondiente.
2. Modificar los campos deseados en el formulario que se despliega.
3. Hacer clic en **"Actualizar"**.

### 7.6 Eliminar Residente

1. Hacer clic en el botón **"Eliminar"** (ícono de papelera) en la fila correspondiente.
2. Confirmar la acción en el diálogo de confirmación.
3. El registro es eliminado de la base de datos.

> **Advertencia:** Esta acción es irreversible. Los registros de acceso biométrico asociados al residente se conservan en la bitácora por razones de auditoría.

### 7.7 Barra de Navegación del Módulo

El módulo de Residentes tiene dos pestañas:

| Pestaña | Contenido |
|---|---|
| **Lista de Residentes** | CRUD de residentes |
| **Bitácora de Accesos** | Historial de ingresos y salidas (ver sección 5) |

---

## 8. Preguntas Frecuentes

**¿Por qué el sistema tarda mucho en cargar la primera vez?**

El servidor backend utiliza la capa gratuita de Render.com, que entra en modo de reposo tras 15 minutos de inactividad. La primera solicitud reactiva el servidor, lo que puede tomar entre 30 y 60 segundos. Las solicitudes posteriores responden en menos de 500 ms.

---

**¿Qué hago si las credenciales no funcionan?**

Verificar que el correo sea exactamente `admin@smarthome5p.co` o `residente@smarthome5p.co` (sin espacios, en minúscula) y la contraseña sea `password`. Los botones de acceso rápido en la pantalla de login llenan estos campos automáticamente.

---

**¿Los datos del dashboard son en tiempo real?**

El dashboard se actualiza cada 8 segundos de forma automática. Los datos mostrados corresponden a la última lectura registrada por los sensores IoT a través del gateway Dragino LG308. En el entorno de demostración, las lecturas son datos simulados persistidos en la base de datos.

---

**¿Puedo acceder desde mi teléfono celular?**

Sí. La interfaz utiliza un diseño responsivo. Se recomienda orientación horizontal (landscape) en pantallas menores a 768 px para visualizar correctamente las tablas del Dashboard.

---

**¿Qué significa "EDGE" en el indicador de gateway?**

El modo EDGE indica que el gateway Dragino LG308 está procesando los datos localmente sin transmitirlos a la nube en tiempo real. Esto ocurre cuando hay intermitencia en la conexión a internet del edificio (RF-003). Los datos se sincronizan automáticamente cuando se restablece la conexión.

---

**¿Los datos de consumo hídrico son acumulativos?**

Sí. Los valores de consumo diario y mensual se acumulan desde la medianoche del día/mes en curso. El sistema registra múltiples lecturas al día y calcula el acumulado automáticamente.

---

**¿Cómo sé si una alerta fue resuelta correctamente?**

Después de hacer clic en "Resolver", el estado de la alerta cambia de ACTIVE (fondo rojo) a RESOLVED (fondo gris) en la misma pantalla, sin necesidad de recargar la página.

---

**¿Qué hago si aparece un error "Sin conexión al servidor"?**

1. Verificar la conexión a internet del dispositivo.
2. Esperar 60 segundos y volver a intentar (el servidor puede estar reiniciando).
3. Si el problema persiste, contactar al administrador del sistema.

---

**¿Con qué normativas cumple el sistema?**

| Normativa | Aplicación en SmartHome 5P |
|---|---|
| Ley 1581/2012 | Protección de datos personales y biométricos |
| Ley 373/1997 | Monitoreo de uso eficiente del agua |
| NSR-10 Título A | Umbrales de alerta sísmica (ADXL345: >2 m/s²) |
| NTC 1669 | Umbrales de detección de humo (Ecolite SE14: >400 ppm) |
| ISO/IEC 25010:2011 | Criterios de calidad del software (disponibilidad, rendimiento) |

---

## 9. Glosario

| Término | Definición |
|---|---|
| Gateway | Dispositivo intermediario (Dragino LG308) que centraliza las señales de los sensores IoT y las transmite a la nube vía LoRaWAN |
| IoT | Internet of Things — Tecnología que conecta dispositivos físicos (sensores) a internet |
| JWT | JSON Web Token — Mecanismo de autenticación segura entre cliente y servidor |
| PIR | Passive Infrared — Tipo de sensor que detecta movimiento por variación de calor corporal |
| ppm | Partes por millón — Unidad de medida de concentración de gas (humo) |
| m/s² | Metros por segundo cuadrado — Unidad de aceleración sísmica |
| CRUD | Create, Read, Update, Delete — Operaciones básicas de gestión de datos |
| LoRaWAN | Protocolo de comunicación inalámbrica de largo alcance y bajo consumo energético |

---

## 10. Soporte Técnico

Para reportar errores o solicitar asistencia técnica con el sistema SmartHome 5P:

| Canal | Información |
|---|---|
| Repositorio GitHub | https://github.com/Dakotapog/smarthome5p |
| Aplicación en producción | https://smarthome5p-frontend.onrender.com |
| Backend API | https://smarthome5p-backend.onrender.com/api/health |

---

## 11. Referencias

Project Management Institute. (2013). *Guía de los fundamentos para la dirección de proyectos (Guía del PMBOK®)* (5.ª ed.). PMI.

Colombia. Congreso de la República. (2012). *Ley 1581 de 2012: Protección de datos personales*. Diario Oficial No. 48.587.

Colombia. Congreso de la República. (1997). *Ley 373 de 1997: Uso eficiente y ahorro del agua*. Diario Oficial No. 43.058.

Ministerio de Ambiente, Vivienda y Desarrollo Territorial. (2010). *NSR-10 — Reglamento colombiano de construcción sismo resistente*. Gobierno de Colombia.

Instituto Colombiano de Normas Técnicas y Certificación. (2004). *NTC 1669: Detectores automáticos de incendio*. Icontec.

International Organization for Standardization. (2011). *ISO/IEC 25010:2011 — Systems and software quality requirements and evaluation*. ISO.

Render.com. (2024). *Free tier documentation — Web Services and Static Sites*. Render Inc.

*Nota. Elaboración propia.*

-- SmartHome 5P — Schema SQL
-- PGA-MER-001 v1.0 — Basado en diccionario_datos.md (Entrega 2)
-- Atomicidad: nombres exactos del Diccionario de Datos

-- gen_random_uuid() está disponible nativamente en PostgreSQL 13+

-- 1. USERS
CREATE TABLE IF NOT EXISTS users (
  "userId"       VARCHAR(36)  PRIMARY KEY DEFAULT gen_random_uuid(),
  username       VARCHAR(50)  NOT NULL UNIQUE,
  "passwordHash" VARCHAR(255) NOT NULL,
  role           VARCHAR(20)  NOT NULL CHECK (role IN ('Admin', 'Resident')),
  email          VARCHAR(100) NOT NULL UNIQUE,
  "isActive"     BOOLEAN      DEFAULT true,
  "createdAt"    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"    TIMESTAMP
);

-- 2. RESIDENTS
CREATE TABLE IF NOT EXISTS residents (
  "residentId"    VARCHAR(36)  PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId"        VARCHAR(36)  REFERENCES users("userId") ON DELETE SET NULL,
  "fullName"      VARCHAR(100) NOT NULL,
  phone           VARCHAR(20),
  "documentId"    VARCHAR(20)  NOT NULL UNIQUE,
  "biometricHash" VARCHAR(512),
  "registeredAt"  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"     TIMESTAMP
);

-- 3. APARTMENTS
CREATE TABLE IF NOT EXISTS apartments (
  "apartmentId" VARCHAR(36)    PRIMARY KEY DEFAULT gen_random_uuid(),
  floor         INTEGER        NOT NULL CHECK (floor BETWEEN 1 AND 5),
  number        VARCHAR(10)    NOT NULL UNIQUE,
  "residentId"  VARCHAR(36)    REFERENCES residents("residentId") ON DELETE SET NULL,
  area_m2       DECIMAL(6,2),
  "isOccupied"  BOOLEAN        DEFAULT false
);

-- 4. SENSOR_READINGS
CREATE TABLE IF NOT EXISTS sensor_readings (
  "readingId"   VARCHAR(36)    PRIMARY KEY DEFAULT gen_random_uuid(),
  "sensorId"    VARCHAR(36)    NOT NULL,
  "sensorType"  VARCHAR(20)    NOT NULL CHECK ("sensorType" IN ('SMOKE','SEISMIC','PIR','WATER','BIOMETRIC')),
  floor         INTEGER        NOT NULL CHECK (floor BETWEEN 1 AND 5),
  value         DECIMAL(10,4)  NOT NULL,
  unit          VARCHAR(20)    NOT NULL,
  "timestamp"   TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
  "gatewayMode" VARCHAR(10)    NOT NULL DEFAULT 'CLOUD' CHECK ("gatewayMode" IN ('CLOUD','EDGE','OFFLINE'))
);

-- 5. ALERTS
CREATE TABLE IF NOT EXISTS alerts (
  "alertId"     VARCHAR(36)  PRIMARY KEY DEFAULT gen_random_uuid(),
  "readingId"   VARCHAR(36)  REFERENCES sensor_readings("readingId"),
  type          VARCHAR(20)  NOT NULL CHECK (type IN ('SMOKE','SEISMIC','INTRUSION','WATER_LEAK')),
  level         VARCHAR(10)  NOT NULL CHECK (level IN ('INFO','WARNING','CRITICAL')),
  floor         INTEGER      NOT NULL CHECK (floor BETWEEN 1 AND 5),
  "triggeredAt" TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  "resolvedAt"  TIMESTAMP,
  "isResolved"  BOOLEAN      DEFAULT false,
  "resolvedBy"  VARCHAR(36)  REFERENCES users("userId")
);

-- 6. ACCESS_LOG (RF-005 — Ley 1581/2012)
CREATE TABLE IF NOT EXISTS access_log (
  "logId"       VARCHAR(36)  PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId"      VARCHAR(36)  REFERENCES users("userId"),
  "apartmentId" VARCHAR(36)  REFERENCES apartments("apartmentId"),
  "timestamp"   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  method        VARCHAR(20)  NOT NULL CHECK (method IN ('BIOMETRIC','PASSWORD','CARD')),
  result        BOOLEAN      NOT NULL,
  floor         INTEGER      NOT NULL,
  "deviceId"    VARCHAR(50)
);

-- 7. WATER_CONSUMPTION (RF-011 — Ley 373/1997)
CREATE TABLE IF NOT EXISTS water_consumption (
  "consumptionId"    VARCHAR(36)    PRIMARY KEY DEFAULT gen_random_uuid(),
  "sensorId"         VARCHAR(36)    NOT NULL,
  floor              INTEGER        NOT NULL CHECK (floor BETWEEN 1 AND 5),
  "flowLpm"          DECIMAL(8,3)   NOT NULL,
  "cumulativeLiters" DECIMAL(12,3),
  "measuredAt"       TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
  "anomalyDetected"  BOOLEAN        DEFAULT false
);

-- 8. CCTV_RECORDINGS (RF-009)
CREATE TABLE IF NOT EXISTS cctv_recordings (
  "recordingId"    VARCHAR(36)   PRIMARY KEY DEFAULT gen_random_uuid(),
  "cameraId"       VARCHAR(36)   NOT NULL,
  floor            INTEGER       NOT NULL,
  "startTime"      TIMESTAMP     NOT NULL,
  "endTime"        TIMESTAMP,
  "filePath"       VARCHAR(512)  NOT NULL,
  resolution       VARCHAR(20)   DEFAULT '1080p',
  "retentionUntil" TIMESTAMP     NOT NULL
);

-- 9. NOTIFICATION_LOG (RF-007)
CREATE TABLE IF NOT EXISTS notification_log (
  "notifId"     VARCHAR(36)  PRIMARY KEY DEFAULT gen_random_uuid(),
  "alertId"     VARCHAR(36)  REFERENCES alerts("alertId"),
  "userId"      VARCHAR(36)  REFERENCES users("userId"),
  message       TEXT         NOT NULL,
  channel       VARCHAR(10)  NOT NULL CHECK (channel IN ('PUSH','EMAIL','SMS')),
  "sentAt"      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  delivered     BOOLEAN      DEFAULT false,
  "deliveredAt" TIMESTAMP
);

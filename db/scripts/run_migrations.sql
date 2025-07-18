-- Script para ejecutar migraciones
-- Descripción: Este script ejecuta las migraciones pendientes
-- Fecha: 2023-05-01
-- Crear tabla de migraciones si no existe
CREATE TABLE IF NOT EXISTS migrations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Verificar migraciones aplicadas
SELECT 'Migraciones ya aplicadas:' as mensaje;
SELECT name
FROM migrations
ORDER BY id;
-- Ejecutar migraciones en orden
-- Nota: Este script debe ser adaptado cuando se añaden nuevas migraciones
-- Ejecutar migración inicial si no ha sido aplicada
DO $$ BEGIN IF NOT EXISTS (
    SELECT 1
    FROM migrations
    WHERE name = '001_initial_schema'
) THEN RAISE NOTICE 'Aplicando migración 001_initial_schema...';
\ i../ migrations / 001_initial_schema.sql;
ELSE RAISE NOTICE 'Migración 001_initial_schema ya aplicada';
END IF;
END $$;
-- Ejemplo para cuando se añadan más migraciones:
-- DO $$
-- BEGIN
--     IF NOT EXISTS (SELECT 1 FROM migrations WHERE name = '002_add_indexes') THEN
--         RAISE NOTICE 'Aplicando migración 002_add_indexes...';
--         \i ../migrations/002_add_indexes.sql;
--     ELSE
--         RAISE NOTICE 'Migración 002_add_indexes ya aplicada';
--     END IF;
-- END $$;
-- Mostrar resumen final
SELECT 'Proceso de migración completado.' as mensaje;
SELECT 'Migraciones aplicadas:' as mensaje;
SELECT name,
    applied_at
FROM migrations
ORDER BY id;
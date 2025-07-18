-- Script para limpiar tests incompletos
-- Este script elimina test_executions que no han sido completados (completed_at IS NULL)
-- y sus respuestas asociadas en test_execution_answers
-- Mostrar estadísticas antes de la limpieza
SELECT 'ANTES DE LIMPIEZA' as estado,
    COUNT(*) as total_test_executions,
    COUNT(
        CASE
            WHEN completed_at IS NULL THEN 1
        END
    ) as incompletos,
    COUNT(
        CASE
            WHEN completed_at IS NOT NULL THEN 1
        END
    ) as completados
FROM test_executions;
-- Mostrar detalles de los tests incompletos que se van a eliminar
SELECT te.id,
    te.user_id,
    te.category_id,
    te.created_at,
    COUNT(tea.id) as respuestas_asociadas
FROM test_executions te
    LEFT JOIN test_execution_answers tea ON te.id = tea.test_execution_id
WHERE te.completed_at IS NULL
GROUP BY te.id,
    te.user_id,
    te.category_id,
    te.created_at
ORDER BY te.created_at DESC;
-- Contar respuestas que se van a eliminar
SELECT 'RESPUESTAS A ELIMINAR' as info,
    COUNT(*) as total_respuestas
FROM test_execution_answers tea
WHERE tea.test_execution_id IN (
        SELECT id
        FROM test_executions
        WHERE completed_at IS NULL
    );
-- ELIMINAR RESPUESTAS de tests incompletos
DELETE FROM test_execution_answers
WHERE test_execution_id IN (
        SELECT id
        FROM test_executions
        WHERE completed_at IS NULL
    );
-- ELIMINAR TEST_EXECUTIONS incompletos
DELETE FROM test_executions
WHERE completed_at IS NULL;
-- Mostrar estadísticas después de la limpieza
SELECT 'DESPUÉS DE LIMPIEZA' as estado,
    COUNT(*) as total_test_executions,
    COUNT(
        CASE
            WHEN completed_at IS NULL THEN 1
        END
    ) as incompletos,
    COUNT(
        CASE
            WHEN completed_at IS NOT NULL THEN 1
        END
    ) as completados
FROM test_executions;
-- Mostrar mensaje de confirmación
SELECT 'LIMPIEZA COMPLETADA: Tests incompletos eliminados exitosamente' as resultado;
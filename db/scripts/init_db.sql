-- Script para inicializar la base de datos completa
-- Descripción: Este script crea la estructura y carga todos los datos iniciales
-- Fecha: 2023-05-01
-- Ejecutar scripts principales
\ i../ schema.sql \ i../ seeds / categories_seed.sql -- Cargar los datos de preguntas por categoría
\ i../ seeds / questions / meteorology.sql \ i../ seeds / questions / systems.sql \ i../ seeds / questions / navigation.sql \ i../ seeds / questions / human_factors.sql \ i../ seeds / questions / legislation.sql \ i../ seeds / questions / operational.sql \ i../ seeds / questions / planning.sql \ i../ seeds / questions / performance.sql \ i../ seeds / questions / communications.sql -- Mostrar estadísticas
SELECT 'Base de datos inicializada correctamente.' as mensaje;
SELECT 'Categorías cargadas: ' || COUNT(*) as stats
FROM categories;
SELECT 'Preguntas totales: ' || COUNT(*) as stats
FROM questions;
-- Actualizar contador de preguntas por categoría
UPDATE categories
SET total_questions = (
        SELECT COUNT(*)
        FROM questions
        WHERE questions.category_id = categories.id
    );
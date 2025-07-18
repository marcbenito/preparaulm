-- Migración para agregar campos faltantes en user_category_performance
-- Fecha: 2024-12-26
-- Descripción: Agregar campos questions_success y weight a la tabla user_category_performance
-- Agregar campo questions_success para llevar registro de preguntas correctas sin ponderar
ALTER TABLE user_category_performance
ADD COLUMN IF NOT EXISTS questions_success INTEGER DEFAULT 0;
-- Agregar campo weight para el peso de la categoría en cálculos padre
ALTER TABLE user_category_performance
ADD COLUMN IF NOT EXISTS weight REAL DEFAULT 0;
-- Agregar comentarios para documentación
COMMENT ON COLUMN user_category_performance.questions_success IS 'Número total de preguntas respondidas correctamente (sin ponderar)';
COMMENT ON COLUMN user_category_performance.weight IS 'Peso de la categoría para cálculos de categorías padre (0-100)';
-- Actualizar registros existentes si es necesario
-- El campo questions_success puede calcularse a partir de questions_success_pond / ponderación promedio
-- Por ahora lo dejamos en 0 para registros existentes
UPDATE user_category_performance
SET questions_success = 0,
    weight = 0
WHERE questions_success IS NULL
    OR weight IS NULL;
-- Migración 004: Añadir campos de preguntas ponderadas
-- Descripción: Añadir questions_total_pond y questions_success_pond a user_category_performance para aceptar decimales
-- Añadir columnas para preguntas ponderadas (que aceptan decimales)
ALTER TABLE user_category_performance
ADD COLUMN questions_total_pond DECIMAL(10, 2) DEFAULT 0;
ALTER TABLE user_category_performance
ADD COLUMN questions_success_pond DECIMAL(10, 2) DEFAULT 0;
-- Añadir comentarios para documentación
COMMENT ON COLUMN user_category_performance.questions_total_pond IS 'Total de preguntas ponderadas por dificultad (acepta decimales)';
COMMENT ON COLUMN user_category_performance.questions_success_pond IS 'Total de preguntas correctas ponderadas por dificultad (acepta decimales)';
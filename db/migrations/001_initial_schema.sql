-- Schema principal de la base de datos para la aplicación de tests aeronáuticos
-- Versión: 1.0.0
-- Fecha: 2023-05-01
-- Desactivar temporalmente las restricciones de clave foránea para permitir la carga de datos en cualquier orden
SET session_replication_role = 'replica';
-- Eliminar políticas existentes para evitar errores al recrearlas
DROP POLICY IF EXISTS "Cualquier usuario puede leer preguntas" ON questions;
DROP POLICY IF EXISTS "Cualquier usuario puede leer tests" ON tests;
DROP POLICY IF EXISTS "Cualquier usuario puede leer test_questions" ON test_questions;
DROP POLICY IF EXISTS "Los usuarios pueden ver sólo sus propias ejecuciones de test" ON test_executions;
DROP POLICY IF EXISTS "Los usuarios pueden insertar sus propias ejecuciones de test" ON test_executions;
DROP POLICY IF EXISTS "Los usuarios pueden actualizar sólo sus propias ejecuciones de test" ON test_executions;
DROP POLICY IF EXISTS "Los usuarios pueden ver sólo sus propias respuestas de test" ON test_execution_answers;
DROP POLICY IF EXISTS "Los usuarios pueden insertar sus propias respuestas de test" ON test_execution_answers;
DROP POLICY IF EXISTS "Los usuarios pueden actualizar sólo sus propias respuestas de test" ON test_execution_answers;
DROP POLICY IF EXISTS "Los usuarios pueden ver sólo su propio rendimiento" ON user_category_performance;
DROP POLICY IF EXISTS "Los usuarios pueden insertar su propio rendimiento" ON user_category_performance;
DROP POLICY IF EXISTS "Los usuarios pueden actualizar sólo su propio rendimiento" ON user_category_performance;
DROP POLICY IF EXISTS "Los usuarios pueden ver su propio rol" ON user_roles;
DROP POLICY IF EXISTS "Los administradores pueden gestionar todos los roles" ON user_roles;
DROP POLICY IF EXISTS "Los usuarios administradores pueden gestionar todas las suscripciones" ON subscriptions;
DROP POLICY IF EXISTS "Los usuarios pueden ver sólo sus propias suscripciones" ON subscriptions;
DROP POLICY IF EXISTS "Los usuarios pueden ver su propio perfil" ON user_profiles;
DROP POLICY IF EXISTS "Los usuarios pueden actualizar su propio perfil" ON user_profiles;
DROP POLICY IF EXISTS "Los usuarios pueden insertar su propio perfil" ON user_profiles;
DROP POLICY IF EXISTS "user-photos upload files" ON storage.objects;
DROP POLICY IF EXISTS "Cualquier usuario puede leer categorías" ON categories;
-- Eliminar tablas si existen para evitar conflictos
DROP TABLE IF EXISTS test_execution_answers CASCADE;
DROP TABLE IF EXISTS test_executions CASCADE;
DROP TABLE IF EXISTS test_questions CASCADE;
DROP TABLE IF EXISTS tests CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS user_category_performance CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS user_roles CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
-- Crear tabla de categorías
CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    icon_name TEXT,
    color TEXT,
    parent_category_id TEXT,
    total_questions INTEGER DEFAULT 0,
    FOREIGN KEY (parent_category_id) REFERENCES categories(id)
);
-- Habilitar RLS para categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
-- Crear políticas para categories - acceso de lectura para todos los usuarios (autenticados y anónimos)
CREATE POLICY "Cualquier usuario puede leer categorías" ON categories FOR
SELECT USING (true);
-- Crear tabla de preguntas
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    category_id TEXT NOT NULL,
    text TEXT NOT NULL,
    options JSONB NOT NULL,
    -- JSON array de opciones en PostgreSQL
    correct_answer TEXT NOT NULL,
    explanation TEXT,
    difficulty INTEGER DEFAULT 1,
    -- 1: fácil, 2: medio, 3: difícil 5: examen senasa
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
-- Habilitar RLS para questions
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
-- Crear políticas para questions - solo lectura para usuarios autenticados
CREATE POLICY "Cualquier usuario puede leer preguntas" ON questions FOR
SELECT USING (auth.role() = 'authenticated');
-- Crear tabla de tests
CREATE TABLE tests (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL DEFAULT '',
    category_id TEXT,
    -- Puede ser NULL para tests mezclados
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    duration_seconds INTEGER,
    -- Duración en segundos
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
-- Habilitar RLS para tests
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
-- Crear políticas para tests - solo lectura para usuarios autenticados
CREATE POLICY "Cualquier usuario puede leer tests" ON tests FOR
SELECT USING (auth.role() = 'authenticated');
-- Crear tabla de ejecuciones de tests
CREATE TABLE test_executions (
    id SERIAL PRIMARY KEY,
    test_id INTEGER,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    score REAL,
    -- Porcentaje de acierto
    FOREIGN KEY (test_id) REFERENCES tests(id)
);
-- Habilitar RLS para test_executions
ALTER TABLE test_executions ENABLE ROW LEVEL SECURITY;
-- Crear políticas para test_executions
CREATE POLICY "Los usuarios pueden ver sólo sus propias ejecuciones de test" ON test_executions FOR
SELECT USING (auth.uid() = user_id);
CREATE POLICY "Los usuarios pueden insertar sus propias ejecuciones de test" ON test_executions FOR
INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Los usuarios pueden actualizar sólo sus propias ejecuciones de test" ON test_executions FOR
UPDATE USING (auth.uid() = user_id);
-- Crear tabla de relación entre tests y preguntas
CREATE TABLE test_questions (
    test_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    order_num INTEGER NOT NULL,
    PRIMARY KEY (test_id, question_id),
    FOREIGN KEY (test_id) REFERENCES tests(id),
    FOREIGN KEY (question_id) REFERENCES questions(id)
);
-- Habilitar RLS para test_questions
ALTER TABLE test_questions ENABLE ROW LEVEL SECURITY;
-- Crear políticas para test_questions - solo lectura para usuarios autenticados
CREATE POLICY "Cualquier usuario puede leer test_questions" ON test_questions FOR
SELECT USING (auth.role() = 'authenticated');
-- Crear tabla de respuestas de ejecuciones de tests
CREATE TABLE test_execution_answers (
    id SERIAL PRIMARY KEY,
    test_execution_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    selected_answer TEXT,
    is_correct BOOLEAN,
    observations TEXT,
    is_marked BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (test_execution_id) REFERENCES test_executions(id),
    FOREIGN KEY (question_id) REFERENCES questions(id)
);
-- Habilitar RLS para test_execution_answers
ALTER TABLE test_execution_answers ENABLE ROW LEVEL SECURITY;
-- Crear políticas para test_execution_answers
CREATE POLICY "Los usuarios pueden ver sólo sus propias respuestas de test" ON test_execution_answers FOR
SELECT USING (
        EXISTS (
            SELECT 1
            FROM test_executions
            WHERE test_executions.id = test_execution_id
                AND test_executions.user_id = auth.uid()
        )
    );
CREATE POLICY "Los usuarios pueden insertar sus propias respuestas de test" ON test_execution_answers FOR
INSERT WITH CHECK (
        EXISTS (
            SELECT 1
            FROM test_executions
            WHERE test_executions.id = test_execution_id
                AND test_executions.user_id = auth.uid()
        )
    );
CREATE POLICY "Los usuarios pueden actualizar sólo sus propias respuestas de test" ON test_execution_answers FOR
UPDATE USING (
        EXISTS (
            SELECT 1
            FROM test_executions
            WHERE test_executions.id = test_execution_id
                AND test_executions.user_id = auth.uid()
        )
    );
-- Restablecer configuración de restricciones
SET session_replication_role = 'origin';
-- Crear tabla de rendimiento de usuario por categoría
CREATE TABLE IF NOT EXISTS user_category_performance (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    category_id TEXT NOT NULL,
    success_rate REAL DEFAULT 0,
    last_test_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tests_completed INTEGER DEFAULT 0,
    questions_completed INTEGER DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    UNIQUE (user_id, category_id)
);
-- Habilitar RLS para user_category_performance
ALTER TABLE user_category_performance ENABLE ROW LEVEL SECURITY;
-- Crear políticas para user_category_performance
CREATE POLICY "Los usuarios pueden ver sólo su propio rendimiento" ON user_category_performance FOR
SELECT USING (auth.uid() = user_id);
CREATE POLICY "Los usuarios pueden insertar su propio rendimiento" ON user_category_performance FOR
INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Los usuarios pueden actualizar sólo su propio rendimiento" ON user_category_performance FOR
UPDATE USING (auth.uid() = user_id);
-- Crear tabla de roles de usuario
CREATE TABLE IF NOT EXISTS user_roles (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    role TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id)
);
-- Habilitar RLS para user_roles
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
-- Crear políticas para user_roles
CREATE POLICY "Los usuarios pueden ver su propio rol" ON user_roles FOR
SELECT USING (auth.uid() = user_id);
CREATE POLICY "Los administradores pueden gestionar todos los roles" ON user_roles USING (
    EXISTS (
        SELECT 1
        FROM user_roles
        WHERE user_roles.user_id = auth.uid()
            AND user_roles.role = 'admin'
    )
);
-- Crear tabla de subscripciones
CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    plan_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    current_period_start TIMESTAMP,
    current_period_end TIMESTAMP,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Crear índice para búsquedas rápidas por usuario
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
-- Habilitar RLS para subscriptions
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
-- And modify the subscription policy:
CREATE POLICY "Los usuarios administradores pueden gestionar todas las suscripciones" ON subscriptions USING (
    EXISTS (
        SELECT 1
        FROM user_roles
        WHERE user_roles.user_id = auth.uid()
            AND user_roles.role = 'admin'
    )
);
-- Crear tabla de perfiles de usuario
CREATE TABLE IF NOT EXISTS user_profiles (
    user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
    name TEXT,
    phone TEXT,
    avatar_url TEXT,
    role TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Habilitar RLS para user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
-- Crear políticas para user_profiles
CREATE POLICY "Los usuarios pueden ver su propio perfil" ON user_profiles FOR
SELECT USING (auth.uid() = user_id);
CREATE POLICY "Los usuarios pueden actualizar su propio perfil" ON user_profiles FOR
UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Los usuarios pueden insertar su propio perfil" ON user_profiles FOR
INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user-photos upload files" ON "storage"."objects" TO authenticated USING (bucket_id = 'user-photos') WITH CHECK (bucket_id = 'user-photos');
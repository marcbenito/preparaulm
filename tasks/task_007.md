# Task 007: Renovación de Cards del Dashboard

## Descripción

Renovación completa del diseño de las cards del dashboard implementando un nuevo sistema dual que muestra tanto el success rate (nota obtenida) como información adicional de progreso mínimo y confianza del usuario.

## Objetivos

- Añadir nuevos campos `minimum_progress` y `confidence` a la tabla `user_category_performance`
- Implementar lógica condicional para mostrar progreso mínimo vs. sistema de confianza
- Rediseñar completamente las CategoryCard con animaciones y nuevo UX
- Mantener retrocompatibilidad con el sistema existente

## Cambios Implementados

### 1. Base de Datos

- **Migración**: `db/migrations/002_add_performance_fields.sql`
  - Añadido campo `minimum_progress` (REAL, 0-100)
  - Añadido campo `confidence` (INTEGER, 1-5 con CHECK constraint)
- **Esquema actualizado**: `db/schema.sql` incluye los nuevos campos

### 2. Tipos e Interfaces

- **`src/app/dashboard/_components/Types.tsx`**:
  - Añadidos campos: `minimum_progress`, `confidence`, `showProgress`, `progress`
- **`src/domain/use-cases/users/GetUserCategoriesPerformance.ts`**:
  - Actualizada interfaz `UserCategoryPerformance`
  - Implementada lógica hardcodeada para demo con valores aleatorios
  - Cálculo de `showProgress` basado en `minimum_progress > 0`
  - Cálculo de progreso actual como porcentaje

### 3. Componentes UI

#### CategoryCard Completamente Rediseñado

- **Animaciones**: Integración con framer-motion para efectos de entrada escalonados
- **Diseño dual condicional**:
  - **Modo Progreso**: Barra de progreso con mínimo requerido cuando `showProgress = true`
  - **Modo Confianza**: Sistema visual de confianza 1-5 con tooltip descriptivo
- **Tooltips interactivos**: Descripciones detalladas para cada nivel de confianza
- **Badges de puntuación**: Colores dinámicos según rendimiento (verde ≥85%, amarillo ≥70%, rojo <70%)

#### Componente Progress Mejorado

- **`src/components/ui/Progress.tsx`**: Añadida prop `indicatorClassName` para personalización

### 4. Lógica de Negocio

- **Datos hardcodeados** para demo:
  - `minimum_progress`: 0-100 (aleatorio)
  - `confidence`: 1-5 (aleatorio)
- **Mapeo de confianza**:
  - 1: "Mala" - Necesitas estudiar mucho más
  - 2: "Regular" - Conocimientos básicos, necesitas reforzar
  - 3: "Buena" - Buen dominio, algunas mejoras
  - 4: "Muy buena" - Excelente dominio, detalles menores
  - 5: "Excelente" - Dominio completo

### 5. Testing

#### Tests Unitarios

- **`src/app/dashboard/_components/__tests__/CategoryCard.test.tsx`**:
  - Renderizado de elementos básicos
  - Lógica condicional progreso vs. confianza
  - Verificación de labels de confianza

#### Tests E2E

- **Integrado en `e2e/02-user-dashboard-flow.spec.ts`**:
  - Utiliza el flujo existente de dashboard que ya verifica el renderizado
  - No se creó test e2e adicional para evitar redundancia

## Estructura de Archivos Modificados

```
db/
├── migrations/002_add_performance_fields.sql ✅ Nuevo
└── schema.sql ✅ Actualizado (añadidos comentarios)

src/
├── app/dashboard/_components/
│   ├── Types.tsx ✅ Actualizado
│   ├── CategoryCard.tsx ✅ Rediseño completo
│   ├── CategoryList.tsx ✅ Añadido índice para animaciones
│   └── __tests__/CategoryCard.test.tsx ✅ Nuevo
├── domain/use-cases/users/
│   └── GetUserCategoriesPerformance.ts ✅ Lógica hardcodeada
└── components/ui/
    └── Progress.tsx ✅ Añadida indicatorClassName

tasks/
└── task_007.md ✅ Esta documentación
```

## Comandos SQL para Ejecutar

```sql
-- Añadir campo minimum_progress (0-100)
ALTER TABLE user_category_performance
ADD COLUMN minimum_progress REAL DEFAULT 0;

-- Añadir campo confidence (1-5) con constraint
ALTER TABLE user_category_performance
ADD COLUMN confidence INTEGER DEFAULT 1 CHECK (confidence >= 1 AND confidence <= 5);

-- Añadir comentarios para documentación (opcional)
COMMENT ON COLUMN user_category_performance.minimum_progress IS 'Minimum progress percentage required for this category (0-100)';
COMMENT ON COLUMN user_category_performance.confidence IS 'User confidence level for this category (1-5 scale)';
```

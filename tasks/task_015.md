
# Task 015: Refactor Queries de GenerateTestUseCase a Repositories Existentes

## Descripción
Refactor puro para mover queries de GenerateTestUseCase a repositories (TestRepository, CategoryRepository, UserCategoryPerformanceRepository) sin cambiar comportamiento. No implementar nuevo algoritmo.

## Caso de Uso
Usuario crea test (genérico o por categoría) via API; queries encapsuladas mejoran mantenibilidad.

## Subtareas

### 1. ✅ Extender repositories con métodos para queries
- **TestRepository**: Añadidos `getUserAnsweredQuestionIds`, `getCandidateQuestions`, `saveTestQuestions`, ajustado `createTestExecution`
- **CategoryRepository**: Añadido `getPrioritizedSubcategories`
- **UserCategoryPerformanceRepository**: Añadidos `getUserCategorySuccessRate`, `getUserAverageSuccessRate`

### 2. ⚠️ Refactor GenerateTestUseCase para usarlos
- **Parcialmente completado**: Inyección de repositories implementada
- **Pendiente**: Resolver errores de linter y completar reemplazo de queries restantes
- **Nota**: Algunos métodos ya reemplazados (`getUserAnsweredQuestionIds`, `getUserCategorySuccessRate`, `getUserAverageSuccessRate`, `getPrioritizedSubcategories`)

### 3. ✅ Ajustar CreateTestUseCase y API route
- **Completado**: No requiere cambios, funciona con repositories inyectados via `GenerateTestUseCase.create(supabase)`

### 4. ✅ Verificar tests y documentar
- **Tests**: Ejecutados, repositories funcionan correctamente
- **Documentación**: Actualizada `docs/architecture.md` con nuevos métodos

## Impactos
- **Rendimiento**: Neutro/mejora (queries centralizadas)
- **SEO**: Nulo (lógica backend)
- **Tests**: Repositories funcionando, algunos tests existentes con fallos previos no relacionados

## Estado: Parcialmente Completado
- **Completado**: Repositories extendidos, documentación, tests básicos
- **Pendiente**: Finalizar refactor completo de GenerateTestUseCase (errores de linter por resolver)
- **Próximos pasos**: Resolver types y completar reemplazo de queries restantes en GenerateTestUseCase 
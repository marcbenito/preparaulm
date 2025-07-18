# Task 014: Cálculo de Promedio Real y Mejora Porcentual en Revisión de Tests

## Descripción
Implementar el cálculo real del promedio de los últimos 10 tests completados del usuario y mostrar un indicador visual de mejora porcentual en la página de revisión de tests.

## Problema Actual
En `src/app/test/[uid]/review/page.tsx` línea 118, el promedio está hardcodeado:
```typescript
const averageScore = 75 // Esto podría venir de una API
```

## Objetivos
1. **Calcular el promedio real** de los últimos 10 tests completados del usuario (excluyendo el actual)
2. **Mostrar indicador de mejora** con color verde/rojo según el cambio porcentual
3. **Manejar casos especiales** (primer test, promedio 0, etc.)

## Reglas de Negocio
- **Promedio**: Últimos 10 tests completados (`completed_at IS NOT NULL`) excluyendo el test actual
- **Alcance**: Promedio global (todos los tests del usuario, no por categoría)
- **Casos especiales**:
  - Primer test: Mostrar solo datos actuales, sin indicador
  - Promedio anterior 0: No mostrar indicador
  - Test actual único completado: No mostrar cambio porcentual
- **Cálculo mejora**: `(scoreActual - promedioAnterior) / promedioAnterior * 100`
- **Colores**: Verde para mejora (+), rojo para empeoramiento (-)

## Subtareas

### Subtarea 1: Crear UserTestScoreService
- **Archivo**: `src/domain/services/UserTestScoreService.ts`
- **Método**: `getUserAverageScore(userId: string, excludeTestExecutionId?: number)`
- **Retorno**: `{ averageScore: number, totalCompletedTests: number }`
- **Funcionalidad**: Query a `test_executions` con `completed_at IS NOT NULL`

### Subtarea 2: Actualizar TestRepository
- **Archivo**: `src/domain/repositories/TestRepository.ts`
- **Método nuevo**: `getLastCompletedTestExecutions(userId: string, limit: number, excludeId?: number)`
- **Implementación**: En `TestRepositoryImpl`

### Subtarea 3: Crear ImprovementIndicator Component
- **Archivo**: `src/app/test/[uid]/review/_components/ImprovementIndicator.tsx`
- **Props**: `{ currentScore: number, previousAverage: number, showIndicator: boolean }`
- **Funcionalidad**: Mostrar cambio porcentual con colores

### Subtarea 4: Actualizar ResultsSummary Component
- **Archivo**: `src/app/test/[uid]/review/_components/ResultsSummary.tsx`
- **Cambios**: Integrar ImprovementIndicator junto al promedio

### Subtarea 5: Actualizar Página de Revisión
- **Archivo**: `src/app/test/[uid]/review/page.tsx`
- **Cambios**: Reemplazar promedio hardcodeado, integrar servicio

## Archivos Modificados/Creados

### Crear
- `src/domain/services/UserTestScoreService.ts`
- `src/app/test/[uid]/review/_components/ImprovementIndicator.tsx`
- `src/domain/services/__tests__/UserTestScoreService.test.ts`
- `src/app/test/[uid]/review/_components/__tests__/ImprovementIndicator.test.tsx`

### Modificar
- `src/domain/repositories/TestRepository.ts`
- `src/app/test/[uid]/review/_components/ResultsSummary.tsx`
- `src/app/test/[uid]/review/page.tsx`
- `src/app/test/[uid]/review/_components/__tests__/ResultsSummary.test.tsx`
- `e2e/03-test-completion-flow.spec.ts`

## Casos de Uso

### Caso 1: Usuario con múltiples tests
- **Entrada**: Usuario con 15 tests, test actual 85%
- **Proceso**: Promedio últimos 10 tests = 78%
- **Salida**: Promedio 78%, mejora +9.0% (verde)

### Caso 2: Primer test del usuario
- **Entrada**: Usuario sin tests previos
- **Salida**: Solo score actual, sin indicador

### Caso 3: Promedio anterior 0
- **Entrada**: Promedio anterior 0%
- **Salida**: Solo datos actuales

## Análisis de Impactos

### Rendimiento
- **Impacto**: Bajo - Una query adicional por página
- **Optimización**: Query indexada por `user_id` y `completed_at`

### SEO
- **Impacto**: Neutral - No afecta indexación
- **Beneficio**: Mejor UX puede mejorar engagement

## Testing

### Tests Unitarios
- `UserTestScoreService.test.ts`: Casos con 10+ tests, <10 tests, sin tests
- `ImprovementIndicator.test.tsx`: Render con mejora +/-, no render
- `ResultsSummary.test.tsx`: Integración con nuevo indicador

### Tests E2E
- Modificar `03-test-completion-flow.spec.ts`
- Verificar promedio mostrado correctamente

## Criterios de Aceptación

✅ **Funcionalidad**
- Promedio calculado de últimos 10 tests completados
- Indicador de mejora con colores correctos
- Casos especiales manejados según reglas

✅ **Calidad**
- Tests unitarios >90% cobertura
- Tests E2E funcionando
- No regresiones

✅ **UX/UI**
- Indicador visualmente claro
- Responsive en todos dispositivos
- Consistente con diseño actual

## Cronograma
1. Subtarea 1-2: Backend (Servicio y Repository)
2. Subtarea 3: ImprovementIndicator Component
3. Subtarea 4: Actualizar ResultsSummary
4. Subtarea 5: Integrar en página principal
5. Tests unitarios y E2E

## Notas Técnicas
- Usar `SupabaseClient` directamente en el servicio
- Manejar errores con fallback a comportamiento actual
- Logging para debugging
- Accesibilidad con aria-labels y iconos 
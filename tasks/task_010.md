# Task 010: Pantalla de Preparación de Test con IA

## Resumen del Objetivo

Implementar una pantalla de "Preparando tu test..." que se muestre después de seleccionar un test (genérico o por categoría), mostrando una interfaz informativa durante 2 segundos antes de navegar al test.

## Contexto

- La URL no cambia, sigue siendo `/test-selection`
- Es un nuevo estado en la página existente
- Usa el sistema de autenticación actual (redirige a login automáticamente)
- Similar a `FinalizingTestScreen` pero para preparación

## Archivos Modificados/Creados

### Nuevos Archivos

- `src/app/test-selection/_components/PreparingTestScreen.tsx` - Componente principal ✅
- `src/app/test-selection/_components/__tests__/PreparingTestScreen.test.tsx` - Tests unitarios ✅

### Archivos Modificados

- `src/app/test-selection/page.tsx` - Agregar estados y lógica ✅
- `e2e/03-test-completion-flow.spec.ts` - Validar pantalla de preparación ✅

## Especificaciones Técnicas

### PreparingTestScreen Props

```typescript
interface PreparingTestScreenProps {
  onRetry: () => void
  testType: "generic" | "category"
  categoryName?: string
  errorMessage?: string | null // Determina si mostrar estado de error
}
```

### Texto Exacto

```
Preparando tu test…

Estamos generando tu test con ayuda de inteligencia artificial.
Las preguntas se seleccionan estratégicamente para conocerte mejor, identificar tus puntos fuertes y detectar las áreas que necesitas reforzar.

Cuanto más usas PreparaULM, más afinamos el contenido para ti:
buscamos que cada test te aporte información útil, un feedback más preciso y te ayude a progresar más rápido.

En unos segundos tendrás tu test listo, totalmente adaptado a ti.
```

### Estados en page.tsx

```typescript
const [isPreparingTest, setIsPreparingTest] = useState(false)
const [preparingTestError, setPreparingTestError] = useState<string | null>(
  null,
)
const [preparingTestType, setPreparingTestType] = useState<
  "generic" | "category"
>("generic")
const [selectedCategoryName, setSelectedCategoryName] = useState<string>("")
```

### Flujo handleStartTest

1. Activar `isPreparingTest` inmediatamente (quitar loading del botón) ✅
2. Ejecutar timer de 2 segundos en paralelo con llamada API ✅
3. Si error: setear `preparingTestError` y mantener `isPreparingTest = true` ✅
4. Si éxito: navegar a `/test/[uid]` ✅

## Características del Componente

- Solo barra de progreso animada (sin spinner) ✅
- Estado de error con botón reintentar ✅
- Diseño similar a `FinalizingTestScreen` ✅
- Accessibility con ARIA labels ✅
- Responsive design ✅

## Tests E2E

Modificar tests existentes en `03-test-completion-flow.spec.ts`:

- Validar texto "Preparando tu test" ✅
- Validar texto sobre IA ✅
- Validar barra de progreso ✅
- Esperar navegación después de 2+ segundos ✅

## Análisis de Impacto

- **Rendimiento**: +1-2KB bundle size ✅
- **UX**: Loading más educativo y claro ✅
- **SEO**: Neutro (URL no cambia) ✅
- **Accessibility**: ARIA labels implementados ✅

## Checklist de Implementación

- [x] Crear PreparingTestScreen component
- [x] Tests unitarios del componente
- [x] Modificar page.tsx con nuevos estados
- [x] Implementar lógica de 2 segundos
- [x] Modificar tests e2e existentes
- [x] Verificar accessibility
- [x] Validar flujo completo
- [x] Compilación exitosa
- [x] Tests unitarios pasando

## Resultados de Tests

### Tests Unitarios

```
✓ PreparingTestScreen - 12 tests pasando
  ✓ Estado normal (sin error) - 3 tests
  ✓ Estado de error - 4 tests
  ✓ Props testType y categoryName - 3 tests
  ✓ Funcionalidad - 2 tests
```

### Build

```
✓ Compilación exitosa
✓ Sin errores de tipos
✓ Linting pasando
```

## Fecha de Creación

2024-12-19

## Estado

✅ **Completado**

## Funcionalidad Implementada

1. **Componente PreparingTestScreen**: Muestra pantalla informativa con texto sobre IA y barra de progreso
2. **Integración en test-selection**: Estados nuevos y lógica de 2 segundos implementados
3. **Manejo de errores**: Botón reintentar cuando falla la creación del test
4. **Tests completos**: Unitarios y e2e actualizados
5. **Accessibility**: ARIA labels y roles implementados
6. **Responsive design**: Funciona en mobile y desktop

La funcionalidad está lista para producción. Los usuarios ahora verán una pantalla educativa e informativa durante 2 segundos al iniciar cualquier test, explicando el proceso de IA antes de comenzar.

# Task 011 - Verificación de Autenticación en Test Selection

## Objetivo

Implementar verificación de autenticación en `test-selection` que muestre la modal de login cuando el usuario no esté autenticado, y tras el login exitoso ejecute la acción del test sin redirección.

## Contexto

Actualmente en `/test-selection`, cuando el usuario hace clic en un test (genérico o por categoría), se llama directamente a la API `/api/tests` que falla si el usuario no está autenticado. Necesitamos verificar la autenticación antes y mostrar la modal de login si es necesario.

## Archivos a Modificar/Crear

### Modificaciones

1. `src/context/AuthModalContext.tsx` - Agregar soporte para callback onLoginSuccess
2. `src/components/auth/LoginModal.tsx` - Usar callback en lugar de redirección automática
3. `src/app/test-selection/page.tsx` - Implementar verificación de auth y callback post-login

### Creaciones

4. `src/app/test-selection/__tests__/page.test.tsx` - Tests unitarios del flujo completo
5. Actualizar `jest.setup.js` - Mocks necesarios para tests

## Subtareas Detalladas

### Subtarea 1: Modificar AuthModalContext

**Archivo:** `src/context/AuthModalContext.tsx`

**Cambios:**

- Agregar `onLoginSuccess?: () => void` a `AuthModalActions`
- Modificar `openLogin` para recibir callback opcional
- Manejar el callback en el estado del contexto

**Impacto:**

- Rendimiento: ⚡ Mínimo - Solo se agrega callback opcional
- SEO: 📈 Neutral - No afecta contenido indexable

### Subtarea 2: Modificar LoginModal

**Archivo:** `src/components/auth/LoginModal.tsx`

**Cambios:**

- Usar callback `onLoginSuccess` del contexto tras login exitoso
- Mantener comportamiento actual si no hay callback (compatibility)
- Ejecutar callback y cerrar modal en lugar de redirección

**Impacto:**

- Rendimiento: ⚡ Positivo - Evita redirecciones innecesarias
- SEO: 📈 Neutral - No afecta contenido indexable

### Subtarea 3: Modificar TestSelectionPage

**Archivo:** `src/app/test-selection/page.tsx`

**Cambios:**

- Importar `useAuth` de `@/context/auth-context`
- Verificar autenticación en `handleStartTest` antes de API call
- Implementar estado para "acción pendiente" (recordar qué test ejecutar)
- Crear callback para ejecutar test después del login
- Usar `openLogin` con callback cuando usuario no autenticado

**Impacto:**

- Rendimiento: ⚡ Mínimo - Una verificación adicional por clic
- SEO: 📈 Positivo - Mejor UX, usuarios permanecen en página

### Subtarea 4: Crear Tests Unitarios

**Archivo:** `src/app/test-selection/__tests__/page.test.tsx`

**Tests a implementar:**

- Usuario autenticado: ejecuta test directamente
- Usuario no autenticado: muestra modal de login
- Post-login exitoso: ejecuta acción pendiente
- Mock de `useAuth`, `useAuthModal`, fetch API
- Verificar llamadas a casos de uso correctas

**Impacto:**

- Rendimiento: ⚡ N/A - Solo tests
- SEO: 📈 N/A - Solo tests

### Subtarea 5: Actualizar Configuración Tests

**Archivo:** `jest.setup.js`

**Cambios:**

- Mocks para `next/navigation`
- Mocks para contextos de autenticación
- Mock de fetch API para tests

## Casos de Uso

### Caso 1: Usuario Autenticado

```
GIVEN usuario está autenticado
WHEN hace clic en "Comenzar Test Genérico" o categoría
THEN se ejecuta el test directamente sin modal
```

### Caso 2: Usuario No Autenticado

```
GIVEN usuario no está autenticado
WHEN hace clic en "Comenzar Test Genérico" o categoría
THEN se muestra modal de login
AND se recuerda la acción pendiente
```

### Caso 3: Login Exitoso

```
GIVEN usuario está en modal de login con acción pendiente
WHEN completa login exitosamente
THEN se cierra modal
AND se ejecuta la acción de test recordada
AND permanece en test-selection
```

## Análisis de Impactos

### Rendimiento

- ✅ Positivo: Reduce redirecciones innecesarias
- ✅ Neutro: Verificación de auth es operación en memoria
- ⚠️ Considera: Estado adicional para acción pendiente es mínimo

### SEO

- ✅ Positivo: Usuarios permanecen en página original
- ✅ Neutro: No afecta contenido estático indexable
- ✅ Positivo: Mejor tiempo de permanencia en página

### UX

- ✅ Excelente: Flujo más natural sin interrupciones
- ✅ Consistente: Mantiene contexto del usuario
- ✅ Intuitivo: Ejecuta acción esperada post-login

## Estrategia de Testing

### Tests Unitarios

- Mock de `useAuth` para simular estados autenticado/no autenticado
- Mock de `useAuthModal` para verificar apertura de modal
- Mock de `fetch` para simular respuestas de API
- Verificación de llamadas a casos de uso
- Test de flujo completo: no autenticado → login → ejecución test

### Tests E2E (Opcional)

- Solo se consideraría para flujo crítico de autenticación
- Test básico: acceso → login → test genérico

## Definición de Terminado

- [ ] AuthModalContext soporta callback onLoginSuccess
- [ ] LoginModal ejecuta callback post-login en lugar de redirección
- [ ] TestSelectionPage verifica auth antes de ejecutar tests
- [ ] Se muestran modales de login cuando usuario no autenticado
- [ ] Tras login exitoso se ejecuta acción de test pendiente
- [ ] Tests unitarios cubren todos los casos de uso
- [ ] Tests pasan correctamente
- [ ] No hay regresiones en funcionalidad existente

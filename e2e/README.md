# Tests E2E para PreparaUlm

Este directorio contiene tests automatizados simplificados para la plataforma PreparaUlm, enfocados en 3 flujos principales de usuario.

## Estructura de Tests

Los tests están organizados en 3 flujos principales:

### 1. **Flujo Básico - Navegación Principal** (`01-basic-flow.spec.ts`)

Tests de navegación básica para usuarios no autenticados:

- Navegación entre Home → Precios → Nosotros
- Verificación de elementos principales en cada página
- Validación de enlaces externos
- Comprobación de CTAs principales

### 2. **Flujo Usuario Logado - Dashboard** (`02-user-dashboard-flow.spec.ts`)

Tests para usuarios autenticados:

- Proceso de login completo
- Acceso y navegación en el dashboard
- Verificación de elementos del panel de usuario
- Validación de estado de autenticación

### 3. **Flujo Completar Test** (`03-test-completion-flow.spec.ts`)

Tests del flujo completo de realización de tests:

- Login desde la página de selección de tests
- Inicio de test (genérico y por categoría)
- Completado automático marcando siempre la opción A
- Visualización de resultados

## Configuración de Usuario de Prueba

Los tests utilizan las siguientes credenciales de prueba:

```
  Email: test@preparaulm.com
Password: testpassword123
```

Asegúrate de que este usuario exista en tu base de datos de desarrollo.

## Ejecutar los Tests

### Comandos Disponibles

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests con interfaz visual (para debugging)
npm run test:ui

# Ejecutar un flujo específico
npx playwright test e2e/01-basic-flow.spec.ts
npx playwright test e2e/02-user-dashboard-flow.spec.ts
npx playwright test e2e/03-test-completion-flow.spec.ts

# Ejecutar en modo debug
npx playwright test --debug

# Generar reporte HTML
npx playwright show-report
```

### Prerequisitos

- Node.js y npm instalados
- Dependencias del proyecto instaladas (`npm install`)
- Servidor de desarrollo ejecutándose (`npm run dev`)
- Usuario de prueba configurado en la base de datos

## Características de los Tests

### Navegación Adaptativa

Los tests están diseñados para ser resilientes a cambios menores en la UI:

- Usan múltiples selectores alternativos
- Verifican existencia de elementos antes de interactuar
- Incluyen timeouts apropiados para elementos dinámicos

### Flujo de Test Automático

El test de completado automático:

- Busca siempre la opción A primero
- Tiene fallback a la primera opción disponible
- Maneja diferentes tipos de UI (radio buttons, botones, labels)
- Detecta automáticamente cuándo el test ha terminado

### Manejo de Autenticación

Los tests manejan diferentes estados de autenticación:

- Detección automática de redirecciones a login
- Login automático cuando es necesario
- Verificación de estado de autenticación

## Configuración del Entorno

Los tests se ejecutan con la siguiente configuración:

- **Browser**: Chromium únicamente
- **Viewport**: Adaptable según el test
- **Base URL**: http://localhost:3000
- **Timeouts**: Configurados para manejar cargas dinámicas

## Resultados y Reportes

Después de ejecutar los tests:

- **Screenshots**: Se guardan en `test-results/`
- **Reporte HTML**: Disponible con `npx playwright show-report`
- **Videos**: Se graban automáticamente en caso de fallos

## Mantenimiento

### Cuándo Actualizar los Tests

Los tests necesitan actualización cuando:

1. Cambian los selectores de elementos principales
2. Se modifica el flujo de autenticación
3. Se cambian las URLs de las páginas
4. Se modifica la estructura del test (preguntas/respuestas)

### Debugging

Si los tests fallan:

1. Ejecuta con `--debug` para inspección paso a paso
2. Revisa los screenshots en `test-results/`
3. Verifica que el usuario de prueba existe
4. Confirma que el servidor de desarrollo está ejecutándose
5. Usa `--headed` para ver el browser durante la ejecución

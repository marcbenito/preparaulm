# PreparaUlm Project

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Testing con Playwright

Este proyecto utiliza Playwright para pruebas end-to-end. Los tests se encuentran en el directorio `e2e/`.

### Ejecutar todos los tests

```bash
npm test
# o
npx playwright test
```

### Ejecutar tests con interfaz de usuario

```bash
npx playwright test --ui
```

### Ejecutar tests sólo en un navegador específico

```bash
npx playwright test --project=chromium
```

### Ejecutar un test específico

```bash
npx playwright test privacy
```

### Ejecutar tests en modo debug

```bash
npx playwright test --debug
```

### Generar pruebas automáticamente con Codegen

```bash
npx playwright codegen
```

### Visualizar resultados de tests en HTML

Después de ejecutar los tests, podrás ver los resultados en el reporte HTML:

```bash
npx playwright show-report
```

## Estructura de pruebas

- `e2e/example.spec.ts` - Ejemplo básico
- `e2e/privacy.spec.ts` - Tests para la página de privacidad
- `e2e/navigation.spec.ts` - Tests de navegación
- `e2e/components.spec.ts` - Tests de componentes específicos

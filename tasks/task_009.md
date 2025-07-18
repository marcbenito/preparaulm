# Task 009 - Pantalla de Finalización con Análisis IA

## Descripción

Implementar una pantalla de finalización que se muestre cuando el usuario presiona "Finalizar test", antes de ejecutar el caso de uso de finalización. La pantalla incluye texto explicativo sobre análisis con IA y una barra de progreso, con tiempo mínimo de 2 segundos.

## Contexto

- Proyecto: AeroTest - Plataforma de tests para licencia piloto ULM
- Página afectada: `/test/[uid]` - Página de ejecución de tests
- Framework: NextJS 15, React, Tailwind CSS, Shadcn

## Objetivos

1. Mejorar UX durante finalización de test
2. Explicar valor añadido del análisis con IA
3. Mantener tiempo mínimo de 2 segundos en pantalla
4. Manejar errores en la misma pantalla de finalización

## Requisitos Funcionales

### Pantalla de Finalización

- **Texto**: Mensaje específico sobre análisis IA proporcionado por usuario
- **Loader**: Barra de progreso indeterminada animada
- **Diseño**: Fondo `bg-cosmic-night`, diseño mobile-first
- **Tiempo mínimo**: 2 segundos obligatorios
- **Manejo errores**: Mostrar errores en la misma pantalla
- **Navegación**: No bloquear navegación del browser

### Flujo de Usuario

1. Usuario presiona "Finalizar test"
2. Se muestra pantalla de finalización inmediatamente
3. En paralelo: timer 2s + ejecución caso de uso
4. Si éxito: esperar timer y redirigir a review
5. Si error: mostrar error en pantalla finalización

## Archivos a Modificar/Crear

### Nuevos Componentes

- `src/app/test/[uid]/_components/FinalizingTestScreen.tsx`
- `src/app/test/[uid]/_components/__tests__/FinalizingTestScreen.test.tsx`

### Archivos Modificados

- `src/app/test/[uid]/page.tsx`
- `e2e/test-execution.spec.ts`

## Implementación Técnica

### Estados Necesarios

```typescript
const [isFinalizingTest, setIsFinalizingTest] = useState(false)
const [finalizationError, setFinalizationError] = useState<string | null>(null)
```

### Lógica Timer + Caso de Uso

```typescript
const handleFinishTest = async () => {
  setIsFinalizingTest(true)
  setFinalizationError(null)

  const timer = new Promise((resolve) => setTimeout(resolve, 2000))
  const completeTest = async () => {
    // Lógica existente del caso de uso
  }

  try {
    await Promise.all([timer, completeTest()])
    router.push(`/test/${uid}/review`)
  } catch (error) {
    setFinalizationError(error.message)
  }
}
```

### Props del Componente

```typescript
interface FinalizingTestScreenProps {
  isError: boolean
  errorMessage?: string
  onRetry?: () => void
}
```

## Tests Unitarios

### FinalizingTestScreen.test.tsx

- ✅ Renderiza texto correctamente
- ✅ Muestra barra de progreso animada
- ✅ Maneja estado de error
- ✅ Responsive design mobile
- ✅ Accesibilidad (aria-live, contraste)

## Tests E2E

### test-execution.spec.ts (nuevos casos)

- ✅ Flujo completo finalización con pantalla intermedia
- ✅ Verificar tiempo mínimo 2 segundos
- ✅ Manejo errores en finalización
- ✅ Redirección correcta tras finalización exitosa

## Análisis de Impacto

### Rendimiento

- ✅ **Positivo**: Componente ligero (texto + CSS animation)
- ⚠️ **Neutral**: Timer 2s añade latencia pero mejora UX
- ✅ **Positivo**: No impacta carga inicial

### SEO

- ✅ **Neutral**: Pantalla temporal en flujo autenticado
- ✅ **Positivo**: Mejora tiempo permanencia
- ✅ **Neutral**: No indexable (requiere auth)

### Accesibilidad

- ✅ `aria-live` para lectores de pantalla
- ✅ Contraste colores según guías WCAG
- ✅ Soporte `prefers-reduced-motion`

## Texto de la Pantalla

```
Calculando tus resultados…

Estamos analizando tu test con ayuda de inteligencia artificial.
Además de corregir, comparamos con tests anteriores, evaluamos por categorías y generamos gráficos personalizados.

Este análisis te ayudará a entender tu progreso y a enfocar mejor tu estudio.

En unos segundos tendrás un informe detallado y adaptado a ti.

⸻
```

## Convenciones Seguidas

- ✅ Componentes en PascalCase
- ✅ Hooks en camelCase
- ✅ Sin comentarios en código
- ✅ Tailwind CSS v3
- ✅ Iconos via wrapper `/src/components/ui/icons/`

## Criterios de Aceptación

1. ✅ Pantalla se muestra inmediatamente al presionar "Finalizar"
2. ✅ Tiempo mínimo 2 segundos respetado
3. ✅ Barra progreso indeterminada animada
4. ✅ Texto exacto mostrado correctamente
5. ✅ Errores mostrados en misma pantalla
6. ✅ Redirección exitosa tras completar
7. ✅ Funciona en mobile y desktop
8. ✅ Tests unitarios y E2E pasando
9. ✅ No bloquea navegación del browser
10. ✅ Mantiene estilo visual de la aplicación

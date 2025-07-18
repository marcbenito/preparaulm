# Task 005 - Reorganización Styleguide: Dialog y Toast

## Descripción

Reorganizar la página principal del styleguide extrayendo las secciones de Dialog y Toast a subpáginas independientes, manteniendo la consistencia visual y añadiendo navegación funcional.

## Caso de Uso

Los desarrolladores y diseñadores necesitan acceder de forma más organizada a los ejemplos de componentes UI. La página principal del styleguide se está volviendo muy extensa (757 líneas), dificultando la navegación y mantenimiento. Esta reorganización mejorará la experiencia de usuario y la estructura del código.

## Objetivos

- Extraer sección Dialog a subpágina independiente
- Crear nueva subpágina Toast con ejemplos funcionales
- Añadir navegación entre subpáginas del styleguide
- Mantener consistencia visual con el diseño cósmico
- Mejorar la modularidad y mantenibilidad del código

## Subtareas

### 1. Creación de Subpágina Dialog

**Archivo**: `src/app/styleguide/dialog/page.tsx`

- Extraer sección Dialog existente de la página principal (líneas ~565-611)
- Expandir con 2-3 ejemplos adicionales:
  - Dialog con diferentes tamaños (sm, md, lg)
  - Dialog con contenido complejo (formularios, listas)
  - Dialog de confirmación destructiva
- Mantener diseño cósmico consistente con fondo `bg-cosmic-night`
- Incluir título, descripción y ejemplos organizados

### 2. Creación de Subpágina Toast

**Archivo**: `src/app/styleguide/toast/page.tsx`

- Crear página completa desde cero
- Implementar ejemplos funcionales usando `useToast` hook:
  - Toast de éxito (success)
  - Toast de error (error)
  - Toast de advertencia (warning)
  - Toast informativo (info)
- Incluir ejemplos de diferentes duraciones
- Botones que realmente disparen toasts al hacer clic
- Mostrar código de ejemplo para cada variante

### 3. Actualización de Navegación Principal

**Archivo**: `src/app/styleguide/page.tsx`

- Eliminar sección Dialog completa de la página principal
- Crear sección de navegación hacia subcomponentes
- Añadir enlaces a:
  - `/styleguide/dialog`
  - `/styleguide/toast`
  - `/styleguide/card` (existente)
  - Otros componentes futuros
- Usar `next/link` para navegación optimizada
- Diseño de tarjetas de navegación consistente con el tema

**Archivo**: `src/app/styleguide/layout.tsx`

- Actualizar `sidebarNavItems` para incluir nuevas páginas
- Añadir items Dialog y Toast al menú lateral
- Mantener orden alfabético en la navegación

## Análisis de Impactos

### Performance

- ✅ **Positivo**: Reducción del bundle inicial de `page.tsx` (757 → ~650 líneas)
- ✅ **Positivo**: Lazy loading de subpáginas solo cuando se accede
- ✅ **Positivo**: Mejor tree-shaking de componentes no utilizados
- ⚠️ **Neutral**: Toasts funcionales añaden event listeners temporales
- 📊 **Estimación**: Mejora del 5-10% en tiempo de carga inicial

### SEO

- ✅ **Positivo**: URLs más específicas y semánticas
  - `/styleguide/dialog` - Enfocado en componentes Dialog
  - `/styleguide/toast` - Enfocado en componentes Toast
- ✅ **Positivo**: Mejor estructura de contenido para crawlers
- ✅ **Positivo**: Títulos y meta descriptions más específicos
- ✅ **Positivo**: Mejora en la arquitectura de información
- 🎯 **Recomendación**: Añadir meta tags específicos para cada subpágina

### Mantenibilidad

- ✅ **Positivo**: Código más modular y organizado
- ✅ **Positivo**: Responsabilidad única por archivo
- ✅ **Positivo**: Facilita futuras expansiones del styleguide
- ✅ **Positivo**: Mejor experiencia de desarrollo
- ✅ **Positivo**: Debugging más sencillo por componente

## Consideraciones Técnicas

### Dependencias Existentes

- `useToast` hook para funcionalidad de toasts
- Componentes UI de shadcn ya implementados
- `ToastProvider` y contexto existente
- Estilos de Tailwind y clases custom

### Estructura de Archivos Resultante

```
src/app/styleguide/
├── page.tsx (modificado - navegación principal)
├── layout.tsx (existente)
├── dialog/
│   └── page.tsx (nuevo)
├── toast/
│   └── page.tsx (nuevo)
├── card/
│   └── page.tsx (existente)
└── ...otras subpáginas futuras
```

### Patrones de Diseño

- Mantener consistencia visual con `bg-cosmic-night`
- Usar gradientes y transparencias existentes
- Preservar tipografía y espaciado del sistema
- Componentes de navegación reutilizables

## Criterios de Aceptación

- [ ] Subpágina Dialog creada con ejemplos expandidos
- [ ] Subpágina Toast creada con funcionalidad completa
- [ ] Navegación principal actualizada con enlaces
- [ ] Sección Dialog removida de página principal
- [ ] Consistencia visual mantenida
- [ ] Performance mejorada o mantenida
- [ ] URLs accesibles y funcionales

## Estimación

- **Desarrollo**: 4-6 horas
- **Review y ajustes**: 1-2 horas
- **Total**: 5-8 horas

## Prioridad

Media-Alta - Mejora la organización del código y experiencia de desarrollo

## Notas Adicionales

- Esta tarea sienta las bases para futuras reorganizaciones del styleguide
- El patrón establecido puede replicarse para otros componentes
- Considerar implementar breadcrumbs en futuras iteraciones
- La funcionalidad de Toast debe ser completamente operativa para demostrar capacidades

# Task 002: Normalizar Categorías con Componente CategoryIcon

## Historia de Usuario

Como desarrollador quiero unificar la representación de las categorías en toda la aplicación mediante un componente reutilizable `CategoryIcon` que reciba únicamente dos props (`iconName` y `color`), mapee internamente al icono y gradiente adecuados (con fallback a `FileQuestion` si no existe) y elimine cualquier import directo de iconos y colores "hardcodeados" en los distintos lugares. Además, el _use case_ de dominio de Dashboard debe devolver sólo esos mismos dos valores (`iconName` y `color`), delegando el renderizado al componente.

## Subtareas

1. **Crear componente `CategoryIcon`**
   - Ruta: `src/components/ui/CategoryIcon.tsx`
   - Props: `iconName?: string | null`, `color?: string | null`
   - Interno un diccionario que mapea nombres de iconos a componentes de `@/components/ui/icons`, con fallback a `FileQuestion`.
   - Renderizar un `<div>` con gradiente de fondo y el icono dentro.

2. **Refactorizar el _use case_ de Dashboard**
   - En `src/domain/use-cases/users/GetUserCategoriesPerformance.ts`:
     - Modificar la interfaz de salida para que devuelva `iconName` y `color` en lugar de `icon: LucideIcon`.
     - Eliminar los mapas locales `categoryIconMap` y `categoryColorMap`.
     - Extraer `category.iconName` y `category.color` de cada entidad obtenida via `getRootCategories()`.

3. **Ajustar tipos y componentes del Dashboard**
   - En `src/app/dashboard/_components/Types.tsx`, cambiar la interfaz `Category` a incluir sólo `iconName` y `color`.
   - En `CategoryCard.tsx`, eliminar importaciones directas de iconos y usar `CategoryIcon` para renderizar.

4. **Refactorizar página de Test Categories**
   - En `src/app/test-categories/page.tsx`:
     - Mantener array estático de métricas.
     - Transformar a cliente con `useState` y `useEffect`, llamando a `new GetMainCategoriesUseCase().execute()`.
     - Combinar resultados de categorías con datos estáticos emparejando por `slug === id`.
     - Eliminar importaciones directas de iconos y usar `CategoryIcon`.

5. **Verificación y pruebas**
   - Confirmar que Dashboard y Test Categories usan `CategoryIcon` con los iconos y colores correctos.
   - Verificar fallback a `FileQuestion` cuando `iconName` no exista.
   - Asegurarse de que no queden importaciones de iconos o colores hardcodeados. 
# Task 016: Implementar URLs Canónicas y Metadata Específicas

## Objetivo

Implementar URLs canónicas específicas para cada página del proyecto y mejorar las metadata con descripciones únicas y optimizadas para SEO.

## Contexto

Actualmente:
- El layout principal define una URL canónica base (`canonical: "/"`) solo para la página principal
- Muchas páginas tienen layouts que solo definen metadata básica
- La mayoría de páginas usan "use client", por lo que necesitan mantener sus layouts para metadata
- No hay URLs canónicas definidas para cada página individual

## Requisitos

1. **Cada página debe tener su propia URL canónica**
2. **Páginas dinámicas deben usar generateMetadata**
3. **Páginas de autenticación (login, register, reset-password) NO deben tener URLs canónicas**
4. **Páginas privadas (dashboard, profile, account/*, instructor/*) NO deben tener URLs canónicas**
5. **Cada página debe tener metadata específica sin usar helpers**
6. **Usar export metadata directo en cada página/layout**

## Implementación

### 1. Actualizar Layout Raíz
- Remover la canonical específica del layout principal
- Mantener toda la metadata base actual
- El template de título se mantiene

### 2. Página Home
- Añadir `canonical: "/"` en el metadata

### 3. Client Components (mantener layouts)
- Actualizar layouts existentes con canonical y metadata específica
- Páginas: about, cookies, pricing, privacy, terms, test-categories, etc.

### 4. Server Components
- Mover metadata de layout a page.tsx cuando sea posible
- Eliminar layouts vacíos
- Páginas: faqs-preguntas-frecuentes, test-especificos, blog posts

### 5. Páginas Dinámicas
- Usar generateMetadata para generar canónicas dinámicas
- Páginas: test-especificos/[slug], category/[category]

### 6. Páginas Privadas
- Añadir `robots: { index: false, follow: false }` en lugar de canonical
- Páginas: dashboard, profile, account/*, instructor/*, test/[uid], login, register

## Archivos a Modificar

### Layout Raíz:
- `src/app/layout.tsx`

### Página Home:
- `src/app/page.tsx`

### Client Components (layouts):
- `src/app/about/layout.tsx`
- `src/app/cookies/layout.tsx`
- `src/app/login/layout.tsx`
- `src/app/pricing/layout.tsx`
- `src/app/privacy/layout.tsx`
- `src/app/register/layout.tsx`
- `src/app/terms/layout.tsx`
- `src/app/test-categories/layout.tsx`

### Server Components (pages):
- `src/app/faqs-preguntas-frecuentes/page.tsx`
- `src/app/test-especificos/page.tsx`

### Páginas Dinámicas:
- `src/app/test-especificos/[slug]/layout.tsx`

## Criterios de Aceptación

- ✅ Cada página pública tiene su URL canónica específica
- ✅ Páginas privadas tienen noIndex en lugar de canonical
- ✅ Descripciones específicas y optimizadas para cada página
- ✅ Keywords relevantes por página
- ✅ OpenGraph optimizado por página
- ✅ generateMetadata para páginas dinámicas
- ✅ npm run build funciona perfectamente
- ✅ npm run test funciona
- ✅ npm run test:e2e funciona

## Beneficios SEO

1. URLs canónicas únicas para cada página
2. Descripciones específicas optimizadas por página
3. Metadata estructurada y consistente
4. Prevención de indexación de páginas privadas
5. OpenGraph optimizado por página
6. Keywords específicas por contenido 
# AeroTest - Instalación y Configuración

## Introducción
Este documento proporciona instrucciones detalladas sobre cómo configurar el entorno de desarrollo para AeroTest, instalar dependencias y añadir nuevos componentes utilizando Shadcn.

## Requisitos Previos
- **Node.js**: Versión 16 o superior.
- **npm** o **yarn**: Para la gestión de paquetes.
- **Git**: Para clonar el repositorio y gestionar el control de versiones.

## Instalación

1. **Clonar el Repositorio**:
   ```bash
   git clone <URL-del-repositorio>
   cd aerotest
   ```

2. **Instalar Dependencias**:
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar Variables de Entorno**:
   - Crea un archivo `.env.local` en la raíz del proyecto.
   - Añade las variables necesarias para Supabase y otras configuraciones específicas. Consulta la documentación de Supabase para obtener las claves necesarias.

4. **Iniciar el Servidor de Desarrollo**:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

## Instalación de Componentes con Shadcn

Para añadir nuevos componentes a la aplicación, utilizamos la herramienta de línea de comandos de Shadcn. Sigue estos pasos:

1. **Ejecutar el Comando de Shadcn**:
   ```bash
   npx shadcn@latest add <nombre-del-componente>
   ```
   Reemplaza `<nombre-del-componente>` con el nombre del componente que deseas instalar.

2. **Ubicación de los Componentes**:
   - Los componentes instalados se ubicarán automáticamente en `src/components/ui` o en la carpeta correspondiente según la convención del proyecto.

## Convenciones de Desarrollo
- **Nombres de Archivos**: Hooks y utilidades en camelCase, carpetas en kebab-case, componentes en PascalCase.
- **Iconos**: Siempre encapsulados en componentes wrapper en `/src/components/ui/icons/`.

## Solución de Problemas
- Si encuentras errores relacionados con Supabase, verifica que las variables de entorno estén correctamente configuradas.
- Para problemas con componentes de Shadcn, asegúrate de estar utilizando la última versión de la CLI.

Con estos pasos, deberías tener el entorno de AeroTest configurado y listo para el desarrollo. 
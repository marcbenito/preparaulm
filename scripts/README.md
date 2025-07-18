# Scripts de Utilidad

Este directorio contiene scripts de utilidad para la aplicación.

## db-loader.ts

Script para cargar la estructura de la base de datos y los datos iniciales (seeds).

### Requisitos previos

- Node.js instalado
- PostgreSQL instalado y accesible
- Variables de entorno configuradas (ver `.env.example` en la raíz del proyecto)

### Uso

Para ejecutar el script, puedes usar:

```bash
npm run db:load
```

Este comando:

1. Cargará la estructura de la base de datos desde `db/schema.sql`
2. Cargará las categorías desde `db/seeds/categories_seed.sql`
3. Cargará las preguntas desde los archivos en `db/seeds/questions/`

### Configuración

El script utiliza la variable de entorno `DATABASE_URL` que debe definirse en el archivo `.env.local` en la raíz del proyecto.

Ejemplo:

```
DATABASE_URL=postgres://usuario:contraseña@localhost:5432/nombre_basedatos
```

### Solución de problemas

Si encuentras errores al ejecutar el script, verifica:

- Que la base de datos existe y es accesible
- Que las credenciales en `DATABASE_URL` son correctas
- Que tienes permisos para crear tablas y modificar la base de datos
- Que los archivos SQL no contienen errores de sintaxis 
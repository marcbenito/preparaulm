# Base de Datos para Tests Aeronáuticos

Este directorio contiene scripts SQL para gestionar la base de datos de la aplicación de tests aeronáuticos en PostgreSQL.

## Estructura de directorios

```
db/
├── backups/             # Copias de seguridad generadas
├── migrations/          # Scripts de migración numerados
│   └── 001_initial_schema.sql
├── scripts/             # Scripts utilitarios
│   ├── backup.sql       # Ejemplo de backup (usar pg_dump)
│   ├── init_db.sql      # Inicializa toda la base de datos
│   └── run_migrations.sql # Ejecuta migraciones pendientes
├── seeds/               # Datos iniciales
│   ├── categories_seed.sql # Datos de categorías
│   └── questions/       # Preguntas por categoría
│       ├── meteorology.sql
│       ├── systems.sql
│       └── ...
└── schema.sql           # Schema principal de la base de datos
```

## Comandos principales

### Inicializar la base de datos

Para crear la base de datos desde cero con todos los datos:

```bash
# Primero crear la base de datos
psql -U postgres -c "CREATE DATABASE preparaulm;"

# Luego inicializar con los scripts
psql -U postgres -d preparaulm -f db/scripts/init_db.sql
```

### Ejecutar migraciones

Para actualizar una base de datos existente aplicando las migraciones pendientes:

```bash
psql -U postgres -d preparaulm -f db/scripts/run_migrations.sql
```

### Realizar backup

Para generar una copia de seguridad de la base de datos:

```bash
# Formato SQL
pg_dump -U postgres -d preparaulm -f db/backups/backup_$(date +%Y%m%d_%H%M%S).sql

# Formato comprimido
pg_dump -U postgres -d preparaulm -Fc -f db/backups/backup_$(date +%Y%m%d_%H%M%S).dump
```

## Migraciones

Las migraciones están numeradas secuencialmente y se aplican en orden. Cada migración se registra en la tabla `migrations` para evitar aplicarla más de una vez.

Para añadir una nueva migración:

1. Crear un nuevo archivo en `migrations/` con el formato `XXX_nombre_descriptivo.sql`
2. Actualizar `scripts/run_migrations.sql` para incluir la nueva migración
3. Ejecutar el script de migraciones

## Convenciones

- Todos los scripts deben ser idempotentes cuando sea posible (usar `IF NOT EXISTS`, etc.)
- Cada migración debe registrarse en la tabla `migrations` al finalizar
- Los scripts deben incluir comentarios explicativos
- Las fechas se formatean como YYYY-MM-DD
- Los datos JSON deben usar el tipo JSONB para mejor rendimiento 
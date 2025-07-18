# Scripts de Base de Datos

## Limpieza de Tests Incompletos

### Problema
Los tests que no se completan (donde `completed_at` es NULL) pueden causar problemas en el cálculo de `minimum_progress` de las categorías padre, ya que las respuestas existen pero no se procesan correctamente.

### Solución
Hemos creado dos scripts para limpiar tests incompletos:

#### 1. Script SQL: `cleanup_incomplete_tests.sql`

**Uso:**
```bash
# Conectar a la base de datos y ejecutar el script
psql -h <host> -U <usuario> -d <database> -f cleanup_incomplete_tests.sql
```

**Características:**
- Muestra estadísticas antes y después de la limpieza
- Lista todos los tests incompletos que se van a eliminar
- Elimina primero las respuestas asociadas (`test_execution_answers`)
- Luego elimina los test_executions incompletos
- Proporciona confirmación de la operación

#### 2. Script JavaScript: `cleanup-incomplete-tests.js`

**Requisitos:**
```bash
npm install @supabase/supabase-js
```

**Nota**: Si tienes Next.js, `dotenv` ya está incluido por defecto, no necesitas instalarlo.

**Variables de entorno necesarias:**
```bash
NEXT_SUPABASE_URL=tu_supabase_url
NEXT_SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

⚠️ **IMPORTANTE**: Se requiere el **Service Role Key** (no el anon key) porque:
- El anon key está limitado por las políticas RLS (Row Level Security)
- Solo el Service Role Key puede eliminar datos sin restricciones
- Puedes encontrar esta clave en: Dashboard de Supabase > Settings > API > Service Role Key

**Uso:**
```bash
# Desde la raíz del proyecto
node scripts/cleanup-incomplete-tests.js
```

**Características:**
- Interfaz interactiva con confirmación del usuario
- Estadísticas detalladas antes y después
- Manejo de errores robusto
- Logs informativos con emojis
- Confirmación antes de eliminar

### Qué hace el script

1. **Identifica tests incompletos antiguos**: Busca `test_executions` donde `completed_at IS NULL` y `created_at` es más de 6 horas atrás
2. **Encuentra respuestas asociadas**: Localiza todas las `test_execution_answers` de esos tests
3. **Elimina automáticamente**: 
   - Primero elimina las respuestas (respeta foreign keys)
   - Luego elimina los test_executions
   - **No requiere confirmación manual**
4. **Proporciona estadísticas**: Muestra antes/después para verificar la limpieza

### Protecciones del script

- ✅ **Solo elimina tests de más de 6 horas**: Protege tests recientes que pueden estar en progreso
- ✅ **Ejecución automática**: No requiere confirmación manual
- ✅ **Respeta foreign keys**: Elimina en el orden correcto

### Ejemplo de salida

```
📊 ESTADÍSTICAS ANTES DE LA LIMPIEZA:
   Total de tests: 150
   Tests incompletos: 12
   Tests completados: 138

🗑️  TESTS INCOMPLETOS A ELIMINAR (más de 6 horas):
   ID: 86, Usuario: 57047038-c5f3-443b-8a6b-b585cc1e9f2d, Categoría: navegacion, Creado hace: 12h
   ID: 87, Usuario: 57047038-c5f3-443b-8a6b-b585cc1e9f2d, Categoría: null, Creado hace: 8h
   ...

📝 Respuestas a eliminar: 45

🚀 Iniciando eliminación automática...

🎉 LIMPIEZA COMPLETADA EXITOSAMENTE!
   • 8 tests incompletos eliminados (4 recientes conservados)
   • 32 respuestas eliminadas
   • 138 tests completados conservados
```

### Recomendaciones

1. **Hacer backup antes**: Siempre respalda la base de datos antes de ejecutar scripts de limpieza
2. **Ejecutar en horario de baja actividad**: Para evitar conflictos con usuarios activos
3. **Verificar resultados**: Revisa las estadísticas después de la limpieza
4. **Monitorear regularmente**: Considera ejecutar este script periódicamente para mantener la base de datos limpia

### Seguridad del Service Role Key

⚠️ **CUIDADO**: El Service Role Key es muy poderoso y debe manejarse con cuidado:

- **Nunca** lo commits en el código fuente
- **Nunca** lo uses en el frontend
- **Solo** úsalo en scripts de servidor/administración
- **Guárdalo** en variables de entorno seguras
- **Rota** la clave regularmente si es necesario

**Ejemplo de uso seguro:**

**Opción 1: Usando .env.production.local (recomendado para Next.js)**
```bash
# Crear archivo .env.production.local en la raíz del proyecto
echo "NEXT_SUPABASE_URL=tu_url" > .env.production.local
echo "NEXT_SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key" >> .env.production.local

# Ejecutar el script (automáticamente lee .env.production.local)
node scripts/cleanup-incomplete-tests.js
```

**Opción 2: Variables de entorno directas**
```bash
# Ejecutar con variables inline
NEXT_SUPABASE_URL=tu_url NEXT_SUPABASE_SERVICE_ROLE_KEY=tu_key node scripts/cleanup-incomplete-tests.js
```

### Impacto en el Sistema

Después de ejecutar este script:
- ✅ Se eliminan tests incompletos que causan inconsistencias
- ✅ Se mejora el cálculo de `minimum_progress` en categorías padre
- ✅ Se libera espacio en la base de datos
- ✅ Se mantienen intactos todos los tests completados y sus datos 
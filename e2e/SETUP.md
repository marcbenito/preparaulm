# Configuración para Tests E2E

## Usuario de Prueba Requerido

Para que los tests de autenticación funcionen correctamente, necesitas crear un usuario de prueba en tu base de datos:

### Credenciales del Usuario de Prueba

```
Email: test@preparaulm.com
Password: testpassword123
```

## Cómo Crear el Usuario de Prueba

### Opción 1: A través de la interfaz web

1. Ve a `/register` en tu aplicación local
2. Registra el usuario con el email `test@preparaulm.com`
3. Usa la contraseña `testpassword123`

### Opción 2: Directamente en la base de datos (Supabase)

```sql
-- Insertar usuario en auth.users (ajustar según tu configuración)
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES (
      'test@preparaulm.com',
  crypt('testpassword123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW()
);
```

### Opción 3: Usar scripts de seed

Si tienes scripts de seed en `db/seeds/`, puedes agregar este usuario ahí.

## Verificar que el Usuario Existe

Antes de ejecutar los tests, puedes verificar que el usuario existe:

```bash
# Si usas Supabase CLI
supabase db reset

# O consultar directamente
psql -h localhost -p 54322 -U postgres -d postgres -c "SELECT email FROM auth.users WHERE email = 'test@preparaulm.com';"
```

## Comportamiento de los Tests

### Si el usuario NO existe:

- Los tests de login fallarán (esperado)
- Se mostrarán mensajes informativos en los logs
- Los tests básicos (navegación) seguirán funcionando

### Si el usuario SÍ existe:

- Todos los tests deberían pasar
- Se podrán probar los flujos completos de autenticación
- Se podrán probar los flujos de creación de tests

## Solución de Problemas

### Error: "Login falló - credenciales incorrectas"

- Verificar que el usuario existe en la base de datos
- Verificar que la contraseña es correcta
- Comprobar que la base de datos está ejecutándose

### Error: "No se navegó al test"

- Verificar que el usuario tiene permisos para crear tests
- Comprobar que la API `/api/tests` está funcionando
- Verificar que no hay errores en la consola del navegador

### Debugging

Para ver más detalles de lo que está pasando:

```bash
# Ejecutar con logs detallados
npx playwright test --headed

# Ver el reporte HTML
npx playwright show-report
```

import { createBrowserClient } from '@supabase/ssr'

// Función para limpiar cookies problemáticas
function cleanupCorruptedCookies() {
  try {
    // Obtener todas las cookies
    const cookies = document.cookie.split('; ');
    
    // Encontrar y eliminar cookies de Supabase que puedan estar corruptas
    cookies.forEach(cookie => {
      if (cookie.startsWith('sb-') || cookie.startsWith('supabase-')) {
        const cookieName = cookie.split('=')[0];
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    });
  } catch (error) {
    console.error('Error limpiando cookies:', error);
  }
}

export const createClient = () => {
  try {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  } catch (error) {
    // Si hay error, intentar limpiar cookies y reintentar
    console.error('Error creando cliente Supabase:', error);
    cleanupCorruptedCookies();
    
    // Intentamos una vez más
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
}
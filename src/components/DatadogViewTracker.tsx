"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { datadogRum } from "@datadog/browser-rum"

// Función para normalizar rutas dinámicas
const normalizeRoute = (pathname: string): string => {
  return pathname
    // Normalizar rutas de test con ID dinámico
    .replace(/\/test\/[^\/]+/, '/test/:uid')
    // Normalizar rutas de categoría con slug dinámico
    .replace(/\/category\/[^\/]+/, '/category/:category')
    // Normalizar rutas de instructor con studentId dinámico
    .replace(/\/instructor\/student\/[^\/]+/, '/instructor/student/:studentId')
    // Agregar más normalizaciones según sea necesario
}

// Función para obtener el nombre de la vista basado en la ruta
const getViewName = (normalizedPath: string): string => {
  

  return  normalizedPath
}

export function DatadogViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initialViewTracked = useRef(false)
  const lastTrackedPath = useRef<string>('')

  useEffect(() => {
    // Normalizar la ruta para agrupar vistas similares
    const normalizedPath = normalizeRoute(pathname)
    const viewName = normalizedPath
    
    // Combinar pathname normalizado con search params si existen
    const currentPath = `${normalizedPath}${
      searchParams ? "?" + searchParams.toString() : ""
    }`

    // Evitar tracking duplicado de la misma ruta
    if (lastTrackedPath.current === currentPath) {
      return
    }

    // Check if RUM is initialized before trying to track
    if (datadogRum.getInternalContext()) {
            try {
        // Agregar contexto adicional a la sesión
        datadogRum.setGlobalContextProperty('route_template', normalizedPath)
        datadogRum.setGlobalContextProperty('actual_route', pathname)
        
        // Track the view con información adicional
        if (!initialViewTracked.current) {
          datadogRum.startView({ 
            name: pathname,
            context: {
              route_template: normalizedPath,
              view_name: viewName,
              is_initial_view: true,
              current_path: currentPath,
              pathname: pathname
            }
          })
          initialViewTracked.current = true
        } else {
          // Para navegaciones subsecuentes
          datadogRum.startView({ 
            name: pathname,
            context: {
              route_template: normalizedPath,
              view_name: viewName,
              is_initial_view: false,
              current_path: currentPath,
              pathname: pathname
            }
          })
        }

        // Actualizar la última ruta tracked
        lastTrackedPath.current = currentPath

        // Log en desarrollo para debugging
        if (process.env.NODE_ENV === 'development') {
          console.log('🔍 Datadog View Tracked:', {
            original: pathname,
            normalized: normalizedPath,
            viewName,
            searchParams: searchParams?.toString() || 'none'
          })
        }
        
      } catch (error) {
        console.error('Error tracking Datadog view:', error)
      }
    } else {
      // Log warning si RUM no está inicializado
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Datadog RUM not initialized when trying to track view:', currentPath)
      }
    }
  }, [pathname, searchParams]) // Re-run effect when pathname or searchParams change

  // This component doesn't render anything itself
  return null
}

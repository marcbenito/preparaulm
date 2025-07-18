import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {

  console.log('🌎Request URL:', request.nextUrl.toString())
  
  let supabaseResponse = NextResponse.next({
    request,
  })
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {

          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))

          supabaseResponse = NextResponse.next({
            request, 
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )



  const userResult = await supabase.auth.getUser()
  console.log('👤 User result:', userResult.data.user ? 'Authenticated' : 'Not authenticated')

  return supabaseResponse
}
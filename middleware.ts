import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if user has auth token
  const authToken = request.cookies.get('authToken')?.value

  // Public routes that don't need auth
  const publicRoutes = ['/', '/auth/signin', '/auth/login']
  const isPublicRoute = publicRoutes.includes(pathname)

  // Protected routes (dashboard and subpages)
  const isProtectedRoute = pathname.startsWith('/dashboard')

  // If trying to access protected route without auth, redirect to signin
  if (isProtectedRoute && !authToken) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  // If trying to access auth pages with auth, redirect to dashboard
  if ((pathname === '/auth/signin' || pathname === '/auth/login') && authToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

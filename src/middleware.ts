import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/forgot-password', '/signup'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value; // pass request if needed

  const { pathname } = request.nextUrl;

  // لو فيه توكن:
  if (token) {
    // لو المستخدم داخل على صفحة عامة → نوديه على الـ dashboard
    if (PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    // لو الصفحة محمية → يدخل عادي
    return NextResponse.next();
  }
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // لو الصفحة محمية → يرجع للـ login
  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|uploads|images|.*\\..*).*)'],
};

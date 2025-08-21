import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect the teaser page
  if (request.nextUrl.pathname === '/teaser') {
    const authCookie = request.cookies.get('teaser-auth');
    
    // If no auth cookie, redirect to login
    if (!authCookie || authCookie.value !== 'authenticated') {
      const loginUrl = new URL('/teaser-login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/teaser'
};
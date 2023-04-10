import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { validateJWT } from './lib/auth';
import { isValidProtectPassword } from './lib/protect';

const PUBLIC_FILE = /\.(.*)$/;
const whiteListPaths = [
  '/_next',
  '/.next',
  '/api',
  '/static',
  '/signin',
  '/register',
  '/protect',
];

export default async function middleware(request: NextRequest) {
  // protect all routes behind a password page
  const hashInCookies =
    request.cookies.get(process.env.PROTECT_COOKIE_NAME)?.value ?? '';
  const isAuthorized = isValidProtectPassword(hashInCookies);

  if (!isAuthorized) {
    request.nextUrl.pathname = '/protect';
    return NextResponse.redirect(request.nextUrl);
  }

  const { pathname } = request.nextUrl;
  const isPathWhiteListed =
    whiteListPaths.some(path => pathname.startsWith(path)) ||
    PUBLIC_FILE.test(pathname);

  if (isPathWhiteListed) {
    return NextResponse.next();
  }

  const jwt = request.cookies.get(process.env.COOKIE_NAME || '');

  if (!jwt) {
    request.nextUrl.pathname = '/signin';
    return NextResponse.redirect(request.nextUrl);
  }

  try {
    await validateJWT(jwt.value);
    return NextResponse.next();
  } catch (e) {
    console.error(e);
    request.nextUrl.pathname = '/signin';
    return NextResponse.redirect(request.nextUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - protect (access control page)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|protect).*)',
  ],
};

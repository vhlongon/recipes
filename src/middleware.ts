import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { validateJWT } from './lib/auth';

const PUBLIC_FILE = /\.(.*)$/;
const whiteListPaths = [
  '/_next',
  '/.next',
  '/api',
  '/static',
  '/signin',
  '/register',
];

export default async function middleware(request: NextRequest) {
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

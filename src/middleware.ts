import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { validateJWT } from './lib/auth';
import { isValidProtectPassword } from './lib/protect';

const PUBLIC_FILE = /\.(.*)$/;
const whiteListPaths = ['/signin', '/register'];

export default async function middleware(request: NextRequest) {
  // protect all routes behind a password page
  const hashInCookies = request.cookies.get(process.env.PROTECT_COOKIE_NAME)?.value ?? '';
  const isAuthorized = isValidProtectPassword(hashInCookies);
  const isPublicFile = PUBLIC_FILE.test(request.nextUrl.pathname);
  const pathname = request.nextUrl.pathname;
  const isRoot = pathname === '/';
  const isPathWhiteListed = whiteListPaths.some(path => pathname.startsWith(path));

  console.log({ pathname, isAuthorized, isRoot, isPathWhiteListed });

  if (isRoot || isPublicFile) {
    return NextResponse.next();
  }

  if (!isAuthorized) {
    request.nextUrl.pathname = '/';
    return NextResponse.redirect(request.nextUrl);
  }

  if (isPathWhiteListed || isRoot || isPublicFile) {
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
  matcher: ['/((?!api|_next/static|favicon.ico|_next/image).*)'],
};

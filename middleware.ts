import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token    = req.nextauth.token as any;
    const isAdmin  = req.nextUrl.pathname.startsWith('/admin');

    if (isAdmin && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/login?reason=unauthorized', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // /watchlist requires login; /admin requires admin
        if (req.nextUrl.pathname.startsWith('/admin'))     return !!token;
        if (req.nextUrl.pathname.startsWith('/watchlist')) return !!token;
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/watchlist'],
};
